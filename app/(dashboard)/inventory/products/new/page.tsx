"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft, Package, DollarSign, Layers, Hash, 
  Sparkles, Building2, Server, ShieldCheck, Check, 
  ArrowRight, Loader2, Calculator, Info, RefreshCw,
  QrCode, AlertCircle, Cpu, HardDrive, Laptop,
  Boxes, Truck, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const categories = [
  { id: "networking", name: "Networking & Telemetry Hardware", icon: Cpu, badge: "Enterprise Infra" },
  { id: "servers", name: "Cloud & Server Infrastructure", icon: Server, badge: "Data Center" },
  { id: "saas", name: "Enterprise SaaS & AI Licenses", icon: Laptop, badge: "Digital Asset" },
  { id: "iot", name: "Industrial IoT & RFID Sensors", icon: HardDrive, badge: "Supply Chain" },
  { id: "workplace", name: "Workplace & Executive Hardware", icon: Package, badge: "Asset" },
];

const warehouses = [
  { id: "wh-alpha", name: "Hub Alpha — Silicon Valley Central (USA)", capacity: "84% Available" },
  { id: "wh-beta", name: "Hub Beta — Frankfurt Sovereign Node (EU)", capacity: "92% Available" },
  { id: "wh-gamma", name: "Hub Gamma — Singapore APAC Gateway", capacity: "78% Available" },
];

const unitsOfMeasure = ["Units", "Sets", "Packs (50x)", "Licenses", "Boxes", "Pallets"];

