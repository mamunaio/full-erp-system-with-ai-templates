"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3, TrendingUp, TrendingDown, DollarSign,
  Users, Package, Sparkles, Download, Calendar,
  PieChart, Activity, ShieldCheck, ArrowUpRight,
  ArrowDownLeft, FileText, ChevronRight, Filter,
  Share2, RefreshCw, CheckCircle2, AlertTriangle,
  Layers, Target, Award, Landmark, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  ResponsiveContainer, AreaChart, Area, 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  PieChart as RechartsPie, Pie, Cell 
} from "recharts";
import { toast } from "sonner";
import Link from "next/link";

const macroMetrics = [
  { label: "Consolidated Revenue (YTD)", value: "$1,248,500", change: "+14.2% YoY", trend: "up", sub: "Annual Target: $1.8M" },
  { label: "Operating EBITDA Margin", value: "42.8%", change: "+3.4% YoY", trend: "up", sub: "$534,358 Net Profit" },
  { label: "LTV / CAC Ratio", value: "5.8x", change: "+0.6x", trend: "up", sub: "Benchmark: > 3.0x" },
  { label: "Net Revenue Retention (NRR)", value: "118.4%", change: "+4.2%", trend: "up", sub: "Cohort Growth: High" },
];

const departmentGauges = [
  {
    title: "Finance & Fiscal Health",
    metric: "$420,000 / mo",
    label: "Monthly Inflow",
    detail: "OpEx: $195,000 • Margin: 53.5%",
    status: "Exceptional",
    percent: 88,
    color: "from-amber-500 to-yellow-400",
    icon: Landmark,
    href: "/finance",
  },
  {
    title: "Sales & Pipeline Velocity",
    metric: "$3,480,000",
    label: "Active Pipeline",
    detail: "Win Rate: 68.4% • 18.4 Day Cycle",
    status: "Strong Flow",
    percent: 78,
    color: "from-blue-500 to-cyan-400",
    icon: Target,
    href: "/crm",
  },
  {
    title: "Human Capital & Productivity",
    metric: "$8,003 / mo",
    label: "Revenue Per Employee",
    detail: "156 Staff • 91.0% Capacity",
    status: "Optimal",
    percent: 91,
    color: "from-emerald-500 to-teal-400",
    icon: Users,
    href: "/hrm",
  },
  {
    title: "Supply Chain & Asset Logistics",
    metric: "8.4x / yr",
    label: "Stock Turnover",
    detail: "$1.84M Assets • 3 Mega-Hubs",
    status: "Balanced",
    percent: 84,
    color: "from-purple-500 to-indigo-400",
    icon: Package,
    href: "/inventory",
  },
];

const multiYearTrajectory = [
  { month: "Jan", revenue: 65, opex: 38, profit: 27 },
  { month: "Feb", revenue: 72, opex: 40, profit: 32 },
  { month: "Mar", revenue: 68, opex: 39, profit: 29 },
  { month: "Apr", revenue: 84, opex: 45, profit: 39 },
  { month: "May", revenue: 79, opex: 44, profit: 35 },
  { month: "Jun", revenue: 95, opex: 48, profit: 47 },
  { month: "Jul", revenue: 108, opex: 52, profit: 56 },
  { month: "Aug", revenue: 102, opex: 50, profit: 52 },
  { month: "Sep", revenue: 118, opex: 55, profit: 63 },
  { month: "Oct", revenue: 112, opex: 53, profit: 59 },
  { month: "Nov", revenue: 128, opex: 58, profit: 70 },
  { month: "Dec", revenue: 145, opex: 62, profit: 83 },
];

const revenueStreams = [
  { name: "Enterprise SaaS Subscriptions", value: 580000, share: "46.5%", color: "#D4A853" },
  { name: "Managed Hardware & Devices", value: 380000, share: "30.4%", color: "#3B82F6" },
  { name: "Strategic Professional Services", value: 288500, share: "23.1%", color: "#10B981" },
];

