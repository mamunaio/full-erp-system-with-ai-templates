"use client";

import { useState } from "react";
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";
import LeadCard, { Lead } from "./LeadCard";

const initialLeads: Lead[] = [
  { id: "L1", title: "Office Supplies Deal", company: "Meta Corp", value: 12000, stage: "NEW", closeDate: "Jun 12", days: 3, priority: "high", aiScore: "HOT" },
  { id: "L2", title: "Enterprise CRM", company: "Tesla Inc", value: 50000, stage: "QUALIFIED", closeDate: "Jul 05", days: 12, priority: "medium", aiScore: "HOT" },
  { id: "L3", title: "Cloud Migration", company: "SpaceX", value: 35000, stage: "CONTACTED", closeDate: "Jun 20", days: 5, priority: "low", aiScore: "WARM" },
  { id: "L4", title: "Bulk Hardware", company: "Amazon", value: 15000, stage: "NEW", closeDate: "Jun 28", days: 1, priority: "medium" },
];

const STAGES = [
  { id: "NEW", title: "New" },
  { id: "CONTACTED", title: "Contacted" },
  { id: "QUALIFIED", title: "Qualified" },
  { id: "PROPOSAL", title: "Proposal" },
  { id: "WON", title: "Won" },
];

export default function KanbanBoard() {
  const [leads, setLeads] = useState(initialLeads);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    if (!over) return;

    if (active.id !== over.id) {
      setLeads((prev) => 
        prev.map((lead) => 
          lead.id === active.id ? { ...lead, stage: over.id } : lead
        )
      );
    }
    setActiveId(null);
  }

  const activeLead = activeId ? leads.find(l => l.id === activeId) : null;

  return (
    <div className="flex space-x-6 overflow-x-auto pb-8 custom-scrollbar">
      <DndContext 
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        {STAGES.map((stage) => {
          const stageLeads = leads.filter(l => l.stage === stage.id);
          const totalValue = stageLeads.reduce((acc, l) => acc + l.value, 0);
          return (
            <KanbanColumn 
              key={stage.id} 
              id={stage.id} 
              title={stage.title} 
              leads={stageLeads} 
              totalValue={totalValue}
            />
          );
        })}

        <DragOverlay>
          {activeLead ? <LeadCard lead={activeLead} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
