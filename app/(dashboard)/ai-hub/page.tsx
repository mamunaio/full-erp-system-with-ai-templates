"use client";

import { Sparkles, MessageSquare, Lightbulb, Zap } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIChat from "./components/AIChat";
import AIInsights from "./components/AIInsights";
import AutomationList from "./components/AutomationList";

export default function AIHubPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-injaazh-600 to-blue-600 flex items-center justify-center shadow-lg shadow-injaazh-600/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Injaazh AI Hub
          </h1>
        </div>
        <p className="text-slate-500">
          The central brain of your ERP. Ask questions, get insights, and automate your business.
        </p>
      </div>

      <Tabs defaultValue="chat" className="space-y-6">
        <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 rounded-xl h-12">
          <TabsTrigger value="chat" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm px-6">
            <MessageSquare className="w-4 h-4 mr-2" /> AI Assistant
          </TabsTrigger>
          <TabsTrigger value="insights" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm px-6">
            <Lightbulb className="w-4 h-4 mr-2" /> AI Insights
          </TabsTrigger>
          <TabsTrigger value="automations" className="rounded-lg data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:shadow-sm px-6">
            <Zap className="w-4 h-4 mr-2" /> Automations
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-0 outline-none">
          <AIChat />
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
