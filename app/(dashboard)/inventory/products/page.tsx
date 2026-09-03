"use client";

import { useState } from "react";
import { 
  Plus, LayoutGrid, List, Search, Filter, 
  FileDown, Sparkles, ArrowLeft, Package,
  AlertCircle, DollarSign, Layers, Cpu, Server,
  Laptop, HardDrive, Boxes, Check, Eye, Edit,
  Trash2, X, ArrowRight, ShieldCheck, TrendingUp,
  RefreshCw, Building2, Truck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: "Networking" | "Servers" | "SaaS" | "IoT" | "Hardware";
  costPrice: number;
  salePrice: number;
  stock: number;
  minStock: number;
  unit: string;
  warehouse: string;
  description: string;
}

const initialProducts: ProductItem[] = [
  {
    id: "1",
    sku: "SKU-NET-9300",
    name: "Cisco Catalyst 9300 48-Port Switch",
    brand: "Cisco Systems",
    category: "Networking",
    costPrice: 450,
    salePrice: 850,
    stock: 45,
    minStock: 15,
    unit: "Units",
    warehouse: "Hub Alpha — Silicon Valley (USA)",
    description: "High-performance Layer-3 stackable modular enterprise network switch with PoE+ support.",
  },
  {
    id: "2",
    sku: "SKU-SVR-NV90",
    name: "NVIDIA DGX H100 Sovereign AI Server",
    brand: "NVIDIA Enterprise",
    category: "Servers",
    costPrice: 32000,
    salePrice: 48500,
    stock: 6,
    minStock: 2,
    unit: "Units",
    warehouse: "Hub Beta — Frankfurt (EU)",
    description: "High-density AI compute node with 8x H100 SXM5 Tensor Core GPUs and NVLink liquid cooling.",
  },
  {
    id: "3",
    sku: "SKU-SAS-SOV1",
    name: "Injaazh Sovereign Cloud ERP Core (Annual)",
    brand: "Injaazh Labs",
    category: "SaaS",
    costPrice: 12000,
    salePrice: 48000,
    stock: 999,
    minStock: 100,
    unit: "Licenses",
    warehouse: "Sovereign Cloud Vault",
    description: "Enterprise operating core with multi-tenant MongoDB Atlas vault and double-entry GAAP ledger.",
  },
  {
    id: "4",
    sku: "SKU-IOT-RFID",
    name: "Warehouse RFID IoT Telemetry Hub",
    brand: "Injaazh Telemetry",
    category: "IoT",
    costPrice: 1200,
    salePrice: 3400,
    stock: 12,
    minStock: 15,
    unit: "Packs (50x)",
    warehouse: "Hub Gamma — Singapore (APAC)",
    description: "Industrial dual-band RFID gateway with 30m detection radius and automated PO dispatch.",
  },
  {
    id: "5",
    sku: "SKU-SAS-GEM2",
    name: "Google Gemini 1.5 Pro Neural Cluster Node",
    brand: "Google Cloud",
    category: "SaaS",
    costPrice: 8500,
    salePrice: 18500,
    stock: 85,
    minStock: 20,
    unit: "Licenses",
    warehouse: "Sovereign Cloud Vault",
    description: "Natural language enterprise copilot node with automated forecasting and sentiment analytics.",
  },
  {
    id: "6",
    sku: "SKU-NET-FIB8",
    name: "Mellanox 100GbE QSFP28 Optical Transceiver",
    brand: "Mellanox Technologies",
    category: "Networking",
    costPrice: 85,
    salePrice: 195,
    stock: 240,
    minStock: 50,
    unit: "Units",
    warehouse: "Hub Alpha — Silicon Valley (USA)",
    description: "Ultra-low latency single-mode 1310nm optical transceiver for high-speed intra-rack SAN fabric.",
  },
  {
    id: "7",
    sku: "SKU-HWD-LAP1",
    name: "Dell Latitude 5420 Sovereign Workstation",
    brand: "Dell Technologies",
    category: "Hardware",
    costPrice: 650,
    salePrice: 1200,
    stock: 2,
    minStock: 5,
    unit: "Units",
    warehouse: "Hub Alpha — Silicon Valley (USA)",
    description: "FIPS 140-2 Level 3 biometric encrypted laptop for executive operations.",
  },
  {
    id: "8",
    sku: "SKU-HWD-PRN1",
    name: "HP LaserJet Enterprise MFP 5800",
    brand: "HP Enterprise",
    category: "Hardware",
    costPrice: 220,
    salePrice: 450,
    stock: 0,
    minStock: 3,
    unit: "Units",
    warehouse: "Hub Beta — Frankfurt (EU)",
    description: "Secure duplex network printer with cryptographic badge authentication and audit logging.",
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [view, setView] = useState<"grid" | "table">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [adjustStockAmount, setAdjustStockAmount] = useState(0);

  // Filter calculation
  const filteredProducts = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === "ALL") return true;
    if (activeFilter === "OPTIMAL") return p.stock > p.minStock && p.stock > 0;
    if (activeFilter === "LOW_STOCK") return p.stock <= p.minStock && p.stock > 0;
    if (activeFilter === "OUT_OF_STOCK") return p.stock <= 0;
    if (activeFilter === "SAAS") return p.category === "SaaS";

    return true;
  });

  const totalValuation = products.reduce((acc, p) => acc + (p.stock * p.costPrice), 0);
  const lowStockCount = products.filter(p => p.stock <= p.minStock && p.stock > 0).length;
  const outOfStockCount = products.filter(p => p.stock <= 0).length;

  const handleExportCatalog = () => {
    toast.success("Exporting Product Catalog...", {
      description: "Cryptographic CSV asset manifest generated and downloaded.",
    });
  };

  const handleQuickStockAdjustment = () => {
    if (!selectedProduct || adjustStockAmount === 0) return;
    
    setProducts(products.map(p => {
      if (p.id === selectedProduct.id) {
        const newStock = Math.max(0, p.stock + adjustStockAmount);
        return { ...p, stock: newStock };
      }
      return p;
    }));

    toast.success(`Inventory Stock Adjusted for ${selectedProduct.name}!`, {
      description: `Stock level updated to ${Math.max(0, selectedProduct.stock + adjustStockAmount)} ${selectedProduct.unit}. Ledger ledger entry synchronized.`,
    });

    setSelectedProduct(prev => prev ? { ...prev, stock: Math.max(0, prev.stock + adjustStockAmount) } : null);
    setAdjustStockAmount(0);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    if (selectedProduct?.id === productId) setSelectedProduct(null);
    toast.info("Product removed from active catalog.");
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Top Header & Fast Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Link 
              href="/inventory" 
              className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 bg-card/60 hover:bg-card border border-border/80 rounded-xl px-3 py-1 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Inventory Command
            </Link>
            <span className="text-xs text-muted-foreground">• Product Catalog & Asset Vault</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
            Product <span className="gold-text">Catalog & Asset Hub</span>
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Manage multi-warehouse physical hardware, enterprise cloud SaaS licenses, and automated safety stock buffers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Dual View Toggle */}
          <div className="bg-card border border-border/80 p-1 rounded-2xl flex items-center shadow-sm">
            <button
              type="button"
              onClick={() => setView("grid")}
              className={cn(
                "p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                view === "grid" 
                  ? "gold-gradient text-obsidian-950 font-black shadow-md" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setView("table")}
              className={cn(
                "p-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                view === "table" 
                  ? "gold-gradient text-obsidian-950 font-black shadow-md" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Button 
            variant="outline"
            onClick={handleExportCatalog}
            className="h-11 px-4 rounded-xl text-xs font-bold bg-card border-border hover:border-gold-500/40 cursor-pointer shadow-sm flex items-center gap-2"
          >
            <FileDown className="w-4 h-4 text-muted-foreground" />
            <span className="hidden sm:inline">Export Catalog</span>
          </Button>

          <Link href="/inventory/products/new">
            <Button className="h-11 px-6 rounded-xl gold-gradient text-obsidian-950 font-black text-xs shadow-lg shadow-gold-500/25 hover:opacity-95 cursor-pointer active:scale-98 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>Add Product</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* AI Stockout Prediction Alert Banner */}
      {lowStockCount > 0 && (
        <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0 border border-amber-500/30">
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                AI Stockout Prediction • Automated Reorder Alert
              </p>
              <p className="text-xs sm:text-sm font-bold text-foreground">
                <strong className="text-amber-500">{lowStockCount} Products</strong> have reached safety buffer thresholds. Projected stockout within 12 days.
              </p>
            </div>
          </div>

          <Link href="/inventory/products/new">
            <Button 
              variant="ghost" 
              className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/15 hover:bg-amber-500/25 px-4 h-9 rounded-xl self-start sm:self-auto cursor-pointer"
            >
              Auto-Generate Purchase Order →
            </Button>
          </Link>
        </div>
      )}

      {/* 4 Cyber-Luxe Asset KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              +8.4% YoY
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Total Asset Valuation</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-500 font-heading">${totalValuation.toLocaleString()}</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20 flex items-center justify-center">
              <Package className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
              5 Categories
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Active Catalog SKUs</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">{products.length} Products</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center justify-center">
              <AlertCircle className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
              Safety Buffer
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Low Buffer Reorder Alerts</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-heading">{lowStockCount} SKUs</p>
        </div>

        <div className="glass rounded-2xl p-5 border border-border/80 shadow-md relative overflow-hidden group hover:border-gold-500/40 transition-all">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-500 border border-gold-500/20 flex items-center justify-center">
              <RefreshCw className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/20">
              Top 5%
            </span>
          </div>
          <p className="text-[11px] text-muted-foreground uppercase font-bold tracking-wider mb-1">Average Turnover Velocity</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">18.2 Days</p>
        </div>
      </div>

      {/* Main Catalog Container */}
      <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
        {/* Filter Tabs & Search Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Status Filter Badges */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-1">
            {[
              { id: "ALL", label: "All Items", count: products.length },
              { id: "OPTIMAL", label: "Optimal Stock", count: products.filter(p => p.stock > p.minStock && p.stock > 0).length },
              { id: "LOW_STOCK", label: "Low Buffer Alert", count: lowStockCount },
              { id: "OUT_OF_STOCK", label: "Out of Stock", count: outOfStockCount },
              { id: "SAAS", label: "Cloud & SaaS", count: products.filter(p => p.category === "SaaS").length },
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

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by title, SKU or brand..."
              className="w-full bg-background/60 border border-border/80 rounded-xl h-10 pl-10 pr-4 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all"
            />
          </div>
        </div>

        {/* View Rendering: Grid vs Table */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground font-semibold">
            No matching inventory assets found in this view.
          </div>
        ) : view === "grid" ? (
          /* GRID VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredProducts.map((p) => {
              const isLowStock = p.stock <= p.minStock && p.stock > 0;
              const isOutOfStock = p.stock <= 0;
              return (
                <div
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className="p-4 rounded-2xl bg-card border border-border/80 hover:border-gold-500/40 shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center text-obsidian-950 font-black shadow-md shadow-gold-500/20 group-hover:scale-105 transition-transform">
                        {p.category === "Networking" ? <Cpu className="w-5 h-5" /> :
                         p.category === "Servers" ? <Server className="w-5 h-5" /> :
                         p.category === "SaaS" ? <Laptop className="w-5 h-5" /> :
                         p.category === "IoT" ? <HardDrive className="w-5 h-5" /> :
                         <Package className="w-5 h-5" />}
                      </div>

                      <div className="text-right">
                        <span className="text-[9px] font-mono font-bold text-muted-foreground block">{p.sku}</span>
                        <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] text-muted-foreground font-semibold uppercase">{p.brand}</span>
                      <h4 className="font-extrabold text-sm text-foreground font-heading line-clamp-2 group-hover:text-gold-500 transition-colors">
                        {p.name}
                      </h4>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-border/60">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] text-muted-foreground block">List Price</span>
                        <span className="text-base font-black text-foreground font-heading">${p.salePrice.toLocaleString()}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-[9px] text-muted-foreground block">Stock</span>
                        <span className={cn(
                          "text-xs font-extrabold px-2 py-0.5 rounded-full border inline-block",
                          isOutOfStock ? "text-rose-500 bg-rose-500/10 border-rose-500/20" :
                          isLowStock ? "text-amber-500 bg-amber-500/10 border-amber-500/20" :
                          "text-emerald-500 bg-emerald-500/10 border-emerald-500/20"
                        )}>
                          {p.stock} {p.unit}
                        </span>
                      </div>
                    </div>

                    <div className="text-[10px] text-muted-foreground truncate pt-0.5">
                      📍 {p.warehouse}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* TABLE VIEW */
          <div className="overflow-x-auto custom-scrollbar border border-border/80 rounded-2xl bg-card/40">
            <table className="w-full text-left text-xs">
              <thead className="bg-card/80 border-b border-border/80 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="py-4 pl-4">Product / SKU</th>
                  <th className="py-4">Category & Brand</th>
                  <th className="py-4">Pricing ($)</th>
                  <th className="py-4">Gross Margin</th>
                  <th className="py-4">Warehouse Node</th>
                  <th className="py-4 text-center">Stock Level</th>
                  <th className="py-4 pr-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredProducts.map((p) => {
                  const unitMargin = p.salePrice - p.costPrice;
                  const marginPercent = p.salePrice > 0 ? Math.round((unitMargin / p.salePrice) * 100) : 0;
                  const isLowStock = p.stock <= p.minStock && p.stock > 0;
                  const isOutOfStock = p.stock <= 0;

                  return (
                    <tr 
                      key={p.id}
                      onClick={() => setSelectedProduct(p)}
                      className="hover:bg-accent/40 transition-colors group cursor-pointer"
                    >
                      <td className="py-4 pl-4 font-bold text-foreground">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 flex items-center justify-center font-bold text-xs shrink-0">
                            {p.category.charAt(0)}
                          </div>
                          <div>
                            <span className="font-bold text-foreground group-hover:text-gold-500 transition-colors block">{p.name}</span>
                            <span className="text-[10px] font-mono text-muted-foreground">{p.sku}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4">
                        <span className="font-semibold text-foreground block">{p.category}</span>
                        <span className="text-[10px] text-muted-foreground">{p.brand}</span>
                      </td>

                      <td className="py-4 font-black font-heading text-foreground">
                        ${p.salePrice.toLocaleString()}
                        <span className="text-[10px] font-normal text-muted-foreground block">Cost: ${p.costPrice.toLocaleString()}</span>
                      </td>

                      <td className="py-4">
                        <span className="font-extrabold text-emerald-500 font-heading">+{marginPercent}%</span>
                        <span className="text-[10px] text-muted-foreground block">+${unitMargin}/unit</span>
                      </td>

                      <td className="py-4 text-muted-foreground">
                        {p.warehouse}
                      </td>

                      <td className="py-4 text-center">
                        <span className={cn(
                          "text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full border inline-block",
                          isOutOfStock ? "text-rose-500 bg-rose-500/10 border-rose-500/30" :
                          isLowStock ? "text-amber-500 bg-amber-500/10 border-amber-500/30" :
                          "text-emerald-500 bg-emerald-500/10 border-emerald-500/30"
                        )}>
                          {p.stock} {p.unit}
                        </span>
                      </td>

                      <td className="py-4 pr-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            title="View Asset Details"
                            onClick={() => setSelectedProduct(p)}
                            className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                          >
                            <Eye className="w-4 h-4" />
                          </button>

                          <button
                            title="Delete Product"
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 rounded-lg hover:bg-rose-500/10 text-muted-foreground hover:text-rose-500 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Slide-Over Asset Inspector & Stock Adjuster Drawer */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="w-full max-w-xl h-full bg-card border-l border-border/80 shadow-2xl p-6 sm:p-8 overflow-y-auto custom-scrollbar space-y-6 animate-in slide-in-from-right duration-300 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Close Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center text-obsidian-950 font-black">
                  <Package className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-foreground font-heading">{selectedProduct.name}</h3>
                  <p className="text-[10px] font-mono text-muted-foreground">SKU: {selectedProduct.sku}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedProduct(null)}
                className="p-2 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* General Specs */}
            <div className="p-4 rounded-2xl bg-card/60 border border-border/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-muted-foreground block">Brand / Manufacturer</span>
                  <span className="text-sm font-extrabold text-foreground">{selectedProduct.brand}</span>
                </div>
                <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/20">
                  {selectedProduct.category}
                </span>
              </div>

              <p className="text-xs text-muted-foreground leading-relaxed pt-1 border-t border-border/60">
                {selectedProduct.description}
              </p>
            </div>

            {/* Commercial Pricing & Margin Card */}
            <div className="p-4 rounded-2xl bg-card/60 border border-border/80 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Commercial Asset Valuation</h4>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2.5 rounded-xl bg-background/60 border border-border/60">
                  <span className="text-[10px] text-muted-foreground uppercase block">Cost (COGS)</span>
                  <span className="text-sm font-bold text-foreground font-heading">${selectedProduct.costPrice.toLocaleString()}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-background/60 border border-border/60">
                  <span className="text-[10px] text-muted-foreground uppercase block">List Price</span>
                  <span className="text-sm font-black text-foreground font-heading">${selectedProduct.salePrice.toLocaleString()}</span>
                </div>

                <div className="p-2.5 rounded-xl bg-background/60 border border-border/60">
                  <span className="text-[10px] text-muted-foreground uppercase block">Gross Margin</span>
                  <span className="text-sm font-extrabold text-emerald-500 font-heading">
                    +{Math.round(((selectedProduct.salePrice - selectedProduct.costPrice) / selectedProduct.salePrice) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Warehouse Allocation & Stock Adjuster */}
            <div className="p-4 rounded-2xl bg-card/60 border border-border/80 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Warehouse & Live Stock</h4>
                  <span className="text-xs font-semibold text-foreground">{selectedProduct.warehouse}</span>
                </div>
                <span className="text-sm font-black gold-text font-heading">
                  {selectedProduct.stock} {selectedProduct.unit}
                </span>
              </div>

              <div className="pt-2 border-t border-border/60 space-y-2">
                <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider">Quick Stock Adjustment</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Enter +/- qty (e.g. +10 or -5)"
                    value={adjustStockAmount || ""}
                    onChange={(e) => setAdjustStockAmount(parseInt(e.target.value) || 0)}
                    className="flex-1 bg-background border border-border/80 rounded-xl h-10 px-3 text-xs font-bold text-foreground outline-none focus:border-gold-500"
                  />
                  <Button
                    type="button"
                    onClick={handleQuickStockAdjustment}
                    className="h-10 px-4 rounded-xl gold-gradient text-obsidian-950 font-black text-xs cursor-pointer"
                  >
                    Adjust Stock
                  </Button>
                </div>
                <p className="text-[10px] text-muted-foreground">Auto-updates audit trail & double-entry inventory ledger.</p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/inventory/products/new">
                <Button className="w-full h-11 rounded-xl gold-gradient text-obsidian-950 font-extrabold text-xs shadow-md shadow-gold-500/20 cursor-pointer flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" /> Create Another Product SKU
                </Button>
              </Link>

              <Button
                variant="outline"
                onClick={handleExportCatalog}
                className="w-full h-11 rounded-xl text-xs font-bold cursor-pointer"
              >
                <FileDown className="w-4 h-4 mr-2" /> Download Asset Spec Sheet
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
