"use client";

import { useState } from "react";
import { 
  X, Loader2, FileText, User, Calendar, Plus, 
  Trash2, DollarSign, Building2, Sparkles, ArrowRight,
  ShieldCheck, Percent, Calculator, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface CreateInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInvoiceCreated?: (invoice: any) => void;
}

const clientList = [
  { name: "Meta Systems PLC", email: "billing@meta.com", tier: "Tier-1 Enterprise" },
  { name: "Tesla Energy Corp", email: "finance@tesla.com", tier: "Tier-1 Enterprise" },
  { name: "SpaceX Logistics", email: "procurement@spacex.com", tier: "Strategic Cloud" },
  { name: "Stripe Corporate", email: "ap@stripe.com", tier: "Fintech Vault" },
  { name: "Apex Global Conglomerate", email: "treasury@apex.com", tier: "Holding Entity" },
  { name: "Quantum Scale Labs", email: "accounts@quantum.io", tier: "Growth SaaS" },
];

export default function CreateInvoiceModal({ isOpen, onClose, onInvoiceCreated }: CreateInvoiceModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedClient, setSelectedClient] = useState(clientList[0].name);
  const [dueDate, setDueDate] = useState("2026-09-25");
  const [terms, setTerms] = useState("Net 15");
  const [discountPercent, setDiscountPercent] = useState(0);

  const [items, setItems] = useState([
    { id: 1, desc: "Google Gemini 1.5 Pro Neural ERP Integration", qty: 1, price: 18500, tax: 10 },
    { id: 2, desc: "Dedicated MongoDB Atlas Isolated Sharding Vault", qty: 2, price: 4200, tax: 10 },
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), desc: "", qty: 1, price: 0, tax: 10 }]);
  };

  const updateItem = (id: number, field: string, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    } else {
      toast.warning("Invoice must contain at least one line item.");
    }
  };

  const subtotal = items.reduce((acc, item) => acc + (Number(item.qty || 0) * Number(item.price || 0)), 0);
  const totalTax = items.reduce((acc, item) => {
    const itemTotal = Number(item.qty || 0) * Number(item.price || 0);
    return acc + (itemTotal * (Number(item.tax || 0) / 100));
  }, 0);
  const discountAmount = subtotal * (Number(discountPercent || 0) / 100);
  const grandTotal = Math.max(0, subtotal + totalTax - discountAmount);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClient) {
      toast.error("Please select an enterprise client.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const newInvoice = {
        id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
        customer: selectedClient,
        issued: "Today",
        due: dueDate,
        total: `$${grandTotal.toLocaleString()}`,
        paid: "$0",
        rawTotal: grandTotal,
        rawPaid: 0,
        status: "PENDING",
        itemsCount: items.length,
      };

      if (onInvoiceCreated) {
        onInvoiceCreated(newInvoice);
      }
      onClose();
      toast.success("Executive Invoice Dispatched!", {
        description: `Invoice ${newInvoice.id} generated for ${selectedClient} totaling ${newInvoice.total}`,
      });
    }, 900);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden border border-border/80 rounded-3xl shadow-2xl bg-card text-foreground">
        <div className="p-6 sm:p-8 relative">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/5 blur-[80px] pointer-events-none" />

          {/* Modal Header */}
          <div className="flex items-center justify-between pb-6 border-b border-border/60 relative z-10">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl gold-gradient flex items-center justify-center text-obsidian-950 shadow-lg shadow-gold-500/25">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-black font-heading text-foreground">Create Enterprise Invoice</h2>
                  <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/15 px-2 py-0.5 rounded-full border border-gold-500/30 uppercase">
                    GAAP Compliant
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Direct ledger dispatch with automated client billing notification.</p>
              </div>
            </div>

            <button 
              onClick={onClose} 
              className="p-2 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6 pt-6 relative z-10">
            {/* Top Parameters: Client, Terms & Due Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Bill To Client
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <select 
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    className="w-full h-11 bg-background/60 border border-border/80 rounded-xl pl-10 pr-4 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                  >
                    {clientList.map((client) => (
                      <option key={client.name} value={client.name} className="bg-card text-foreground">
                        {client.name} ({client.tier})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Payment Terms
                </Label>
                <div className="relative">
                  <select 
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                    className="w-full h-11 bg-background/60 border border-border/80 rounded-xl px-3.5 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                  >
                    <option value="Net 15" className="bg-card">Net 15 Days</option>
                    <option value="Net 30" className="bg-card">Net 30 Days</option>
                    <option value="Net 60" className="bg-card">Net 60 Days</option>
                    <option value="Due on Receipt" className="bg-card">Due on Receipt</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Due Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input 
                    type="date" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="h-11 bg-background/60 border-border/80 rounded-xl pl-10 text-xs font-semibold text-foreground" 
                  />
                </div>
              </div>
            </div>

            {/* Line Items Table */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1 flex items-center gap-1.5">
                  <span>Itemized Deliverables & Tranches</span>
                  <span className="text-[10px] text-muted-foreground">({items.length} items)</span>
                </Label>
                <button
                  type="button"
                  onClick={addItem}
                  className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:text-foreground flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Line Item
                </button>
              </div>

              <div className="border border-border/80 rounded-2xl overflow-hidden bg-background/40">
                <table className="w-full text-left text-xs">
                  <thead className="bg-card/80 border-b border-border/70 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                    <tr>
                      <th className="p-3 pl-4">Item / Description</th>
                      <th className="p-3 w-20 text-center">Qty</th>
                      <th className="p-3 w-28 text-right">Price ($)</th>
                      <th className="p-3 w-20 text-center">Tax %</th>
                      <th className="p-3 w-28 text-right">Amount ($)</th>
                      <th className="p-3 w-10 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {items.map((item) => {
                      const itemAmount = Number(item.qty || 0) * Number(item.price || 0);
                      return (
                        <tr key={item.id} className="hover:bg-accent/40 transition-colors">
                          <td className="p-2.5 pl-4">
                            <input
                              type="text"
                              value={item.desc}
                              onChange={(e) => updateItem(item.id, "desc", e.target.value)}
                              placeholder="Service / Product deliverable..."
                              className="w-full bg-transparent border-none outline-none font-semibold text-foreground placeholder:text-muted-foreground/60 text-xs"
                            />
                          </td>
                          <td className="p-2.5 text-center">
                            <input
                              type="number"
                              min="1"
                              value={item.qty}
                              onChange={(e) => updateItem(item.id, "qty", Math.max(1, parseInt(e.target.value) || 1))}
                              className="w-14 bg-card border border-border/80 rounded-lg p-1 text-center font-bold text-xs outline-none focus:border-gold-500"
                            />
                          </td>
                          <td className="p-2.5 text-right">
                            <input
                              type="number"
                              min="0"
                              value={item.price}
                              onChange={(e) => updateItem(item.id, "price", parseFloat(e.target.value) || 0)}
                              className="w-24 bg-card border border-border/80 rounded-lg p-1 text-right font-bold text-xs outline-none focus:border-gold-500"
                            />
                          </td>
                          <td className="p-2.5 text-center">
                            <select
                              value={item.tax}
                              onChange={(e) => updateItem(item.id, "tax", parseInt(e.target.value))}
                              className="bg-card border border-border/80 rounded-lg p-1 text-xs font-semibold outline-none"
                            >
                              <option value="0">0%</option>
                              <option value="5">5%</option>
                              <option value="10">10%</option>
                              <option value="15">15%</option>
                            </select>
                          </td>
                          <td className="p-2.5 text-right font-extrabold text-foreground font-heading">
                            ${itemAmount.toLocaleString()}
                          </td>
                          <td className="p-2.5 text-center">
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-muted-foreground hover:text-rose-500 transition-colors p-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Calculations & Total Summary Box */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 p-4 rounded-2xl bg-card/60 border border-border/80">
              <div className="space-y-2 w-full sm:w-64">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground font-medium">Apply Discount %</span>
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                      className="w-14 bg-background border border-border/80 rounded-lg p-1 text-center text-xs font-bold"
                    />
                    <span className="text-muted-foreground text-xs">%</span>
                  </div>
                </div>
                <p className="text-[10px] text-muted-foreground">Currency: USD ($) • Double-entry ledger will auto-post receivable credit.</p>
              </div>

              <div className="space-y-1.5 w-full sm:w-64 text-right">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-foreground">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Estimated Tax/VAT:</span>
                  <span className="font-semibold text-foreground">+${totalTax.toLocaleString()}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-xs text-emerald-500 font-semibold">
                    <span>Discount ({discountPercent}%):</span>
                    <span>-${discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-black text-foreground font-heading pt-2 border-t border-border/60">
                  <span>Total Amount:</span>
                  <span className="gold-text">${grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
                className="h-11 px-6 rounded-xl text-xs font-bold cursor-pointer"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-11 px-8 rounded-xl gold-gradient text-obsidian-950 font-black text-xs shadow-lg shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Dispatching Invoice...</span>
                  </div>
                ) : (
                  <span className="flex items-center gap-2">
                    Authorize & Dispatch Invoice <ArrowRight className="w-4 h-4" />
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
