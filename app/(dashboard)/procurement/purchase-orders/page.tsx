"use client";

import { useState } from "react";
import { 
  Plus, Search, Filter, FileDown, ArrowLeft,
  MoreVertical, ChevronRight, Package, Truck, 
  CheckCircle2, Clock, AlertCircle, Eye, Download,
  Trash2, X, Sparkles, Building2, Check, ArrowRight,
  ShieldCheck, ArrowUpRight, DollarSign, RefreshCw,
  FileSpreadsheet, ClipboardCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PurchaseOrder {
  id: string;
  vendor: string;
  vendorTier: string;
  vendorEmail: string;
  date: string;
  portDelivery: string;
  itemsCount: number;
  total: string;
  rawTotal: number;
  paymentTerms: string;
  status: "Draft" | "Confirmed" | "In Transit" | "GRN Received" | "Settled" | "Cancelled";
  warehouse: string;
  incoterms: string;
  deliverables?: { name: string; qty: number; unitCost: number }[];
}

const initialPurchaseOrders: PurchaseOrder[] = [
  {
    id: "#PO-2026-4011",
    vendor: "Cisco Systems Global",
    vendorTier: "Tier-1 Strategic",
    vendorEmail: "orders@cisco.com",
    date: "Aug 28, 2026",
    portDelivery: "Sep 15, 2026",
    itemsCount: 20,
    total: "$18,500",
    rawTotal: 18500,
    paymentTerms: "Net 45",
    status: "In Transit",
    warehouse: "Hub Alpha — Silicon Valley (USA)",
    incoterms: "DDP (Delivered Duty Paid)",
    deliverables: [
      { name: "Cisco Catalyst 9300 48-Port Switch", qty: 20, unitCost: 450 },
      { name: "Mellanox 100GbE QSFP28 Transceiver", qty: 100, unitCost: 85 },
    ]
  },
  {
    id: "#PO-2026-4012",
    vendor: "NVIDIA Enterprise OEM",
    vendorTier: "Tier-1 Strategic",
    vendorEmail: "supply@nvidia.com",
    date: "Aug 20, 2026",
    portDelivery: "Sep 08, 2026",
    itemsCount: 4,
    total: "$128,000",
    rawTotal: 128000,
    paymentTerms: "Net 30",
    status: "Confirmed",
    warehouse: "Hub Beta — Frankfurt Sovereign Node (EU)",
    incoterms: "DDP (Delivered Duty Paid)",
    deliverables: [
      { name: "NVIDIA DGX H100 Sovereign AI Server", qty: 4, unitCost: 32000 },
    ]
  },
  {
    id: "#PO-2026-4013",
    vendor: "Taiwan Semiconductor (TSMC)",
    vendorTier: "Primary Foundry",
    vendorEmail: "procurement@tsmc.com",
    date: "Aug 10, 2026",
    portDelivery: "Aug 26, 2026",
    itemsCount: 50,
    total: "$240,000",
    rawTotal: 240000,
    paymentTerms: "Net 60",
    status: "GRN Received",
    warehouse: "Hub Gamma — Singapore APAC Gateway",
    incoterms: "CIF (Cost, Insurance and Freight)",
    deliverables: [
      { name: "Neural Wafer Tranche A-18 Shards", qty: 50, unitCost: 4800 },
    ]
  },
  {
    id: "#PO-2026-4014",
    vendor: "Dell Technologies Supply",
    vendorTier: "Strategic Hardware",
    vendorEmail: "oem@dell.com",
    date: "Aug 15, 2026",
    portDelivery: "Sep 02, 2026",
    itemsCount: 15,
    total: "$9,750",
    rawTotal: 9750,
    paymentTerms: "Net 30",
    status: "GRN Received",
    warehouse: "Hub Alpha — Silicon Valley (USA)",
    incoterms: "DDP (Delivered Duty Paid)",
    deliverables: [
      { name: "Dell Latitude 5420 Sovereign Workstation", qty: 15, unitCost: 650 },
    ]
  },
  {
    id: "#PO-2026-4015",
    vendor: "Cloudflare Global Network",
    vendorTier: "Network Infrastructure",
    vendorEmail: "billing@cloudflare.com",
    date: "Sep 01, 2026",
    portDelivery: "Sep 05, 2026",
    itemsCount: 2,
    total: "$14,000",
    rawTotal: 14000,
    paymentTerms: "Net 30",
    status: "Draft",
    warehouse: "Sovereign Cloud Vault",
    incoterms: "Digital Provisioning",
    deliverables: [
      { name: "Global Edge Transit & Zero-Trust Gateway SLA", qty: 2, unitCost: 7000 },
    ]
  },
];

export default function PurchaseOrdersPage() {
  const [orders, setOrders] = useState<PurchaseOrder[]>(initialPurchaseOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedPO, setSelectedPO] = useState<PurchaseOrder | null>(null);

  // Filter calculation
  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.vendorEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.status.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === "ALL") return true;
    if (activeFilter === "Confirmed") return o.status === "Confirmed";
    if (activeFilter === "In Transit") return o.status === "In Transit";
    if (activeFilter === "GRN Received") return o.status === "GRN Received";
    if (activeFilter === "Draft") return o.status === "Draft";

    return true;
  });

  const totalCommitted = orders.reduce((acc, o) => acc + o.rawTotal, 0);
  const inTransitSum = orders.filter(o => o.status === "In Transit").reduce((acc, o) => acc + o.rawTotal, 0);
  const grnPendingCount = orders.filter(o => o.status === "In Transit" || o.status === "Confirmed").length;

  const handleExport = () => {
    toast.success("Exporting Purchase Order Spend...", {
      description: "Batch CSV and cryptographic PO ledger manifest exported.",
    });
  };

  const handleAdvanceStatus = (poId: string) => {
    setOrders(orders.map(o => {
      if (o.id === poId) {
        let newStatus: PurchaseOrder["status"] = "Confirmed";
        if (o.status === "Draft") newStatus = "Confirmed";
        else if (o.status === "Confirmed") newStatus = "In Transit";
        else if (o.status === "In Transit") newStatus = "GRN Received";
        
        toast.success(`Purchase Order ${o.id} Advanced to ${newStatus}!`, {
          description: `Supplier milestone synchronized with warehouse receiving dock.`,
        });
        return { ...o, status: newStatus };
      }
      return o;
    }));

    if (selectedPO && selectedPO.id === poId) {
      setSelectedPO(prev => {
        if (!prev) return null;
        let newStatus: PurchaseOrder["status"] = "Confirmed";
        if (prev.status === "Draft") newStatus = "Confirmed";
        else if (prev.status === "Confirmed") newStatus = "In Transit";
        else if (prev.status === "In Transit") newStatus = "GRN Received";
        return { ...prev, status: newStatus };
      });
    }
  };

  const handleDeletePO = (poId: string) => {
    setOrders(orders.filter(o => o.id !== poId));
    if (selectedPO?.id === poId) setSelectedPO(null);
    toast.info(`Purchase Order ${poId} archived.`);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Top Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link 
              href="/procurement" 
              className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 bg-card/60 hover:bg-card border border-border/80 rounded-xl px-3 py-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Procurement Command
            </Link>
            <span className="text-xs text-muted-foreground">• Purchase Order Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
            Purchase Orders & <span className="gold-text">Inbound Sourcing</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Execute and track tier-1 vendor purchase orders, Incoterms delivery schedules, and GRN dock receipts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="h-11 px-4 rounded-xl text-xs font-bold bg-card border-border hover:border-gold-500/40 cursor-pointer shadow-sm flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-blue-500" />
            <span className="hidden sm:inline">Export Spend</span>
          </Button>

          <Link href="/procurement/grn">
            <Button variant="outline" className="h-11 px-4 rounded-xl text-xs font-bold bg-card border-border hover:border-gold-500/40 cursor-pointer shadow-sm flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4 text-gold-500" />
              <span>GRN Inspection (12)</span>
            </Button>
          </Link>

          <Link href="/procurement/purchase-orders/new">
            <Button className="h-11 px-6 rounded-xl gold-gradient text-obsidian-950 font-black text-xs shadow-lg shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Issue PO</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Cyber-Luxe Procurement KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Approved Budget
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Sourcing Spend</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">${totalCommitted.toLocaleString()}</p>
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
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Inbound Freight Value</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-purple-500 font-heading">${inTransitSum.toLocaleString()}</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
              <ClipboardCheck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              Awaiting Port
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Pending GRN Inspection</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-heading">{grnPendingCount} Orders</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Grade A+
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Supplier SLA Compliance</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500 font-heading">99.4% On-Time</p>
        </div>
      </div>

      {/* Main Stream Container */}
      <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
        {/* Filter Tabs & Search Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status Filter Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
            {[
              { id: "ALL", label: "All POs", count: orders.length },
              { id: "Confirmed", label: "Confirmed", count: orders.filter(o => o.status === "Confirmed").length },
              { id: "In Transit", label: "In Transit", count: orders.filter(o => o.status === "In Transit").length },
              { id: "GRN Received", label: "GRN Received", count: orders.filter(o => o.status === "GRN Received").length },
              { id: "Draft", label: "Drafts", count: orders.filter(o => o.status === "Draft").length },
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
              placeholder="Search by PO # or vendor..."
              className="w-full bg-background/60 border border-border/80 rounded-xl h-10 pl-10 pr-4 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all"
            />
          </div>
        </div>

        {/* POs Stream Table */}
        <div className="overflow-x-auto custom-scrollbar border border-border/80 rounded-2xl bg-card/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-card/80 border-b border-border/80 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="py-4 pl-4">PO Number</th>
                <th className="py-4">Supplier / Vendor</th>
                <th className="py-4">Issue & Port Date</th>
                <th className="py-4">Total Amount</th>
                <th className="py-4 text-center">Incoterms</th>
                <th className="py-4 text-center">Status</th>
                <th className="py-4 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground font-semibold">
                    No matching purchase orders found in this view.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((po) => (
                  <tr 
                    key={po.id}
                    onClick={() => setSelectedPO(po)}
                    className="hover:bg-accent/40 transition-colors group cursor-pointer"
                  >
                    {/* PO ID */}
                    <td className="py-4 pl-4 font-black font-heading text-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-gold-600 dark:text-gold-400 font-mono group-hover:underline">{po.id}</span>
                        <span className="text-[10px] text-muted-foreground font-semibold">({po.itemsCount} items)</span>
                      </div>
                    </td>

                    {/* Vendor */}
                    <td className="py-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                          {po.vendor.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-foreground block">{po.vendor}</span>
                          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <span>{po.vendorTier}</span> • <span className="opacity-75">{po.vendorEmail}</span>
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Dates */}
                    <td className="py-4">
                      <div className="space-y-0.5">
                        <span className="font-semibold text-foreground block">{po.date}</span>
                        <span className="text-[10px] text-muted-foreground">Port ETA: {po.portDelivery}</span>
                      </div>
                    </td>

                    {/* Total Amount */}
                    <td className="py-4 font-black text-foreground font-heading">
                      {po.total}
                    </td>

                    {/* Incoterms */}
                    <td className="py-4 text-center">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-card border border-border/70 text-muted-foreground">
                        {po.incoterms.split(" ")[0]}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 text-center">
                      <span className={cn(
                        "text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border inline-flex items-center gap-1.5 shadow-sm",
                        po.status === "GRN Received" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" :
                        po.status === "In Transit" ? "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30" :
                        po.status === "Confirmed" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" :
                        "bg-accent text-muted-foreground border-border"
                      )}>
                        {po.status === "GRN Received" && <Check className="w-3 h-3" />}
                        {po.status === "In Transit" && <Truck className="w-3 h-3" />}
                        {po.status === "Confirmed" && <CheckCircle2 className="w-3 h-3" />}
                        {po.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          title="View PO Details"
                          onClick={() => setSelectedPO(po)}
                          className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {po.status !== "GRN Received" && (
                          <button
                            title="Advance Sourcing Step"
                            onClick={() => handleAdvanceStatus(po.id)}
                            className="p-1.5 rounded-lg hover:bg-gold-500/10 text-muted-foreground hover:text-gold-500 transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          title="Download PO"
                          onClick={handleExport}
                          className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          title="Archive PO"
                          onClick={() => handleDeletePO(po.id)}
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

      {/* Slide-Over PO Detail Drawer */}
      {selectedPO && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
          onClick={() => setSelectedPO(null)}
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
                  <h3 className="font-bold text-base text-foreground font-heading">{selectedPO.id}</h3>
                  <p className="text-[10px] text-muted-foreground">Issued: {selectedPO.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedPO(null)}
                  className="p-2 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Vendor & Warehouse Info Card */}
            <div className="p-4 rounded-2xl bg-card/60 border border-border/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Supplier Organization</span>
                  <span className="text-sm font-extrabold text-foreground">{selectedPO.vendor}</span>
                </div>
                <span className={cn(
                  "text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border",
                  selectedPO.status === "GRN Received" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" :
                  selectedPO.status === "In Transit" ? "bg-purple-500/10 text-purple-500 border-purple-500/30" :
                  "bg-blue-500/10 text-blue-500 border-blue-500/30"
                )}>
                  {selectedPO.status}
                </span>
              </div>

              <div className="space-y-1 pt-1 border-t border-border/60 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Receiving Node:</span>
                  <span className="font-semibold text-foreground">{selectedPO.warehouse}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Incoterms Rule:</span>
                  <span className="font-mono font-bold text-foreground">{selectedPO.incoterms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Terms:</span>
                  <span className="font-semibold text-foreground">{selectedPO.paymentTerms}</span>
                </div>
              </div>
            </div>

            {/* Itemized Deliverables */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Purchased Components</h4>
              <div className="border border-border/80 rounded-2xl overflow-hidden divide-y divide-border/60 bg-background/40">
                {selectedPO.deliverables?.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-foreground">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">Qty: {item.qty} × ${item.unitCost.toLocaleString()}</p>
                    </div>
                    <span className="font-extrabold text-foreground font-heading">
                      ${(item.qty * item.unitCost).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Commitment Summary */}
            <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-2 text-xs">
              <div className="flex justify-between text-base font-black text-foreground font-heading">
                <span>Total Sourcing Commitment:</span>
                <span className="gold-text">{selectedPO.total}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-2">
              {selectedPO.status !== "GRN Received" && (
                <Button
                  onClick={() => handleAdvanceStatus(selectedPO.id)}
                  className="w-full h-11 rounded-xl gold-gradient text-obsidian-950 font-extrabold text-xs shadow-md shadow-gold-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Advance Sourcing to Next Step
                </Button>
              )}

              <Link href="/procurement/grn">
                <Button
                  variant="outline"
                  className="w-full h-11 rounded-xl text-xs font-bold cursor-pointer"
                >
                  <ClipboardCheck className="w-4 h-4 mr-2 text-gold-500" /> Open Inbound GRN Inspection Node
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
