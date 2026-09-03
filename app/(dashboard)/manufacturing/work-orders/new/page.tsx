"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Plus, Trash2, Factory, Calendar, 
  Cpu, ShieldCheck, Sparkles, DollarSign, Package, 
  CheckCircle2, AlertTriangle, ArrowRight, Loader2, 
  Calculator, Info, FileText, User, Layers, RefreshCw,
  Activity, Zap, Settings2, Boxes
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BOMComponent {
  name: string;
  sku: string;
  qtyPerUnit: number;
  availableStock: number;
  unitCost: number;
}

const productBOMList = [
  {
    productName: "Enterprise Cloud Server 2U Gen-X",
    sku: "PRD-SRV-2U-GX",
    bomCode: "BOM-SRV-2U-REV4",
    leadTimeHours: 4.5,
    unitLaborCost: 45,
    components: [
      { name: "Intel Xeon Platinum 8480+ Processor", sku: "CMP-CPU-8480", qtyPerUnit: 2, availableStock: 120, unitCost: 3200 },
      { name: "DDR5 ECC Registered 64GB Module", sku: "CMP-RAM-64G", qtyPerUnit: 8, availableStock: 480, unitCost: 180 },
      { name: "Sovereign 2U Rackmount Steel Chassis", sku: "CMP-CHS-2U", qtyPerUnit: 1, availableStock: 85, unitCost: 220 },
      { name: "Redundant 1200W Titanium Power Supply", sku: "CMP-PSU-1200", qtyPerUnit: 2, availableStock: 140, unitCost: 160 },
    ]
  },
  {
    productName: "Cisco ASIC 48-Port Switch Motherboards",
    sku: "PRD-CS-48P-MB",
    bomCode: "BOM-CS-48P-V2",
    leadTimeHours: 2.8,
    unitLaborCost: 28,
    components: [
      { name: "Custom Layer-3 Network ASIC Chipset", sku: "CMP-ASIC-L3", qtyPerUnit: 1, availableStock: 340, unitCost: 180 },
      { name: "48-Port RJ45 Modular Magnetic Jack", sku: "CMP-JK-48P", qtyPerUnit: 1, availableStock: 210, unitCost: 45 },
      { name: "High-Speed FR4 12-Layer PCB Board", sku: "CMP-PCB-12L", qtyPerUnit: 1, availableStock: 500, unitCost: 35 },
    ]
  },
  {
    productName: "Industrial IoT Edge Gateway Bases",
    sku: "PRD-IOT-EDGE-B",
    bomCode: "BOM-IOT-GW-V1",
    leadTimeHours: 1.5,
    unitLaborCost: 15,
    components: [
      { name: "Quad-Core ARM Cortex-A72 Micro-Module", sku: "CMP-ARM-A72", qtyPerUnit: 1, availableStock: 420, unitCost: 65 },
      { name: "Dual-Band Industrial LoRaWAN / 5G Radio", sku: "CMP-RAD-5G", qtyPerUnit: 1, availableStock: 180, unitCost: 85 },
      { name: "IP67 Rugged Anodized Aluminum Enclosure", sku: "CMP-ENC-IP67", qtyPerUnit: 1, availableStock: 290, unitCost: 40 },
    ]
  },
];

const productionLines = [
  { id: "L1", name: "Line Alpha-01 — High-Density Server Node Assembly", output: "42 units/hr", efficiency: "98.4% OEE" },
  { id: "L2", name: "Line Beta-02 — SMT Robotics & Motherboard Soldering", output: "120 units/hr", efficiency: "92.1% OEE" },
  { id: "L3", name: "Line Gamma-03 — Display Calibration & Optical Bench", output: "35 units/hr", efficiency: "84.6% OEE" },
  { id: "L4", name: "Line Delta-04 — Automated Final Packaging & Shrink", output: "80 units/hr", efficiency: "95.0% OEE" },
];

const shifts = [
  { id: "s1", name: "Day Shift (Team Alpha • Lead: Farhan Ahmed)", hours: "08:00 AM – 04:00 PM" },
  { id: "s2", name: "Evening Shift (Team Beta • Lead: Zubair Rahman)", hours: "04:00 PM – 12:00 AM" },
  { id: "s3", name: "Night Shift (Team Gamma • Lead: Tariqul Islam)", hours: "12:00 AM – 08:00 AM" },
];

const qaProtocols = [
  "Six-Sigma Automated Inspection (MIL-STD-105E)",
  "100% Automated Optical Inspection (AOI) + Thermal Chamber",
  "ISO 9001 Batch Sampling (1 in every 20 units)",
];

