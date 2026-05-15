"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  ArrowLeft, 
  MoreVertical,
  Layers,
  LayoutGrid,
  FileEdit,
  Trash2,
  ChevronRight,
  Monitor,
  Laptop,
  MousePointer2,
  Armchair
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import AddCategoryModal from "../components/AddCategoryModal";

export default function CategoriesPage() {
  const [mounted, setMounted] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEdit = (name: string) => {
    toast.info(`Editing category: ${name}`);
  };

  const handleDelete = (name: string) => {
    toast.error(`Delete requested for: ${name}`, {
      description: "Permanent deletion requires admin confirmation.",
    });
  };

  const categories = [
    { id: 1, name: "Networking", count: 124, icon: Monitor, color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
    { id: 2, name: "Laptops", count: 85, icon: Laptop, color: "text-injaazh-600", bg: "bg-injaazh-50 dark:bg-injaazh-900/20" },
    { id: 3, name: "Peripherals", count: 240, icon: MousePointer2, color: "text-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
    { id: 4, name: "Furniture", count: 42, icon: Armchair, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/inventory" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-injaazh-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Inventory
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Inventory <span className="text-injaazh-600">Categories</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Organize and classify your products for efficient tracking.
          </p>
        </div>
        
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-injaazh-600/20 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5 mr-3" /> Add Category
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {categories.map((cat) => (
           <Link key={cat.id} href={`/inventory/categories/${cat.name.toLowerCase().replace(' ', '-')}`}>
              <CategoryCard {...cat} />
           </Link>
         ))}
      </div>

      {/* Categories Table/List View */}
      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
         <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Manage Categories</h3>
            <div className="relative w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search categories..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl py-3 pl-11 pr-4 text-xs font-medium outline-none focus:ring-4 focus:ring-injaazh-500/10 transition-all"
              />
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                  <th className="pb-4">Category Name</th>
                  <th className="pb-4">Items Count</th>
                  <th className="pb-4">Last Updated</th>
                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                {categories.map((cat) => (
                  <tr key={cat.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
                    <td className="py-5">
                      <Link href={`/inventory/categories/${cat.name.toLowerCase().replace(' ', '-')}`} className="flex items-center space-x-3">
                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", cat.bg)}>
                          <cat.icon className={cn("w-5 h-5", cat.color)} />
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white hover:text-injaazh-600 transition-colors">{cat.name}</span>
                      </Link>
                    </td>
                    <td className="py-5">
                       <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full text-[10px] font-black text-slate-500">{cat.count} Products</span>
                    </td>
                    <td className="py-5 text-xs font-bold text-slate-500">May 15, 2026</td>
                    <td className="py-5 text-right">
                       <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => { e.stopPropagation(); handleEdit(cat.name); }}
                            className="w-8 h-8 rounded-lg hover:text-injaazh-600"
                          >
                            <FileEdit className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={(e) => { e.stopPropagation(); handleDelete(cat.name); }}
                            className="w-8 h-8 rounded-lg hover:text-rose-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                       </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
      </div>

      <AddCategoryModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
    </div>
  );
}

function CategoryCard({ name, count, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 relative overflow-hidden cursor-pointer">
      <div className={cn("absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl opacity-20", bg)} />
      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500", bg)}>
        <Icon className={cn("w-7 h-7", color)} />
      </div>
      <h4 className="text-xl font-black text-slate-900 dark:text-white mb-1 group-hover:text-injaazh-600 transition-colors">{name}</h4>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{count} PRODUCTS IN STOCK</p>
      <div className="mt-6 flex items-center text-[10px] font-black text-injaazh-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
        View Items <ChevronRight className="w-3 h-3 ml-1" />
      </div>
    </div>
  );
}
