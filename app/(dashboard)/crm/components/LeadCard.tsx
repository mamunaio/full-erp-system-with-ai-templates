"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Calendar, DollarSign, Clock,
  Sparkles, MoreHorizontal
} from "lucide-react";

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

  const priorityDot = {
    high: "bg-rose-500",
    medium: "bg-amber-500",
    low: "bg-blue-500",
  };

  const aiScoreStyle = {
    HOT: "bg-rose-500/15 text-rose-400",
    WARM: "bg-amber-500/15 text-amber-400",
    COLD: "bg-blue-500/15 text-blue-400",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-4 hover:border-gold-500/20 shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing transition-all group mb-3"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${priorityDot[lead.priority]}`} />
          <h4 className="text-sm font-bold text-card-foreground line-clamp-1">{lead.title}</h4>
        </div>
        <button className="opacity-0 group-hover:opacity-100 text-muted-foreground">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <p className="text-[11px] text-muted-foreground font-medium mb-4">{lead.company}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-gold-400 font-bold text-sm">
          <DollarSign className="w-3 h-3 mr-0.5" />
          {lead.value.toLocaleString()}
        </div>
        {lead.aiScore && (
          <div className={`flex items-center px-2 py-0.5 rounded text-[9px] font-bold ${aiScoreStyle[lead.aiScore] || aiScoreStyle.WARM}`}>
            <Sparkles className="w-2 h-2 mr-1" /> AI {lead.aiScore}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center text-[10px] text-muted-foreground">
          <Calendar className="w-3 h-3 mr-1" /> {lead.closeDate}
        </div>
        <div className="flex items-center text-[10px] text-muted-foreground">
          <Clock className="w-3 h-3 mr-1" /> {lead.days}d
        </div>
      </div>
    </div>
  );
}
