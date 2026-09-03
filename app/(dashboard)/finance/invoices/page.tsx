"use client";

import { useState } from "react";
import { 
  Plus, Search, Filter, FileDown, ArrowLeft,
  AlertTriangle, MoreVertical, TrendingUp, CreditCard,
  DollarSign, Mail, Sparkles, Building2, CheckCircle2,
  Clock, X, Check, Send, Download, Eye, Trash2,
  RefreshCw, ShieldCheck, ArrowRight, Wallet, Landmark,
  FileText
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import CreateInvoiceModal from "../components/CreateInvoiceModal";

interface InvoiceItem {
  id: string;
  customer: string;
  clientTier: string;
  clientEmail: string;
  issued: string;
  due: string;
  dueStatus: string;
  total: string;
  paid: string;
  rawTotal: number;
  rawPaid: number;
  status: "PAID" | "PARTIAL" | "OVERDUE" | "PENDING" | "DRAFT";
  itemsCount: number;
  deliverables?: { desc: string; qty: number; price: number }[];
}

const initialInvoices: InvoiceItem[] = [
  { 
    id: "INV-2026-001", 
    customer: "Meta Systems PLC", 
    clientTier: "Tier-1 Enterprise",
    clientEmail: "ap@meta.com",
    issued: "Aug 20, 2026", 
    due: "Sep 10, 2026", 
    dueStatus: "Due in 6 days",
    total: "$85,000", 
    paid: "$85,000", 
    rawTotal: 85000,
    rawPaid: 85000,
    status: "PAID",
    itemsCount: 4,
    deliverables: [
      { desc: "Neural Cloud ERP License - Enterprise Sovereign", qty: 1, price: 60000 },
      { desc: "Custom PostgreSQL & Redis Sharding Nodes", qty: 2, price: 12500 },
    ]
  },
  { 
    id: "INV-2026-002", 
    customer: "Tesla Energy Corp", 
    clientTier: "Tier-1 Enterprise",
    clientEmail: "billing@tesla.com",
    issued: "Aug 24, 2026", 
    due: "Sep 08, 2026", 
    dueStatus: "Due in 4 days",
    total: "$145,000", 
    paid: "$75,000", 
    rawTotal: 145000,
    rawPaid: 75000,
    status: "PARTIAL",
    itemsCount: 3,
    deliverables: [
      { desc: "Supply Chain & Multi-Warehouse Automation Core", qty: 1, price: 95000 },
      { desc: "Real-Time Bank API Synchronizer Gateway", qty: 1, price: 50000 },
    ]
  },
  { 
    id: "INV-2026-003", 
    customer: "SpaceX Logistics", 
    clientTier: "Strategic Cloud",
    clientEmail: "finance@spacex.com",
    issued: "Aug 02, 2026", 
    due: "Aug 18, 2026", 
    dueStatus: "Overdue by 17 days",
    total: "$62,000", 
    paid: "$0", 
    rawTotal: 62000,
    rawPaid: 0,
    status: "OVERDUE",
    itemsCount: 2,
    deliverables: [
      { desc: "Aerospace BOM Assembly Engine & Telemetry Tranches", qty: 1, price: 62000 },
    ]
  },
  { 
    id: "INV-2026-004", 
    customer: "Stripe Corporate", 
    clientTier: "Fintech Vault",
    clientEmail: "treasury@stripe.com",
    issued: "Aug 28, 2026", 
    due: "Sep 15, 2026", 
    dueStatus: "Due in 11 days",
    total: "$48,500", 
    paid: "$0", 
    rawTotal: 48500,
    rawPaid: 0,
    status: "PENDING",
    itemsCount: 2,
    deliverables: [
      { desc: "Automated GAAP & IFRS Reconciliation Bridge", qty: 1, price: 48500 },
    ]
  },
  { 
    id: "INV-2026-005", 
    customer: "Apex Global Conglomerate", 
    clientTier: "Holding Entity",
    clientEmail: "finance@apex.com",
    issued: "Aug 12, 2026", 
    due: "Aug 28, 2026", 
    dueStatus: "Paid on time",
    total: "$220,000", 
    paid: "$220,000", 
    rawTotal: 220000,
    rawPaid: 220000,
    status: "PAID",
    itemsCount: 5,
    deliverables: [
      { desc: "Multi-Company Holding Consolidation Matrix", qty: 1, price: 180000 },
      { desc: "24/7 Dedicated Sovereign Engineering SLA", qty: 1, price: 40000 },
    ]
  },
  { 
    id: "INV-2026-006", 
    customer: "Quantum Scale Labs", 
    clientTier: "Growth SaaS",
    clientEmail: "ops@quantum.io",
    issued: "Aug 30, 2026", 
    due: "Sep 20, 2026", 
    dueStatus: "Due in 16 days",
    total: "$34,200", 
    paid: "$34,200", 
    rawTotal: 34200,
    rawPaid: 34200,
    status: "PAID",
    itemsCount: 2,
    deliverables: [
      { desc: "HR Talent Management & Performance Matrix", qty: 1, price: 34200 },
    ]
  },
  { 
    id: "INV-2026-007", 
    customer: "Nordic Dynamics Oy", 
    clientTier: "Nordic Tier-1",
    clientEmail: "billing@nordic.fi",
    issued: "Sep 01, 2026", 
    due: "Sep 16, 2026", 
    dueStatus: "Due in 12 days",
    total: "$29,000", 
    paid: "$0", 
    rawTotal: 29000,
    rawPaid: 0,
    status: "PENDING",
    itemsCount: 1,
    deliverables: [
      { desc: "European Cloud Compliance Node & GDPR Sharding", qty: 1, price: 29000 },
    ]
  },
  { 
    id: "INV-2026-008", 
    customer: "Synthetix Bio-Health", 
    clientTier: "Healthcare Hub",
    clientEmail: "accounts@synthetix.com",
    issued: "Aug 05, 2026", 
    due: "Aug 20, 2026", 
    dueStatus: "Draft pending review",
    total: "$18,500", 
    paid: "$0", 
    rawTotal: 18500,
    rawPaid: 0,
    status: "DRAFT",
    itemsCount: 1,
    deliverables: [
      { desc: "HIPAA Compliant Medical Supply Ledger", qty: 1, price: 18500 },
    ]
  },
];

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<InvoiceItem[]>(initialInvoices);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceItem | null>(null);

  // Filter calculation
  const filteredInvoices = invoices.filter((item) => {
    const matchesSearch = 
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.clientEmail.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === "ALL") return true;
    if (activeFilter === "PAID") return item.status === "PAID";
    if (activeFilter === "PARTIAL") return item.status === "PARTIAL";
    if (activeFilter === "OVERDUE") return item.status === "OVERDUE";
    if (activeFilter === "PENDING") return item.status === "PENDING";
    if (activeFilter === "DRAFT") return item.status === "DRAFT";

    return true;
  });

  const totalReceivables = invoices.reduce((acc, i) => acc + i.rawTotal, 0);
  const totalCollected = invoices.reduce((acc, i) => acc + i.rawPaid, 0);
  const overdueCount = invoices.filter(i => i.status === "OVERDUE").length;
  const overdueSum = invoices.filter(i => i.status === "OVERDUE").reduce((acc, i) => acc + (i.rawTotal - i.rawPaid), 0);

  const handleInvoiceCreated = (newInv: InvoiceItem) => {
    setInvoices([newInv, ...invoices]);
  };

  const handleSendAIReminder = (inv: InvoiceItem) => {
    toast.success(`AI Payment Notice Dispatched!`, {
      description: `Polite automated reminder sent to ${inv.customer} (${inv.clientEmail}) for ${inv.total}.`,
    });
  };

  const handleBatchAIReminders = () => {
    const overdueOrPending = invoices.filter(i => i.status === "OVERDUE" || i.status === "PENDING" || i.status === "PARTIAL");
    toast.success(`Batch AI Reminders Dispatched!`, {
      description: `Sent customized payment notices to ${overdueOrPending.length} enterprise accounts with outstanding balances.`,
    });
  };

  const handleExportPDF = (invId: string) => {
    toast.success(`Generating Cryptographic PDF Invoice...`, {
      description: `Invoice ${invId} rendered with AES-256 seal. Download starting.`,
    });
  };

  const handleRecordPayment = (invId: string) => {
    setInvoices(invoices.map(i => {
      if (i.id === invId) {
        return { ...i, paid: i.total, rawPaid: i.rawTotal, status: "PAID", dueStatus: "Paid in full" };
      }
      return i;
    }));
    toast.success(`Full Settlement Recorded!`, {
      description: `Invoice ${invId} marked as PAID. Treasury ledger balance updated.`,
    });
  };

  const handleDeleteInvoice = (invId: string) => {
    setInvoices(invoices.filter(i => i.id !== invId));
    if (selectedInvoice?.id === invId) setSelectedInvoice(null);
    toast.info(`Invoice ${invId} archived.`);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link 
              href="/finance" 
              className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 bg-card/60 hover:bg-card border border-border/80 rounded-xl px-3 py-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Finance Command
            </Link>
            <span className="text-xs text-muted-foreground">• Receivables Subsystem</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
            Billing & <span className="gold-text">Enterprise Invoicing</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage multi-tier corporate receivables, automated GAAP tranches, and AI payment collection triggers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button 
            variant="outline" 
            onClick={handleBatchAIReminders}
            className="h-11 px-4 rounded-xl text-xs font-bold bg-card border-border hover:border-gold-500/40 cursor-pointer shadow-sm flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-gold-500" />
            <span className="hidden sm:inline">Dispatch Batch AI Reminders</span>
            <span className="sm:hidden">AI Reminders</span>
          </Button>

          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="h-11 px-6 rounded-xl gold-gradient text-obsidian-950 font-black text-xs shadow-lg shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Invoice</span>
          </Button>
        </div>
      </div>

      {/* Critical Overdue Alert Banner if overdue invoices exist */}
      {overdueCount > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-rose-600 dark:text-rose-400">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 flex items-center justify-center shrink-0 border border-rose-500/30">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">
                Action Required • Collection Risk Detected
              </p>
              <p className="text-xs sm:text-sm font-bold text-foreground">
                {overdueCount} Overdue Invoices totaling <span className="font-extrabold text-rose-500">${overdueSum.toLocaleString()}</span> are past settlement grace periods.
              </p>
            </div>
          </div>

          <Button 
            variant="ghost" 
            onClick={handleBatchAIReminders}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/15 hover:bg-rose-500/25 px-4 h-9 rounded-xl self-start sm:self-auto cursor-pointer"
          >
            Dispatch AI Urgent Notice →
          </Button>
        </div>
      )}

      {/* 4 Cyber-Luxe Receivables KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              +14.8% YoY
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Receivables (YTD)</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">${totalReceivables.toLocaleString()}</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              86.4% Collected
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Cash Collected</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500 font-heading">${totalCollected.toLocaleString()}</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-rose-600 dark:text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
              {overdueCount} Accounts
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Outstanding & Overdue</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-rose-500 font-heading">${overdueSum.toLocaleString()}</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/20">
              -3.2 Days
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Average DSO Velocity</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">18.4 Days</p>
        </div>
      </div>

      {/* Main Stream Container */}
      <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
        {/* Filter Tabs & Search Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status Filter Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
            {[
              { id: "ALL", label: "All Invoices", count: invoices.length },
              { id: "PAID", label: "Paid & Settled", count: invoices.filter(i => i.status === "PAID").length },
              { id: "PARTIAL", label: "Partial", count: invoices.filter(i => i.status === "PARTIAL").length },
              { id: "PENDING", label: "Pending", count: invoices.filter(i => i.status === "PENDING").length },
              { id: "OVERDUE", label: "Overdue", count: invoices.filter(i => i.status === "OVERDUE").length },
              { id: "DRAFT", label: "Drafts", count: invoices.filter(i => i.status === "DRAFT").length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 border",
                  activeFilter === tab.id
                    ? "gold-gradient text-obsidian-950 border-gold-400 shadow-md font-extrabold scale-102"
                    : "bg-card/60 hover:bg-card border-border/70 text-muted-foreground hover:text-foreground"
                )}
              >
                <span>{tab.label}</span>
                <span className={cn(
                  "text-[10px] px-1.5 py-0.2 rounded-full",
                  activeFilter === tab.id ? "bg-obsidian-950/20 text-obsidian-950" : "bg-accent text-muted-foreground"
                )}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by invoice # or client..."
              className="w-full bg-background/60 border border-border/80 rounded-xl h-10 pl-10 pr-4 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all"
            />
          </div>
        </div>

        {/* Invoices Stream Table */}
        <div className="overflow-x-auto custom-scrollbar border border-border/80 rounded-2xl bg-card/40">
          <table className="w-full text-left text-xs">
            <thead className="bg-card/80 border-b border-border/80 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
              <tr>
                <th className="py-4 pl-4">Invoice ID</th>
                <th className="py-4">Enterprise Client</th>
                <th className="py-4">Issue & Due Date</th>
                <th className="py-4">Payment Progress</th>
                <th className="py-4 text-center">Status</th>
                <th className="py-4 pr-4 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-muted-foreground font-semibold">
                    No matching invoices found in this view.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => {
                  const paymentPercentage = inv.rawTotal > 0 ? Math.round((inv.rawPaid / inv.rawTotal) * 100) : 0;
                  return (
                    <tr 
                      key={inv.id} 
                      className="hover:bg-accent/40 transition-colors group cursor-pointer"
                      onClick={() => setSelectedInvoice(inv)}
                    >
                      {/* Invoice ID */}
                      <td className="py-4 pl-4 font-black font-heading text-foreground">
                        <div className="flex items-center gap-2">
                          <span className="text-gold-600 dark:text-gold-400 group-hover:underline">{inv.id}</span>
                          <span className="text-[10px] text-muted-foreground font-semibold">({inv.itemsCount} tranches)</span>
                        </div>
                      </td>

                      {/* Customer */}
                      <td className="py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                            {inv.customer.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-foreground block">{inv.customer}</span>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                              <span>{inv.clientTier}</span> • <span className="opacity-75">{inv.clientEmail}</span>
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Dates */}
                      <td className="py-4">
                        <div className="space-y-0.5">
                          <span className="font-semibold text-foreground block">{inv.due}</span>
                          <span className={cn(
                            "text-[10px] font-bold block",
                            inv.status === "OVERDUE" ? "text-rose-500" :
                            inv.status === "PAID" ? "text-emerald-500" :
                            "text-muted-foreground"
                          )}>
                            {inv.dueStatus}
                          </span>
                        </div>
                      </td>

                      {/* Payment Progress */}
                      <td className="py-4 w-48">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between font-bold">
                            <span className="text-foreground">{inv.paid}</span>
                            <span className="text-muted-foreground">of {inv.total}</span>
                          </div>
                          <div className="h-1.5 w-full bg-accent rounded-full overflow-hidden">
                            <div 
                              className={cn(
                                "h-full rounded-full transition-all duration-500",
                                inv.status === "PAID" ? "bg-emerald-500" :
                                inv.status === "OVERDUE" ? "bg-rose-500" :
                                "bg-gold-500"
                              )}
                              style={{ width: `${paymentPercentage}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 text-center">
                        <span className={cn(
                          "text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border inline-flex items-center gap-1 shadow-sm",
                          inv.status === "PAID" ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" :
                          inv.status === "PARTIAL" ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30" :
                          inv.status === "OVERDUE" ? "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30" :
                          inv.status === "PENDING" ? "bg-gold-500/10 text-gold-600 dark:text-gold-400 border-gold-500/30" :
                          "bg-accent text-muted-foreground border-border"
                        )}>
                          {inv.status === "PAID" && <Check className="w-3 h-3" />}
                          {inv.status === "OVERDUE" && <AlertTriangle className="w-3 h-3" />}
                          {inv.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            title="View Invoice Details"
                            onClick={() => setSelectedInvoice(inv)}
                            className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            title="Send AI Payment Reminder"
                            onClick={() => handleSendAIReminder(inv)}
                            className="p-1.5 rounded-lg hover:bg-gold-500/10 text-muted-foreground hover:text-gold-500 transition-colors cursor-pointer"
                          >
                            <Sparkles className="w-4 h-4" />
                          </button>

                          <button
                            title="Download PDF"
                            onClick={() => handleExportPDF(inv.id)}
                            className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          >
                            <Download className="w-4 h-4" />
                          </button>

                          {inv.status !== "PAID" && (
                            <button
                              title="Record Full Settlement"
                              onClick={() => handleRecordPayment(inv.id)}
                              className="p-1.5 rounded-lg hover:bg-emerald-500/10 text-muted-foreground hover:text-emerald-500 transition-colors cursor-pointer"
                            >
                              <CreditCard className="w-4 h-4" />
                            </button>
                          )}

                          <button
                            title="Archive Invoice"
                            onClick={() => handleDeleteInvoice(inv.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice Detail Slide-Over Drawer */}
      {selectedInvoice && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
          onClick={() => setSelectedInvoice(null)}
        >
          <div 
            className="w-full max-w-xl h-full bg-card border-l border-border/80 shadow-2xl p-6 sm:p-8 overflow-y-auto custom-scrollbar space-y-6 animate-in slide-in-from-right duration-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center text-obsidian-950 font-black">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground font-heading">{selectedInvoice.id}</h3>
                  <p className="text-[10px] text-muted-foreground">Issued: {selectedInvoice.issued}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleExportPDF(selectedInvoice.id)}
                  className="p-2 rounded-xl bg-accent hover:bg-accent/80 text-foreground text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> PDF
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="p-2 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Client & Status Overview Card */}
            <div className="p-4 rounded-2xl bg-card/60 border border-border/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Client Account</span>
                  <span className="text-sm font-extrabold text-foreground">{selectedInvoice.customer}</span>
                </div>
                <span className={cn(
                  "text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border",
                  selectedInvoice.status === "PAID" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/30" :
                  selectedInvoice.status === "OVERDUE" ? "bg-rose-500/10 text-rose-500 border-rose-500/30" :
                  "bg-gold-500/10 text-gold-500 border-gold-500/30"
                )}>
                  {selectedInvoice.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-border/60">
                <div>
                  <span className="text-muted-foreground text-[10px]">Direct Billing Email:</span>
                  <p className="font-semibold text-foreground">{selectedInvoice.clientEmail}</p>
                </div>
                <div>
                  <span className="text-muted-foreground text-[10px]">Maturity / Due Date:</span>
                  <p className="font-semibold text-foreground">{selectedInvoice.due}</p>
                </div>
              </div>
            </div>

            {/* Itemized Deliverables Breakdown */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Itemized Deliverables</h4>
              <div className="border border-border/80 rounded-2xl overflow-hidden divide-y divide-border/60 bg-background/40">
                {selectedInvoice.deliverables?.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-foreground">{item.desc}</p>
                      <p className="text-[10px] text-muted-foreground">Qty: {item.qty} × ${item.price.toLocaleString()}</p>
                    </div>
                    <span className="font-extrabold text-foreground font-heading">
                      ${(item.qty * item.price).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Summary */}
            <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Total Amount:</span>
                <span className="font-bold text-foreground">{selectedInvoice.total}</span>
              </div>
              <div className="flex justify-between text-emerald-500 font-semibold">
                <span>Paid Settlement:</span>
                <span>{selectedInvoice.paid}</span>
              </div>
              <div className="flex justify-between text-base font-black text-foreground pt-2 border-t border-border/60 font-heading">
                <span>Remaining Balance:</span>
                <span className="gold-text">${(selectedInvoice.rawTotal - selectedInvoice.rawPaid).toLocaleString()}</span>
              </div>
            </div>

            {/* Quick Actions at Drawer Bottom */}
            <div className="flex flex-col gap-2 pt-2">
              <Button
                onClick={() => handleSendAIReminder(selectedInvoice)}
                className="w-full h-11 rounded-xl gold-gradient text-obsidian-950 font-extrabold text-xs shadow-md shadow-gold-500/20 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Dispatch Smart AI Reminder
              </Button>

              {selectedInvoice.status !== "PAID" && (
                <Button
                  variant="outline"
                  onClick={() => handleRecordPayment(selectedInvoice.id)}
                  className="w-full h-11 rounded-xl text-xs font-bold cursor-pointer text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 border-emerald-500/30"
                >
                  <CreditCard className="w-4 h-4 mr-2" /> Record Settlement as Paid
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Invoice Modal */}
      <CreateInvoiceModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onInvoiceCreated={handleInvoiceCreated}
      />
    </div>
  );
}
