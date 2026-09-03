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

export default function LeadCard({ lead, isOverlay = false }: { lead: Lead; isOverlay?: boolean }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: lead.id,
    disabled: isOverlay,
    data: {
      lead,
      stage: lead.stage,
    },
  });

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

  const cardStyle: React.CSSProperties = isOverlay
    ? {
        cursor: "grabbing",
        width: "300px",
        boxShadow: "0 25px 50px -12px rgba(245, 158, 11, 0.35), 0 0 25px rgba(245, 158, 11, 0.2)",
        transform: "scale(1.02)",
      }
    : {
        opacity: isDragging ? 0.25 : 1,
        touchAction: "none",
      };

  return (
    <div
      ref={isOverlay ? undefined : setNodeRef}
      style={cardStyle}
      {...(isOverlay ? {} : listeners)}
      {...(isOverlay ? {} : attributes)}
      className={`p-4 rounded-2xl bg-card border transition-all mb-3 space-y-3 relative overflow-hidden select-none ${
        isOverlay
          ? "border-gold-500 ring-2 ring-gold-500/50 shadow-2xl z-50 pointer-events-none cursor-grabbing"
          : "border-border/80 hover:border-gold-500/40 shadow-sm hover:shadow-lg cursor-grab active:cursor-grabbing group"
      }`}
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
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              toast.success(`Calling ${lead.company} key contact...`);
            }}
            className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            title="Call"
          >
            <Phone className="w-3 h-3" />
          </button>
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.stopPropagation();
              toast.success(`Drafted pitch proposal for ${lead.company}`);
            }}
            className="p-1 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
            title="Email"
          >
            <Mail className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
