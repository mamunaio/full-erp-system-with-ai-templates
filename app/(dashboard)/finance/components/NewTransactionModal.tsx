"use client";

import { useState, useRef, useEffect } from "react";
import {
  X, Loader2, DollarSign, ArrowUpRight, ArrowDownLeft,
  Calendar, FileText, Tag, CreditCard, ChevronDown,
  Check, Building2, Landmark, ShieldCheck, Sparkles,
  ArrowRight, RefreshCw, Layers, CheckCircle2, Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface NewTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const currencies = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "BDT", symbol: "৳", name: "Bangladeshi Taka" },
  { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
];

const incomeCategories = [
  { id: "saas", name: "Enterprise SaaS Revenue", tag: "Recurring ARR", icon: Layers },
  { id: "consulting", name: "Strategic Advisory & Consulting", tag: "Professional", icon: Building2 },
  { id: "hardware_sales", name: "Hardware & Server Node Sales", tag: "One-Time Asset", icon: CreditCard },
  { id: "licensing", name: "IP & Software Licensing Royalty", tag: "Royalties", icon: ShieldCheck },
];

const expenseCategories = [
  { id: "cloud", name: "Cloud & Infrastructure (AWS/GCP)", tag: "Hosting", icon: Layers },
  { id: "procurement", name: "Hardware & Component Procurement", tag: "COGS", icon: Building2 },
  { id: "payroll", name: "Executive & Engineering Payroll", tag: "Compensation", icon: CreditCard },
  { id: "lease", name: "Office HQ & Data Center Lease", tag: "Facilities", icon: Landmark },
  { id: "legal", name: "Legal, Audit & SOC2 Compliance", tag: "Governance", icon: ShieldCheck },
];

const accountVaults = [
  { id: "v1", name: "Master Operating Treasury", bank: "Standard Chartered • 8821", balance: "$840,250.00" },
  { id: "v2", name: "Payroll Reserve Vault", bank: "HSBC Commercial • 4410", balance: "$250,000.00" },
  { id: "v3", name: "Tax & VAT Escrow Account", bank: "BRAC Bank Corporate • 9012", balance: "$115,250.00" },
  { id: "v4", name: "Petty Cash & Fleet Ops", bank: "City Bank Fleet • 1120", balance: "$35,000.00" },
];

const paymentRails = [
  { id: "wire", name: "SWIFT / Fedwire Electronic Transfer", badge: "Instant Finality" },
  { id: "ach", name: "ACH Direct Debit & Clearinghouse", badge: "Batch Settled" },
  { id: "card", name: "Corporate Visa Infinite / Stripe", badge: "Real-time" },
  { id: "crypto", name: "USDC Institutional Escrow", badge: "On-Chain Audit" },
];

