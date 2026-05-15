"use client";

import { useState } from "react";
import { 
  Plus, LayoutGrid, List, Search, 
  Filter, FileDown, Sparkles, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import InventoryStats from "../components/InventoryStats";
import ProductTable from "../components/ProductTable";
import ProductGrid from "../components/ProductGrid";
import Link from "next/link";
import AddProductModal from "../components/AddProductModal";

import { cn } from "@/lib/utils";

export default function ProductsPage() {
  const [view, setView] = useState<"grid" | "table">("grid");
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
            Product <span className="text-injaazh-600">Catalog</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage your items, tracking, and pricing across all warehouses.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl flex items-center mr-2 shadow-inner">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setView("grid")}
              className={cn("rounded-xl transition-all", view === "grid" ? "bg-white dark:bg-slate-800 shadow-md text-injaazh-600" : "opacity-40 hover:opacity-100")}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setView("table")}
              className={cn("rounded-xl transition-all", view === "table" ? "bg-white dark:bg-slate-800 shadow-md text-injaazh-600" : "opacity-40 hover:opacity-100")}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-2xl h-14 px-8 font-black shadow-xl shadow-injaazh-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5 mr-3" /> Add Product
          </Button>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="relative group rounded-2xl border border-injaazh-100 bg-injaazh-50/50 dark:bg-injaazh-950/20 dark:border-injaazh-900/30 p-4 pl-12 backdrop-blur-sm overflow-hidden">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Sparkles className="w-5 h-5 text-injaazh-600" />
        </div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          <span className="font-bold text-injaazh-600">AI Reorder Suggestion:</span> 5টি প্রোডাক্ট reorder point-এ পৌঁছেছে। 
          <span className="font-bold"> Cisco Switch</span> আগামী ১২ দিনের মধ্যে স্টকআউট হতে পারে।
          <span className="ml-2 text-injaazh-500 cursor-pointer hover:underline">Auto-generate PO →</span>
        </p>
      </div>

      <InventoryStats />

      {/* Filters & Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search products by name or SKU..."
            className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-10 border-slate-100">
            <Filter className="w-4 h-4 mr-2" /> Categories
          </Button>
          <Button variant="outline" className="rounded-xl h-10 border-slate-100">
            <FileDown className="w-4 h-4 mr-2" /> Export
          </Button>
        </div>
      </div>

      {view === "grid" ? <ProductGrid /> : <ProductTable />}
      
      <AddProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
