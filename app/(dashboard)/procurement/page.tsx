"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Truck, Package, ClipboardCheck, DollarSign, ArrowRight,
  ShoppingCart, FileText, RefreshCw, Users, Sparkles
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import AICommandBar from "@/components/dashboard/AICommandBar";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import KPICard from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const procurementSuggestions = [ "Vendor performance analysis", "Spend forecast", "Outstanding PO\"s", "Supplier risk assessment" ];

const procurementAlerts = [
  { id: "1", severity: "critical" as const, title: "Critical Stock Shortage", description: "X570 Motherboard stock will run out in 3 days — expedite PO.", time: "30m ago" },
  { id: "2", severity: "warning" as const, title: "Vendor Delay", description: "TechNexus Ltd shipment delayed by 5 days.", time: "2h ago" },
  { id: "3", severity: "info" as const, title: "New Vendor Onboarded", description: "CyberCore Systems added as approved supplier.", time: "4h ago" },
  { id: "4", severity: "warning" as const, title: "Budget Overshoot", description: "Q3 procurement spend is 12% above forecast.", time: "6h ago" },
  { id: "5", severity: "info" as const, title: "GRN Pending", description: "3 goods receipts awaiting verification.", time: "8h ago" },
];

const monthlySpend = [
  { month: "Jan", revenue: 28000, expense: 22000 },
  { month: "Feb", revenue: 32000, expense: 25000 },
  { month: "Mar", revenue: 29000, expense: 23000 },
  { month: "Apr", revenue: 38000, expense: 30000 },
  { month: "May", revenue: 35000, expense: 28000 },
  { month: "Jun", revenue: 42000, expense: 33000 },
  { month: "Jul", revenue: 48000, expense: 37000 },
  { month: "Aug", revenue: 45000, expense: 35000 },
  { month: "Sep", revenue: 51000, expense: 40000 },
  { month: "Oct", revenue: 49000, expense: 38000 },
  { month: "Nov", revenue: 55000, expense: 42000 },
  { month: "Dec", revenue: 62000, expense: 46000 },
];

const moduleCards = [
  { href: "/procurement/vendors", title: "Vendors", description: "24 Approved Suppliers", icon: Truck, trend: "+3" },
  { href: "/procurement/grn", title: "Goods Receipt", description: "12 Pending Receipts", icon: ClipboardCheck, trend: "Verify" },
  { href: "/procurement/purchase-orders", title: "Purchase Orders", description: "8 Active Orders", icon: ShoppingCart, trend: "+2" },
  { href: "/procurement/reports", title: "Spend Reports", description: "Budget Analytics", icon: DollarSign, trend: "View" },
];

export default function ProcurementPage() {
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
          <span className="text-sm text-muted-foreground font-medium">Loading Procurement...</span>
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
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Procurement Online</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-heading">
                Procurement & <span className="text-gold-400">Supply</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Strategic sourcing, vendor management, and purchase orchestration.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/procurement/vendors/new">
                <Button className="bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-[20px] h-14 px-8 shadow-lg shadow-gold-500/20 font-bold uppercase tracking-tight transition-all active:scale-95">
                  <Truck className="w-5 h-5 mr-3" /> New Vendor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AICommandBar suggestions={procurementSuggestions} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Total Vendors" value="24" change="+3" trend="up" icon={Truck} sparkline={[16, 18, 20, 21, 22, 23, 24]} />
          <KPICard title="Active POs" value="8" change="+2" trend="up" icon={ShoppingCart} sparkline={[4, 5, 5, 6, 7, 7, 8]} />
          <KPICard title="Pending GRN" value="12" change="+4" trend="up" icon={ClipboardCheck} sparkline={[6, 8, 9, 10, 10, 11, 12]} />
          <KPICard title="Monthly Spend" value="$62,000" change="+14%" trend="up" icon={DollarSign} sparkline={[28, 32, 29, 38, 35, 42, 48]} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:break-inside-avoid [&>*]:mb-4">
          <div className="lg:col-span-1">
            <RevenueChart data={monthlySpend} />
          </div>
          <div>
            <SmartAlerts data={procurementAlerts} />
          </div>
          <div className="space-y-4">
            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Quick Navigation</h3>
              <div className="grid grid-cols-1 gap-3">
                {moduleCards.map((mod) => (
                  <Link key={mod.href} href={mod.href}>
                    <div className="group flex items-center gap-4 p-4 rounded-xl bg-gold-500/5 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/20 transition-all cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400 shadow-md group-hover:scale-110 transition-transform shrink-0">
                        <mod.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-card-foreground group-hover:text-gold-400 transition-colors font-heading">{mod.title}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{mod.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-gold-400 uppercase tracking-widest bg-gold-500/10 px-2 py-1 rounded-full">{mod.trend}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="w-4 h-4 text-gold-400" />
                <h3 className="text-sm font-semibold text-card-foreground font-heading">Procurement Health</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                    <span>On-Time Delivery</span>
                    <span className="text-gold-400">94%</span>
                  </div>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-[94%] bg-gold-500 rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                    <span>Budget Utilization</span>
                    <span className="text-gold-400">68%</span>
                  </div>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-[68%] bg-gold-500 rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                    <span>Vendor Satisfaction</span>
                    <span className="text-gold-400">88%</span>
                  </div>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-[88%] bg-gold-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