export default function NewProductPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [name, setName] = useState("Cisco Catalyst 9300 48-Port Switch");
  const [sku, setSku] = useState("SKU-CS-9300-48P");
  const [barcode, setBarcode] = useState("890123849102");
  const [category, setCategory] = useState("networking");
  const [brand, setBrand] = useState("Cisco Systems Enterprise");
  const [description, setDescription] = useState("High-performance Layer-3 stackable modular enterprise network switch with PoE+ support.");

  const [costPrice, setCostPrice] = useState(450);
  const [sellingPrice, setSellingPrice] = useState(850);
  const [taxRate, setTaxRate] = useState(10);

  const [openingStock, setOpeningStock] = useState(45);
  const [reorderPoint, setReorderPoint] = useState(15);
  const [reorderBatch, setReorderBatch] = useState(30);
  const [selectedWarehouse, setSelectedWarehouse] = useState("wh-alpha");
  const [unitOfMeasure, setUnitOfMeasure] = useState("Units");

  const [autoPO, setAutoPO] = useState(true);
  const [activeForSale, setActiveForSale] = useState(true);

  // Financial calculations
  const unitProfit = Math.max(0, sellingPrice - costPrice);
  const grossMargin = sellingPrice > 0 ? Math.round((unitProfit / sellingPrice) * 100) : 0;
  const markupPercent = costPrice > 0 ? Math.round((unitProfit / costPrice) * 100) : 0;

  const handleGenerateSKU = () => {
    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const prefix = category.substring(0, 3).toUpperCase();
    setSku(`SKU-${prefix}-${randomCode}`);
    toast.info("Generated new cryptographic SKU code.");
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please provide a product title.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Product Registered Successfully!", {
        description: `${name} (${sku}) synchronized across all warehouse ledger nodes.`,
      });
      router.push("/inventory/products");
    }, 1000);
  };

  const currentCategory = categories.find(c => c.id === category) || categories[0];
  const CategoryIcon = currentCategory.icon;

  return (
    <div className="space-y-6 pb-16 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link 
              href="/inventory/products" 
              className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 bg-card/60 hover:bg-card border border-border/80 rounded-xl px-3 py-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Product Catalog
            </Link>
            <span className="text-xs text-muted-foreground">• Asset Registration Studio</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
              Register <span className="gold-text">New Product</span>
            </h1>
            <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/15 px-2.5 py-0.5 rounded-full border border-gold-500/30 uppercase tracking-widest font-mono">
              {sku}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Configure multi-warehouse inventory items, safety buffers, margin valuation, and automated reorder rules.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button 
            variant="outline"
            onClick={() => router.push("/inventory/products")}
            className="h-11 px-5 rounded-xl text-xs font-bold bg-card border-border hover:border-gold-500/40 cursor-pointer shadow-sm"
          >
            Cancel
          </Button>

          <Button 
            onClick={handleCreateProduct}
            disabled={isSubmitting}
            className="h-11 px-7 rounded-xl gold-gradient text-obsidian-950 font-black text-xs shadow-lg shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center gap-2"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Registering Asset...</span>
              </div>
            ) : (
              <span className="flex items-center gap-2">
                Save & Deploy Product <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Main Studio Layout */}
      <form onSubmit={handleCreateProduct} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT 2 COLUMNS: Product Specifications & Pricing */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. General Product Specifications */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gold-500/15 text-gold-500 flex items-center justify-center font-bold">
                  <Package className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-heading">Product Identification</h3>
                  <p className="text-[10px] text-muted-foreground">General catalog identification, brand, and category</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/25">
                {currentCategory.badge}
              </span>
            </div>

            <div className="space-y-4">
              {/* Product Name */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Product Name / Title
                </Label>
                <div className="relative group">
                  <div className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold-500 transition-colors">
                    <Package className="w-full h-full" />
                  </div>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Cisco Catalyst 9300 48-Port Switch"
                    className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-10 pr-4 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all"
                  />
                </div>
              </div>

              {/* SKU, Barcode, Brand */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between ml-1">
                    <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider">SKU Code</Label>
                    <button
                      type="button"
                      onClick={handleGenerateSKU}
                      className="text-[10px] text-gold-600 dark:text-gold-400 font-bold hover:underline cursor-pointer flex items-center gap-0.5"
                    >
                      <RefreshCw className="w-2.5 h-2.5" /> Auto
                    </button>
                  </div>
                  <div className="relative">
                    <Hash className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-10 pr-3 text-xs font-mono font-bold text-foreground outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Barcode / UPC</Label>
                  <div className="relative">
                    <QrCode className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      placeholder="890123849102"
                      className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-10 pr-3 text-xs font-mono font-semibold text-foreground outline-none focus:border-gold-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Brand / Vendor</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <input
                      type="text"
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      placeholder="Cisco Systems"
                      className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-10 pr-3 text-xs font-semibold text-foreground outline-none focus:border-gold-500"
                    />
                  </div>
                </div>
              </div>

              {/* Category & Unit of Measure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                    Primary Category
                  </Label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id} className="bg-card text-foreground">
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                    Unit of Measure (UOM)
                  </Label>
                  <select
                    value={unitOfMeasure}
                    onChange={(e) => setUnitOfMeasure(e.target.value)}
                    className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer"
                  >
                    {unitsOfMeasure.map((uom) => (
                      <option key={uom} value={uom} className="bg-card">
                        {uom}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
                  Product Description & Specifications
                </Label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Provide technical asset specifications, warranty terms, or storage constraints..."
                  className="w-full bg-background/60 border border-border/80 rounded-2xl p-3 text-xs font-medium text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all"
                />
              </div>
            </div>
          </div>

          {/* 2. Valuation & Commercial Pricing Matrix */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center font-bold">
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-heading">Costing, Pricing & Gross Margin</h3>
                  <p className="text-[10px] text-muted-foreground">Set unit cost price, customer list price and tax tranches</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/25">
                +{grossMargin}% Gross Margin
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Cost Price ($ COGS)</Label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">$</span>
                  <input
                    type="number"
                    min="0"
                    value={costPrice}
                    onChange={(e) => setCostPrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-8 pr-3 text-xs font-bold text-foreground outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">List Selling Price ($)</Label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gold-500">$</span>
                  <input
                    type="number"
                    min="0"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(parseFloat(e.target.value) || 0)}
                    className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-8 pr-3 text-xs font-black text-foreground outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Tax / VAT Rate</Label>
                <select
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseInt(e.target.value))}
                  className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:border-gold-500 cursor-pointer"
                >
                  <option value="0">0% (Zero Tax / Sovereign)</option>
                  <option value="5">5% (Standard VAT)</option>
                  <option value="10">10% (Commercial Standard)</option>
                  <option value="15">15% (Enterprise Luxury)</option>
                </select>
              </div>
            </div>

            {/* Live Profit Margin Telemetry Bar */}
            <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-muted-foreground block text-[10px]">Net Profit / Unit:</span>
                <strong className="text-emerald-500 font-extrabold text-sm">${unitProfit.toLocaleString()}</strong>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px]">Markup on Cost:</span>
                <strong className="text-foreground font-extrabold text-sm">+{markupPercent}%</strong>
              </div>
              <div>
                <span className="text-muted-foreground block text-[10px]">Total Inventory Asset Value:</span>
                <strong className="gold-text font-extrabold text-sm">${(openingStock * costPrice).toLocaleString()}</strong>
              </div>
            </div>
          </div>

          {/* 3. Multi-Warehouse Stock & Buffer Control */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold">
                <Boxes className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground font-heading">Multi-Warehouse Buffers & Reorder Tranches</h3>
                <p className="text-[10px] text-muted-foreground">Opening stock allocation and autonomous reorder trigger limits</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Opening Stock (Qty)</Label>
                <input
                  type="number"
                  min="0"
                  value={openingStock}
                  onChange={(e) => setOpeningStock(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 px-3.5 text-xs font-bold text-foreground outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Safety Stock Reorder Point</Label>
                <input
                  type="number"
                  min="0"
                  value={reorderPoint}
                  onChange={(e) => setReorderPoint(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 px-3.5 text-xs font-bold text-foreground outline-none focus:border-gold-500"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Reorder Batch Size</Label>
                <input
                  type="number"
                  min="1"
                  value={reorderBatch}
                  onChange={(e) => setReorderBatch(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 px-3.5 text-xs font-bold text-foreground outline-none focus:border-gold-500"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Primary Storage Warehouse Node</Label>
              <select
                value={selectedWarehouse}
                onChange={(e) => setSelectedWarehouse(e.target.value)}
                className="w-full h-11 bg-background/60 border border-border/80 rounded-2xl px-3.5 text-xs font-semibold text-foreground outline-none focus:border-gold-500 cursor-pointer"
              >
                {warehouses.map((wh) => (
                  <option key={wh.id} value={wh.id} className="bg-card">
                    {wh.name} — {wh.capacity}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* RIGHT 1 COLUMN: Live Holographic Product Preview & AI Forecast */}
        <div className="space-y-6">
          {/* Live Holographic Product Card Preview */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-6 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-gold-500" />
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider">Live Catalog Card Preview</h3>
              </div>
              <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                Active SKU
              </span>
            </div>

            {/* Simulated Product Card */}
            <div className="p-4 rounded-2xl bg-card border border-border/80 space-y-3 relative overflow-hidden shadow-md">
              <div className="flex items-start justify-between gap-2">
                <div className="w-11 h-11 rounded-xl gold-gradient flex items-center justify-center text-obsidian-950 font-black shadow-md shadow-gold-500/20">
                  <CategoryIcon className="w-5 h-5" />
                </div>
                <div className="text-right">
                  <span className="text-[9px] font-mono text-muted-foreground block">{sku}</span>
                  <span className="text-xs font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20">
                    {currentCategory.badge}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-[10px] text-muted-foreground font-semibold uppercase">{brand}</span>
                <h4 className="font-extrabold text-sm text-foreground font-heading leading-snug line-clamp-2">
                  {name || "Untitled Product"}
                </h4>
              </div>

              <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-muted-foreground block">List Price</span>
                  <span className="text-lg font-black text-foreground font-heading">${sellingPrice.toLocaleString()}</span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-muted-foreground block">Stock Available</span>
                  <span className={cn(
                    "text-xs font-extrabold px-2 py-0.5 rounded-full border inline-block",
                    openingStock > reorderPoint 
                      ? "text-emerald-500 bg-emerald-500/10 border-emerald-500/20" 
                      : "text-rose-500 bg-rose-500/10 border-rose-500/20"
                  )}>
                    {openingStock} {unitOfMeasure}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* AI Inventory Intelligence Widget */}
          <div className="glass rounded-3xl border border-border/80 p-5 shadow-lg space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border/60">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-500" />
                <h4 className="text-xs font-bold text-foreground uppercase tracking-wider">AI Asset Intelligence</h4>
              </div>
              <span className="text-[10px] font-extrabold text-gold-500 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20">
                Predictive
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-card/60 border border-border/60 flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Turnover Velocity</span>
                  <span className="font-bold text-foreground">High Demand • ~14 Days Cycle</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <Calculator className="w-4 h-4" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-card/60 border border-border/60 flex items-center justify-between">
                <div>
                  <span className="text-muted-foreground block text-[11px]">Reorder Prediction</span>
                  <span className="font-bold text-amber-500">Auto PO trigger at {reorderPoint} units</span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <AlertCircle className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Automation Toggles */}
            <div className="space-y-2.5 pt-2 border-t border-border/60 text-xs text-muted-foreground">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoPO}
                  onChange={(e) => setAutoPO(e.target.checked)}
                  className="w-4 h-4 rounded-md border-border bg-card text-gold-500 accent-gold-500 cursor-pointer"
                />
                <span>Enable Automated Low-Stock Purchase Orders</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={activeForSale}
                  onChange={(e) => setActiveForSale(e.target.checked)}
                  className="w-4 h-4 rounded-md border-border bg-card text-gold-500 accent-gold-500 cursor-pointer"
                />
                <span>Publish Immediately to Sales Catalog & POS</span>
              </label>
            </div>

            {/* Submit Action */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-13 rounded-2xl gold-gradient text-obsidian-950 font-black text-xs sm:text-sm shadow-xl shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-2 mt-3"
            >
              {isSubmitting ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Deploying Product...</span>
                </div>
              ) : (
                <span className="flex items-center gap-2">
                  Save & Deploy Product into Vault <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
