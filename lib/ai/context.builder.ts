import prisma from "@/lib/prisma";
import { startOfMonth, endOfMonth } from "date-fns";

export class ContextBuilder {
  static async buildForQuery(tenantId: string, query: string) {
    const now = new Date();
    const monthStart = startOfMonth(now);

    // Intent detection (simple keyword matching)
    const needsFinance = /revenue|profit|invoice|payment|cost/i.test(query);
    const needsInventory = /stock|inventory|product|material|warehouse/i.test(query);
    const needsHR = /employee|attendance|leave|salary|staff/i.test(query);
    const needsCRM = /lead|customer|contact|deal|pipeline/i.test(query);

    const context: any = {
      timestamp: now.toISOString(),
      data: {}
    };

    if (needsFinance) {
      context.data.finance = await prisma.invoice.aggregate({
        where: { tenantId, date: { gte: monthStart } },
        _sum: { total: true },
        _count: { id: true }
      });
    }

    if (needsInventory) {
      context.data.inventory = await prisma.stock.findMany({
        where: { tenantId, quantity: { lt: 20 } },
        include: { product: { select: { name: true, sku: true } } },
        take: 10
      });
    }

    if (needsHR) {
      context.data.hr = {
        totalEmployees: await prisma.employee.count({ where: { tenantId } }),
        activeLeaves: await prisma.leaveRequest.count({ where: { tenantId, status: "APPROVED" } })
      };
    }

    if (needsCRM) {
      context.data.crm = await prisma.lead.count({ where: { tenantId } });
    }

    return JSON.stringify(context);
  }

  static async buildForInsights(tenantId: string) {
    // Aggregates everything for a global health check
    const now = new Date();
    const monthStart = startOfMonth(now);

    const summary = {
      finance: await prisma.invoice.aggregate({
        where: { tenantId, date: { gte: monthStart } },
        _sum: { total: true }
      }),
      inventory: await prisma.stock.count({
        where: { tenantId, quantity: { lt: 10 } }
      }),
      hr: await prisma.employee.count({ where: { tenantId, status: "ACTIVE" } }),
      sales: await prisma.salesOrder.count({ where: { tenantId, createdAt: { gte: monthStart } } })
    };

    return JSON.stringify(summary);
  }
}
