"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, TrendingDown, 
  MoreVertical, LucideIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: LucideIcon;
  color?: string;
  sparkline?: number[];
}

export default function StatCard({ title, value, change, icon: Icon, color, sparkline }: StatCardProps) {
  const isPositive = change && change > 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="glass-card p-6 group"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg",
          color === "emerald" ? "bg-emerald-500/20 text-emerald-400" :
          color === "rose" ? "bg-rose-500/20 text-rose-400" :
          color === "gold" ? "bg-gold-400/20 gold-text" :
          "bg-gold-400/10 text-gold-400"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <button className="text-muted-foreground/50 hover:text-foreground transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-1">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.15em]">{title}</p>
        <h3 className="text-3xl font-bold tracking-tight text-foreground font-heading">
          {value}
        </h3>
      </div>

      {change !== undefined && (
        <div className="mt-4 flex items-center gap-2">
           <div className={cn(
             "flex items-center text-[10px] font-semibold px-2 py-0.5 rounded-md uppercase tracking-wider",
             isPositive ? "bg-emerald-500/15 text-emerald-400" : "bg-rose-500/15 text-rose-400"
           )}>
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {Math.abs(change)}%
           </div>
           <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">vs last month</span>
        </div>
      )}

      {sparkline && (
        <div className="mt-6 h-8 flex items-end gap-[2px]">
           {sparkline.map((v, i) => (
             <div 
              key={i} 
              className={cn(
                "flex-1 rounded-sm transition-all duration-1000",
                isPositive ? "bg-emerald-500/20 group-hover:bg-emerald-500/60" : "bg-rose-500/20 group-hover:bg-rose-500/60"
              )} 
              style={{ height: `${v}%` }} 
             />
           ))}
        </div>
      )}
    </motion.div>
  );
}
