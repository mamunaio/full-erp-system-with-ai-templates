"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Wallet, Users, BarChart3, Package, Sparkles } from "lucide-react";

import AICommandBar from "@/components/dashboard/AICommandBar";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import KPICard from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import QuickActions from "@/components/dashboard/QuickActions";
import TaskWidget from "@/components/dashboard/TaskWidget";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const revenueData = [
  { month: "Jan", revenue: 4500, expense: 3200 },
  { month: "Feb", revenue: 5200, expense: 3400 },
  { month: "Mar", revenue: 4800, expense: 3100 },
  { month: "Apr", revenue: 6100, expense: 4200 },
  { month: "May", revenue: 5900, expense: 3900 },
  { month: "Jun", revenue: 7200, expense: 4500 },
  { month: "Jul", revenue: 8100, expense: 4900 },
  { month: "Aug", revenue: 7600, expense: 4700 },
  { month: "Sep", revenue: 8300, expense: 5100 },
  { month: "Oct", revenue: 7900, expense: 4800 },
  { month: "Nov", revenue: 9200, expense: 5300 },
  { month: "Dec", revenue: 10400, expense: 5800 },
];

const tasks = [
  { id: "1", title: "Approve Q2 Financials", priority: "HIGH", projectName: "Finance", dueDate: null, createdAt: new Date(Date.now() - 120 * 60000).toISOString() },
  { id: "2", title: "Inventory Reorder Review", priority: "MEDIUM", projectName: "Inventory", dueDate: null, createdAt: new Date(Date.now() - 300 * 60000).toISOString() },
  { id: "3", title: "Team Sync Meeting", priority: "LOW", projectName: "Internal", dueDate: null, createdAt: new Date(Date.now() - 1440 * 60000).toISOString() },
  { id: "4", title: "Update API Documentation", priority: "MEDIUM", projectName: "Engineering", dueDate: null, createdAt: new Date(Date.now() - 180 * 60000).toISOString() },
];

const quickActionsData = {
  pendingInvoices: 3,
  pendingLeaves: 1,
  openOrders: 5,
  pendingQuotations: 2,
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

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
          <span className="text-sm text-muted-foreground font-medium">Loading dashboard...</span>
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
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">System Online</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-heading">
                Welcome back, {session?.user?.name?.split(" ")[0] || "there"}
              </h1>
              <p className="text-muted-foreground text-sm">
                Here&apos;s what&apos;s happening across your business today.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-gold-500 to-gold-300 flex items-center justify-center text-[10px] text-obsidian-900 font-bold shadow-lg"
                  >
                    {["A", "B", "C"][i]}
                  </motion.div>
                ))}
              </div>
              <span className="text-xs text-muted-foreground font-medium">3 online</span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AICommandBar />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Total Revenue" value="$128,400" change="+12.4%" trend="up" icon={Wallet} sparkline={[40, 55, 45, 70, 60, 80, 95]} />
          <KPICard title="Active Users" value="1,842" change="+8.1%" trend="up" icon={Users} sparkline={[60, 65, 58, 72, 80, 75, 84]} />
          <KPICard title="System Health" value="99.2%" change="+0.3%" trend="up" icon={BarChart3} sparkline={[95, 97, 96, 98, 97, 99, 99]} />
          <KPICard title="Total Products" value="156" change="+5" trend="up" icon={Package} sparkline={[30, 35, 40, 38, 45, 50, 55]} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:break-inside-avoid [&>*]:mb-4">
          <div className="lg:col-span-1">
            <RevenueChart data={revenueData} />
          </div>
          <div>
            <SmartAlerts />
          </div>
          <div className="space-y-4">
            <QuickActions data={quickActionsData} />
            <TaskWidget data={tasks} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
