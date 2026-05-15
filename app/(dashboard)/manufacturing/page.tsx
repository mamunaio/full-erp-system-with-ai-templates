"use client";

import { useState, useEffect } from "react";
import { 
  Sparkles, 
  AlertCircle, 
  Plus, 
  Settings2, 
  Activity, 
  Zap,
  ArrowLeft,
  Factory,
  Package,
  CheckCircle2,
  Clock,
  TrendingUp,
  BarChart3,
  MoreVertical,
  ChevronRight,
  ShieldCheck,
  Cpu,
  Loader2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ManufacturingDashboard() {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreateWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      toast.success("New Work Order Created!", {
        description: "Assigned to Production Line Alpha-01",
      });
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/dashboard" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-blue-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to App Dashboard
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Manufacturing & <span className="text-blue-600">Production</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Monitor real-time production efficiency, work orders and BOMs.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/manufacturing/settings">
            <Button variant="outline" className="rounded-2xl h-14 px-8 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm active:scale-95 transition-all">
              <Settings2 className="w-5 h-5 mr-3 text-slate-400" /> Production Settings
            </Button>
          </Link>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5 mr-3" /> New Work Order
          </Button>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="bg-slate-950 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
           <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-[24px] bg-blue-600/20 backdrop-blur-xl border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-1 opacity-80">AI Production Analysis</p>
                <h3 className="text-xl font-black tracking-tight">
                  Optimization Alert: Work Order <span className="text-blue-400 underline decoration-blue-400/30">#WO-045</span> 
                </h3>
                <p className="text-slate-400 text-sm font-medium mt-1">Raw Material <span className="text-slate-200 font-bold">"X570 Motherboard"</span> will run out in 3 days. Recommend generating a Purchase Order now.</p>
              </div>
           </div>
           <Link href="/inventory/purchase/new">
             <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-blue-600/20 shrink-0 active:scale-95 transition-all">
               Create Purchase Order
             </Button>
           </Link>
        </div>
        <div className="absolute top-[-50%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* Production Stats */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ManufacturingStatsCard label="Active Work Orders" value="12" change="+2" icon={Factory} color="text-blue-600" bg="bg-blue-50 dark:bg-blue-900/20" />
        <ManufacturingStatsCard label="Completed (Month)" value="45" change="+18%" icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50 dark:bg-emerald-900/20" />
        <ManufacturingStatsCard label="Line Efficiency" value="94.2%" change="+1.5%" icon={Activity} color="text-indigo-600" bg="bg-indigo-50 dark:bg-indigo-900/20" />
        <ManufacturingStatsCard label="Material Alerts" value="3" change="Critical" icon={AlertCircle} color="text-rose-600" bg="bg-rose-50 dark:bg-rose-900/20" isAlert={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           {/* Production Output Chart Simulation */}
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-10">
                <div>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Production Output</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Weekly performance orchestration</p>
                </div>
                <div className="flex items-center space-x-6">
                   <div className="flex items-center space-x-2"><div className="w-2.5 h-2.5 rounded-full bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.4)]" /><span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Actual</span></div>
                   <div className="flex items-center space-x-2"><div className="w-2.5 h-2.5 rounded-full bg-slate-200 dark:bg-slate-800" /><span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Planned</span></div>
                </div>
              </div>
              <div className="h-[300px] flex items-end justify-between px-4 pb-2 border-b border-slate-50 dark:border-slate-800">
                 {[40, 65, 80, 55, 95, 75, 88].map((h, i) => (
                   <div key={i} className="w-16 bg-slate-50 dark:bg-slate-950/50 rounded-t-2xl relative group">
                      <div 
                        className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-blue-700 to-blue-500 rounded-t-2xl transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(37,99,235,0.15)] group-hover:from-blue-600 group-hover:to-blue-400" 
                        style={{ height: `${h}%` }} 
                      />
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-black py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-xl whitespace-nowrap">
                        DAY {i+1}: {h}%
                      </div>
                   </div>
                 ))}
              </div>
              <div className="flex justify-between mt-4 px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
           </div>

           {/* Production Queue Table */}
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Active Queue</h3>
                 <Link href="/manufacturing/work-orders">
                   <Button variant="ghost" className="text-xs font-black text-blue-600 uppercase tracking-widest px-6 rounded-xl">View Full Queue</Button>
                 </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                      <th className="pb-4">Work Order</th>
                      <th className="pb-4">Line</th>
                      <th className="pb-4">Product</th>
                      <th className="pb-4">Progress</th>
                      <th className="pb-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    <ProductionRow id="#WO-2024" line="Alpha-01" product="X570 Board x50" progress={85} status="In Progress" />
                    <ProductionRow id="#WO-2025" line="Beta-04" product="RTX 4090 Assembly" progress={42} status="In Progress" />
                    <ProductionRow id="#WO-2026" line="Alpha-02" product="DDR5 Modules x200" progress={15} status="Setup" />
                    <ProductionRow id="#WO-2027" line="Gamma-01" product="Power Unit G-750" progress={0} status="Queued" />
                  </tbody>
                </table>
              </div>
           </div>
        </div>

        {/* Sidebar - Production Alerts & Control */}
        <div className="space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between mb-8 relative z-10">
                 <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">System Alerts</h3>
                 <AlertCircle className="w-5 h-5 text-rose-500 animate-pulse" />
              </div>
              <div className="space-y-6 relative z-10">
                 <AlertItem color="rose" title="Material Shortage" desc="Z690 Motherboard low for WO-102" time="2h ago" />
                 <AlertItem color="amber" title="Work Order Delayed" desc="#WO-098 is 24h past start date" time="5h ago" />
                 <AlertItem color="emerald" title="Production Complete" desc="#WO-101 finished successfully" time="10m ago" />
              </div>
           </div>

           <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[32px] p-8 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <Zap className="w-10 h-10 mb-6 opacity-50" />
              <h3 className="text-2xl font-black mb-2 tracking-tight">Efficiency Boost</h3>
              <p className="text-blue-100 text-xs font-medium leading-relaxed opacity-80">Your production line B is currently at 98% efficiency. Replicating its setup for line C could increase monthly output by 12%.</p>
              <Button className="w-full mt-8 h-12 rounded-2xl bg-white text-blue-900 font-black hover:bg-white/90 transition-all active:scale-95 relative z-10">
                 DEPLOY AI OPTIMIZATION
              </Button>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <div className="grid grid-cols-2 gap-4">
                 <ManufacturingAction icon={Cpu} label="BOMs" link="/manufacturing/bom" color="bg-indigo-500" />
                 <ManufacturingAction icon={ShieldCheck} label="QC Control" link="/manufacturing/quality" color="bg-emerald-500" />
              </div>
           </div>
        </div>
      </div>

      {/* New Work Order Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl bg-white dark:bg-slate-950">
          <div className="bg-slate-950 p-10 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-600/20">W</div>
                <div>
                   <h2 className="text-3xl font-black tracking-tight">New Work Order</h2>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Initiate Production Sequence</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="rounded-full text-slate-500 hover:text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={handleCreateWorkOrder} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product Reference</Label>
                  <Input required placeholder="e.g. RTX 4090 Assembly" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Batch Quantity</Label>
                  <Input required type="number" placeholder="100" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Production Line</Label>
                    <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5 appearance-none outline-none">
                       <option className="bg-slate-900">Alpha-01 (High Capacity)</option>
                       <option className="bg-slate-900">Beta-04 (Precision)</option>
                       <option className="bg-slate-900">Gamma-01 (General)</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Priority Level</Label>
                    <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5 appearance-none outline-none">
                       <option className="bg-slate-900">Urgent - ASAP</option>
                       <option className="bg-slate-900">Medium - Normal</option>
                       <option className="bg-slate-900">Low - Buffer</option>
                    </select>
                 </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-[24px] bg-blue-600 hover:bg-blue-500 text-white font-black shadow-2xl shadow-blue-600/40 text-lg tracking-tight active:scale-[0.98] transition-all"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> INITIALIZING PRODUCTION...</>
                  ) : (
                    "START PRODUCTION SEQUENCE"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ManufacturingStatsCard({ label, value, change, icon: Icon, color, bg, isAlert }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm group hover:shadow-2xl transition-all duration-500 relative overflow-hidden cursor-pointer">
      <div className="flex items-center justify-between mb-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", bg)}>
          <Icon className={cn("w-7 h-7", color)} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className={cn("text-[10px] font-black px-2 py-1 rounded-lg", isAlert ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20" : "bg-blue-50 text-blue-600 dark:bg-blue-900/20")}>
          {change}
        </span>
        <div className="w-16 h-1 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
           <div className={cn("h-full w-2/3 rounded-full", color.replace("text-", "bg-"))} />
        </div>
      </div>
    </div>
  );
}

function ProductionRow({ id, line, product, progress, status }: any) {
  return (
    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
      <td className="py-5 font-black text-xs text-blue-600 tracking-tight">{id}</td>
      <td className="py-5 font-bold text-sm text-slate-900 dark:text-white">{line}</td>
      <td className="py-5 text-xs font-medium text-slate-500">{product}</td>
      <td className="py-5">
         <div className="flex items-center space-x-3 min-w-[120px]">
            <div className="flex-1 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-[10px] font-black text-slate-400">{progress}%</span>
         </div>
      </td>
      <td className="py-5 text-right">
        <span className={cn("text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border", 
          status === "In Progress" ? "bg-blue-50 text-blue-600 border-blue-100" : 
          status === "Setup" ? "bg-amber-50 text-amber-600 border-amber-100" : 
          "bg-slate-50 text-slate-400 border-slate-100")}>
          {status}
        </span>
      </td>
    </tr>
  );
}

function AlertItem({ color, title, desc, time }: any) {
  return (
    <div className="flex items-start space-x-4 group cursor-pointer">
      <div className={cn("w-2 h-2 rounded-full mt-2 shrink-0 group-hover:scale-150 transition-transform", 
        color === "rose" ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" : color === "amber" ? "bg-amber-500" : "bg-emerald-500"
      )} />
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-tight">{title}</p>
          <span className="text-[9px] font-bold text-slate-400">{time}</span>
        </div>
        <p className="text-[11px] text-slate-500 mt-1 font-medium leading-tight group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">{desc}</p>
      </div>
    </div>
  );
}

function ManufacturingAction({ icon: Icon, label, link, color }: any) {
  return (
    <Link href={link || "#"} className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all group">
       <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-sm transition-transform group-hover:scale-110", color)}>
          <Icon className="w-5 h-5 text-white" />
       </div>
       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{label}</span>
    </Link>
  );
}
