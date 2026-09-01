"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Wallet, DollarSign, TrendingUp, TrendingDown, 
  CreditCard, Plus, Search, Filter, FileText, 
  ArrowUpRight, ArrowDownLeft, CheckCircle2, 
  Clock, AlertCircle, Sparkles, Receipt,
  Landmark, ArrowRight, ChevronRight, Mail, FileDown
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import NewTransactionModal from "./components/NewTransactionModal";

const treasuryVaults = [
  { id: "v1", name: "Master Operating Account", bank: "Standard Chartered Bank • 8821", balance: "$840,250.00", status: "Synced", color: "from-amber-500 to-yellow-300" },
  { id: "v2", name: "Payroll Reserve Vault", bank: "HSBC Commercial • 4410", balance: "$250,000.00", status: "Protected", color: "from-blue-500 to-cyan-300" },
  { id: "v3", name: "Tax & VAT Escrow", bank: "BRAC Bank Corporate • 9012", balance: "$115,250.00", status: "Compliant", color: "from-emerald-500 to-teal-300" },
  { id: "v4", name: "Petty Cash & Ops", bank: "City Bank Fleet • 1120", balance: "$35,000.00", status: "Active", color: "from-purple-500 to-indigo-300" },
];

const liveTransactions = [
  { id: "TX-8842", desc: "Enterprise SaaS Annual - Meta Corp", date: "Today, 02:45 PM", type: "CREDIT", amount: "+$85,000.00", account: "Master Operating", status: "RECONCILED" },
  { id: "TX-8841", desc: "AWS Cloud Infrastructure - August Bill", date: "Today, 11:20 AM", type: "DEBIT", amount: "-$4,850.00", account: "Petty Cash & Ops", status: "RECONCILED" },
  { id: "TX-8840", desc: "SpaceX Milestone 2 Contract Wire", date: "Yesterday, 04:15 PM", type: "CREDIT", amount: "+$62,000.00", account: "Master Operating", status: "RECONCILED" },
  { id: "TX-8839", desc: "Office HQ Server Infrastructure Lease", date: "Sep 01, 09:30 AM", type: "DEBIT", amount: "-$12,400.00", account: "Master Operating", status: "PENDING" },
  { id: "TX-8838", desc: "Logitech Bulk Hardware Inventory PO", date: "Aug 30, 03:00 PM", type: "DEBIT", amount: "-$8,250.00", account: "Master Operating", status: "RECONCILED" },
];

