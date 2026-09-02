"use client";

import { useState } from "react";
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, MessageSquare, Paperclip, MoreHorizontal, Clock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const initialTasks: Record<string, any[]> = {
  "BACKLOG": [
    { id: "t1", title: "Enterprise SSO & SAML 2.0 Integration", priority: "HIGH", assignee: "FA", dueDate: "Sep 15", project: "NexGen ERP", points: 8 },
    { id: "t2", title: "Multi-Tenant Redis Caching Optimization", priority: "MEDIUM", assignee: "ZR", dueDate: "Sep 18", project: "Meta Connect", points: 5 },
  ],
  "IN_PROGRESS": [
    { id: "t3", title: "Gemini 1.5 Pro Predictive EBITDA Pipeline", priority: "CRITICAL", assignee: "AS", dueDate: "Sep 08", project: "Tesla IoT", points: 13 },
    { id: "t4", title: "Autonomous Low-Stock PO Generator", priority: "HIGH", assignee: "TI", dueDate: "Sep 10", project: "SpaceX Platform", points: 8 },
  ],
  "REVIEW": [
    { id: "t5", title: "Chittagong Port Spatial Heatmap Calibration", priority: "MEDIUM", assignee: "FA", dueDate: "Sep 04", project: "Supply Chain", points: 5 },
  ],
  "DONE": [
    { id: "t6", title: "Double-Entry Treasury Double Vault Sync", priority: "CRITICAL", assignee: "TI", dueDate: "Aug 30", project: "Master Ledger", points: 13 },
  ],
};

function TaskCard({ task }: { task: any }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="p-4 rounded-2xl bg-card/80 hover:bg-card border border-border/80 hover:border-gold-500/40 shadow-sm hover:shadow-lg transition-all group cursor-grab active:cursor-grabbing space-y-3"
    >
      <div className="flex justify-between items-start gap-2">
        <span className={cn(
          "px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border",
          task.priority === "CRITICAL" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" :
          task.priority === "HIGH" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" : "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
        )}>
          {task.priority}
        </span>
        <span className="text-[10px] font-bold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-md border border-gold-500/20">
          {task.points} SP
        </span>
      </div>
      
      <div>
        <h4 className="font-bold text-xs text-foreground group-hover:text-gold-500 transition-colors leading-snug line-clamp-2">
          {task.title}
        </h4>
        <p className="text-[10px] text-muted-foreground font-semibold mt-1">{task.project}</p>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-border/50 text-[10px] text-muted-foreground">
        <div className="flex items-center gap-1 font-semibold text-foreground/80">
          <Calendar className="w-3 h-3 text-muted-foreground" /> {task.dueDate}
        </div>
        <div className="w-6 h-6 rounded-xl gold-gradient flex items-center justify-center text-[10px] font-extrabold text-obsidian-950 shadow-sm">
          {task.assignee}
        </div>
      </div>
    </div>
  );
}

function KanbanColumn({ id, title, count, children }: { id: string; title: string; count: number; children: React.ReactNode }) {
  return (
    <div className="flex-1 min-w-[280px] max-w-[340px] glass rounded-3xl p-4 border border-border/80 shadow-md flex flex-col">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50 px-1">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-foreground font-heading">{title}</h3>
          <span className="bg-accent/80 border border-border text-foreground text-[10px] font-extrabold px-2 py-0.5 rounded-full">
            {count}
          </span>
        </div>
      </div>
      <div className="min-h-[420px] rounded-2xl flex-1">
        {children}
      </div>
    </div>
  );
}

export default function TaskKanban() {
  const [columns, setColumns] = useState(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <div className="glass rounded-3xl border border-border/80 p-5 sm:p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
            Sprint Execution & Task Board
          </h3>
          <p className="text-xs text-muted-foreground">Active sprint deliverables, story points, and squad progress</p>
        </div>
        <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
          Sprint 34 Active
        </span>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={(e) => setActiveId(e.active.id as string)}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 custom-scrollbar">
          {Object.keys(columns).map((status) => (
            <KanbanColumn 
              key={status} 
              id={status} 
              title={status.replace("_", " ")} 
              count={columns[status].length}
            >
              <SortableContext items={columns[status]} strategy={verticalListSortingStrategy}>
                 <div className="space-y-3">
                    {columns[status].map((task: any) => (
                      <TaskCard key={task.id} task={task} />
                    ))}
                 </div>
              </SortableContext>
            </KanbanColumn>
          ))}
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    setActiveId(null);
  }
}
