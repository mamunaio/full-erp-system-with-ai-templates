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
      prompt: "Show me a summary of current employee training programs and their status.",
    },
    {
      id: "jobs",
      label: "Active Job Openings",
      icon: Briefcase,
      prompt: "What are the active job openings in the company? Provide a summary.",
    },
    {
      id: "org",
      label: "Organization Chart",
      icon: Users,
      prompt: "Provide a text-based overview of the company's organizational structure and key departments.",
    },
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
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setInsight(data.text || data.response || "No data available at the moment.");
    } catch {
      setInsight("I'm sorry, I couldn't fetch that information right now.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
        <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Quick Actions</h3>
        <div className="space-y-2">
          {actions.map((action) => (
            <Button
              key={action.id}
              variant="outline"
              onClick={() => handleAction(action.label, action.prompt)}
              className="justify-start h-11 w-full rounded-lg text-muted-foreground hover:bg-gold-500/10 hover:text-gold-400 hover:border-gold-500/20 border-border transition-all"
            >
              <action.icon className="w-4 h-4 mr-3 text-gold-400" /> {action.label}
            </Button>
          ))}
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md bg-card/95 backdrop-blur-2xl border-l border-border p-0 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-border bg-card/40">
            <SheetHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-gold-400" />
                </div>
                <div>
                  <SheetTitle className="text-xl font-bold font-heading text-card-foreground">{title}</SheetTitle>
                  <SheetDescription className="text-xs text-muted-foreground">AI-Powered Quick Insight</SheetDescription>
                </div>
              </div>
            </SheetHeader>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4 text-muted-foreground">
                <Loader2 className="w-10 h-10 animate-spin text-gold-400" />
                <p className="text-sm animate-pulse">Analyzing company data...</p>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="bg-gold-500/5 border border-gold-500/20 p-4 rounded-2xl mb-6">
                  <p className="text-xs text-gold-400 font-bold uppercase tracking-wider mb-2 flex items-center">
                    <Sparkles className="w-3 h-3 mr-1" /> AI Summary
                  </p>
                  <p className="text-card-foreground leading-relaxed whitespace-pre-wrap">{insight}</p>
                </div>
                <div className="space-y-4">
                  <h5 className="text-sm font-bold text-card-foreground font-heading">Suggested Next Steps</h5>
                  <div className="space-y-2">
                    <button className="text-left w-full p-3 rounded-xl border border-border hover:bg-card/40 text-xs transition-all text-muted-foreground">
                      &bull; Download detailed report (PDF)
                    </button>
                    <button className="text-left w-full p-3 rounded-xl border border-border hover:bg-card/40 text-xs transition-all text-muted-foreground">
                      &bull; Share this insight with management
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-border bg-card/40">
            <Button
              onClick={() => setIsOpen(false)}
              className="w-full bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-xl font-bold transition-all active:scale-95"
            >
              Close Insight
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
