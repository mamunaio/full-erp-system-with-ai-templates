"use client";

import { MapPin, User, Package, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WarehouseCard({ name, location, manager, products, value, utilization }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-md transition-all group">
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-injaazh-50 dark:bg-injaazh-950 flex items-center justify-center text-injaazh-600 group-hover:scale-110 transition-transform">
          <Database className="w-6 h-6" />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Utilization</p>
          <p className={cn(
            "text-lg font-black",
            utilization > 80 ? "text-rose-500" : utilization > 50 ? "text-amber-500" : "text-emerald-500"
          )}>{utilization}%</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">{name}</h3>
          <div className="flex items-center text-xs text-slate-400 mt-1">
            <MapPin className="w-3 h-3 mr-1.5" /> {location}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50 dark:border-slate-800">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Products</p>
            <p className="text-sm font-bold mt-1">{products}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Value</p>
            <p className="text-sm font-bold mt-1">${value.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold shrink-0">
            {manager[0]}
          </div>
          <span className="text-xs text-slate-500 font-medium">{manager}</span>
        </div>
      </div>
    </div>
  );
}
