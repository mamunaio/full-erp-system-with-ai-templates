"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag, TrendingUp, Users, BarChart3, Plus, Search, Filter,
  Target, Trophy, Zap, History, ArrowRight, ShoppingCart, Star,
  Sparkles, ArrowUpRight, ArrowDownRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

import AICommandBar from "@/components/dashboard/AICommandBar";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import KPICard from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const salesSuggestions = [ "Revenue forecast", "Top performing products", "Sales pipeline analysis", "Quarterly trends" ];

const salesAlerts = [
  { id: "1", severity: "critical" as const, title: "Monthly Target at Risk", description: "Current sales at $642K — $158K short of $800K monthly goal.", time: "1h ago" },
  { id: "2", severity: "warning" as const, title: "Conversion Dip", description: "Lead-to-customer conversion dropped 2.4% this week.", time: "3h ago" },
  { id: "3", severity: "info" as const, title: "High-Value Deal Closing", description: "TechNexus $50K deal in final negotiation stage.", time: "5h ago" },
  { id: "4", severity: "warning" as const, title: "Order Backlog", description: "5 orders pending fulfillment beyond SLA.", time: "7h ago" },
  { id: "5", severity: "info" as const, title: "New Record", description: "Gross revenue hit all-time high this quarter.", time: "12h ago" },
];

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

export default function SalesDashboard() {
  const [loading, setLoading] = useState(true);

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
          <span className="text-sm text-muted-foreground font-medium">Loading Sales...</span>
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
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Sales Online</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-heading">
                Sales <span className="text-gold-400">Command</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Monitor sales velocity, pipelines, and revenue growth.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-[20px] h-14 px-8 border-border bg-card/60 font-bold">
                Team Performance
              </Button>
              <Link href="/sales/orders/new">
                <Button className="bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-[20px] h-14 px-10 shadow-lg shadow-gold-500/20 font-bold uppercase tracking-tight transition-all active:scale-95">
                  <Plus className="w-5 h-5 mr-3" /> New Sales Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AICommandBar suggestions={salesSuggestions} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Gross Revenue" value="$642,800" change="+24.5%" trend="up" icon={TrendingUp} sparkline={[45, 52, 48, 61, 59, 72, 81]} />
          <KPICard title="Total Orders" value="1,240" change="+12.2%" trend="up" icon={ShoppingCart} sparkline={[780, 850, 920, 1000, 1080, 1160, 1240]} />
          <KPICard title="Conversion Rate" value="14.8%" change="-2.4%" trend="down" icon={Zap} sparkline={[16, 15.5, 15, 14.8, 14.5, 14.8, 14.8]} />
          <KPICard title="Avg. Order Value" value="$518" change="+8.2%" trend="up" icon={BarChart3} sparkline={[420, 450, 470, 490, 500, 510, 518]} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:break-inside-avoid [&>*]:mb-4">
          <div className="lg:col-span-1">
            <RevenueChart data={revenueData} />
          </div>
          <div>
            <SmartAlerts data={salesAlerts} />
          </div>
          <div className="space-y-4">
            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Recent Orders</h3>
              <div className="space-y-1">
                <OrderRow id="#SO-8420" customer="TechNexus Ltd" product="Cisco Enterprise Switch" total="$4,500" status="Shipped" />
                <OrderRow id="#SO-8421" customer="CyberCore Systems" product="Dell Latitude 5420 x5" total="$12,200" status="Processing" />
                <OrderRow id="#SO-8422" customer="Vertex Agency" product="Server Maintenance Kit" total="$1,800" status="Pending" />
                <OrderRow id="#SO-8423" customer="CloudWay Inc" product="Logitech MX Master x10" total="$2,400" status="Delivered" />
              </div>
              <Link href="/sales/orders">
                <Button variant="ghost" className="w-full mt-3 text-[10px] font-bold text-gold-400 uppercase tracking-widest">View All Orders</Button>
              </Link>
            </div>

            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-card-foreground font-heading">Best Sellers</h3>
                <Star className="w-4 h-4 text-gold-400" />
              </div>
              <div className="space-y-3">
                <ProductItem name="Dell Latitude 5420" sales="142 Units" revenue="$142,000" />
                <ProductItem name="Cisco Enterprise" sales="84 Units" revenue="$210,000" />
                <ProductItem name="Logitech MX Master" sales="210 Units" revenue="$21,000" />
                <ProductItem name="HP LaserJet Pro" sales="56 Units" revenue="$28,000" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function OrderRow({ id, customer, product, total, status }: any) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 -mx-3 rounded-xl hover:bg-gold-500/5 transition-all cursor-pointer group">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 text-[10px] font-bold shrink-0">{id.replace("#SO-", "")}</div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-card-foreground group-hover:text-gold-400 transition-colors truncate">{customer}</p>
          <p className="text-[10px] text-muted-foreground truncate">{product}</p>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className="text-sm font-bold text-card-foreground">{total}</p>
        <span className={cn("text-[9px] font-bold uppercase tracking-widest",
          status === "Delivered" ? "text-emerald-400" :
          status === "Shipped" ? "text-blue-400" :
          status === "Processing" ? "text-amber-400" :
          "text-muted-foreground"
        )}>{status}</span>
      </div>
    </div>
  );
}

function ProductItem({ name, sales, revenue }: any) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-all">
          <ShoppingBag className="w-5 h-5 text-gold-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-card-foreground">{name}</p>
          <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">{sales}</p>
        </div>
      </div>
      <p className="font-bold text-sm text-card-foreground">{revenue}</p>
    </div>
  );
}
