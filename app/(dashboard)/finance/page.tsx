"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Wallet, DollarSign, TrendingUp, TrendingDown, 
  CreditCard, Plus, Search, Filter, FileText, 
  ArrowUpRight, ArrowDownLeft, CheckCircle2, 
  Clock, AlertCircle, Sparkles, Receipt,
  Landmark, ArrowRight, ChevronRight, Mail, FileDown,
  FileSpreadsheet, ShieldCheck, RefreshCw
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import NewTransactionModal from "./components/NewTransactionModal";
import AccountTree from "./components/AccountTree";

const treasuryVaults = [
  { id: "v1", name: "Master Operating Treasury", bank: "Standard Chartered Bank • 8821", balance: "$840,250.00", status: "Synced", color: "from-amber-500 to-yellow-300" },
  { id: "v2", name: "Payroll Reserve Vault", bank: "HSBC Commercial • 4410", balance: "$250,000.00", status: "Protected", color: "from-blue-500 to-cyan-300" },
  { id: "v3", name: "Tax & VAT Escrow Account", bank: "BRAC Bank Corporate • 9012", balance: "$115,250.00", status: "Compliant", color: "from-emerald-500 to-teal-300" },
  { id: "v4", name: "Petty Cash & Fleet Ops", bank: "City Bank Fleet • 1120", balance: "$35,000.00", status: "Active", color: "from-purple-500 to-indigo-300" },
];

const liveTransactions = [
  { id: "TX-8842", desc: "Enterprise SaaS Annual - Meta Corp", date: "Today, 02:45 PM", type: "CREDIT", amount: "+$85,000.00", account: "Master Operating", status: "RECONCILED" },
  { id: "TX-8841", desc: "AWS Cloud Infrastructure - August Bill", date: "Today, 11:20 AM", type: "DEBIT", amount: "-$4,850.00", account: "Petty Cash & Ops", status: "RECONCILED" },
  { id: "TX-8840", desc: "SpaceX Milestone 2 Contract Wire", date: "Yesterday, 04:15 PM", type: "CREDIT", amount: "+$62,000.00", account: "Master Operating", status: "RECONCILED" },
  { id: "TX-8839", desc: "Office HQ Server Infrastructure Lease", date: "Sep 01, 09:30 AM", type: "DEBIT", amount: "-$12,400.00", account: "Master Operating", status: "PENDING" },
  { id: "TX-8838", desc: "Logitech Bulk Hardware Inventory PO", date: "Aug 30, 03:00 PM", type: "DEBIT", amount: "-$8,250.00", account: "Master Operating", status: "RECONCILED" },
];

const agingBuckets = [
  { label: "Current (0-30 Days)", amount: "$184,500.00", count: 8, status: "Healthy", color: "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" },
  { label: "Overdue (31-60 Days)", amount: "$42,000.00", count: 3, status: "Attention", color: "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20" },
  { label: "Critical Overdue (60+ Days)", amount: "$18,500.00", count: 2, status: "Escalate", color: "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20" },
];

