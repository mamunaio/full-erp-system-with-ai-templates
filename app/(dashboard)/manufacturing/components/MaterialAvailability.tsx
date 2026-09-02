"use client";

import { CheckCircle2, XCircle, AlertTriangle, Cpu, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MaterialAvailability() {
  const materials = [
    { name: "Intel Xeon Scalable Processor", required: 50, available: 120, status: "OK", warehouse: "Central HQ" },
    { name: "Cisco ASIC Switch Silicon", required: 50, available: 45, status: "LOW", warehouse: "Central HQ" },
    { name: "64GB DDR5 ECC Server RAM", required: 100, available: 240, status: "OK", warehouse: "Chittagong Hub" },
    { name: "1U Rackmount Server Chassis", required: 50, available: 12, status: "CRITICAL", warehouse: "Gazipur Depot" },
  ];

  return (
    <div className="glass rounded-3xl border border-border/80 overflow-hidden shadow-xl space-y-2">
      <div className="p-4 sm:p-5 border-b border-border/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground font-heading">BOM Material Feasibility</h3>
            <p className="text-[10px] text-muted-foreground">Raw assembly components for active work orders</p>
          </div>
        </div>
        <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          Live Check
        </span>
      </div>

      <div className="p-3 sm:p-4 space-y-2.5">
        {materials.map((m) => (
          <div key={m.name} className="flex items-center justify-between p-3 rounded-2xl bg-card/60 hover:bg-card border border-border/60 hover:border-gold-500/30 transition-colors">
            <div className="flex items-center space-x-3 min-w-0">
              <div className={cn(
                "p-2 rounded-xl shrink-0 border",
                m.status === "OK" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                m.status === "LOW" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
              )}>
                {m.status === "OK" ? <CheckCircle2 className="w-4 h-4" /> :
                 m.status === "LOW" ? <AlertTriangle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-foreground truncate">{m.name}</p>
                <p className="text-[10px] text-muted-foreground">Depot: {m.warehouse}</p>
              </div>
            </div>

            <div className="text-right shrink-0 pl-2">
              <p className="font-extrabold text-xs text-foreground font-mono">{m.available} / {m.required}</p>
              <p className={cn(
                "text-[9px] font-extrabold uppercase tracking-wider",
                m.status === "OK" ? "text-emerald-500" :
                m.status === "LOW" ? "text-amber-500" : "text-rose-500"
              )}>
                {m.status === "OK" ? "Sufficient" : m.status === "LOW" ? "Low Buffer" : "Critical"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
