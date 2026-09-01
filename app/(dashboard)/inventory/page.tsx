"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, Warehouse, AlertTriangle, ArrowDownLeft, 
  ArrowUpRight, RefreshCcw, Plus, Search, Filter, 
  Sparkles, DollarSign, Layers, CheckCircle2, ShoppingCart,
  ArrowRight, ChevronRight, Barcode, Truck
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MovementLog from "./components/MovementLog";

const warehouses = [
  { id: "w1", name: "Central HQ Mega-Hub", location: "Dhaka Central Zone", capacity: 84, used: "12,600 / 15,000 m³", items: "2,450 SKUs", temp: "21°C • Ambient", status: "Optimal" },
  { id: "w2", name: "Chittagong Port Logistics Hub", location: "Chittagong Port Terminal", capacity: 62, used: "18,600 / 30,000 m³", items: "1,280 SKUs", temp: "18°C • Chilled", status: "Active" },
  { id: "w3", name: "Regional Transit Depot", location: "Gazipur Industrial Zone", capacity: 38, used: "3,800 / 10,000 m³", items: "550 SKUs", temp: "Ambient", status: "Available" },
];

const lowStockItems = [
  { id: "ls1", name: "Apple MacBook Pro 16\" M3 Max", sku: "HW-MBP-001", stock: 2, min: 10, supplier: "Apple Authorized Dist.", cost: "$2,850", reorderQty: 15 },
  { id: "ls2", name: "Dell UltraSharp 32\" 4K Monitor", sku: "HW-MON-012", stock: 5, min: 15, supplier: "Dell Commercial Supply", cost: "$680", reorderQty: 20 },
  { id: "ls3", name: "Logitech MX Master 3S Wireless", sku: "HW-PER-055", stock: 8, min: 25, supplier: "Logitech Global Direct", cost: "$85", reorderQty: 50 },
  { id: "ls4", name: "Herman Miller Aeron Ergonomic Chair", sku: "FUR-CHR-009", stock: 3, min: 10, supplier: "Herman Miller Office Tech", cost: "$1,150", reorderQty: 12 },
];

