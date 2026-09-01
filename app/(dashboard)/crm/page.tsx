"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  HeartHandshake, Plus, Search, Filter, 
  Sparkles, DollarSign, TrendingUp, Target, 
  Phone, Mail, Calendar, ArrowRight, CheckCircle2,
  Clock, Award, BarChart3, ChevronRight, UserPlus
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import KanbanBoard from "./components/KanbanBoard";
import ActivityTimeline from "./components/ActivityTimeline";
import NewLeadModal from "./components/NewLeadModal";

const hotLeads = [
  { id: "h1", name: "Meta Corp", contact: "Mark Vance", value: "$85,000", score: 98, status: "Negotiation", probability: "92%", stage: "PROPOSAL" },
  { id: "h2", name: "SpaceX Systems", contact: "Elena Rostova", value: "$62,000", score: 94, status: "Contract Review", probability: "88%", stage: "PROPOSAL" },
  { id: "h3", name: "Tesla Energy", contact: "Marcus Sterling", value: "$48,000", score: 89, status: "Demo Completed", probability: "76%", stage: "QUALIFIED" },
  { id: "h4", name: "Stripe Billing Hub", contact: "Chloe Dupont", value: "$35,000", score: 84, status: "Discovery Call", probability: "65%", stage: "CONTACTED" },
];

const funnelMetrics = [
  { stage: "Total Leads Discovered", count: 184, value: "$6.2M", conv: "100%" },
  { stage: "Qualified Opportunities", count: 86, value: "$4.1M", conv: "46.7%" },
  { stage: "Proposal & Pitch", count: 42, value: "$2.8M", conv: "22.8%" },
  { stage: "Contract Negotiation", count: 18, value: "$1.4M", conv: "9.7%" },
  { stage: "Closed Won Deals", count: 12, value: "$850K", conv: "6.5%" },
];

export default function CRMDashboard() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">
      {/* Top Banner: Pipeline Velocity & Win Rate Matrix */}
      <div className="glass-strong rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <span className="text-[11px] font-extrabold text-blue-500 dark:text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                Revenue Pipeline Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
              CRM & <span className="gold-text">Deal Velocity Hub</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
              Manage high-probability enterprise sales cycles, lead intelligence, and revenue pipeline progression.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/crm/contacts">
              <Button variant="outline" className="rounded-2xl h-11 sm:h-12 px-5 border-border bg-card/60 font-bold text-xs sm:text-sm hover:bg-accent">
                <HeartHandshake className="w-4 h-4 mr-2 text-gold-500" /> Contact Directory (2.4k)
              </Button>
            </Link>
            <Button 
              onClick={() => setIsLeadModalOpen(true)}
              className="gold-gradient text-obsidian-900 font-extrabold text-xs sm:text-sm rounded-2xl h-11 sm:h-12 px-6 shadow-lg shadow-gold-500/20 hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Create New Deal
            </Button>
          </div>
        </div>

        {/* Pipeline Financial Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-border/50">
          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Active Pipeline Value</span>
              <DollarSign className="w-3.5 h-3.5 text-gold-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">$3,480,000</div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Avg Deal Win Rate</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-500 font-heading">68.4% <span className="text-xs text-muted-foreground font-sans font-medium">YoY +8%</span></div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Deals in Pipeline</span>
              <Target className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">42 Deals</div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Avg Sales Velocity</span>
              <Clock className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">18.4 Days</div>
          </div>
        </div>
      </div>

      {/* Main Section 1: Visual Interactive Kanban Board */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">Interactive Deal Flow Board</h3>
            <p className="text-xs text-muted-foreground">Drag deals across stages to update status and synchronize revenue forecasts</p>
          </div>
          <Link href="/crm/pipeline">
            <Button variant="ghost" size="sm" className="text-xs font-semibold text-gold-500 hover:text-gold-400">
              Full Pipeline <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <KanbanBoard />
      </div>

      {/* Main Section 2: AI Hot Leads Priority + Sales Funnel + Live Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: AI Priority Hot Leads + Sales Funnel */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Hot Leads */}
          <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-500 border border-gold-500/20">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground font-heading">AI-Scored Hot Deals</h3>
                  <p className="text-xs text-muted-foreground">Google Gemini predictive win probability model</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                High Close Probability
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 pt-2">
              {hotLeads.map((lead) => (
                <div key={lead.id} className="p-4 rounded-2xl bg-card/60 hover:bg-card border border-border/70 hover:border-gold-500/40 transition-all space-y-3 group shadow-sm">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-foreground group-hover:text-gold-500 transition-colors">{lead.name}</h4>
                      <p className="text-[11px] text-muted-foreground">Contact: {lead.contact}</p>
                    </div>
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-gold-500/15 text-gold-500 border border-gold-500/30">
                      ★ {lead.score}/100
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="text-lg font-extrabold gold-text font-heading">{lead.value}</div>
                    <span className="text-[10px] font-bold text-muted-foreground bg-accent/60 px-2 py-0.5 rounded-md">
                      {lead.status}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-emerald-500 font-semibold">{lead.probability} Win Odds</span>
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => toast.success(`Call initiated with ${lead.contact}`)}
                        className="px-2 py-1 rounded-lg bg-accent/60 hover:bg-gold-500/20 hover:text-gold-500 text-[10px] font-bold transition-colors"
                      >
                        Call
                      </button>
                      <button 
                        onClick={() => toast.success(`Proposal draft opened for ${lead.name}`)}
                        className="px-2 py-1 rounded-lg bg-gold-500/15 text-gold-500 hover:bg-gold-500/30 text-[10px] font-bold transition-colors"
                      >
                        Pitch
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sales Conversion Funnel */}
          <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-lg space-y-4">
            <div>
              <h3 className="text-base font-bold text-foreground font-heading">Sales Conversion Funnel</h3>
              <p className="text-xs text-muted-foreground">Drop-off and conversion rates across sales milestones</p>
            </div>

            <div className="space-y-2.5 pt-2">
              {funnelMetrics.map((f, i) => (
                <div key={i} className="p-3 rounded-xl bg-card/40 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-lg bg-accent text-[10px] font-bold flex items-center justify-center text-muted-foreground">{i + 1}</span>
                    <span className="text-xs font-semibold text-foreground">{f.stage}</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="text-muted-foreground">{f.count} deals</span>
                    <span className="font-bold text-foreground">{f.value}</span>
                    <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">{f.conv}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Customer Activity Stream */}
        <div className="space-y-6">
          <ActivityTimeline />
        </div>
      </div>

      <NewLeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />
    </div>
  );
}
