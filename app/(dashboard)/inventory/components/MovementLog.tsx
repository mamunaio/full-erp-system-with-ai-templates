"use client";

import { 
  ArrowUpRight, ArrowDownLeft, RefreshCcw, 
  Settings2, FileDown 
} from "lucide-react";
import { cn } from "@/lib/utils";

const logs = [
  { id: 1, date: "May 12, 10:30 AM", product: "Cisco Switch", sku: "SKU-001", type: "PURCHASE", qty: 25, warehouse: "Main", ref: "PO-102" },
  { id: 2, date: "May 12, 02:15 PM", product: "Dell Latitude", sku: "SKU-002", type: "SALE", qty: -2, warehouse: "Main", ref: "INV-405" },
  { id: 3, date: "May 11, 09:00 AM", product: "Cat6 Cable", sku: "SKU-003", type: "ADJUSTMENT", qty: 50, warehouse: "Sub-01", ref: "ADJ-09" },
  { id: 4, date: "May 10, 04:30 PM", product: "HP LaserJet", sku: "SKU-004", type: "TRANSFER", qty: -5, warehouse: "Main", ref: "TR-22" },
];

export default function MovementLog() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <th className="p-4 border-b dark:border-slate-800">Date & Reference</th>
              <th className="p-4 border-b dark:border-slate-800">Product</th>
              <th className="p-4 border-b dark:border-slate-800">Type</th>
              <th className="p-4 border-b dark:border-slate-800 text-center">Quantity</th>
              <th className="p-4 border-b dark:border-slate-800">Warehouse</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-4">
                  <p className="font-bold text-slate-900 dark:text-white">{log.ref}</p>
                  <p className="text-[10px] text-slate-400">{log.date}</p>
                </td>
                <td className="p-4">
                  <p className="font-medium">{log.product}</p>
                  <p className="text-[10px] text-slate-400 font-mono">{log.sku}</p>
                </td>
                <td className="p-4">
                  <div className="flex items-center">
                    {log.type === "PURCHASE" ? <ArrowDownLeft className="w-3 h-3 text-emerald-500 mr-2" /> :
                     log.type === "SALE" ? <ArrowUpRight className="w-3 h-3 text-rose-500 mr-2" /> :
                     log.type === "TRANSFER" ? <RefreshCcw className="w-3 h-3 text-blue-500 mr-2" /> :
                     <Settings2 className="w-3 h-3 text-amber-500 mr-2" />}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{log.type}</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <span className={cn(
                    "font-bold px-2 py-0.5 rounded text-xs",
                    log.qty > 0 ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                  )}>
                    {log.qty > 0 ? "+" : ""}{log.qty}
                  </span>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">{log.warehouse}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
