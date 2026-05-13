"use client";

import { 
  Zap, Clock, Play, 
  Settings, MoreVertical, 
  CheckCircle2, AlertCircle,
  Mail, Bell, Bot
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AutomationCard({ automation }: { automation: any }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center space-x-4">
           <div className={cn(
             "w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-injaazh-600/20",
             automation.active ? "bg-injaazh-600 text-white" : "bg-slate-100 text-slate-400"
           )}>
             <Zap className="w-6 h-6" />
           </div>
           <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-injaazh-600 transition-colors">{automation.name}</h3>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Trigger: {automation.trigger}</p>
           </div>
        </div>
        <div className="flex items-center space-x-2">
           <Switch checked={automation.active} className="data-[state=checked]:bg-emerald-500" />
           <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400"><MoreVertical className="w-4 h-4" /></Button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex flex-wrap gap-2">
           {automation.actions.map((action: any, i: number) => (
             <div key={i} className="flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                {action.type === "send_email" && <Mail className="w-3 h-3 text-injaazh-600" />}
                {action.type === "send_in_app" && <Bell className="w-3 h-3 text-amber-500" />}
                {action.type === "ai_draft" && <Bot className="w-3 h-3 text-purple-500" />}
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{action.type.replace('_', ' ')}</span>
             </div>
           ))}
        </div>

        <div className="pt-6 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Runs</p>
                 <p className="text-sm font-black">{automation.totalRuns}</p>
              </div>
              <div className="w-px h-8 bg-slate-100 dark:bg-slate-800" />
              <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Success Rate</p>
                 <p className="text-sm font-black text-emerald-500">{automation.successRate}%</p>
              </div>
           </div>
           <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <Clock className="w-3 h-3 mr-1.5" /> 2h ago
           </div>
        </div>
      </div>
      
      {/* Subtle Background Accent */}
      <div className={cn(
        "absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-2xl opacity-10 transition-transform group-hover:scale-150",
        automation.active ? "bg-injaazh-600" : "bg-slate-400"
      )} />
    </div>
  );
}
