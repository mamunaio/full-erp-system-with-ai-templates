import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { purchaseOrderId, items } = await req.json();
    const tenantId = session.user.tenantId;

    const result = await prisma.$transaction(async (tx) => {
      const grn = await tx.gRN.create({
        data: {
          tenantId,
          purchaseOrderId,
          date: new Date(),
          note: `Received against PO: ${purchaseOrderId}`,
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              receivedQty: item.qtyReceived
            }))
          }
        }
      });

      const warehouse = await tx.warehouse.findFirst({ where: { tenantId } });
      if (!warehouse) throw new Error("No warehouse found");

      for (const item of items) {
        await tx.stock.upsert({
          where: { productId_warehouseId: { productId: item.productId, warehouseId: warehouse.id } },
          update: { quantity: { increment: item.qtyReceived } },
          create: {
            tenantId,
            productId: item.productId,
            warehouseId: warehouse.id,
            quantity: item.qtyReceived
          }
        });

        await tx.stockMovement.create({
          data: {
            tenantId,
            productId: item.productId,
            warehouseId: warehouse.id,
            type: "IN",
            quantity: item.qtyReceived,
            reference: grn.id,
            note: `GRN received against PO: ${purchaseOrderId}`
          }
        });
      }

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
