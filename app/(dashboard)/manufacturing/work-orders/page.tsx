"use client";

import { useState } from "react";
import { 
  Plus, Search, Filter, FileDown, ArrowLeft,
  MoreVertical, ChevronRight, Package, Truck, 
  CheckCircle2, Clock, AlertCircle, Eye, Download,
  Trash2, X, Sparkles, Building2, Check, ArrowRight,
  ShieldCheck, ArrowUpRight, DollarSign, RefreshCw,
  Factory, Activity, Zap, Play, Pause, Layers,
  FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface WorkOrder {
  id: string;
  product: string;
  sku: string;
  bomCode: string;
  line: string;
  target: number;
  completed: number;
  progress: number;
  shift: string;
  lead: string;
  startDate: string;
  dueDate: string;
  status: "QUEUED" | "IN_PROGRESS" | "FINAL_INSPECTION" | "COMPLETED" | "HOLD";
  components?: { name: string; required: number; allocated: boolean }[];
}

const initialWorkOrders: WorkOrder[] = [
  {
    id: "#WO-2026-9021",
    product: "Enterprise Cloud Server 2U Gen-X",
    sku: "PRD-SRV-2U-GX",
    bomCode: "BOM-SRV-2U-REV4",
    line: "Line Alpha-01 (Server Node Assembly)",
    target: 500,
    completed: 380,
    progress: 76,
    shift: "Day Shift (Team Alpha)",
    lead: "Farhan Ahmed",
    startDate: "Sep 01, 2026",
    dueDate: "Sep 06, 2026",
    status: "IN_PROGRESS",
    components: [
      { name: "Intel Xeon Platinum 8480+ Processor", required: 1000, allocated: true },
      { name: "DDR5 ECC Registered 64GB Module", required: 4000, allocated: true },
      { name: "Sovereign 2U Steel Chassis", required: 500, allocated: true },
    ]
  },
  {
    id: "#WO-2026-9020",
    product: "Cisco ASIC 48-Port Switch Motherboards",
    sku: "PRD-CS-48P-MB",
    bomCode: "BOM-CS-48P-V2",
    line: "Line Beta-02 (SMT Robotics)",
    target: 1200,
    completed: 1140,
    progress: 95,
    shift: "Day Shift (Team Beta)",
    lead: "Zubair Rahman",
    startDate: "Aug 28, 2026",
    dueDate: "Sep 04, 2026",
    status: "FINAL_INSPECTION",
    components: [
      { name: "Custom Layer-3 Network ASIC Chipset", required: 1200, allocated: true },
      { name: "48-Port RJ45 Modular Jack", required: 1200, allocated: true },
    ]
  },
  {
    id: "#WO-2026-9019",
    product: "Industrial IoT Edge Gateway Bases",
    sku: "PRD-IOT-EDGE-B",
    bomCode: "BOM-IOT-GW-V1",
    line: "Line Gamma-03 (Display & Bench)",
    target: 300,
    completed: 120,
    progress: 40,
    shift: "Night Shift (Team Gamma)",
    lead: "Tariqul Islam",
    startDate: "Sep 02, 2026",
    dueDate: "Sep 08, 2026",
    status: "IN_PROGRESS",
    components: [
      { name: "ARM Cortex-A72 Micro-Module", required: 300, allocated: true },
      { name: "Dual-Band LoRaWAN Radio", required: 300, allocated: true },
    ]
  },
  {
    id: "#WO-2026-9018",
    product: "Apple M3 Max Customized Rack Enclosures",
    sku: "PRD-APL-ENC",
    bomCode: "BOM-ENC-M3-V2",
    line: "Line Delta-04 (Packaging)",
    target: 150,
    completed: 150,
    progress: 100,
    shift: "Day Shift (Team Alpha)",
    lead: "Farhan Ahmed",
    startDate: "Aug 24, 2026",
    dueDate: "Aug 30, 2026",
    status: "COMPLETED",
    components: [
      { name: "Anodized Aerospace Aluminum Extrusions", required: 150, allocated: true },
    ]
  },
  {
    id: "#WO-2026-9022",
    product: "NVIDIA DGX H100 Sovereign AI Server",
    sku: "SKU-SVR-NV90",
    bomCode: "BOM-NV-H100-PRO",
    line: "Line Alpha-01 (Server Node Assembly)",
    target: 10,
    completed: 0,
    progress: 0,
    shift: "Evening Shift (Team Beta)",
    lead: "Zubair Rahman",
    startDate: "Sep 05, 2026",
    dueDate: "Sep 12, 2026",
    status: "QUEUED",
    components: [
      { name: "NVIDIA H100 SXM5 80GB GPU Blade", required: 80, allocated: true },
      { name: "NVLink Liquid Cold Plate Assembly", required: 10, allocated: true },
    ]
  },
];

export default function WorkOrdersPage() {
  const [orders, setOrders] = useState<WorkOrder[]>(initialWorkOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedWO, setSelectedWO] = useState<WorkOrder | null>(null);

  // Filter calculation
  const filteredOrders = orders.filter((wo) => {
    const matchesSearch = 
      wo.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.line.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.lead.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wo.status.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === "ALL") return true;
    if (activeFilter === "IN_PROGRESS") return wo.status === "IN_PROGRESS";
    if (activeFilter === "FINAL_INSPECTION") return wo.status === "FINAL_INSPECTION";
    if (activeFilter === "COMPLETED") return wo.status === "COMPLETED";
    if (activeFilter === "QUEUED") return wo.status === "QUEUED";

    return true;
  });

  const totalBuilt = orders.reduce((acc, o) => acc + o.completed, 0);
  const totalTarget = orders.reduce((acc, o) => acc + o.target, 0);
  const activeLinesCount = 4;

  const handleExport = () => {
    toast.success("Exporting Work Order Production Ledger...", {
      description: "Batch CSV and cryptographic shop-floor QA manifest downloaded.",
    });
  };

  const handleAdvanceStatus = (woId: string) => {
    setOrders(orders.map(o => {
      if (o.id === woId) {
        let newStatus: WorkOrder["status"] = "IN_PROGRESS";
        let newProgress = o.progress;
        let newCompleted = o.completed;

        if (o.status === "QUEUED") {
          newStatus = "IN_PROGRESS";
          newProgress = 25;
          newCompleted = Math.round(o.target * 0.25);
        } else if (o.status === "IN_PROGRESS") {
          newStatus = "FINAL_INSPECTION";
          newProgress = 95;
          newCompleted = Math.round(o.target * 0.95);
        } else if (o.status === "FINAL_INSPECTION") {
          newStatus = "COMPLETED";
          newProgress = 100;
          newCompleted = o.target;
        }

        toast.success(`Work Order ${o.id} Advanced to ${newStatus}!`, {
          description: `Robotic assembly step synchronized across MES sensors.`,
        });

        return { ...o, status: newStatus, progress: newProgress, completed: newCompleted };
      }
      return o;
    }));

    if (selectedWO && selectedWO.id === woId) {
      setSelectedWO(prev => {
        if (!prev) return null;
        let newStatus: WorkOrder["status"] = "IN_PROGRESS";
        let newProgress = prev.progress;
        let newCompleted = prev.completed;

        if (prev.status === "QUEUED") {
          newStatus = "IN_PROGRESS";
          newProgress = 25;
          newCompleted = Math.round(prev.target * 0.25);
        } else if (prev.status === "IN_PROGRESS") {
          newStatus = "FINAL_INSPECTION";
          newProgress = 95;
          newCompleted = Math.round(prev.target * 0.95);
        } else if (prev.status === "FINAL_INSPECTION") {
          newStatus = "COMPLETED";
          newProgress = 100;
          newCompleted = prev.target;
        }

        return { ...prev, status: newStatus, progress: newProgress, completed: newCompleted };
      });
    }
  };

  const handleDeleteWO = (woId: string) => {
    setOrders(orders.filter(o => o.id !== woId));
    if (selectedWO?.id === woId) setSelectedWO(null);
    toast.info(`Work Order ${woId} removed from production schedule.`);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link 
              href="/manufacturing" 
              className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 bg-card/60 hover:bg-card border border-border/80 rounded-xl px-3 py-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Manufacturing Command
            </Link>
            <span className="text-xs text-muted-foreground">• Shop Floor Work Orders</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
            Work Orders & <span className="gold-text">Plant Execution</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Track shop-floor assembly batches, robotic throughput, BOM material reservations, and QA inspection gates.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button 
            variant="outline" 
            onClick={handleExport}
            className="h-11 px-4 rounded-xl text-xs font-bold bg-card border-border hover:border-gold-500/40 cursor-pointer shadow-sm flex items-center gap-2"
          >
            <FileSpreadsheet className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">Export Plant Ledger</span>
          </Button>

          <Link href="/manufacturing/bom">
            <Button variant="outline" className="h-11 px-4 rounded-xl text-xs font-bold bg-card border-border hover:border-gold-500/40 cursor-pointer shadow-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-gold-500" />
              <span>BOM Builder (18)</span>
            </Button>
          </Link>

          <Link href="/manufacturing/work-orders/new">
            <Button className="h-11 px-6 rounded-xl gold-gradient text-obsidian-950 font-black text-xs shadow-lg shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Issue Work Order</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Cyber-Luxe Manufacturing KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
              <Factory className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              98.2% Yield
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Units Built (YTD)</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">{totalBuilt.toLocaleString()} Units</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              Active Batches
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Target Capacity</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-500 font-heading">{totalTarget.toLocaleString()} Target</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              4 Lines Active
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Overall Equipment Effectiveness</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500 font-heading">89.4% OEE</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/20">
              Six-Sigma
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Quality Defect Rate</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">0.42% PPM</p>
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
              { id: "IN_PROGRESS", label: "In Production", count: orders.filter(o => o.status === "IN_PROGRESS").length },
              { id: "FINAL_INSPECTION", label: "Final QA Inspection", count: orders.filter(o => o.status === "FINAL_INSPECTION").length },
              { id: "COMPLETED", label: "Completed", count: orders.filter(o => o.status === "COMPLETED").length },
              { id: "QUEUED", label: "Queued", count: orders.filter(o => o.status === "QUEUED").length },
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
              placeholder="Search by WO #, product, or line..."
              className="w-full bg-background/60 border border-border/80 rounded-xl h-10 pl-10 pr-4 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all"
            />
          </div>
        </div>

        {/* Work Orders Table */}
        <div className="overflow-x-auto custom-scrollbar border border-border/80 rounded-2xl bg-card/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-card/80 border-b border-border/80 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="py-4 pl-4">Work Order #</th>
                <th className="py-4">Manufactured End Product</th>
                <th className="py-4">Assigned Robotic Line</th>
                <th className="py-4">Progress & Units</th>
                <th className="py-4">Shift & Team Lead</th>
                <th className="py-4 text-center">Status</th>
                <th className="py-4 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-muted-foreground font-semibold">
                    No matching work orders found in this view.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((wo) => (
                  <tr 
                    key={wo.id}
                    onClick={() => setSelectedWO(wo)}
                    className="hover:bg-accent/40 transition-colors group cursor-pointer"
                  >
                    {/* WO ID */}
                    <td className="py-4 pl-4 font-black font-heading text-foreground">
                      <div className="flex items-center gap-2">
                        <span className="text-gold-600 dark:text-gold-400 font-mono group-hover:underline">{wo.id}</span>
                        <span className="text-[10px] text-muted-foreground font-mono font-semibold">({wo.bomCode})</span>
                      </div>
                    </td>

                    {/* Product */}
                    <td className="py-4 font-bold text-foreground">
                      <span className="block">{wo.product}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{wo.sku}</span>
                    </td>

                    {/* Line */}
                    <td className="py-4 font-medium text-foreground">
                      <div className="flex items-center gap-1.5">
                        <Factory className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{wo.line}</span>
                      </div>
                    </td>

                    {/* Progress */}
                    <td className="py-4 w-48">
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-foreground">{wo.completed}</span>
                          <span className="text-muted-foreground">of {wo.target} ({wo.progress}%)</span>
                        </div>
                        <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full rounded-full transition-all duration-500",
                              wo.status === "COMPLETED" ? "bg-emerald-500" :
                              wo.status === "FINAL_INSPECTION" ? "bg-blue-500" :
                              "bg-gold-500"
                            )}
                            style={{ width: `${wo.progress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Shift & Lead */}
                    <td className="py-4">
                      <span className="font-semibold text-foreground block">{wo.shift}</span>
                      <span className="text-[10px] text-muted-foreground">Lead: {wo.lead}</span>
                    </td>

                    {/* Status */}
                    <td className="py-4 text-center">
                      <span className={cn(
                        "text-[9px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border inline-flex items-center gap-1.5 shadow-sm",
                        wo.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" :
                        wo.status === "FINAL_INSPECTION" ? "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30" :
                        wo.status === "IN_PROGRESS" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30" :
                        "bg-accent text-muted-foreground border-border"
                      )}>
                        {wo.status === "COMPLETED" && <Check className="w-3 h-3" />}
                        {wo.status === "IN_PROGRESS" && <Activity className="w-3 h-3" />}
                        {wo.status.replace("_", " ")}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="py-4 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          title="View Work Order Details"
                          onClick={() => setSelectedWO(wo)}
                          className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {wo.status !== "COMPLETED" && (
                          <button
                            title="Advance Production Step"
                            onClick={() => handleAdvanceStatus(wo.id)}
                            className="p-1.5 rounded-lg hover:bg-gold-500/10 text-muted-foreground hover:text-gold-500 transition-colors cursor-pointer"
                          >
                            <RefreshCw className="w-4 h-4" />
                          </button>
                        )}

                        <button
                          title="Download Manifest"
                          onClick={handleExport}
                          className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                        </button>

                        <button
                          title="Archive Work Order"
                          onClick={() => handleDeleteWO(wo.id)}
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

      {/* Slide-Over WO Detail Drawer */}
      {selectedWO && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
          onClick={() => setSelectedWO(null)}
        >
          <div 
            className="w-full max-w-xl h-full bg-card border-l border-border/80 shadow-2xl p-6 sm:p-8 overflow-y-auto custom-scrollbar space-y-6 animate-in slide-in-from-right duration-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center text-obsidian-950 font-black">
                  <Factory className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground font-heading">{selectedWO.id}</h3>
                  <p className="text-[10px] text-muted-foreground">Start: {selectedWO.startDate} • Target: {selectedWO.dueDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedWO(null)}
                  className="p-2 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Product & Line Info Card */}
            <div className="p-4 rounded-2xl bg-card/60 border border-border/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Product to Build</span>
                  <span className="text-sm font-extrabold text-foreground">{selectedWO.product}</span>
                </div>
                <span className={cn(
                  "text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border",
                  selectedWO.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" :
                  selectedWO.status === "FINAL_INSPECTION" ? "bg-blue-500/10 text-blue-500 border-blue-500/30" :
                  "bg-amber-500/10 text-amber-500 border-amber-500/30"
                )}>
                  {selectedWO.status.replace("_", " ")}
                </span>
              </div>

              <div className="space-y-1 pt-1 border-t border-border/60 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assigned Line:</span>
                  <span className="font-semibold text-foreground">{selectedWO.line}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Bill of Materials:</span>
                  <span className="font-mono font-bold text-gold-600 dark:text-gold-400">{selectedWO.bomCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Team Lead:</span>
                  <span className="font-semibold text-foreground">{selectedWO.lead} ({selectedWO.shift})</span>
                </div>
              </div>
            </div>

            {/* Live Progress Bar */}
            <div className="p-4 rounded-2xl bg-background/50 border border-border/80 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-muted-foreground">Batch Progress</span>
                <span className="text-foreground">{selectedWO.completed} / {selectedWO.target} Units ({selectedWO.progress}%)</span>
              </div>
              <div className="h-2 w-full bg-accent rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full rounded-full transition-all duration-500",
                    selectedWO.status === "COMPLETED" ? "bg-emerald-500" : "bg-gold-500"
                  )}
                  style={{ width: `${selectedWO.progress}%` }}
                />
              </div>
            </div>

            {/* Reserved BOM Materials */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">BOM Material Allocations</h4>
              <div className="border border-border/80 rounded-2xl overflow-hidden divide-y divide-border/60 bg-background/40">
                {selectedWO.components?.map((c, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-foreground">{c.name}</p>
                      <p className="text-[10px] text-muted-foreground">Allocated: {c.required} units</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Vault Locked
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-2">
              {selectedWO.status !== "COMPLETED" && (
                <Button
                  onClick={() => handleAdvanceStatus(selectedWO.id)}
                  className="w-full h-11 rounded-xl gold-gradient text-obsidian-950 font-extrabold text-xs shadow-md shadow-gold-500/20 cursor-pointer flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" /> Advance Production to Next Stage
                </Button>
              )}

              <Link href="/manufacturing/bom">
                <Button
                  variant="outline"
                  className="w-full h-11 rounded-xl text-xs font-bold cursor-pointer"
                >
                  <Layers className="w-4 h-4 mr-2 text-gold-500" /> Inspect Bill of Materials (BOM)
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
