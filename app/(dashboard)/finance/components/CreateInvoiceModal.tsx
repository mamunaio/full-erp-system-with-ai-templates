"use client";

import { useState } from "react";
import { 
  X,
  Loader2,
  FileText,
  User,
  Calendar,
  Plus,
  Trash2,
  DollarSign,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateInvoiceModal({ isOpen, onClose }: CreateInvoiceModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [items, setItems] = useState([{ id: 1, desc: "", qty: 1, price: 0 }]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), desc: "", qty: 1, price: 0 }]);
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      toast.success("Invoice Created!", {
        description: "The professional invoice has been generated and sent to the client.",
      });
    }, 1500);
  };

  const total = items.reduce((acc, item) => acc + (item.qty * item.price), 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl">
        <div className="bg-slate-950 p-10 text-white relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                 <h2 className="text-3xl font-black tracking-tight">Create Invoice</h2>
                 <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Professional Billing Node</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-slate-500 hover:text-white hover:bg-white/10">
              <X className="w-5 h-5" />
            </Button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Select Client</Label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 text-white font-medium appearance-none outline-none">
                       <option className="bg-slate-900">Meta Corp</option>
                       <option className="bg-slate-900">Tesla Inc</option>
                       <option className="bg-slate-900">SpaceX</option>
                    </select>
                  </div>
               </div>
               <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Due Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <Input type="date" className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:ring-blue-600 focus:border-blue-600 text-white font-medium" />
                  </div>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Invoice Items</Label>
                  <Button type="button" onClick={addItem} variant="ghost" size="sm" className="text-blue-500 font-black text-[10px] uppercase hover:bg-blue-500/10">
                     <Plus className="w-3 h-3 mr-1" /> Add Line Item
                  </Button>
               </div>
               
               <div className="max-h-[250px] overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-3 items-center">
                       <div className="col-span-6">
                          <Input placeholder="Service or product description" className="h-12 bg-white/5 border-white/10 rounded-xl px-4 text-white font-medium" />
                       </div>
                       <div className="col-span-2">
                          <Input type="number" placeholder="Qty" className="h-12 bg-white/5 border-white/10 rounded-xl px-4 text-white font-medium text-center" />
                       </div>
                       <div className="col-span-3 relative">
                          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
                          <Input type="number" placeholder="Price" className="h-12 bg-white/5 border-white/10 rounded-xl pl-8 text-white font-medium" />
                       </div>
                       <div className="col-span-1 text-right">
                          <Button type="button" variant="ghost" onClick={() => removeItem(item.id)} className="h-12 w-12 rounded-xl text-rose-500 hover:bg-rose-500/10 p-0">
                             <Trash2 className="w-4 h-4" />
                          </Button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
               <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Amount Due</p>
                  <p className="text-4xl font-black text-white mt-1">$ {total.toLocaleString()}</p>
               </div>
               <div className="flex space-x-3">
                  <Button type="button" variant="ghost" onClick={onClose} className="h-16 px-8 rounded-[24px] font-black text-slate-400 hover:text-white">CANCEL</Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="h-16 px-12 rounded-[24px] bg-blue-600 hover:bg-blue-500 text-white font-black shadow-2xl shadow-blue-600/40 text-lg tracking-tight active:scale-[0.98] transition-all"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> GENERATING...</>
                    ) : (
                      "GENERATE INVOICE"
                    )}
                  </Button>
               </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
