"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Plus, Trash2, Building2, Calendar, 
  Truck, ShieldCheck, Sparkles, DollarSign, Package, 
  CheckCircle2, AlertTriangle, ArrowRight, Loader2, 
  Calculator, Info, FileText, User, Layers, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface POLineItem {
  id: number;
  sku: string;
  name: string;
  qty: number;
  unitCost: number;
  tax: number;
}

const vendorList = [
  {
    name: "Cisco Systems Global",
    contact: "Marcus Kane (Enterprise OEM)",
    email: "orders@cisco.com",
    tier: "Tier-1 Strategic",
    rating: "Grade A+ • 99.4% SLA",
    paymentTerms: "Net 45",
  },
  {
    name: "NVIDIA Enterprise OEM",
    contact: "Elena Rostova (Accelerated Compute)",
    email: "supply@nvidia.com",
    tier: "Tier-1 Strategic",
    rating: "Grade A+ • 99.8% SLA",
    paymentTerms: "Net 30",
  },
  {
    name: "Taiwan Semiconductor (TSMC)",
    contact: "Kenji Sato (Wafer & Foundry)",
    email: "procurement@tsmc.com",
    tier: "Primary Foundry",
    rating: "Grade A • 98.9% SLA",
    paymentTerms: "Net 60",
  },
  {
    name: "Dell Technologies Supply",
    contact: "Arthur Pendelton (Workstations)",
    email: "oem@dell.com",
    tier: "Strategic Hardware",
    rating: "Grade A • 98.2% SLA",
    paymentTerms: "Net 30",
  },
  {
    name: "Cloudflare Global Network",
    contact: "Sarah Lin (Transit & Edge)",
    email: "billing@cloudflare.com",
    tier: "Network Infrastructure",
    rating: "Grade A+ • 99.9% SLA",
    paymentTerms: "Net 30",
  },
];

const catalogItems = [
  { sku: "SKU-NET-9300", name: "Cisco Catalyst 9300 48-Port Switch", defaultCost: 450, tax: 10 },
  { sku: "SKU-SVR-NV90", name: "NVIDIA DGX H100 Sovereign AI Server", defaultCost: 32000, tax: 10 },
  { sku: "SKU-IOT-RFID", name: "Warehouse RFID IoT Telemetry Hub (Pack of 50)", defaultCost: 1200, tax: 5 },
  { sku: "SKU-NET-FIB8", name: "Mellanox 100GbE QSFP28 Optical Transceiver", defaultCost: 85, tax: 5 },
  { sku: "SKU-HWD-LAP1", name: "Dell Latitude 5420 Sovereign Workstation", defaultCost: 650, tax: 10 },
];

const warehouses = [
  { id: "wh-alpha", name: "Hub Alpha — Silicon Valley Central (USA)" },
  { id: "wh-beta", name: "Hub Beta — Frankfurt Sovereign Node (EU)" },
  { id: "wh-gamma", name: "Hub Gamma — Singapore APAC Gateway" },
];

const incotermsList = [
  "DDP — Delivered Duty Paid (Recommended)",
  "FOB — Free on Board",
  "CIF — Cost, Insurance and Freight",
  "EXW — Ex Works",
];

