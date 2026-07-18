"use client";

import { useEffect, useState } from "react";
import { Sparkles, X, AlertTriangle, TrendingUp, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Insight {
  type: "warning" | "success" | "info";
  text: string;
}

const icons = {
  warning: AlertTriangle,
  success: TrendingUp,
  info: Info,
};

const iconStyles = {
  warning: {
    icon: "text-amber-600 dark:text-amber-400",
    bg: "bg-gradient-to-br from-amber-500/20 to-amber-500/5",
    border: "border-amber-200 dark:border-amber-500/20",
  },
  success: {
    icon: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-gradient-to-br from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-200 dark:border-emerald-500/20",
  },
  info: {
    icon: "text-blue-600 dark:text-blue-400",
    bg: "bg-gradient-to-br from-blue-500/20 to-blue-500/5",
    border: "border-blue-200 dark:border-blue-500/20",
  },
};

export default function AIInsightBanner() {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    async function fetchInsights() {
      try {
        const res = await fetch("/api/ai/dashboard-insights");
        const data = await res.json();
        if (data.insights) setInsights(data.insights);
      } catch {
        // Silently handle
      }
    }
    fetchInsights();
  }, []);

  useEffect(() => {
    if (insights.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % insights.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [insights]);

  if (!isVisible || insights.length === 0) return null;

  const current = insights[currentIndex];
  const Icon = icons[current.type] || Sparkles;
  const style = iconStyles[current.type] || iconStyles.info;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: -12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.98 }}
        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn("relative flex items-center gap-4 rounded-2xl border px-5 py-4 backdrop-blur-sm", style.bg, style.border)}
      >
        <div className="relative">
          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", style.bg, "border", style.border)}>
            <Icon className={cn("w-5 h-5", style.icon)} />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <Sparkles className="w-3 h-3 text-primary" />
            <p className="text-[10px] text-primary uppercase tracking-widest font-bold">AI Insight</p>
          </div>
          <p className="text-sm text-card-foreground font-medium leading-relaxed">{current.text}</p>
        </div>

        {insights.length > 1 && (
          <div className="flex items-center gap-1.5 shrink-0">
            {insights.map((_, i) => (
              <div key={i} className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                i === currentIndex ? "bg-primary w-4" : "bg-border"
              )} />
            ))}
          </div>
        )}

        <button onClick={() => setIsVisible(false)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0 p-1 rounded-lg hover:bg-card/50">
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
