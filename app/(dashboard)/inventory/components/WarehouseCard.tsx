"use client";

import { MapPin, User, Package, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export default function WarehouseCard({ name, location, manager, products, value, utilization }: any) {
  return (
    <div className="glass rounded-3xl border border-border/80 p-5 sm:p-6 shadow-md hover:border-gold-500/30 transition-all group space-y-4">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Database className="w-5 h-5" />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Utilization</p>
          <p className={cn(
            "text-base font-extrabold font-heading",
            utilization > 80 ? "text-amber-500" : utilization > 50 ? "text-blue-500" : "text-emerald-500"
          )}>{utilization}%</p>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h3 className="text-base font-bold text-foreground font-heading">{name}</h3>
          <div className="flex items-center text-xs text-muted-foreground mt-0.5">
            <MapPin className="w-3 h-3 mr-1 text-gold-500" /> {location}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Products</p>
            <p className="text-xs font-bold text-foreground mt-0.5">{products}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Value</p>
            <p className="text-xs font-bold gold-text font-heading mt-0.5">${value.toLocaleString()}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-1 border-t border-border/40 text-xs text-muted-foreground">
          <div className="w-5 h-5 rounded-full gold-gradient flex items-center justify-center text-[9px] font-extrabold text-obsidian-950 shrink-0">
            {manager ? manager[0] : "M"}
          </div>
          <span className="truncate font-semibold">{manager}</span>
        </div>
      </div>
    </div>
  );
}