export default function NewWorkOrderPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedProductIndex, setSelectedProductIndex] = useState(0);
  const [selectedLine, setSelectedLine] = useState("L1");
  const [selectedShift, setSelectedShift] = useState("s1");
  const [batchQty, setBatchQty] = useState(50);
  const [startDate, setStartDate] = useState("2026-09-04");
  const [completionDate, setCompletionDate] = useState("2026-09-08");
  const [qaProtocol, setQaProtocol] = useState(qaProtocols[0]);
  const [autoReserveStock, setAutoReserveStock] = useState(true);
  const [dispatchTablets, setDispatchTablets] = useState(true);

  const currentProduct = productBOMList[selectedProductIndex];

  // Financial calculations
  const rawMaterialUnitCost = currentProduct.components.reduce((acc, c) => acc + (c.qtyPerUnit * c.unitCost), 0);
  const totalRawMaterialCost = rawMaterialUnitCost * batchQty;
  const totalLaborCost = currentProduct.unitLaborCost * batchQty;
  const plantOverhead = totalLaborCost * 0.35; // 35% overhead on labor
  const totalProductionCost = totalRawMaterialCost + totalLaborCost + plantOverhead;
  const unitProductionCost = batchQty > 0 ? Math.round(totalProductionCost / batchQty) : 0;

  // Assembly time
  const totalAssemblyHours = (currentProduct.leadTimeHours * (batchQty / 10)).toFixed(1);

  const handleReleaseWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedWO = `#WO-2026-${Math.floor(9000 + Math.random() * 1000)}`;
      toast.success(`Work Order ${generatedWO} Released to Shop Floor!`, {
        description: `Production queued on ${productionLines.find(l => l.id === selectedLine)?.name}. Digital instruction packets dispatched.`,
      });
      router.push("/manufacturing");
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-16 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link 
              href="/manufacturing" 
              className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 bg-card/60 hover:bg-card border border-border/80 rounded-xl px-3 py-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Manufacturing Command
            </Link>
            <span className="text-xs text-muted-foreground">• Work Order Studio</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
              Issue <span className="gold-text">Work Order</span>
            </h1>
            <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/15 px-2.5 py-0.5 rounded-full border border-gold-500/30 uppercase tracking-widest font-mono">
              #WO-2026-9025
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Configure target product Bill of Materials (BOM), assign robotic lines, schedule shifts, and release production orders.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button 
            variant="outline"
            onClick={() => router.push("/manufacturing")}
            className="h-11 px-5 rounded-xl text-xs font-bold bg-card border-border hover:border-gold-500/40 cursor-pointer shadow-sm"
          >
            Cancel
          </Button>

          <Button 
            onClick={handleReleaseWorkOrder}
            disabled={isSubmitting}
            className="h-11 px-7 rounded-xl gold-gradient text-obsidian-950 font-black text-xs shadow-lg shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center gap-2"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Releasing to Shop Floor...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                Authorize & Release Work Order <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <form onSubmit={handleReleaseWorkOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS: Production Job & BOM Allocation */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Assembly Job & Production Line Parameters */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gold-500/15 text-gold-500 flex items-center justify-center font-bold">
                  <Factory className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-heading">Production Job & Assembly Line</h3>
                  <p className="text-[10px] text-muted-foreground">Select end-item product, linked BOM and robotic line assignment</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/25 font-mono">
                {currentProduct.bomCode}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Product to Manufacture (End Item)
                </Label>
                <div className="relative">
                  <Package className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <select
                    value={selectedProductIndex}
                    onChange={(e) => setSelectedProductIndex(parseInt(e.target.value))}
                    className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl pl-10 pr-4 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                  >
                    {productBOMList.map((p, idx) => (
                      <option key={idx} value={idx} className="bg-card text-foreground">
                        {p.productName} ({p.bomCode})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Assigned Production Assembly Line
                </Label>
                <select
                  value={selectedLine}
                  onChange={(e) => setSelectedLine(e.target.value)}
                  className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                >
                  {productionLines.map((line) => (
                    <option key={line.id} value={line.id} className="bg-card">
                      {line.name} — ({line.efficiency})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Target Batch Quantity (Units)
                </Label>
                <div className="relative">
                  <Boxes className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="number"
                    min="1"
                    value={batchQty}
                    onChange={(e) => setBatchQty(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-10 pr-4 text-xs font-bold text-foreground outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Operating Production Shift
                </Label>
                <select
                  value={selectedShift}
                  onChange={(e) => setSelectedShift(e.target.value)}
                  className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:border-gold-500 cursor-pointer"
                >
                  {shifts.map((s) => (
                    <option key={s.id} value={s.id} className="bg-card">
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Scheduled Start Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-11 bg-background/60 border-border/80 rounded-2xl pl-10 text-xs font-semibold text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Target Completion Deadline
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="date"
                    value={completionDate}
                    onChange={(e) => setCompletionDate(e.target.value)}
                    className="h-11 bg-background/60 border-border/80 rounded-2xl pl-10 text-xs font-semibold text-foreground"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 2. BOM Component Allocation & Inventory Check */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-heading">Required BOM Component Allocation</h3>
                  <p className="text-[10px] text-muted-foreground">Automated inventory reservation for batch of {batchQty} units</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                100% Stock Reserved
              </span>
            </div>

            <div className="border border-border/80 rounded-2xl overflow-hidden bg-card/40">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs min-w-[650px]">
                  <thead className="bg-card/80 border-b border-border/80 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                    <tr>
                      <th className="p-3 pl-4">BOM Component / SKU</th>
                      <th className="p-3 w-24 text-center">Req / Unit</th>
                      <th className="p-3 w-28 text-center">Batch Req.</th>
                      <th className="p-3 w-28 text-center">Available Stock</th>
                      <th className="p-3 w-28 text-right">Unit Cost ($)</th>
                      <th className="p-3 pr-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {currentProduct.components.map((c, idx) => {
                      const totalReq = c.qtyPerUnit * batchQty;
                      const isStockSufficient = c.availableStock >= totalReq;
                      return (
                        <tr key={idx} className="hover:bg-accent/40 transition-colors">
                          <td className="p-3 pl-4">
                            <span className="font-bold text-foreground block">{c.name}</span>
                            <span className="text-[10px] font-mono text-muted-foreground">{c.sku}</span>
                          </td>
                          <td className="p-3 text-center font-semibold text-foreground">
                            {c.qtyPerUnit}x
                          </td>
                          <td className="p-3 text-center font-extrabold text-gold-600 dark:text-gold-400">
                            {totalReq} units
                          </td>
                          <td className="p-3 text-center text-muted-foreground">
                            {c.availableStock} in vault
                          </td>
                          <td className="p-3 text-right font-mono font-bold text-foreground">
                            ${c.unitCost.toLocaleString()}
                          </td>
                          <td className="p-3 pr-4 text-center">
                            <span className={cn(
                              "text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full border inline-block",
                              isStockSufficient 
                                ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/25" 
                                : "text-rose-500 bg-rose-500/10 border-rose-500/25"
                            )}>
                              {isStockSufficient ? "Stock Reserved" : "Shortage Risk"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 3. Quality Control (QA) Standards */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground font-heading">Quality Control (QA) & Inspection Protocol</h3>
                <p className="text-[10px] text-muted-foreground">Select defect detection protocol and technician sign-off standards</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                Active QA Protocol
              </Label>
              <select
                value={qaProtocol}
                onChange={(e) => setQaProtocol(e.target.value)}
                className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:border-gold-500 cursor-pointer"
              >
                {qaProtocols.map((qa, i) => (
                  <option key={i} value={qa} className="bg-card">
                    {qa}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT 1 COLUMN: Costing & AI Shop Floor Telemetry */}
        <div className="space-y-6">
          {/* Production Cost Summary Card */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <h3 className="text-sm font-bold text-foreground font-heading">Production Costing</h3>
              <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 uppercase">
                USD ($)
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Raw Materials (BOM):</span>
                <span className="font-bold text-foreground">${totalRawMaterialCost.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Direct Machine Labor:</span>
                <span className="font-bold text-foreground">${totalLaborCost.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Plant Overhead & QA:</span>
                <span className="font-bold text-foreground">${plantOverhead.toLocaleString()}</span>
              </div>

              <div className="pt-3 border-t border-border/70 flex justify-between items-baseline">
                <div>
                  <span className="text-xs text-muted-foreground block">Cost Per Finished Unit:</span>
                  <span className="text-sm font-bold text-foreground font-heading">${unitProductionCost.toLocaleString()} / unit</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-muted-foreground block">Total Batch Commitment:</span>
                  <span className="text-2xl font-black gold-text font-heading">${totalProductionCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="space-y-2 pt-2 border-t border-border/60 text-xs text-muted-foreground">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoReserveStock}
                  onChange={(e) => setAutoReserveStock(e.target.checked)}
                  className="w-4 h-4 rounded-md border-border bg-card text-gold-500 accent-gold-500 cursor-pointer"
                />
                <span>Auto-reserve BOM components in warehouse vault</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={dispatchTablets}
                  onChange={(e) => setDispatchTablets(e.target.checked)}
                  className="w-4 h-4 rounded-md border-border bg-card text-gold-500 accent-gold-500 cursor-pointer"
                />
                <span>Dispatch digital instruction packets to shop floor</span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-13 rounded-2xl gold-gradient text-obsidian-950 font-black text-xs sm:text-sm shadow-xl shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Releasing Work Order...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  Authorize & Release Work Order <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>

          {/* AI Shop Floor Telemetry Card */}
          <div className="glass rounded-3xl border border-border/80 p-5 shadow-lg space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">AI Shop Floor Telemetry</h4>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Optimized
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-card/60 border border-border/60 flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Estimated Cycle Duration</span>
                  <span className="font-extrabold text-foreground text-sm">{totalAssemblyHours} hrs Active Assembly</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Activity className="w-4 h-4" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-card/60 border border-border/60 flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Robotic Line OEE Target</span>
                  <span className="font-extrabold text-emerald-500 text-sm">+98.2% Target Yield</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
