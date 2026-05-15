"use client";

import { useState } from "react";
import { 
  X,
  Loader2,
  Layers,
  Tag,
  Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AddCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddCategoryModal({ isOpen, onClose }: AddCategoryModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      toast.success("Category Created!", {
        description: "The new category has been added to your classification system.",
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden border-none rounded-[40px] shadow-2xl">
        <div className="bg-slate-950 p-10 text-white relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-injaazh-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-injaazh-600 flex items-center justify-center shadow-lg shadow-injaazh-600/20">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                 <h2 className="text-2xl font-black tracking-tight">New Category</h2>
                 <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mt-1">Classification Hub</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-slate-500 hover:text-white hover:bg-white/10">
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <form onSubmit={handleCreateCategory} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category Name</Label>
              <div className="relative">
                <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <Input required placeholder="e.g. Storage Devices" className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:ring-injaazh-600 focus:border-injaazh-600 text-white font-medium" />
              </div>
            </div>

            <div className="space-y-2">
               <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Theme Color</Label>
               <div className="grid grid-cols-5 gap-3">
                  {['bg-blue-500', 'bg-injaazh-600', 'bg-emerald-500', 'bg-rose-500', 'bg-amber-500'].map((color) => (
                    <div key={color} className={`h-10 rounded-xl ${color} cursor-pointer hover:scale-110 transition-transform border-2 border-transparent hover:border-white`} />
                  ))}
               </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Description (Optional)</Label>
              <textarea 
                placeholder="Briefly describe this category..." 
                className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:ring-injaazh-600 focus:border-injaazh-600 text-white font-medium outline-none resize-none"
              />
            </div>
            
            <div className="pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full h-16 rounded-[24px] bg-injaazh-600 hover:bg-injaazh-500 text-white font-black shadow-2xl shadow-injaazh-600/40 text-lg tracking-tight active:scale-[0.98] transition-all"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-5 h-5 mr-3 animate-spin" /> CREATING...</>
                ) : (
                  "CREATE CATEGORY"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
