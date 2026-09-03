"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Plus, Trash2, ShoppingCart, Building2, 
  Calendar, Truck, ShieldCheck, Sparkles, DollarSign,
  Package, CheckCircle2, AlertTriangle, ArrowRight,
  Loader2, Calculator, Info, FileText, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface OrderLineItem {
  id: number;
  sku: string;
  name: string;
  stockQty: number;
  qty: number;
  price: number;
  tax: number;
}

const enterpriseClients = [
  {
    name: "Meta Systems PLC",
    contact: "Sarah Jenkins (Procurement VP)",
    email: "billing@meta.com",
    tier: "Tier-1 Enterprise",
    address: "1 Hacker Way, Menlo Park, CA",
    creditScore: 98,
  },
  {
    name: "Tesla Energy Corp",
    contact: "David Vance (Supply Director)",
    email: "finance@tesla.com",
    tier: "Tier-1 Enterprise",
    address: "3500 Deer Creek Rd, Palo Alto, CA",
    creditScore: 95,
  },
  {
    name: "SpaceX Logistics",
    contact: "Gwen Harper (Mission Ops)",
    email: "procurement@spacex.com",
    tier: "Strategic Cloud",
    address: "1 Rocket Rd, Hawthorne, CA",
    creditScore: 99,
  },
  {
    name: "Stripe Corporate",
    contact: "Marcus Chen (Fintech AP)",
    email: "ap@stripe.com",
    tier: "Fintech Vault",
    address: "510 Townsend St, San Francisco, CA",
    creditScore: 97,
  },
  {
    name: "Apex Global Conglomerate",
    contact: "Lord Arthur Sterling (Treasury)",
    email: "treasury@apex.com",
    tier: "Holding Entity",
    address: "100 Bishopsgate, London, UK",
    creditScore: 94,
  },
];

const catalogCatalog = [
  { sku: "ERP-SOV-PRO", name: "Injaazh Sovereign Cloud ERP Core (Annual)", price: 48000, stock: 999, tax: 10 },
  { sku: "AI-GEMINI-HUB", name: "Google Gemini 1.5 Pro Neural Cluster Node", price: 18500, stock: 85, tax: 10 },
  { sku: "DB-ATLAS-SHARD", name: "Dedicated MongoDB Atlas Isolated Sharding Vault", price: 6200, stock: 120, tax: 10 },
  { sku: "HW-IOT-BEACON", name: "Warehouse RFID IoT Telemetry Hub (Pack of 50)", price: 3400, stock: 42, tax: 5 },
  { sku: "SLA-247-ENG", name: "24/7/365 Sovereign Engineering Support Tier", price: 12000, stock: 999, tax: 0 },
  { sku: "POS-TERMINAL-X", name: "Omnichannel POS Hardware Terminal Tranche", price: 2100, stock: 8, tax: 5 },
];

const warehouses = [
  { id: "wh-alpha", name: "Hub Alpha — Silicon Valley Central (USA)", leadTime: "1-2 Days" },
  { id: "wh-beta", name: "Hub Beta — Frankfurt Sovereign Node (EU)", leadTime: "2-3 Days" },
  { id: "wh-gamma", name: "Hub Gamma — Singapore APAC Gateway", leadTime: "2-4 Days" },
];

