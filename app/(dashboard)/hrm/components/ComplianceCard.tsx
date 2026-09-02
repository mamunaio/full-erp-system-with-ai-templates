"use client";

import { ShieldCheck, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ComplianceCard() {
  return (
    <div className="glass rounded-3xl border border-border/80 p-5 hover:border-gold-500/30 transition-all duration-300 relative overflow-hidden group shadow-md space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground font-heading">HR Policy & Compliance</h4>
            <p className="text-[10px] text-muted-foreground">Automated labour & tax audits</p>
          </div>
        </div>
        <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          Passed
        </span>
      </div>

      <div className="space-y-0.5 pt-1">
        <div className="text-2xl font-extrabold text-foreground font-heading">100% Compliant</div>
        <p className="text-[11px] text-muted-foreground">Zero pending labor infractions or expired work permits.</p>
      </div>

      <div className="pt-2 border-t border-border/40">
        <Button 
          onClick={() => toast.success("HR Compliance Audit Scan completed: All 156 dossiers verified.")}
          className="w-full gold-gradient text-obsidian-900 font-extrabold text-xs rounded-2xl h-10 shadow-md shadow-gold-500/20 hover:opacity-90"
        >
          Run Compliance Audit
        </Button>
      </div>
    </div>
  );
}
