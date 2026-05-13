import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { purchaseOrderId, warehouseId, items } = await req.json();
    const tenantId = session.user.tenantId;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Create GRN Record
      const grn = await tx.gRN.create({
        data: {
          tenantId,
          purchaseOrderId,
          warehouseId,
          number: `GRN-${Date.now()}`,
          date: new Date(),
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              qtyReceived: item.qtyReceived
            }))
          }
        }
      });

      // 2. Update Inventory Stock for each item
      for (const item of items) {
        await tx.stock.upsert({
          where: { productId_warehouseId: { productId: item.productId, warehouseId } },
          update: { quantity: { increment: item.qtyReceived } },
          create: {
            tenantId,
            productId: item.productId,
            warehouseId,
            quantity: item.qtyReceived
          }
        });

        // Log Movement
        await tx.stockMovement.create({
          data: {
            tenantId,
            productId: item.productId,
            warehouseId,
            type: "PURCHASE",
            quantity: item.qtyReceived,
            reference: grn.number,
            note: `Received against PO: ${purchaseOrderId}`
          }
        });
      }

      // 3. Update PO Status
      await tx.purchaseOrder.update({
        where: { id: purchaseOrderId },
        data: { status: "RECEIVED" }
      });

      return grn;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("GRN Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
