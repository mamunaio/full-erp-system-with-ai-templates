import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string, taskId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { status } = await req.json();

    const task = await prisma.task.update({
      where: { 
        id: params.taskId,
        projectId: params.id,
        tenantId: session.user.tenantId 
      },
      data: { status }
    });

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
