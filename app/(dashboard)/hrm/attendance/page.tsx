"use client";

import { useState, useEffect } from "react";
import { CalendarDays, FileDown, UserCheck, Clock, UserX, Sun, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AttendanceCalendar from "../components/AttendanceCalendar";
import AttendanceList from "../components/AttendanceList";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Link from "next/link";

export default function AttendancePage() {
  const [stats, setStats] = useState({ present: 0, absent: 0, late: 0, onLeave: 0 });
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const fetchStats = async () => {
    try {
      const res = await fetch("/api/hrm/attendance");
      const data = await res.json();
      setStats(data);
    } catch (error) {
      console.error("Failed to fetch attendance stats", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [refreshKey]);

  const handleBulkCheckIn = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hrm/attendance/bulk", { method: "POST" });
      if (!res.ok) throw new Error();
      toast.success("Successfully checked-in all employees");
      setRefreshKey(prev => prev + 1);
    } catch (error) {
      toast.error("Failed to perform bulk check-in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link href="/hrm" className="group flex items-center text-sm font-medium text-slate-500 hover:text-injaazh-600 transition-colors mb-2">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to HRM
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Attendance Tracking
          </h1>
          <p className="text-slate-500 text-sm">
            Monitor daily logs, late arrivals, and calculate work hours.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-slate-200">
            <FileDown className="w-5 h-5 mr-2" /> Export Report
          </Button>
          <Button 
            onClick={handleBulkCheckIn}
            disabled={loading}
            className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20"
          >
            Bulk Check-in
          </Button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard icon={UserCheck} label="Present Today" value={loading ? "..." : stats.present} color="text-emerald-600" />
        <SummaryCard icon={UserX} label="Absent Today" value={loading ? "..." : stats.absent} color="text-rose-600" />
        <SummaryCard icon={Clock} label="Late Today" value={loading ? "..." : stats.late} color="text-amber-600" />
        <SummaryCard icon={Sun} label="On Leave" value={loading ? "..." : stats.onLeave} color="text-blue-600" />
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

function SummaryCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex items-center space-x-4 shadow-sm">
      <div className={cn("w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center", color)}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-bold mt-0.5">{value}</p>
      </div>
    </div>
  );
}
