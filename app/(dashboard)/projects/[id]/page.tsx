"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Calendar, 
  Briefcase, 
  ArrowLeft, 
  Settings, 
  Sparkles,
  PieChart, 
  History, 
  Clock,
  MoreVertical, 
  CheckCircle2,
  CircleDashed, 
  PlayCircle,
  Plus,
  X,
  Loader2,
  Timer,
  Pause,
  StopCircle,
  Target,
  Trophy,
  ShieldAlert,
  Kanban,
  GanttChartSquare,
  FileText,
  Activity
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import TaskKanban from "../components/TaskKanban";
import GanttChart from "../components/GanttChart";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [mounted, setMounted] = useState(false);
  const [isTimerOpen, setIsTimerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!mounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex items-center justify-between">
        <Link href="/projects" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-blue-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
          <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={() => setIsTimerOpen(true)}
            variant="outline" 
            className="rounded-2xl h-12 px-6 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm active:scale-95 transition-all"
          >
            <Clock className="w-4 h-4 mr-2 text-blue-600" /> Start Timer
          </Button>
          <Button 
            onClick={() => setIsSettingsOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-12 px-8 font-black shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Settings className="w-4 h-4 mr-2" /> Project Settings
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
        <div className="space-y-3">
           <div className="flex items-center space-x-3">
              <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[8px] font-black uppercase tracking-[0.2em]">Active</span>
              <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] flex items-center">
                <Briefcase className="w-3.5 h-3.5 mr-2 text-slate-300" /> Meta Corp Inc.
              </span>
           </div>
           <h1 className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase leading-none">
             NexGen <span className="text-blue-600">E-Commerce</span>
           </h1>
        </div>

        <div className="flex items-center space-x-12 bg-white dark:bg-slate-900 p-8 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
           <div className="flex items-center space-x-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center relative">
                 <svg className="w-14 h-14 -rotate-90">
                    <circle cx="28" cy="28" r="24" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-slate-100 dark:text-slate-800" />
                    <circle cx="28" cy="28" r="24" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray="150" strokeDashoffset="52" className="text-blue-600" />
                 </svg>
                 <span className="absolute inset-0 flex items-center justify-center text-[10px] font-black">65%</span>
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Overall Progress</p>
                 <p className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">42/65 <span className="text-slate-400 font-bold">Tasks</span></p>
              </div>
           </div>
           <div className="h-12 w-px bg-slate-100 dark:bg-slate-800 relative z-10" />
           <div className="relative z-10">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Budget Used</p>
              <p className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">$12,450 <span className="text-slate-300 font-bold">/ $25k</span></p>
           </div>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-10">
        <TabsList className="bg-white dark:bg-slate-950 p-1.5 rounded-[32px] h-20 border border-slate-100 dark:border-slate-900 shadow-inner flex items-center overflow-x-auto no-scrollbar">
          <TabsTrigger value="overview" className="rounded-2xl px-10 h-16 text-[10px] font-black uppercase tracking-[0.1em] data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900 shadow-xl transition-all flex items-center group">
            <History className="w-4 h-4 mr-3 opacity-50 group-data-[state=active]:opacity-100" /> Overview
          </TabsTrigger>
          <TabsTrigger value="tasks" className="rounded-2xl px-10 h-16 text-[10px] font-black uppercase tracking-[0.1em] data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900 shadow-xl transition-all flex items-center group">
            <Kanban className="w-4 h-4 mr-3 opacity-50 group-data-[state=active]:opacity-100" /> Tasks (Kanban)
          </TabsTrigger>
          <TabsTrigger value="gantt" className="rounded-2xl px-10 h-16 text-[10px] font-black uppercase tracking-[0.1em] data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900 shadow-xl transition-all flex items-center group">
            <GanttChartSquare className="w-4 h-4 mr-3 opacity-50 group-data-[state=active]:opacity-100" /> Gantt Chart
          </TabsTrigger>
          <TabsTrigger value="time" className="rounded-2xl px-10 h-16 text-[10px] font-black uppercase tracking-[0.1em] data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900 shadow-xl transition-all flex items-center group">
            <Clock className="w-4 h-4 mr-3 opacity-50 group-data-[state=active]:opacity-100" /> Time Logs
          </TabsTrigger>
          <TabsTrigger value="ai" className="rounded-2xl px-10 h-16 text-[10px] font-black uppercase tracking-[0.1em] data-[state=active]:bg-blue-600 data-[state=active]:text-white shadow-xl transition-all flex items-center group">
            <Sparkles className="w-4 h-4 mr-3 opacity-50 group-data-[state=active]:opacity-100" /> AI Health Hub
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="outline-none">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                 <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
                    <div className="flex items-center justify-between mb-10">
                       <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase">Project Milestones</h3>
                       <Trophy className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="space-y-10 relative">
                       <div className="absolute left-6 top-2 w-0.5 h-[calc(100%-16px)] bg-slate-50 dark:bg-slate-800 z-0" />
                       <MilestoneItem status="completed" title="Phase 1: Discovery & Planning" date="Mar 15, 2026" desc="Requirements finalized and signed off by client." />
                       <MilestoneItem status="active" title="Phase 2: UI/UX & Backend Core" date="Apr 30, 2026" desc="Currently developing the core API infrastructure." />
                       <MilestoneItem status="upcoming" title="Phase 3: Integration & Testing" date="May 31, 2026" desc="QA and integration with third-party systems." />
                       <MilestoneItem status="upcoming" title="Phase 4: Launch & Handover" date="Jun 15, 2026" desc="Final production deployment and documentation." />
                    </div>
                 </div>
              </div>
              <div className="space-y-8">
                 <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                       <h3 className="text-xl font-black tracking-tight italic uppercase">Project Team</h3>
                       <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="space-y-6">
                       <TeamMember name="Alex Rivera" role="Project Manager" avatar="AR" />
                       <TeamMember name="Sarah Jenkins" role="Lead Designer" avatar="SJ" />
                       <TeamMember name="Mike Johnson" role="Fullstack Developer" avatar="MJ" />
                    </div>
                    <Button variant="outline" className="w-full mt-10 rounded-2xl h-14 border-slate-100 dark:border-slate-800 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800">Manage Team</Button>
                 </div>

                 <div className="bg-slate-950 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                    <Target className="w-8 h-8 mb-6 text-blue-400" />
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50 mb-2">Project Goal</h4>
                    <p className="text-xl font-bold leading-tight italic">Scale to 1M daily active users with sub-100ms latency.</p>
                 </div>
              </div>
           </div>
        </TabsContent>

        <TabsContent value="tasks" className="outline-none">
           <div className="flex items-center justify-between mb-10">
              <h3 className="text-3xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">Kanban <span className="text-blue-600">Board</span></h3>
              <div className="flex items-center space-x-3">
                 <Button variant="outline" className="rounded-xl h-12 px-6 font-bold text-xs">Group by Status</Button>
                 <Button className="bg-blue-600 text-white rounded-xl h-12 px-8 font-black"><Plus className="w-5 h-5 mr-2" /> ADD TASK</Button>
              </div>
           </div>
           <TaskKanban />
        </TabsContent>

        <TabsContent value="gantt" className="outline-none">
           <GanttChart />
        </TabsContent>

        <TabsContent value="time" className="outline-none">
           <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-3xl font-black uppercase tracking-tighter italic text-slate-900 dark:text-white">Time <span className="text-blue-600">Logs</span></h3>
                 <div className="flex items-center space-x-6">
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Billable</p>
                       <p className="text-xl font-black">124.5 Hours</p>
                    </div>
                    <Button variant="outline" className="rounded-xl h-12 px-6 font-bold text-xs uppercase tracking-widest"><FileText className="w-4 h-4 mr-2" /> Export Log</Button>
                 </div>
              </div>
              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 dark:border-slate-800">
                          <th className="pb-6">Employee</th>
                          <th className="pb-6">Task Description</th>
                          <th className="pb-6">Date</th>
                          <th className="pb-6">Duration</th>
                          <th className="pb-6 text-right">Status</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                       <TimeLogRow name="Alex Rivera" task="Database Optimization" date="May 12, 2026" duration="4.5h" status="Approved" />
                       <TimeLogRow name="Sarah Jenkins" task="Landing Page UI" date="May 11, 2026" duration="6.2h" status="Approved" />
                       <TimeLogRow name="Mike Johnson" task="API Integration" date="May 10, 2026" duration="3.8h" status="Pending" />
                    </tbody>
                 </table>
              </div>
           </div>
        </TabsContent>

        <TabsContent value="ai" className="outline-none">
           <div className="max-w-5xl mx-auto space-y-8">
              <div className="bg-slate-950 rounded-[48px] p-16 text-white shadow-2xl relative overflow-hidden group border border-blue-500/20">
                 <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
                 <div className="relative z-10 flex flex-col md:flex-row gap-16 items-center">
                    <div className="shrink-0 relative">
                       <div className="w-48 h-48 rounded-full border-8 border-blue-600/20 flex items-center justify-center relative">
                          <svg className="w-44 h-44 -rotate-90">
                             <circle cx="88" cy="88" r="80" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-white/5" />
                             <circle cx="88" cy="88" r="80" fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray="502" strokeDashoffset="80" className="text-blue-500" strokeLinecap="round" />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                             <span className="text-6xl font-black italic tracking-tighter">84</span>
                             <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Health Score</span>
                          </div>
                       </div>
                    </div>
                    <div className="flex-1 space-y-8 text-center md:text-left">
                       <div className="flex items-center space-x-3 text-blue-400 font-black uppercase tracking-[0.3em] text-xs justify-center md:justify-start">
                          <Activity className="w-5 h-5" /> AI Diagnostic Pulse
                       </div>
                       <h2 className="text-4xl font-black italic tracking-tighter leading-none">Project Health is <span className="text-blue-500 underline decoration-blue-500/30">Optimal</span> but requires Attention.</h2>
                       <p className="text-slate-400 text-lg font-medium leading-relaxed max-w-xl">Current burnout risk for <span className="text-white font-black">Backend Team</span> is rising. AI suggests reallocating 2 tasks from Sarah to Alex to stabilize the timeline.</p>
                       <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                          <AIStatItem label="Predictive Delay" value="2.4 Days" color="text-amber-500" />
                          <AIStatItem label="Resource Load" value="82%" color="text-blue-500" />
                          <AIStatItem label="Cost Variance" value="+4.2%" color="text-rose-500" />
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </TabsContent>
      </Tabs>

      {/* Modals are already implemented in previous turn */}
    </div>
  );
}

