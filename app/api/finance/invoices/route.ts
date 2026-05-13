import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const invoices = await prisma.invoice.findMany({
      where: { tenantId: session.user.tenantId },
      include: { contact: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(invoices);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { contactId, items, subtotal, tax, total, dueDate } = await req.json();
    const tenantId = session.user.tenantId;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Create Invoice
      const invoice = await tx.invoice.create({
        data: {
          tenantId,
          number: `INV-${Date.now()}`, // Simple auto-generation
          contactId,
          date: new Date(),
          dueDate: new Date(dueDate),
          subtotal,
          tax,
          total,
          status: "SENT",
          items: {
            create: items.map((item: any) => ({
              productId: item.productId,
              description: item.description,
              qty: item.qty,
              price: item.price,
              total: item.total
            }))
          }
        }
      });

      // 2. Create Journal Entry (Debit: AR, Credit: Sales)
      // Note: In a real system, you'd find the account IDs by code/name
      const arAccount = await tx.account.findFirst({ where: { tenantId, code: "1200" } }); // 1200 = AR
      const salesAccount = await tx.account.findFirst({ where: { tenantId, code: "4100" } }); // 4100 = Sales

      if (arAccount && salesAccount) {
        await tx.journalEntry.create({
          data: {
            tenantId,
            date: new Date(),
            reference: invoice.number,
            description: `Invoice for ${invoice.number}`,
            lines: {
              create: [
                { accountId: arAccount.id, debit: total, credit: 0 },
                { accountId: salesAccount.id, debit: 0, credit: total }
              ]
            }
          }
        });
      }

      return invoice;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Invoice Creation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
