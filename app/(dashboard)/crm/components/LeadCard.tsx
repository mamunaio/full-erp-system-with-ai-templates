"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { 
  Calendar, DollarSign, Clock, 
  Sparkles, MoreHorizontal 
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface Lead {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: string;
  closeDate: string;
  days: number;
  priority: "high" | "medium" | "low";
  aiScore?: "HOT" | "WARM" | "COLD";
}

export default function LeadCard({ lead }: { lead: Lead }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: lead.id,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-shadow group mb-3"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={cn(
            "w-2 h-2 rounded-full",
            lead.priority === "high" ? "bg-rose-500" :
            lead.priority === "medium" ? "bg-amber-500" : "bg-blue-500"
          )} />
          <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{lead.title}</h4>
        </div>
        <button className="opacity-0 group-hover:opacity-100 text-slate-400">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <p className="text-[11px] text-slate-500 font-medium mb-4">{lead.company}</p>
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-injaazh-600 font-bold text-sm">
          <DollarSign className="w-3 h-3 mr-0.5" />
          {lead.value.toLocaleString()}
        </div>
        {lead.aiScore && (
          <div className={cn(
            "flex items-center px-2 py-0.5 rounded text-[9px] font-bold",
            lead.aiScore === "HOT" ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
          )}>
            <Sparkles className="w-2 h-2 mr-1" /> AI {lead.aiScore}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800">
        <div className="flex items-center text-[10px] text-slate-400">
          <Calendar className="w-3 h-3 mr-1" /> {lead.closeDate}
        </div>
        <div className="flex items-center text-[10px] text-slate-400">
          <Clock className="w-3 h-3 mr-1" /> {lead.days}d
        </div>
      </div>
    </div>
  );
}