function MilestoneItem({ status, title, date, desc }: any) {
  return (
    <div className="flex items-start space-x-8 relative z-10 group">
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xl transition-all duration-500 group-hover:scale-110",
        status === "completed" ? "bg-emerald-500 text-white shadow-emerald-500/20" :
        status === "active" ? "bg-blue-600 text-white ring-8 ring-blue-600/10 shadow-blue-600/20" : "bg-white dark:bg-slate-800 text-slate-300 border-2 border-slate-50 dark:border-slate-800"
      )}>
        {status === "completed" ? <CheckCircle2 className="w-6 h-6" /> : 
         status === "active" ? <PlayCircle className="w-6 h-6" /> : <CircleDashed className="w-6 h-6" />}
      </div>
      <div>
        <h4 className={cn("font-black text-xl tracking-tight italic uppercase", status === "upcoming" ? "text-slate-400" : "text-slate-900 dark:text-white")}>{title}</h4>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 mb-2">{date}</p>
        <p className="text-xs font-medium text-slate-500 leading-relaxed max-w-md">{desc}</p>
      </div>
    </div>
  );
}

function TeamMember({ name, role, avatar }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer group">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center font-black text-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">{avatar}</div>
        <div>
           <p className="font-black text-slate-900 dark:text-white leading-none mb-1">{name}</p>
           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{role}</p>
        </div>
      </div>
      <button className="text-slate-300 hover:text-slate-600 p-2"><MoreVertical className="w-5 h-5" /></button>
    </div>
  );
}

function TimeLogRow({ name, task, date, duration, status }: any) {
  return (
    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
       <td className="py-6 flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black">JD</div>
          <span className="font-bold text-sm">{name}</span>
       </td>
       <td className="py-6 text-sm font-medium text-slate-500">{task}</td>
       <td className="py-6 text-sm text-slate-400">{date}</td>
       <td className="py-6 font-black text-sm">{duration}</td>
       <td className="py-6 text-right">
          <span className={cn(
             "px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border",
             status === "Approved" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"
          )}>{status}</span>
       </td>
    </tr>
  );
}

function AIStatItem({ label, value, color }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-md p-4 rounded-2xl border border-white/5 text-center md:text-left">
       <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">{label}</p>
       <p className={cn("text-lg font-black italic", color)}>{value}</p>
    </div>
  );
}
