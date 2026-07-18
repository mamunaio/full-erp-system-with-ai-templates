import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { startOfMonth, subMonths, format } from "date-fns";

export const dynamic = "force-dynamic";

export const GET = auth(async function GET(req) {
  try {
    if (!req.auth?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tenantId = (req.auth.user as any).tenantId;
    const now = new Date();
    const monthStart = startOfMonth(now);
    const lastMonthStart = startOfMonth(subMonths(now, 1));

    // Run all queries in parallel
    const [
      currentRevenue,
      previousRevenue,
      activeEmployees,
      previousEmployees,
      openLeads,
      previousLeads,
      lowStockItems,
      recentInvoices,
      recentPayments,
      pendingTasks,
      openOrders,
      totalProducts,
      quotations,
    ] = await Promise.all([
      // Revenue
      prisma.invoice.aggregate({
        where: { tenantId, date: { gte: monthStart }, status: "PAID" },
        _sum: { total: true },
      }),
      prisma.invoice.aggregate({
        where: { tenantId, date: { gte: lastMonthStart, lt: monthStart }, status: "PAID" },
        _sum: { total: true },
      }),
      // Employees
      prisma.employee.count({ where: { tenantId, status: "ACTIVE" } }),
      prisma.employee.count({ where: { tenantId, status: "ACTIVE", createdAt: { lt: monthStart } } }),
      // Leads
      prisma.lead.count({ where: { tenantId, stage: { not: "CLOSED" } } }),
      prisma.lead.count({ where: { tenantId, stage: { not: "CLOSED" }, createdAt: { lt: monthStart } } }),
      // Low stock
      prisma.stock.findMany({
        where: { tenantId, quantity: { lt: 10 } },
        include: { product: true },
        take: 8,
      }),
      // Recent invoices
      prisma.invoice.findMany({
        where: { tenantId },
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { contact: true },
      }),
      // Recent payments
      prisma.payment.findMany({
        where: { tenantId },
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { invoice: { select: { number: true } } },
      }),
      // Pending tasks
      prisma.task.findMany({
        where: { project: { tenantId }, status: { not: "DONE" } },
        take: 6,
        include: { project: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
      }),
      // Open sales orders
      prisma.salesOrder.count({ where: { tenantId, status: "OPEN" } }),
      // Total products
      prisma.product.count({ where: { tenantId } }),
      // Quotations
      prisma.quotation.count({ where: { tenantId, status: "SENT" } }),
    ]);

    // Build revenue chart data (last 6 months)
    const revenueChart = [];
    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      const mStart = startOfMonth(monthDate);
      const mEnd = startOfMonth(subMonths(monthDate, -1));

      const [rev, exp] = await Promise.all([
        prisma.invoice.aggregate({
          where: { tenantId, date: { gte: mStart, lt: mEnd }, status: "PAID" },
          _sum: { total: true },
        }),
        prisma.payment.aggregate({
          where: { tenantId, createdAt: { gte: mStart, lt: mEnd } },
          _sum: { amount: true },
        }),
      ]);

      revenueChart.push({
        month: format(monthDate, "MMM"),
        revenue: rev._sum.total || 0,
        expense: exp._sum.amount || 0,
      });
    }

    // Build sales by category
    const products = await prisma.product.findMany({
      where: { tenantId },
      include: { category: true, stocks: true },
    });

    const categoryMap = new Map<string, number>();
    for (const product of products) {
      const catName = product.category?.name || "Uncategorized";
      const stock = product.stocks.reduce((sum, s) => sum + s.quantity, 0);
      categoryMap.set(catName, (categoryMap.get(catName) || 0) + stock);
    }

    const salesByCategory = Array.from(categoryMap.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    // Build recent activity (merge invoices + payments, sort by date)
    const activity = [
      ...recentInvoices.map((inv) => ({
        id: inv.id,
        type: "invoice" as const,
        title: `Invoice ${inv.number}`,
        contact: inv.contact.name,
        amount: inv.total,
        status: inv.status,
        date: inv.createdAt,
      })),
      ...recentPayments.map((pay) => ({
        id: pay.id,
        type: "payment" as const,
        title: `Payment ${pay.invoice?.number || ""}`,
        contact: pay.method,
        amount: pay.amount,
        status: "COMPLETED",
        date: pay.createdAt,
      })),
    ]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 10);

    // Quick actions counts
    const quickActions = {
      pendingInvoices: await prisma.invoice.count({ where: { tenantId, status: "SENT" } }),
      pendingLeaves: await prisma.leave.count({ where: { employee: { tenantId }, status: "PENDING" } }),
      openOrders,
      pendingQuotations: quotations,
    };

    return NextResponse.json({
      revenue: {
        value: currentRevenue._sum.total || 0,
        change: calculateChange(currentRevenue._sum.total || 0, previousRevenue._sum.total || 0),
      },
      employees: {
        value: activeEmployees,
        change: calculateChange(activeEmployees, previousEmployees),
      },
      leads: {
        value: openLeads,
        change: calculateChange(openLeads, previousLeads),
      },
      products: {
        value: totalProducts,
      },
      revenueChart,
      salesByCategory,
      activity,
      tasks: pendingTasks.map((t) => ({
        id: t.id,
        title: t.title,
        priority: t.priority,
        projectName: t.project?.name || "",
        dueDate: t.dueDate,
        createdAt: t.createdAt,
      })),
      lowStock: lowStockItems.map((item) => ({
        id: item.id,
        name: item.product.name,
        sku: item.product.sku,
        stock: item.quantity,
        min: 10,
      })),
      quickActions,
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
