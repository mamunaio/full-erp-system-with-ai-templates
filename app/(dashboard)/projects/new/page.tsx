"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Plus, Briefcase, Users, Calendar, 
  Target, TrendingUp, ShieldCheck, Sparkles, DollarSign, 
  CheckCircle2, AlertTriangle, ArrowRight, Loader2, 
  Calculator, Info, FileText, User, Layers, RefreshCw,
  Activity, FolderKanban, Cpu, Code2, Globe, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const clientSponsors = [
  { name: "Internal Core Platform", type: "Core Strategic", tier: "Internal R&D" },
  { name: "Meta Corp Systems", type: "Enterprise Client", tier: "Tier-1 Partner" },
  { name: "Tesla Energy", type: "Strategic OEM", tier: "Tier-1 Enterprise" },
  { name: "SpaceX Aerospace", type: "Defense & Aerospace", tier: "Strategic Cloud" },
  { name: "Stripe Corporate", type: "Fintech Platform", tier: "Fintech Vault" },
  { name: "Apex Global Conglomerate", type: "Holding Group", tier: "Multi-Entity" },
];

const engineeringSquads = [
  { id: "alpha", name: "Squad Alpha — Core Engine & Distributed API", lead: "Farhan Ahmed", members: 12, capacity: "94% Load" },
  { id: "beta", name: "Squad Beta — Cloud Infrastructure & DevOps", lead: "Zubair Rahman", members: 8, capacity: "88% Load" },
  { id: "gamma", name: "Squad Gamma — Cyber-Luxe UI & Design Systems", lead: "Nusrat Jahan", members: 6, capacity: "76% Load" },
  { id: "delta", name: "Squad Delta — QA, SecOps & Compliance", lead: "Ayesha Siddiqua", members: 7, capacity: "91% Load" },
];

const programLeads = [
  "Farhan Ahmed (VP of Core Systems)",
  "Nusrat Jahan (Director of Product Design)",
  "Zubair Rahman (Principal Cloud Architect)",
  "Ayesha Siddiqua (Lead SecOps & Quality)",
];

