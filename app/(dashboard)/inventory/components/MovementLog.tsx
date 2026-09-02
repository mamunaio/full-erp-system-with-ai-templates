"use client";

import { 
  ArrowUpRight, ArrowDownLeft, RefreshCcw, 
  Settings2, FileDown 
} from "lucide-react";
import { cn } from "@/lib/utils";

const logs = [
  { id: 1, date: "Today, 10:30 AM", product: "Cisco 48-Port Switch Arrays", sku: "SKU-NET-001", type: "PURCHASE", qty: 25, warehouse: "Central HQ", ref: "PO-1042" },
  { id: 2, date: "Today, 02:15 PM", product: "Dell UltraSharp 32\" 4K", sku: "SKU-MON-002", type: "SALE", qty: -2, warehouse: "Central HQ", ref: "INV-405" },
  { id: 3, date: "Yesterday, 09:00 AM", product: "Cat6 Industrial Cabling", sku: "SKU-CAB-003", type: "ADJUSTMENT", qty: 50, warehouse: "Chittagong Port", ref: "ADJ-09" },
  { id: 4, date: "Yesterday, 04:30 PM", product: "Apple MacBook Pro M3 Max", sku: "SKU-MBP-004", type: "TRANSFER", qty: -5, warehouse: "Gazipur Depot", ref: "TR-22" },
];

export default function MovementLog() {
  return (
    <div className="glass rounded-3xl border border-border/80 shadow-xl overflow-hidden">
      <div className="p-5 border-b border-border/60 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-foreground font-heading">Stock Movement & Audit Stream</h3>
          <p className="text-xs text-muted-foreground">Live inventory receipts, sales dispatches, and warehouse transfers</p>
        </div>
        <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          Realtime Audit
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-card/60 text-muted-foreground font-extrabold uppercase tracking-wider text-[10px] border-b border-border/60">
              <th className="p-4">Reference & Date</th>
              <th className="p-4">Product & SKU</th>
              <th className="p-4">Movement Type</th>
              <th className="p-4 text-center">Quantity</th>
              <th className="p-4">Warehouse</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-accent/40 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-foreground font-mono">{log.ref}</p>
                  <p className="text-[10px] text-muted-foreground">{log.date}</p>
                </td>
                <td className="p-4">
                  <p className="font-bold text-foreground">{log.product}</p>
                  <p className="text-[10px] text-muted-foreground font-mono">{log.sku}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center">
                    {log.type === "PURCHASE" ? <ArrowDownLeft className="w-3.5 h-3.5 text-emerald-500 mr-1.5" /> :
                     log.type === "SALE" ? <ArrowUpRight className="w-3.5 h-3.5 text-rose-500 mr-1.5" /> :
                     log.type === "TRANSFER" ? <RefreshCcw className="w-3.5 h-3.5 text-blue-500 mr-1.5" /> :
                     <Settings2 className="w-3.5 h-3.5 text-amber-500 mr-1.5" />}
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-muted-foreground">{log.type}</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className={cn(
                    "font-extrabold px-2.5 py-0.5 rounded-full text-xs border",
                    log.qty > 0 ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" : "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20"
                  )}>
                    {log.qty > 0 ? "+" : ""}{log.qty}
                  </span>
                </td>
                <td className="p-4 text-muted-foreground font-medium">{log.warehouse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
