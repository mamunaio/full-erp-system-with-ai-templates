import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = session.user.tenantId;

    // Fetch all accounts of type REVENUE and EXPENSE
    const accounts = await prisma.account.findMany({
      where: { 
        tenantId,
        type: { in: ["REVENUE", "EXPENSE"] }
      },
      include: {
        transactions: true // Simplified: in a real app you'd filter by period
      }
    });

    const report = {
      revenue: accounts.filter(a => a.type === "REVENUE"),
      expenses: accounts.filter(a => a.type === "EXPENSE"),
      totalRevenue: accounts.filter(a => a.type === "REVENUE").reduce((sum, a) => sum + Number(a.balance), 0),
      totalExpense: accounts.filter(a => a.type === "EXPENSE").reduce((sum, a) => sum + Number(a.balance), 0),
    };

    return NextResponse.json({
      ...report,
      netProfit: report.totalRevenue - report.totalExpense
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
