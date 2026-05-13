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
        contact: { select: { name: true, company: true } },
        tasks: { select: { id: true, status: true } },
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
        description: body.description,
        contactId: body.contactId,
        startDate: new Date(body.startDate),
        endDate: new Date(body.endDate),
        budget: body.budget,
        status: body.status || "PLANNING",
        priority: body.priority || "MEDIUM",
        milestones: {
          create: body.milestones?.map((m: any) => ({
            tenantId: session.user.tenantId,
            title: m.title,
            dueDate: new Date(m.dueDate),
            description: m.description
          }))
        }
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Project Create Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
