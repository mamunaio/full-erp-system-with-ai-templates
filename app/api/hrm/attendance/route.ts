import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { startOfDay, endOfDay } from "date-fns";

export const GET = auth(async function GET(req) {
  try {
    if (!req.auth?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tenantId = (req.auth.user as any).tenantId;
    const today = new Date();
    const dayStart = startOfDay(today);
    const dayEnd = endOfDay(today);

    const totalEmployees = await prisma.employee.count({
      where: { tenantId, status: "ACTIVE" }
    });

    const attendanceRecords = await prisma.attendance.findMany({
      where: {
        employee: { tenantId },
        date: { gte: dayStart, lte: dayEnd }
      }
    });

    const present = attendanceRecords.filter(r => r.status === "PRESENT").length;
    const late = attendanceRecords.filter(r => r.status === "LATE").length;
    const halfDay = attendanceRecords.filter(r => r.status === "HALFDAY").length;
    const absent = totalEmployees - (present + late + halfDay);

    const onLeave = await prisma.leave.count({
      where: {
        employee: { tenantId },
        status: "APPROVED",
        from: { lte: today },
        to: { gte: today }
      }
    });

    return NextResponse.json({
      present,
      absent: Math.max(0, absent),
      late,
      onLeave
    });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
});

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { employeeId, status, note } = await req.json();
    const today = startOfDay(new Date());

    const record = await prisma.attendance.upsert({
      where: {
        employeeId_date: {
          employeeId,
          date: today
        }
      },
      update: {
        status,
        note,
        checkIn: status === "PRESENT" ? new Date() : undefined
      },
      create: {
        employeeId,
        date: today,
        status,
        note,
        checkIn: status === "PRESENT" ? new Date() : undefined
      }
    });

    return NextResponse.json(record);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
