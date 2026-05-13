"use client";

import { useState } from "react";
import { Plus, Mail, Bell, Clock, ArrowRight, Power } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

const initialAutomations = [
  {
    id: 1,
    name: "Low Stock Email Notification",
    trigger: "Stock < 50",
    action: "Email Purchase Manager",
    isActive: true,
    icon: Mail,
    color: "bg-amber-100 text-amber-600"
  },
  {
    id: 2,
    name: "Weekly CEO Report",
    trigger: "Every Monday 9 AM",
    action: "Generate & Email Report",
    isActive: true,
    icon: Clock,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 3,
    name: "Sales Lead Assignment",
    trigger: "New Lead Created",
    action: "Notify Sales Rep",
    isActive: false,
    icon: Bell,
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    id: 4,
    name: "Payment Reminder",
    trigger: "Invoice Overdue 7 Days",
    action: "Send SMS Reminder",
    isActive: true,
    icon: Bell,
    color: "bg-rose-100 text-rose-600"
  }
];

export default function AutomationList() {
  const [automations, setAutomations] = useState(initialAutomations);

  const toggleAutomation = (id: number) => {
    setAutomations(prev => prev.map(a => 
      a.id === id ? { ...a, isActive: !a.isActive } : a
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Smart Automations</h2>
        <Button className="bg-injaazh-600 hover:bg-injaazh-700">
          <Plus className="w-4 h-4 mr-2" /> New Automation
        </Button>
      </div>

      <div className="space-y-4">
        {automations.map((item) => (
          <Card key={item.id} className={cn(
            "border-none shadow-sm transition-all",
            item.isActive ? "bg-white dark:bg-slate-900" : "bg-slate-50 dark:bg-slate-950 opacity-60"
          )}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", item.color)}>
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{item.name}</h3>
                    <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                      <span className="font-medium bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">{item.trigger}</span>
                      <ArrowRight className="w-3 h-3" />
                      <span className="font-medium bg-injaazh-50 dark:bg-injaazh-950 text-injaazh-600 px-2 py-0.5 rounded">{item.action}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right mr-4">
                    <p className={cn("text-[10px] font-bold uppercase tracking-widest", item.isActive ? "text-emerald-500" : "text-slate-400")}>
                      {item.isActive ? "Active" : "Disabled"}
                    </p>
                  </div>
                  <Switch 
                    checked={item.isActive} 
                    onCheckedChange={() => toggleAutomation(item.id)} 
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="p-8 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center space-y-3 bg-slate-50/50 dark:bg-slate-900/20">
        <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Power className="w-6 h-6 text-slate-400" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-900 dark:text-white">Need more automations?</p>
          <p className="text-xs text-slate-500">You can create custom rules based on any business event.</p>
        </div>
        <Button variant="outline" size="sm" className="mt-2">View Templates</Button>
      </div>
    </div>
  );
}