const priorityLevels = [
  { id: "P0", label: "🔥 Critical P0 (Immediate Board Priority)", color: "text-rose-500 border-rose-500/30 bg-rose-500/10" },
  { id: "P1", label: "⚡ High P1 (Quarterly Key Milestone)", color: "text-amber-500 border-amber-500/30 bg-amber-500/10" },
  { id: "P2", label: "🔷 Medium P2 (Standard Sprint Roadmap)", color: "text-blue-500 border-blue-500/30 bg-blue-500/10" },
  { id: "P3", label: "⚪ Routine P3 (Continuous Improvement)", color: "text-muted-foreground border-border bg-card" },
];

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("NexGen Multi-Cloud Edge Telemetry Platform");
  const [selectedClientIndex, setSelectedClientIndex] = useState(0);
  const [selectedLead, setSelectedLead] = useState(programLeads[0]);
  const [priority, setPriority] = useState("P0");
  const [description, setDescription] = useState("Architecting unified real-time telemetry streaming, distributed sharding caches, and AI anomaly detection across all enterprise node clusters.");

  const [startDate, setStartDate] = useState("2026-09-04");
  const [targetLaunchDate, setTargetLaunchDate] = useState("2026-11-30");
  const [sprintCadence, setSprintCadence] = useState("2-Week Agile Sprints");
  const [targetVelocity, setTargetVelocity] = useState(45);

  const [selectedSquadId, setSelectedSquadId] = useState("alpha");
  const [allocatedBudget, setAllocatedBudget] = useState(450000);
  const [monthlyLaborBurn, setMonthlyLaborBurn] = useState(65000);
  const [cloudInfraReserve, setCloudInfraReserve] = useState(45000);

  const [autoProvisionGit, setAutoProvisionGit] = useState(true);
  const [autoSlackWarRoom, setAutoSlackWarRoom] = useState(true);

  const client = clientSponsors[selectedClientIndex];
  const squad = engineeringSquads.find(s => s.id === selectedSquadId) || engineeringSquads[0];

  // Financial Calculations
  const contingencyBuffer = allocatedBudget * 0.10; // 10% contingency
  const totalApprovedCapital = allocatedBudget + cloudInfraReserve + contingencyBuffer;

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please provide a project name.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedCode = `#PRJ-2026-${Math.floor(8800 + Math.random() * 1000)}`;
      toast.success(`Project ${generatedCode} Initialized!`, {
        description: `${name} assigned to ${squad.name}. Repository and sprint board provisioned.`,
      });
      router.push("/projects");
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-16 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link 
              href="/projects" 
              className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 bg-card/60 hover:bg-card border border-border/80 rounded-xl px-3 py-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Project Portfolio
            </Link>
            <span className="text-xs text-muted-foreground">• Program Launchpad Studio</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
              Initialize <span className="gold-text">Sovereign Project</span>
            </h1>
            <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/15 px-2.5 py-0.5 rounded-full border border-gold-500/30 uppercase tracking-widest font-mono">
              #PRJ-2026-8804
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Establish enterprise project charters, assign dedicated engineering squads, set sprint cadence, and allocate capital budgets.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button 
            variant="outline"
            onClick={() => router.push("/projects")}
            className="h-11 px-5 rounded-xl text-xs font-bold bg-card border-border hover:border-gold-500/40 cursor-pointer shadow-sm"
          >
            Cancel
          </Button>

          <Button 
            onClick={handleCreateProject}
            disabled={isSubmitting}
            className="h-11 px-7 rounded-xl gold-gradient text-obsidian-950 font-black text-xs shadow-lg shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center gap-2"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Deploying Program...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                Authorize & Deploy Project <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <form onSubmit={handleCreateProject} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS: Project Architecture & Squad Allocation */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Project Identity & Stakeholder Alignment */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gold-500/15 text-gold-500 flex items-center justify-center font-bold">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-heading">Project Identity & Stakeholders</h3>
                  <p className="text-[10px] text-muted-foreground">Define program charter, client sponsor, and executive ownership</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/25">
                {client.tier}
              </span>
            </div>

            <div className="space-y-4">
              {/* Project Name */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Project Title / Program Name
                </Label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold-500 transition-colors">
                    <FolderKanban className="w-full h-full" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. NexGen Multi-Cloud Edge Telemetry Platform"
                    className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-10 pr-4 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all"
                  />
                </div>
              </div>

              {/* Client Sponsor & Program Lead */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                    Client Sponsor / Enterprise Entity
                  </Label>
                  <select
                    value={selectedClientIndex}
                    onChange={(e) => setSelectedClientIndex(parseInt(e.target.value))}
                    className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                  >
                    {clientSponsors.map((c, idx) => (
                      <option key={idx} value={idx} className="bg-card text-foreground">
                        {c.name} ({c.type})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                    Executive Program Director
                  </Label>
                  <select
                    value={selectedLead}
                    onChange={(e) => setSelectedLead(e.target.value)}
                    className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                  >
                    {programLeads.map((lead, idx) => (
                      <option key={idx} value={lead} className="bg-card">
                        {lead}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Strategic Priority Selector */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Strategic Execution Priority
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {priorityLevels.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPriority(p.id)}
                      className={cn(
                        "p-2.5 rounded-2xl border text-left text-xs font-bold transition-all cursor-pointer flex items-center justify-between",
                        priority === p.id 
                          ? "border-gold-500/70 bg-gold-500/10 shadow-md" 
                          : "border-border/70 bg-card/60 hover:bg-card text-muted-foreground"
                      )}
                    >
                      <span className={cn(priority === p.id ? "text-foreground font-extrabold" : "text-muted-foreground")}>
                        {p.label}
                      </span>
                      {priority === p.id && <Check className="w-4 h-4 text-gold-500" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description & Scope */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Strategic Scope & Deliverables
                </Label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Outline sprint milestones, technical architecture, and business KPIs..."
                  className="w-full bg-background/60 border border-border/80 rounded-2xl p-3 text-xs font-medium text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 2. Milestone Timelines & Sprint Cadence */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-heading">Roadmap Schedule & Sprint Cadence</h3>
                  <p className="text-[10px] text-muted-foreground">Sprint velocity, start date, and target launch maturity</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/25">
                Sprint Planning Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Program Start Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="h-11 bg-background/60 border-border/80 rounded-2xl pl-10 text-xs font-semibold text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Target Production Release</Label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="date"
                    value={targetLaunchDate}
                    onChange={(e) => setTargetLaunchDate(e.target.value)}
                    className="h-11 bg-background/60 border-border/80 rounded-2xl pl-10 text-xs font-semibold text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Delivery Methodology</Label>
                <select
                  value={sprintCadence}
                  onChange={(e) => setSprintCadence(e.target.value)}
                  className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="2-Week Agile Sprints" className="bg-card">2-Week Agile Sprints (Scrum)</option>
                  <option value="Kanban Continuous Flow" className="bg-card">Kanban Continuous Delivery Flow</option>
                  <option value="Waterfall Milestone Gates" className="bg-card">Stage-Gate Milestone Governance</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Target Velocity (Story Points / Sprint)</Label>
                <div className="relative">
                  <Activity className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="number"
                    min="10"
                    value={targetVelocity}
                    onChange={(e) => setTargetVelocity(parseInt(e.target.value) || 10)}
                    className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-10 pr-4 text-xs font-bold text-foreground outline-none focus:border-gold-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Dedicated Squad & Tech Stack Allocation */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground font-heading">Engineering Squad Assignment</h3>
                <p className="text-[10px] text-muted-foreground">Assign dedicated squad capacity and multi-disciplinary resources</p>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Primary Dedicated Squad</Label>
              <select
                value={selectedSquadId}
                onChange={(e) => setSelectedSquadId(e.target.value)}
                className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:border-gold-500 cursor-pointer"
              >
                {engineeringSquads.map((s) => (
                  <option key={s.id} value={s.id} className="bg-card">
                    {s.name} — {s.members} Engineers ({s.capacity})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT 1 COLUMN: Capital Budget Ledger & AI Telemetry */}
        <div className="space-y-6">
          {/* Budget Ledger Card */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <h3 className="text-sm font-bold text-foreground font-heading">Program Budget Ledger</h3>
              <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 uppercase">
                USD ($)
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1.5">
                <div className="flex justify-between text-muted-foreground">
                  <span>Authorized Engineering CapEx:</span>
                  <span className="font-bold text-foreground">${allocatedBudget.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1500000"
                  step="25000"
                  value={allocatedBudget}
                  onChange={(e) => setAllocatedBudget(parseInt(e.target.value))}
                  className="w-full accent-gold-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-muted-foreground">
                <span>Monthly Labor Burn ($/mo):</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs">$</span>
                  <input
                    type="number"
                    min="10000"
                    step="5000"
                    value={monthlyLaborBurn}
                    onChange={(e) => setMonthlyLaborBurn(parseInt(e.target.value) || 0)}
                    className="w-20 bg-background border border-border/80 rounded-lg p-1 text-right text-xs font-bold text-foreground"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-muted-foreground">
                <span>Cloud Infra & Tooling Reserve:</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs">$</span>
                  <input
                    type="number"
                    min="5000"
                    step="5000"
                    value={cloudInfraReserve}
                    onChange={(e) => setCloudInfraReserve(parseInt(e.target.value) || 0)}
                    className="w-20 bg-background border border-border/80 rounded-lg p-1 text-right text-xs font-bold text-foreground"
                  />
                </div>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Contingency Buffer (10%):</span>
                <span className="font-semibold text-emerald-500">+${contingencyBuffer.toLocaleString()}</span>
              </div>

              <div className="pt-3 border-t border-border/70 flex justify-between items-baseline">
                <span className="text-sm font-bold text-foreground">Total Authorized Budget:</span>
                <span className="text-2xl font-black gold-text font-heading">${totalApprovedCapital.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkbox Provisioning Options */}
            <div className="space-y-2 pt-2 border-t border-border/60 text-xs text-muted-foreground">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoProvisionGit}
                  onChange={(e) => setAutoProvisionGit(e.target.checked)}
                  className="w-4 h-4 rounded-md border-border bg-card text-gold-500 accent-gold-500 cursor-pointer"
                />
                <span>Auto-provision GitHub Repository & CI/CD pipeline</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoSlackWarRoom}
                  onChange={(e) => setAutoSlackWarRoom(e.target.checked)}
                  className="w-4 h-4 rounded-md border-border bg-card text-gold-500 accent-gold-500 cursor-pointer"
                />
                <span>Initialize dedicated Slack/Teams war-room & standups</span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-13 rounded-2xl gold-gradient text-obsidian-950 font-black text-xs sm:text-sm shadow-xl shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Provisioning Program...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  Authorize & Deploy Project <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>

          {/* AI Delivery Risk & Schedule Matrix */}
          <div className="glass rounded-3xl border border-border/80 p-5 shadow-lg space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">AI Delivery Telemetry</h4>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                High Confidence
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-card/60 border border-border/60 flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground block text-[11px]">On-Time Launch Probability</span>
                  <span className="font-extrabold text-emerald-500 text-sm">94.2% AI Confidence</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-card/60 border border-border/60 flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Engineering Velocity</span>
                  <span className="font-extrabold text-foreground text-sm">{targetVelocity} Story Points / Sprint</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Code2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
