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
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      type: "Column",
      stageId: id,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 min-w-[290px] max-w-[340px] glass rounded-3xl p-4 border shadow-md transition-all duration-200 flex flex-col ${
        isOver
          ? "border-gold-500 bg-gold-500/[0.07] ring-2 ring-gold-500/30 shadow-xl shadow-gold-500/10"
          : "border-border/80 hover:border-gold-500/30"
      }`}
    >
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

      {/* Droppable Cards Container */}
      <div
        className={`flex-1 min-h-[480px] rounded-2xl transition-all p-1 flex flex-col ${
          isOver ? "bg-gold-500/10 border-2 border-dashed border-gold-500/40" : ""
        }`}
      >
        {leads?.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}

        {(!leads || leads.length === 0) && (
          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-border/40 rounded-2xl text-muted-foreground/50 text-xs font-medium py-12">
            <span>Drop deal here</span>
          </div>
        )}
      </div>
    </div>
  );
}
