"use client";

import { useState, useEffect } from "react";
import { CalendarDays, FileDown, UserCheck, Clock, UserX, Sun, ArrowLeft, TrendingUp, TrendingDown, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import AttendanceCalendar from "../components/AttendanceCalendar";
import AttendanceList from "../components/AttendanceList";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

export default function AttendancePage() {
  const [stats, setStats] = useState({ present: 1, absent: 0, late: 0, onLeave: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    // Simulated fetch
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [refreshKey]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/hrm" className="group flex items-center text-xs font-bold text-slate-400 hover:text-injaazh-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            BACK TO DASHBOARD
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Attendance <span className="text-injaazh-600">Tracking</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Monitor daily logs, late arrivals, and calculate work hours.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-2xl h-14 px-8 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm">
            <FileDown className="w-5 h-5 mr-3 text-slate-400" /> Export Report
          </Button>
          <Button 
            className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-injaazh-600/20 active:scale-95 transition-all"
          >
            Bulk Check-in
          </Button>
        </div>
      </div>

      {/* Summary Row - Matches Payroll Style */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <AttendanceSummaryCard icon={UserCheck} label="Present Today" value="1" subValue="92% of total staff" color="text-emerald-600" bgColor="bg-emerald-50 dark:bg-emerald-900/20" />
        <AttendanceSummaryCard icon={UserX} label="Absent Today" value="0" subValue="No unexcused absences" color="text-rose-600" bgColor="bg-rose-50 dark:bg-rose-900/20" />
        <AttendanceSummaryCard icon={Clock} label="Late Today" value="0" subValue="Avg delay: 12 mins" color="text-amber-600" bgColor="bg-amber-50 dark:bg-amber-900/20" />
        <AttendanceSummaryCard icon={Sun} label="On Leave" value="0" subValue="Next return: Tomorrow" color="text-blue-600" bgColor="bg-blue-50 dark:bg-blue-900/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
           <AttendanceList onUpdate={() => setRefreshKey(prev => prev + 1)} />
        </div>
        <div>
           <AttendanceCalendar />
        </div>
      </div>
    </div>
  );
}

function AttendanceSummaryCard({ icon: Icon, label, value, subValue, color, bgColor }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-500", bgColor)}>
          <Icon className={cn("w-7 h-7", color)} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className={cn("text-3xl font-black tracking-tight", color)}>{value}</p>
        </div>
      </div>
      <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-tight">
        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
        {subValue}
      </div>
    </div>
  );
}
