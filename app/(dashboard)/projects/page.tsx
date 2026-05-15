"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  LayoutGrid, 
  List, 
  MoreHorizontal, 
  Users, 
  Calendar, 
  Briefcase,
  ArrowLeft,
  X,
  Loader2,
  TrendingUp,
  BarChart3,
  CheckCircle2,
  Clock,
  Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProjectsPage() {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      toast.success("New Project Initialized!", {
        description: "Assigned to Strategy Team Alpha.",
      });
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/dashboard" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-blue-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to App Dashboard
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Project <span className="text-blue-600">Management</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Track budgets, tasks, and team productivity across all active projects.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-2xl h-14 px-5 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm active:scale-95 transition-all">
            <LayoutGrid className="w-5 h-5 text-slate-400" />
          </Button>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5 mr-3" /> Start New Project
          </Button>
        </div>
      </div>

      {/* Project Analytics Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <ProjectStatsCard label="Total Projects" value="24" change="+3" icon={Briefcase} color="text-blue-600" bg="bg-blue-50 dark:bg-blue-900/20" />
        <ProjectStatsCard label="Active Tasks" value="142" change="+12" icon={CheckCircle2} color="text-emerald-600" bg="bg-emerald-50 dark:bg-emerald-900/20" />
        <ProjectStatsCard label="Budget Utilization" value="68%" change="+5%" icon={TrendingUp} color="text-indigo-600" bg="bg-indigo-50 dark:bg-indigo-900/20" />
        <ProjectStatsCard label="Overdue Tasks" value="8" change="-2" icon={Clock} color="text-rose-600" bg="bg-rose-50 dark:bg-rose-900/20" isNegative={true} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-6">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search projects by name, client or manager..."
            className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all shadow-sm"
          />
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-xl h-12 px-6 border-slate-200 dark:border-slate-800 font-bold text-xs uppercase tracking-widest bg-white dark:bg-slate-900">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ProjectCard index={1} title="NexGen E-Commerce" client="Meta Corp Inc." status="ACTIVE" progress={65} />
        <ProjectCard index={2} title="Global ERP Rollout" client="Tesla Cloud" status="PLANNING" progress={0} />
        <ProjectCard index={3} title="Brand Identity 2026" client="SpaceX Systems" status="COMPLETED" progress={100} />
      </div>

      {/* New Project Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl bg-white dark:bg-slate-950">
          <div className="bg-slate-950 p-10 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-600/20 text-white">P</div>
                <div>
                   <h2 className="text-3xl font-black tracking-tight">Start New Project</h2>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Initialize Project Lifecycle</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="rounded-full text-slate-500 hover:text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={handleCreateProject} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Project Name</Label>
                  <Input required placeholder="e.g. Injaazh Mobile App" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Client Name</Label>
                  <Input required placeholder="Search client..." className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Project Manager</Label>
                    <Input required placeholder="Assign manager..." className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Target Deadline</Label>
                    <Input required type="date" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5" />
                 </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-[24px] bg-blue-600 hover:bg-blue-500 text-white font-black shadow-2xl shadow-blue-600/40 text-lg tracking-tight active:scale-[0.98] transition-all"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> SYNCHRONIZING...</>
                  ) : (
                    "INITIALIZE PROJECT ECOSYSTEM"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ProjectStatsCard({ label, value, change, icon: Icon, color, bg, isNegative }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm group hover:shadow-2xl transition-all duration-500 cursor-pointer relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", bg)}>
          <Icon className={cn("w-7 h-7", color)} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
         <div className={cn("flex items-center text-[10px] font-black px-2 py-1 rounded-lg", isNegative ? "text-rose-600 bg-rose-50 dark:bg-rose-900/20" : "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20")}>
            {change}
         </div>
         <div className="w-24 h-1.5 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
            <div className={cn("h-full rounded-full", color.replace("text-", "bg-"))} style={{ width: '65%' }} />
         </div>
      </div>
    </div>
  );
}

function ProjectCard({ index, title, client, status, progress }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
      <div className="flex justify-between items-start mb-8">
        <div className={cn(
          "px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-[0.2em] border",
          status === "ACTIVE" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
          status === "PLANNING" ? "bg-blue-50 text-blue-600 border-blue-100" : "bg-slate-50 text-slate-400 border-slate-100"
        )}>
          {status}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-slate-300 hover:text-slate-600">
           <MoreHorizontal className="w-5 h-5" />
        </Button>
      </div>

      <Link href={`/projects/${index}`}>
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors tracking-tight">
          {title}
        </h3>
      </Link>
      <p className="text-sm font-bold text-slate-500 mb-8 flex items-center">
        <Target className="w-4 h-4 mr-2 text-slate-300" /> {client}
      </p>

      <div className="space-y-6">
        <div>
           <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">
              <span>Overall Progress</span>
              <span className="text-slate-900 dark:text-white">{progress}%</span>
           </div>
           <div className="h-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 rounded-full overflow-hidden p-0.5">
              <div 
                className={cn(
                  "h-full rounded-full transition-all duration-1000",
                  progress === 100 ? "bg-emerald-500" : "bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                )} 
                style={{ width: `${progress}%` }} 
              />
           </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-slate-50 dark:border-slate-800">
           <div className="flex -space-x-3">
              {[1, 2, 3].map(a => (
                <div key={a} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 flex items-center justify-center text-[10px] font-black text-slate-600">JD</div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-900 bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">+2</div>
           </div>
           <div className="flex flex-col items-end">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Deadline</p>
              <div className="flex items-center text-[11px] font-black text-slate-900 dark:text-white">
                <Calendar className="w-3.5 h-3.5 mr-2 text-blue-600" /> May 30
              </div>
           </div>
        </div>
      </div>
      
      {/* Subtle Background Accent */}
      <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />
    </div>
  );
}
