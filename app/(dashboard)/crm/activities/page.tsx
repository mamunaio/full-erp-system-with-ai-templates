import { Metadata } from "next";
import ActivityTimeline from "../components/ActivityTimeline";
import { Plus, Calendar, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Activities | Injaazh ERP",
};

export default function ActivitiesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Activity Timeline
          </h1>
          <p className="text-slate-500 text-sm">
            Keep track of all interactions with your contacts.
          </p>
        </div>
        <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
          <Plus className="w-5 h-5 mr-2" /> Log Activity
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent History</h2>
            <Button variant="ghost" size="sm" className="text-slate-500">
              <Filter className="w-4 h-4 mr-2" /> Filter by Type
            </Button>
          </div>
          <ActivityTimeline />
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400 mb-6 flex items-center">
              <Clock className="w-4 h-4 mr-2" /> Today&apos;s Schedule
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                <div className="mt-1 w-2 h-2 rounded-full bg-blue-500" />
                <div>
                  <p className="text-sm font-bold text-blue-700 dark:text-blue-300">Call with Meta Corp</p>
                  <p className="text-[10px] text-blue-600/70">2:00 PM - 2:30 PM</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30">
                <div className="mt-1 w-2 h-2 rounded-full bg-emerald-500" />
                <div>
                  <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300">Requirement Meeting</p>
                  <p className="text-[10px] text-emerald-600/70">4:30 PM - 5:30 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-tr from-injaazh-600 to-blue-700 rounded-2xl p-6 text-white shadow-xl shadow-injaazh-600/20 relative overflow-hidden">
            <h3 className="font-bold text-lg mb-2 relative z-10">AI Follow-up Suggestion</h3>
            <p className="text-sm text-white/80 leading-relaxed relative z-10">
              You haven&apos;t contacted <span className="font-bold text-white">Sarah Connor</span> in 14 days. She was very interested in the proposal last month.
            </p>
            <Button className="w-full mt-4 bg-white/20 hover:bg-white/30 border-white/20 text-white font-bold rounded-xl h-10 relative z-10">
              Draft Email
            </Button>
            <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-white/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
