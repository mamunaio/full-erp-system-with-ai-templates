"use client";

import { useState } from "react";
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent
} from "@dnd-kit/core";
import { 
  arrayMove, 
  SortableContext, 
  sortableKeyboardCoordinates, 
  verticalListSortingStrategy 
} from "@dnd-kit/sortable";
import KanbanColumn from "@/app/(dashboard)/crm/components/KanbanColumn";
import LeadCard from "@/app/(dashboard)/crm/components/LeadCard";

// Note: Reusing CRM components with task data for consistency
const initialTasks: any = {
  "TODO": [
    { id: "t1", title: "Design Landing Page", priority: "HIGH", assignee: "AR", dueDate: "May 20" },
    { id: "t2", title: "Setup Database Schema", priority: "CRITICAL", assignee: "MJ", dueDate: "May 18" },
  ],
  "IN_PROGRESS": [
    { id: "t3", title: "API Integration", priority: "MEDIUM", assignee: "SK", dueDate: "May 22" },
  ],
  "REVIEW": [
    { id: "t4", title: "User Authentication", priority: "HIGH", assignee: "AR", dueDate: "May 15" },
  ],
  "DONE": [
    { id: "t5", title: "Project Setup", priority: "LOW", assignee: "MJ", dueDate: "May 10" },
  ],
};

export default function TaskKanban() {
  const [columns, setColumns] = useState(initialTasks);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={(e) => setActiveId(e.active.id as string)}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-6 overflow-x-auto pb-8 h-[calc(100vh-350px)] min-h-[500px]">
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
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Logic to move between columns...
    // Reusing the same pattern as CRM Kanban
    setActiveId(null);
  }
}

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, MessageSquare, Paperclip, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

function TaskCard({ task }: any) {
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
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group cursor-grab active:cursor-grabbing"
    >
      <div className="flex justify-between items-start mb-3">
        <span className={cn(
          "px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest",
          task.priority === "CRITICAL" ? "bg-rose-100 text-rose-600" :
          task.priority === "HIGH" ? "bg-orange-100 text-orange-600" : "bg-blue-100 text-blue-600"
        )}>
          {task.priority}
        </span>
        <button className="text-slate-300 hover:text-slate-600 transition-colors">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>
      
      <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-4 leading-tight">
        {task.title}
      </h4>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 text-slate-400">
           <div className="flex items-center space-x-1"><MessageSquare className="w-3 h-3" /><span className="text-[10px]">3</span></div>
           <div className="flex items-center space-x-1"><Paperclip className="w-3 h-3" /><span className="text-[10px]">1</span></div>
        </div>
        <div className="flex items-center space-x-2">
           <div className="flex items-center text-[10px] font-bold text-slate-500">
              <Calendar className="w-3 h-3 mr-1" /> {task.dueDate}
           </div>
           <div className="w-6 h-6 rounded-full bg-injaazh-100 text-injaazh-600 flex items-center justify-center text-[9px] font-black border-2 border-white dark:border-slate-900">
              {task.assignee}
           </div>
        </div>
      </div>
    </div>
  );
}
