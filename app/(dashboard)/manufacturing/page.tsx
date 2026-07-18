"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, AlertCircle, Plus, Settings2, Activity, Zap, Factory,
  Package, CheckCircle2, Clock, TrendingUp, BarChart3, MoreVertical,
  ChevronRight, ShieldCheck, Cpu, Loader2, X, ArrowLeft
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

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const mfgSuggestions = [ "Production line efficiency", "Work order status", "Material requirements", "Quality control metrics" ];

const mfgAlerts = [
  { id: "1", severity: "critical" as const, title: "Material Shortage", description: "X570 Motherboard low for WO-102 — production may halt in 3 days.", time: "30m ago" },
  { id: "2", severity: "warning" as const, title: "Work Order Delayed", description: "#WO-098 is 24h past start date — reassign resources.", time: "2h ago" },
  { id: "3", severity: "info" as const, title: "Production Complete", description: "#WO-101 finished successfully ahead of schedule.", time: "4h ago" },
  { id: "4", severity: "warning" as const, title: "Quality Variance", description: "Defect rate on line Beta-04 increased to 3.2% this week.", time: "6h ago" },
  { id: "5", severity: "info" as const, title: "Efficiency Milestone", description: "Line Alpha-01 achieved 98% efficiency — new record.", time: "8h ago" },
];

