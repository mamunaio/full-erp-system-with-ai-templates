"use client";

import { useEffect, useState } from "react";
import { Sparkles, AlertTriangle, TrendingUp, Info, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Insight {
  type: "warning" | "success" | "info";
  text: string;
}

const icons = { warning: AlertTriangle, success: TrendingUp, info: Info };
const iconColors = {
  warning: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-500/15",
  success: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/15",
  info: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-500/15",
};

export default function AIInsightPanel() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchInsights() {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/dashboard-insights");
      const data = await res.json();
      setInsights(data.insights || []);
    } catch {
      setInsights([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchInsights(); }, []);

  return (
    <div className="rounded-2xl border border-border bg-card p-5 relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-primary/5 blur-[40px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <h3 className="text-sm font-semibold text-card-foreground">AI Insights</h3>
          </div>
          <button onClick={fetchInsights} className="text-muted-foreground hover:text-card-foreground transition-colors p-1 rounded-lg hover:bg-secondary">
            <RefreshCw className={cn("w-3.5 h-3.5", loading && "animate-spin")} />
          </button>
        </div>

        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-14 rounded-xl bg-secondary/50 animate-pulse" />
            ))}
          </div>
        ) : insights.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4">No insights available.</p>
        ) : (
          <div className="space-y-2">
            {insights.map((insight, i) => {
              const Icon = icons[insight.type] || Info;
              return (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50">
                  <div className={cn("w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5", iconColors[insight.type])}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-xs text-card-foreground leading-relaxed font-medium">{insight.text}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
