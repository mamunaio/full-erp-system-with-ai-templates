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
      // 1. Get Work Order and BOM
      const wo = await tx.workOrder.findUnique({
        where: { id: params.id, tenantId },
        include: {
          bom: { include: { bomItems: true } }
        }
      });

      if (!wo) throw new Error("Work Order not found");
      if (wo.status !== "OPEN") throw new Error("Work Order cannot be started");

      // 2. Deduct Materials from Inventory
      for (const item of wo.bom.bomItems) {
        const requiredQty = item.quantity * wo.quantity;
        
        // Find stock in the designated warehouse (using a default one for now or from WO)
        // Note: In a real app, the warehouse would be selected on the WO.
        const warehouse = await tx.warehouse.findFirst({ where: { tenantId } });
        if (!warehouse) throw new Error("No warehouse found");

        await tx.stock.update({
          where: { productId_warehouseId: { productId: item.productId, warehouseId: warehouse.id } },
          data: { quantity: { decrement: requiredQty } }
        });

        // Log Movement
        await tx.stockMovement.create({
          data: {
            tenantId,
            productId: item.productId,
            warehouseId: warehouse.id,
            type: "OUT",
            quantity: requiredQty,
            reference: wo.number,
            note: `Production start for ${wo.number}`
          }
        });
      }

      // 3. Update Status
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
