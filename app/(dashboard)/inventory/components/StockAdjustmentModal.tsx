"use client";

import { useState } from "react";
import { 
  X,
  Loader2,
  RefreshCcw,
  Package,
  Warehouse,
  FileText,
  PlusCircle,
  MinusCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface StockAdjustmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function StockAdjustmentModal({ isOpen, onClose }: StockAdjustmentModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [adjustmentType, setAdjustmentType] = useState<"add" | "remove">("add");

  const handleAdjustment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      toast.success("Inventory Adjusted!", {
        description: "The stock levels have been updated and logged in the audit trail.",
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl">
        <div className="bg-slate-950 p-10 text-white relative">
          <div className="absolute top-0 right-0 w-72 h-72 bg-injaazh-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-injaazh-600 flex items-center justify-center shadow-lg shadow-injaazh-600/20">
                <RefreshCcw className="w-6 h-6 text-white" />
              </div>
              <div>
                 <h2 className="text-3xl font-black tracking-tight">Stock Adjustment</h2>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Inventory Correction Audit</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-slate-500 hover:text-white hover:bg-white/10">
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <form onSubmit={handleAdjustment} className="space-y-6 relative z-10">
            <div className="grid grid-cols-2 gap-4 p-1 bg-white/5 rounded-2xl border border-white/10">
               <button 
                 type="button"
                 onClick={() => setAdjustmentType("add")}
                 className={`flex items-center justify-center h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${adjustmentType === "add" ? "bg-emerald-500 text-white shadow-lg" : "text-slate-500 hover:text-white"}`}
               >
                 <PlusCircle className="w-4 h-4 mr-2" /> Add Stock
               </button>
               <button 
                 type="button"
                 onClick={() => setAdjustmentType("remove")}
                 className={`flex items-center justify-center h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${adjustmentType === "remove" ? "bg-rose-500 text-white shadow-lg" : "text-slate-500 hover:text-white"}`}
               >
                 <MinusCircle className="w-4 h-4 mr-2" /> Remove Stock
               </button>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Select Product</Label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 text-white font-medium appearance-none outline-none">
                   <option className="bg-slate-900">Cisco Switch 24P</option>
                   <option className="bg-slate-900">Dell Latitude 5420</option>
                   <option className="bg-slate-900">Cat6 Ethernet Cable</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Warehouse</Label>
                <div className="relative">
                  <Warehouse className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 text-white font-medium appearance-none outline-none">
                    <option className="bg-slate-900">Main HQ</option>
                    <option className="bg-slate-900">North Hub</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Adjustment Qty</Label>
                <Input required type="number" placeholder="0" className="h-14 bg-white/5 border-white/10 rounded-2xl px-5 focus:ring-injaazh-600 focus:border-injaazh-600 text-white font-medium" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Reason / Reference</Label>
              <div className="relative">
                <FileText className="absolute left-4 top-5 w-4 h-4 text-slate-500" />
                <textarea 
                  required
                  placeholder="e.g. Damage during transit, Inventory audit correction..." 
                  className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl pl-12 py-4 focus:ring-injaazh-600 focus:border-injaazh-600 text-white font-medium outline-none resize-none"
                />
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full h-16 rounded-[24px] font-black shadow-2xl text-lg tracking-tight active:scale-[0.98] transition-all ${adjustmentType === "add" ? "bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20" : "bg-rose-600 hover:bg-rose-500 shadow-rose-600/20"}`}
              >
                {isSubmitting ? (
                  <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> AUDITING FLOW...</>
                ) : (
                  adjustmentType === "add" ? "PERFORM STOCK ADDITION" : "PERFORM STOCK REMOVAL"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
