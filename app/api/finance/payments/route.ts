import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { invoiceId, amount, method, reference, date } = await req.json();
    const tenantId = session.user.tenantId;

    const result = await prisma.$transaction(async (tx) => {
      // 1. Record Payment
      const payment = await tx.payment.create({
        data: {
          tenantId,
          invoiceId,
          amount,
          method,
          date: new Date(date),
        }
      });

      // 2. Update Invoice Status
      const invoice = await tx.invoice.update({
        where: { id: invoiceId },
        data: { status: "PAID" } // Simplification: assuming full payment
      });

      // 3. Create Journal Entry (Debit: Cash/Bank, Credit: AR)
      const cashAccount = await tx.account.findFirst({ where: { tenantId, code: "1100" } }); // 1100 = Cash
      const arAccount = await tx.account.findFirst({ where: { tenantId, code: "1200" } }); // 1200 = AR

      if (cashAccount && arAccount) {
        await tx.journalEntry.create({
          data: {
            tenantId,
            date: new Date(date),
            reference: invoice.number,
            description: `Payment for ${invoice.number}`,
            lines: {
              create: [
                { accountId: cashAccount.id, debit: amount, credit: 0 },
                { accountId: arAccount.id, debit: 0, credit: amount }
              ]
            }
          }
        });
      }

      return payment;
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
