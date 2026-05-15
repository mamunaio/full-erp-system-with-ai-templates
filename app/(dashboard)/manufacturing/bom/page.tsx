"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Layers, 
  MoreVertical, 
  Copy, 
  Archive,
  ArrowLeft,
  X,
  Loader2,
  ChevronRight,
  Database,
  History,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function BOMPage() {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreateBOM = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(false);
      toast.success("New BOM Created Successfully!", {
        description: "Version v1.0 has been initialized for production.",
      });
    }, 1500);
  };

  if (!mounted) return null;

  const boms = [
    { id: "1", name: "Standard Assembly", product: "Injaazh Server X1", version: "v1.0", components: 12, cost: 1240.50, status: "ACTIVE" },
    { id: "2", name: "Premium Build", product: "Injaazh Server Pro", version: "v2.1", components: 18, cost: 2150.00, status: "ACTIVE" },
    { id: "3", name: "Legacy Config", product: "Injaazh Server X1", version: "v0.9", components: 10, cost: 980.00, status: "ARCHIVED" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/manufacturing" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-blue-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Manufacturing
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Bill of <span className="text-blue-600">Materials</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage product recipes, component costs and version history.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-2xl h-14 px-8 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm active:scale-95 transition-all">
            <History className="w-5 h-5 mr-3 text-slate-400" /> Version History
          </Button>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5 mr-3" /> Create New BOM
          </Button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex flex-wrap items-center justify-between gap-6">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search BOM by name or product..."
              className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" className="rounded-xl h-12 px-6 border-slate-200 dark:border-slate-800 font-bold text-xs uppercase tracking-widest">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
            <Button variant="outline" className="rounded-xl h-12 px-6 border-slate-200 dark:border-slate-800 font-bold text-xs uppercase tracking-widest">
              <Database className="w-4 h-4 mr-2" /> Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="p-6">BOM Name</th>
                <th className="p-6">Target Product</th>
                <th className="p-6">Version</th>
                <th className="p-6">Components</th>
                <th className="p-6">Unit Cost</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {boms.map((bom) => (
                <tr key={bom.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all group cursor-pointer">
                  <td className="p-6">
                    <div className="flex items-center space-x-3">
                       <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                          <Layers className="w-5 h-5" />
                       </div>
                       <span className="font-black text-slate-900 dark:text-white tracking-tight">{bom.name}</span>
                    </div>
                  </td>
                  <td className="p-6 font-bold text-sm text-slate-600 dark:text-slate-400">{bom.product}</td>
                  <td className="p-6">
                    <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-black tracking-widest uppercase">{bom.version}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center text-sm font-bold text-slate-900 dark:text-white">
                       <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 px-2 py-0.5 rounded mr-2 text-[10px]">{bom.components}</span>
                       Items
                    </div>
                  </td>
                  <td className="p-6 font-black text-sm text-emerald-600">${bom.cost.toLocaleString()}</td>
                  <td className="p-6">
                    <span className={cn(
                      "px-3 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border",
                      bom.status === "ACTIVE" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-100"
                    )}>
                      {bom.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50">
                        <Archive className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl text-slate-400">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* New BOM Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl bg-white dark:bg-slate-950">
          <div className="bg-slate-950 p-10 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-600/20 text-white">B</div>
                <div>
                   <h2 className="text-3xl font-black tracking-tight">Create New BOM</h2>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Product Recipe Initialization</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsModalOpen(false)} className="rounded-full text-slate-500 hover:text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={handleCreateBOM} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">BOM Name</Label>
                  <Input required placeholder="e.g. RTX 4090 Final Assembly" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Target Product</Label>
                  <Input required placeholder="Search product..." className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">BOM Version</Label>
                    <Input required placeholder="v1.0" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5" />
                 </div>
                 <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Initial Component Count</Label>
                    <Input required type="number" placeholder="10" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5" />
                 </div>
              </div>

              <div className="bg-blue-600/5 border border-blue-500/20 rounded-2xl p-4 flex items-start space-x-3">
                 <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                 <p className="text-[10px] text-blue-200/70 font-medium leading-relaxed">
                   Creating a new BOM will initialize the component list and cost structure. You can add specific line items after initialization.
                 </p>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-[24px] bg-blue-600 hover:bg-blue-500 text-white font-black shadow-2xl shadow-blue-600/40 text-lg tracking-tight active:scale-[0.98] transition-all"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> INITIALIZING RECIPE...</>
                  ) : (
                    "INITIALIZE BOM STRUCTURE"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
