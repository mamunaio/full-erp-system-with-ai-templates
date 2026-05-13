import { Metadata } from "next";
import MovementLog from "../components/MovementLog";
import { Search, Filter, FileDown, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Stock Movements | Injaazh ERP",
};

export default function MovementsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Inventory Movements
          </h1>
          <p className="text-slate-500 text-sm">
            Full audit log of every item entering or leaving your warehouses.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-slate-200">
            <FileDown className="w-5 h-5 mr-2" /> Export Log
          </Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
            New Adjustment
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <ArrowDownLeft className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total In</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">2,450 units</p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Out</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">1,820 units</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by SKU, product or reference..."
            className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-10 border-slate-100">
            <Filter className="w-4 h-4 mr-2" /> All Types
          </Button>
          <Button variant="outline" className="rounded-xl h-10 border-slate-100">
            Last 30 Days
          </Button>
        </div>
      </div>

      <MovementLog />
    </div>
  );
}
