"use client";

import { 
  Zap, 
  Settings2, 
  Plus, 
  Power, 
  Clock, 
  Mail, 
  DollarSign, 
  Box,
  ChevronRight,
  MoreVertical,
  Activity,
  History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function AutomationList() {
  const [automations, setAutomations] = useState([
    { id: 1, name: "Auto-Invoice Generation", desc: "Generate and send invoices when work order is completed.", trigger: "Work Order Complete", active: true, icon: DollarSign, color: "bg-emerald-500" },
    { id: 2, name: "Low Stock Purchase Alert", desc: "Notify procurement team when items reach minimum threshold.", trigger: "Inventory Level Low", active: true, icon: Box, color: "bg-amber-500" },
    { id: 3, name: "Weekly Financial Summary", desc: "Send summary report to executive team every Sunday.", trigger: "Time Interval", active: false, icon: Mail, color: "bg-blue-500" },
    { id: 4, name: "Late Payment Reminders", desc: "Email customers automatically when invoices are 3 days overdue.", trigger: "Payment Overdue", active: true, icon: Clock, color: "bg-rose-500" },
  ]);

  const toggleAutomation = (id: number) => {
    setAutomations(prev => prev.map(a => 
      a.id === id ? { ...a, active: !a.active } : a
    ));
    const auto = automations.find(a => a.id === id);
    toast.success(`${auto?.name} ${!auto?.active ? 'Enabled' : 'Disabled'}`);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
           <h3 className="text-3xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">AI <span className="text-blue-600">Automations</span></h3>
           <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Autonomous workflows driven by Injaazh Intelligence</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
          <Plus className="w-5 h-5 mr-3" /> Create Workflow
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
           {automations.map((auto) => (
             <div key={auto.id} className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm group hover:shadow-xl transition-all duration-500 relative overflow-hidden">
                <div className="flex items-start justify-between relative z-10">
                   <div className="flex items-start space-x-5">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg", auto.color)}>
                         <auto.icon className="w-7 h-7" />
                      </div>
                      <div>
                         <h4 className="text-xl font-black tracking-tight text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 transition-colors italic uppercase">{auto.name}</h4>
                         <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-[280px]">{auto.desc}</p>
                      </div>
                   </div>
                   <Switch 
                     checked={auto.active} 
                     onCheckedChange={() => toggleAutomation(auto.id)}
                     className="data-[state=checked]:bg-blue-600"
                   />
                </div>
                
                <div className="mt-8 pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                   <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Trigger: {auto.trigger}</span>
                   </div>
                   <Button variant="ghost" size="sm" className="h-8 rounded-xl font-black text-[10px] uppercase tracking-widest text-blue-600">Configure Logic</Button>
                </div>
                
                <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
           ))}
        </div>

        <div className="space-y-8">
           <div className="bg-slate-950 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center space-x-4 mb-8">
                 <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-blue-400" />
                 </div>
                 <h3 className="text-xl font-black tracking-tight italic uppercase">Automation Stats</h3>
              </div>
              <div className="grid grid-cols-2 gap-6 relative z-10">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Tasks Automated</p>
                    <p className="text-4xl font-black italic tracking-tighter text-blue-500">1,240</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Hours Saved</p>
                    <p className="text-4xl font-black italic tracking-tighter text-emerald-500">342h</p>
                 </div>
              </div>
              <div className="mt-10 pt-10 border-t border-white/5 space-y-6">
                 <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Recent Activity</h4>
                 <div className="space-y-4">
                    <RecentLog desc="Auto-Invoice #IV-102 sent to Meta Corp" time="2h ago" />
                    <RecentLog desc="Low stock alert triggered for Z690 Boards" time="5h ago" />
                    <RecentLog desc="Weekly financial rollup initialized" time="1d ago" />
                 </div>
              </div>
           </div>

           <div className="bg-blue-600 rounded-[40px] p-10 text-white shadow-xl shadow-blue-600/20 group cursor-pointer overflow-hidden relative">
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <Zap className="w-10 h-10 mb-6 opacity-50" />
              <h3 className="text-2xl font-black mb-2 tracking-tight italic uppercase leading-none">Smart Trigger AI</h3>
              <p className="text-blue-100 text-xs font-medium leading-relaxed opacity-80">Our AI can now predict when inventory will reach threshold 48 hours in advance. Enable "Predictive Procurement" to optimize your cash flow.</p>
              <Button className="w-full mt-10 h-14 rounded-2xl bg-white text-blue-950 font-black italic uppercase tracking-tighter hover:bg-white/90 active:scale-95 transition-all">
                 ENABLE PREDICTIVE AI
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}

function RecentLog({ desc, time }: any) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
       <div className="flex items-center space-x-3">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
          <span className="text-[11px] font-medium text-slate-300 group-hover:text-white transition-colors">{desc}</span>
       </div>
       <span className="text-[9px] font-bold text-slate-500">{time}</span>
    </div>
  );
}
