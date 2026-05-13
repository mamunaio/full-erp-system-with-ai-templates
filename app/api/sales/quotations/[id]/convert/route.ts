import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = session.user.tenantId;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Get Quotation
      const quotation = await tx.quotation.findUnique({
        where: { id: params.id, tenantId },
        include: { items: true }
      });

      if (!quotation) throw new Error("Quotation not found");

      // 2. Create Sales Order
      const order = await tx.salesOrder.create({
        data: {
          tenantId,
          number: `SO-${Date.now()}`,
          contactId: quotation.contactId,
          subtotal: quotation.subtotal,
          tax: quotation.tax,
          total: quotation.total,
          status: "CONFIRMED",
          items: {
            create: quotation.items.map((item) => ({
              productId: item.productId,
              description: item.description,
              qty: item.qty,
              price: item.price,
              total: item.total
            }))
          }
        }
      });

      // 3. Update Quotation Status
      await tx.quotation.update({
        where: { id: params.id },
        data: { status: "ACCEPTED" }
      });

      return order;
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
