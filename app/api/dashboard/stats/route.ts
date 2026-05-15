import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { startOfMonth, endOfMonth, subMonths } from "date-fns";

export const GET = auth(async function GET(req) {
  try {
    if (!req.auth?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tenantId = (req.auth.user as any).tenantId;
    const now = new Date();
    const monthStart = startOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));

    // 1. Revenue Stats
    const currentRevenue = await prisma.invoice.aggregate({
      where: { tenantId, date: { gte: monthStart }, status: "PAID" },
      _sum: { total: true }
    });

    const previousRevenue = await prisma.invoice.aggregate({
      where: { tenantId, date: { gte: lastMonthStart, lt: monthStart }, status: "PAID" },
      _sum: { total: true }
    });

    // 2. HR Stats
    const activeEmployees = await prisma.employee.count({
      where: { tenantId, status: "ACTIVE" }
    });

    // 3. CRM Stats
    const openLeads = await prisma.lead.count({
      where: { tenantId, stage: { not: "CLOSED" } }
    });

    // 4. Inventory Alerts
    const lowStockItems = await prisma.stock.findMany({
      where: { tenantId, quantity: { lt: 10 } },
      include: { product: true },
      take: 5
    });

    // 5. Recent Transactions (Join Invoices and Payments conceptually or just Invoices)
    const recentInvoices = await prisma.invoice.findMany({
      where: { tenantId },
      orderBy: { createdAt: "desc" },
      take: 5,
      include: { contact: true }
    });

    return NextResponse.json({
      revenue: {
        value: currentRevenue._sum.total || 0,
        change: calculateChange(currentRevenue._sum.total || 0, previousRevenue._sum.total || 0)
      },
      employees: {
        value: activeEmployees,
        change: "+0 this month"
      },
      leads: {
        value: openLeads,
        change: "0%"
      },
      lowStock: lowStockItems.map(item => ({
        name: item.product.name,
        stock: item.quantity,
        min: 10,
        img: item.product.name.substring(0, 2).toUpperCase()
      })),
      transactions: recentInvoices.map(inv => ({
        id: inv.id,
        type: "Invoice",
        title: `Invoice ${inv.number}`,
        contact: inv.contact.name,
        amount: inv.total,
        status: inv.status,
        date: inv.createdAt
      }))
    });
  } catch (error) {
    console.error("[DASHBOARD_STATS_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
});

function calculateChange(current: number, previous: number) {
  if (previous === 0) return current > 0 ? "+100%" : "0%";
  const change = ((current - previous) / previous) * 100;
  return `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
}
