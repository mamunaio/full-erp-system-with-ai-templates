"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Factory, Activity, Zap, CheckCircle2, Clock,
  TrendingUp, BarChart3, ChevronRight, ShieldCheck,
  Cpu, AlertTriangle, Play, Pause, Settings2, Plus,
  Layers, Package, FileSpreadsheet, Sparkles
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MaterialAvailability from "./components/MaterialAvailability";

const mfgMetrics = [
  { label: "Manufacturing Yield", value: "98.2%", change: "+1.4%", sub: "1,420 Units Built YTD" },
  { label: "Equipment Effectiveness (OEE)", value: "89.4%", change: "+3.2%", sub: "4 Robotic Lines Online" },
  { label: "Active Work Orders", value: "14 Orders", change: "In Production", sub: "3 Finishing Today" },
  { label: "Quality Defect Rate", value: "0.42%", change: "-0.18%", sub: "Six-Sigma Compliance" },
];

const productionLines = [
  { id: "L1", name: "Line Alpha-01", desc: "High-Density Server Node Assembly", output: "42 units/hr", efficiency: 98.4, status: "RUNNING", lead: "Farhan Ahmed" },
  { id: "L2", name: "Line Beta-02", desc: "SMT Robotics & Motherboard Soldering", output: "120 units/hr", efficiency: 92.1, status: "RUNNING", lead: "Zubair Rahman" },
  { id: "L3", name: "Line Gamma-03", desc: "Display Calibration & Optical Bench", output: "35 units/hr", efficiency: 84.6, status: "CALIBRATING", lead: "Ayesha Siddiqua" },
  { id: "L4", name: "Line Delta-04", desc: "Automated Final Packaging & Shrink", output: "80 units/hr", efficiency: 95.0, status: "RUNNING", lead: "Tariqul Islam" },
];

const activeWorkOrders = [
  { id: "WO-9021", product: "Enterprise Cloud Server 2U Gen-X", line: "Line Alpha-01", target: 500, completed: 380, progress: 76, shift: "Day Shift (Team A)", status: "IN_PROGRESS" },
  { id: "WO-9020", product: "Cisco ASIC 48-Port Switch Motherboards", line: "Line Beta-02", target: 1200, completed: 1140, progress: 95, shift: "Day Shift (Team B)", status: "FINAL_INSPECTION" },
  { id: "WO-9019", product: "Industrial IoT Edge Gateway Bases", line: "Line Gamma-03", target: 300, completed: 120, progress: 40, shift: "Night Shift (Team C)", status: "IN_PROGRESS" },
  { id: "WO-9018", product: "Apple M3 Max Customized Rack Enclosures", line: "Line Delta-04", target: 150, completed: 150, progress: 100, shift: "Day Shift (Team A)", status: "COMPLETED" },
];

export default function ManufacturingPage() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Manufacturing Plant Performance & Work Order Ledger exported to CSV/PDF!");
    }, 1100);
  };

  const handleTriggerQA = (woId: string) => {
    toast.success(`Quality Assurance scan initiated for ${woId}! Telemetry sent to Lead Inspector.`);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">
      {/* Top Banner: Industrial Production & Plant Control */}
      <div className="glass-strong rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Robotic Plant Operations Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
              Manufacturing & <span className="gold-text">Production Command</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
              Monitor shop-floor assembly lines, work order execution pipelines, Bill of Materials (BOM), and quality control telemetry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              variant="outline"
              className="rounded-2xl h-11 sm:h-12 px-4 border-border bg-card/60 font-bold text-xs hover:bg-accent"
            >
              <FileSpreadsheet className="w-4 h-4 mr-1.5 text-amber-500" />
              <span>{isExporting ? "Exporting..." : "Export Plant Ledger"}</span>
            </Button>
            <Link href="/manufacturing/bom">
              <Button variant="outline" className="rounded-2xl h-11 sm:h-12 px-5 border-border bg-card/60 font-bold text-xs sm:text-sm hover:bg-accent">
                <Layers className="w-4 h-4 mr-2 text-gold-500" /> BOM Builder (18)
              </Button>
            </Link>
            <Link href="/manufacturing/work-orders/new">
              <Button className="gold-gradient text-obsidian-900 font-extrabold text-xs sm:text-sm rounded-2xl h-11 sm:h-12 px-6 shadow-lg shadow-gold-500/20 hover:opacity-90">
                <Plus className="w-4 h-4 mr-1.5" /> Issue Work Order
              </Button>
            </Link>
          </div>
        </div>

        {/* Plant Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-border/50">
          {mfgMetrics.map((m, idx) => (
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

      {/* Production Lines Telemetry Gauges */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
              Shop Floor Assembly Lines Telemetry
            </h3>
            <p className="text-xs text-muted-foreground">Real-time robotics operational velocity and efficiency indices</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {productionLines.map((line) => (
            <div key={line.id} className="glass rounded-3xl p-5 border border-border/80 shadow-md space-y-3 hover:border-gold-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                  line.status === "RUNNING" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                }`}>
                  {line.status}
                </span>
                <span className="text-xs font-mono font-bold text-muted-foreground">{line.output}</span>
              </div>

              <div>
                <h4 className="text-sm font-bold text-foreground font-heading">{line.name}</h4>
                <p className="text-[11px] text-muted-foreground line-clamp-1">{line.desc}</p>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[10px] font-bold">
                  <span className="text-muted-foreground">Efficiency Index</span>
                  <span className="gold-text font-extrabold">{line.efficiency}%</span>
                </div>
                <div className="w-full bg-accent h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full gold-gradient transition-all duration-500"
                    style={{ width: `${line.efficiency}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Shift Lead:</span>
                <span className="font-semibold text-foreground">{line.lead}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Work Orders Stream + BOM Material Feasibility */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Work Orders (WO) Execution Table */}
        <div className="lg:col-span-2 glass rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
                Active Work Orders (WO) Stream
              </h3>
              <p className="text-xs text-muted-foreground">Robotic build jobs, production targets, and completion progress</p>
            </div>
          </div>

          <div className="divide-y divide-border/50">
            {activeWorkOrders.map((wo) => (
              <div key={wo.id} className="py-4 space-y-2.5 group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-md border border-gold-500/20">
                      {wo.id}
                    </span>
                    <span className="text-sm font-bold text-foreground">{wo.product}</span>
                  </div>

                  <span className={`text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider self-start sm:self-auto ${
                    wo.status === "COMPLETED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                    wo.status === "FINAL_INSPECTION" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                    "bg-blue-500/10 text-blue-500 border-blue-500/20"
                  }`}>
                    {wo.status.replace("_", " ")}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground font-medium">{wo.line} • {wo.shift}</span>
                    <span className="font-extrabold text-foreground font-mono">{wo.completed} / {wo.target} Units ({wo.progress}%)</span>
                  </div>
                  <div className="w-full bg-accent h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        wo.progress === 100 ? "bg-emerald-500" : "gold-gradient"
                      }`}
                      style={{ width: `${wo.progress}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-xs">
                  <span className="text-[10px] text-muted-foreground font-semibold">Quality Telemetry: <strong className="text-emerald-500">Zero Faults</strong></span>
                  <Button
                    size="sm"
                    onClick={() => handleTriggerQA(wo.id)}
                    className="rounded-xl gold-gradient text-obsidian-950 font-bold text-[11px] h-8 px-3 shadow-sm hover:opacity-90"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Run QA Scan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: BOM Material Feasibility */}
        <div className="space-y-6">
          <MaterialAvailability />
        </div>
      </div>
    </div>
  );
}
