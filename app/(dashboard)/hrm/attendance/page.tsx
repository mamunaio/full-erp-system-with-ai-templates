import { Metadata } from "next";
import { CalendarDays, FileDown, UserCheck, Clock, UserX, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import AttendanceCalendar from "../components/AttendanceCalendar";

export const metadata: Metadata = {
  title: "Attendance | Injaazh ERP",
};

export default function AttendancePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
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
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
            Bulk Check-in
          </Button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SummaryCard icon={UserCheck} label="Present Today" value="138" color="text-emerald-600" />
        <SummaryCard icon={UserX} label="Absent Today" value="5" color="text-rose-600" />
        <SummaryCard icon={Clock} label="Late Today" value="3" color="text-amber-600" />
        <SummaryCard icon={Sun} label="On Leave" value="10" color="text-blue-600" />
      </div>

      <AttendanceCalendar />
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

// Added this to fix the 'cn' not found error in this file
import { cn } from "@/lib/utils";