export default function NewTransactionModal({ isOpen, onClose }: NewTransactionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [type, setType] = useState<"income" | "expense" | "transfer">("income");
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [amount, setAmount] = useState("85000");
  const [entityName, setEntityName] = useState("Meta Corp Systems");
  const [txDate, setTxDate] = useState("2026-09-04");
  const [referenceNote, setReferenceNote] = useState("Q3 Milestone Enterprise Cloud SaaS Subscription Settlement");

  // Dropdown States
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(incomeCategories[0]);

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(accountVaults[0]);

  const [isDestinationAccountOpen, setIsDestinationAccountOpen] = useState(false);
  const [selectedDestinationAccount, setSelectedDestinationAccount] = useState(accountVaults[1]);

  const [isPaymentRailOpen, setIsPaymentRailOpen] = useState(false);
  const [selectedPaymentRail, setSelectedPaymentRail] = useState(paymentRails[0]);

  // Click-outside refs
  const categoryRef = useRef<HTMLDivElement>(null);
  const accountRef = useRef<HTMLDivElement>(null);
  const destinationAccountRef = useRef<HTMLDivElement>(null);
  const paymentRailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setIsAccountOpen(false);
      }
      if (destinationAccountRef.current && !destinationAccountRef.current.contains(event.target as Node)) {
        setIsDestinationAccountOpen(false);
      }
      if (paymentRailRef.current && !paymentRailRef.current.contains(event.target as Node)) {
        setIsPaymentRailOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update default category when type changes
  const handleTypeChange = (newType: "income" | "expense" | "transfer") => {
    setType(newType);
    if (newType === "income") {
      setSelectedCategory(incomeCategories[0]);
    } else if (newType === "expense") {
      setSelectedCategory(expenseCategories[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || parseFloat(amount) <= 0) {
      toast.error("Please enter a valid transaction amount.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedRef = `#TXN-2026-${Math.floor(8800 + Math.random() * 1000)}`;
      onClose();
      toast.success(`Transaction ${generatedRef} Reconciled!`, {
        description: `${selectedCurrency.symbol}${parseFloat(amount).toLocaleString()} posted to ${selectedAccount.name}. GAAP ledger balanced.`,
      });
    }, 1200);
  };

  const parsedAmount = parseFloat(amount) || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden border border-border/80 rounded-[32px] shadow-2xl bg-card">
        <div className="p-6 sm:p-8 text-foreground relative max-h-[90vh] overflow-y-auto custom-scrollbar">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-5 border-b border-border/60 relative z-10">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-2xl gold-gradient flex items-center justify-center shadow-lg shadow-gold-500/20 text-obsidian-950 font-black">
                <DollarSign className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-foreground font-heading tracking-tight">
                  Record <span className="gold-text">Fiscal Transaction</span>
                </h2>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/15 px-2 py-0.5 rounded-full border border-gold-500/30 uppercase tracking-widest font-mono">
                    #TXN-2026-9921
                  </span>
                  <span className="text-xs text-muted-foreground">• General Ledger Posting</span>
                </div>
              </div>
            </div>

            <button 
              type="button"
              onClick={onClose} 
              className="p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 pt-5 relative z-10">
            {/* 3-Way Mode Switcher (Income, Expense, Transfer) */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-background/80 rounded-2xl border border-border/80">
              <button
                type="button"
                onClick={() => handleTypeChange("income")}
                className={cn(
                  "flex items-center justify-center h-11 rounded-xl text-xs font-black transition-all cursor-pointer",
                  type === "income" 
                    ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25 scale-102" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <ArrowDownLeft className="w-4 h-4 mr-1.5" /> Income (Credit +)
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange("expense")}
                className={cn(
                  "flex items-center justify-center h-11 rounded-xl text-xs font-black transition-all cursor-pointer",
                  type === "expense" 
                    ? "bg-rose-600 text-white shadow-lg shadow-rose-600/25 scale-102" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <ArrowUpRight className="w-4 h-4 mr-1.5" /> Expense (Debit -)
              </button>

              <button
                type="button"
                onClick={() => handleTypeChange("transfer")}
                className={cn(
                  "flex items-center justify-center h-11 rounded-xl text-xs font-black transition-all cursor-pointer",
                  type === "transfer" 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-102" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <RefreshCw className="w-4 h-4 mr-1.5" /> Inter-Vault
              </button>
            </div>

            {/* Amount & Currency Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2 space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Transaction Amount
                </Label>
                <div className="relative group">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-sm text-gold-500">
                    {selectedCurrency.symbol}
                  </span>
                  <input
                    required
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-9 pr-4 text-sm font-black text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all font-heading"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Currency
                </Label>
                <select
                  value={selectedCurrency.code}
                  onChange={(e) => setSelectedCurrency(currencies.find(c => c.code === e.target.value) || currencies[0])}
                  className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3 text-xs font-bold text-foreground outline-none focus:border-gold-500 cursor-pointer"
                >
                  {currencies.map((curr) => (
                    <option key={curr.code} value={curr.code} className="bg-card">
                      {curr.code} ({curr.symbol})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Custom Glass Category Dropdown (for Income & Expense) */}
            {type !== "transfer" && (
              <div className="space-y-1.5 relative" ref={categoryRef}>
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  General Ledger Category
                </Label>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className="w-full h-11 bg-background/60 hover:bg-background/90 border border-border/80 rounded-2xl px-3.5 flex items-center justify-between text-xs font-semibold text-foreground transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
                      <Tag className="w-3.5 h-3.5" />
                    </div>
                    <span>{selectedCategory.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-md border border-gold-500/20">
                      {selectedCategory.tag}
                    </span>
                    <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform", isCategoryOpen && "rotate-180")} />
                  </div>
                </button>

                {/* Floating Glass Dropdown Menu */}
                {isCategoryOpen && (
                  <div className="absolute z-50 left-0 right-0 mt-1 p-2 bg-card/95 backdrop-blur-2xl border border-border/80 rounded-2xl shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    {(type === "income" ? incomeCategories : expenseCategories).map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setSelectedCategory(cat);
                          setIsCategoryOpen(false);
                        }}
                        className={cn(
                          "w-full p-2.5 rounded-xl flex items-center justify-between text-xs text-left transition-colors cursor-pointer",
                          selectedCategory.id === cat.id ? "bg-gold-500/15 text-foreground font-bold border border-gold-500/30" : "hover:bg-accent text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <cat.icon className="w-4 h-4 text-gold-500" />
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-[10px] font-semibold text-muted-foreground">{cat.tag}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Custom Glass Treasury Vault Dropdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5 relative" ref={accountRef}>
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  {type === "transfer" ? "Source Vault (Debit)" : "Treasury Vault Account"}
                </Label>
                <button
                  type="button"
                  onClick={() => setIsAccountOpen(!isAccountOpen)}
                  className="w-full h-11 bg-background/60 hover:bg-background/90 border border-border/80 rounded-2xl px-3 flex items-center justify-between text-xs font-semibold text-foreground transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Landmark className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="truncate">{selectedAccount.name}</span>
                  </div>
                  <ChevronDown className={cn("w-4 h-4 text-muted-foreground shrink-0 transition-transform", isAccountOpen && "rotate-180")} />
                </button>

                {isAccountOpen && (
                  <div className="absolute z-50 left-0 right-0 mt-1 p-2 bg-card/95 backdrop-blur-2xl border border-border/80 rounded-2xl shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150">
                    {accountVaults.map((vault) => (
                      <button
                        key={vault.id}
                        type="button"
                        onClick={() => {
                          setSelectedAccount(vault);
                          setIsAccountOpen(false);
                        }}
                        className={cn(
                          "w-full p-2.5 rounded-xl flex flex-col text-xs text-left transition-colors cursor-pointer",
                          selectedAccount.id === vault.id ? "bg-gold-500/15 text-foreground font-bold border border-gold-500/30" : "hover:bg-accent text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-foreground">{vault.name}</span>
                          <span className="text-[10px] text-emerald-500 font-extrabold">{vault.balance}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{vault.bank}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {type === "transfer" ? (
                /* Destination Vault for Transfers */
                <div className="space-y-1.5 relative" ref={destinationAccountRef}>
                  <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                    Destination Vault (Credit)
                  </Label>
                  <button
                    type="button"
                    onClick={() => setIsDestinationAccountOpen(!isDestinationAccountOpen)}
                    className="w-full h-11 bg-background/60 hover:bg-background/90 border border-border/80 rounded-2xl px-3 flex items-center justify-between text-xs font-semibold text-foreground transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Landmark className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="truncate">{selectedDestinationAccount.name}</span>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-muted-foreground shrink-0 transition-transform", isDestinationAccountOpen && "rotate-180")} />
                  </button>

                  {isDestinationAccountOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-1 p-2 bg-card/95 backdrop-blur-2xl border border-border/80 rounded-2xl shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150">
                      {accountVaults.map((vault) => (
                        <button
                          key={vault.id}
                          type="button"
                          onClick={() => {
                            setSelectedDestinationAccount(vault);
                            setIsDestinationAccountOpen(false);
                          }}
                          className={cn(
                            "w-full p-2.5 rounded-xl flex flex-col text-xs text-left transition-colors cursor-pointer",
                            selectedDestinationAccount.id === vault.id ? "bg-blue-500/15 text-foreground font-bold border border-blue-500/30" : "hover:bg-accent text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-foreground">{vault.name}</span>
                            <span className="text-[10px] text-blue-500 font-extrabold">{vault.balance}</span>
                          </div>
                          <span className="text-[10px] text-muted-foreground">{vault.bank}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                /* Payment Rail for Income / Expense */
                <div className="space-y-1.5 relative" ref={paymentRailRef}>
                  <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                    Settlement Rail / Gateway
                  </Label>
                  <button
                    type="button"
                    onClick={() => setIsPaymentRailOpen(!isPaymentRailOpen)}
                    className="w-full h-11 bg-background/60 hover:bg-background/90 border border-border/80 rounded-2xl px-3 flex items-center justify-between text-xs font-semibold text-foreground transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <CreditCard className="w-4 h-4 text-purple-500 shrink-0" />
                      <span className="truncate">{selectedPaymentRail.name}</span>
                    </div>
                    <ChevronDown className={cn("w-4 h-4 text-muted-foreground shrink-0 transition-transform", isPaymentRailOpen && "rotate-180")} />
                  </button>

                  {isPaymentRailOpen && (
                    <div className="absolute z-50 left-0 right-0 mt-1 p-2 bg-card/95 backdrop-blur-2xl border border-border/80 rounded-2xl shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150">
                      {paymentRails.map((rail) => (
                        <button
                          key={rail.id}
                          type="button"
                          onClick={() => {
                            setSelectedPaymentRail(rail);
                            setIsPaymentRailOpen(false);
                          }}
                          className={cn(
                            "w-full p-2.5 rounded-xl flex items-center justify-between text-xs text-left transition-colors cursor-pointer",
                            selectedPaymentRail.id === rail.id ? "bg-purple-500/15 text-foreground font-bold border border-purple-500/30" : "hover:bg-accent text-muted-foreground hover:text-foreground"
                          )}
                        >
                          <span className="font-semibold text-foreground">{rail.name}</span>
                          <span className="text-[10px] text-muted-foreground">{rail.badge}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Entity / Party Name & Date */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Counterparty / Entity Name
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={entityName}
                    onChange={(e) => setEntityName(e.target.value)}
                    placeholder="e.g. Cisco Systems, Meta Corp..."
                    className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-10 pr-4 text-xs font-semibold text-foreground outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Transaction Settlement Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="date"
                    value={txDate}
                    onChange={(e) => setTxDate(e.target.value)}
                    className="h-11 bg-background/60 border-border/80 rounded-2xl pl-10 text-xs font-semibold text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Reference Memo / Note */}
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                Audit Trail Memo / Contract Reference
              </Label>
              <input
                type="text"
                value={referenceNote}
                onChange={(e) => setReferenceNote(e.target.value)}
                placeholder="Reference contract, PO number, or invoice code..."
                className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 px-4 text-xs font-medium text-foreground outline-none focus:border-gold-500"
              />
            </div>

            {/* Double-Entry GAAP Balancing Telemetry Card */}
            <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-bold text-emerald-500">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Double-Entry General Ledger Sync</span>
                </div>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  GAAP / IFRS Compliant
                </span>
              </div>

              <div className="flex items-center justify-between text-muted-foreground text-[11px] pt-1 border-t border-border/60">
                <span>Debit: <strong className="text-foreground">{type === "income" ? selectedAccount.name : selectedCategory.name}</strong></span>
                <span>Credit: <strong className="text-foreground">{type === "income" ? selectedCategory.name : selectedAccount.name}</strong></span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-13 rounded-2xl gold-gradient text-obsidian-950 font-black text-xs sm:text-sm shadow-xl shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Synchronizing Double-Entry Ledger...</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    Post & Reconcile to Master Ledger <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
