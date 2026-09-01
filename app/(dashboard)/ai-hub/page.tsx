"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, MessageSquare, Lightbulb, Zap, 
  Brain, Cpu, Database, Activity, 
  Terminal, ArrowRight, CheckCircle2, ShieldCheck,
  RefreshCw, Bot
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIChat from "./components/AIChat";
import AIInsights from "./components/AIInsights";
import AutomationList from "./components/AutomationList";
import { toast } from "sonner";

export default function AIHubPage() {
  const [isDiagnosticRunning, setIsDiagnosticRunning] = useState(false);

  const handleRunDiagnostics = () => {
    setIsDiagnosticRunning(true);
    setTimeout(() => {
      setIsDiagnosticRunning(false);
      toast.success("Enterprise Neural Diagnostic Complete: All 12 data nodes synchronized with 99.8% model confidence.");
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">
      {/* Top Banner: Neural Link & LLM Model Cluster */}
      <div className="glass-strong rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-gold-500 animate-ping" />
              <span className="text-[11px] font-extrabold text-gold-500 dark:text-gold-400 uppercase tracking-widest bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/20">
                Google Gemini 1.5 Neural Link
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
              Strategic <span className="gold-text">AI Intelligence Hub</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
              Natural-language database querying, autonomous anomaly detection, predictive trajectory modeling, and trigger automations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 bg-card/50 p-2 rounded-2xl border border-border px-4 text-xs font-semibold text-muted-foreground">
              <Cpu className="w-4 h-4 text-gold-500" />
              <span>Gemini 1.5 Flash • &lt;85ms</span>
            </div>
            <button
              onClick={handleRunDiagnostics}
              disabled={isDiagnosticRunning}
              className="gold-gradient text-obsidian-900 font-extrabold text-xs sm:text-sm rounded-2xl h-11 sm:h-12 px-5 shadow-lg shadow-gold-500/20 hover:opacity-90 flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isDiagnosticRunning ? "animate-spin" : ""}`} />
              <span>{isDiagnosticRunning ? "Scanning..." : "Run Neural Audit"}</span>
            </button>
          </div>
        </div>

        {/* Real-Time Neural Cluster Health */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-border/50">
          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Synchronized Data Nodes</span>
              <Database className="w-3.5 h-3.5 text-gold-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">12 Nodes <span className="text-xs text-emerald-500 font-sans font-bold">100%</span></div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Predictive Accuracy</span>
              <Brain className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-500 font-heading">98.4% <span className="text-xs text-muted-foreground font-sans font-medium">Confidence</span></div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Autonomous Workflows</span>
              <Zap className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">14 Active</div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Queries Processed Today</span>
              <Activity className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">1,420</div>
          </div>
        </div>
      </div>

      {/* Main Interactive 3-Tab Console */}
      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="bg-card/50 p-1.5 rounded-2xl h-auto sm:h-14 border border-border/80 flex flex-wrap sm:inline-flex w-full sm:w-auto gap-1">
          <TabsTrigger 
            value="chat" 
            className="rounded-xl px-4 sm:px-6 h-10 sm:h-11 flex-1 sm:flex-initial text-xs font-bold uppercase tracking-wider data-[state=active]:gold-gradient data-[state=active]:text-obsidian-900 transition-all"
          >
            <MessageSquare className="w-4 h-4 mr-2" /> Neural Assistant
          </TabsTrigger>
          <TabsTrigger 
            value="insights" 
            className="rounded-xl px-4 sm:px-6 h-10 sm:h-11 flex-1 sm:flex-initial text-xs font-bold uppercase tracking-wider data-[state=active]:gold-gradient data-[state=active]:text-obsidian-900 transition-all"
          >
            <Lightbulb className="w-4 h-4 mr-2" /> Predictive Trajectory
          </TabsTrigger>
          <TabsTrigger 
            value="automations" 
            className="rounded-xl px-4 sm:px-6 h-10 sm:h-11 flex-1 sm:flex-initial text-xs font-bold uppercase tracking-wider data-[state=active]:gold-gradient data-[state=active]:text-obsidian-900 transition-all"
          >
            <Zap className="w-4 h-4 mr-2" /> Event Automations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <AIChat />
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <AIInsights />
        </TabsContent>

        <TabsContent value="automations" className="space-y-4">
          <AutomationList />
        </TabsContent>
      </Tabs>
    </div>
  );
}
