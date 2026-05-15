"use client";

import { useState } from "react";
import { 
  X,
  Loader2,
  Warehouse,
  MapPin,
  User,
  Database
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddWarehouseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddWarehouseModal({ isOpen, onClose }: AddWarehouseModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateWarehouse = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      toast.success("New Warehouse Registered!", {
        description: "The location is now ready for inventory distribution.",
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
                <Warehouse className="w-6 h-6 text-white" />
              </div>
              <div>
                 <h2 className="text-3xl font-black tracking-tight">Add Warehouse</h2>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Strategic Asset Storage</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-slate-500 hover:text-white hover:bg-white/10">
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <form onSubmit={handleCreateWarehouse} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Warehouse Name</Label>
              <Input required placeholder="e.g. Central Logistics Hub" className="h-14 bg-white/5 border-white/10 rounded-2xl px-5 focus:ring-injaazh-600 focus:border-injaazh-600 text-white font-medium" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Location / City</Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input required placeholder="Dhaka, BD" className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:ring-injaazh-600 focus:border-injaazh-600 text-white font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Warehouse Manager</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input required placeholder="John Doe" className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:ring-injaazh-600 focus:border-injaazh-600 text-white font-medium" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Storage Capacity (Units)</Label>
                <div className="relative">
                  <Database className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <Input required type="number" placeholder="5000" className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:ring-injaazh-600 focus:border-injaazh-600 text-white font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Warehouse Type</Label>
                <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl px-5 text-white font-medium appearance-none outline-none">
                   <option className="bg-slate-900">Cold Storage</option>
                   <option className="bg-slate-900">Dry Storage</option>
                   <option className="bg-slate-900">Distribution Center</option>
                </select>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-16 rounded-[24px] bg-injaazh-600 hover:bg-injaazh-500 text-white font-black shadow-2xl shadow-injaazh-600/40 text-lg tracking-tight active:scale-[0.98] transition-all"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> ESTABLISHING NODE...</>
                ) : (
                  "REGISTER WAREHOUSE"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
