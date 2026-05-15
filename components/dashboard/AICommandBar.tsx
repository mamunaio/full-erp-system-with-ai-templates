"use client";

import { useState, useEffect } from "react";
import { Sparkles, Send, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const suggestions = [
  "Show me this month's revenue",
  "Which employees are on leave today?",
  "Top 5 selling products"
];

export default function AICommandBar() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAsk() {
    if (!query.trim()) return;
    setIsLoading(true);
    setResponse(null);

    try {
      const res = await fetch("/api/ai/query", {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      
      if (data.error) {
        setResponse(`Error: ${data.error}`);
      } else {
        // Handle both 'text' and 'response' fields for compatibility
        setResponse(data.text || data.response);
      }
    } catch (err) {
      setResponse("I'm sorry, I couldn't process that query right now.");
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    if (response) {
      const timer = setTimeout(() => {
        setResponse(null);
      }, 15000); // Auto-dismiss after 15 seconds
      return () => clearTimeout(timer);
    }
  }, [response]);

  return (
    <div className="space-y-4 mb-10">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-injaazh-500 to-blue-600 rounded-2xl blur-lg opacity-10 group-focus-within:opacity-20 transition-opacity" />
        <div className="relative flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-2 pl-6 shadow-xl transition-all">
          <Sparkles className="w-5 h-5 text-injaazh-500 mr-4" />
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
            placeholder="Ask AI anything about your business..."
            className="flex-1 bg-transparent border-none outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 font-medium"
          />
          <Button 
            onClick={handleAsk}
            disabled={isLoading || !query.trim()}
            className="rounded-xl bg-injaazh-600 hover:bg-injaazh-700 h-10 w-10 p-0"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s) => (
          <button
            key={s}
            onClick={() => setQuery(s)}
            className="text-xs px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 hover:border-injaazh-500 hover:text-injaazh-600 transition-all text-slate-500"
          >
            {s}
          </button>
        ))}
      </div>

      {response && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-injaazh-100 dark:border-injaazh-900/50 shadow-lg animate-in fade-in slide-in-from-top-4">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 rounded-full bg-injaazh-100 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-injaazh-600" />
            </div>
            <div className="flex-1 prose prose-sm dark:prose-invert">
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                {response}
              </p>
            </div>
            <button 
              onClick={() => setResponse(null)}
              className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
