"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, CheckCircle, X, RefreshCw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  severity: "critical" | "warning" | "info";
  title: string;
  description: string;
  time: string;
}

const sampleAlerts: Alert[] = [
  { id: "1", severity: "critical", title: "Revenue Anomaly Detected", description: "Q2 revenue dropped 15% compared to forecast — investigate immediately.", time: "10m ago" },
  { id: "2", severity: "warning", title: "Low Stock Threshold", description: "3 products are below minimum stock level. Reorder suggested.", time: "1h ago" },
  { id: "3", severity: "info", title: "New High-Value Lead", description: "Acme Corp added to pipeline — estimated $50K opportunity.", time: "2h ago" },
  { id: "4", severity: "warning", title: "Employee Leave Conflict", description: "3 team members scheduled off same week in August.", time: "4h ago" },
  { id: "5", severity: "info", title: "Invoice Due Reminder", description: "5 invoices totaling $24K are due this week.", time: "6h ago" },
];

const severityConfig = {
  critical: {
    icon: AlertTriangle,
    border: "border-l-4 border-rose-500",
    bg: "bg-rose-500/10 dark:bg-rose-500/10",
    dot: "bg-rose-500",
    iconColor: "text-rose-600 dark:text-rose-400",
    label: "Critical",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-l-4 border-amber-500",
    bg: "bg-amber-500/10 dark:bg-amber-500/10",
    dot: "bg-amber-500",
    iconColor: "text-amber-600 dark:text-amber-400",
    label: "Warning",
  },
  info: {
    icon: Info,
    border: "border-l-4 border-blue-500",
    bg: "bg-blue-500/10 dark:bg-blue-500/10",
    dot: "bg-blue-500",
    iconColor: "text-blue-600 dark:text-blue-400",
    label: "Info",
  },
};

interface SmartAlertsProps {
  data?: Alert[];
}

export default function SmartAlerts({ data }: SmartAlertsProps) {
  const [alerts, setAlerts] = useState(data ?? sampleAlerts);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const visibleAlerts = alerts.filter((a) => !dismissed.has(a.id));

  function dismiss(id: string) {
    setDismissed((prev) => new Set(prev).add(id));
  }

  function dismissAll() {
    setDismissed(new Set(alerts.map((a) => a.id)));
  }

  return (
    <div className="glass rounded-2xl border border-border/80 p-5 shadow-md hover:border-gold-500/30 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground font-heading">AI-Priority Alerts</h3>
            <p className="text-[10px] text-muted-foreground">Neural anomaly & risk detection</p>
          </div>
        </div>
        {visibleAlerts.length > 0 && (
          <button 
            onClick={dismissAll} 
            className="text-[11px] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-semibold"
          >
            <X className="w-3.5 h-3.5" /> Dismiss all
          </button>
        )}
      </div>

      <AnimatePresence mode="popLayout">
        {visibleAlerts.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <CheckCircle className="w-8 h-8 text-emerald-500 mb-2" />
            <p className="text-xs font-semibold text-muted-foreground">All systems nominal — no active alerts</p>
          </motion.div>
        ) : (
          <div className="space-y-2">
            {visibleAlerts.map((alert) => {
              const config = severityConfig[alert.severity];
              const Icon = config.icon;
              return (
                <motion.div
                  key={alert.id}
                  layout
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "flex items-start gap-3 p-3 rounded-xl group cursor-pointer transition-all border border-border/50",
                    config.border, 
                    config.bg
                  )}
                >
                  <Icon className={cn("w-4 h-4 shrink-0 mt-0.5", config.iconColor)} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-foreground truncate">{alert.title}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed font-medium">{alert.description}</p>
                    <p className="text-[9px] font-semibold text-muted-foreground/80 mt-1">{alert.time}</p>
                  </div>
                  <button
                    onClick={() => dismiss(alert.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-card"
                    title="Dismiss"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {visibleAlerts.length > 0 && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50 text-[10px] text-muted-foreground font-semibold">
          <span>{visibleAlerts.length} active alerts • Google Gemini AI</span>
          <button 
            onClick={() => setAlerts(sampleAlerts)}
            className="text-gold-600 dark:text-gold-400 hover:underline flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
        </div>
      )}
    </div>
  );
}