const strategicOpportunities = [
  {
    id: "so-1",
    title: "Annual Billing Incentive Expansion",
    impact: "+$85,000 Cash Advance",
    desc: "Migrating 24 monthly enterprise customers to annual upfront billing reduces churn by 65% and provides immediate liquidity.",
    confidence: "98% Probability",
    type: "Revenue Expansion"
  },
  {
    id: "so-2",
    title: "Automated Bulk Supplier PO Arbitrage",
    impact: "-$22,400 Cost Reduction",
    desc: "Aggregating quarterly component orders for Cisco & Dell hardware unlocks top tier tier-1 distributor volume discounts.",
    confidence: "94% Probability",
    type: "Procurement Savings"
  },
  {
    id: "so-3",
    title: "Unutilized Staging Cluster Termination",
    impact: "-$3,800 / mo OpEx",
    desc: "3 dormant AWS test nodes in eu-west have zero network traffic. Automated deprecation script prepared.",
    confidence: "99% Probability",
    type: "Infrastructure"
  },
];

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<"30D" | "Q3" | "YTD" | "ALL">("YTD");
  const [isExporting, setIsExporting] = useState(false);

  const handleExportDossier = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Executive BI Dossier Generated! PDF & Raw Excel datasets downloaded.");
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">
      {/* Top Banner: Executive Business Intelligence Command */}
      <div className="glass-strong rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Consolidated Enterprise Telemetry
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
              Executive Analytics & <span className="gold-text">Business Intelligence</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
              Cross-enterprise EBITDA margins, revenue retention cohorts, department velocity benchmarks, and growth arbitrage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Timeframe Selector */}
            <div className="flex items-center gap-1 bg-card/70 p-1.5 rounded-2xl border border-border">
              {(["30D", "Q3", "YTD", "ALL"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    timeframe === tf
                      ? "gold-gradient text-obsidian-900 shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tf === "30D" ? "Last 30D" : tf === "Q3" ? "Q3 2026" : tf === "YTD" ? "YTD 2026" : "All Time"}
                </button>
              ))}
            </div>

            <Button
              onClick={handleExportDossier}
              disabled={isExporting}
              className="gold-gradient text-obsidian-900 font-extrabold text-xs sm:text-sm rounded-2xl h-11 px-5 shadow-lg shadow-gold-500/20 hover:opacity-90 flex items-center gap-2"
            >
              <Download className={`w-4 h-4 ${isExporting ? "animate-bounce" : ""}`} />
              <span>{isExporting ? "Exporting Dossier..." : "Export BI Report"}</span>
            </Button>
          </div>
        </div>

        {/* Macro Strategic Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-border/50">
          {macroMetrics.map((m, idx) => (
            <div key={idx} className="bg-card/50 p-4 rounded-2xl border border-border space-y-1">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
                <span>{m.label}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{m.change}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading tabular-nums">
                {m.value}
              </div>
              <p className="text-[10px] text-muted-foreground">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Cross-Department Operational Performance Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {departmentGauges.map((dept, idx) => (
          <div 
            key={idx} 
            className="glass rounded-3xl p-5 border border-border/80 shadow-lg space-y-3 relative overflow-hidden group hover:border-gold-500/40 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 flex items-center justify-center">
                <dept.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {dept.status}
              </span>
            </div>

            <div>
              <p className="text-[11px] text-muted-foreground font-bold uppercase tracking-wider">{dept.title}</p>
              <div className="text-2xl font-extrabold text-foreground font-heading my-0.5">{dept.metric}</div>
              <p className="text-[11px] text-muted-foreground font-medium">{dept.detail}</p>
            </div>

            {/* Progress Gauge */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Operational Efficiency</span>
                <span className="font-extrabold text-foreground">{dept.percent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-accent/60 overflow-hidden">
                <div 
                  className="h-full rounded-full gold-gradient" 
                  style={{ width: `${dept.percent}%` }}
                />
              </div>
            </div>

            <div className="pt-2 border-t border-border/40 flex items-center justify-between">
              <Link href={dept.href} className="text-[11px] font-bold text-gold-600 dark:text-gold-400 hover:text-foreground flex items-center gap-1 transition-colors">
                View Deep Dive <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Multi-Dimensional Trajectory & Revenue Streams Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Revenue vs OpEx vs Net Profit Trajectory */}
        <div className="lg:col-span-2 glass rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
                Multi-Stream Fiscal Trajectory ($k)
              </h3>
              <p className="text-xs text-muted-foreground">
                Gross Revenue vs Operating Expenses vs Net Operating Profit Margin
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gold-500" /> Revenue</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-rose-500" /> OpEx</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" /> Net Profit</span>
            </div>
          </div>

          <div className="h-[320px] w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={multiYearTrajectory} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="analyticsRevGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#D4A853" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#D4A853" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="analyticsProfitGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}k`} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--card) / 0.95)",
                    backdropFilter: "blur(20px)",
                    color: "hsl(var(--foreground))",
                    fontSize: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                  }}
                  formatter={(value: any) => [`$${value},000`, ""]}
                />
                <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#D4A853" strokeWidth={2.5} fill="url(#analyticsRevGrad)" />
                <Area type="monotone" dataKey="profit" name="Net Profit" stroke="#10B981" strokeWidth={2} fill="url(#analyticsProfitGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right 1 Col: Revenue Stream Breakdown */}
        <div className="glass rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-foreground font-heading">Revenue Mix</h3>
              <p className="text-xs text-muted-foreground">$1.248M Total Realized</p>
            </div>
            <PieChart className="w-5 h-5 text-gold-500" />
          </div>

          <div className="h-[180px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie>
                <Pie
                  data={revenueStreams}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueStreams.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--card) / 0.95)",
                    backdropFilter: "blur(20px)",
                    fontSize: "12px",
                  }}
                  formatter={(val: any) => [`$${val.toLocaleString()}`, ""]}
                />
              </RechartsPie>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2.5 pt-2 border-t border-border/40">
            {revenueStreams.map((s, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                  <span className="font-semibold text-foreground truncate max-w-[140px]">{s.name}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-muted-foreground">${(s.value / 1000).toFixed(0)}k</span>
                  <span className="font-bold text-foreground">{s.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Arbitrage & High-Impact Growth Opportunities */}
      <div className="glass rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground font-heading">
                Strategic Growth & Arbitrage Opportunities
              </h3>
              <p className="text-xs text-muted-foreground">High-confidence financial and operational optimization targets</p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/20">
            AI Scored
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {strategicOpportunities.map((opp) => (
            <div 
              key={opp.id} 
              className="p-4 rounded-2xl bg-card/60 hover:bg-card border border-border/70 hover:border-gold-500/40 transition-all space-y-3 group shadow-sm"
            >
              <div className="flex items-start justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground bg-accent px-2 py-0.5 rounded-md">
                  {opp.type}
                </span>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                  {opp.confidence}
                </span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-foreground group-hover:text-gold-500 transition-colors">
                  {opp.title}
                </h4>
                <div className="text-base font-extrabold gold-text font-heading my-1">
                  {opp.impact}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {opp.desc}
                </p>
              </div>

              <div className="pt-2 border-t border-border/40">
                <Button
                  size="sm"
                  onClick={() => toast.success(`Initiative queued: ${opp.title}`)}
                  className="w-full rounded-xl text-xs font-bold h-8 gold-gradient text-obsidian-900 hover:opacity-90 shadow-sm"
                >
                  Execute Opportunity
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
