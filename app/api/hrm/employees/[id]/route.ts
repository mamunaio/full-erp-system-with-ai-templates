import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const employee = await prisma.employee.findFirst({
      where: {
        id: params.id,
        tenantId: session.user.tenantId,
      },
      include: {
        department: true,
        designation: true,
        attendances: { take: 30, orderBy: { date: "desc" } },
        leaves: { take: 10, orderBy: { createdAt: "desc" } },
        payrolls: { take: 12, orderBy: { createdAt: "desc" } },
      },
    });

    if (!employee) return NextResponse.json({ error: "Not Found" }, { status: 404 });

    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    
    const employee = await prisma.employee.update({
      where: { id: params.id, tenantId: session.user.tenantId },
      data: body,
    });

    return NextResponse.json(employee);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.employee.delete({
      where: { id: params.id, tenantId: session.user.tenantId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
