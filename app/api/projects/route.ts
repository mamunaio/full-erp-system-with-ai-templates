import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const projects = await prisma.project.findMany({
      where: { tenantId: session.user.tenantId },
      include: {
        tasks: { select: { id: true, status: true } },
        milestones: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const project = await prisma.project.create({
      data: {
        tenantId: session.user.tenantId,
        name: body.name,
        client: body.client,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
        budget: body.budget,
        status: body.status || "NOT_STARTED",
        milestones: {
          create: body.milestones?.map((m: any) => ({
            title: m.title,
            dueDate: new Date(m.dueDate),
          })) || []
        }
      },
      include: {
        milestones: true,
        tasks: true,
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Project Create Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
