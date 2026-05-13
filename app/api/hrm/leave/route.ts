import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const leaves = await prisma.leave.findMany({
      where: { employee: { tenantId: session.user.tenantId } },
      include: { 
        employee: { select: { name: true, employeeId: true } },
        type: true 
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(leaves);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const leave = await prisma.leave.create({
      data: {
        ...body,
        from: new Date(body.from),
        to: new Date(body.to),
        status: "PENDING",
      }
    });

    return NextResponse.json(leave);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
