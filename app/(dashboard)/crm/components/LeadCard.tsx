"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import {
  Calendar, DollarSign, Clock,
  Sparkles, MoreHorizontal, Building2,
  Phone, Mail
} from "lucide-react";
import { toast } from "sonner";

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
    opacity: isDragging ? 0.4 : 1,
  };

  const priorityBadge = {
    high: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
    medium: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    low: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
  };

  const aiScoreBadge = {
    HOT: "bg-rose-500/15 text-rose-500 border-rose-500/30",
    WARM: "bg-amber-500/15 text-amber-500 border-amber-500/30",
    COLD: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="p-4 rounded-2xl bg-card/80 hover:bg-card border border-border/80 hover:border-gold-500/40 shadow-sm hover:shadow-lg cursor-grab active:cursor-grabbing transition-all group mb-3 space-y-3 relative overflow-hidden"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className={`text-[9px] font-extrabold px-2 py-0.2 rounded-full border uppercase tracking-wider ${priorityBadge[lead.priority]}`}>
              {lead.priority}
            </span>
            {lead.aiScore && (
              <span className={`text-[9px] font-extrabold px-2 py-0.2 rounded-full border flex items-center gap-1 ${aiScoreBadge[lead.aiScore]}`}>
                <Sparkles className="w-2.5 h-2.5" /> AI {lead.aiScore}
              </span>
            )}
          </div>
          <h4 className="text-sm font-bold text-foreground group-hover:text-gold-500 transition-colors line-clamp-1 pt-1">
            {lead.title}
          </h4>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
        <Building2 className="w-3.5 h-3.5 text-muted-foreground/70 shrink-0" />
        <span className="truncate">{lead.company}</span>
      </div>

      <div className="flex items-center justify-between pt-1">
        <div className="text-base font-extrabold gold-text font-heading">
          ${lead.value.toLocaleString()}
        </div>
        <div className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1">
          <Clock className="w-3 h-3 text-gold-500" /> {lead.days}d in stage
        </div>
      </div>

      <div className="pt-2.5 border-t border-border/50 flex items-center justify-between text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1 font-semibold text-foreground/80">
          <Calendar className="w-3 h-3 text-muted-foreground" /> Close: {lead.closeDate}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toast.success(`Calling ${lead.company} key contact...`);
            }}
            className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground"
            title="Call"
          >
            <Phone className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toast.success(`Drafted pitch proposal for ${lead.company}`);
            }}
            className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground"
            title="Email"
          >
            <Mail className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
