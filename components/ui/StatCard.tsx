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
      className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group"
    >
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg",
          color === "emerald" ? "bg-emerald-100 text-emerald-600 shadow-emerald-500/10" :
          color === "rose" ? "bg-rose-100 text-rose-600 shadow-rose-500/10" :
          color === "blue" ? "bg-blue-100 text-blue-600 shadow-blue-500/10" :
          "bg-injaazh-100 text-injaazh-600 shadow-injaazh-600/10"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <button className="text-slate-300 hover:text-slate-600 transition-colors">
          <MoreVertical className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">{title}</p>
        <h3 className="text-3xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white">
          {value}
        </h3>
      </div>

      {change !== undefined && (
        <div className="mt-4 flex items-center space-x-2">
           <div className={cn(
             "flex items-center text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest",
             isPositive ? "bg-emerald-100 text-emerald-600" : "bg-rose-100 text-rose-600"
           )}>
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {Math.abs(change)}%
           </div>
           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">vs last month</span>
        </div>
      )}

      {sparkline && (
        <div className="mt-6 h-8 flex items-end space-x-1">
           {sparkline.map((v, i) => (
             <div 
              key={i} 
              className={cn(
                "flex-1 rounded-t-sm transition-all duration-1000",
                isPositive ? "bg-emerald-500/20 group-hover:bg-emerald-500" : "bg-rose-500/20 group-hover:bg-rose-500"
              )} 
              style={{ height: `${v}%` }} 
             />
           ))}
        </div>
      )}
    </motion.div>
  );
}
