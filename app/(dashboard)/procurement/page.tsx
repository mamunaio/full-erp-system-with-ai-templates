"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck, Package, ClipboardCheck, DollarSign, ArrowRight,
  ShoppingCart, FileText, RefreshCw, Users, Sparkles,
  Plus, Search, Filter, AlertTriangle, CheckCircle2,
  Clock, ArrowUpRight, ArrowDownLeft, FileSpreadsheet,
  Building2, ChevronRight, ShieldCheck, PieChart
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import VendorTable from "./components/VendorTable";

const procurementMetrics = [
  { label: "Sourcing Spend (YTD)", value: "$462,800", change: "+8.4%", sub: "84 Completed Orders" },
  { label: "Vendor On-Time SLA", value: "96.4%", change: "+2.1%", sub: "Avg Transit: 3.2 Days" },
  { label: "Active Dispatched POs", value: "18 Orders", change: "$142.5K Value", sub: "8 In Customs Clearance" },
  { label: "Sourcing Cost Arbitrage", value: "-$38,400", change: "Saved", sub: "Bulk Tier-1 Supplier Discounts" },
];

const poStages = [
  { label: "Draft & Approval", count: 3, value: "$24,500", color: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
  { label: "Dispatched to Vendor", count: 7, value: "$68,200", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  { label: "Port & In-Transit", count: 8, value: "$74,300", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  { label: "GRN Inspected & Cleared", count: 66, value: "$295,800", color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" },
];

const activePurchaseOrders = [
  { id: "PO-8092", vendor: "Apple Authorized Commercial", items: "15x MacBook Pro 16\" M3 Max", amount: "$42,750.00", date: "Sep 02, 10:30 AM", status: "DISPATCHED", eta: "Sep 06 (3 Days)" },
  { id: "PO-8091", vendor: "Cisco Systems Enterprise", items: "8x 48-Port Managed Switch Array", amount: "$38,400.00", date: "Sep 01, 04:00 PM", status: "IN_TRANSIT", eta: "Sep 05 (2 Days)" },
  { id: "PO-8090", vendor: "Dell Commercial Supply", items: "20x UltraSharp 32\" 4K Pro Displays", amount: "$13,600.00", date: "Aug 30, 02:15 PM", status: "CLEARED", eta: "Delivered (GRN-441)" },
  { id: "PO-8089", vendor: "Herman Miller Office Tech", items: "12x Aeron Ergonomic Chairs", amount: "$13,800.00", date: "Aug 28, 11:00 AM", status: "CLEARED", eta: "Delivered (GRN-438)" },
];

const spendCategories = [
  { category: "IT Hardware & Server Nodes", amount: "$224,000", share: "48.4%", color: "bg-amber-500" },
  { category: "Networking & Cabling Infrastructure", amount: "$129,500", share: "28.0%", color: "bg-blue-500" },
  { category: "Office Ergonomics & Facilities", amount: "$64,800", share: "14.0%", color: "bg-purple-500" },
  { category: "Enterprise Software Licenses", amount: "$44,500", share: "9.6%", color: "bg-emerald-500" },
];

export default function ProcurementPage() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Procurement & Sourcing Ledger exported to CSV & PDF dossier!");
    }, 1100);
  };

  const handleGenerateGRN = (poId: string) => {
    toast.success(`Goods Receipt Note (GRN) generated for ${poId}! Transferred to Quality Assurance.`);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">
      {/* Top Banner: Procurement & Vendor Sourcing Command */}
      <div className="glass-strong rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                Sourcing & Supplier Network Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
              Procurement & <span className="gold-text">Sourcing Hub</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
              Manage tier-1 vendor contracts, purchase order execution, inbound GRN receipts, and spend arbitrage.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              variant="outline"
              className="rounded-2xl h-11 sm:h-12 px-4 border-border bg-card/60 font-bold text-xs hover:bg-accent"
            >
              <FileSpreadsheet className="w-4 h-4 mr-1.5 text-blue-500" />
              <span>{isExporting ? "Exporting..." : "Export Spend"}</span>
            </Button>
            <Link href="/procurement/grn">
              <Button variant="outline" className="rounded-2xl h-11 sm:h-12 px-5 border-border bg-card/60 font-bold text-xs sm:text-sm hover:bg-accent">
                <ClipboardCheck className="w-4 h-4 mr-2 text-gold-500" /> GRN Inspection (12)
              </Button>
            </Link>
            <Link href="/procurement/purchase-orders/new">
              <Button className="gold-gradient text-obsidian-900 font-extrabold text-xs sm:text-sm rounded-2xl h-11 sm:h-12 px-6 shadow-lg shadow-gold-500/20 hover:opacity-90">
                <Plus className="w-4 h-4 mr-1.5" /> Issue Purchase Order
              </Button>
            </Link>
          </div>
        </div>

        {/* Procurement Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-border/50">
          {procurementMetrics.map((m, idx) => (
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

      {/* PO Stage Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {poStages.map((stage, i) => (
          <div key={i} className="glass rounded-3xl p-5 border border-border/80 shadow-md space-y-2 hover:border-gold-500/30 transition-all cursor-pointer group">
            <div className="flex items-center justify-between">
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${stage.color}`}>
                {stage.label}
              </span>
              <span className="text-xs font-bold text-muted-foreground font-mono">{stage.count} POs</span>
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading pt-1">{stage.value}</div>
            <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/40">
              <span>Automated Sourcing SLA</span>
              <span className="text-emerald-500 font-semibold">On Schedule</span>
            </div>
          </div>
        ))}
      </div>

      {/* Active Purchase Orders Table */}
      <div className="glass rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
              Active Purchase Order (PO) Execution Stream
            </h3>
            <p className="text-xs text-muted-foreground">Inbound orders, supplier confirmation, and delivery schedules</p>
          </div>
        </div>

        <div className="divide-y divide-border/50">
          {activePurchaseOrders.map((po) => (
            <div key={po.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-md border border-gold-500/20">
                    {po.id}
                  </span>
                  <span className="text-sm font-bold text-foreground">{po.vendor}</span>
                </div>
                <p className="text-xs text-muted-foreground">{po.items}</p>
                <p className="text-[10px] text-muted-foreground">Dispatched: {po.date} • ETA: <strong className="text-foreground">{po.eta}</strong></p>
              </div>

              <div className="flex items-center gap-4 justify-between sm:justify-end">
                <div className="text-right">
                  <div className="text-base font-extrabold gold-text font-heading">{po.amount}</div>
                  <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full border uppercase tracking-wider ${
                    po.status === "CLEARED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                    po.status === "IN_TRANSIT" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                    "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  }`}>
                    {po.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleGenerateGRN(po.id)}
                    className="rounded-xl gold-gradient text-obsidian-950 font-bold text-xs h-9 px-3 shadow-sm hover:opacity-90"
                  >
                    <ClipboardCheck className="w-3.5 h-3.5 mr-1" /> Create GRN
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Split Bottom: Vendor Directory + Spend Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VendorTable />
        </div>

        <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-foreground font-heading">Spend Allocation by Category</h4>
            <PieChart className="w-4 h-4 text-gold-500" />
          </div>

          <div className="space-y-3 pt-2">
            {spendCategories.map((sc, i) => (
              <div key={i} className="p-3 rounded-2xl bg-card/50 border border-border/70 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">{sc.category}</span>
                  <span className="font-extrabold gold-text font-heading">{sc.amount}</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Share of Annual Spend</span>
                  <span className="font-bold text-foreground">{sc.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