export default function NewSalesOrderPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [selectedClientIndex, setSelectedClientIndex] = useState(0);
  const [salesChannel, setSalesChannel] = useState("Direct Enterprise");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");
  const [selectedWarehouse, setSelectedWarehouse] = useState("wh-alpha");
  const [shippingMethod, setShippingMethod] = useState("Express Air Freight");
  const [orderDate, setOrderDate] = useState("2026-09-04");
  const [promisedDate, setPromisedDate] = useState("2026-09-18");
  const [shippingFee, setShippingFee] = useState(450);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [autoProforma, setAutoProforma] = useState(true);
  const [autoNotifyClient, setAutoNotifyClient] = useState(true);

  const [items, setItems] = useState<OrderLineItem[]>([
    {
      id: 1,
      sku: "ERP-SOV-PRO",
      name: "Injaazh Sovereign Cloud ERP Core (Annual)",
      stockQty: 999,
      qty: 1,
      price: 48000,
      tax: 10,
    },
    {
      id: 2,
      sku: "AI-GEMINI-HUB",
      name: "Google Gemini 1.5 Pro Neural Cluster Node",
      stockQty: 85,
      qty: 2,
      price: 18500,
      tax: 10,
    },
  ]);

  const client = enterpriseClients[selectedClientIndex];

  const addItem = () => {
    const defaultCatalog = catalogCatalog[0];
    setItems([
      ...items,
      {
        id: Date.now(),
        sku: defaultCatalog.sku,
        name: defaultCatalog.name,
        stockQty: defaultCatalog.stock,
        qty: 1,
        price: defaultCatalog.price,
        tax: defaultCatalog.tax,
      },
    ]);
  };

  const handleSelectCatalogItem = (itemId: number, sku: string) => {
    const catalogItem = catalogCatalog.find(c => c.sku === sku);
    if (!catalogItem) return;

    setItems(items.map(i => {
      if (i.id === itemId) {
        return {
          ...i,
          sku: catalogItem.sku,
          name: catalogItem.name,
          stockQty: catalogItem.stock,
          price: catalogItem.price,
          tax: catalogItem.tax,
        };
      }
      return i;
    }));
  };

  const updateItemQty = (id: number, qty: number) => {
    setItems(items.map(i => i.id === id ? { ...i, qty: Math.max(1, qty) } : i));
  };

  const updateItemPrice = (id: number, price: number) => {
    setItems(items.map(i => i.id === id ? { ...i, price: Math.max(0, price) } : i));
  };

  const updateItemTax = (id: number, tax: number) => {
    setItems(items.map(i => i.id === id ? { ...i, tax } : i));
  };

  const removeItem = (id: number) => {
    if (items.length > 1) {
      setItems(items.filter(i => i.id !== id));
    } else {
      toast.warning("Sales Order must contain at least one line item.");
    }
  };

  // Calculations
  const subtotal = items.reduce((acc, i) => acc + (i.qty * i.price), 0);
  const totalTax = items.reduce((acc, i) => acc + ((i.qty * i.price) * (i.tax / 100)), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const grandTotal = Math.max(0, subtotal + totalTax + shippingFee - discountAmount);

  // AI Margin Estimation
  const estimatedCost = subtotal * 0.58; // 58% estimated COGS
  const grossProfit = subtotal - estimatedCost;
  const grossMarginPercent = subtotal > 0 ? Math.round((grossProfit / subtotal) * 100) : 0;

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      const generatedOrderId = `#SO-2026-${Math.floor(8000 + Math.random() * 1000)}`;
      toast.success(`Sales Order ${generatedOrderId} Dispatched!`, {
        description: `Order authorized for ${client.name} totaling $${grandTotal.toLocaleString()}. Warehouse fulfillment queued.`,
      });
      router.push("/sales/orders");
    }, 1000);
  };

  return (
    <div className="space-y-6 pb-16 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link 
              href="/sales/orders" 
              className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 bg-card/60 hover:bg-card border border-border/80 rounded-xl px-3 py-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Sales Orders
            </Link>
            <span className="text-xs text-muted-foreground">• Order Generation Hub</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
              Create <span className="gold-text">Sales Order</span>
            </h1>
            <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/15 px-2.5 py-0.5 rounded-full border border-gold-500/30 uppercase tracking-widest font-mono">
              #SO-2026-9420
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Configure enterprise line deliverables, pricing tranches, warehouse dispatch, and commercial terms.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button 
            variant="outline"
            onClick={() => router.push("/sales/orders")}
            className="h-11 px-5 rounded-xl text-xs font-bold bg-card border-border hover:border-gold-500/40 cursor-pointer shadow-sm"
          >
            Cancel
          </Button>

          <Button 
            onClick={handleCreateOrder}
            disabled={isSubmitting}
            className="h-11 px-7 rounded-xl gold-gradient text-obsidian-950 font-black text-xs shadow-lg shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center gap-2"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authorizing Order...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                Authorize & Dispatch Order <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <form onSubmit={handleCreateOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS: Order Construction */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Customer & Commercial Parameters */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gold-500/15 text-gold-500 flex items-center justify-center font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-heading">Enterprise Client & Terms</h3>
                  <p className="text-[10px] text-muted-foreground">Select client organization and billing terms</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                {client.tier}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Customer Organization
                </Label>
                <div className="relative">
                  <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <select
                    value={selectedClientIndex}
                    onChange={(e) => setSelectedClientIndex(parseInt(e.target.value))}
                    className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl pl-10 pr-4 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                  >
                    {enterpriseClients.map((c, idx) => (
                      <option key={idx} value={idx} className="bg-card text-foreground">
                        {c.name} — {c.tier}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Sales Channel
                </Label>
                <select
                  value={salesChannel}
                  onChange={(e) => setSalesChannel(e.target.value)}
                  className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                >
                  <option value="Direct Enterprise" className="bg-card">Direct Enterprise Sales</option>
                  <option value="Partner Referral" className="bg-card">Global Partner Referral</option>
                  <option value="RFQ Tender" className="bg-card">Government & Institutional Tender</option>
                  <option value="Digital Portal" className="bg-card">Digital Customer Portal</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Order Creation Date
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="date"
                    value={orderDate}
                    onChange={(e) => setOrderDate(e.target.value)}
                    className="h-11 bg-background/60 border-border/80 rounded-2xl pl-10 text-xs font-semibold text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Promised Delivery Maturity
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="date"
                    value={promisedDate}
                    onChange={(e) => setPromisedDate(e.target.value)}
                    className="h-11 bg-background/60 border-border/80 rounded-2xl pl-10 text-xs font-semibold text-foreground"
                  />
                </div>
              </div>
            </div>

            {/* Client Telemetry Bar */}
            <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gold-500 shrink-0" />
                <span className="text-muted-foreground">Primary Contact: <strong className="text-foreground">{client.contact}</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Billing: <strong className="text-foreground">{client.email}</strong></span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-emerald-500">
                <ShieldCheck className="w-4 h-4" />
                <span>Credit Score: {client.creditScore}/100</span>
              </div>
            </div>
          </div>

          {/* 2. Line Items & Catalog Matrix */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-500 flex items-center justify-center font-bold">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-heading">Deliverables & Catalog Line Items</h3>
                  <p className="text-[10px] text-muted-foreground">Add products, configure quantities and unit tax rates</p>
                </div>
              </div>
              
              <button
                type="button"
                onClick={addItem}
                className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:text-foreground flex items-center gap-1.5 cursor-pointer bg-card/60 hover:bg-card border border-border/80 px-3 py-1.5 rounded-xl transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" /> Add Deliverable
              </button>
            </div>

            <div className="border border-border/80 rounded-2xl overflow-hidden bg-card/40">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left text-xs min-w-[650px]">
                  <thead className="bg-card/80 border-b border-border/80 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                    <tr>
                      <th className="p-3 pl-4">SKU / Deliverable</th>
                      <th className="p-3 w-28 text-center">Stock Buffer</th>
                      <th className="p-3 w-20 text-center">Qty</th>
                      <th className="p-3 w-28 text-right">Unit Price ($)</th>
                      <th className="p-3 w-20 text-center">Tax %</th>
                      <th className="p-3 w-28 text-right">Line Total ($)</th>
                      <th className="p-3 w-10 text-center"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {items.map((item) => {
                      const itemTotal = item.qty * item.price;
                      return (
                        <tr key={item.id} className="hover:bg-accent/40 transition-colors">
                          <td className="p-2.5 pl-4">
                            <div className="space-y-1">
                              <select
                                value={item.sku}
                                onChange={(e) => handleSelectCatalogItem(item.id, e.target.value)}
                                className="w-full bg-background/80 border border-border/80 rounded-xl p-1.5 text-xs font-bold text-foreground outline-none focus:border-gold-500"
                              >
                                {catalogCatalog.map((cat) => (
                                  <option key={cat.sku} value={cat.sku} className="bg-card">
                                    {cat.name} (${cat.price.toLocaleString()})
                                  </option>
                                ))}
                              </select>
                              <span className="text-[10px] text-muted-foreground font-mono block pl-1">
                                SKU: {item.sku}
                              </span>
                            </div>
                          </td>

                          <td className="p-2.5 text-center">
                            <span className={cn(
                              "text-[10px] font-bold px-2 py-0.5 rounded-full border inline-block",
                              item.stockQty > 20 
                                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
                                : "text-amber-600 dark:text-amber-400 bg-amber-500/10 border-amber-500/20"
                            )}>
                              {item.stockQty > 500 ? "Unlimited SLA" : `${item.stockQty} in stock`}
                            </span>
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
                              value={item.price}
                              onChange={(e) => updateItemPrice(item.id, parseFloat(e.target.value) || 0)}
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

          {/* 3. Logistics & Warehouse Origin */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground font-heading">Fulfillment & Logistics Routing</h3>
                <p className="text-[10px] text-muted-foreground">Select origin warehouse node and delivery method</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Warehouse Node Origin
                </Label>
                <select
                  value={selectedWarehouse}
                  onChange={(e) => setSelectedWarehouse(e.target.value)}
                  className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                >
                  {warehouses.map((wh) => (
                    <option key={wh.id} value={wh.id} className="bg-card">
                      {wh.name} ({wh.leadTime})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Shipping Freight Mode
                </Label>
                <select
                  value={shippingMethod}
                  onChange={(e) => setShippingMethod(e.target.value)}
                  className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                >
                  <option value="Express Air Freight" className="bg-card">Express Air Freight (Priority 24-48h)</option>
                  <option value="Standard Logistics" className="bg-card">Standard Ground / Ocean Freight</option>
                  <option value="Digital Provisioning" className="bg-card">Instant Digital Cloud Provisioning</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 1 COLUMN: Real-Time Commercial Ledger & AI Margin */}
        <div className="space-y-6">
          {/* Commercial Ledger Card */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <h3 className="text-sm font-bold text-foreground font-heading">Order Summary</h3>
              <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 uppercase">
                USD ($) Currency
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-muted-foreground">
                <span>Deliverables Subtotal:</span>
                <span className="font-bold text-foreground">${subtotal.toLocaleString()}</span>
              </div>

              <div className="flex justify-between text-muted-foreground">
                <span>Estimated Tax / VAT:</span>
                <span className="font-bold text-foreground">+${totalTax.toLocaleString()}</span>
              </div>

              <div className="flex items-center justify-between text-muted-foreground">
                <span>Freight & Handling:</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs">$</span>
                  <input
                    type="number"
                    min="0"
                    value={shippingFee}
                    onChange={(e) => setShippingFee(parseFloat(e.target.value) || 0)}
                    className="w-16 bg-background border border-border/80 rounded-lg p-1 text-right text-xs font-bold text-foreground"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-muted-foreground">
                <span>Volume Discount (%):</span>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
                    className="w-16 bg-background border border-border/80 rounded-lg p-1 text-right text-xs font-bold text-foreground"
                  />
                  <span>%</span>
                </div>
              </div>

              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-500 font-semibold">
                  <span>Discount Savings ({discountPercent}%):</span>
                  <span>-${discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="pt-3 border-t border-border/70 flex justify-between items-baseline">
                <span className="text-sm font-bold text-foreground">Total Order Value:</span>
                <span className="text-2xl font-black gold-text font-heading">${grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkbox Options */}
            <div className="space-y-2 pt-2 border-t border-border/60 text-xs text-muted-foreground">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoProforma}
                  onChange={(e) => setAutoProforma(e.target.checked)}
                  className="w-4 h-4 rounded-md border-border bg-card text-gold-500 accent-gold-500 cursor-pointer"
                />
                <span>Generate Proforma Invoice automatically</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoNotifyClient}
                  onChange={(e) => setAutoNotifyClient(e.target.checked)}
                  className="w-4 h-4 rounded-md border-border bg-card text-gold-500 accent-gold-500 cursor-pointer"
                />
                <span>Send automated dispatch confirmation to client</span>
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
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Authorizing Order...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  Authorize & Dispatch Sales Order <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>

          {/* AI Margin & Risk Analysis Card */}
          <div className="glass rounded-3xl border border-border/80 p-5 shadow-lg space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">AI Commercial Telemetry</h4>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Optimized
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-card/60 border border-border/60 flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Estimated Gross Margin</span>
                  <span className="font-extrabold text-emerald-500 text-sm">+{grossMarginPercent}% Net Margin</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Calculator className="w-4 h-4" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-card/60 border border-border/60 flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Client Credit Standing</span>
                  <span className="font-extrabold text-foreground text-sm">{client.creditScore}/100 • Sovereign Tier</span>
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
