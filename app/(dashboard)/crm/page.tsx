"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Users, Target, TrendingUp, DollarSign, Plus, ArrowRight, Sparkles,
  LayoutDashboard, UserCheck, Activity, Phone, Mail, Calendar, ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";

import AICommandBar from "@/components/dashboard/AICommandBar";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import KPICard from "@/components/dashboard/KPICard";
import SalesBreakdown from "@/components/dashboard/SalesBreakdown";
import ActivityTimeline from "./components/ActivityTimeline";
import NewLeadModal from "./components/NewLeadModal";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const crmSuggestions = ["Lead pipeline analysis", "Conversion optimization", "Top opportunities", "Customer segmentation"];

const crmAlerts = [
  { id: "1", severity: "critical" as const, title: "High-Value Lead Stalled", description: "Meta Corp $50K deal has been in negotiation for 14 days — follow up now.", time: "30m ago" },
  { id: "2", severity: "warning" as const, title: "Lead Response Time", description: "Average first response time increased to 4.2 hours.", time: "2h ago" },
  { id: "3", severity: "info" as const, title: "New Lead Influx", description: "18 new leads from LinkedIn campaign — highest this quarter.", time: "4h ago" },
  { id: "4", severity: "warning" as const, title: "Pipeline Stagnation", description: "2 deals in proposal stage for over 30 days without movement.", time: "6h ago" },
  { id: "5", severity: "info" as const, title: "Deal Won", description: "SpaceX Systems closed at $85K — congratulations team!", time: "8h ago" },
];

const salesCategories = [
  { name: "Enterprise SaaS", value: 450 },
  { name: "Hardware", value: 280 },
  { name: "Services", value: 210 },
  { name: "Support", value: 150 },
  { name: "Consulting", value: 100 },
];

const hotLeads = [
  { name: "Meta Corp", value: "$12,000", score: 98 },
  { name: "Tesla Inc", value: "$50,000", score: 92 },
  { name: "Amazon AWS", value: "$35,000", score: 85 },
];

const moduleLinks = [
  { href: "/crm/pipeline", title: "Pipeline", description: "Deal Flow", icon: LayoutDashboard, trend: "Active" },
  { href: "/crm/contacts", title: "Contacts", description: "2,450 Records", icon: UserCheck, trend: "+8%" },
  { href: "/crm/activities", title: "Activities", description: "Task Log", icon: Activity, trend: "Today" },
];

