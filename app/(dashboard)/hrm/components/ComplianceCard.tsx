"use client";

import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ComplianceCard() {
  return (
    <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300 relative overflow-hidden group">
      <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gold-500/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-5">
          <div className="w-8 h-8 rounded-lg bg-gold-500/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
          </div>
          <h4 className="text-sm font-bold text-card-foreground font-heading">Compliance Status</h4>
        </div>
        <div className="space-y-1 mb-5">
          <p className="text-2xl font-bold text-gold-400 font-heading tracking-tight">100% Secure</p>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">Policy Audits Passed</p>
        </div>
        <Button className="w-full bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-xl font-bold text-xs h-10 shadow-lg shadow-gold-500/20 transition-all active:scale-95">
          System Audit
        </Button>
      </div>
    </div>
  );
}