export default function FinanceDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSendingReminders, setIsSendingReminders] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleDispatchReminders = () => {
    setIsSendingReminders(true);
    setTimeout(() => {
      setIsSendingReminders(false);
      toast.success("Automated payment reminder dunning letters dispatched to 5 overdue client accounts!");
    }, 1000);
  };

  const handleExportFinancials = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Consolidated Fiscal Balance Sheet & Trial Balance exported to CSV & PDF!");
    }, 1100);
  };

  const handleReconcile = () => {
    toast.success("Real-time Double-Entry Ledger Reconciled: 0 Unbalanced Entries Found (100% Match).");
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
              <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Master Treasury Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
              Master Ledger & <span className="gold-text">Fiscal Treasury</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
              Double-entry automated ledger, encrypted bank liquidity vaults, P&L analytics, and automated invoice collections.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleExportFinancials}
              disabled={isExporting}
              variant="outline"
              className="rounded-2xl h-11 sm:h-12 px-4 border-border bg-card/60 font-bold text-xs hover:bg-accent"
            >
              <FileSpreadsheet className="w-4 h-4 mr-1.5 text-emerald-500" />
              <span>{isExporting ? "Exporting..." : "Export Financials"}</span>
            </Button>
            <Button
              onClick={handleReconcile}
              variant="outline"
              className="rounded-2xl h-11 sm:h-12 px-4 border-border bg-card/60 font-bold text-xs hover:bg-accent"
            >
              <RefreshCw className="w-4 h-4 mr-1.5 text-gold-500" />
              <span>Reconcile Ledger</span>
            </Button>
            <Link href="/finance/invoices">
              <Button variant="outline" className="rounded-2xl h-11 sm:h-12 px-5 border-border bg-card/60 font-bold text-xs sm:text-sm hover:bg-accent">
                <FileText className="w-4 h-4 mr-2 text-gold-500" /> Invoices (42)
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
          <div className="bg-card/50 p-4 rounded-2xl border border-border space-y-1">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
              <span>Total Liquid Treasury</span>
              <Landmark className="w-3.5 h-3.5 text-gold-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">$1,240,500</div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border space-y-1">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
              <span>Monthly Inflow (Sept)</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-heading">
              $420,000 <span className="text-xs text-muted-foreground font-sans font-medium">+14.2%</span>
            </div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border space-y-1">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
              <span>Monthly OpEx Burn</span>
              <TrendingDown className="w-3.5 h-3.5 text-rose-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">$195,000</div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border space-y-1">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
              <span>Net Operating Margin</span>
              <DollarSign className="w-3.5 h-3.5 text-gold-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gold-600 dark:text-gold-400 font-heading">53.5%</div>
          </div>
        </div>
      </div>

      {/* Treasury Liquidity Vaults Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
              Corporate Liquidity Vaults & Bank Integrations
            </h3>
            <p className="text-xs text-muted-foreground">Encrypted real-time synchronization with authorized banking institutions</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {treasuryVaults.map((vault) => (
            <div key={vault.id} className="glass rounded-3xl p-5 border border-border/80 shadow-md space-y-3 hover:border-gold-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {vault.status}
                </span>
                <Landmark className="w-4 h-4 text-gold-500" />
              </div>

              <div>
                <h4 className="text-sm font-bold text-foreground font-heading">{vault.name}</h4>
                <p className="text-[11px] text-muted-foreground mt-0.5">{vault.bank}</p>
              </div>

              <div className="text-2xl font-extrabold gold-text font-heading pt-1">
                {vault.balance}
              </div>

              <div className="pt-2 border-t border-border/40 flex items-center justify-between text-[10px] text-muted-foreground">
                <span>Multi-currency sync</span>
                <span className="text-emerald-500 font-semibold">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Grid: Live Transactions + Invoice Aging Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Double-Entry Transaction Ledger */}
        <div className="lg:col-span-2 glass rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
                Double-Entry Transaction Stream
              </h3>
              <p className="text-xs text-muted-foreground">Real-time ledger postings, debit/credit validations, and reconciliation audit</p>
            </div>
          </div>

          <div className="divide-y divide-border/50">
            {liveTransactions.map((tx) => (
              <div key={tx.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-md border border-gold-500/20">
                      {tx.id}
                    </span>
                    <span className="text-sm font-bold text-foreground">{tx.desc}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{tx.date}</span>
                    <span>•</span>
                    <span className="text-foreground font-medium">{tx.account}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <div className="text-right">
                    <div className={`text-base font-extrabold font-heading ${tx.type === "CREDIT" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                      {tx.amount}
                    </div>
                    <span className={`text-[9px] font-extrabold px-2 py-0.2 rounded-full border uppercase tracking-wider ${
                      tx.status === "RECONCILED" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}>
                      {tx.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Invoice Aging & Collection Matrix */}
        <div className="space-y-6">
          <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-foreground font-heading">Invoice Aging Matrix</h4>
                <p className="text-[10px] text-muted-foreground">Accounts Receivable collection timeline</p>
              </div>
              <Button
                onClick={handleDispatchReminders}
                disabled={isSendingReminders}
                size="sm"
                className="gold-gradient text-obsidian-950 font-bold text-[10px] rounded-xl h-8 px-2.5 shadow-sm hover:opacity-90"
              >
                {isSendingReminders ? "Dispatching..." : "Send Dunning"}
              </Button>
            </div>

            <div className="space-y-3 pt-2">
              {agingBuckets.map((bucket, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-card/60 border border-border/70 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-foreground">{bucket.label}</span>
                    <span className={`text-[9px] font-extrabold px-2 py-0.2 rounded-full border uppercase tracking-wider ${bucket.color}`}>
                      {bucket.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold gold-text font-heading">{bucket.amount}</span>
                    <span className="text-[11px] text-muted-foreground">{bucket.count} Invoices</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart of Accounts Subtree */}
          <AccountTree />
        </div>
      </div>

      <NewTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
