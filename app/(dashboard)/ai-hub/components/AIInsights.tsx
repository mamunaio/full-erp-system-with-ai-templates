"use client";

import { 
  Lightbulb, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Target,
  Zap,
  Activity,
  ShieldCheck,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AIInsights() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Primary Strategic Insights */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InsightCard 
                type="opportunity" 
                title="Revenue Expansion" 
                desc="Based on Q2 data, shifting focus to 'SaaS Subscriptions' could increase net margin by 12.4%." 
                impact="High"
                score="+12.4%"
              />
              <InsightCard 
                type="risk" 
                title="Burn Rate Alert" 
                desc="Operating expenses are 5% above forecast. Recommendation: Optimize cloud infrastructure costs." 
                impact="Medium"
                score="-5.2%"
              />
           </div>

           {/* Detailed Insights Section */}
           <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between mb-8 relative z-10">
                 <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase">Operational Analysis</h3>
                 <BarChart3 className="w-6 h-6 text-blue-600" />
              </div>
              <div className="space-y-6 relative z-10">
                 <AnalysisItem 
                    title="Employee Efficiency" 
                    desc="Strategy Team Alpha is performing at 110% capacity. Burnout risk is moderate." 
                    status="Steady" 
                    color="text-emerald-500"
                 />
                 <AnalysisItem 
                    title="Inventory Turnover" 
                    desc="Z690 Motherboards are moving 30% faster than average. Consider increasing reorder point." 
                    status="Increasing" 
                    color="text-blue-500"
                 />
                 <AnalysisItem 
                    title="Cash Flow Velocity" 
                    desc="Average DSO (Days Sales Outstanding) has dropped to 22 days. Best in class performance." 
                    status="Optimal" 
                    color="text-indigo-500"
                 />
              </div>
           </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
           <div className="bg-slate-950 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group border border-blue-500/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <div className="flex flex-col items-center text-center space-y-4">
                 <div className="w-20 h-20 rounded-full border-4 border-blue-600/30 flex items-center justify-center relative">
                    <svg className="w-18 h-18 -rotate-90">
                       <circle cx="36" cy="36" r="32" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                       <circle cx="36" cy="36" r="32" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray="201" strokeDashoffset="30" className="text-blue-500" strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-2xl font-black italic">85</span>
                 </div>
                 <div>
                    <h4 className="text-sm font-black uppercase tracking-[0.2em] mb-1">Business Health</h4>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Calculated by AI Engine</p>
                 </div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                 <p className="text-xs text-slate-400 leading-relaxed italic">"Overall business health is excellent. Focus on stabilizing operating expenses to reach 90+ score next month."</p>
                 <Button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl h-12 uppercase tracking-widest text-[10px]">Generate Full Audit</Button>
              </div>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6">AI Recommendations</h4>
              <div className="space-y-4">
                 <RecommendationItem icon={Target} title="Expand Sales Team" />
                 <RecommendationItem icon={Zap} title="Automate Invoicing" />
                 <RecommendationItem icon={ShieldCheck} title="Credit Limit Review" />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function InsightCard({ type, title, desc, impact, score }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm group hover:shadow-xl transition-all duration-500 relative overflow-hidden">
      <div className={cn(
        "absolute top-0 left-0 w-full h-1",
        type === "opportunity" ? "bg-emerald-500" : "bg-rose-500"
      )} />
      <div className="flex justify-between items-start mb-6">
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center",
          type === "opportunity" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
        )}>
          {type === "opportunity" ? <TrendingUp className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
        </div>
        <span className={cn(
          "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
          type === "opportunity" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
        )}>
          {impact} Impact
        </span>
      </div>
      <h4 className="text-xl font-black italic tracking-tight uppercase mb-2">{title}</h4>
      <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">{desc}</p>
      <div className="flex items-center text-2xl font-black italic tracking-tighter">
        {score}
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-3 not-italic">Forecasted Change</span>
      </div>
    </div>
  );
}

function AnalysisItem({ title, desc, status, color }: any) {
  return (
    <div className="flex items-start space-x-6 p-4 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer group">
      <div className="w-2 h-12 rounded-full bg-slate-100 dark:bg-slate-800 group-hover:bg-blue-600 transition-all shrink-0" />
      <div className="flex-1">
         <div className="flex justify-between items-center mb-1">
            <h4 className="font-black text-sm uppercase tracking-tight text-slate-900 dark:text-white">{title}</h4>
            <span className={cn("text-[10px] font-black uppercase tracking-widest", color)}>{status}</span>
         </div>
         <p className="text-xs text-slate-500 font-medium leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function RecommendationItem({ icon: Icon, title }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group cursor-pointer border border-transparent hover:border-blue-100">
       <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-600 shadow-sm">
             <Icon className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-black uppercase tracking-tight text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">{title}</span>
       </div>
       <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
    </div>
  );
}
