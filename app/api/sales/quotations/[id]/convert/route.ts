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
      const quotation = await tx.quotation.findUnique({
        where: { id: params.id, tenantId },
      });

      if (!quotation) throw new Error("Quotation not found");

      const order = await tx.salesOrder.create({
        data: {
          tenantId,
          number: `SO-${Date.now()}`,
          quotationId: quotation.id,
          contactId: quotation.contactId,
          date: new Date(),
          total: quotation.total,
          status: "OPEN",
        }
      });

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
