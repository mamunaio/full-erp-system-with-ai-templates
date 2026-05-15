"use client";

import { useState, useEffect } from "react";
import { 
  Sparkles, 
  Download, 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  PieChart,
  ArrowLeft,
  Activity,
  DollarSign,
  ShoppingCart,
  Users,
  Box,
  AlertCircle,
  ChevronRight,
  MoreVertical,
  Loader2,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

export default function AnalyticsOverview() {
  const [mounted, setMounted] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Global Report Exported!", {
        description: "Your business intelligence PDF is ready.",
      });
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/dashboard" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-blue-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to App Dashboard
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Business <span className="text-blue-600">Intelligence</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Centralized data insights across all Injaazh ERP modules.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-2xl h-12 px-6 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm active:scale-95 transition-all">
            <Calendar className="w-4 h-4 mr-3 text-slate-400" /> This Month
          </Button>
          <Button 
            onClick={handleExport}
            disabled={isExporting}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-12 px-8 font-black shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
          >
            {isExporting ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> EXPORTING...</>
            ) : (
              <><Download className="w-4 h-4 mr-3" /> Export Global Report</>
            )}
          </Button>
        </div>
      </div>

      {/* AI Highlights Banner */}
      <div className="bg-slate-950 rounded-[48px] p-12 text-white shadow-2xl relative overflow-hidden group border border-blue-500/10">
        <div className="relative z-10 grid md:grid-cols-3 gap-16 items-center">
           <div className="md:col-span-2 space-y-8">
              <div className="flex items-center space-x-3 text-blue-400 font-black uppercase tracking-[0.3em] text-xs">
                 <Sparkles className="w-5 h-5" /> AI Executive Summary
              </div>
              <h2 className="text-5xl font-black italic tracking-tighter uppercase leading-none">
                 Performance is <span className="text-blue-500 underline decoration-blue-500/20">Excellent</span> This Quarter
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="flex items-start space-x-5 group/item">
                    <div className="w-1.5 h-10 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)] transition-all group-hover/item:h-12" />
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">Revenue is up <span className="text-white font-black tracking-tight underline decoration-blue-500/40">+18.5%</span> month-over-month, primarily driven by the Meta Corp project delivery.</p>
                 </div>
                 <div className="flex items-start space-x-5 group/item">
                    <div className="w-1.5 h-10 rounded-full bg-emerald-600 transition-all group-hover/item:h-12" />
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">Profit margin has stabilized at <span className="text-white font-black tracking-tight">34.2%</span>, despite a subtle increase in operational expenses.</p>
                 </div>
              </div>
           </div>
           <div className="bg-white/5 backdrop-blur-3xl rounded-[40px] p-10 border border-white/10 text-center space-y-4 shadow-inner relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] relative z-10">Global Health Score</p>
              <div className="text-8xl font-black italic tracking-tighter text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.3)] relative z-10">92</div>
              <Button variant="ghost" className="text-[10px] font-black text-blue-400 hover:text-white transition-all uppercase tracking-widest relative z-10">Generate Narrative Report →</Button>
           </div>
        </div>
        <div className="absolute left-[-10%] bottom-[-20%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
      </div>

      {/* KPI Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard label="Total Revenue" value="$124,500" change="+12.5%" icon={DollarSign} color="text-blue-600" bg="bg-blue-50 dark:bg-blue-900/20" />
        <KPICard label="Net Profit" value="$42,080" change="+8.2%" icon={Activity} color="text-emerald-600" bg="bg-emerald-50 dark:bg-emerald-900/20" />
        <KPICard label="Profit Margin" value="33.8%" change="-1.2%" icon={TrendingUp} color="text-indigo-600" bg="bg-indigo-50 dark:bg-indigo-900/20" />
        <KPICard label="Total Orders" value="842" change="+18%" icon={ShoppingCart} color="text-violet-600" bg="bg-violet-50 dark:bg-violet-900/20" />
        <KPICard label="Avg Order Value" value="$147.50" change="+5%" icon={DollarSign} color="text-sky-600" bg="bg-sky-50 dark:bg-sky-900/20" />
        <KPICard label="Active Employees" value="124" change="+2" icon={Users} color="text-cyan-600" bg="bg-cyan-50 dark:bg-cyan-900/20" />
        <KPICard label="Inventory Value" value="$856,400" change="+4.5%" icon={Box} color="text-amber-600" bg="bg-amber-50 dark:bg-amber-900/20" />
        <KPICard label="Low Stock Items" value="12" change="+5" icon={AlertCircle} color="text-rose-600" bg="bg-rose-50 dark:bg-rose-900/20" isNegative={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Revenue vs Expenses Chart */}
        <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm group">
           <div className="flex items-center justify-between mb-12">
              <div>
                 <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase">Revenue vs Expenses</h3>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Financial Trend (Last 6 Months)</p>
              </div>
              <div className="flex items-center space-x-6">
                 <div className="flex items-center space-x-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-600" /><span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Revenue</span></div>
                 <div className="flex items-center space-x-2"><div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800" /><span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Expenses</span></div>
              </div>
           </div>
           <div className="h-[300px] flex items-end justify-between px-4 pb-6 border-b border-slate-50 dark:border-slate-800">
              {[45, 65, 50, 85, 60, 95].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center group/bar max-w-[80px]">
                   <div className="w-full flex space-x-1.5 justify-center items-end h-[220px]">
                      <div className="w-4 bg-blue-600 rounded-t-xl transition-all duration-1000 group-hover/bar:bg-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.2)]" style={{ height: `${h}%` }} />
                      <div className="w-4 bg-slate-100 dark:bg-slate-800 rounded-t-xl transition-all duration-1000" style={{ height: `${h * 0.6}%` }} />
                   </div>
                   <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-4">Mon {i+1}</span>
                </div>
              ))}
           </div>
           <Button variant="ghost" className="w-full mt-6 text-[10px] font-black text-blue-600 uppercase tracking-widest">View Detailed Ledger <ChevronRight className="w-3 h-3 ml-2" /></Button>
        </div>

        {/* Sales by Category */}
        <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm relative overflow-hidden">
           <div className="flex justify-between items-start mb-12">
              <div>
                 <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase">Sales by Category</h3>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Market Share Distribution</p>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full"><MoreVertical className="w-5 h-5 text-slate-300" /></Button>
           </div>
           <div className="flex flex-col md:flex-row items-center justify-around gap-12 pt-4">
              <div className="relative">
                 <div className="w-48 h-48 rounded-full border-[24px] border-slate-50 dark:border-slate-800 flex items-center justify-center">
                    <div className="text-center">
                       <p className="text-4xl font-black italic tracking-tighter">100%</p>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Market</p>
                    </div>
                 </div>
                 <svg className="absolute inset-0 w-48 h-48 -rotate-90">
                    <circle cx="96" cy="96" r="72" fill="transparent" stroke="currentColor" strokeWidth="24" strokeDasharray="452" strokeDashoffset="120" className="text-blue-600 drop-shadow-[0_0_10px_rgba(37,99,235,0.3)]" strokeLinecap="round" />
                 </svg>
              </div>
              <div className="space-y-6">
                 <LegendItem color="bg-blue-600" label="SaaS Software" value="45%" sub="+$12k growth" />
                 <LegendItem color="bg-sky-400" label="Digital Services" value="30%" sub="+8% increase" />
                 <LegendItem color="bg-emerald-400" label="Hard Hardware" value="25%" sub="Stable yield" />
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Headcount Trend */}
         <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm relative group overflow-hidden">
            <div className="flex items-center justify-between mb-12">
               <div>
                  <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase">Headcount Trend</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Workforce Expansion Index</p>
               </div>
               <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2"><div className="w-2 h-2 rounded-full bg-blue-600" /><span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Active</span></div>
               </div>
            </div>
            <div className="h-[250px] w-full p-4 relative">
               <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M 0 35 Q 25 30, 50 15 T 100 5 L 100 40 L 0 40 Z" fill="url(#areaGrad)" />
                  <path d="M 0 35 Q 25 30, 50 15 T 100 5" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" className="animate-draw" />
                  {/* Highlight dots */}
                  <circle cx="50" cy="15" r="2.5" fill="#2563eb" className="animate-pulse" />
                  <circle cx="100" cy="5" r="2.5" fill="#2563eb" />
               </svg>
            </div>
            <div className="flex justify-between px-4 mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
               <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span><span>Nov</span>
            </div>
         </div>

         {/* Insights & Actions */}
         <div className="bg-slate-50 dark:bg-slate-950 rounded-[48px] border border-slate-100 dark:border-slate-900 p-10 shadow-inner flex flex-col justify-between">
            <div className="space-y-8">
               <div className="flex items-center justify-between">
                  <h3 className="text-xl font-black tracking-tight italic uppercase">Key Insights</h3>
                  <FileText className="w-5 h-5 text-blue-600" />
               </div>
               <div className="space-y-8">
                  <InsightRow title="Inventory Turnover" value="5.2x" status="Healthy" color="emerald" trend="+0.4" />
                  <InsightRow title="Attrition Rate" value="4.1%" status="Warning" color="amber" trend="+0.8" isWarning />
                  <InsightRow title="Customer Acquisition" value="$125.00" status="Excellent" color="blue" trend="-$12" isPositive />
               </div>
            </div>
            <Button className="w-full mt-10 bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-[24px] h-16 font-black italic uppercase tracking-tighter hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800">
               Analyze Full Dataset
            </Button>
         </div>
      </div>
    </div>
  );
}

