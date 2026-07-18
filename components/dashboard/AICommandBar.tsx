"use client";

import { useState, useEffect } from "react";
import { Sparkles, Send, Loader2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const defaultSuggestions = [
  "Revenue analysis",
  "Anomaly detection",
  "Top opportunities",
  "Forecast next quarter",
  "Inventory status",
];

interface AICommandBarProps {
  suggestions?: string[];
}

export default function AICommandBar({ suggestions: customSuggestions }: AICommandBarProps) {
  const suggestions = customSuggestions ?? defaultSuggestions;
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  async function handleAsk() {
    if (!query.trim()) return;
    setIsLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/ai/query", {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setResponse(data.text || data.response || data.error || "No response available.");
    } catch {
      setResponse("Could not process that query right now.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => setResponse(null), 15000);
      return () => clearTimeout(timer);
    }
  }, [response]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r from-gold-500/10 via-gold-400/10 to-gold-500/10 blur-lg transition-opacity duration-500 pointer-events-none ${isFocused ? "opacity-100" : "opacity-0"}`} />

        <div className={`relative flex items-center bg-card/40 backdrop-blur-2xl rounded-2xl border p-2 pl-4 transition-all duration-300 shadow-[0_0_30px_rgba(201,149,46,0.1)] ${isFocused ? "border-gold-500/40 shadow-[0_0_20px_rgba(201,149,46,0.15)]" : "border-gold-500/20"}`}>
          <Sparkles className="w-5 h-5 text-gold-400 shrink-0 gold-sparkle" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Ask AI anything about your business..."
            className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground/50 px-4 py-3 font-medium"
          />
          <button
            onClick={handleAsk}
            disabled={isLoading || !query.trim()}
            className="w-10 h-10 rounded-xl bg-gold-500 hover:bg-gold-600 text-obsidian-900 flex items-center justify-center shrink-0 shadow-lg shadow-gold-500/25 transition-all duration-200 disabled:opacity-50 disabled:shadow-none active:scale-95"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto scrollbar-thin px-1">
        {suggestions.map((s, i) => (
          <motion.button
            key={s}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => setQuery(s)}
            className="whitespace-nowrap text-xs px-3 py-1.5 rounded-full border border-gold-500/20 text-gold-400 hover:bg-gold-500/10 transition-all duration-200 font-medium"
          >
            {s}
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative overflow-hidden rounded-xl bg-card/40 backdrop-blur-xl border border-gold-500/20 p-5"
          >
            <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gold-500/10 blur-[40px] pointer-events-none" />

            <div className="relative z-10 flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-4 h-4 text-gold-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] text-gold-400 uppercase tracking-widest font-bold mb-1.5">AI Response</p>
                <p className="text-sm text-card-foreground leading-relaxed font-medium">{response}</p>
              </div>
              <button onClick={() => setResponse(null)} className="text-muted-foreground hover:text-foreground transition-colors shrink-0 p-1 rounded-lg hover:bg-card/50">
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
