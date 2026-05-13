"use client";

import { 
  TrendingUp, TrendingDown, DollarSign, 
  Users, ShoppingBag, Box 
} from "lucide-react";
import { cn } from "@/lib/utils";

const kpis = [
  { label: "Total Revenue", value: "$124,500", change: "+12.5%", trend: "up", icon: DollarSign, color: "injaazh" },
  { label: "Net Profit", value: "$42,080", change: "+8.2%", trend: "up", icon: TrendingUp, color: "emerald" },
  { label: "Profit Margin", value: "33.8%", change: "-1.2%", trend: "down", icon: TrendingDown, color: "rose" },
  { label: "Total Orders", value: "842", change: "+18%", trend: "up", icon: ShoppingBag, color: "blue" },
  { label: "Avg Order Value", value: "$147.50", change: "+5%", trend: "up", icon: DollarSign, color: "violet" },
  { label: "Active Employees", value: "124", change: "+2", trend: "up", icon: Users, color: "cyan" },
  { label: "Inventory Value", value: "$856,400", change: "+4.5%", trend: "up", icon: Box, color: "amber" },
  { label: "Low Stock Items", value: "12", change: "-5", trend: "down", icon: Box, color: "rose" },
];

export default function KPIGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {kpis.map((kpi, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all group">
          <div className="flex justify-between items-start mb-4">
            <div className={cn(
              "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
              kpi.color === "injaazh" ? "bg-injaazh-100 text-injaazh-600" :
              kpi.color === "emerald" ? "bg-emerald-100 text-emerald-600" :
              kpi.color === "rose" ? "bg-rose-100 text-rose-600" :
              kpi.color === "blue" ? "bg-blue-100 text-blue-600" :
              kpi.color === "violet" ? "bg-violet-100 text-violet-600" :
              kpi.color === "cyan" ? "bg-cyan-100 text-cyan-600" : "bg-amber-100 text-amber-600"
            )}>
              <kpi.icon className="w-6 h-6" />
            </div>
            <div className={cn(
              "flex items-center text-[10px] font-black uppercase tracking-widest",
              kpi.trend === "up" ? "text-emerald-500" : "text-rose-500"
            )}>
              {kpi.trend === "up" ? "↑" : "↓"} {kpi.change}
            </div>
          </div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{kpi.label}</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white">{kpi.value}</p>
        </div>
      ))}
    </div>
  );
}