export default function NewPurchaseOrderPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [selectedVendorIndex, setSelectedVendorIndex] = useState(0);
  const [procurementChannel, setProcurementChannel] = useState("Strategic Sourcing Contract");
  const [issueDate, setIssueDate] = useState("2026-09-04");
  const [deliveryDate, setDeliveryDate] = useState("2026-09-24");
  const [incoterms, setIncoterms] = useState(incotermsList[0]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("wh-alpha");
  const [freightFee, setFreightFee] = useState(650);
  const [customsDutyPercent, setCustomsDutyPercent] = useState(2.5);
  const [autoGRN, setAutoGRN] = useState(true);
  const [autoTransmitEDI, setAutoTransmitEDI] = useState(true);

  const [items, setItems] = useState<POLineItem[]>([
    {
      id: 1,
      sku: "SKU-NET-9300",
      name: "Cisco Catalyst 9300 48-Port Switch",
      qty: 20,
      unitCost: 450,
      tax: 10,
    },
    {
      id: 2,
      sku: "SKU-NET-FIB8",
      name: "Mellanox 100GbE QSFP28 Optical Transceiver",
      qty: 100,
      unitCost: 85,
      tax: 5,
    },
  ]);

  const vendor = vendorList[selectedVendorIndex];

  const addItem = () => {
    const defaultItem = catalogItems[0];
    setItems([
      ...items,
      {
        id: Date.now(),
        sku: defaultItem.sku,
        name: defaultItem.name,
        qty: 10,
        unitCost: defaultItem.defaultCost,
        tax: defaultItem.tax,
      },
    ]);
  };

  const handleSelectCatalogItem = (itemId: number, sku: string) => {
    const item = catalogItems.find(c => c.sku === sku);
    if (!item) return;

    setItems(items.map(i => {
      if (i.id === itemId) {
        return {
          ...i,
          sku: item.sku,
          name: item.name,
          unitCost: item.defaultCost,
          tax: item.tax,
        };
      }
      return i;
    }));
  };

  const handleLoadLowStockPresets = () => {
    setItems([
      { id: 1, sku: "SKU-NET-9300", name: "Cisco Catalyst 9300 48-Port Switch", qty: 30, unitCost: 450, tax: 10 },
      { id: 2, sku: "SKU-IOT-RFID", name: "Warehouse RFID IoT Telemetry Hub (Pack of 50)", qty: 25, unitCost: 1200, tax: 5 },
      { id: 3, sku: "SKU-HWD-LAP1", name: "Dell Latitude 5420 Sovereign Workstation", qty: 15, unitCost: 650, tax: 10 },
    ]);
    toast.success("Loaded 3 Low-Stock Buffer Restock Lines!");
  };

  const updateItemQty = (id: number, qty: number) => {
    setItems(items.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
  };

  const updateItemCost = (id: number, cost: number) => {
    setItems(items.map(i => i.id === id ? { ...i, unitCost: Math.max(0, cost) } : i));
  };

  const updateItemTax = (id: number, tax: number) => {
    setItems(items.map(i => i.id === id ? { ...i, tax } : i));
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(i => i.id !== id));
    } else {
      toast.warning("Purchase Order must contain at least one line item.");
    }
  };

  // Calculations
  const subtotal = items.reduce((acc, i) => acc + (i.qty * i.unitCost), 0);
  const totalTax = items.reduce((acc, i) => acc + ((i.qty * i.unitCost) * (i.tax / 100)), 0);
  const customsDuty = subtotal * (customsDutyPercent / 100);
  const grandTotal = subtotal + totalTax + freightFee + customsDuty;

  // Arbitrage savings estimate
  const marketBenchmark = subtotal * 1.082; // 8.2% higher spot market benchmark
  const arbitrageSavings = Math.max(0, marketBenchmark - subtotal);

  const handleIssuePO = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedPO = `#PO-2026-${Math.floor(4000 + Math.random() * 1000)}`;
      toast.success(`Purchase Order ${generatedPO} Issued!`, {
        description: `Transmitted to ${vendor.name} totaling $${grandTotal.toLocaleString()}. Inbound GRN inspection scheduled.`,
      });
      router.push("/procurement");
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-16 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link 
              href="/procurement" 
              className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 bg-card/60 hover:bg-card border border-border/80 rounded-xl px-3 py-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Procurement Command
            </Link>
            <span className="text-xs text-muted-foreground">• Vendor Sourcing Studio</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
              Issue <span className="gold-text">Purchase Order</span>
            </h1>
            <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/15 px-2.5 py-0.5 rounded-full border border-gold-500/30 uppercase tracking-widest font-mono">
              #PO-2026-4921
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Execute enterprise supplier purchase orders, customs tariffs, inbound logistics, and automated GRN generation.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button 
            variant="outline"
            onClick={() => router.push("/procurement")}
            className="h-11 px-5 rounded-xl text-xs font-bold bg-card border-border hover:border-gold-500/40 cursor-pointer shadow-sm"
          >
            Cancel
          </Button>

          <Button 
            onClick={handleIssuePO}
            disabled={isSubmitting}
            className="h-11 px-7 rounded-xl gold-gradient text-obsidian-950 font-black text-xs shadow-lg shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center gap-2"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Transmitting PO to Vendor...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                Authorize & Issue Purchase Order <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <form onSubmit={handleIssuePO} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS: Supplier & Sourcing Matrix */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Supplier Organization & Contract Terms */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gold-500/15 text-gold-500 flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-heading">Supplier Organization & Contract</h3>
                  <p className="text-[10px] text-muted-foreground">Select authorized tier-1 supplier and commercial payment terms</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                {vendor.rating}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Supplier / Vendor Organization
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <select
                    value={selectedVendorIndex}
                    onChange={(e) => setSelectedVendorIndex(parseInt(e.target.value))}
                    className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl pl-10 pr-4 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                  >
                    {vendorList.map((v, idx) => (
                      <option key={idx} value={idx} className="bg-card text-foreground">
                        {v.name} ({v.tier})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Procurement Channel
                </Label>
                <select
                  value={procurementChannel}
                  onChange={(e) => setProcurementChannel(e.target.value)}
                  className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                >
                  <option value="Strategic Sourcing Contract" className="bg-card">Strategic Sourcing Contract</option>
                  <option value="Spot Buy Contract" className="bg-card">Spot Buy Order</option>
                  <option value="Direct OEM Tender" className="bg-card">Direct OEM Long-Term Tender</option>
                  <option value="Blanket PO" className="bg-card">Blanket Agreement Tranche</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  PO Issue Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="date"
                    value={issueDate}
                    onChange={(e) => setIssueDate(e.target.value)}
                    className="h-11 bg-background/60 border-border/80 rounded-2xl pl-10 text-xs font-semibold text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Expected Port Delivery Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="h-11 bg-background/60 border-border/80 rounded-2xl pl-10 text-xs font-semibold text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Vendor Telemetry Bar */}
            <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gold-500 shrink-0" />
                <span className="text-muted-foreground">Account Rep: <strong className="text-foreground">{vendor.contact}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">EDI Dispatch: <strong className="text-foreground">{vendor.email}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-emerald-500">
                <ShieldCheck className="w-4 h-4" />
                <span>Terms: {vendor.paymentTerms}</span>
              </div>
            </div>
          </div>

          {/* 2. Purchase Deliverables & Line Items Matrix */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-heading">Component Sourcing & Tranches</h3>
                  <p className="text-[10px] text-muted-foreground">Define unit purchase prices, volume tranches and import taxes</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleLoadLowStockPresets}
                  className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-foreground flex items-center gap-1 cursor-pointer bg-card/60 hover:bg-card border border-border/80 px-2.5 py-1.5 rounded-xl transition-all shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Load Low-Stock Items
                </button>

                <button
                  type="button"
                  onClick={addItem}
                  className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:text-foreground flex items-center gap-1 cursor-pointer bg-card/60 hover:bg-card border border-border/80 px-3 py-1.5 rounded-xl transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Sourcing Row
                </button>
              </div>
            </div>

            <div className="border border-border/80 rounded-2xl overflow-hidden bg-card/40">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs min-w-[650px]">
                  <thead className="bg-card/80 border-b border-border/80 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                    <tr>
                      <th className="p-3 pl-4">Component / SKU</th>
                      <th className="p-3 w-24 text-center">Order Qty</th>
                      <th className="p-3 w-32 text-right">Unit Buy Cost ($)</th>
                      <th className="p-3 w-20 text-center">Tax %</th>
                      <th className="p-3 w-32 text-right">Line Total ($)</th>
                      <th className="p-3 w-10 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {items.map((item) => {
                      const itemTotal = item.qty * item.unitCost;
                      return (
                        <tr key={item.id} className="hover:bg-accent/40 transition-colors">
                          <td className="p-2.5 pl-4">
                            <div className="space-y-1">
                              <select
                                value={item.sku}
                                onChange={(e) => handleSelectCatalogItem(item.id, e.target.value)}
                                className="w-full bg-background/80 border border-border/80 rounded-xl p-1.5 text-xs font-bold text-foreground outline-none focus:border-gold-500"
                              >
                                {catalogItems.map((cat) => (
                                  <option key={cat.sku} value={cat.sku} className="bg-card">
                                    {cat.name}
                                  </option>
                                ))}
                              </select>
                              <span className="text-[10px] text-muted-foreground font-mono block pl-1">
                                SKU: {item.sku}
                              </span>
                            </div>
                          </td>

                          <td className="p-2.5 text-center">
                            <input
                              type="number"
                              min="1"
                              value={item.qty}
                              onChange={(e) => updateItemQty(item.id, parseInt(e.target.value) || 1)}
                              className="w-16 bg-background border border-border/80 rounded-xl p-1.5 text-center font-bold text-xs outline-none focus:border-gold-500"
                            />
                          </td>

                          <td className="p-2.5 text-right">
                            <input
                              type="number"
                              min="0"
                              value={item.unitCost}
                              onChange={(e) => updateItemCost(item.id, parseFloat(e.target.value) || 0)}
                              className="w-24 bg-background border border-border/80 rounded-xl p-1.5 text-right font-bold text-xs outline-none focus:border-gold-500"
                            />
                          </td>

                          <td className="p-2.5 text-center">
                            <select
                              value={item.tax}
                              onChange={(e) => updateItemTax(item.id, parseInt(e.target.value))}
                              className="bg-background border border-border/80 rounded-xl p-1.5 text-xs font-semibold outline-none"
                            >
                              <option value="0">0%</option>
                              <option value="5">5%</option>
                              <option value="10">10%</option>
                              <option value="15">15%</option>
                            </select>
                          </td>

                          <td className="p-2.5 text-right font-black text-foreground font-heading">
                            ${itemTotal.toLocaleString()}
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
          </div>

          {/* 3. Inbound Logistics & Incoterms */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground font-heading">Inbound Logistics & Quality Inspection</h3>
                <p className="text-[10px] text-muted-foreground">Select destination warehouse node and international Incoterms rule</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Destination Receiving Warehouse Node
                </Label>
                <select
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                  className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                >
                  {warehouses.map((wh) => (
                    <option key={wh.id} value={wh.id} className="bg-card">
                      {wh.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  International Trade Incoterms
                </Label>
                <select
                  value={incoterms}
                  onChange={(e) => setIncoterms(e.target.value)}
                  className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                >
                  {incotermsList.map((inc) => (
                    <option key={inc} value={inc} className="bg-card">
                      {inc}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 1 COLUMN: Commercial Summary & AI Spend Arbitrage */}
        <div className="space-y-6">
          {/* Sourcing Summary Card */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <h3 className="text-sm font-bold text-foreground font-heading">Sourcing Commitment</h3>
              <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 uppercase">
                USD ($)
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Deliverables Subtotal:</span>
                <span className="font-bold text-foreground">${subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Estimated VAT / Tax:</span>
                <span className="font-bold text-foreground">+${totalTax.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between text-muted-foreground">
                <span>Freight & Inbound Transit:</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs">$</span>
                  <input
                    type="number"
                    min="0"
                    value={freightFee}
                    onChange={(e) => setFreightFee(parseFloat(e.target.value) || 0)}
                    className="w-16 bg-background border border-border/80 rounded-lg p-1 text-right text-xs font-bold text-foreground"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-muted-foreground">
                <span>Customs Duty (%):</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={customsDutyPercent}
                    onChange={(e) => setCustomsDutyPercent(parseFloat(e.target.value) || 0)}
                    className="w-16 bg-background border border-border/80 rounded-lg p-1 text-right text-xs font-bold text-foreground"
                  />
                  <span>%</span>
                </div>
              </div>

              <div className="pt-3 border-t border-border/70 flex justify-between items-baseline">
                <span className="text-sm font-bold text-foreground">Total PO Commitment:</span>
                <span className="text-2xl font-black gold-text font-heading">${grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="space-y-2 pt-2 border-t border-border/60 text-xs text-muted-foreground">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoGRN}
                  onChange={(e) => setAutoGRN(e.target.checked)}
                  className="w-4 h-4 rounded-md border-border bg-card text-gold-500 accent-gold-500 cursor-pointer"
                />
                <span>Auto-generate GRN Inspection Draft upon dispatch</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoTransmitEDI}
                  onChange={(e) => setAutoTransmitEDI(e.target.checked)}
                  className="w-4 h-4 rounded-md border-border bg-card text-gold-500 accent-gold-500 cursor-pointer"
                />
                <span>Transmit digitally via EDI / Supplier API Gateway</span>
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-13 rounded-2xl gold-gradient text-obsidian-950 font-black text-xs sm:text-sm shadow-xl shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authorizing Purchase Order...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  Authorize & Issue Purchase Order <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>

          {/* AI Spend Arbitrage & Risk Analysis Card */}
          <div className="glass rounded-3xl border border-border/80 p-5 shadow-lg space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">AI Sourcing Arbitrage</h4>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Optimal Sourcing
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-card/60 border border-border/60 flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Spend Arbitrage Savings</span>
                  <span className="font-extrabold text-emerald-500 text-sm">Saved ${arbitrageSavings.toLocaleString()} (8.2%)</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <DollarSign className="w-4 h-4" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-card/60 border border-border/60 flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Supplier Fulfillment Track</span>
                  <span className="font-extrabold text-foreground text-sm">{vendor.rating}</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-gold-500/10 flex items-center justify-center text-gold-500">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