export default function CRMDashboard() {
  const [loading, setLoading] = useState(true);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

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
          <span className="text-sm text-muted-foreground font-medium">Loading CRM...</span>
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
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">CRM Online</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-heading">
                CRM <span className="text-gold-400">Intelligence</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Strategic relationship management and deal flow optimization.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => toast.info("Fetching recent activities...")}
                className="rounded-[20px] h-14 px-8 border-border bg-card/60 font-bold"
              >
                Activity Log
              </Button>
              <Button
                onClick={() => setIsLeadModalOpen(true)}
                className="bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-[20px] h-14 px-10 shadow-lg shadow-gold-500/20 font-bold uppercase tracking-tight transition-all active:scale-95"
              >
                <Plus className="w-5 h-5 mr-3" /> New Lead
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AICommandBar suggestions={crmSuggestions} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Total Leads" value="1,284" change="+18%" trend="up" icon={Users} sparkline={[850, 950, 1050, 1100, 1180, 1240, 1284]} />
          <KPICard title="Active Deals" value="42" change="+6" trend="up" icon={Target} sparkline={[28, 30, 34, 36, 38, 40, 42]} />
          <KPICard title="Conversion Rate" value="24.8%" change="+2.4%" trend="up" icon={TrendingUp} sparkline={[18, 20, 21, 22, 23, 24, 24.8]} />
          <KPICard title="Pipeline Value" value="$2.4M" change="+12%" trend="up" icon={DollarSign} sparkline={[1.6, 1.8, 1.9, 2.0, 2.1, 2.2, 2.4]} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:break-inside-avoid [&>*]:mb-4">
          <SalesBreakdown data={salesCategories} />
          <SmartAlerts data={crmAlerts} />
          <ActivityTimeline />

          <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
            <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Sales Funnel</h3>
            <div className="space-y-3">
              <PipelineBar label="New Leads" value={45} count="45" />
              <PipelineBar label="Contacted" value={32} count="32" />
              <PipelineBar label="Qualified" value={18} count="18" />
              <PipelineBar label="Proposal" value={12} count="12" />
              <PipelineBar label="Won" value={8} count="8" />
            </div>
            <Link href="/crm/pipeline">
              <Button variant="ghost" className="w-full mt-3 text-[10px] font-bold text-gold-400 uppercase tracking-widest">View Full Pipeline</Button>
            </Link>
          </div>

          <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-card-foreground font-heading">Top Hot Leads</h3>
              <span className="flex items-center text-[9px] font-bold text-rose-400 uppercase tracking-widest bg-rose-500/15 px-2 py-1 rounded-full">
                <Phone className="w-3 h-3 mr-1" /> High Intent
              </span>
            </div>
            <div className="space-y-1">
              {hotLeads.map((lead) => (
                <HotLeadRow key={lead.name} name={lead.name} value={lead.value} score={lead.score} />
              ))}
            </div>
          </div>

          <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
            <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-1 gap-3">
              {moduleLinks.map((mod) => (
                <Link key={mod.href} href={mod.href}>
                  <div className="group flex items-center gap-4 p-4 rounded-xl bg-gold-500/5 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/20 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400 shadow-md group-hover:scale-110 transition-transform shrink-0">
                      <mod.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-card-foreground group-hover:text-gold-400 transition-colors font-heading">{mod.title}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{mod.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-gold-400 uppercase tracking-widest bg-gold-500/10 px-2 py-1 rounded-full">{mod.trend}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
            <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold-400" /> Recent Activity
            </h3>
            <div className="space-y-3">
              <ContactActivity icon={Phone} label="Call" desc="Discovery call with Alex Rivera" time="10:30 AM" color="text-emerald-400" />
              <ContactActivity icon={Mail} label="Email" desc="Proposal sent to Sarah Connor" time="Yesterday, 4:15 PM" color="text-gold-400" />
              <ContactActivity icon={Calendar} label="Meeting" desc="Requirements discussion scheduled" time="Tomorrow, 11:00 AM" color="text-amber-400" />
              <ContactActivity icon={ArrowUpRight} label="Deal" desc="SpaceX Systems closed at $85K" time="8h ago" color="text-emerald-400" />
            </div>
          </div>
        </div>
      </motion.div>

      <NewLeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} />
    </motion.div>
  );
}

function PipelineBar({ label, value, count }: { label: string; value: number; count: string }) {
  return (
    <div className="space-y-1.5 group cursor-pointer">
      <div className="flex justify-between text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
        <span className="group-hover:text-gold-400 transition-colors">{label}</span>
        <span className="font-bold">{count} Deals</span>
      </div>
      <div className="w-full h-2 bg-border rounded-full overflow-hidden">
        <div className="h-full rounded-full bg-gold-500 transition-all" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function HotLeadRow({ name, value, score }: { name: string; value: string; score: number }) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 -mx-3 rounded-xl hover:bg-gold-500/5 transition-all cursor-pointer group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400 text-xs font-bold">{name[0]}</div>
        <div>
          <p className="text-sm font-bold text-card-foreground group-hover:text-gold-400 transition-colors leading-none mb-0.5">{name}</p>
          <p className="text-[10px] text-muted-foreground">Value: {value}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">AI Score</p>
        <p className={`text-sm font-bold ${score > 90 ? "text-rose-400" : "text-amber-400"}`}>{score}%</p>
      </div>
    </div>
  );
}

function ContactActivity({ icon: Icon, label, desc, time, color }: { icon: any; label: string; desc: string; time: string; color: string }) {
  return (
    <div className="flex items-start gap-3 pb-3 border-b border-border last:border-b-0 last:pb-0">
      <div className={`w-8 h-8 rounded-xl ${color.replace("text", "bg").replace("400", "500/15")} flex items-center justify-center ${color} shrink-0`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-card-foreground">{desc}</p>
        <p className="text-[10px] text-muted-foreground">{time}</p>
      </div>
    </div>
  );
}
