import prisma from "@/lib/prisma";
import { startOfMonth, endOfMonth } from "date-fns";

export class ContextBuilder {
  static async buildForQuery(tenantId: string, query: string) {
    const now = new Date();
    const monthStart = startOfMonth(now);

    // Intent detection (simple keyword matching)
    const needsFinance = /revenue|profit|invoice|payment|cost|প্রফিট|লাভ|খরচ|ইনভয়েস|পেমেন্ট/i.test(query);
    const needsInventory = /stock|inventory|product|material|warehouse|স্টক|ইনভেন্টরি|পণ্য|মালামাল|গুদাম/i.test(query);
    const needsHR = /employee|attendance|leave|salary|staff|কর্মচারী|উপস্থিতি|ছুটি|বেতন/i.test(query);
    const needsCRM = /lead|customer|contact|deal|pipeline|লিড|কাস্টমার|যোগাযোগ|ডিল/i.test(query);

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
        activeLeaves: await prisma.leave.count({ 
          where: { 
            employee: { tenantId }, 
            status: "APPROVED" 
          } 
        })
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
