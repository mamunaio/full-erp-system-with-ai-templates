"use client";

import { useState } from "react";
import { 
  Calendar, MessageSquare, Paperclip, MoreHorizontal, 
  Clock, CheckCircle2, Plus, GripVertical, Check, Sparkles,
  Layers, AlertCircle
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

export default function TaskKanban() {
  const [columns, setColumns] = useState<Columns>(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);
  const [dragOverTaskId, setDragOverTaskId] = useState<string | null>(null);

  // Helper to find which column a task belongs to
  const findTaskColumn = (taskId: string): string | null => {
    for (const [columnId, tasks] of Object.entries(columns)) {
      if (tasks.some(t => t.id === taskId)) return columnId;
    }
    return null;
  };

  // Drag start
  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
    setDraggedTaskId(taskId);
  };

  // Drag over column container
  const handleColumnDragOver = (e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (dragOverColumnId !== columnId) {
      setDragOverColumnId(columnId);
    }
  };

  // Drag over a specific card
  const handleCardDragOver = (e: React.DragEvent, taskId: string, columnId: string) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    setDragOverColumnId(columnId);
    setDragOverTaskId(taskId);
  };

  // Drag leave column
  const handleColumnDragLeave = (e: React.DragEvent, columnId: string) => {
    // Only reset if leaving the column element itself
    if (e.currentTarget === e.target) {
      setDragOverColumnId(null);
    }
  };

  // Handle drop on column or card
  const handleDrop = (e: React.DragEvent, targetColumnId: string, targetTaskId?: string) => {
    e.preventDefault();
    e.stopPropagation();

    const taskId = e.dataTransfer.getData("text/plain") || draggedTaskId;
    setDraggedTaskId(null);
    setDragOverColumnId(null);
    setDragOverTaskId(null);

    if (!taskId) return;

    const sourceColumnId = findTaskColumn(taskId);
    if (!sourceColumnId) return;

    const taskToMove = columns[sourceColumnId]?.find(t => t.id === taskId);
    if (!taskToMove) return;

    // Moving within the same column or across columns
    setColumns(prev => {
      const sourceList = [...prev[sourceColumnId]];
      const targetList = sourceColumnId === targetColumnId ? sourceList : [...prev[targetColumnId]];

      // Remove from source
      const filteredSource = sourceList.filter(t => t.id !== taskId);

      let updatedTargetList: Task[];

      if (sourceColumnId === targetColumnId) {
        // Reordering in same column
        if (targetTaskId && targetTaskId !== taskId) {
          const targetIndex = filteredSource.findIndex(t => t.id === targetTaskId);
          if (targetIndex !== -1) {
            filteredSource.splice(targetIndex, 0, taskToMove);
          } else {
            filteredSource.push(taskToMove);
          }
        } else {
          filteredSource.push(taskToMove);
        }
        return {
          ...prev,
          [sourceColumnId]: filteredSource,
        };
      } else {
        // Moving to another column
        if (targetTaskId) {
          const targetIndex = targetList.findIndex(t => t.id === targetTaskId);
          if (targetIndex !== -1) {
            targetList.splice(targetIndex, 0, taskToMove);
          } else {
            targetList.push(taskToMove);
          }
        } else {
          targetList.push(taskToMove);
        }

        return {
          ...prev,
          [sourceColumnId]: filteredSource,
          [targetColumnId]: targetList,
        };
      }
    });

    if (sourceColumnId !== targetColumnId) {
      toast.success(`Task Moved to ${targetColumnId.replace("_", " ")}!`, {
        description: `"${taskToMove.title}" status updated.`,
      });
    }
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
    setDragOverColumnId(null);
    setDragOverTaskId(null);
  };

  const handleQuickAddTask = (columnId: string) => {
    const newTaskId = `t-${Date.now()}`;
    const newTask: Task = {
      id: newTaskId,
      title: "New Sprint Execution Deliverable",
      priority: "HIGH",
      assignee: "FA",
      dueDate: "Sep 22",
      project: "NexGen Platform",
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
      {/* Header */}
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

      {/* Kanban Board Columns Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 pt-1 custom-scrollbar">
        {Object.keys(columns).map((columnId) => {
          const tasks = columns[columnId];
          const isColumnOver = dragOverColumnId === columnId;

          return (
            <div
              key={columnId}
              onDragOver={(e) => handleColumnDragOver(e, columnId)}
              onDragLeave={(e) => handleColumnDragLeave(e, columnId)}
              onDrop={(e) => handleDrop(e, columnId)}
              className={cn(
                "flex-1 min-w-[280px] max-w-[340px] glass rounded-3xl p-4 border shadow-md flex flex-col transition-all duration-200",
                isColumnOver 
                  ? "border-gold-500/80 bg-gold-500/10 ring-2 ring-gold-500/30" 
                  : "border-border/80"
              )}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50 px-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-xs uppercase tracking-wider text-foreground font-heading">
                    {columnId.replace("_", " ")}
                  </h3>
                  <span className="bg-accent/80 border border-border text-foreground text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                    {tasks.length}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickAddTask(columnId)}
                  title="Quick add task"
                  className="w-6 h-6 rounded-lg bg-card/60 hover:bg-card border border-border/80 text-muted-foreground hover:text-gold-500 flex items-center justify-center transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tasks List Container */}
              <div className="min-h-[420px] rounded-2xl flex-1 space-y-3">
                {tasks.length === 0 ? (
                  <div 
                    className={cn(
                      "h-40 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center text-xs font-semibold p-4 text-center transition-all",
                      isColumnOver 
                        ? "border-gold-500 bg-gold-500/10 text-gold-600 dark:text-gold-400" 
                        : "border-border/60 text-muted-foreground/60"
                    )}
                  >
                    <span>{isColumnOver ? "Drop card here" : "No tasks in this stage"}</span>
                  </div>
                ) : (
                  tasks.map((task) => {
                    const isDragging = draggedTaskId === task.id;
                    const isCardOver = dragOverTaskId === task.id;

                    return (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, task.id)}
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => handleCardDragOver(e, task.id, columnId)}
                        onDrop={(e) => handleDrop(e, columnId, task.id)}
                        className={cn(
                          "p-4 rounded-2xl bg-card border shadow-sm transition-all duration-150 space-y-3 select-none cursor-grab active:cursor-grabbing",
                          isDragging && "opacity-30 border-dashed border-gold-500 scale-95",
                          isCardOver && !isDragging && "border-t-4 border-t-gold-500 ring-1 ring-gold-500/30",
                          !isDragging && !isCardOver && "border-border/80 hover:border-gold-500/50 hover:shadow-md hover:-translate-y-0.5"
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
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
