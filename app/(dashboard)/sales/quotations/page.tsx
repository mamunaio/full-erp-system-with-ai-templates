"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  FileDown, 
  ArrowLeft,
  MoreVertical,
  FileText,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Printer,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function QuotationsPage() {
  const quotations = [
    { id: "QT-2024-001", customer: "Meta Corp", date: "May 10, 2026", validUntil: "May 20, 2026", total: "$12,000", status: "Accepted" },
    { id: "QT-2024-002", customer: "Tesla Inc", date: "May 12, 2026", validUntil: "May 22, 2026", total: "$45,500", status: "Sent" },
    { id: "QT-2024-003", customer: "SpaceX", date: "May 05, 2026", validUntil: "May 15, 2026", total: "$32,000", status: "Expired" },
    { id: "QT-2024-004", customer: "Vertex Agency", date: "May 14, 2026", validUntil: "May 24, 2026", total: "$8,200", status: "Draft" },
    { id: "QT-2024-005", customer: "Orizon Logistics", date: "May 13, 2026", validUntil: "May 23, 2026", total: "$15,400", status: "Sent" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/sales" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Sales Command
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Sales <span className="text-indigo-600">Quotations</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Draft and manage professional proposals for potential clients.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-2xl h-14 px-8 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm active:scale-95 transition-all">
             Proposal History
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">
            <Plus className="w-5 h-5 mr-3" /> New Quotation
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
        <QuoteStatsCard label="Drafts" value="08" icon={FileText} color="text-slate-400" bg="bg-slate-50 dark:bg-slate-800/50" />
        <QuoteStatsCard label="Pending Approval" value="14" icon={Send} color="text-blue-500" bg="bg-blue-50 dark:bg-blue-900/20" />
        <QuoteStatsCard label="Accepted" value="32" icon={CheckCircle2} color="text-emerald-500" bg="bg-emerald-50 dark:bg-emerald-900/20" />
        <QuoteStatsCard label="Expired" value="05" icon={XCircle} color="text-rose-500" bg="bg-rose-50 dark:bg-rose-900/20" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl" />
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 relative z-10">
           <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search quotes, customers, or reference..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-xs font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
              />
           </div>
           <div className="flex items-center space-x-2">
              <Button variant="outline" className="rounded-xl h-11 border-slate-100 text-[10px] font-black uppercase tracking-widest"><Filter className="w-4 h-4 mr-2" /> Sort By</Button>
           </div>
        </div>

        <div className="overflow-x-auto relative z-10">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                <th className="pb-4">Reference</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Quote Date</th>
                <th className="pb-4">Valid Until</th>
                <th className="pb-4">Total Amount</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {quotations.map((quote) => (
                <tr key={quote.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
                  <td className="py-5 font-black text-xs text-indigo-600 tracking-tight">{quote.id}</td>
                  <td className="py-5 font-bold text-sm text-slate-900 dark:text-white">{quote.customer}</td>
                  <td className="py-5 text-xs font-medium text-slate-500">{quote.date}</td>
                  <td className="py-5 text-xs font-bold text-slate-400 tracking-tight">{quote.validUntil}</td>
                  <td className="py-5 font-black text-sm text-slate-900 dark:text-white">{quote.total}</td>
                  <td className="py-5">
                    <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border", 
                      quote.status === "Accepted" ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20" : 
                      quote.status === "Sent" ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20" : 
                      quote.status === "Draft" ? "bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800/40" :
                      "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20")}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="py-5 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-indigo-600">
                          <Printer className="w-4 h-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-indigo-600">
                          <Share2 className="w-4 h-4" />
                       </Button>
                       <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                          <MoreVertical className="w-4 h-4" />
                       </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function QuoteStatsCard({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4 group hover:shadow-xl transition-all duration-500">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", bg)}>
          <Icon className={cn("w-6 h-6", color)} />
       </div>
       <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
          <p className="text-xl font-black text-slate-900 dark:text-white mt-1">{value}</p>
       </div>
    </div>
  );
}
