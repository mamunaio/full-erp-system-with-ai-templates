"use client";

import { useDroppable } from "@dnd-kit/core";
import LeadCard, { Lead } from "./LeadCard";

interface KanbanColumnProps {
  id: string;
  title: string;
  leads: Lead[];
  totalValue: number;
}

export default function KanbanColumn({ id, title, leads, totalValue }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex-1 min-w-[280px] bg-card/40 backdrop-blur-xl rounded-2xl p-4 border border-border transition-all duration-200 hover:border-gold-500/10">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-sm text-card-foreground">{title}</h3>
          <span className="bg-card/60 border border-border text-muted-foreground text-[10px] px-2 py-0.5 rounded-full font-bold">
            {leads?.length || 0}
          </span>
        </div>
        <span className="text-[10px] font-bold text-muted-foreground">${(totalValue || 0).toLocaleString()}</span>
      </div>

      <div
        ref={setNodeRef}
        className={`min-h-[500px] rounded-xl transition-colors ${isOver ? 'bg-gold-500/5 border-2 border-dashed border-gold-500/30' : ''}`}
      >
        {leads?.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
}
