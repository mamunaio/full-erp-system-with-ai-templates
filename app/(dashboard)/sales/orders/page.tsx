"use client";

import { useState } from "react";
import { 
  Plus, Search, Filter, FileDown, ArrowLeft,
  MoreVertical, ChevronRight, Package, Truck, 
  CheckCircle2, Clock, AlertCircle, Eye, Download,
  Trash2, X, Sparkles, Building2, Check, ArrowRight,
  ShieldCheck, ArrowUpRight, DollarSign, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SalesOrder {
  id: string;
  customer: string;
  clientTier: string;
  clientEmail: string;
  date: string;
  deliveryDate: string;
  itemsCount: number;
  total: string;
  rawTotal: number;
  payment: "Paid" | "Partial" | "Pending" | "Cancelled";
  status: "Processing" | "Shipped" | "Delivered" | "Pending" | "Cancelled";
  warehouse: string;
  trackingNumber?: string;
  deliverables?: { name: string; qty: number; price: number }[];
}

const initialOrders: SalesOrder[] = [
  { 
    id: "#SO-2026-8420", 
    customer: "Meta Systems PLC", 
    clientTier: "Tier-1 Enterprise",
    clientEmail: "billing@meta.com",
    date: "Sep 02, 2026", 
    deliveryDate: "Sep 12, 2026",
    itemsCount: 4, 
    total: "$85,000", 
    rawTotal: 85000,
    payment: "Paid", 
    status: "Shipped",
    warehouse: "Hub Alpha — Silicon Valley (USA)",
    trackingNumber: "DHL-SOV-948201",
    deliverables: [
      { name: "Injaazh Sovereign Cloud ERP Core (Annual)", qty: 1, price: 60000 },
      { name: "Dedicated MongoDB Atlas Sharding Nodes", qty: 2, price: 12500 },
    ]
  },
  { 
    id: "#SO-2026-8421", 
    customer: "Tesla Energy Corp", 
    clientTier: "Tier-1 Enterprise",
    clientEmail: "finance@tesla.com",
    date: "Sep 03, 2026", 
    deliveryDate: "Sep 15, 2026",
    itemsCount: 6, 
    total: "$145,000", 
    rawTotal: 145000,
    payment: "Partial", 
    status: "Processing",
    warehouse: "Hub Beta — Frankfurt Sovereign Node (EU)",
    trackingNumber: "FEDEX-SOV-104928",
    deliverables: [
      { name: "Warehouse RFID IoT Telemetry Hub (Pack of 50)", qty: 4, price: 20000 },
      { name: "Google Gemini 1.5 Pro Neural Cluster Node", qty: 2, price: 65000 },
    ]
  },
  { 
    id: "#SO-2026-8422", 
    customer: "SpaceX Logistics", 
    clientTier: "Strategic Cloud",
    clientEmail: "procurement@spacex.com",
    date: "Aug 29, 2026", 
    deliveryDate: "Sep 08, 2026",
    itemsCount: 2, 
    total: "$62,000", 
    rawTotal: 62000,
    payment: "Pending", 
    status: "Pending",
    warehouse: "Hub Alpha — Silicon Valley (USA)",
    trackingNumber: "PENDING DISPATCH",
    deliverables: [
      { name: "Aerospace BOM Assembly Engine & Telemetry Tranches", qty: 1, price: 62000 },
    ]
  },
  { 
    id: "#SO-2026-8423", 
    customer: "Stripe Corporate", 
    clientTier: "Fintech Vault",
    clientEmail: "ap@stripe.com",
    date: "Aug 22, 2026", 
    deliveryDate: "Aug 28, 2026",
    itemsCount: 3, 
    total: "$48,500", 
    rawTotal: 48500,
    payment: "Paid", 
    status: "Delivered",
    warehouse: "Hub Gamma — Singapore APAC Gateway",
    trackingNumber: "DHL-SOV-773910",
    deliverables: [
      { name: "Automated GAAP & IFRS Reconciliation Bridge", qty: 1, price: 48500 },
    ]
  },
  { 
    id: "#SO-2026-8424", 
    customer: "Apex Global Conglomerate", 
    clientTier: "Holding Entity",
    clientEmail: "treasury@apex.com",
    date: "Aug 15, 2026", 
    deliveryDate: "Aug 25, 2026",
    itemsCount: 8, 
    total: "$220,000", 
    rawTotal: 220000,
    payment: "Paid", 
    status: "Delivered",
    warehouse: "Hub Beta — Frankfurt Sovereign Node (EU)",
    trackingNumber: "UPS-SOV-449102",
    deliverables: [
      { name: "Multi-Company Holding Consolidation Matrix", qty: 1, price: 180000 },
      { name: "24/7 Dedicated Sovereign Engineering SLA", qty: 1, price: 40000 },
    ]
  },
  { 
    id: "#SO-2026-8425", 
    customer: "Quantum Scale Labs", 
    clientTier: "Growth SaaS",
    clientEmail: "ops@quantum.io",
    date: "Aug 31, 2026", 
    deliveryDate: "Sep 14, 2026",
    itemsCount: 2, 
    total: "$34,200", 
    rawTotal: 34200,
    payment: "Paid", 
    status: "Processing",
    warehouse: "Hub Alpha — Silicon Valley (USA)",
    trackingNumber: "FEDEX-SOV-883910",
    deliverables: [
      { name: "HR Talent Management & Performance Matrix", qty: 1, price: 34200 },
    ]
  },
  { 
    id: "#SO-2026-8426", 
    customer: "Nordic Dynamics Oy", 
    clientTier: "Nordic Tier-1",
    clientEmail: "billing@nordic.fi",
    date: "Sep 01, 2026", 
    deliveryDate: "Sep 10, 2026",
    itemsCount: 1, 
    total: "$29,000", 
    rawTotal: 29000,
    payment: "Paid", 
    status: "Shipped",
    warehouse: "Hub Beta — Frankfurt Sovereign Node (EU)",
    trackingNumber: "DHL-SOV-339104",
    deliverables: [
      { name: "European Cloud Compliance Node & GDPR Sharding", qty: 1, price: 29000 },
    ]
  },
  { 
    id: "#SO-2026-8427", 
    customer: "Synthetix Bio-Health", 
    clientTier: "Healthcare Hub",
    clientEmail: "accounts@synthetix.com",
    date: "Aug 10, 2026", 
    deliveryDate: "Aug 20, 2026",
    itemsCount: 5, 
    total: "$15,000", 
    rawTotal: 15000,
    payment: "Cancelled", 
    status: "Cancelled",
    warehouse: "Hub Alpha — Silicon Valley (USA)",
    trackingNumber: "CANCELLED",
    deliverables: [
      { name: "Medical Supply Ledger Gateway", qty: 1, price: 15000 },
    ]
  },
];

export default function SalesOrdersPage() {
  const [orders, setOrders] = useState<SalesOrder[]>(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedOrder, setSelectedOrder] = useState<SalesOrder | null>(null);

  // Filter calculation
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.status.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === "ALL") return true;
    if (activeFilter === "Processing") return order.status === "Processing";
    if (activeFilter === "Shipped") return order.status === "Shipped";
    if (activeFilter === "Delivered") return order.status === "Delivered";
    if (activeFilter === "Pending") return order.status === "Pending";
    if (activeFilter === "Cancelled") return order.status === "Cancelled";

    return true;
  });

  const totalPipeline = orders.filter(o => o.status !== "Cancelled").reduce((acc, o) => acc + o.rawTotal, 0);
  const inProcessingCount = orders.filter(o => o.status === "Processing").length;
  const inProcessingSum = orders.filter(o => o.status === "Processing").reduce((acc, o) => acc + o.rawTotal, 0);
  const shippedCount = orders.filter(o => o.status === "Shipped").length;
  const deliveredCount = orders.filter(o => o.status === "Delivered").length;

  const handleExportManifest = () => {
    toast.success("Exporting Global Logistics Manifest...", {
      description: "Batch CSV and cryptographic packing manifest dispatched.",
    });
  };

  const handleAdvanceStatus = (orderId: string) => {
    setOrders(orders.map(o => {
      if (o.id === orderId) {
        let newStatus: SalesOrder["status"] = "Processing";
        if (o.status === "Pending") newStatus = "Processing";
        else if (o.status === "Processing") newStatus = "Shipped";
        else if (o.status === "Shipped") newStatus = "Delivered";
        
        toast.success(`Order ${o.id} Advanced to ${newStatus}!`, {
          description: `Fulfillment status synchronized across warehouse nodes.`,
        });
        return { ...o, status: newStatus };
      }
      return o;
    }));

    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder(prev => {
        if (!prev) return null;
        let newStatus: SalesOrder["status"] = "Processing";
        if (prev.status === "Pending") newStatus = "Processing";
        else if (prev.status === "Processing") newStatus = "Shipped";
        else if (prev.status === "Shipped") newStatus = "Delivered";
        return { ...prev, status: newStatus };
      });
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter(o => o.id !== orderId));
    if (selectedOrder?.id === orderId) setSelectedOrder(null);
    toast.info(`Sales Order ${orderId} archived.`);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link 
              href="/sales" 
              className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 bg-card/60 hover:bg-card border border-border/80 rounded-xl px-3 py-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Sales Command
            </Link>
            <span className="text-xs text-muted-foreground">• Order Fulfillment Core</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
            Sales <span className="gold-text">Orders & Dispatch</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage multi-warehouse sales orders, live dispatch milestones, and sovereign freight routing.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button 
            variant="outline" 
            onClick={handleExportManifest}
            className="h-11 px-4 rounded-xl text-xs font-bold bg-card border-border hover:border-gold-500/40 cursor-pointer shadow-sm flex items-center gap-2"
          >
            <FileDown className="w-4 h-4 text-muted-foreground" />
            <span className="hidden sm:inline">Export Order Manifest</span>
            <span className="sm:hidden">Export</span>
          </Button>

          <Link href="/sales/orders/new">
            <Button className="h-11 px-6 rounded-xl gold-gradient text-obsidian-950 font-black text-xs shadow-lg shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>New Order</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Cyber-Luxe KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              +22.4% YoY
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Order Pipeline</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">${totalPipeline.toLocaleString()}</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              ${inProcessingSum.toLocaleString()} WIP
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">In Processing / Packing</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-heading">{inProcessingCount} Batches</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 border border-purple-500/20 flex items-center justify-center">
              <Truck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-extrabold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
              In Transit
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Out for Delivery</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">{shippedCount} Shipments</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              98.6% On-Time
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Fulfilled & Settled</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500 font-heading">{deliveredCount} Completed</p>
        </div>
      </div>

      {/* Main Stream Container */}
      <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
        {/* Filter Tabs & Search Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status Filter Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
            {[
              { id: "ALL", label: "All Orders", count: orders.length },
              { id: "Processing", label: "In Processing", count: orders.filter(o => o.status === "Processing").length },
              { id: "Shipped", label: "Shipped / In-Transit", count: orders.filter(o => o.status === "Shipped").length },
              { id: "Delivered", label: "Delivered", count: orders.filter(o => o.status === "Delivered").length },
              { id: "Pending", label: "Pending", count: orders.filter(o => o.status === "Pending").length },
              { id: "Cancelled", label: "Cancelled", count: orders.filter(o => o.status === "Cancelled").length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border",
                  activeFilter === tab.id
                    ? "gold-gradient text-obsidian-950 border-gold-400 shadow-md font-extrabold scale-102"
                    : "bg-card/60 hover:bg-card border-border/70 text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{tab.label}</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded-full",
                  activeFilter === tab.id ? "bg-obsidian-950/20 text-obsidian-950" : "bg-accent text-muted-foreground"
                )}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by SO # or customer..."
              className="w-full bg-background/60 border border-border/80 rounded-xl h-10 pl-10 pr-4 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all"
            />
          </div>
        </div>

        {/* Orders Stream Table */}
        <div className="overflow-x-auto custom-scrollbar border border-border/80 rounded-2xl bg-card/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-card/80 border-b border-border/80 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="py-4 pl-4">Order ID</th>
                <th className="py-4">Enterprise Customer</th>
                <th className="py-4">Order & Delivery Date</th>
                <th className="py-4">Total Amount</th>
                <th className="py-4 text-center">Payment</th>
                <th className="py-4 text-center">Fulfillment Status</th>
                <th className="py-4 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground font-semibold">
                    No matching sales orders found in this view.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr 
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="hover:bg-accent/40 transition-colors group cursor-pointer"
                  >
                    {/* Order ID */}
                    <td className="py-4 pl-4 font-black font-heading text-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-gold-600 dark:text-gold-400 font-mono group-hover:underline">{order.id}</span>
                        <span className="text-[10px] text-muted-foreground font-semibold">({order.itemsCount} items)</span>
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                          {order.customer.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-foreground block">{order.customer}</span>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <span>{order.clientTier}</span> • <span className="opacity-75">{order.clientEmail}</span>
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Dates */}
                    <td className="py-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-foreground block">{order.date}</span>
                        <span className="text-[10px] text-muted-foreground">Due: {order.deliveryDate}</span>
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 font-black text-foreground font-heading">
                      {order.total}
                    </td>

                    {/* Payment Status */}
                    <td className="py-4 text-center">
                      <span className={cn(
                        "text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border inline-block",
                        order.payment === "Paid" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" :
                        order.payment === "Partial" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30" :
                        order.payment === "Cancelled" ? "bg-accent text-muted-foreground border-border" :
                        "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                      )}>
                        {order.payment}
                      </span>
                    </td>

                    {/* Fulfillment Status */}
                    <td className="py-4 text-center">
                      <span className={cn(
                        "text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border inline-flex items-center gap-1.5 shadow-sm",
                        order.status === "Delivered" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" :
                        order.status === "Shipped" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" :
                        order.status === "Processing" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30" :
                        order.status === "Cancelled" ? "bg-accent text-muted-foreground border-border" :
                        "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30"
                      )}>
                        {order.status === "Delivered" && <Check className="w-3 h-3" />}
                        {order.status === "Shipped" && <Truck className="w-3 h-3" />}
                        {order.status === "Processing" && <Package className="w-3 h-3" />}
                        {order.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          title="View Order Details"
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {order.status !== "Delivered" && order.status !== "Cancelled" && (
                          <button
                            title="Advance Fulfillment Step"
                            onClick={() => handleAdvanceStatus(order.id)}
                            className="p-1.5 rounded-lg hover:bg-gold-500/10 text-muted-foreground hover:text-gold-500 transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          title="Download Manifest"
                          onClick={handleExportManifest}
                          className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          title="Archive Order"
                          onClick={() => handleDeleteOrder(order.id)}
                          className="p-1.5 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-Over Order Detail & Tracking Drawer */}
      {selectedOrder && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
          onClick={() => setSelectedOrder(null)}
        >
          <div 
            className="w-full max-w-xl h-full bg-card border-l border-border/80 shadow-2xl p-6 sm:p-8 overflow-y-auto custom-scrollbar space-y-6 animate-in slide-in-from-right duration-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center text-obsidian-950 font-black">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground font-heading">{selectedOrder.id}</h3>
                  <p className="text-[10px] text-muted-foreground">Order Date: {selectedOrder.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Customer & Warehouse Card */}
            <div className="p-4 rounded-2xl bg-card/60 border border-border/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Customer Organization</span>
                  <span className="text-sm font-extrabold text-foreground">{selectedOrder.customer}</span>
                </div>
                <span className={cn(
                  "text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border",
                  selectedOrder.status === "Delivered" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" :
                  selectedOrder.status === "Shipped" ? "bg-blue-500/10 text-blue-500 border-blue-500/30" :
                  "bg-amber-500/10 text-amber-500 border-amber-500/30"
                )}>
                  {selectedOrder.status}
                </span>
              </div>

              <div className="space-y-1 pt-1 border-t border-border/60 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Fulfillment Node:</span>
                  <span className="font-semibold text-foreground">{selectedOrder.warehouse}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Logistics Tracking:</span>
                  <span className="font-mono font-bold text-gold-600 dark:text-gold-400">{selectedOrder.trackingNumber}</span>
                </div>
              </div>
            </div>

            {/* Live 5-Step Fulfillment Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Fulfillment Progression</h4>
              
              <div className="p-4 rounded-2xl bg-background/50 border border-border/80 space-y-3">
                {[
                  { step: "Order Authorized", done: true, time: "Day 1 • 09:30 AM" },
                  { step: "Inventory Allocated & Vault Locked", done: true, time: "Day 1 • 11:15 AM" },
                  { step: "Picked & Packed at Dispatch Node", done: selectedOrder.status !== "Pending", time: "Day 2 • 02:40 PM" },
                  { step: "In Transit with Carrier", done: selectedOrder.status === "Shipped" || selectedOrder.status === "Delivered", time: "Day 3 • 08:00 AM" },
                  { step: "Delivered & Client Acceptance", done: selectedOrder.status === "Delivered", time: "Pending Final Delivery" },
                ].map((st, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 border",
                      st.done 
                        ? "bg-emerald-500 text-obsidian-950 border-emerald-500" 
                        : "bg-card text-muted-foreground border-border"
                    )}>
                      {st.done ? <Check className="w-3.5 h-3.5" /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0 flex items-center justify-between text-xs">
                      <span className={cn("font-medium", st.done ? "text-foreground font-bold" : "text-muted-foreground")}>
                        {st.step}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{st.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Itemized Deliverables */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Deliverables Breakdown</h4>
              <div className="border border-border/80 rounded-2xl overflow-hidden divide-y divide-border/60 bg-background/40">
                {selectedOrder.deliverables?.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-foreground">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">Qty: {item.qty} × ${item.price.toLocaleString()}</p>
                    </div>
                    <span className="font-extrabold text-foreground font-heading">
                      ${(item.qty * item.price).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Payment Status:</span>
                <span className="font-bold text-foreground">{selectedOrder.payment}</span>
              </div>
              <div className="flex justify-between text-base font-black text-foreground pt-2 border-t border-border/60 font-heading">
                <span>Total Order Value:</span>
                <span className="gold-text">{selectedOrder.total}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-2">
              {selectedOrder.status !== "Delivered" && selectedOrder.status !== "Cancelled" && (
                <Button
                  onClick={() => handleAdvanceStatus(selectedOrder.id)}
                  className="w-full h-11 rounded-xl gold-gradient text-obsidian-950 font-extrabold text-xs shadow-md shadow-gold-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Advance Fulfillment to Next Milestone
                </Button>
              )}

              <Button
                variant="outline"
                onClick={handleExportManifest}
                className="w-full h-11 rounded-xl text-xs font-bold cursor-pointer"
              >
                <Download className="w-4 h-4 mr-2" /> Download Logistics Manifest
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
