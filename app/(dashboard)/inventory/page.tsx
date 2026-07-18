"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Box, AlertTriangle, TrendingUp, Warehouse, Plus,
  ArrowRight, History, Package, Layers, BarChart3, Search,
  Sparkles, ShoppingCart, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

import AICommandBar from "@/components/dashboard/AICommandBar";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import KPICard from "@/components/dashboard/KPICard";
import LowStockAlert from "@/components/dashboard/LowStockAlert";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const inventorySuggestions = [ "Stock level analysis", "Reorder recommendations", "Warehouse capacity", "Inventory valuation" ];

const inventoryAlerts = [
  { id: "1", severity: "critical" as const, title: "Critical Stock Shortage", description: "Apple MacBook Pro M3 — only 2 units remaining.", time: "20m ago" },
  { id: "2", severity: "warning" as const, title: "Storage Capacity Alert", description: "Main HQ warehouse at 82% capacity — plan redistribution.", time: "2h ago" },
  { id: "3", severity: "info" as const, title: "Stock Reordered", description: "Dell UltraSharp 32\" — 50 units inbound from supplier.", time: "4h ago" },
  { id: "4", severity: "warning" as const, title: "Expiring Inventory", description: "12 units of Server Maintenance Kit expiring in 30 days.", time: "6h ago" },
  { id: "5", severity: "info" as const, title: "Cycle Count Complete", description: "North Hub warehouse audit completed — 99.8% accuracy.", time: "8h ago" },
];

const lowStockItems = [
  { id: "1", name: "Apple MacBook Pro M3", sku: "HW-MBP-001", stock: 2, min: 10 },
  { id: "2", name: "Dell UltraSharp 32\"", sku: "HW-MON-012", stock: 5, min: 15 },
  { id: "3", name: "Logitech MX Master 3S", sku: "HW-PER-055", stock: 8, min: 25 },
  { id: "4", name: "Herman Miller Aeron", sku: "FUR-CHR-009", stock: 3, min: 10 },
];

const moduleCards = [
  { href: "/inventory/products", title: "Products", description: "4,280 Total SKU", icon: Package, trend: "+124" },
  { href: "/inventory/categories", title: "Categories", description: "18 Categories", icon: Layers, trend: "Manage" },
  { href: "/inventory/warehouses", title: "Warehouses", description: "6 Across 3 Regions", icon: Warehouse, trend: "View" },
  { href: "/inventory/movements", title: "Movements", description: "Real-time Logs", icon: History, trend: "Track" },
];

export default function InventoryDashboard() {
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
          <span className="text-sm text-muted-foreground font-medium">Loading Inventory...</span>
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
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Inventory Online</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-heading">
                Inventory <span className="text-gold-400">Control</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Precision stock management and supply chain visibility.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" className="rounded-[20px] h-14 px-8 border-border bg-card/60 font-bold">
                Generate Report
              </Button>
              <Link href="/inventory/products/new">
                <Button className="bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-[20px] h-14 px-10 shadow-lg shadow-gold-500/20 font-bold uppercase tracking-tight transition-all active:scale-95">
                  <Plus className="w-5 h-5 mr-3" /> Add Product
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AICommandBar suggestions={inventorySuggestions} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Total SKU" value="4,280" change="+124" trend="up" icon={Box} sparkline={[3800, 3900, 4000, 4100, 4180, 4220, 4280]} />
          <KPICard title="Low Stock Items" value="12" change="+3" trend="up" icon={AlertTriangle} sparkline={[8, 9, 10, 10, 11, 11, 12]} />
          <KPICard title="Warehouses" value="6" change="+1" trend="up" icon={Warehouse} sparkline={[4, 4, 5, 5, 5, 6, 6]} />
          <KPICard title="Stock Value" value="$1.8M" change="+5.2%" trend="up" icon={TrendingUp} sparkline={[1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8]} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:break-inside-avoid [&>*]:mb-4">
          <div>
            <LowStockAlert data={lowStockItems} />
          </div>
          <div>
            <SmartAlerts data={inventoryAlerts} />
          </div>
          <div className="space-y-4">
            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Recent Movements</h3>
              <div className="space-y-1">
                <MovementRow name="Apple MacBook Pro M3" sku="HW-MBP-001" warehouse="Main HQ" qty="+25" status="Inward" />
                <MovementRow name="Dell UltraSharp 32in" sku="HW-MON-012" warehouse="North Hub" qty="-10" status="Outward" />
                <MovementRow name="Logitech MX Master 3S" sku="HW-PER-055" warehouse="South Depot" qty="+100" status="Inward" />
                <MovementRow name="Herman Miller Aeron" sku="FUR-CHR-009" warehouse="Main HQ" qty="-2" status="Outward" />
              </div>
              <Link href="/inventory/movements">
                <Button variant="ghost" className="w-full mt-3 text-[10px] font-bold text-gold-400 uppercase tracking-widest">View All Movements</Button>
              </Link>
            </div>

            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Quick Navigation</h3>
              <div className="grid grid-cols-2 gap-3">
                {moduleCards.map((mod) => (
                  <Link key={mod.href} href={mod.href}>
                    <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-gold-500/5 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/20 transition-all group">
                      <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <mod.icon className="w-5 h-5 text-gold-400" />
                      </div>
                      <span className="text-[10px] font-bold text-card-foreground uppercase tracking-widest group-hover:text-gold-400 transition-colors">{mod.title}</span>
                      <span className="text-[8px] text-muted-foreground mt-0.5">{mod.description}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function MovementRow({ name, sku, warehouse, qty, status }: any) {
  const isInward = status === "Inward";
  return (
    <div className="flex items-center justify-between py-2.5 px-3 -mx-3 rounded-xl hover:bg-gold-500/5 transition-all cursor-pointer group">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 text-xs font-bold shrink-0">{name[0]}</div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-card-foreground group-hover:text-gold-400 transition-colors truncate">{name}</p>
          <p className="text-[10px] text-muted-foreground">SKU: {sku} &middot; {warehouse}</p>
        </div>
      </div>
      <div className="text-right shrink-0">
        <p className={cn("text-sm font-bold", isInward ? "text-emerald-400" : "text-rose-400")}>{qty}</p>
        <span className={cn("text-[9px] font-bold uppercase tracking-widest", isInward ? "text-emerald-400" : "text-rose-400")}>{status}</span>
      </div>
    </div>
  );
}
