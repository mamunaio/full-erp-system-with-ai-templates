import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const boms = await prisma.bOM.findMany({
      where: { tenantId: session.user.tenantId },
      include: {
        product: { select: { name: true, sku: true } },
        items: true
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(boms);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const bom = await prisma.bOM.create({
      data: {
        tenantId: session.user.tenantId,
        productId: body.productId,
        name: body.name,
        version: body.version || "1.0",
        items: {
          create: body.items.map((item: any) => ({
            materialId: item.materialId || item.productId,
            quantity: item.quantity,
            unit: item.unit || "PCS",
          }))
        }
      },
      include: {
        items: true,
        product: { select: { name: true, sku: true } }
      }
    });

    return NextResponse.json(bom);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
