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
    <div className="flex-1 min-w-[280px] bg-slate-50/50 dark:bg-slate-950/20 rounded-2xl p-4 border border-transparent transition-colors duration-200">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-sm text-slate-700 dark:text-slate-300">{title}</h3>
          <span className="bg-slate-200 dark:bg-slate-800 text-slate-500 text-[10px] px-2 py-0.5 rounded-full font-bold">
            {leads?.length || 0}
          </span>
        </div>
        <span className="text-[10px] font-bold text-slate-400">${(totalValue || 0).toLocaleString()}</span>
      </div>

      <div
        ref={setNodeRef}
        className={`min-h-[500px] rounded-xl transition-colors ${isOver ? 'bg-injaazh-50/50 dark:bg-injaazh-900/10 border-2 border-dashed border-injaazh-200' : ''}`}
      >
        {leads?.map((lead) => (
          <LeadCard key={lead.id} lead={lead} />
        ))}
      </div>
    </div>
  );
}
