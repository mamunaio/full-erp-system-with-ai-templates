"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, CheckCircle, X, RefreshCw } from "lucide-react";
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
    border: "border-l-2 border-red-500/50",
    bg: "bg-red-500/5",
    dot: "bg-red-500",
    label: "Critical",
  },
  warning: {
    icon: AlertTriangle,
    border: "border-l-2 border-amber-500/50",
    bg: "bg-amber-500/5",
    dot: "bg-amber-500",
    label: "Warning",
  },
  info: {
    icon: Info,
    border: "border-l-2 border-blue-500/50",
    bg: "bg-blue-500/5",
    dot: "bg-blue-500",
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
    <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 h-full hover:border-gold-500/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
            <div className="absolute -inset-1 rounded-full bg-gold-500/20 animate-ping" />
          </div>
          <h3 className="text-sm font-semibold text-card-foreground font-heading">AI-Priority Alerts</h3>
        </div>
        {visibleAlerts.length > 0 && (
          <button onClick={dismissAll} className="text-[10px] text-muted-foreground hover:text-gold-400 transition-colors flex items-center gap-1 font-medium">
            <X className="w-3 h-3" /> Dismiss all
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
            <p className="text-sm text-muted-foreground font-medium">No alerts — all systems nominal</p>
          </motion.div>
        ) : (
          <div className="space-y-1.5">
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
                  transition={{ duration: 0.25 }}
                  className={cn("flex items-start gap-3 py-2.5 px-3 -mx-1 rounded-lg group cursor-pointer transition-all hover:bg-card/40", config.border, config.bg)}
                >
                  <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", config.dot)} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Icon className={cn("w-3.5 h-3.5 shrink-0", alert.severity === "critical" ? "text-red-400" : alert.severity === "warning" ? "text-amber-400" : "text-blue-400")} />
                      <p className="text-xs font-semibold text-card-foreground truncate">{alert.title}</p>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">{alert.description}</p>
                    <p className="text-[9px] text-muted-foreground/60 mt-1">{alert.time}</p>
                  </div>
                  <button
                    onClick={() => dismiss(alert.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      {visibleAlerts.length > 0 && (
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
          <span className="text-[10px] text-muted-foreground/60">{visibleAlerts.length} alert{visibleAlerts.length !== 1 ? "s" : ""} • AI-prioritized</span>
          <button className="text-[10px] text-gold-400 hover:text-gold-300 transition-colors flex items-center gap-1 font-medium">
            <RefreshCw className="w-3 h-3" /> Refresh
          </button>
        </div>
      )}
    </div>
  );
}
