import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    const attendances = await prisma.attendance.findMany({
      where: {
        employee: { tenantId: session.user.tenantId },
        ...(date && { date: new Date(date) }),
        ...(month && year && {
          date: {
            gte: new Date(parseInt(year), parseInt(month) - 1, 1),
            lt: new Date(parseInt(year), parseInt(month), 1),
          }
        }),
      },
      include: { employee: { select: { name: true, employeeId: true } } },
    });

    return NextResponse.json(attendances);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { employeeId, type, note } = await req.json();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let attendance = await prisma.attendance.findFirst({
      where: { employeeId, date: today }
    });

    if (type === "check-in") {
      if (attendance) return NextResponse.json({ error: "Already checked in" }, { status: 400 });
      
      const status = new Date().getHours() >= 9 ? "LATE" : "PRESENT";
      attendance = await prisma.attendance.create({
        data: {
          employeeId,
          date: today,
          checkIn: new Date(),
          status,
          note
        }
      });
    } else {
      if (!attendance) return NextResponse.json({ error: "Not checked in yet" }, { status: 400 });
      attendance = await prisma.attendance.update({
        where: { id: attendance.id },
        data: { checkOut: new Date() }
      });
    }

    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
