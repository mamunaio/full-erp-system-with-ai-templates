"use client";

import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MaterialAvailability() {
  const materials = [
    { name: "Intel i9 Processor", required: 50, available: 120, status: "OK" },
    { name: "Z690 Motherboard", required: 50, available: 45, status: "LOW" },
    { name: "32GB DDR5 RAM", required: 100, available: 200, status: "OK" },
    { name: "Chassis Tower X", required: 50, available: 0, status: "OUT" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50">
        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Material Inventory Check</h3>
      </div>
      <div className="p-4 space-y-4">
        {materials.map((m) => (
          <div key={m.name} className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            <div className="flex items-center space-x-3">
              <div className={cn(
                "p-2 rounded-xl",
                m.status === "OK" ? "bg-emerald-50 text-emerald-600" :
                m.status === "LOW" ? "bg-amber-50 text-amber-600" : "bg-rose-50 text-rose-600"
              )}>
                {m.status === "OK" ? <CheckCircle2 className="w-5 h-5" /> :
                 m.status === "LOW" ? <AlertTriangle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-bold text-sm">{m.name}</p>
                <p className="text-[10px] text-slate-400">Warehouse: Main Hub</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">{m.available} / {m.required}</p>
              <p className={cn(
                "text-[10px] font-bold",
                m.status === "OK" ? "text-emerald-500" :
                m.status === "LOW" ? "text-amber-500" : "text-rose-500"
              )}>
                {m.status === "OK" ? "Sufficient" : m.status === "LOW" ? "Shortage" : "Out of Stock"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
