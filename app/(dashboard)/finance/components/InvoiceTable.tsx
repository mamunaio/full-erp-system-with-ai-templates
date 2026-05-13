"use client";

import { 
  FileDown, Mail, Eye, MoreHorizontal, 
  Search, Filter, Plus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function InvoiceTable() {
  const invoices = [
    { id: "INV-2024-001", customer: "Meta Corp", date: "May 10, 2026", due: "May 25, 2026", total: 12000, paid: 12000, status: "PAID" },
    { id: "INV-2024-002", customer: "Tesla Inc", date: "May 12, 2026", due: "May 27, 2026", total: 50000, paid: 15000, status: "PARTIAL" },
    { id: "INV-2024-003", customer: "SpaceX", date: "May 05, 2026", due: "May 20, 2026", total: 35000, paid: 0, status: "OVERDUE" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by invoice # or customer..."
            className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="rounded-lg h-9">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Link href="/finance/invoices/new">
            <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-lg h-9">
              <Plus className="w-4 h-4 mr-2" /> Create Invoice
            </Button>
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <th className="p-4 border-b dark:border-slate-800">Invoice #</th>
              <th className="p-4 border-b dark:border-slate-800">Customer</th>
              <th className="p-4 border-b dark:border-slate-800">Due Date</th>
              <th className="p-4 border-b dark:border-slate-800">Total</th>
              <th className="p-4 border-b dark:border-slate-800">Status</th>
              <th className="p-4 border-b dark:border-slate-800 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {invoices.map((inv) => (
              <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                <td className="p-4 font-bold text-slate-900 dark:text-white">{inv.id}</td>
                <td className="p-4">
                  <p className="font-semibold">{inv.customer}</p>
                  <p className="text-[10px] text-slate-400">Issued: {inv.date}</p>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">{inv.due}</td>
                <td className="p-4">
                  <p className="font-bold text-slate-900 dark:text-white">${inv.total.toLocaleString()}</p>
                  <p className="text-[10px] text-emerald-500 font-bold">Paid: ${inv.paid.toLocaleString()}</p>
                </td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    inv.status === "PAID" ? "bg-emerald-100 text-emerald-600" :
                    inv.status === "OVERDUE" ? "bg-rose-100 text-rose-600" :
                    inv.status === "PARTIAL" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                  )}>
                    {inv.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-injaazh-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-blue-600">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-emerald-600">
                      <FileDown className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
