"use client";

import { useState, useEffect } from "react";
import { 
  Sparkles, 
  MessageSquare, 
  Lightbulb, 
  Zap, 
  ArrowLeft,
  Activity,
  Brain,
  Cpu,
  Fingerprint,
  MoreVertical,
  ShieldCheck
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIChat from "./components/AIChat";
import AIInsights from "./components/AIInsights";
import AutomationList from "./components/AutomationList";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function AIHubPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <Link href="/dashboard" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-blue-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to App Dashboard
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-600/30 relative group">
              <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <Brain className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div>
               <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white italic uppercase leading-none">
                 Injaazh <span className="text-blue-600">AI Hub</span>
               </h1>
               <p className="text-slate-500 text-sm font-medium mt-1">
                 The central brain of your ERP. Ask questions, get insights, and automate.
               </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
           <div className="bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Intelligence Active</span>
              </div>
              <div className="h-4 w-px bg-slate-100 dark:bg-slate-800" />
              <div className="flex items-center space-x-2">
                 <Cpu className="w-4 h-4 text-blue-600" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 font-mono">L40-v3 Cluster</span>
              </div>
           </div>
        </div>
      </div>

      <Tabs defaultValue="chat" className="space-y-10">
        <TabsList className="bg-white dark:bg-slate-950 p-1.5 rounded-[32px] h-20 border border-slate-100 dark:border-slate-900 shadow-inner flex items-center overflow-x-auto no-scrollbar">
          <TabsTrigger value="chat" className="rounded-2xl px-10 h-16 text-[10px] font-black uppercase tracking-[0.1em] data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900 shadow-xl transition-all flex items-center group">
            <MessageSquare className="w-4 h-4 mr-3 opacity-50 group-data-[state=active]:opacity-100" /> AI Assistant
          </TabsTrigger>
          <TabsTrigger value="insights" className="rounded-2xl px-10 h-16 text-[10px] font-black uppercase tracking-[0.1em] data-[state=active]:bg-slate-900 data-[state=active]:text-white dark:data-[state=active]:bg-white dark:data-[state=active]:text-slate-900 shadow-xl transition-all flex items-center group">
            <Lightbulb className="w-4 h-4 mr-3 opacity-50 group-data-[state=active]:opacity-100" /> Strategic Insights
          </TabsTrigger>
          <TabsTrigger value="automations" className="rounded-2xl px-10 h-16 text-[10px] font-black uppercase tracking-[0.1em] data-[state=active]:bg-blue-600 data-[state=active]:text-white shadow-xl transition-all flex items-center group">
            <Zap className="w-4 h-4 mr-3 opacity-50 group-data-[state=active]:opacity-100" /> AI Automations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-0 outline-none">
          <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden h-[700px] flex flex-col relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600" />
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
    </div>
  );
}
