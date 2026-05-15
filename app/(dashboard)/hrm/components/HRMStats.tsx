"use client";

import { 
  Users, UserCheck, UserMinus, CalendarDays, TrendingUp, TrendingDown, Activity
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function HRMStats() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      <PremiumHRCard 
        title="Total Workforce" 
        value="156" 
        change="+12%" 
        trend="up" 
        icon={Users}
        color="blue"
      />
      <PremiumHRCard 
        title="Active Deployment" 
        value="142" 
        change="+2%" 
        trend="up" 
        icon={UserCheck}
        color="emerald"
      />
      <PremiumHRCard 
        title="On Leave Today" 
        value="8" 
        change="-15%" 
        trend="down" 
        icon={CalendarDays}
        color="amber"
      />
      <PremiumHRCard 
        title="New Recruits" 
        value="5" 
        change="+25%" 
        trend="up" 
        icon={Activity}
        color="indigo"
      />
    </div>
  );
}

function PremiumHRCard({ title, value, change, trend, icon: Icon, color }: any) {
  const colorMap: any = {
    blue: "bg-blue-600 shadow-blue-600/20",
    emerald: "bg-emerald-500 shadow-emerald-500/20",
    amber: "bg-amber-500 shadow-amber-500/20",
    indigo: "bg-indigo-600 shadow-indigo-600/20",
  };

  const trendBgMap: any = {
    up: "bg-emerald-50 text-emerald-600",
    down: "bg-rose-50 text-rose-500",
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[40px] p-8 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-2xl transition-all group relative overflow-hidden h-full">
       <div className={cn(
         "absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700",
         color === "blue" ? "bg-blue-600/10" : color === "emerald" ? "bg-emerald-500/10" : color === "amber" ? "bg-amber-500/10" : "bg-indigo-600/10"
       )} />
       
       <div className="flex justify-between items-start mb-6">
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110",
            colorMap[color]
          )}>
             <Icon className="w-7 h-7 text-white" />
          </div>
          <div className={cn(
            "flex items-center px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
            trendBgMap[trend]
          )}>
             {trend === "up" ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
             {change}
          </div>
       </div>
       
       <div className="space-y-1">
          <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h4>
          <p className="text-4xl font-black italic tracking-tighter text-slate-900 dark:text-white leading-none">{value}</p>
       </div>
    </div>
  );
}
