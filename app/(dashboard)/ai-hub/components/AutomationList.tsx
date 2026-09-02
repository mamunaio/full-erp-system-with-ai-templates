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
  History,
  ShieldCheck,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function AutomationList() {
  const [automations, setAutomations] = useState([
    { 
      id: 1, 
      name: "Autonomous Low-Stock PO Dispatch", 
      desc: "Automatically drafts and notifies procurement suppliers when hardware inventory drops below min buffer.", 
      trigger: "Inventory Stock < Threshold", 
      active: true, 
      icon: Box, 
      executions: "12 times this month"
    },
    { 
      id: 2, 
      name: "AI Lead Qualification & Priority Scoring", 
      desc: "Evaluates incoming CRM inquiries with Google Gemini and tags hot leads with score > 80.", 
      trigger: "New Inbound Contact Created", 
      active: true, 
      icon: Sparkles, 
      executions: "48 evaluations today"
    },
    { 
      id: 3, 
      name: "Overdue Invoice Escalation Stream", 
      desc: "Sends customized payment reminder sequences at 7, 14, and 30 days overdue.", 
      trigger: "Invoice Status = OVERDUE", 
      active: true, 
      icon: DollarSign, 
      executions: "5 reminders sent yesterday"
    },
    { 
      id: 4, 
      name: "Executive Weekly Revenue & EBITDA Digest", 
      desc: "Synthesizes multi-vault treasury inflow and generates summary report every Monday morning.", 
      trigger: "Cron: Every Monday at 08:00 AM", 
      active: false, 
      icon: Mail, 
      executions: "Scheduled"
    },
  ]);

  const toggleAutomation = (id: number) => {
    setAutomations(prev => prev.map(a => 
      a.id === id ? { ...a, active: !a.active } : a
    ));
    const auto = automations.find(a => a.id === id);
    toast.success(`${auto?.name} ${!auto?.active ? 'Activated' : 'Deactivated'}`);
  };

  return (
    <div className="space-y-6">
      {/* Header and Add Workflow Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
            Autonomous Neural Workflows
          </h3>
          <p className="text-xs text-muted-foreground">Event-driven automation rules operating 24/7 across your ERP</p>
        </div>

        <Button 
          onClick={() => toast.success("Workflow Node Builder initialized!")}
          className="gold-gradient text-obsidian-900 font-extrabold text-xs sm:text-sm rounded-2xl h-11 px-6 shadow-lg shadow-gold-500/20 hover:opacity-90"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Create New Workflow
        </Button>
      </div>

      {/* Automations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {automations.map((auto) => (
          <div 
            key={auto.id} 
            className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-lg space-y-4 relative overflow-hidden group hover:border-gold-500/40 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl gold-gradient flex items-center justify-center text-obsidian-900 font-bold shadow-sm">
                  <auto.icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-gold-500 transition-colors font-heading">
                    {auto.name}
                  </h4>
                  <span className="text-[10px] font-mono text-muted-foreground bg-accent/60 px-2 py-0.5 rounded-md">
                    {auto.trigger}
                  </span>
                </div>
              </div>

              <Switch
                checked={auto.active}
                onCheckedChange={() => toggleAutomation(auto.id)}
              />
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              {auto.desc}
            </p>

            <div className="pt-3 border-t border-border/40 flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="flex items-center gap-1.5 text-foreground font-medium">
                <Activity className="w-3.5 h-3.5 text-gold-500" /> {auto.executions}
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                auto.active ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-muted text-muted-foreground border-border"
              }`}>
                {auto.active ? "Running" : "Paused"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
