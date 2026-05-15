"use client";

import { useState } from "react";
import { GraduationCap, Briefcase, Users, Loader2, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

export default function HRMQuickActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [insight, setInsight] = useState<string | null>(null);

  const actions = [
    { 
      id: "training",
      label: "Training Programs", 
      icon: GraduationCap, 
      prompt: "Show me a summary of current employee training programs and their status."
    },
    { 
      id: "jobs",
      label: "Active Job Openings", 
      icon: Briefcase, 
      prompt: "What are the active job openings in the company? Provide a summary."
    },
    { 
      id: "org",
      label: "Organization Chart", 
      icon: Users, 
      prompt: "Provide a text-based overview of the company's organizational structure and key departments."
    }
  ];

  async function handleAction(label: string, prompt: string) {
    setTitle(label);
    setInsight(null);
    setLoading(true);
    setIsOpen(true);

    try {
      const res = await fetch("/api/ai/query", {
        method: "POST",
        body: JSON.stringify({ query: prompt }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      setInsight(data.text || data.response || "No data available at the moment.");
    } catch (err) {
      setInsight("I'm sorry, I couldn't fetch that information right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="space-y-4">
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Quick Actions</h4>
        <div className="grid grid-cols-1 gap-3">
          {actions.map((action) => (
            <Button 
              key={action.id}
              variant="outline" 
              onClick={() => handleAction(action.label, action.prompt)}
              className="justify-start h-12 rounded-xl text-slate-600 hover:bg-injaazh-50 hover:text-injaazh-700 hover:border-injaazh-200 focus:ring-2 focus:ring-injaazh-500 transition-all"
            >
              <action.icon className="w-5 h-5 mr-3 text-injaazh-600" /> {action.label}
            </Button>
          ))}
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
            <SheetHeader>
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-injaazh-100 dark:bg-injaazh-900/50 flex items-center justify-center text-injaazh-600">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <SheetTitle className="text-xl font-bold">{title}</SheetTitle>
                  <SheetDescription className="text-xs">AI-Powered Quick Insight</SheetDescription>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4 text-slate-400">
                <Loader2 className="w-10 h-10 animate-spin text-injaazh-500" />
                <p className="text-sm animate-pulse">Analyzing company data...</p>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="bg-injaazh-50/50 dark:bg-injaazh-900/10 border border-injaazh-100 dark:border-injaazh-900/30 p-4 rounded-2xl mb-6">
                   <p className="text-xs text-injaazh-600 font-bold uppercase tracking-wider mb-2 flex items-center">
                     <Sparkles className="w-3 h-3 mr-1" /> AI Summary
                   </p>
                   <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                     {insight}
                   </p>
                </div>
                
                <div className="space-y-4">
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">Suggested Next Steps</h5>
                  <div className="grid grid-cols-1 gap-2">
                    <button className="text-left p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs transition-all">
                      • Download detailed report (PDF)
                    </button>
                    <button className="text-left p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-xs transition-all">
                      • Share this insight with management
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30">
            <Button onClick={() => setIsOpen(false)} className="w-full bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl">
              Close Insight
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
