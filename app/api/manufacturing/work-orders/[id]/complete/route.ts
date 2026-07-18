import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = session.user.tenantId;

    const result = await prisma.$transaction(async (tx) => {
      const wo = await tx.workOrder.findUnique({
        where: { id: params.id, tenantId },
        include: { bom: { include: { product: true } } }
      });

      if (!wo) throw new Error("Work Order not found");
      if (wo.status !== "IN_PROGRESS") throw new Error("Work Order is not in progress");

      const warehouse = await tx.warehouse.findFirst({ where: { tenantId } });
      if (!warehouse) throw new Error("No warehouse found");

      const productId = wo.bom.productId;

      await tx.stock.upsert({
        where: { productId_warehouseId: { productId, warehouseId: warehouse.id } },
        update: { quantity: { increment: wo.quantity } },
        create: {
          tenantId,
          productId,
          warehouseId: warehouse.id,
          quantity: wo.quantity
        }
      });

      await tx.stockMovement.create({
        data: {
          tenantId,
          productId,
          warehouseId: warehouse.id,
          type: "IN",
          quantity: wo.quantity,
          reference: wo.bomId,
          note: `Production complete for WO ${wo.id}`
        }
      });

      return await tx.workOrder.update({
        where: { id: params.id },
        data: { status: "COMPLETED", endDate: new Date() }
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("WO Complete Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
