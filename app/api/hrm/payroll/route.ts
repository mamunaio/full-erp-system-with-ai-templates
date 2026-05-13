import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const month = searchParams.get("month");
    const year = searchParams.get("year");

    const payrolls = await prisma.payroll.findMany({
      where: {
        employee: { tenantId: session.user.tenantId },
        ...(month && { month: parseInt(month) }),
        ...(year && { year: parseInt(year) }),
      },
      include: { employee: { select: { name: true, employeeId: true, department: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(payrolls);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { month, year } = await req.json();
    
    // Generate for all active employees
    const employees = await prisma.employee.findMany({
      where: { tenantId: session.user.tenantId, status: "ACTIVE" }
    });

    const payrolls = await Promise.all(employees.map(emp => {
      return prisma.payroll.create({
        data: {
          employeeId: emp.id,
          month,
          year,
          basic: emp.salary,
          allowances: 0,
          deductions: 0,
          netPay: emp.salary,
          status: "DRAFT"
        }
      });
    }));

    return NextResponse.json(payrolls);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
