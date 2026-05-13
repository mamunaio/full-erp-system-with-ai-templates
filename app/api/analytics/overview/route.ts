import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = session.user.tenantId;
    const now = new Date();
    const currentMonthStart = startOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));

    // 1. Financial KPIs
    const invoices = await prisma.invoice.findMany({
      where: { tenantId, date: { gte: currentMonthStart } },
      select: { total: true }
    });
    const revenue = invoices.reduce((sum, inv) => sum + Number(inv.total), 0);

    // 2. Sales KPIs
    const ordersCount = await prisma.salesOrder.count({
      where: { tenantId, createdAt: { gte: currentMonthStart } }
    });

    // 3. HR KPIs
    const employeeCount = await prisma.employee.count({
      where: { tenantId, status: "ACTIVE" }
    });

    // 4. Inventory KPIs
    const lowStockCount = await prisma.stock.count({
      where: { 
        tenantId,
        quantity: { lt: 10 } // Simplified threshold
      }
    });

    return NextResponse.json({
      revenue,
      ordersCount,
      employeeCount,
      lowStockCount,
      // Add more as needed
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
