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
    <div className="flex-1 min-w-[290px] max-w-[340px] glass rounded-3xl p-4 border border-border/80 shadow-md transition-all duration-200 hover:border-gold-500/30 flex flex-col">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50 px-1">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-foreground font-heading">{title}</h3>
          <span className="bg-accent/80 border border-border text-foreground text-[10px] font-extrabold px-2 py-0.5 rounded-full">
            {leads?.length || 0}
          </span>
        </div>
        <span className="text-xs font-extrabold gold-text font-heading">${(totalValue || 0).toLocaleString()}</span>
      </div>

      {/* Droppable Area */}
      <div
        ref={setNodeRef}
        className={`flex-1 min-h-[480px] rounded-2xl transition-all p-1 ${
          isOver ? "bg-gold-500/10 border-2 border-dashed border-gold-500/50 shadow-inner" : ""
        }`}
      >
        {leads?.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
}
