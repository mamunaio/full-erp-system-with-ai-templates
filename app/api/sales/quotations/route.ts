import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const quotations = await prisma.quotation.findMany({
      where: { tenantId: session.user.tenantId },
      include: { contact: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(quotations);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const quotation = await prisma.quotation.create({
      data: {
        tenantId: session.user.tenantId,
        number: body.number || `QUO-${Date.now()}`,
        contactId: body.contactId,
        date: new Date(),
        validTill: new Date(body.validTill || body.validUntil),
        total: body.total,
        status: body.status || "DRAFT",
      },
    });

    return NextResponse.json(quotation);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
