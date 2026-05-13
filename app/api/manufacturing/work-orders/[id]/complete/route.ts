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
      // 1. Get Work Order
      const wo = await tx.workOrder.findUnique({
        where: { id: params.id, tenantId },
      });

      if (!wo) throw new Error("Work Order not found");
      if (wo.status !== "IN_PROGRESS") throw new Error("Work Order is not in progress");

      // 2. Add Finished Goods to Inventory
      const warehouse = await tx.warehouse.findFirst({ where: { tenantId } });
      if (!warehouse) throw new Error("No warehouse found");

      await tx.stock.upsert({
        where: { productId_warehouseId: { productId: wo.productId, warehouseId: warehouse.id } },
        update: { quantity: { increment: wo.quantity } },
        create: {
          tenantId,
          productId: wo.productId,
          warehouseId: warehouse.id,
          quantity: wo.quantity
        }
      });

      // Log Movement
      await tx.stockMovement.create({
        data: {
          tenantId,
          productId: wo.productId,
          warehouseId: warehouse.id,
          type: "IN",
          quantity: wo.quantity,
          reference: wo.number,
          note: `Production complete for ${wo.number}`
        }
      });

      // 3. Update Status
      return await tx.workOrder.update({
        where: { id: params.id },
        data: { status: "COMPLETED" }
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("WO Complete Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
