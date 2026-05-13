"use client";

import { useEffect, useState } from "react";
import { Sparkles, X, AlertTriangle, TrendingUp, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Insight {
  type: "warning" | "success" | "info";
  text: string;
}

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
      } catch (err) {
        console.error("Failed to fetch AI insights");
      }
    }
    fetchInsights();
  }, []);

  useEffect(() => {
    if (insights.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % insights.length);
      }, 8000);
      return () => clearInterval(timer);
    }
  }, [insights]);

  if (!isVisible || insights.length === 0) return null;

  const currentInsight = insights[currentIndex];

  const icons = {
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    success: <TrendingUp className="w-5 h-5 text-emerald-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="relative group mb-8 rounded-2xl border border-injaazh-100 bg-injaazh-50/50 dark:bg-injaazh-950/20 dark:border-injaazh-900/30 p-4 pl-12 backdrop-blur-sm overflow-hidden"
      >
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          {icons[currentInsight.type] || <Sparkles className="w-5 h-5 text-injaazh-500" />}
        </div>
        
        <div className="flex items-center justify-between pr-8">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-injaazh-600 block mb-0.5">AI Insight</span>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
              {currentInsight.text}
            </p>
          </div>
          <button 
            onClick={() => setIsVisible(false)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Animated background element */}
        <div className="absolute right-[-20px] top-[-20px] w-40 h-40 bg-injaazh-500/5 rounded-full blur-3xl pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
