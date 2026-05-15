"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  FileDown, 
  Bell, 
  ArrowLeft,
  AlertCircle,
  MoreVertical,
  ChevronRight,
  TrendingUp,
  CreditCard,
  DollarSign,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import CreateInvoiceModal from "../components/CreateInvoiceModal";

export default function InvoicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const invoices = [
    { id: "INV-2024-001", customer: "Meta Corp", issued: "May 10, 2026", due: "May 25, 2026", total: "$12,000", paid: "$12,000", status: "PAID" },
    { id: "INV-2024-002", customer: "Tesla Inc", issued: "May 12, 2026", due: "May 27, 2026", total: "$50,000", paid: "$15,000", status: "PARTIAL" },
    { id: "INV-2024-003", customer: "SpaceX", issued: "May 05, 2026", due: "May 20, 2026", total: "$35,000", paid: "$0", status: "OVERDUE" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/finance" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Finance Hub
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Billing & <span className="text-blue-600">Invoices</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Create professional invoices, track payments, and manage receivables.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-2xl h-14 px-8 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm active:scale-95 transition-all">
            <Mail className="w-4 h-4 mr-3 text-slate-400" /> Send Reminders
          </Button>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5 mr-3" /> New Invoice
          </Button>
        </div>
      </div>

      {/* Overdue Alert */}
      <div className="bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 p-6 rounded-[32px] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-4 text-rose-600 dark:text-rose-400">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Critical Attention Required</p>
            <p className="font-bold text-sm">8 Overdue Invoices detected. Total outstanding balance: <span className="font-black">$12,450.00</span></p>
          </div>
        </div>
        <Link href="/finance/invoices">
           <Button variant="ghost" className="text-rose-600 font-black text-xs hover:bg-rose-500/10 px-6 rounded-xl">FOLLOW UP NOW</Button>
        </Link>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <InvoiceStatsCard label="Total Revenue" value="$84,230" change="+18%" color="text-blue-600" bg="bg-blue-50 dark:bg-blue-900/20" />
        <InvoiceStatsCard label="Accounts Receivable" value="$12,450" change="-5%" color="text-rose-600" bg="bg-rose-50 dark:bg-rose-900/20" />
        <InvoiceStatsCard label="Cash Balance" value="$128,900" change="+12%" color="text-emerald-600" bg="bg-emerald-50 dark:bg-emerald-900/20" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
           <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by invoice # or customer..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-xs font-medium outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
              />
           </div>
           <div className="flex items-center space-x-2">
              <Button variant="outline" className="rounded-xl h-11 border-slate-100 text-[10px] font-black uppercase tracking-widest"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-11 px-6 font-black shadow-lg shadow-blue-600/20 active:scale-95 transition-all"
              >
                + Create Invoice
              </Button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                <th className="pb-4">Invoice #</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Due Date</th>
                <th className="pb-4">Total</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {invoices.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
                  <td className="py-5 font-black text-slate-900 dark:text-white tracking-tight">{item.id}</td>
                  <td className="py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-white">{item.customer}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Issued: {item.issued}</span>
                    </div>
                  </td>
                  <td className="py-5 text-xs font-bold text-slate-500">{item.due}</td>
                  <td className="py-5">
                    <div className="flex flex-col">
                      <span className="font-black text-slate-900 dark:text-white">{item.total}</span>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase">Paid: {item.paid}</span>
                    </div>
                  </td>
                  <td className="py-5">
                    <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border", 
                      item.status === "PAID" ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20" : 
                      item.status === "PARTIAL" ? "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20" : 
                      "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20")}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-5 text-right">
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CreateInvoiceModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function InvoiceStatsCard({ label, value, change, color, bg }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm group hover:shadow-xl transition-all duration-500">
       <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{label}</p>
          <span className={cn("text-[10px] font-black px-2 py-1 rounded-lg", bg, color)}>{change}</span>
       </div>
       <div className="flex items-end justify-between">
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all", bg)}>
             <TrendingUp className={cn("w-5 h-5", color)} />
          </div>
       </div>
       <div className="mt-4 h-1 w-full bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
          <div className={cn("h-full w-2/3 rounded-full", bg.replace("/20", ""))} />
       </div>
    </div>
  );
}
