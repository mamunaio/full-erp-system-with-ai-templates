"use client";

import { useState } from "react";
import { 
  DndContext, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  DragOverlay,
  useDroppable,
  defaultDropAnimationSideEffects,
  DropAnimation
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy,
  useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { 
  Calendar, MessageSquare, Paperclip, MoreHorizontal, 
  Clock, CheckCircle2, Plus, GripVertical, Check, Sparkles 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  assignee: string;
  dueDate: string;
  project: string;
  points: number;
}

type Columns = Record<string, Task[]>;

const initialTasks: Columns = {
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

function TaskCard({ task, isOverlay = false }: { task: Task; isOverlay?: boolean }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ 
    id: task.id,
    disabled: isOverlay 
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "p-4 rounded-2xl bg-card border border-border/80 shadow-sm transition-all group cursor-grab active:cursor-grabbing space-y-3 select-none",
        isOverlay ? "shadow-2xl border-gold-500/80 scale-105 rotate-1 bg-card/95 backdrop-blur-md" : "hover:border-gold-500/40 hover:shadow-lg"
      )}
    >
      <div className="flex justify-between items-start gap-2">
        <span className={cn(
          "px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider border",
          task.priority === "CRITICAL" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" :
          task.priority === "HIGH" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" : 
          "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20"
        )}>
          {task.priority}
        </span>
        <span className="text-[10px] font-bold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-md border border-gold-500/20 font-mono">
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

function KanbanColumn({ 
  id, 
  title, 
  count, 
  tasks,
  onQuickAddTask 
}: { 
  id: string; 
  title: string; 
  count: number; 
  tasks: Task[];
  onQuickAddTask: (columnId: string) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div 
      ref={setNodeRef}
      className={cn(
        "flex-1 min-w-[280px] max-w-[340px] glass rounded-3xl p-4 border shadow-md flex flex-col transition-all",
        isOver ? "border-gold-500/60 bg-gold-500/5 ring-2 ring-gold-500/20" : "border-border/80"
      )}
    >
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50 px-1">
        <div className="flex items-center space-x-2">
          <h3 className="font-bold text-xs uppercase tracking-wider text-foreground font-heading">{title}</h3>
          <span className="bg-accent/80 border border-border text-foreground text-[10px] font-extrabold px-2 py-0.5 rounded-full">
            {count}
          </span>
        </div>

        <button
          onClick={() => onQuickAddTask(id)}
          title="Quick add task"
          className="w-6 h-6 rounded-lg bg-card/60 hover:bg-card border border-border/80 text-muted-foreground hover:text-gold-500 flex items-center justify-center transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="min-h-[420px] rounded-2xl flex-1 space-y-3">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.length === 0 ? (
            <div className="h-40 rounded-2xl border-2 border-dashed border-border/60 flex flex-col items-center justify-center text-muted-foreground/60 text-xs font-semibold p-4 text-center">
              <span>Drop task card here</span>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))
          )}
        </SortableContext>
      </div>
    </div>
  );
}

const dropAnimationConfig: DropAnimation = {
  sideEffects: defaultDropAnimationSideEffects({
    styles: {
      active: {
        opacity: "0.4",
      },
    },
  }),
};

export default function TaskKanban() {
  const [columns, setColumns] = useState<Columns>(initialTasks);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4, // 4px drag constraint for immediate responsiveness
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const findColumn = (id: string): string | null => {
    if (id in columns) return id;
    for (const [colId, tasks] of Object.entries(columns)) {
      if (tasks.some(t => t.id === id)) return colId;
    }
    return null;
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeId = active.id as string;
    
    // Find active task
    for (const tasks of Object.values(columns)) {
      const task = tasks.find(t => t.id === activeId);
      if (task) {
        setActiveTask(task);
        break;
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn || activeColumn === overColumn) {
      return;
    }

    setColumns((prev) => {
      const activeItems = prev[activeColumn];
      const overItems = prev[overColumn];

      const activeIndex = activeItems.findIndex(i => i.id === activeId);
      const overIndex = overItems.findIndex(i => i.id === overId);

      const movingItem = activeItems[activeIndex];
      if (!movingItem) return prev;

      let newIndex: number;
      if (overId in prev) {
        // We're at the root droppable of an empty or target column
        newIndex = overItems.length;
      } else {
        const isBelowOverItem =
          over &&
          active.rect.current.translated &&
          active.rect.current.translated.top > over.rect.top + over.rect.height;

        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length;
      }

      return {
        ...prev,
        [activeColumn]: activeItems.filter(i => i.id !== activeId),
        [overColumn]: [
          ...overItems.slice(0, newIndex),
          movingItem,
          ...overItems.slice(newIndex)
        ]
      };
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    const activeColumn = findColumn(activeId);
    const overColumn = findColumn(overId);

    if (!activeColumn || !overColumn) return;

    if (activeColumn === overColumn) {
      const items = columns[activeColumn];
      const activeIndex = items.findIndex(i => i.id === activeId);
      const overIndex = items.findIndex(i => i.id === overId);

      if (activeIndex !== overIndex && activeIndex !== -1 && overIndex !== -1) {
        setColumns((prev) => ({
          ...prev,
          [activeColumn]: arrayMove(prev[activeColumn], activeIndex, overIndex),
        }));
      }
    } else {
      const task = columns[overColumn]?.find(t => t.id === activeId);
      if (task) {
        toast.success(`Task Moved to ${overColumn.replace("_", " ")}!`, {
          description: `"${task.title}" milestone status updated across engineering board.`,
        });
      }
    }
  };

  const handleQuickAddTask = (columnId: string) => {
    const newTaskId = `t-${Date.now()}`;
    const newTask: Task = {
      id: newTaskId,
      title: "New Sovereign Deliverable Sprint Task",
      priority: "HIGH",
      assignee: "FA",
      dueDate: "Sep 22",
      project: "NexGen ERP Core",
      points: 5,
    };

    setColumns(prev => ({
      ...prev,
      [columnId]: [newTask, ...prev[columnId]]
    }));

    toast.success(`Task added to ${columnId.replace("_", " ")}!`);
  };

  return (
    <div className="glass rounded-3xl border border-border/80 p-5 sm:p-6 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
            Sprint Execution & Task Board
          </h3>
          <p className="text-xs text-muted-foreground">Drag and drop deliverables across sprint workflow stages</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Sprint 34 Active
          </span>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4 overflow-x-auto pb-4 pt-1 custom-scrollbar">
          {Object.keys(columns).map((status) => (
            <KanbanColumn 
              key={status} 
              id={status} 
              title={status.replace("_", " ")} 
              count={columns[status].length}
              tasks={columns[status]}
              onQuickAddTask={handleQuickAddTask}
            />
          ))}
        </div>

        <DragOverlay dropAnimation={dropAnimationConfig}>
          {activeTask ? <TaskCard task={activeTask} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
