"use client";

import { useState } from "react";
import { 
  X,
  Loader2,
  Package,
  Image as ImageIcon,
  DollarSign,
  Layers,
  Hash
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProductModal({ isOpen, onClose }: AddProductModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      toast.success("Product Added Successfully!", {
        description: "The new item has been synchronized with all warehouses.",
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl">
        <div className="bg-slate-950 p-10 text-white relative">
          <div className="absolute top-0 right-0 w-80 h-80 bg-injaazh-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-injaazh-600 flex items-center justify-center shadow-lg shadow-injaazh-600/20">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                 <h2 className="text-3xl font-black tracking-tight">Register New Product</h2>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Inventory Asset Entry</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-slate-500 hover:text-white hover:bg-white/10">
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <form onSubmit={handleAddProduct} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Left Column - Basic Info */}
               <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product Name</Label>
                    <div className="relative">
                      <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                      <Input required placeholder="e.g. Cisco Switch 24P" className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:ring-injaazh-600 focus:border-injaazh-600 text-white font-medium" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">SKU Code</Label>
                      <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input required placeholder="SKU-001" className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:ring-injaazh-600 focus:border-injaazh-600 text-white font-medium" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</Label>
                      <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-5 text-white font-medium appearance-none outline-none">
                         <option className="bg-slate-900">Networking</option>
                         <option className="bg-slate-900">Laptops</option>
                         <option className="bg-slate-900">Peripherals</option>
                         <option className="bg-slate-900">Furniture</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Unit Price ($)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                        <Input required type="number" placeholder="450" className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:ring-injaazh-600 focus:border-injaazh-600 text-white font-medium" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Initial Stock</Label>
                      <Input required type="number" placeholder="100" className="h-14 bg-white/5 border-white/10 rounded-2xl px-5 focus:ring-injaazh-600 focus:border-injaazh-600 text-white font-medium" />
                    </div>
                  </div>
               </div>

               {/* Right Column - Media & Notes */}
               <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Product Image</Label>
                    <div className="h-40 bg-white/5 border-2 border-dashed border-white/10 rounded-[32px] flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-all group">
                       <ImageIcon className="w-8 h-8 text-slate-500 mb-2 group-hover:scale-110 transition-transform" />
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Upload or Drag Image</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                     <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Warehouse Location</Label>
                     <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-5 text-white font-medium appearance-none outline-none">
                        <option className="bg-slate-900">Main HQ Warehouse</option>
                        <option className="bg-slate-900">North Distribution Hub</option>
                        <option className="bg-slate-900">South Depot</option>
                     </select>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Reorder Level</Label>
                    <Input type="number" placeholder="10" className="h-14 bg-white/5 border-white/10 rounded-2xl px-5 focus:ring-injaazh-600 focus:border-injaazh-600 text-white font-medium" />
                  </div>
               </div>
            </div>
            
            <div className="pt-6">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-16 rounded-[24px] bg-injaazh-600 hover:bg-injaazh-500 text-white font-black shadow-2xl shadow-injaazh-600/40 text-lg tracking-tight active:scale-[0.98] transition-all"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> SYNCHRONIZING ASSET...</>
                ) : (
                  "REGISTER PRODUCT TO INVENTORY"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
