import { Metadata } from "next";
import AnalyticsHeader from "./components/AnalyticsHeader";
import KPIGrid from "./components/KPIGrid";
import ChartCard from "./components/ChartCard";
import { 
  Sparkles, Download, Calendar, 
  BarChart3, TrendingUp, PieChart 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Analytics Overview | Injaazh ERP",
};

export default function AnalyticsOverview() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Business Intelligence
          </h1>
          <p className="text-slate-500 text-sm">
            Centralized data insights across all Injaazh ERP modules.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-slate-200">
            <Calendar className="w-5 h-5 mr-2" /> This Month
          </Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
            <Download className="w-5 h-5 mr-2" /> Export Global Report
          </Button>
        </div>
      </div>

      {/* AI Highlights Banner */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-800 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-3 gap-12 items-center">
           <div className="md:col-span-2 space-y-6">
              <div className="flex items-center space-x-3 text-injaazh-400 font-bold uppercase tracking-widest text-xs">
                 <Sparkles className="w-5 h-5" /> AI Executive Summary
              </div>
              <h2 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
                 Performance is <span className="text-injaazh-400">Excellent</span> This Quarter
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="flex items-start space-x-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-injaazh-400 mt-2 shrink-0" />
                    <p className="text-sm text-slate-400 leading-relaxed">Revenue is up <span className="text-white font-bold">18%</span> month-over-month, primarily driven by the Meta Corp project delivery.</p>
                 </div>
                 <div className="flex items-start space-x-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-injaazh-400 mt-2 shrink-0" />
                    <p className="text-sm text-slate-400 leading-relaxed">Profit margin has stabilized at <span className="text-white font-bold">34%</span>, despite a 5% increase in operational expenses.</p>
                 </div>
              </div>
           </div>
           <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 border border-white/10 text-center space-y-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Global Health Score</p>
              <div className="text-6xl font-black italic tracking-tighter text-injaazh-400">92</div>
              <Button variant="ghost" className="text-xs font-bold text-injaazh-400 hover:text-white transition-colors">Generate Narrative Report →</Button>
           </div>
        </div>
        <div className="absolute left-[-10%] bottom-[-20%] w-[500px] h-[500px] bg-injaazh-600/10 rounded-full blur-[120px]" />
      </div>

      <KPIGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ChartCard title="Revenue vs Expenses" subtitle="Financial Trend (Last 6 Months)">
           <div className="h-full w-full flex items-end justify-between px-4 pb-4">
              {[40, 60, 45, 80, 55, 90].map((h, i) => (
                <div key={i} className="flex flex-col items-center space-y-2 group w-full px-2">
                   <div className="w-full flex space-x-1 justify-center items-end h-[200px]">
                      <div className="w-4 bg-injaazh-600 rounded-t-lg transition-all duration-700" style={{ height: `${h}%` }} />
                      <div className="w-4 bg-slate-200 dark:bg-slate-800 rounded-t-lg transition-all duration-700" style={{ height: `${h * 0.6}%` }} />
                   </div>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Month {i+1}</span>
                </div>
              ))}
           </div>
        </ChartCard>

        <ChartCard title="Sales by Category" subtitle="Market Share Distribution">
           <div className="h-full w-full flex items-center justify-center relative">
              <div className="w-48 h-48 rounded-full border-[24px] border-slate-100 dark:border-slate-800 flex items-center justify-center">
                 <div className="text-center">
                    <p className="text-2xl font-black italic tracking-tighter">100%</p>
                    <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Total Market</p>
                 </div>
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-[24px] border-injaazh-600 border-t-transparent border-r-transparent rotate-45" />
              <div className="absolute right-10 space-y-3">
                 <LegendItem color="bg-injaazh-600" label="SaaS" value="45%" />
                 <AlertItem color="bg-blue-400" label="Services" value="30%" />
                 <AlertItem color="bg-emerald-400" label="Hardware" value="25%" />
              </div>
           </div>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         <ChartCard title="Headcount Trend" subtitle="Employee Growth" className="lg:col-span-2">
            <div className="h-full w-full p-4 relative">
               <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40">
                  <path 
                     d="M 0 35 Q 25 30, 50 15 T 100 10" 
                     fill="none" 
                     stroke="#0d8ee9" 
                     strokeWidth="0.5" 
                     className="animate-draw"
                  />
                  <path 
                     d="M 0 40 Q 25 35, 50 20 T 100 15 L 100 40 L 0 40 Z" 
                     fill="url(#grad)" 
                     className="opacity-10"
                  />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor: "#0d8ee9", stopOpacity: 1}} />
                      <stop offset="100%" style={{stopColor: "#0d8ee9", stopOpacity: 0}} />
                    </linearGradient>
                  </defs>
               </svg>
            </div>
         </ChartCard>

         <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm space-y-6">
            <h3 className="font-bold flex items-center"><BarChart3 className="w-5 h-5 mr-2 text-injaazh-600" /> Key Insights</h3>
            <div className="space-y-6">
               <InsightItem title="Inventory Turnover" value="5.2x" status="Healthy" color="emerald" />
               <InsightItem title="Attrition Rate" value="4.1%" status="Warning" color="amber" />
               <InsightItem title="Customer Acquisition" value="$125.00" status="Excellent" color="injaazh" />
            </div>
            <Button className="w-full bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white rounded-xl h-12 font-bold hover:bg-slate-100 transition-colors">Analyze Full Data</Button>
         </div>
      </div>
    </div>
  );
}

function LegendItem({ color, label, value }: any) {
  return (
    <div className="flex items-center space-x-3">
       <div className={cn("w-3 h-3 rounded-full", color)} />
       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
       <span className="text-xs font-black">{value}</span>
    </div>
  );
}

function AlertItem({ color, label, value }: any) {
  return (
    <div className="flex items-center space-x-3">
       <div className={cn("w-3 h-3 rounded-full", color)} />
       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
       <span className="text-xs font-black">{value}</span>
    </div>
  );
}

function InsightItem({ title, value, status, color }: any) {
  return (
    <div className="space-y-1.5">
       <div className="flex justify-between items-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{title}</p>
          <span className={cn(
             "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider",
             color === "emerald" ? "bg-emerald-100 text-emerald-600" :
             color === "amber" ? "bg-amber-100 text-amber-600" : "bg-injaazh-100 text-injaazh-600"
          )}>{status}</span>
       </div>
       <p className="text-2xl font-black italic tracking-tighter">{value}</p>
    </div>
  );
}
