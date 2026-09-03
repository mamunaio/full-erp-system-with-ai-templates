"use client";

import Link from "next/link";
import { Landmark, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const vaults = [
  { name: "Operating Account", balance: "$840,250", bank: "Standard Chartered", status: "Synced", percent: 68 },
  { name: "Payroll Reserve", balance: "$250,000", bank: "HSBC Corporate", status: "Locked", percent: 20 },
  { name: "Tax & VAT Vault", balance: "$115,250", bank: "BRAC Bank", status: "Compliant", percent: 9 },
];

export default function TreasuryMiniCard() {
  return (
    <div className="glass rounded-2xl border border-border/80 p-5 hover:border-gold-500/30 transition-all duration-300 shadow-md space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
            <Landmark className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground font-heading">Treasury Reserves</h3>
            <p className="text-[10px] text-muted-foreground">$1,205,500 Total Liquid Reserves</p>
          </div>
        </div>
        <Link href="/finance">
          <Button variant="ghost" size="sm" className="text-[11px] font-bold text-gold-600 dark:text-gold-400 hover:text-foreground h-7 px-2">
            Ledger <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
          </Button>
        </Link>
      </div>

      <div className="space-y-2.5 pt-1">
        {vaults.map((v, i) => (
          <div key={i} className="p-3 rounded-xl bg-card/60 border border-border/60 hover:border-gold-500/30 transition-colors space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-foreground">{v.name}</span>
              <span className="font-extrabold text-foreground font-heading">{v.balance}</span>
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>{v.bank}</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{v.status}</span>
            </div>

            <div className="w-full h-1.5 rounded-full bg-accent/60 overflow-hidden">
              <div 
                className="h-full rounded-full gold-gradient" 
                style={{ width: `${v.percent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