export default function InventoryDashboard() {
  const [orderedItems, setOrderedItems] = useState<string[]>([]);

  const handleReorder = (item: typeof lowStockItems[0]) => {
    setOrderedItems((prev) => [...prev, item.id]);
    toast.success(`Purchase Order generated for ${item.reorderQty} units of ${item.name}! Sent to ${item.supplier}.`);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">
      {/* Top Banner: Inventory Valuation & Capacity Metrics */}
      <div className="glass-strong rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-ping" />
              <span className="text-[11px] font-extrabold text-purple-500 dark:text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                Asset & Warehouse Logistics
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
              Inventory & <span className="gold-text">Supply Matrix</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
              Multi-warehouse capacity tracking, automated low-stock replenishment, and real-time movement auditing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/inventory/products">
              <Button variant="outline" className="rounded-2xl h-11 sm:h-12 px-5 border-border bg-card/60 font-bold text-xs sm:text-sm hover:bg-accent">
                <Package className="w-4 h-4 mr-2 text-gold-500" /> SKU Catalog (4,280)
              </Button>
            </Link>
            <Link href="/inventory/products/new">
              <Button className="gold-gradient text-obsidian-900 font-extrabold text-xs sm:text-sm rounded-2xl h-11 sm:h-12 px-6 shadow-lg shadow-gold-500/20 hover:opacity-90">
                <Plus className="w-4 h-4 mr-1.5" /> Register New SKU
              </Button>
            </Link>
          </div>
        </div>

        {/* Valuation & Logistics Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-border/50">
          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Total Stock Valuation</span>
              <DollarSign className="w-3.5 h-3.5 text-gold-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">$1,840,500</div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Low-Stock Alerts</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-amber-500 font-heading">4 SKUs <span className="text-xs text-muted-foreground font-sans font-medium">Need PO</span></div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Active Warehouses</span>
              <Warehouse className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">3 Hubs</div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Stock Turnover Ratio</span>
              <RefreshCcw className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-emerald-500 font-heading">8.4x <span className="text-xs text-muted-foreground font-sans font-medium">Yearly</span></div>
          </div>
        </div>
      </div>

      {/* Main Section 1: Warehouse Spatial Capacity Heatmap */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">Warehouse Spatial Utilization</h3>
            <p className="text-xs text-muted-foreground">Real-time volumetric capacity and bin storage allocation</p>
          </div>
          <Link href="/inventory/warehouses">
            <Button variant="ghost" size="sm" className="text-xs font-semibold text-gold-500 hover:text-gold-400">
              Manage Hubs <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {warehouses.map((wh) => (
            <div key={wh.id} className="glass rounded-3xl p-5 border border-border/80 shadow-lg space-y-4 relative overflow-hidden group hover:border-gold-500/30 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-foreground group-hover:text-gold-500 transition-colors">{wh.name}</h4>
                  <p className="text-[11px] text-muted-foreground">{wh.location}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent text-foreground">
                  {wh.items}
                </span>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground font-medium">Storage Volume</span>
                  <span className="font-extrabold text-foreground">{wh.capacity}%</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-accent overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      wh.capacity > 80 ? "bg-amber-500" : wh.capacity > 50 ? "bg-emerald-500" : "bg-blue-500"
                    }`}
                    style={{ width: `${wh.capacity}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground mt-1.5">
                  <span>{wh.used}</span>
                  <span className="text-emerald-500 font-semibold">{wh.temp}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Section 2: Critical Stock Table with 1-Click PO + Movement Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Critical Low-Stock Replenishment */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground font-heading">Critical Stock Replenishment</h3>
                  <p className="text-xs text-muted-foreground">SKUs approaching or below safe buffer threshold</p>
                </div>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                Action Required
              </span>
            </div>

            <div className="divide-y divide-border/50 pt-1">
              {lowStockItems.map((item) => {
                const isOrdered = orderedItems.includes(item.id);

                return (
                  <div key={item.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-foreground">{item.name}</span>
                        <span className="text-[10px] font-mono text-muted-foreground bg-accent px-1.5 py-0.2 rounded">{item.sku}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground">Supplier: {item.supplier}</p>
                    </div>

                    <div className="flex items-center gap-4 text-xs justify-between sm:justify-end">
                      <div className="text-right">
                        <div className="text-sm font-extrabold text-amber-500">{item.stock} in stock</div>
                        <div className="text-[10px] text-muted-foreground">Min buffer: {item.min}</div>
                      </div>

                      <Button
                        size="sm"
                        disabled={isOrdered}
                        onClick={() => handleReorder(item)}
                        className={`rounded-xl text-xs font-bold ${
                          isOrdered
                            ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                            : "gold-gradient text-obsidian-900 hover:opacity-90 shadow-sm"
                        }`}
                      >
                        {isOrdered ? (
                          <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> PO Sent</span>
                        ) : (
                          <span className="flex items-center gap-1"><ShoppingCart className="w-3.5 h-3.5" /> 1-Click PO ({item.reorderQty})</span>
                        )}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Movement Log Stream */}
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-bold text-foreground font-heading">Real-Time Stock Movement Audit</h3>
              <p className="text-xs text-muted-foreground">Inbound GRNs, outbound customer deliveries, and internal transfers</p>
            </div>
            <MovementLog />
          </div>
        </div>

        {/* Right 1 Col: Quick Logistics Tools & Categories */}
        <div className="space-y-6">
          <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-lg space-y-4">
            <h4 className="text-sm font-bold text-foreground font-heading">Quick Logistics Tools</h4>
            
            <div className="space-y-2">
              <Link href="/inventory/stock" className="block">
                <div className="p-3 rounded-2xl bg-card/60 hover:bg-card border border-border hover:border-gold-500/30 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
                      <Barcode className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">Barcode Audit</div>
                      <div className="text-[10px] text-muted-foreground">Scan & verify physical stock</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-gold-500 transition-colors" />
                </div>
              </Link>

              <Link href="/procurement" className="block">
                <div className="p-3 rounded-2xl bg-card/60 hover:bg-card border border-border hover:border-gold-500/30 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                      <Truck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-foreground">Supplier Inbound Shipments</div>
                      <div className="text-[10px] text-muted-foreground">3 POs expected this week</div>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
