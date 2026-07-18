"use client";

import Link from "next/link";
import { FileText, UserPlus, ShoppingCart, FileSignature } from "lucide-react";

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
    <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
      <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-2">
        {actions.map((action) => {
          const count = action.key ? data[action.key] : null;
          return (
            <Link key={action.label} href={action.href}>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-gold-500/10 hover:bg-gold-500/20 border border-transparent hover:border-gold-500/20 transition-all duration-200 group cursor-pointer hover:scale-105">
                <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <action.icon className="w-4 h-4 text-gold-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-card-foreground truncate">{action.label}</p>
                  {count !== null && count !== undefined && (
                    <p className="text-[10px] text-gold-400/70">{count} pending</p>
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