function KPICard({ label, value, change, icon: Icon, color, bg, isNegative }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm group hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", bg)}>
          <Icon className={cn("w-7 h-7", color)} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">{value}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
         <div className={cn("flex items-center text-[10px] font-black px-2.5 py-1 rounded-full", 
           isNegative ? "text-rose-600 bg-rose-50" : "text-emerald-600 bg-emerald-50"
         )}>
            {change}
         </div>
         <div className="w-20 h-1.5 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full", color.replace("text-", "bg-"))} style={{ width: '70%' }} />
         </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label, value, sub }: any) {
  return (
    <div className="flex items-center space-x-4 group cursor-pointer">
       <div className={cn("w-4 h-4 rounded-full shadow-lg", color)} />
       <div>
          <div className="flex items-center space-x-2">
             <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{label}</span>
             <span className="text-sm font-black text-blue-600">{value}</span>
          </div>
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{sub}</p>
       </div>
    </div>
  );
}

function InsightRow({ title, value, status, color, trend, isWarning, isPositive }: any) {
  return (
    <div className="space-y-2 group">
       <div className="flex justify-between items-center">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
          <span className={cn(
             "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border",
             color === "emerald" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
             color === "amber" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-blue-50 text-blue-600 border-blue-100"
          )}>{status}</span>
       </div>
       <div className="flex items-end justify-between">
          <p className="text-3xl font-black italic tracking-tighter uppercase leading-none">{value}</p>
          <span className={cn("text-[9px] font-black", isWarning ? "text-rose-500" : isPositive ? "text-emerald-500" : "text-slate-400")}>
            {trend} trend
          </span>
       </div>
    </div>
  );
}
