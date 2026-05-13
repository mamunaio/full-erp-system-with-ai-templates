"use client";

import { cn } from "@/lib/utils";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AttendanceCalendar() {
  const today = new Date();
  const daysInMonth = 31; // Simplified
  
  const getStatusColor = (day: number) => {
    if (day === 5 || day === 12 || day === 19 || day === 26) return "bg-slate-100 text-slate-400"; // Weekends
    if (day === 3 || day === 8) return "bg-rose-100 text-rose-600 border-rose-200"; // Absent
    if (day === 10 || day === 15) return "bg-amber-100 text-amber-600 border-amber-200"; // Late
    return "bg-emerald-100 text-emerald-600 border-emerald-200"; // Present
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold">Attendance - May 2026</h3>
        <div className="flex items-center space-x-4 text-[10px] font-bold uppercase tracking-widest">
          <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-emerald-500 mr-1.5"/> Present</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-rose-500 mr-1.5"/> Absent</div>
          <div className="flex items-center"><div className="w-3 h-3 rounded-full bg-amber-500 mr-1.5"/> Late</div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map(d => (
          <div key={d} className="text-center text-[10px] font-bold text-slate-400 py-2">{d}</div>
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => (
          <div 
            key={i} 
            className={cn(
              "h-14 rounded-xl border flex flex-col items-center justify-center space-y-1 transition-all hover:scale-105 cursor-pointer",
              getStatusColor(i + 1)
            )}
          >
            <span className="text-xs font-bold">{i + 1}</span>
            <span className="text-[8px] font-bold uppercase opacity-60">
              {i === 5 || i === 12 || i === 19 || i === 26 ? "OFF" : "9:00 AM"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
