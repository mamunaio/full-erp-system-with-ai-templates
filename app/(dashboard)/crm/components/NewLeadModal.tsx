"use client";

import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface NewLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewLeadModal({ isOpen, onClose }: NewLeadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      toast.success("New Lead Created!", {
        description: "The lead has been added to your sales pipeline.",
      });
    }, 1500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border border-gold-500/20 rounded-[40px] shadow-2xl">
        <div className="bg-card/95 backdrop-blur-2xl p-10 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-8 relative z-10">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center font-black text-2xl shadow-lg shadow-gold-500/20 text-obsidian-900">L</div>
              <div>
                <h2 className="text-3xl font-black tracking-tight text-foreground">Create New Lead</h2>
                <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mt-1">Strategic Deal Entry</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full text-muted-foreground hover:text-foreground hover:bg-card/60">
              <X className="w-5 h-5" />
            </Button>
          </div>

          <form onSubmit={handleCreateLead} className="space-y-6 relative z-10">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Company Name</Label>
                <Input required placeholder="e.g. Google Inc" className="h-14 bg-card/60 border-border/60 rounded-2xl focus:ring-gold-500 focus:border-gold-500 text-foreground font-medium px-5" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Deal Value ($)</Label>
                <Input required type="number" placeholder="50000" className="h-14 bg-card/60 border-border/60 rounded-2xl focus:ring-gold-500 focus:border-gold-500 text-foreground font-medium px-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Contact Name</Label>
                <Input placeholder="John Smith" className="h-14 bg-card/60 border-border/60 rounded-2xl focus:ring-gold-500 focus:border-gold-500 text-foreground font-medium px-5" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Email Address</Label>
                <Input type="email" placeholder="john@company.com" className="h-14 bg-card/60 border-border/60 rounded-2xl focus:ring-gold-500 focus:border-gold-500 text-foreground font-medium px-5" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Phone Number</Label>
                <Input placeholder="+1 234 567 890" className="h-14 bg-card/60 border-border/60 rounded-2xl focus:ring-gold-500 focus:border-gold-500 text-foreground font-medium px-5" />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Lead Priority</Label>
                <select className="w-full h-14 bg-card/60 border border-border/60 rounded-2xl focus:ring-gold-500 focus:border-gold-500 text-foreground font-medium px-5 appearance-none outline-none">
                  <option className="bg-card">High Priority</option>
                  <option className="bg-card">Medium Priority</option>
                  <option className="bg-card">Low Priority</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">Deal Notes</Label>
              <textarea
                placeholder="Enter any additional context about this lead..."
                className="w-full h-32 bg-card/60 border border-border/60 rounded-3xl focus:ring-gold-500 focus:border-gold-500 text-foreground font-medium px-5 py-4 outline-none resize-none"
              />
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
                  "CREATE STRATEGIC LEAD"
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
