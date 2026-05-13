"use client";

import { FileDown, CheckCircle2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function PayrollTable() {
  const data = [
    { name: "John Doe", id: "EMP-001", basic: 5000, allowance: 1200, deductions: 200, net: 6000, status: "PAID" },
    { name: "Sarah Ahmed", id: "EMP-002", basic: 4500, allowance: 1000, deductions: 150, net: 5350, status: "DRAFT" },
    { name: "Mike Ross", id: "EMP-003", basic: 4800, allowance: 1100, deductions: 180, net: 5720, status: "PAID" },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <th className="p-4 border-b dark:border-slate-800">Employee</th>
              <th className="p-4 border-b dark:border-slate-800">Basic</th>
              <th className="p-4 border-b dark:border-slate-800">Allowance</th>
              <th className="p-4 border-b dark:border-slate-800">Deductions</th>
              <th className="p-4 border-b dark:border-slate-800 font-bold">Net Payout</th>
              <th className="p-4 border-b dark:border-slate-800">Status</th>
              <th className="p-4 border-b dark:border-slate-800 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {data.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-4">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{row.name}</p>
                    <p className="text-[10px] text-slate-500">{row.id}</p>
                  </div>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400">${row.basic}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400 text-emerald-600">+${row.allowance}</td>
                <td className="p-4 text-slate-600 dark:text-slate-400 text-rose-600">-${row.deductions}</td>
                <td className="p-4 font-bold text-slate-900 dark:text-white">${row.net}</td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    row.status === "PAID" ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                  )}>
                    {row.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-injaazh-600">
                      <FileDown className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-emerald-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
