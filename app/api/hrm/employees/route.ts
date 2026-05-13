import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const departmentId = searchParams.get("departmentId");
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const employees = await prisma.employee.findMany({
      where: {
        tenantId: session.user.tenantId,
        ...(departmentId && { departmentId }),
        ...(status && { status: status as any }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { employeeId: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        department: true,
        designation: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(employees);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    
    const employee = await prisma.employee.create({
      data: {
        ...body,
        tenantId: session.user.tenantId,
        joiningDate: new Date(body.joiningDate),
      },
    });

    return NextResponse.json(employee);
  } catch (error) {
    console.error("Create Employee Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
