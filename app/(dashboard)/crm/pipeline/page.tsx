"use client";

import { useState } from "react";
import { Metadata } from "next";
import KanbanBoard from "../components/KanbanBoard";
import { Plus, Filter, Search, ArrowLeft, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NewLeadModal from "../components/NewLeadModal";

export default function PipelinePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 shrink-0">
        <div className="space-y-2">
          <Link href="/crm" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-blue-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to CRM Intelligence
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Sales <span className="text-blue-600">Pipeline</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Strategic deal flow visualizer and stage management.
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative hidden lg:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search deals..."
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-4 focus:ring-injaazh-500/10 outline-none w-64 transition-all font-medium"
            />
          </div>
          <Button variant="outline" className="rounded-2xl h-12 px-6 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm">
            <Filter className="w-4 h-4 mr-2 text-slate-400" /> Filter
          </Button>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-2xl h-12 px-8 font-black shadow-xl shadow-injaazh-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4 mr-2" /> New Lead
          </Button>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-slate-50/50 dark:bg-slate-950/30 rounded-[32px] border border-slate-100 dark:border-slate-800/50 p-6 overflow-hidden">
        <KanbanBoard />
      </div>

      <NewLeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
