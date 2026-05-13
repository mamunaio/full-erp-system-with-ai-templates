import { Metadata } from "next";
import ManufacturingStats from "./components/ManufacturingStats";
import ProductionChart from "./components/ProductionChart";
import { 
  Sparkles, AlertCircle, Plus, 
  Settings2, Activity, Zap 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Manufacturing Dashboard | Injaazh ERP",
};

export default function ManufacturingDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Manufacturing & Production
          </h1>
          <p className="text-slate-500 text-sm">
            Monitor real-time production efficiency, work orders and BOMs.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-slate-200">
            <Settings2 className="w-5 h-5 mr-2" /> Production Settings
          </Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
            <Plus className="w-5 h-5 mr-2" /> New Work Order
          </Button>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="bg-gradient-to-tr from-slate-900 to-slate-800 rounded-[32px] p-6 text-white shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
           <div className="flex items-center space-x-6">
              <div className="w-14 h-14 rounded-2xl bg-injaazh-600/20 backdrop-blur-xl border border-injaazh-500/30 flex items-center justify-center text-injaazh-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs font-bold text-injaazh-400 uppercase tracking-widest mb-1">AI Production Analysis</p>
                <h3 className="text-lg font-bold">
                  Optimization Alert: Work Order <span className="text-injaazh-400">#WO-045</span> 
                </h3>
                <p className="text-slate-400 text-sm">Raw Material "X570 Motherboard" will run out in 3 days. Recommend generating a Purchase Order now.</p>
              </div>
           </div>
           <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-8 shrink-0">
             Create Purchase Order
           </Button>
        </div>
        <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-injaazh-600/10 rounded-full blur-[120px]" />
      </div>

      <ManufacturingStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-bold flex items-center"><Activity className="w-5 h-5 mr-2 text-injaazh-600" /> Production Output</h3>
                <div className="flex items-center space-x-2">
                   <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded-full bg-injaazh-600" /><span className="text-xs text-slate-500">Actual</span></div>
                   <div className="flex items-center space-x-1.5"><div className="w-3 h-3 rounded-full bg-slate-200" /><span className="text-xs text-slate-500">Planned</span></div>
                </div>
              </div>
              <div className="h-[300px] flex items-end justify-between px-4">
                 {[40, 60, 80, 50, 90, 70, 85].map((h, i) => (
                   <div key={i} className="w-12 bg-slate-50 dark:bg-slate-800 rounded-t-xl relative group">
                      <div className="absolute bottom-0 left-0 w-full bg-injaazh-600 rounded-t-xl transition-all duration-1000" style={{ height: `${h}%` }} />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">Day {i+1}</div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h3 className="font-bold mb-6 flex items-center"><AlertCircle className="w-5 h-5 mr-2 text-rose-500" /> Production Alerts</h3>
              <div className="space-y-4">
                 <AlertItem 
                    color="rose" 
                    title="Material Shortage" 
                    desc="Z690 Motherboard low for WO-102" 
                    time="2h ago" 
                 />
                 <AlertItem 
                    color="amber" 
                    title="Work Order Delayed" 
                    desc="#WO-098 is 24h past start date" 
                    time="5h ago" 
                 />
                 <AlertItem 
                    color="emerald" 
                    title="Production Complete" 
                    desc="#WO-101 finished successfully" 
                    time="10m ago" 
                 />
              </div>
           </div>

           <div className="bg-injaazh-600 rounded-[32px] p-8 text-white shadow-xl shadow-injaazh-600/20">
              <Zap className="w-10 h-10 mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">Efficiency Boost</h3>
              <p className="text-injaazh-100 text-sm leading-relaxed">Your production line B is currently at 98% efficiency. Replicating its setup for line C could increase monthly output by 12%.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

function AlertItem({ color, title, desc, time }: any) {
  const colors: any = {
    rose: "bg-rose-100 text-rose-600 border-rose-200",
    amber: "bg-amber-100 text-amber-600 border-amber-200",
    emerald: "bg-emerald-100 text-emerald-600 border-emerald-200"
  };

  return (
    <div className="flex items-start space-x-4">
      <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", 
        color === "rose" ? "bg-rose-500" : color === "amber" ? "bg-amber-500" : "bg-emerald-500"
      )} />
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-xs font-bold text-slate-900 dark:text-white">{title}</p>
          <span className="text-[10px] text-slate-400">{time}</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
