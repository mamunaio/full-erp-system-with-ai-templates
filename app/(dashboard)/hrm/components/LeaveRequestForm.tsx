"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LeaveRequestForm() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Leave Type</label>
          <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none transition-all appearance-none">
            <option>Annual Leave</option>
            <option>Sick Leave</option>
            <option>Casual Leave</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Urgency</label>
          <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none transition-all appearance-none">
            <option>Normal</option>
            <option>Urgent</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">From Date</label>
          <input type="date" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none transition-all" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">To Date</label>
          <input type="date" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none transition-all" />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Reason for Leave</label>
        <textarea 
          placeholder="Describe your reason..."
          className="w-full h-32 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none transition-all resize-none"
        />
      </div>

      <Button className="w-full bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-12 font-bold shadow-lg shadow-injaazh-600/20">
        Submit Request
      </Button>
    </div>
  );
}
