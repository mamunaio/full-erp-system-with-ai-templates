"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Search, 
  Filter, 
  ArrowUpDown, 
  MoreHorizontal,
  Package,
  AlertCircle,
  TrendingUp,
  Warehouse
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CategoryDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Formatting slug for display (e.g., "networking" -> "Networking")
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1).replace("-", " ");

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/inventory/categories" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-injaazh-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Categories
          </Link>
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 rounded-xl bg-injaazh-600 flex items-center justify-center shadow-lg shadow-injaazh-600/20">
                <Package className="w-5 h-5 text-white" />
             </div>
             <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
               {categoryName} <span className="text-injaazh-600">Inventory</span>
             </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            Detailed overview of all assets registered under the {categoryName} segment.
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
           <Button variant="outline" className="rounded-2xl h-12 px-6 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900">
              Export PDF
           </Button>
           <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-2xl h-12 px-8 font-black shadow-xl shadow-injaazh-600/20 transition-all active:scale-95">
              Bulk Action
           </Button>
        </div>
      </div>

      {/* Category Specific Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 flex items-center space-x-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center">
               <TrendingUp className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Valuation</p>
               <p className="text-xl font-black text-slate-900 dark:text-white">$45,280.00</p>
            </div>
         </div>
         <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 flex items-center space-x-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center">
               <AlertCircle className="w-6 h-6 text-rose-600" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Low Stock Items</p>
               <p className="text-xl font-black text-slate-900 dark:text-white">04 Critical</p>
            </div>
         </div>
         <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-100 dark:border-slate-800 flex items-center space-x-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
               <Warehouse className="w-6 h-6 text-blue-600" />
            </div>
            <div>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Location</p>
               <p className="text-xl font-black text-slate-900 dark:text-white">Main Warehouse HQ</p>
            </div>
         </div>
      </div>

      {/* Product List for this Category */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Segmented Assets</h3>
            <div className="flex items-center space-x-3">
               <div className="relative w-64">
                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search within this category..."
                   className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-xs font-medium outline-none"
                 />
               </div>
               <Button variant="outline" size="icon" className="rounded-xl border-slate-100"><Filter className="w-4 h-4" /></Button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                  <th className="pb-4">Asset Name</th>
                  <th className="pb-4">SKU Code</th>
                  <th className="pb-4">Stock Level</th>
                  <th className="pb-4">Price</th>
                  <th className="pb-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                 {[1,2,3,4,5].map((i) => (
                    <tr key={i} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
                      <td className="py-5">
                         <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-xs text-slate-400">P{i}</div>
                            <span className="font-bold text-slate-900 dark:text-white">{categoryName} Product {i}</span>
                         </div>
                      </td>
                      <td className="py-5 text-xs font-bold text-slate-500">SKU-CAT-00{i}</td>
                      <td className="py-5">
                         <div className="flex flex-col space-y-1 w-32">
                            <div className="flex justify-between text-[8px] font-black uppercase text-slate-400">
                               <span>{i * 15}% Stock</span>
                            </div>
                            <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                               <div className={cn("h-full rounded-full", i < 2 ? "bg-rose-500" : "bg-injaazh-600")} style={{ width: `${i * 15}%` }} />
                            </div>
                         </div>
                      </td>
                      <td className="py-5 font-black text-slate-900 dark:text-white">${(i * 120).toFixed(2)}</td>
                      <td className="py-5 text-right">
                         <Button variant="ghost" size="icon" className="rounded-xl hover:text-injaazh-600"><MoreHorizontal className="w-4 h-4" /></Button>
                      </td>
                    </tr>
                 ))}
              </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}