export default function ManufacturingDashboard() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleCreateWorkOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      toast.success("New Work Order Created!", {
        description: "Assigned to Production Line Alpha-01",
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
          <span className="text-sm text-muted-foreground font-medium">Loading Manufacturing...</span>
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
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Manufacturing Online</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-heading">
                Manufacturing & <span className="text-gold-400">Production</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Monitor real-time production efficiency, work orders and BOMs.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/manufacturing/settings">
                <Button variant="outline" className="rounded-[20px] h-14 px-8 border-border bg-card/60 font-bold">
                  <Settings2 className="w-5 h-5 mr-3" /> Production Settings
                </Button>
              </Link>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-[20px] h-14 px-10 shadow-lg shadow-gold-500/20 font-bold uppercase tracking-tight transition-all active:scale-95"
              >
                <Plus className="w-5 h-5 mr-3" /> New Work Order
              </Button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AICommandBar suggestions={mfgSuggestions} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Active Work Orders" value="12" change="+2" trend="up" icon={Factory} sparkline={[8, 9, 9, 10, 10, 11, 12]} />
          <KPICard title="Completed (Month)" value="45" change="+18%" trend="up" icon={CheckCircle2} sparkline={[28, 32, 35, 38, 40, 43, 45]} />
          <KPICard title="Line Efficiency" value="94.2%" change="+1.5%" trend="up" icon={Activity} sparkline={[88, 89, 90, 92, 93, 94, 94.2]} />
          <KPICard title="Material Alerts" value="3" change="-1" trend="down" icon={AlertCircle} sparkline={[5, 5, 4, 4, 3, 3, 3]} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:break-inside-avoid [&>*]:mb-4">
          <div>
            <SmartAlerts data={mfgAlerts} />
          </div>
          <div className="space-y-4">
            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Production Output</h3>
              <div className="flex items-end justify-between h-32 gap-1 mb-2">
                {[40, 65, 80, 55, 95, 75, 88].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <div className="w-full bg-gradient-to-t from-gold-600 to-gold-400 rounded-t transition-all group-hover:opacity-80" style={{ height: `${h}%` }} />
                    <span className="text-[8px] text-muted-foreground">{["M","T","W","T","F","S","S"][i]}</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-gold-500" /><span>Actual</span></div>
                <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-border" /><span>Planned</span></div>
              </div>
            </div>

            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Active Queue</h3>
              <div className="space-y-1">
                <ProductionRow id="#WO-2024" line="Alpha-01" product="X570 Board x50" progress={85} status="In Progress" />
                <ProductionRow id="#WO-2025" line="Beta-04" product="RTX 4090 Assembly" progress={42} status="In Progress" />
                <ProductionRow id="#WO-2026" line="Alpha-02" product="DDR5 Modules x200" progress={15} status="Setup" />
                <ProductionRow id="#WO-2027" line="Gamma-01" product="Power Unit G-750" progress={0} status="Queued" />
              </div>
              <Link href="/manufacturing/work-orders">
                <Button variant="ghost" className="w-full mt-3 text-[10px] font-bold text-gold-400 uppercase tracking-widest">View Full Queue</Button>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-obsidian-900 rounded-xl p-6 text-white border border-gold-500/20 relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-gold-500/10 rounded-full blur-2xl" />
              <Zap className="w-8 h-8 mb-4 text-gold-400" />
              <h3 className="text-xl font-bold mb-2">Efficiency Boost</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">Your production line B is at 98% efficiency. Replicate its setup for line C to increase output by 12%.</p>
              <Button className="w-full mt-6 h-12 rounded-xl bg-gold-500 hover:bg-gold-600 text-obsidian-900 font-bold transition-all active:scale-95">
                DEPLOY AI OPTIMIZATION
              </Button>
            </div>

            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <div className="grid grid-cols-2 gap-3">
                <QuickActionLink icon={Cpu} label="BOMs" link="/manufacturing/bom" />
                <QuickActionLink icon={ShieldCheck} label="QC Control" link="/manufacturing/quality" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* New Work Order Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl">
          <div className="bg-obsidian-900 p-10 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center font-black text-2xl shadow-lg shadow-gold-500/20 text-obsidian-900">W</div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">New Work Order</h2>
                  <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1">Initiate Production Sequence</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="rounded-full text-muted-foreground hover:text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </Button>
            </div>

            <form onSubmit={handleCreateWorkOrder} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Product Reference</Label>
                  <Input required placeholder="e.g. RTX 4090 Assembly" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-gold-500 focus:border-gold-500 text-white font-medium px-5" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Batch Quantity</Label>
                  <Input required type="number" placeholder="100" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-gold-500 focus:border-gold-500 text-white font-medium px-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Production Line</Label>
                  <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl focus:ring-gold-500 text-white font-medium px-5 appearance-none outline-none">
                    <option className="bg-obsidian-900">Alpha-01 (High Capacity)</option>
                    <option className="bg-obsidian-900">Beta-04 (Precision)</option>
                    <option className="bg-obsidian-900">Gamma-01 (General)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Priority Level</Label>
                  <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl focus:ring-gold-500 text-white font-medium px-5 appearance-none outline-none">
                    <option className="bg-obsidian-900">Urgent - ASAP</option>
                    <option className="bg-obsidian-900">Medium - Normal</option>
                    <option className="bg-obsidian-900">Low - Buffer</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-[24px] bg-gold-500 hover:bg-gold-600 text-obsidian-900 font-black shadow-2xl shadow-gold-500/40 text-lg tracking-tight active:scale-[0.98] transition-all"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> INITIALIZING PRODUCTION...</>
                  ) : (
                    "START PRODUCTION SEQUENCE"
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

function ProductionRow({ id, line, product, progress, status }: any) {
  return (
    <div className="flex items-center justify-between py-2.5 px-3 -mx-3 rounded-xl hover:bg-gold-500/5 transition-all cursor-pointer group">
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-400 text-[10px] font-bold shrink-0">{id.replace("#WO-", "")}</div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-card-foreground group-hover:text-gold-400 transition-colors truncate">{product}</p>
          <p className="text-[10px] text-muted-foreground">Line: {line}</p>
        </div>
      </div>
      <div className="text-right shrink-0">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-16 h-1.5 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-gold-500 rounded-full" style={{ width: `${progress}%` }} />
          </div>
          <span className="text-[10px] font-bold text-gold-400">{progress}%</span>
        </div>
        <span className={cn("text-[9px] font-bold uppercase tracking-widest",
          status === "In Progress" ? "text-blue-400" :
          status === "Setup" ? "text-amber-400" : "text-muted-foreground"
        )}>{status}</span>
      </div>
    </div>
  );
}

function QuickActionLink({ icon: Icon, label, link }: any) {
  return (
    <Link href={link || "#"} className="flex flex-col items-center justify-center p-4 rounded-xl bg-gold-500/5 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/20 transition-all group">
      <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
        <Icon className="w-4 h-4 text-gold-400" />
      </div>
      <span className="text-[9px] font-bold text-card-foreground uppercase tracking-widest group-hover:text-gold-400 transition-colors">{label}</span>
    </Link>
  );
}
