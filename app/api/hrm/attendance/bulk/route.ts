import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { startOfDay } from "date-fns";

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tenantId = (req.auth.user as any).tenantId;
    const today = startOfDay(new Date());

    const employees = await prisma.employee.findMany({
      where: { tenantId, status: "ACTIVE" }
    });

    // Use a loop with upsert to be safe with MongoDB ObjectIds and unique constraints
    const results = [];
    for (const emp of employees) {
      const record = await prisma.attendance.upsert({
        where: {
          employeeId_date: {
            employeeId: emp.id,
            date: today
          }
        },
        update: {
          status: "PRESENT",
          checkIn: new Date()
        },
        create: {
          employeeId: emp.id,
          date: today,
          status: "PRESENT",
          checkIn: new Date()
        }
      });
      results.push(record);
    }

    return NextResponse.json({ success: true, count: results.length });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
