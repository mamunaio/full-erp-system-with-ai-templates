import { Metadata } from "next";
import TaskKanban from "../components/TaskKanban";
import GanttChart from "../components/GanttChart";
import { 
  Users, Calendar, Briefcase, 
  ArrowLeft, Settings, Sparkles,
  PieChart, History, Clock,
  MoreVertical, CheckCircle2,
  CircleDashed, PlayCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Project Details | Injaazh ERP",
};

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex items-center justify-between">
        <Link href="/projects" className="group flex items-center text-sm font-medium text-slate-500 hover:text-injaazh-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-10"><Clock className="w-4 h-4 mr-2" /> Start Timer</Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-10"><Settings className="w-4 h-4 mr-2" /> Project Settings</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
           <div className="flex items-center space-x-3 mb-2">
              <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-600 text-[10px] font-black uppercase tracking-wider">Active</span>
              <span className="text-slate-400 text-xs flex items-center"><Briefcase className="w-3 h-3 mr-1" /> Meta Corp Inc.</span>
           </div>
           <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter italic uppercase">NexGen E-Commerce</h1>
        </div>

        <div className="flex items-center space-x-12 bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 shadow-sm">
           <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center text-sm font-black">65%</div>
              <div>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Progress</p>
                 <p className="text-sm font-black">42/65 Tasks</p>
              </div>
           </div>
           <div className="h-10 w-px bg-slate-100 dark:bg-slate-800" />
           <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Budget Used</p>
              <p className="text-sm font-black">$12,450 <span className="text-slate-300 font-medium">/ $25k</span></p>
           </div>
        </div>
      </div>

      <Tabs defaultValue="tasks" className="space-y-8">
        <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl h-14">
          <TabsTrigger value="overview" className="rounded-xl px-8 h-12 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 shadow-sm transition-all">Overview</TabsTrigger>
          <TabsTrigger value="tasks" className="rounded-xl px-8 h-12 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 shadow-sm transition-all">Tasks (Kanban)</TabsTrigger>
          <TabsTrigger value="gantt" className="rounded-xl px-8 h-12 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 shadow-sm transition-all">Gantt Chart</TabsTrigger>
          <TabsTrigger value="time" className="rounded-xl px-8 h-12 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 shadow-sm transition-all">Time Logs</TabsTrigger>
          <TabsTrigger value="ai" className="rounded-xl px-8 h-12 data-[state=active]:bg-injaazh-600 data-[state=active]:text-white shadow-lg transition-all flex items-center">
            <Sparkles className="w-4 h-4 mr-2" /> AI Health
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="outline-none">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                 <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <h3 className="font-bold mb-6 flex items-center">Project Milestones</h3>
                    <div className="space-y-8 relative">
                       <div className="absolute left-4 top-2 w-0.5 h-[calc(100%-16px)] bg-slate-100 dark:bg-slate-800 z-0" />
                       <MilestoneItem status="completed" title="Phase 1: Discovery & Planning" date="Mar 15, 2026" />
                       <MilestoneItem status="active" title="Phase 2: UI/UX & Backend Core" date="Apr 30, 2026" />
                       <MilestoneItem status="upcoming" title="Phase 3: Integration & Testing" date="May 31, 2026" />
                       <MilestoneItem status="upcoming" title="Phase 4: Launch & Handover" date="Jun 15, 2026" />
                    </div>
                 </div>
              </div>
              <div className="space-y-8">
                 <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                    <h3 className="font-bold mb-6">Project Team</h3>
                    <div className="space-y-4">
                       <TeamMember name="Alex Rivera" role="Project Manager" avatar="AR" />
                       <TeamMember name="Sarah Jenkins" role="Lead Designer" avatar="SJ" />
                       <TeamMember name="Mike Johnson" role="Fullstack Developer" avatar="MJ" />
                    </div>
                    <Button variant="outline" className="w-full mt-6 rounded-xl h-10 border-slate-100">Manage Team</Button>
                 </div>
              </div>
           </div>
        </TabsContent>

        <TabsContent value="tasks" className="outline-none">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold uppercase tracking-tighter italic">Kanban Board</h3>
              <div className="flex items-center space-x-2">
                 <Button size="sm" variant="outline" className="rounded-lg h-9">Group by Assignee</Button>
                 <Button size="sm" className="bg-injaazh-600 text-white rounded-lg h-9"><Plus className="w-4 h-4 mr-2" /> Add Task</Button>
              </div>
           </div>
           <TaskKanban />
        </TabsContent>

        <TabsContent value="gantt" className="outline-none">
           <GanttChart />
        </TabsContent>

        <TabsContent value="ai" className="outline-none">
           <div className="max-w-4xl mx-auto space-y-8">
              <div className="bg-gradient-to-tr from-injaazh-600 to-blue-700 rounded-[32px] p-12 text-white shadow-2xl relative overflow-hidden">
                 <div className="relative z-10 space-y-6">
                    <div className="flex items-center space-x-3 text-injaazh-200 font-bold uppercase tracking-widest text-xs">
                       <Sparkles className="w-5 h-5" /> AI Health Report
                    </div>
                    <div className="flex items-end space-x-4">
                       <h2 className="text-7xl font-black italic tracking-tighter">84</h2>
                       <p className="text-2xl font-bold text-injaazh-200 mb-2">/ 100 Health Score</p>
                    </div>
                    <div className="space-y-4 max-w-md">
                       <p className="text-injaazh-100 text-sm leading-relaxed">Project is generally healthy, but <span className="text-white font-bold">Phase 3</span> risk is high due to task dependencies. Burn rate is 12% higher than planned.</p>
                       <div className="grid grid-cols-2 gap-4">
                          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                             <p className="text-[10px] font-bold text-injaazh-200 uppercase mb-1">Timeline</p>
                             <p className="text-xs font-bold">On Track (92%)</p>
                          </div>
                          <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                             <p className="text-[10px] font-bold text-injaazh-200 uppercase mb-1">Risk Level</p>
                             <p className="text-xs font-bold text-amber-400">Moderate</p>
                          </div>
                       </div>
                    </div>
                    <Button className="bg-white text-injaazh-600 font-bold px-8 h-12 rounded-xl shadow-xl">Detailed Insights</Button>
                 </div>
                 <div className="absolute right-[-10%] top-[-10%] w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
              </div>
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function MilestoneItem({ status, title, date }: any) {
  return (
    <div className="flex items-start space-x-6 relative z-10">
      <div className={cn(
        "w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-lg",
        status === "completed" ? "bg-emerald-500 text-white" :
        status === "active" ? "bg-injaazh-600 text-white ring-4 ring-injaazh-100" : "bg-white dark:bg-slate-800 text-slate-300 border-2 border-slate-100 dark:border-slate-800"
      )}>
        {status === "completed" ? <CheckCircle2 className="w-5 h-5" /> : 
         status === "active" ? <PlayCircle className="w-5 h-5" /> : <CircleDashed className="w-5 h-5" />}
      </div>
      <div>
        <h4 className={cn("font-bold text-sm", status === "upcoming" && "text-slate-400")}>{title}</h4>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{date}</p>
      </div>
    </div>
  );
}

function TeamMember({ name, role, avatar }: any) {
  return (
    <div className="flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-full bg-injaazh-100 text-injaazh-600 flex items-center justify-center font-bold text-xs">{avatar}</div>
        <div>
           <p className="text-sm font-bold">{name}</p>
           <p className="text-[10px] text-slate-400 font-bold uppercase">{role}</p>
        </div>
      </div>
      <button className="text-slate-300 hover:text-slate-600"><MoreVertical className="w-4 h-4" /></button>
    </div>
  );
}

import { Plus } from "lucide-react";
