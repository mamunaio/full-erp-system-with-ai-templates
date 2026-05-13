import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");
    const search = searchParams.get("search");

    const contacts = await prisma.contact.findMany({
      where: {
        tenantId: session.user.tenantId,
        ...(type && { type: type as any }),
        ...(search && {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { company: { contains: search, mode: "insensitive" } },
          ],
        }),
      },
      include: {
        leads: { select: { id: true, title: true, value: true, stage: true } },
        activities: { take: 1, orderBy: { createdAt: "desc" } }
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(contacts);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const contact = await prisma.contact.create({
      data: {
        ...body,
        tenantId: session.user.tenantId,
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
