"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  DndContext,
  DragOverlay,
  CollisionDetection,
  pointerWithin,
  rectIntersection,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";
import LeadCard, { Lead } from "./LeadCard";
import { toast } from "sonner";

const initialLeads: Lead[] = [
  { id: "L1", title: "Enterprise SaaS Annual Plan", company: "Meta Corp", value: 85000, stage: "PROPOSAL", closeDate: "Sep 15", days: 4, priority: "high", aiScore: "HOT" },
  { id: "L2", title: "Ground Telemetry Integration", company: "SpaceX Systems", value: 62000, stage: "PROPOSAL", closeDate: "Sep 22", days: 6, priority: "high", aiScore: "HOT" },
  { id: "L3", title: "Energy Fleet AI Optimization", company: "Tesla Energy", value: 48000, stage: "QUALIFIED", closeDate: "Oct 05", days: 12, priority: "medium", aiScore: "HOT" },
  { id: "L4", title: "Global Billing Multi-Tenant", company: "Stripe Corporate", value: 35000, stage: "CONTACTED", closeDate: "Oct 18", days: 3, priority: "low", aiScore: "WARM" },
  { id: "L5", title: "Cloud Infrastructure Migration", company: "Amazon Logistics", value: 120000, stage: "WON", closeDate: "Aug 28", days: 18, priority: "high", aiScore: "HOT" },
  { id: "L6", title: "Hardware Procurement Batch", company: "Quantum Scale", value: 24000, stage: "NEW", closeDate: "Nov 02", days: 1, priority: "medium", aiScore: "WARM" },
];

const STAGES = [
  { id: "NEW", title: "Discovery & Leads" },
  { id: "CONTACTED", title: "Contacted" },
  { id: "QUALIFIED", title: "Qualified Opps" },
  { id: "PROPOSAL", title: "Proposal & Pitch" },
  { id: "WON", title: "Closed Won" },
];

export default function KanbanBoard() {
  const [leads, setLeads] = useState(initialLeads);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const customCollisionDetection: CollisionDetection = (args) => {
    // 1. Direct hit with pointerWithin
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }
    // 2. Fallback to rectIntersection for fluid boundary interactions
    return rectIntersection(args);
  };

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;
    setActiveId(null);

    if (!over || !active) return;

    const activeId = active.id;
    const overId = over.id;

    // Find the lead being moved
    const movedLead = leads.find((l) => l.id === activeId);
    if (!movedLead) return;

    // Determine target stage: either dropped directly on a column stage id, or dropped on another lead
    let targetStageId: string | null = null;
    if (STAGES.some((s) => s.id === overId)) {
      targetStageId = overId;
    } else {
      const overLead = leads.find((l) => l.id === overId);
      if (overLead) {
        targetStageId = overLead.stage;
      }
    }

    if (targetStageId && movedLead.stage !== targetStageId) {
      setLeads((prev) =>
        prev.map((lead) =>
          lead.id === activeId ? { ...lead, stage: targetStageId! } : lead
        )
      );

      const targetStage = STAGES.find((s) => s.id === targetStageId);
      if (targetStage) {
        toast.success(`Moved "${movedLead.company}" to ${targetStage.title}! Stage revenue updated.`);
      }
    }
  }

  function handleDragCancel() {
    setActiveId(null);
  }

  const activeLead = activeId ? (leads.find((l) => l.id === activeId) as Lead) : null;

  return (
    <div className="glass rounded-3xl border border-border/80 p-5 sm:p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between px-1">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
            Live Deal Flow & Stage Progression
          </h3>
          <p className="text-xs text-muted-foreground">
            Drag deals across columns to synchronize revenue forecasts in real time
          </p>
        </div>
        <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 hidden sm:inline">
          DndKit Engine Active
        </span>
      </div>

      <div className="flex space-x-4 overflow-x-auto pb-4 pt-2 custom-scrollbar">
        <DndContext
          sensors={sensors}
          collisionDetection={customCollisionDetection}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          {STAGES.map((stage) => {
            const stageLeads = leads.filter((l) => l.stage === stage.id);
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

          {mounted && typeof document !== "undefined"
            ? createPortal(
                <DragOverlay
                  dropAnimation={{
                    duration: 180,
                    easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
                  }}
                >
                  {activeLead ? <LeadCard lead={activeLead} isOverlay /> : null}
                </DragOverlay>,
                document.body
              )
            : null}
        </DndContext>
      </div>
    </div>
  );
}
