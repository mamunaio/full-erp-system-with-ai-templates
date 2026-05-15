"use client";

import { useState } from "react";
import { 
  ArrowLeft, 
  Plus, 
  FileDown, 
  Search, 
  Filter, 
  ArrowUpRight, 
  ArrowDownLeft,
  RefreshCcw,
  Clock,
  Warehouse,
  History,
  Package
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import StockAdjustmentModal from "../components/StockAdjustmentModal";
import MovementLog from "../components/MovementLog";

export default function MovementsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/inventory" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-injaazh-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Inventory
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Inventory <span className="text-injaazh-600">Movements</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Full audit log of every item entering or leaving your warehouses.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-2xl h-14 px-8 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm">
            <FileDown className="w-5 h-5 mr-3 text-slate-400" /> Export Log
          </Button>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-injaazh-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5 mr-3" /> New Adjustment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all duration-500">
            <div className="flex items-center space-x-6">
               <div className="w-16 h-16 rounded-[24px] bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <ArrowDownLeft className="w-8 h-8 text-emerald-600" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Stock In</p>
                  <p className="text-3xl font-black tracking-tight text-emerald-600">2,450 Units</p>
               </div>
            </div>
            <div className="text-right hidden sm:block">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Purchases & Returns</p>
            </div>
         </div>

         <div className="bg-white dark:bg-slate-900 p-8 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all duration-500">
            <div className="flex items-center space-x-6">
               <div className="w-16 h-16 rounded-[24px] bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
                  <ArrowUpRight className="w-8 h-8 text-rose-600" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Stock Out</p>
                  <p className="text-3xl font-black tracking-tight text-rose-600">1,820 Units</p>
               </div>
            </div>
            <div className="text-right hidden sm:block">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Sales & Transfers</p>
            </div>
         </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
           <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by SKU, product or reference..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-xs font-medium outline-none focus:ring-4 focus:ring-injaazh-500/10 transition-all"
              />
           </div>
           <div className="flex items-center space-x-2">
              <Button variant="outline" className="rounded-xl h-11 border-slate-100 text-[10px] font-black uppercase tracking-widest"><Filter className="w-4 h-4 mr-2" /> All Types</Button>
              <Button variant="outline" className="rounded-xl h-11 border-slate-100 text-[10px] font-black uppercase tracking-widest"><Clock className="w-4 h-4 mr-2" /> Last 30 Days</Button>
           </div>
        </div>

        <MovementLog />
      </div>

      <StockAdjustmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
