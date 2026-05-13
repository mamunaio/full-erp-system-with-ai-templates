"use client";

import { 
  CheckCircle2, Clock, Play, 
  Settings2, PackageCheck, AlertCircle 
} from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
  { id: "DRAFT", label: "Draft", icon: Clock },
  { id: "CONFIRMED", label: "Confirmed", icon: CheckCircle2 },
  { id: "RESERVED", label: "Reserved", icon: PackageCheck },
  { id: "IN_PROGRESS", label: "In Progress", icon: Play },
  { id: "QUALITY", label: "Quality Check", icon: Settings2 },
  { id: "COMPLETED", label: "Completed", icon: CheckCircle2 },
];

export default function WorkOrderTimeline({ currentStatus }: { currentStatus: string }) {
  const currentIndex = stages.findIndex(s => s.id === currentStatus);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm overflow-x-auto">
      <div className="flex items-center justify-between relative min-w-[600px] max-w-4xl mx-auto">
        {/* Progress Line */}
        <div className="absolute left-0 top-6 w-full h-0.5 bg-slate-100 dark:bg-slate-800 z-0" />
        <div 
          className="absolute left-0 top-6 h-0.5 bg-injaazh-600 z-0 transition-all duration-1000" 
          style={{ width: `${(currentIndex / (stages.length - 1)) * 100}%` }}
        />

        {stages.map((stage, index) => {
          const Icon = stage.icon;
          const isCompleted = index <= currentIndex;
          const isActive = index === currentIndex;

          return (
            <div key={stage.id} className="relative z-10 flex flex-col items-center">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg",
                isCompleted ? "bg-injaazh-600 text-white" : "bg-white dark:bg-slate-900 text-slate-300 border-2 border-slate-100 dark:border-slate-800",
                isActive && "ring-4 ring-injaazh-500/20 scale-110"
              )}>
                <Icon className="w-5 h-5" />
              </div>
              <p className={cn(
                "mt-3 text-[10px] font-bold uppercase tracking-widest text-center",
                isCompleted ? "text-injaazh-600" : "text-slate-400"
              )}>
                {stage.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
