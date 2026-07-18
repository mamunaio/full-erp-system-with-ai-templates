"use client";

import { useState } from "react";
import {
  X, Loader2, DollarSign, ArrowUpRight, ArrowDownLeft,
  Calendar, FileText, Tag, CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewTransactionModal({ isOpen, onClose }: NewTransactionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [type, setType] = useState<"income" | "expense">("income");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      toast.success("Transaction Recorded!", {
        description: "The ledger has been updated successfully.",
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl">
        <div className="bg-obsidian-900 p-10 text-white relative">
          <div className="absolute top-0 right-0 w-72 h-72 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center shadow-lg shadow-gold-500/20">
                <DollarSign className="w-6 h-6 text-obsidian-900" />
              </div>
              <div>
                <h2 className="text-3xl font-black tracking-tight">New Transaction</h2>
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1">General Ledger Entry</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-muted-foreground hover:text-white hover:bg-white/10">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-2 gap-4 p-1 bg-white/5 rounded-2xl border border-white/10">
              <button
                type="button"
                onClick={() => setType("income")}
                className={`flex items-center justify-center h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === "income" ? "bg-gold-500 text-obsidian-900 shadow-lg" : "text-muted-foreground hover:text-white"}`}
              >
                <ArrowDownLeft className="w-4 h-4 mr-2" /> Income
              </button>
              <button
                type="button"
                onClick={() => setType("expense")}
                className={`flex items-center justify-center h-12 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === "expense" ? "bg-rose-600 text-white shadow-lg" : "text-muted-foreground hover:text-white"}`}
              >
                <ArrowUpRight className="w-4 h-4 mr-2" /> Expense
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Amount ($)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input required type="number" placeholder="0.00" className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:ring-gold-500 focus:border-gold-500 text-white font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Category</Label>
                <div className="relative">
                  <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 text-white font-medium appearance-none outline-none">
                    <option className="bg-obsidian-900">Sales Revenue</option>
                    <option className="bg-obsidian-900">Hardware Purchase</option>
                    <option className="bg-obsidian-900">Service Subscription</option>
                    <option className="bg-obsidian-900">Operational Expense</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Entity / Party Name</Label>
              <Input required placeholder="e.g. Cisco Systems, John Doe..." className="h-14 bg-white/5 border-white/10 rounded-2xl px-5 focus:ring-gold-500 focus:border-gold-500 text-white font-medium" />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Transaction Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="date" className="h-14 bg-white/5 border-white/10 rounded-2xl pl-12 focus:ring-gold-500 focus:border-gold-500 text-white font-medium" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Account</Label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <select className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 text-white font-medium appearance-none outline-none">
                    <option className="bg-obsidian-900">Business Checking</option>
                    <option className="bg-obsidian-900">Corporate Credit</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Notes / Reference</Label>
              <div className="relative">
                <FileText className="absolute left-4 top-5 w-4 h-4 text-muted-foreground" />
                <textarea
                  placeholder="Additional details..."
                  className="w-full h-24 bg-white/5 border border-white/10 rounded-2xl pl-12 py-4 focus:ring-gold-500 focus:border-gold-500 text-white font-medium outline-none resize-none"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-16 rounded-[24px] bg-gold-500 hover:bg-gold-600 text-obsidian-900 font-black shadow-2xl shadow-gold-500/40 text-lg tracking-tight active:scale-[0.98] transition-all"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> SYNCHRONIZING...</>
                ) : (
                  "RECORD TRANSACTION"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
