"use client";

import { useState, useEffect } from "react";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownRight,
  ArrowDownLeft,
  Plus,
  Search,
  Filter,
  FileDown,
  Wallet,
  Receipt,
  PieChart,
  History,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import NewTransactionModal from "./components/NewTransactionModal";

export default function FinanceDashboard() {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/dashboard" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to App Dashboard
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Finance <span className="text-emerald-600">Hub</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Real-time financial intelligence and treasury management.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/finance/reports">
            <Button variant="outline" className="rounded-2xl h-14 px-8 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm active:scale-95 transition-all">
               Monthly Report
            </Button>
          </Link>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-emerald-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5 mr-3" /> New Transaction
          </Button>
        </div>
      </div>

      {/* Financial Health Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <FinanceStatsCard label="Total Balance" value="$1,240,500" change="+12.5%" isPositive={true} icon={Wallet} color="text-emerald-600" bg="bg-emerald-50 dark:bg-emerald-900/20" />
        <FinanceStatsCard label="Monthly Revenue" value="$420,000" change="+8.2%" isPositive={true} icon={TrendingUp} color="text-blue-600" bg="bg-blue-50 dark:bg-blue-900/20" />
        <FinanceStatsCard label="Monthly Expenses" value="$185,200" change="+2.4%" isPositive={false} icon={TrendingDown} color="text-rose-600" bg="bg-rose-50 dark:bg-rose-900/20" />
        <FinanceStatsCard label="Net Profit" value="$234,800" change="+15.2%" isPositive={true} icon={PieChart} color="text-amber-600" bg="bg-amber-50 dark:bg-amber-900/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cash Flow & Transactions */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Recent Transactions</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Real-time ledger entries</p>
                </div>
                <div className="flex items-center space-x-2">
                   <Link href="/finance/journal">
                      <Button variant="ghost" size="sm" className="text-xs font-black text-emerald-600">VIEW ALL</Button>
                   </Link>
                </div>
              </div>
              
              <div className="space-y-4 relative z-10">
                 <TransactionItem name="Cisco Systems Inc." category="Hardware Purchase" amount="- $12,500.00" date="Today, 02:45 PM" type="expense" />
                 <TransactionItem name="Global Tech Solutions" category="Service Subscription" amount="+ $8,240.00" date="Today, 11:20 AM" type="income" />
                 <TransactionItem name="Amazon Web Services" category="Cloud Infrastructure" amount="- $2,400.00" date="Yesterday, 06:10 PM" type="expense" />
                 <TransactionItem name="Meta Platforms" category="Ad Revenue Share" amount="+ $4,120.00" date="Yesterday, 09:30 AM" type="income" />
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                 <CreditCard className="w-8 h-8 mb-6 text-emerald-500" />
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Main Business Account</h4>
                 <p className="text-3xl font-black mt-2 tracking-tight">**** **** 8240</p>
                 <div className="mt-8 flex justify-between items-end">
                    <div>
                       <p className="text-[8px] font-black uppercase tracking-widest opacity-40">Available Funds</p>
                       <p className="text-xl font-black text-emerald-400">$842,500.00</p>
                    </div>
                    <div className="w-10 h-6 bg-white/10 rounded flex items-center justify-center">
                       <div className="w-3 h-3 bg-amber-500 rounded-full mr-1" />
                       <div className="w-3 h-3 bg-rose-500 rounded-full opacity-50" />
                    </div>
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col justify-between">
                 <div>
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Actions</h4>
                    <div className="grid grid-cols-2 gap-3">
                       <FinanceAction icon={Receipt} label="Invoice" color="bg-blue-500" link="/finance/invoices" />
                       <FinanceAction icon={History} label="Journal" color="bg-emerald-500" link="/finance/journal" />
                       <FinanceAction icon={FileDown} label="Taxes" color="bg-finance-500" link="/finance/reports" />
                       <FinanceAction icon={PieChart} label="Assets" color="bg-rose-500" link="/inventory/products" />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar - Pending & Reports */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Pending Payments</h3>
              <div className="space-y-6">
                 <PendingItem name="Vertex Agency" amount="$4,500" due="In 2 days" color="text-amber-500" />
                 <PendingItem name="Orizon Logistics" amount="$12,200" due="Overdue" color="text-rose-500" />
                 <PendingItem name="Skyline Towers" amount="$8,000" due="In 5 days" color="text-blue-500" />
              </div>
              <Link href="/finance/invoices">
                <Button className="w-full mt-8 h-12 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 font-bold transition-all active:scale-95">
                   Manage Invoices
                </Button>
              </Link>
           </div>

           <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-[32px] p-8 text-white shadow-xl shadow-emerald-600/20 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
              <TrendingUp className="w-8 h-8 mb-4 opacity-50" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Investment Growth</h4>
              <p className="text-3xl font-black mt-1">+24.5%</p>
              <p className="text-xs font-bold mt-4 opacity-80 leading-relaxed">Your portfolio is outperforming the market average this quarter.</p>
              <Link href="/finance/reports">
                <Button className="w-full mt-8 h-12 rounded-2xl bg-white text-emerald-900 font-black hover:bg-white/90 transition-all group active:scale-95">
                   ANALYZE TRENDS <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
           </div>
        </div>
      </div>

      <NewTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

function FinanceStatsCard({ label, value, change, isPositive, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm group hover:shadow-2xl transition-all duration-500 cursor-pointer">
      <div className="flex items-center justify-between mb-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", bg)}>
          <Icon className={cn("w-7 h-7", color)} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className={cn("flex items-center text-[10px] font-black px-2 py-1 rounded-lg", isPositive ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" : "text-rose-600 bg-rose-50 dark:bg-rose-900/20")}>
           {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
           {change}
        </div>
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Since last month</p>
      </div>
    </div>
  );
}

function TransactionItem({ name, category, amount, date, type }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer group">
       <div className="flex items-center space-x-4">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs", type === "income" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600")}>
             {type === "income" ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
          </div>
          <div>
             <p className="font-bold text-sm text-slate-900 dark:text-white">{name}</p>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{category}</p>
          </div>
       </div>
       <div className="text-right">
          <p className={cn("font-black text-sm tracking-tight", type === "income" ? "text-emerald-500" : "text-slate-900 dark:text-white")}>{amount}</p>
          <p className="text-[8px] font-bold text-slate-400 uppercase">{date}</p>
       </div>
    </div>
  );
}

function FinanceAction({ icon: Icon, label, color, link }: any) {
  return (
    <Link href={link || "#"} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all group cursor-pointer">
       <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2 shadow-sm transition-transform group-hover:scale-110", color)}>
          <Icon className="w-4 h-4 text-white" />
       </div>
       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{label}</span>
    </Link>
  );
}

function PendingItem({ name, amount, due, color }: any) {
  return (
    <div className="flex items-center justify-between group cursor-pointer hover:translate-x-1 transition-transform">
       <div className="flex items-center space-x-3">
          <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-emerald-500 transition-colors" />
          <div>
             <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{name}</p>
             <p className={cn("text-[9px] font-black uppercase tracking-widest mt-1", color)}>{due}</p>
          </div>
       </div>
       <p className="font-black text-sm text-slate-900 dark:text-white">{amount}</p>
    </div>
  );
}
