"use client";

import { useSession } from "next-auth/react";
import { 
  Wallet, Users, Package,
  ArrowRight, Landmark, HeartHandshake
} from "lucide-react";
import Link from "next/link";

import AICommandBar from "@/components/dashboard/AICommandBar";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import KPICard from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import QuickActions from "@/components/dashboard/QuickActions";
import TaskWidget from "@/components/dashboard/TaskWidget";
import TreasuryMiniCard from "@/components/dashboard/TreasuryMiniCard";

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
  { id: "1", title: "Review Q4 Fiscal Treasury Audit", priority: "HIGH", projectName: "Finance", dueDate: null, createdAt: new Date(Date.now() - 120 * 60000).toISOString() },
  { id: "2", title: "Approve Inbound Inventory Batch", priority: "MEDIUM", projectName: "Inventory", dueDate: null, createdAt: new Date(Date.now() - 300 * 60000).toISOString() },
  { id: "3", title: "Enterprise Lead Follow-up (Meta Corp)", priority: "HIGH", projectName: "CRM", dueDate: null, createdAt: new Date(Date.now() - 1440 * 60000).toISOString() },
  { id: "4", title: "Monthly Payroll Batch Dispatch", priority: "MEDIUM", projectName: "HRM", dueDate: null, createdAt: new Date(Date.now() - 180 * 60000).toISOString() },
];

const quickActionsData = {
  pendingInvoices: 3,
  pendingLeaves: 1,
  openOrders: 5,
  pendingQuotations: 2,
};

const quickModules = [
  { name: "CRM Pipelines", count: "42 Deals ($3.48M)", href: "/crm", icon: HeartHandshake, color: "text-blue-500 bg-blue-500/10" },
  { name: "Master Treasury", count: "$1.24M Liquid", href: "/finance", icon: Landmark, color: "text-emerald-500 bg-emerald-500/10" },
  { name: "Human Capital", count: "156 Staff (91%)", href: "/hrm", icon: Users, color: "text-amber-500 bg-amber-500/10" },
  { name: "Inventory Hub", count: "4,280 SKUs", href: "/inventory", icon: Package, color: "text-purple-500 bg-purple-500/10" },
];

const aiDashboardSuggestions = [
  "Forecast Q4 revenue & EBITDA margin",
  "Identify low-stock inventory buffer risks",
  "Show top 3 high-probability CRM deals",
  "Audit monthly payroll and tax deductions",
];

export default function DashboardPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Welcome & Command Center Header */}
      <div>
        <div className="glass-strong rounded-3xl p-5 sm:p-7 md:p-8 relative overflow-hidden border border-border/80 shadow-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/5 blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Tactical Command Operational
                </span>
                <span className="text-xs text-muted-foreground">• 12 Enterprise Nodes Online</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-foreground tracking-tight font-heading">
                Enterprise Cockpit, <span className="gold-text">{session?.user?.name?.split(" ")[0] || "Commander"}</span>
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-xl leading-relaxed">
                Real-time operational telemetry across Treasury, CRM Pipelines, Workforce Rosters, and Warehouse Supply Chains.
              </p>
            </div>

            {/* Quick Live Modules Dispatch */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {quickModules.map((qm, i) => (
                <Link key={i} href={qm.href} className="group">
                  <div className="p-3 rounded-2xl bg-card/60 hover:bg-card border border-border/60 hover:border-gold-500/40 transition-all flex flex-col justify-between h-20 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${qm.color}`}>
                        <qm.icon className="w-3.5 h-3.5" />
                      </div>
                      <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-gold-500 group-hover:translate-x-0.5 transition-all" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold text-foreground truncate group-hover:text-gold-500 transition-colors">{qm.name}</div>
                      <div className="text-[9px] text-muted-foreground font-semibold">{qm.count}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Pulse Command Launcher */}
      <div>
        <AICommandBar suggestions={aiDashboardSuggestions} />
      </div>

      {/* Primary KPI Matrix */}
      <div>
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard 
            title="Consolidated Revenue (YTD)" 
            value="$1,248,500" 
            change="+14.2%" 
            trend="up" 
            icon={Wallet} 
            sparkline={[40, 55, 45, 70, 60, 80, 95]} 
          />
          <KPICard 
            title="Master Liquid Treasury" 
            value="$1,240,500" 
            change="+8.4%" 
            trend="up" 
            icon={Landmark} 
            sparkline={[850, 920, 980, 1050, 1100, 1180, 1240]} 
          />
          <KPICard 
            title="Active Deal Pipeline" 
            value="$3,480,000" 
            change="+22.5%" 
            trend="up" 
            icon={HeartHandshake} 
            sparkline={[1.8, 2.1, 2.4, 2.8, 3.1, 3.3, 3.48]} 
          />
          <KPICard 
            title="Staffing Capacity Index" 
            value="91.0%" 
            change="+2.1%" 
            trend="up" 
            icon={Users} 
            sparkline={[85, 87, 88, 89, 90, 90, 91]} 
          />
        </div>
      </div>

      {/* Core Operational Analytics & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Revenue & Fiscal Chart + Smart Alerts */}
        <div className="lg:col-span-2 space-y-6">
          <RevenueChart data={revenueData} />
          <SmartAlerts />
        </div>

        {/* Right 1 Col: Quick Actions, Action Queue & Treasury Reserves */}
        <div className="space-y-6">
          <QuickActions data={quickActionsData} />
          <TaskWidget data={tasks} />
          <TreasuryMiniCard />
        </div>
      </div>
    </div>
  );
}
