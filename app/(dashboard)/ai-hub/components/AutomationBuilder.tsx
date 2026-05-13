"use client";

import { useState } from "react";
import { 
  Plus, Zap, Clock, 
  Search, Filter, Save,
  ArrowRight, Mail, Bell,
  Bot, Database, Globe,
  ShieldCheck, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AutomationBuilder() {
  const [step, setStep] = useState(1);
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);

  const triggers = [
    { id: "invoice.overdue", label: "Invoice Overdue", icon: Mail, color: "rose" },
    { id: "stock.low", label: "Stock Low", icon: Database, color: "amber" },
    { id: "lead.created", label: "New Lead Created", icon: Zap, color: "injaazh" },
    { id: "daily_at", label: "Scheduled (Daily)", icon: Clock, color: "blue" },
  ];

  const actions = [
    { id: "send_email", label: "Send Email", icon: Mail },
    { id: "send_in_app", label: "In-App Notification", icon: Bell },
    { id: "ai_draft", label: "AI Content Draft", icon: Bot },
    { id: "update_record", label: "Update Record", icon: Database },
  ];

  return (
    <div className="max-w-4xl mx-auto pb-20 animate-in fade-in zoom-in duration-500">
      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Progress Stepper */}
        <div className="flex border-b border-slate-100 dark:border-slate-800">
           <StepTab index={1} active={step === 1} label="Trigger" completed={step > 1} />
           <StepTab index={2} active={step === 2} label="Conditions" completed={step > 2} />
           <StepTab index={3} active={step === 3} label="Actions" completed={step > 3} />
           <StepTab index={4} active={step === 4} label="Finalize" completed={step > 4} />
        </div>

        <div className="p-12">
          {step === 1 && (
            <div className="space-y-8">
               <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase">Step 1: Choose a Trigger</h2>
                  <p className="text-slate-400 text-sm">Select the event that will start this automation.</p>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  {triggers.map((t) => (
                    <button 
                      key={t.id}
                      onClick={() => setSelectedTrigger(t.id)}
                      className={cn(
                        "p-8 rounded-[32px] border-2 text-left transition-all group",
                        selectedTrigger === t.id ? "border-injaazh-600 bg-injaazh-50 dark:bg-injaazh-950/20 shadow-xl" : "border-slate-100 dark:border-slate-800 hover:border-injaazh-200"
                      )}
                    >
                       <div className={cn(
                         "w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform",
                         t.id === selectedTrigger ? "bg-injaazh-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                       )}>
                          <t.icon className="w-6 h-6" />
                       </div>
                       <h4 className="text-lg font-bold text-slate-900 dark:text-white uppercase tracking-tighter italic">{t.label}</h4>
                       <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-bold">Event Trigger</p>
                    </button>
                  ))}
               </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8">
               <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase">Step 2: Add Conditions</h2>
                  <p className="text-slate-400 text-sm">Filter when this automation should run (optional).</p>
               </div>
               <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-4 mb-4">
                     <select className="bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none shadow-sm">
                        <option>Invoice Amount</option>
                        <option>Days Overdue</option>
                     </select>
                     <select className="bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none shadow-sm">
                        <option>is greater than</option>
                        <option>is equal to</option>
                     </select>
                     <input type="number" placeholder="50000" className="bg-white dark:bg-slate-900 border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none shadow-sm w-32" />
                     <Button variant="ghost" size="icon" className="text-rose-500"><X className="w-4 h-4" /></Button>
                  </div>
                  <Button variant="outline" className="rounded-xl h-10 border-dashed border-2 text-[10px] font-bold uppercase tracking-widest">
                    <Plus className="w-3 h-3 mr-2" /> Add Condition
                  </Button>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
               <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black italic tracking-tighter uppercase">Step 3: Define Actions</h2>
                  <p className="text-slate-400 text-sm">What should happen when the trigger and conditions match?</p>
               </div>
               <div className="grid grid-cols-4 gap-4">
                  {actions.map((a) => (
                    <button key={a.id} className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-injaazh-600 transition-all text-center group">
                       <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 group-hover:bg-injaazh-50 group-hover:text-injaazh-600 transition-colors">
                          <a.icon className="w-5 h-5" />
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{a.label}</span>
                    </button>
                  ))}
               </div>
            </div>
          )}

          <div className="mt-12 flex justify-between items-center">
             <Button 
              variant="ghost" 
              onClick={() => setStep(s => Math.max(1, s - 1))}
              className="text-slate-400 font-bold uppercase tracking-widest text-[10px]"
              disabled={step === 1}
             >
                Previous Step
             </Button>
             <div className="flex space-x-3">
                <Button variant="outline" className="rounded-xl h-12 px-8 font-bold border-slate-200">Cancel</Button>
                {step < 4 ? (
                  <Button 
                    onClick={() => setStep(s => s + 1)}
                    disabled={step === 1 && !selectedTrigger}
                    className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-12 px-10 font-bold shadow-xl shadow-injaazh-600/30"
                  >
                    Next Step <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl h-12 px-10 font-bold shadow-xl shadow-emerald-600/30">
                    <Save className="w-4 h-4 mr-2" /> Activate Workflow
                  </Button>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepTab({ index, active, label, completed }: any) {
  return (
    <div className={cn(
      "flex-1 py-6 flex flex-col items-center border-b-4 transition-all",
      active ? "border-injaazh-600" : "border-transparent"
    )}>
       <div className={cn(
         "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black mb-1.5",
         completed ? "bg-emerald-500 text-white" : active ? "bg-injaazh-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
       )}>
          {completed ? <ShieldCheck className="w-4 h-4" /> : index}
       </div>
       <span className={cn(
         "text-[9px] font-bold uppercase tracking-[0.2em]",
         active ? "text-injaazh-600" : "text-slate-400"
       )}>{label}</span>
    </div>
  );
}