const agingBuckets = [
  { label: "Current (0-30 Days)", amount: "$184,500.00", count: 8, status: "Healthy", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" },
  { label: "Overdue (31-60 Days)", amount: "$42,000.00", count: 3, status: "Attention", color: "text-amber-500 bg-amber-500/10 border-amber-500/20" },
  { label: "Critical Overdue (60+ Days)", amount: "$18,500.00", count: 2, status: "Escalate", color: "text-rose-500 bg-rose-500/10 border-rose-500/20" },
];

export default function FinanceDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSendingReminders, setIsSendingReminders] = useState(false);

  const handleDispatchReminders = () => {
    setIsSendingReminders(true);
    setTimeout(() => {
      setIsSendingReminders(false);
      toast.success("Automated payment reminders dispatched to 5 overdue invoice contacts!");
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">
      {/* Top Banner: Fiscal Treasury & Master Ledger */}
      <div className="glass-strong rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-extrabold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Master Treasury Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
              Master Ledger & <span className="gold-text">Fiscal Health</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
              Double-entry automated ledger, multi-currency liquidity vaults, P&L analytics, and invoice collection.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/finance/invoices">
              <Button variant="outline" className="rounded-2xl h-11 sm:h-12 px-5 border-border bg-card/60 font-bold text-xs sm:text-sm hover:bg-accent">
                <FileText className="w-4 h-4 mr-2 text-gold-500" /> Invoices & Billing
              </Button>
            </Link>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="gold-gradient text-obsidian-900 font-extrabold text-xs sm:text-sm rounded-2xl h-11 sm:h-12 px-6 shadow-lg shadow-gold-500/20 hover:opacity-90"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Record Transaction
            </Button>
          </div>
        </div>

        {/* Core Fiscal Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-border/50">
          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Total Liquid Treasury</span>
              <Landmark className="w-3.5 h-3.5 text-gold-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">$1,240,500</div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Monthly Inflow (Sept)</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-500 font-heading">$420,000 <span className="text-xs text-muted-foreground font-sans font-medium">+12%</span></div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Monthly Outflow (Sept)</span>
              <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <div className="text-2xl font-extrabold text-rose-500 font-heading">$195,000</div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Net Operating Margin</span>
              <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">53.5% <span className="text-xs text-emerald-500 font-sans font-bold">Strong</span></div>
          </div>
        </div>
      </div>

      {/* Main Section 1: Treasury Balances / Liquidity Vaults */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">Treasury Liquidity Vaults</h3>
            <p className="text-xs text-muted-foreground">Real-time balances across authorized enterprise accounts</p>
          </div>
          <Link href="/finance/accounts">
            <Button variant="ghost" size="sm" className="text-xs font-semibold text-gold-500 hover:text-gold-400">
              Account Ledger <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {treasuryVaults.map((vault) => (
            <div key={vault.id} className="glass rounded-3xl p-5 border border-border/80 shadow-lg space-y-3 relative overflow-hidden group hover:border-gold-500/30 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-gold-500 transition-colors">{vault.name}</h4>
                  <p className="text-[10px] text-muted-foreground">{vault.bank}</p>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  {vault.status}
                </span>
              </div>

              <div className="text-2xl font-extrabold gold-text font-heading pt-2">
                {vault.balance}
              </div>

              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Encrypted Bank Node</span>
                <span className="text-emerald-500 font-semibold">Live Feed</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Section 2: Live Double-Entry Ledger Table + Invoice Aging Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Double-Entry Ledger */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground font-heading">Double-Entry Transaction Stream</h3>
                <p className="text-xs text-muted-foreground">Audited cryptographic transaction log with account reconciliation</p>
              </div>
              <Link href="/finance/transactions">
                <Button variant="ghost" size="sm" className="text-xs font-semibold text-gold-500 hover:text-gold-400">
                  All Records <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="divide-y divide-border/50">
              {liveTransactions.map((tx) => (
                <div key={tx.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 group">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                      tx.type === "CREDIT" ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" : "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                    }`}>
                      {tx.type === "CREDIT" ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-foreground">{tx.desc}</h4>
                      <p className="text-[10px] text-muted-foreground">{tx.date} • {tx.account}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 justify-between sm:justify-end">
                    <div className={`text-sm sm:text-base font-extrabold font-heading ${
                      tx.type === "CREDIT" ? "text-emerald-500" : "text-rose-500"
                    }`}>
                      {tx.amount}
                    </div>

                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                      tx.status === "RECONCILED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Invoice Aging & Collection Hub */}
        <div className="space-y-6">
          <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-foreground font-heading">Invoice Aging Matrix</h4>
                <p className="text-[11px] text-muted-foreground">Accounts receivable liquidity pipeline</p>
              </div>
              <Receipt className="w-4 h-4 text-gold-500" />
            </div>

            <div className="space-y-3 pt-1">
              {agingBuckets.map((bucket, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl bg-card/50 border border-border space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-foreground">{bucket.label}</span>
                    <span className={`text-[9px] font-bold px-2 py-0.2 rounded-full border ${bucket.color}`}>
                      {bucket.status}
                    </span>
                  </div>
                  <div className="text-xl font-extrabold text-foreground font-heading">{bucket.amount}</div>
                  <p className="text-[10px] text-muted-foreground">{bucket.count} active customer invoices</p>
                </div>
              ))}
            </div>

            <Button 
              onClick={handleDispatchReminders}
              disabled={isSendingReminders}
              className="w-full gold-gradient text-obsidian-900 font-extrabold text-xs rounded-2xl h-11 shadow-md shadow-gold-500/20"
            >
              {isSendingReminders ? "Sending Reminders..." : "1-Click Remind Overdue Invoices"}
            </Button>
          </div>
        </div>
      </div>

      <NewTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
