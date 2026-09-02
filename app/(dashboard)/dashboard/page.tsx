"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { 
  Wallet, Users, BarChart3, Package, Sparkles, 
  ArrowRight, ShieldCheck, Activity, TrendingUp,
  HeartHandshake, ShoppingCart, Factory, Kanban
} from "lucide-react";
import Link from "next/link";

import AICommandBar from "@/components/dashboard/AICommandBar";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import KPICard from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import QuickActions from "@/components/dashboard/QuickActions";
import TaskWidget from "@/components/dashboard/TaskWidget";
import TreasuryMiniCard from "@/components/dashboard/TreasuryMiniCard";

const stagger = { 
  hidden: { opacity: 0 }, 
  show: { opacity: 1, transition: { staggerChildren: 0.08 } } 
};
const fadeUp = { 
  hidden: { opacity: 0, y: 20, scale: 0.98 }, 
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } } 
};

const revenueData = [
  { month: "Jan", revenue: 45000, expense: 32000 },
  { month: "Feb", revenue: 52000, expense: 34000 },
  { month: "Mar", revenue: 48000, expense: 31000 },
  { month: "Apr", revenue: 61000, expense: 42000 },
  { month: "May", revenue: 59000, expense: 39000 },
  { month: "Jun", revenue: 72000, expense: 45000 },
  { month: "Jul", revenue: 81000, expense: 49000 },
  { month: "Aug", revenue: 76000, expense: 47000 },
  { month: "Sep", revenue: 83000, expense: 51000 },
  { month: "Oct", revenue: 79000, expense: 48000 },
  { month: "Nov", revenue: 92000, expense: 53000 },
  { month: "Dec", revenue: 104000, expense: 58000 },
];

const tasks = [
  { id: "1", title: "Review Q4 Fiscal Audit", priority: "HIGH", projectName: "Finance", dueDate: null, createdAt: new Date(Date.now() - 120 * 60000).toISOString() },
  { id: "2", title: "Approve Inbound Inventory Batch", priority: "MEDIUM", projectName: "Inventory", dueDate: null, createdAt: new Date(Date.now() - 300 * 60000).toISOString() },
  { id: "3", title: "Enterprise Lead Follow-up (Meta Corp)", priority: "HIGH", projectName: "CRM", dueDate: null, createdAt: new Date(Date.now() - 1440 * 60000).toISOString() },
  { id: "4", title: "Monthly Payroll Dispatch", priority: "MEDIUM", projectName: "HRM", dueDate: null, createdAt: new Date(Date.now() - 180 * 60000).toISOString() },
];

const quickActionsData = {
  pendingInvoices: 3,
  pendingLeaves: 1,
  openOrders: 5,
  pendingQuotations: 2,
};

const quickModules = [
  { name: "CRM Pipelines", count: "184 Deals", href: "/crm", icon: HeartHandshake, color: "text-blue-500 bg-blue-500/10" },
  { name: "Master Ledger", count: "$1.28M", href: "/finance", icon: Wallet, color: "text-emerald-500 bg-emerald-500/10" },
  { name: "Human Capital", count: "156 Staff", href: "/hrm", icon: Users, color: "text-amber-500 bg-amber-500/10" },
  { name: "Inventory Hub", count: "4,280 SKUs", href: "/inventory", icon: Package, color: "text-purple-500 bg-purple-500/10" },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-2xl border-2 border-gold-500/20" />
            <div className="absolute inset-0 rounded-2xl border-2 border-transparent border-t-gold-500 animate-spin" />
            <div className="absolute inset-1.5 rounded-xl bg-gold-500/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold-500 animate-pulse" />
            </div>
          </div>
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Synchronizing ERP Matrix...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div 
      variants={stagger} 
      initial="hidden" 
      animate="show" 
      className="space-y-6 pb-12 max-w-[1600px] mx-auto"
    >
      {/* Welcome & Command Center Header */}
      <motion.div variants={fadeUp}>
        <div className="glass-strong rounded-3xl p-4 sm:p-6 md:p-8 relative overflow-hidden border border-border/80 shadow-xl">
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gold-500/10 blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-emerald-500/5 blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 -ml-4.5" />
                <span className="text-[10px] sm:text-[11px] font-extrabold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  All Systems Operational
                </span>
                <span className="text-xs text-muted-foreground">• Multi-Tenant Active</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight font-heading">
                Tactical Command Center, <span className="gold-text">{session?.user?.name?.split(" ")[0] || "Commander"}</span>
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-xl leading-relaxed">
                Real-time operational streams across all enterprise nodes are calibrated and synchronized.
              </p>
            </div>

            {/* Quick Live Modules Dispatch */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              {quickModules.map((qm, i) => (
                <Link key={i} href={qm.href} className="group">
                  <div className="p-2.5 sm:p-3 rounded-2xl bg-card/60 hover:bg-card border border-border/60 hover:border-gold-500/40 transition-all flex flex-col justify-between h-18 sm:h-20 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center ${qm.color}`}>
                        <qm.icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                      </div>
                      <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div>
                      <div className="text-[10px] sm:text-[11px] font-bold text-foreground truncate">{qm.name}</div>
                      <div className="text-[8px] sm:text-[9px] text-muted-foreground font-medium">{qm.count}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Pulse Command Bar */}
      <motion.div variants={fadeUp}>
        <AICommandBar />
      </motion.div>

      {/* Primary KPI Matrix */}
      <motion.div variants={fadeUp}>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard 
            title="Total Revenue (YTD)" 
            value="$1,248,500" 
            change="+14.2%" 
            trend="up" 
            icon={Wallet} 
            sparkline={[40, 55, 45, 70, 60, 80, 95]} 
          />
          <KPICard 
            title="Active Workforce" 
            value="156 Staff" 
            change="+4.8%" 
            trend="up" 
            icon={Users} 
            sparkline={[60, 65, 58, 72, 80, 75, 84]} 
          />
          <KPICard 
            title="System Efficiency" 
            value="99.8%" 
            change="+0.6%" 
            trend="up" 
            icon={BarChart3} 
            sparkline={[95, 97, 96, 98, 97, 99, 99]} 
          />
          <KPICard 
            title="Managed Inventory SKUs" 
            value="4,280" 
            change="+12" 
            trend="up" 
            icon={Package} 
            sparkline={[30, 35, 40, 38, 45, 50, 55]} 
          />
        </div>
      </motion.div>

      {/* Core Operational Analytics & Insights */}
      <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Revenue & Fiscal Chart */}
        <div className="lg:col-span-2 space-y-6">
          <RevenueChart data={revenueData} />
          <SmartAlerts />
        </div>

        {/* Right 1 Col: Quick Actions, Live Tasks & Treasury Reserves */}
        <div className="space-y-6">
          <QuickActions data={quickActionsData} />
          <TaskWidget data={tasks} />
          <TreasuryMiniCard />
        </div>
      </motion.div>
    </motion.div>
  );
}
