"use client";

import Link from "next/link";
import { FileText, UserPlus, ShoppingCart, FileSignature, ArrowRight } from "lucide-react";

interface QuickActionsData {
  pendingInvoices: number;
  pendingLeaves: number;
  openOrders: number;
  pendingQuotations: number;
}

const actions = [
  { label: "Send Invoice", href: "/finance/invoices", icon: FileText, key: "pendingInvoices" as const },
  { label: "Add Employee", href: "/hrm/employees/new", icon: UserPlus, key: null },
  { label: "New Order", href: "/sales/orders", icon: ShoppingCart, key: "openOrders" as const },
  { label: "Quotations", href: "/sales/quotations", icon: FileSignature, key: "pendingQuotations" as const },
];

export default function QuickActions({ data }: { data: QuickActionsData }) {
  return (
    <div className="glass rounded-2xl border border-border/80 p-5 hover:border-gold-500/30 transition-all duration-300 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-foreground font-heading">Quick Actions</h3>
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Fast Dispatch</span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {actions.map((action) => {
          const count = action.key ? data[action.key] : null;
          return (
            <Link key={action.label} href={action.href}>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-card/80 hover:bg-card border border-border/70 hover:border-gold-500/40 transition-all duration-200 group cursor-pointer shadow-sm hover:shadow-md">
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/20 group-hover:scale-110 transition-transform">
                  <action.icon className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-bold text-foreground truncate group-hover:text-gold-500 transition-colors">{action.label}</p>
                  {count !== null && count !== undefined ? (
                    <p className="text-[10px] font-semibold text-gold-600 dark:text-gold-400">{count} pending</p>
                  ) : (
                    <p className="text-[10px] text-muted-foreground">Ready</p>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
