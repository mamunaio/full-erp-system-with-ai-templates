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
        include: {
          bom: { include: { items: true } }
        }
      });

      if (!wo) throw new Error("Work Order not found");
      if (wo.status !== "PLANNED") throw new Error("Work Order cannot be started");

      for (const item of wo.bom.items) {
        const requiredQty = item.quantity * wo.quantity;
        
        const warehouse = await tx.warehouse.findFirst({ where: { tenantId } });
        if (!warehouse) throw new Error("No warehouse found");

        await tx.stock.update({
          where: { productId_warehouseId: { productId: item.materialId, warehouseId: warehouse.id } },
          data: { quantity: { decrement: requiredQty } }
        });

        await tx.stockMovement.create({
          data: {
            tenantId,
            productId: item.materialId,
            warehouseId: warehouse.id,
            type: "OUT",
            quantity: requiredQty,
            reference: wo.bomId,
            note: `Production start for WO ${wo.id}`
          }
        });
      }

      return await tx.workOrder.update({
        where: { id: params.id },
        data: { status: "IN_PROGRESS" }
      });
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("WO Start Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
