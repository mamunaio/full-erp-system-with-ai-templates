"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag, TrendingUp, TrendingDown, DollarSign,
  Users, Package, Sparkles, Plus, Search, Filter,
  Truck, CheckCircle2, Clock, AlertCircle, ArrowRight,
  ChevronRight, FileText, FileSpreadsheet, Eye, Mail,
  Send, ShieldCheck, Award, Target, ShoppingCart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

const salesMetrics = [
  { label: "Gross Sales (Month-to-Date)", value: "$842,500", change: "+16.8% MoM", trend: "up", sub: "Goal: $950K (88.7% Attained)" },
  { label: "Average Order Value (AOV)", value: "$5,690", change: "+4.2%", trend: "up", sub: "148 Closed Orders" },
  { label: "Open Quotations Value", value: "$418,000", change: "+9 Deals", trend: "up", sub: "72% Expected Conversion" },
  { label: "Fulfillment SLA Rate", value: "99.2%", change: "+0.8%", trend: "up", sub: "Avg Delivery: 2.1 Days" },
];

const orderStatuses = [
  { label: "Pending Processing", count: 5, value: "$42,500", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  { label: "In Packaging / Warehouse", count: 12, value: "$118,000", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  { label: "Dispatched & In Transit", count: 18, value: "$184,000", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  { label: "Delivered & Settled", count: 113, value: "$498,000", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
];

const recentSalesOrders = [
  { id: "SO-9042", client: "Meta Corp", items: "15x MacBook Pro M3 + 20x 4K Displays", amount: "$85,000.00", date: "Today, 03:15 PM", status: "IN_TRANSIT", payment: "PAID" },
  { id: "SO-9041", client: "SpaceX Systems", items: "12x Cloud Gateway Server Nodes", amount: "$62,000.00", date: "Today, 11:30 AM", status: "PROCESSING", payment: "INVOICED" },
  { id: "SO-9040", client: "Tesla Energy", items: "50x Industrial IoT Sensor Arrays", amount: "$48,000.00", date: "Yesterday, 04:00 PM", status: "DELIVERED", payment: "PAID" },
  { id: "SO-9039", client: "Stripe Corporate", items: "25x Cisco 48-Port Managed Switches", amount: "$35,000.00", date: "Yesterday, 09:45 AM", status: "DELIVERED", payment: "PAID" },
  { id: "SO-9038", client: "Apex Global Logistics", items: "8x High-Capacity Barcode Terminals", amount: "$18,500.00", date: "Sep 01, 02:00 PM", status: "PACKAGING", payment: "PARTIAL" },
];

const topProducts = [
  { name: "Enterprise Cloud Server Gateway Node", units: "45 units", revenue: "$280,000", growth: "+24%", share: "33.2%" },
  { name: "Cisco 48-Port Gigabit Switch Arrays", units: "84 units", revenue: "$168,000", growth: "+18%", share: "19.9%" },
  { name: "Dell UltraSharp 32\" 4K Pro Displays", units: "140 units", revenue: "$95,200", growth: "+12%", share: "11.3%" },
  { name: "Apple MacBook Pro 16\" M3 Max Fleet", units: "30 units", revenue: "$85,500", growth: "+32%", share: "10.1%" },
];

const topSalesReps = [
  { name: "Nusrat Jahan", role: "Enterprise Director", deals: 18, revenue: "$342,000", quota: "118%", avatar: "NJ" },
  { name: "Farhan Ahmed", role: "Solutions Architect", deals: 14, revenue: "$264,000", quota: "112%", avatar: "FA" },
  { name: "Tariqul Islam", role: "Account Executive", deals: 12, revenue: "$182,000", quota: "104%", avatar: "TI" },
];

export default function SalesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [isExporting, setIsExporting] = useState(false);

  const filteredOrders = recentSalesOrders.filter((order) => {
    const matchesSearch = order.client.toLowerCase().includes(searchQuery.toLowerCase()) || order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === "ALL" || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Sales Orders & Fulfillment Ledger exported to CSV/Excel!");
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">
      {/* Top Banner: Commercial Sales & Orders Command */}
      <div className="glass-strong rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Commercial Orders Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
              Sales Orders & <span className="gold-text">Revenue Fulfillment</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
              Track multi-channel commercial sales orders, quotation conversions, delivery SLA fulfillment, and sales rep quotas.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              variant="outline"
              className="rounded-2xl h-11 sm:h-12 px-4 border-border bg-card/60 font-bold text-xs hover:bg-accent"
            >
              <FileSpreadsheet className="w-4 h-4 mr-1.5 text-emerald-500" />
              <span>{isExporting ? "Exporting..." : "Export Orders"}</span>
            </Button>
            <Link href="/sales/quotations">
              <Button variant="outline" className="rounded-2xl h-11 sm:h-12 px-5 border-border bg-card/60 font-bold text-xs sm:text-sm hover:bg-accent">
                <FileText className="w-4 h-4 mr-2 text-gold-500" /> Quotations (24)
              </Button>
            </Link>
            <Link href="/sales/orders/new">
              <Button className="gold-gradient text-obsidian-900 font-extrabold text-xs sm:text-sm rounded-2xl h-11 sm:h-12 px-6 shadow-lg shadow-gold-500/20 hover:opacity-90">
                <Plus className="w-4 h-4 mr-1.5" /> Create Sales Order
              </Button>
            </Link>
          </div>
        </div>

        {/* Sales Performance Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-border/50">
          {salesMetrics.map((m, idx) => (
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

      {/* Order Status Pipeline Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {orderStatuses.map((st, i) => (
          <div 
            key={i} 
            className="glass rounded-3xl p-5 border border-border/80 shadow-md space-y-2 hover:border-gold-500/30 transition-all cursor-pointer group"
          >
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${st.color}`}>
                {st.label}
              </span>
              <span className="text-xs font-bold text-muted-foreground font-mono">{st.count} Orders</span>
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading pt-1">{st.value}</div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/40">
              <span>Automatic SLA Tracking</span>
              <span className="text-emerald-500 font-semibold">On Track</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid: Orders Stream + Top Products & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Sales Orders Stream Table */}
        <div className="lg:col-span-2 glass rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
                Sales Order Execution Stream
              </h3>
              <p className="text-xs text-muted-foreground">Commercial orders, invoices, and fulfillment status</p>
            </div>

            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders, clients..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-background border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-gold-500/50"
              />
            </div>
          </div>

          <div className="divide-y divide-border/50">
            {filteredOrders.map((order) => (
              <div key={order.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-md border border-gold-500/20">
                      {order.id}
                    </span>
                    <span className="text-sm font-bold text-foreground">{order.client}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{order.items}</p>
                  <p className="text-[10px] text-muted-foreground">{order.date}</p>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <div className="text-right">
                    <div className="text-base font-extrabold gold-text font-heading">{order.amount}</div>
                    <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full border uppercase tracking-wider ${
                      order.payment === "PAID" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                      order.payment === "PARTIAL" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                      "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    }`}>
                      {order.payment}
                    </span>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border uppercase tracking-wider ${
                    order.status === "DELIVERED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                    order.status === "IN_TRANSIT" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                    order.status === "PACKAGING" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                    "bg-amber-500/10 text-amber-500 border-amber-500/20"
                  }`}>
                    {order.status.replace("_", " ")}
                  </span>

                  <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => toast.success(`Invoice for ${order.id} downloaded.`)}
                      className="p-1.5 rounded-lg bg-accent/60 hover:bg-gold-500/20 text-muted-foreground hover:text-gold-500 transition-colors"
                      title="Download Invoice"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toast.success(`Fulfillment tracking link copied for ${order.id}`)}
                      className="p-1.5 rounded-lg bg-accent/60 hover:bg-blue-500/20 text-muted-foreground hover:text-blue-500 transition-colors"
                      title="Track"
                    >
                      <Truck className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Top Selling Products & Rep Leaderboard */}
        <div className="space-y-6">
          {/* Top Revenue Driving Products */}
          <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground font-heading">Top Revenue Products</h4>
              <ShoppingBag className="w-4 h-4 text-gold-500" />
            </div>

            <div className="space-y-3 pt-1">
              {topProducts.map((p, i) => (
                <div key={i} className="p-3 rounded-2xl bg-card/50 border border-border/70 space-y-1 group hover:border-gold-500/30 transition-all">
                  <div className="flex items-start justify-between">
                    <h5 className="text-xs font-bold text-foreground group-hover:text-gold-500 transition-colors line-clamp-1">{p.name}</h5>
                    <span className="text-[10px] font-extrabold text-emerald-500 ml-2">{p.growth}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">{p.units}</span>
                    <span className="font-extrabold gold-text font-heading">{p.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Representative Quota Leaderboard */}
          <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-foreground font-heading">Sales Leaderboard</h4>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>

            <div className="space-y-2.5 pt-1">
              {topSalesReps.map((rep, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-card/60 border border-border/70 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl gold-gradient flex items-center justify-center text-obsidian-950 font-extrabold text-xs">
                      {rep.avatar}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">{rep.name}</div>
                      <div className="text-[10px] text-muted-foreground">{rep.deals} deals • {rep.revenue}</div>
                    </div>
                  </div>

                  <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {rep.quota} Quota
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Trophy({ className }: { className?: string }) {
  return <Award className={className} />;
}
