"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  DollarSign, TrendingUp, TrendingDown, CreditCard, Plus,
  ArrowUpRight, ArrowDownRight, ArrowDownLeft, Search, Filter,
  FileDown, Wallet, Receipt, PieChart, History, ArrowRight, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

import AICommandBar from "@/components/dashboard/AICommandBar";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import KPICard from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import NewTransactionModal from "./components/NewTransactionModal";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const financeSuggestions = [ "Cash flow analysis", "Expense breakdown", "Profit margin trends", "Budget vs actual" ];

const financeAlerts = [
  { id: "1", severity: "critical" as const, title: "Cash Flow Alert", description: "Operating cash ratio dropped to 1.2x — below 1.5x threshold.", time: "30m ago" },
  { id: "2", severity: "warning" as const, title: "Invoice Overdue", description: "3 invoices totaling $18,500 are past due date.", time: "2h ago" },
  { id: "3", severity: "info" as const, title: "Revenue Milestone", description: "Monthly revenue crossed $400K for the first time.", time: "4h ago" },
  { id: "4", severity: "warning" as const, title: "Expense Spike", description: "Q3 operational expenses up 12% vs Q2.", time: "6h ago" },
  { id: "5", severity: "info" as const, title: "Tax Filing Reminder", description: "Quarterly VAT return due in 14 days.", time: "8h ago" },
];

const cashFlowData = [
  { month: "Jan", revenue: 350000, expense: 180000 },
  { month: "Feb", revenue: 380000, expense: 190000 },
  { month: "Mar", revenue: 340000, expense: 175000 },
  { month: "Apr", revenue: 400000, expense: 200000 },
  { month: "May", revenue: 390000, expense: 195000 },
  { month: "Jun", revenue: 420000, expense: 210000 },
  { month: "Jul", revenue: 450000, expense: 220000 },
  { month: "Aug", revenue: 430000, expense: 215000 },
  { month: "Sep", revenue: 480000, expense: 235000 },
  { month: "Oct", revenue: 460000, expense: 225000 },
  { month: "Nov", revenue: 510000, expense: 250000 },
  { month: "Dec", revenue: 550000, expense: 270000 },
];

export default function FinanceDashboard() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-xl border-2 border-gold-500/20" />
            <div className="absolute inset-0 rounded-xl border-2 border-transparent border-t-gold-500 animate-spin" />
            <div className="absolute inset-1 rounded-lg bg-gold-500/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
            </div>
          </div>
          <span className="text-sm text-muted-foreground font-medium">Loading Finance...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 pb-8 max-w-[1600px] mx-auto">
      <motion.div variants={fadeUp}>
        <div className="bg-card/40 backdrop-blur-2xl rounded-2xl border border-border p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-500/5 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gold-500/5 blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Finance Online</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-heading">
                Finance <span className="text-gold-400">Hub</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Real-time financial intelligence and treasury management.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/finance/reports">
                <Button variant="outline" className="rounded-[20px] h-14 px-8 border-border bg-card/60 font-bold">
                  Monthly Report
                </Button>
              </Link>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-[20px] h-14 px-10 shadow-lg shadow-gold-500/20 font-bold uppercase tracking-tight transition-all active:scale-95"
              >
                <Plus className="w-5 h-5 mr-3" /> New Transaction
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AICommandBar suggestions={financeSuggestions} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Total Balance" value="$1,240,500" change="+12.5%" trend="up" icon={Wallet} sparkline={[850, 920, 980, 1050, 1100, 1180, 1240]} />
          <KPICard title="Monthly Revenue" value="$420,000" change="+8.2%" trend="up" icon={TrendingUp} sparkline={[320, 350, 340, 380, 390, 410, 420]} />
          <KPICard title="Monthly Expenses" value="$185,200" change="+2.4%" trend="down" icon={TrendingDown} sparkline={[170, 175, 172, 180, 178, 182, 185]} />
          <KPICard title="Net Profit" value="$234,800" change="+15.2%" trend="up" icon={PieChart} sparkline={[150, 175, 168, 190, 210, 220, 234]} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:break-inside-avoid [&>*]:mb-4">
          <div className="lg:col-span-1">
            <RevenueChart data={cashFlowData} />
          </div>
          <div>
            <SmartAlerts data={financeAlerts} />
          </div>
          <div className="space-y-4">
            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Recent Transactions</h3>
              <div className="space-y-1">
                <TransactionItem name="Cisco Systems Inc." category="Hardware Purchase" amount="-$12,500" date="Today, 02:45 PM" type="expense" />
                <TransactionItem name="Global Tech Solutions" category="Service Subscription" amount="+$8,240" date="Today, 11:20 AM" type="income" />
                <TransactionItem name="Amazon Web Services" category="Cloud Infrastructure" amount="-$2,400" date="Yesterday, 06:10 PM" type="expense" />
                <TransactionItem name="Meta Platforms" category="Ad Revenue Share" amount="+$4,120" date="Yesterday, 09:30 AM" type="income" />
              </div>
              <Link href="/finance/journal">
                <Button variant="ghost" className="w-full mt-3 text-[10px] font-bold text-gold-400 uppercase tracking-widest">View All Transactions</Button>
              </Link>
            </div>

            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Pending Payments</h3>
              <div className="space-y-3">
                <PendingItem name="Vertex Agency" amount="$4,500" due="In 2 days" color="text-amber-400" />
                <PendingItem name="Orizon Logistics" amount="$12,200" due="Overdue" color="text-rose-400" />
                <PendingItem name="Skyline Towers" amount="$8,000" due="In 5 days" color="text-blue-400" />
              </div>
              <Link href="/finance/invoices">
                <Button variant="ghost" className="w-full mt-3 text-[10px] font-bold text-gold-400 uppercase tracking-widest">Manage Invoices</Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <NewTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
}

function TransactionItem({ name, category, amount, date, type }: any) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 -mx-3 rounded-xl hover:bg-gold-500/5 transition-all cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-xs", type === "income" ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400")}>
          {type === "income" ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-card-foreground group-hover:text-gold-400 transition-colors truncate">{name}</p>
          <p className="text-[10px] text-muted-foreground">{category} · {date}</p>
        </div>
      </div>
      <p className={cn("text-sm font-bold", type === "income" ? "text-emerald-400" : "text-card-foreground")}>{amount}</p>
    </div>
  );
}

function PendingItem({ name, amount, due, color }: any) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-gold-500/50 group-hover:bg-gold-500 transition-colors" />
        <div>
          <p className="text-sm font-bold text-card-foreground leading-none">{name}</p>
          <p className={cn("text-[9px] font-bold uppercase tracking-widest mt-0.5", color)}>{due}</p>
        </div>
      </div>
      <p className="font-bold text-sm text-card-foreground">{amount}</p>
    </div>
  );
}
