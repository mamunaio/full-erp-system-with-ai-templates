"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase, Users, Calendar, Target, TrendingUp,
  Plus, Search, Filter, CheckCircle2, Clock, AlertTriangle,
  FileSpreadsheet, ArrowRight, ChevronRight, Sparkles,
  Layers, ShieldCheck, Activity, FolderKanban
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import TaskKanban from "./components/TaskKanban";

const projectMetrics = [
  { label: "Active Project Portfolio", value: "12 Programs", change: "88.4% On-Track", sub: "3 Releasing this Month" },
  { label: "Total Allocated Budget", value: "$1,850,000", change: "67% Burn", sub: "$1.24M Utilized to Date" },
  { label: "Active Sprint Tasks", value: "148 Items", change: "Sprint 34", sub: "42 Story Points / Week" },
  { label: "Engineering Velocity", value: "96.2%", change: "+4.1%", sub: "SLA Commitment Fulfilled" },
];

const portfolioProjects = [
  { id: "P1", name: "NexGen Cloud ERP 2.0 Core", client: "Internal Core Platform", budget: "$450,000", spent: "$350,000", progress: 78, lead: "Farhan Ahmed", team: 12, status: "ON_TRACK", deadline: "Oct 15, 2026" },
  { id: "P2", name: "Meta Multi-Tenant Connect & SSO", client: "Meta Corp Systems", budget: "$280,000", spent: "$258,000", progress: 92, lead: "Nusrat Jahan", team: 8, status: "FINAL_REVIEW", deadline: "Sep 20, 2026" },
  { id: "P3", name: "Tesla Energy IoT Telemetry Ingestion", client: "Tesla Energy", budget: "$320,000", spent: "$204,000", progress: 64, lead: "Zubair Rahman", team: 10, status: "ON_TRACK", deadline: "Nov 05, 2026" },
  { id: "P4", name: "SpaceX Ground Logistics Control Node", client: "SpaceX Aerospace", budget: "$500,000", spent: "$225,000", progress: 45, lead: "Ayesha Siddiqua", team: 14, status: "IN_PROGRESS", deadline: "Dec 12, 2026" },
];

const squadWorkloads = [
  { squad: "Squad Alpha (Core Engine & Distributed API)", load: 94, members: "8 Engineers", focus: "Multi-tenant isolation & ledger speed", status: "High Load" },
  { squad: "Squad Beta (Cloud Infrastructure & DevOps)", load: 88, members: "6 Engineers", focus: "Kubernetes clustering & Redis caches", status: "Optimal" },
  { squad: "Squad Gamma (UI & Design Systems)", load: 76, members: "5 Designers", focus: "Cyber-Luxe themes & Kanban polish", status: "Available" },
  { squad: "Squad Delta (QA, SecOps & Compliance)", load: 91, members: "6 Engineers", focus: "Automated penetration testing & SOC2", status: "High Load" },
];

export default function ProjectsPage() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Project Portfolio Roadmap & Sprint Metrics exported to CSV/PDF!");
    }, 1100);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">
      {/* Top Banner: Project Portfolio Command */}
      <div className="glass-strong rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Sprint 34 Active • Portfolio Synchronized
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
              Project Portfolio & <span className="gold-text">Engineering Command</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
              Track multi-squad deliverables, story point velocity, cross-department milestone timelines, and portfolio budgets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleExport}
              disabled={isExporting}
              variant="outline"
              className="rounded-2xl h-11 sm:h-12 px-4 border-border bg-card/60 font-bold text-xs hover:bg-accent"
            >
              <FileSpreadsheet className="w-4 h-4 mr-1.5 text-blue-500" />
              <span>{isExporting ? "Exporting..." : "Export Portfolio"}</span>
            </Button>
            <Link href="/projects/new">
              <Button className="gold-gradient text-obsidian-900 font-extrabold text-xs sm:text-sm rounded-2xl h-11 sm:h-12 px-6 shadow-lg shadow-gold-500/20 hover:opacity-90">
                <Plus className="w-4 h-4 mr-1.5" /> Initialize New Project
              </Button>
            </Link>
          </div>
        </div>

        {/* Project Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-border/50">
          {projectMetrics.map((m, idx) => (
            <div key={idx} className="bg-card/50 p-4 rounded-2xl border border-border space-y-1">
              <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
                <span>{m.label}</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">{m.change}</span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading tabular-nums">
                {m.value}
              </div>
              <p className="text-[10px] text-muted-foreground">{m.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic Project Health Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
              Active Enterprise Programs & Budget Utilization
            </h3>
            <p className="text-xs text-muted-foreground">High-impact multi-tenant engineering contracts & milestones</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {portfolioProjects.map((p) => (
            <div key={p.id} className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-md space-y-4 hover:border-gold-500/30 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-md border border-gold-500/20">
                      {p.id}
                    </span>
                    <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                      p.status === "FINAL_REVIEW" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    }`}>
                      {p.status.replace("_", " ")}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-foreground font-heading pt-1">{p.name}</h4>
                  <p className="text-xs text-muted-foreground">Client: <strong className="text-foreground">{p.client}</strong></p>
                </div>

                <div className="text-right">
                  <div className="text-lg font-extrabold gold-text font-heading">{p.budget}</div>
                  <span className="text-[10px] text-muted-foreground">Spent: {p.spent}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-semibold">Milestone Completion</span>
                  <span className="font-extrabold text-foreground font-mono">{p.progress}%</span>
                </div>
                <div className="w-full bg-accent h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full gold-gradient transition-all duration-500"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>

              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                <span>Lead: <strong className="text-foreground">{p.lead}</strong> ({p.team} Engineers)</span>
                <span className="flex items-center gap-1 font-semibold text-foreground/80">
                  <Calendar className="w-3.5 h-3.5 text-muted-foreground" /> {p.deadline}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Sprint Task Kanban + Squad Workload */}
      <div className="space-y-6">
        <TaskKanban />

        {/* Squad Allocation */}
        <div className="glass rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
                Squad Resource Allocation & Workload
              </h3>
              <p className="text-xs text-muted-foreground">Engineering capacity distribution across core technical domains</p>
            </div>
            <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Optimal Balancing
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
            {squadWorkloads.map((sq, i) => (
              <div key={i} className="p-4 rounded-2xl bg-card/60 border border-border/70 space-y-3">
                <div className="flex items-center justify-between">
                  <h5 className="text-xs font-bold text-foreground line-clamp-1">{sq.squad.split(" (")[0]}</h5>
                  <span className={`text-[9px] font-extrabold px-2 py-0.2 rounded-full border uppercase tracking-wider ${
                    sq.load > 90 ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                  }`}>
                    {sq.status}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-muted-foreground text-[10px]">{sq.members}</span>
                    <span className="gold-text font-mono font-extrabold">{sq.load}% Load</span>
                  </div>
                  <div className="w-full bg-accent h-1.5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${sq.load > 90 ? "bg-amber-500" : "gold-gradient"}`}
                      style={{ width: `${sq.load}%` }}
                    />
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">{sq.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
