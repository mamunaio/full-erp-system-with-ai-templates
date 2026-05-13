"use client";

import { cn } from "@/lib/utils";

const tasks = [
  { id: 1, name: "Project Initiation", start: 0, duration: 15, color: "bg-blue-500" },
  { id: 2, name: "Requirement Analysis", start: 10, duration: 25, color: "bg-injaazh-500" },
  { id: 3, name: "Design Phase", start: 30, duration: 20, color: "bg-purple-500" },
  { id: 4, name: "Backend Development", start: 45, duration: 35, color: "bg-emerald-500" },
  { id: 5, name: "Frontend Development", start: 50, duration: 30, color: "bg-amber-500" },
  { id: 6, name: "Testing & QA", start: 75, duration: 20, color: "bg-rose-500" },
];

const days = Array.from({ length: 31 }, (_, i) => i + 1);

export default function GanttChart() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h3 className="font-bold text-lg uppercase tracking-tighter italic">Project Timeline (Gantt)</h3>
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
           <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-white dark:bg-slate-900 shadow-sm">Month</button>
           <button className="px-4 py-1.5 text-xs font-bold text-slate-400">Quarter</button>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <div className="min-w-[1000px]">
          {/* Header */}
          <div className="flex border-b border-slate-100 dark:border-slate-800 pb-4">
             <div className="w-64 shrink-0 font-bold text-[10px] uppercase tracking-widest text-slate-400">Task Name</div>
             <div className="flex-1 flex justify-between px-2">
                {days.map(d => (
                  <div key={d} className="w-8 text-center text-[9px] font-bold text-slate-400">{d}</div>
                ))}
             </div>
          </div>

          {/* Grid Rows */}
          <div className="relative pt-4 space-y-4">
             {/* Vertical Grid Lines */}
             <div className="absolute left-64 top-0 w-[calc(100%-256px)] h-full flex justify-between pointer-events-none opacity-20">
                {days.map(d => (
                  <div key={d} className="w-px h-full bg-slate-200 dark:bg-slate-700" />
                ))}
             </div>

             {tasks.map(task => (
               <div key={task.id} className="flex items-center group">
                  <div className="w-64 shrink-0 pr-4">
                     <p className="text-sm font-bold text-slate-700 dark:text-slate-300 group-hover:text-injaazh-600 transition-colors truncate">{task.name}</p>
                  </div>
                  <div className="flex-1 relative h-8">
                     <div 
                        className={cn(
                          "absolute h-6 top-1 rounded-full shadow-lg shadow-black/5 flex items-center px-3 text-[9px] font-black text-white uppercase tracking-tighter transition-all hover:scale-[1.02]",
                          task.color
                        )}
                        style={{ 
                          left: `${(task.start / 100) * 100}%`, 
                          width: `${(task.duration / 100) * 100}%` 
                        }}
                     >
                        {task.duration} Days
                     </div>
                  </div>
               </div>
             ))}
          </div>

          {/* Today Indicator */}
          <div 
             className="absolute left-[45%] top-0 w-0.5 h-full bg-rose-500 z-10"
             title="Today: May 13"
          >
             <div className="absolute -top-2 -left-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-white dark:border-slate-900" />
          </div>
        </div>
      </div>
    </div>
  );
}
