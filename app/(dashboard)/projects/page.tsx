"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Plus, Search, Filter, Users, Calendar, Briefcase,
  ArrowLeft, X, Loader2, TrendingUp, CheckCircle2, Clock, Target,
  Sparkles, MoreHorizontal
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import AICommandBar from "@/components/dashboard/AICommandBar";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import KPICard from "@/components/dashboard/KPICard";
import TaskWidget from "@/components/dashboard/TaskWidget";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const projectSuggestions = [ "Project timeline status", "Budget utilization", "Resource allocation", "Risk assessment" ];

const projectAlerts = [
  { id: "1", severity: "critical" as const, title: "Project Delay Risk", description: "NexGen E-Commerce 2 weeks behind schedule — resource gap detected.", time: "1h ago" },
  { id: "2", severity: "warning" as const, title: "Budget Overrun", description: "Global ERP Rollout 15% over budget at current burn rate.", time: "3h ago" },
  { id: "3", severity: "info" as const, title: "Milestone Completed", description: "Brand Identity 2026 — all deliverables approved by client.", time: "5h ago" },
  { id: "4", severity: "warning" as const, title: "Resource Conflict", description: "2 projects competing for same senior developer resource.", time: "7h ago" },
  { id: "5", severity: "info" as const, title: "New Project Approved", description: "Smart Factory Automation project greenlit for Q4.", time: "10h ago" },
];

const tasks = [
  { id: "1", title: "Approve Q2 Financials", priority: "HIGH", projectName: "NexGen E-Commerce", dueDate: null, createdAt: new Date(Date.now() - 120 * 60000).toISOString() },
  { id: "2", title: "API Documentation Update", priority: "MEDIUM", projectName: "Global ERP Rollout", dueDate: null, createdAt: new Date(Date.now() - 300 * 60000).toISOString() },
  { id: "3", title: "Client Presentation Prep", priority: "HIGH", projectName: "Brand Identity 2026", dueDate: null, createdAt: new Date(Date.now() - 600 * 60000).toISOString() },
  { id: "4", title: "Code Review Sprint", priority: "MEDIUM", projectName: "Smart Factory", dueDate: null, createdAt: new Date(Date.now() - 1440 * 60000).toISOString() },
];

export default function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-xl border-2 border-gold-500/20" />
            <div className="absolute inset-0 rounded-xl border-2 border-transparent border-t-gold-500 animate-spin" />
            <div className="absolute inset-1 rounded-lg bg-gold-500/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
            </div>
          </div>
          <span className="text-sm text-muted-foreground font-medium">Loading Projects...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 pb-8 max-w-[1600px] mx-auto">
      <motion.div variants={fadeUp}>
        <div className="bg-card/40 backdrop-blur-2xl rounded-2xl border border-border p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-500/5 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gold-500/5 blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Projects Online</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-heading">
                Project <span className="text-gold-400">Management</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Track budgets, tasks, and team productivity across all active projects.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-[20px] h-14 px-10 shadow-lg shadow-gold-500/20 font-bold uppercase tracking-tight transition-all active:scale-95"
              >
                <Plus className="w-5 h-5 mr-3" /> Start New Project
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AICommandBar suggestions={projectSuggestions} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Total Projects" value="24" change="+3" trend="up" icon={Briefcase} sparkline={[16, 18, 19, 20, 21, 23, 24]} />
          <KPICard title="Active Tasks" value="142" change="+12" trend="up" icon={CheckCircle2} sparkline={[95, 105, 115, 120, 130, 138, 142]} />
          <KPICard title="Budget Utilization" value="68%" change="+5%" trend="up" icon={TrendingUp} sparkline={[55, 58, 60, 62, 65, 66, 68]} />
          <KPICard title="Overdue Tasks" value="8" change="-2" trend="down" icon={Clock} sparkline={[12, 11, 11, 10, 9, 9, 8]} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:break-inside-avoid [&>*]:mb-4">
          <div>
            <TaskWidget data={tasks} />
          </div>
          <div>
            <SmartAlerts data={projectAlerts} />
          </div>
          <div className="space-y-4">
            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Active Projects</h3>
              <div className="space-y-3">
                <ProjectCard index={1} title="NexGen E-Commerce" client="Meta Corp Inc." status="ACTIVE" progress={65} />
                <ProjectCard index={2} title="Global ERP Rollout" client="Tesla Cloud" status="PLANNING" progress={0} />
                <ProjectCard index={3} title="Brand Identity 2026" client="SpaceX Systems" status="COMPLETED" progress={100} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* New Project Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl">
          <div className="bg-obsidian-900 p-10 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center font-black text-2xl shadow-lg shadow-gold-500/20 text-obsidian-900">P</div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">Start New Project</h2>
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1">Initialize Project Lifecycle</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="rounded-full text-muted-foreground hover:text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleCreateProject} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Project Name</Label>
                  <Input required placeholder="e.g. Injaazh Mobile App" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-gold-500 focus:border-gold-500 text-white font-medium px-5" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Client Name</Label>
                  <Input required placeholder="Search client..." className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-gold-500 focus:border-gold-500 text-white font-medium px-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Project Manager</Label>
                  <Input required placeholder="Assign manager..." className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-gold-500 focus:border-gold-500 text-white font-medium px-5" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Target Deadline</Label>
                  <Input required type="date" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-gold-500 focus:border-gold-500 text-white font-medium px-5" />
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-[24px] bg-gold-500 hover:bg-gold-600 text-obsidian-900 font-black shadow-2xl shadow-gold-500/40 text-lg tracking-tight active:scale-[0.98] transition-all"
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
    </motion.div>
  );
}

function ProjectCard({ index, title, client, status, progress }: any) {
  return (
    <div className="p-4 rounded-xl bg-gold-500/5 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/20 transition-all group">
      <div className="flex items-start justify-between mb-3">
        <span className={cn(
          "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
          status === "ACTIVE" ? "bg-emerald-500/15 text-emerald-400" :
          status === "PLANNING" ? "bg-blue-500/15 text-blue-400" : "text-muted-foreground bg-card/50"
        )}>{status}</span>
        <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
      </div>
      <Link href={`/projects/${index}`}>
        <h4 className="text-base font-bold text-card-foreground group-hover:text-gold-400 transition-colors mb-1">{title}</h4>
      </Link>
      <p className="text-[10px] text-muted-foreground mb-4 flex items-center">
        <Target className="w-3 h-3 mr-1" /> {client}
      </p>
      <div className="flex justify-between text-[10px] text-muted-foreground mb-2">
        <span className="font-semibold uppercase tracking-widest">Progress</span>
        <span className="font-bold">{progress}%</span>
      </div>
      <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all", progress === 100 ? "bg-gold-500" : "bg-gold-500/70")} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
