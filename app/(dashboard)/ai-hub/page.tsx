"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sparkles, MessageSquare, Lightbulb, Zap, Activity,
  Brain, Cpu, ArrowLeft
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIChat from "./components/AIChat";
import AIInsights from "./components/AIInsights";
import AutomationList from "./components/AutomationList";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import AICommandBar from "@/components/dashboard/AICommandBar";
import SmartAlerts from "@/components/dashboard/SmartAlerts";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const aiSuggestions = [ "Ask anything about your data", "Generate a report", "Analyze trends", "Optimize workflows" ];

export default function AIHubPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-xl border-2 border-gold-500/20" />
            <div className="absolute inset-0 rounded-xl border-2 border-transparent border-t-gold-500 animate-spin" />
            <div className="absolute inset-1 rounded-lg bg-gold-500/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
            </div>
          </div>
          <span className="text-sm text-muted-foreground font-medium">Loading AI Hub...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 pb-8 max-w-[1600px] mx-auto">
      <motion.div variants={fadeUp}>
        <div className="bg-card/40 backdrop-blur-2xl rounded-2xl border border-border p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-500/5 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gold-500/5 blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">AI Hub Online</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-gold-500 to-amber-600 flex items-center justify-center shadow-2xl shadow-gold-500/30">
                  <Brain className="w-7 h-7 text-obsidian-900" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-heading">
                    Injaazh <span className="text-gold-400">AI Hub</span>
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    The central brain of your ERP. Ask questions, get insights, and automate.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card/40 px-5 py-3 rounded-xl border border-border flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Intelligence Active</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-gold-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">L40-v3 Cluster</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AICommandBar suggestions={aiSuggestions} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <Tabs defaultValue="chat" className="space-y-6">
          <TabsList className="bg-card/40 p-1.5 rounded-2xl h-16 border border-border">
            <TabsTrigger value="chat" className="rounded-xl px-8 h-12 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-gold-500 data-[state=active]:text-obsidian-900 transition-all">
              <MessageSquare className="w-4 h-4 mr-2" /> AI Assistant
            </TabsTrigger>
            <TabsTrigger value="insights" className="rounded-xl px-8 h-12 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-gold-500 data-[state=active]:text-obsidian-900 transition-all">
              <Lightbulb className="w-4 h-4 mr-2" /> Strategic Insights
            </TabsTrigger>
            <TabsTrigger value="automations" className="rounded-xl px-8 h-12 text-[10px] font-bold uppercase tracking-widest data-[state=active]:bg-gold-500 data-[state=active]:text-obsidian-900 transition-all">
              <Zap className="w-4 h-4 mr-2" /> AI Automations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-0 outline-none">
            <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border overflow-hidden h-[700px] flex flex-col relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold-500 via-amber-500 to-gold-500" />
              <AIChat />
            </div>
          </TabsContent>

          <TabsContent value="insights" className="mt-0 outline-none">
            <AIInsights />
          </TabsContent>

          <TabsContent value="automations" className="mt-0 outline-none">
            <AutomationList />
          </TabsContent>
        </Tabs>
      </motion.div>
    </motion.div>
  );
}
