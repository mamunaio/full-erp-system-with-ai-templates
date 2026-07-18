"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, Download, Calendar, BarChart3, TrendingUp, PieChart,
  Activity, DollarSign, ShoppingCart, Users, Box, AlertCircle,
  ChevronRight, MoreVertical, Loader2, FileText, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

import AICommandBar from "@/components/dashboard/AICommandBar";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import KPICard from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import SalesBreakdown from "@/components/dashboard/SalesBreakdown";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const analyticsSuggestions = [ "Revenue vs expenses", "Growth trends", "Profit margin analysis", "Forecast next quarter" ];

const analyticsAlerts = [
  { id: "1", severity: "warning" as const, title: "Revenue Growth Slowing", description: "Month-over-month growth rate declined from 12% to 8%.", time: "1h ago" },
  { id: "2", severity: "info" as const, title: "Profit Margin Healthy", description: "Net profit margin stable at 34.2% — above industry average.", time: "3h ago" },
  { id: "3", severity: "critical" as const, title: "Expense Spike Detected", description: "Q3 operational expenses 12% above forecast — investigate.", time: "5h ago" },
  { id: "4", severity: "warning" as const, title: "Inventory Turnover Low", description: "Inventory turnover dropped to 4.2x — below 5x target.", time: "7h ago" },
  { id: "5", severity: "info" as const, title: "Employee Headcount Up", description: "Workforce grew 8% this quarter — 124 active employees.", time: "9h ago" },
];

const revenueData = [
  { month: "Jan", revenue: 85000, expense: 62000 },
  { month: "Feb", revenue: 92000, expense: 65000 },
  { month: "Mar", revenue: 88000, expense: 61000 },
  { month: "Apr", revenue: 102000, expense: 72000 },
  { month: "May", revenue: 98000, expense: 69000 },
  { month: "Jun", revenue: 115000, expense: 78000 },
];

const categoryData = [
  { name: "SaaS Software", value: 450 },
  { name: "Digital Services", value: 300 },
  { name: "Hard Hardware", value: 250 },
];

export default function AnalyticsOverview() {
  const [loading, setLoading] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Global Report Exported!", {
        description: "Your business intelligence PDF is ready.",
      });
    }, 2000);
  };

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
          <span className="text-sm text-muted-foreground font-medium">Loading Analytics...</span>
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
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Analytics Online</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-heading">
                Business <span className="text-gold-400">Intelligence</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Centralized data insights across all Injaazh ERP modules.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-[20px] h-12 px-6 border-border bg-card/60 font-bold">
                <Calendar className="w-4 h-4 mr-3" /> This Month
              </Button>
              <Button
                onClick={handleExport}
                disabled={isExporting}
                className="bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-[20px] h-12 px-8 shadow-lg shadow-gold-500/20 font-bold uppercase tracking-tight transition-all active:scale-95"
              >
                {isExporting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> EXPORTING...</>
                ) : (
                  <><Download className="w-4 h-4 mr-3" /> Export Global Report</>
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AICommandBar suggestions={analyticsSuggestions} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="bg-obsidian-900 rounded-2xl p-8 text-white relative overflow-hidden border border-gold-500/20">
          <div className="relative z-10 flex items-start gap-8">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 text-gold-400 font-bold uppercase tracking-[0.2em] text-xs">
                <Sparkles className="w-4 h-4" /> AI Executive Summary
              </div>
              <h2 className="text-3xl font-bold tracking-tight">
                Performance is <span className="text-gold-400">Excellent</span> This Quarter
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-1 h-8 rounded-full bg-gold-500" />
                  <p className="text-sm text-muted-foreground">Revenue is up <span className="text-white font-bold">+18.5%</span> month-over-month, driven by Meta Corp project delivery.</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-1 h-8 rounded-full bg-emerald-500" />
                  <p className="text-sm text-muted-foreground">Profit margin stabilized at <span className="text-white font-bold">34.2%</span> despite increase in operational expenses.</p>
                </div>
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 text-center border border-white/10 min-w-[160px]">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Health Score</p>
              <p className="text-5xl font-bold text-gold-400 mt-2">92</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Total Revenue" value="$124,500" change="+12.5%" trend="up" icon={DollarSign} sparkline={[85, 92, 88, 102, 98, 115, 124]} />
          <KPICard title="Net Profit" value="$42,080" change="+8.2%" trend="up" icon={Activity} sparkline={[30, 34, 32, 38, 36, 40, 42]} />
          <KPICard title="Profit Margin" value="33.8%" change="-1.2%" trend="down" icon={TrendingUp} sparkline={[35, 34.5, 34, 34.2, 34, 33.8, 33.8]} />
          <KPICard title="Total Orders" value="842" change="+18%" trend="up" icon={ShoppingCart} sparkline={[580, 620, 680, 720, 780, 810, 842]} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:break-inside-avoid [&>*]:mb-4">
          <div className="lg:col-span-1">
            <RevenueChart data={revenueData} />
          </div>
          <div>
            <SalesBreakdown data={categoryData} />
          </div>
          <div className="space-y-4">
            <SmartAlerts data={analyticsAlerts} />

            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Key Insights</h3>
              <div className="space-y-4">
                <InsightRow title="Inventory Turnover" value="5.2x" status="Healthy" />
                <InsightRow title="Attrition Rate" value="4.1%" status="Warning" />
                <InsightRow title="Customer Acquisition" value="$125.00" status="Excellent" />
              </div>
            </div>

            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Headcount Trend</h3>
              <div className="flex items-end justify-between h-24 gap-1 mb-2">
                {[60, 65, 58, 72, 80, 75].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full bg-gold-500/70 rounded-t" style={{ height: `${h}%` }} />
                    <span className="text-[8px] text-muted-foreground">M{i+1}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-2 mt-4">
                <div className="flex justify-between text-[10px] text-muted-foreground">
                  <span className="font-semibold">Jan</span>
                  <span className="font-bold text-gold-400">124 Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function InsightRow({ title, value, status }: any) {
  const statusColor = status === "Healthy" || status === "Excellent" ? "text-emerald-400 bg-emerald-500/15" :
    status === "Warning" ? "text-amber-400 bg-amber-500/15" : "text-blue-400 bg-blue-500/15";
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">{title}</p>
        <p className="text-xl font-bold text-card-foreground">{value}</p>
      </div>
      <span className={cn("text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-full", statusColor)}>{status}</span>
    </div>
  );
}
