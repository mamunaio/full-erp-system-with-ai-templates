"use client";

import { 
  Lightbulb, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Target,
  Zap,
  Activity,
  ShieldCheck,
  BarChart3,
  Cpu,
  Sparkles,
  TrendingDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const predictiveInsights = [
  {
    id: "pi-1",
    type: "opportunity",
    title: "Q4 Net Margin Expansion",
    desc: "AI modeling indicates expanding high-tier SaaS enterprise plans will increase quarterly EBITDA by +12.4%.",
    metric: "+$142,000",
    confidence: "96% Confidence",
    action: "Review Forecast",
  },
  {
    id: "pi-2",
    type: "risk",
    title: "Ghost Cloud Cost Anomaly",
    desc: "Unattached staging database clusters detected in AWS region eu-west. Shutting them down saves $3,400/mo.",
    metric: "-$3,400/mo",
    confidence: "99% Confidence",
    action: "Terminate Unused",
  },
  {
    id: "pi-3",
    type: "operational",
    title: "Warehouse Turnover Acceleration",
    desc: "Hardware SKU-001 (Apple MacBook M3 Max) velocity is 3.2x faster than projected. Recommended PO buffer: +20 units.",
    metric: "3.2x Velocity",
    confidence: "91% Confidence",
    action: "Auto-Draft PO",
  },
];

const operationalDiagnostics = [
  { title: "Talent Roster Utilization", desc: "Engineering squad is at 94% capacity. Low burnout probability for sprint 42.", status: "Optimal", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { title: "Accounts Receivable Velocity", desc: "Average invoice collection cycle shortened from 24 days to 18.2 days.", status: "Fast Flow", color: "text-blue-500 bg-blue-500/10 border-blue-500/20" },
  { title: "Supply Chain Risk Index", desc: "Global shipping port congestion risk score lowered to 12/100 (Safe).", status: "Nominal", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { title: "Customer Churn Radar", desc: "Only 1 client (Acme Logistics) shows declining usage patterns. CS alert dispatched.", status: "Action Sent", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
];

export default function AIInsights() {
  return (
    <div className="space-y-6">
      {/* Primary Predictive Intelligence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {predictiveInsights.map((item) => (
          <div 
            key={item.id} 
            className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-lg space-y-4 relative overflow-hidden group hover:border-gold-500/40 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold ${
                item.type === "opportunity" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" :
                item.type === "risk" ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" :
                "bg-blue-500/10 text-blue-500 border border-blue-500/20"
              }`}>
                {item.type === "opportunity" ? <TrendingUp className="w-5 h-5" /> :
                 item.type === "risk" ? <AlertCircle className="w-5 h-5" /> :
                 <Sparkles className="w-5 h-5" />}
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent text-foreground">
                {item.confidence}
              </span>
            </div>

            <div>
              <h4 className="text-sm sm:text-base font-bold text-foreground group-hover:text-gold-500 transition-colors font-heading">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {item.desc}
              </p>
            </div>

            <div className="pt-3 border-t border-border/40 flex items-center justify-between">
              <div className="text-base font-extrabold gold-text font-heading">{item.metric}</div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.success(`Executed: ${item.action}`)}
                className="rounded-xl text-[11px] font-bold h-8 px-3 border-border hover:bg-gold-500/15 hover:text-gold-500"
              >
                {item.action} <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Operational Diagnostics Table Card */}
      <div className="glass rounded-3xl p-5 sm:p-7 border border-border/80 shadow-lg space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground font-heading">Continuous Strategic Health Radar</h3>
              <p className="text-xs text-muted-foreground">Autonomous checks across enterprise operational nodes</p>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Realtime Scan Active
          </span>
        </div>

        <div className="divide-y divide-border/50">
          {operationalDiagnostics.map((diag, idx) => (
            <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
              <div className="space-y-0.5">
                <h5 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-gold-500 transition-colors">{diag.title}</h5>
                <p className="text-xs text-muted-foreground">{diag.desc}</p>
              </div>

              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border uppercase tracking-wider self-start sm:self-auto ${diag.color}`}>
                {diag.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
