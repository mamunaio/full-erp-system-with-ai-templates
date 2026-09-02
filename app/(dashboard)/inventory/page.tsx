"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, Warehouse, AlertTriangle, ArrowDownLeft, 
  ArrowUpRight, RefreshCcw, Plus, Search, Filter, 
  Sparkles, DollarSign, Layers, CheckCircle2, ShoppingCart,
  ArrowRight, ChevronRight, Barcode, Truck, FileSpreadsheet,
  Building2, ShieldCheck, Box
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MovementLog from "./components/MovementLog";
import WarehouseCard from "./components/WarehouseCard";

const warehouses = [
  { id: "w1", name: "Central HQ Mega-Hub", location: "Dhaka Central Logistics Park", capacity: 84, used: "12,600 / 15,000 m³", items: "2,450 SKUs", temp: "21°C • Ambient", status: "Optimal", manager: "Farhan Ahmed" },
  { id: "w2", name: "Chittagong Port Logistics Hub", location: "Chittagong Port Free Trade Zone", capacity: 62, used: "18,600 / 30,000 m³", items: "1,280 SKUs", temp: "18°C • Chilled", status: "Active", manager: "Kamal Hossain" },
  { id: "w3", name: "Regional Transit Depot", location: "Gazipur Industrial Depot", capacity: 38, used: "3,800 / 10,000 m³", items: "550 SKUs", temp: "Ambient", status: "Available", manager: "Tariqul Islam" },
];

const lowStockItems = [
  { id: "ls1", name: "Apple MacBook Pro 16\" M3 Max", sku: "HW-MBP-001", stock: 2, min: 10, supplier: "Apple Authorized Dist.", cost: "$2,850", reorderQty: 15 },
  { id: "ls2", name: "Dell UltraSharp 32\" 4K Monitor", sku: "HW-MON-012", stock: 5, min: 15, supplier: "Dell Commercial Supply", cost: "$680", reorderQty: 20 },
  { id: "ls3", name: "Logitech MX Master 3S Wireless", sku: "HW-PER-055", stock: 8, min: 25, supplier: "Logitech Global Direct", cost: "$85", reorderQty: 50 },
  { id: "ls4", name: "Herman Miller Aeron Ergonomic Chair", sku: "FUR-CHR-009", stock: 3, min: 10, supplier: "Herman Miller Office Tech", cost: "$1,150", reorderQty: 12 },
];

export default function InventoryDashboard() {
  const [orderedItems, setOrderedItems] = useState<string[]>([]);
  const [isExporting, setIsExporting] = useState(false);

  const handleReorder = (item: typeof lowStockItems[0]) => {
    setOrderedItems((prev) => [...prev, item.id]);
    toast.success(`Purchase Order dispatched for ${item.reorderQty} units of ${item.name} ($${(item.reorderQty * parseInt(item.cost.replace(/[^0-9]/g, ''))).toLocaleString()}) to ${item.supplier}!`);
  };

  const handleReorderAll = () => {
    setOrderedItems(lowStockItems.map((i) => i.id));
    toast.success("Dispatched 4 consolidated Purchase Orders ($86,300) to tier-1 suppliers!");
  };

  const handleExportStock = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Warehouse Inventory Ledger exported to CSV & PDF!");
    }, 1000);
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
              <span className="text-[11px] font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-widest bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                Asset & Warehouse Logistics
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
              Inventory & <span className="gold-text">Supply Matrix</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
              Multi-warehouse spatial capacity tracking, automated low-stock PO replenishment, and real-time movement audits.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleExportStock}
              disabled={isExporting}
              variant="outline"
              className="rounded-2xl h-11 sm:h-12 px-4 border-border bg-card/60 font-bold text-xs hover:bg-accent"
            >
              <FileSpreadsheet className="w-4 h-4 mr-1.5 text-emerald-500" />
              <span>{isExporting ? "Exporting..." : "Export Ledger"}</span>
            </Button>
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
          <div className="bg-card/50 p-4 rounded-2xl border border-border space-y-1">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
              <span>Total Stock Valuation</span>
              <DollarSign className="w-3.5 h-3.5 text-gold-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">$1,840,500</div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border space-y-1">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
              <span>Low-Stock Alerts</span>
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-heading">
              4 SKUs <span className="text-xs text-muted-foreground font-sans font-medium">Need PO</span>
            </div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border space-y-1">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
              <span>Active Warehouses</span>
              <Warehouse className="w-3.5 h-3.5 text-purple-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">3 Hubs</div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border space-y-1">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground font-semibold">
              <span>Annual Stock Turnover</span>
              <RefreshCcw className="w-3.5 h-3.5 text-emerald-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-heading">8.4x / yr</div>
          </div>
        </div>
      </div>

      {/* Warehouse Spatial Capacity Heatmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
              Multi-Warehouse Spatial Capacity & Temperature
            </h3>
            <p className="text-xs text-muted-foreground">Volumetric storage allocation and live environmental monitoring</p>
          </div>
          <Link href="/inventory/warehouses">
            <Button variant="ghost" size="sm" className="text-xs font-bold text-gold-600 dark:text-gold-400 hover:text-foreground">
              Manage Hubs <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {warehouses.map((wh) => (
            <div key={wh.id} className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-md space-y-4 hover:border-gold-500/30 transition-all">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                    {wh.status}
                  </span>
                  <h4 className="text-base font-bold text-foreground font-heading pt-1">{wh.name}</h4>
                  <p className="text-xs text-muted-foreground">{wh.location}</p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-extrabold gold-text font-heading">{wh.capacity}%</div>
                  <span className="text-[10px] text-muted-foreground font-semibold">Capacity</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-accent h-2 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    wh.capacity > 80 ? "bg-amber-500" : wh.capacity > 50 ? "gold-gradient" : "bg-emerald-500"
                  }`}
                  style={{ width: `${wh.capacity}%` }}
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/40 text-xs">
                <div>
                  <div className="text-[10px] text-muted-foreground">Volumetric Usage</div>
                  <div className="font-bold text-foreground">{wh.used}</div>
                </div>
                <div>
                  <div className="text-[10px] text-muted-foreground">Catalog Depth</div>
                  <div className="font-bold text-foreground">{wh.items}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border/40 text-[11px] text-muted-foreground">
                <span>Temp: {wh.temp}</span>
                <span className="text-foreground font-semibold">Lead: {wh.manager}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Critical Low-Stock Replenishment Center */}
      <div className="glass rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">Critical Low-Stock Replenishment Hub</h3>
              <p className="text-xs text-muted-foreground">Items with inventory levels below emergency buffer safety thresholds</p>
            </div>
          </div>

          <Button 
            onClick={handleReorderAll}
            className="gold-gradient text-obsidian-900 font-extrabold text-xs rounded-2xl h-11 px-6 shadow-md shadow-gold-500/20 hover:opacity-90"
          >
            <ShoppingCart className="w-4 h-4 mr-1.5" /> Auto-Replenish All 4 SKUs ($86.3K)
          </Button>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-card/50 text-muted-foreground font-extrabold uppercase tracking-wider text-[10px] border-b border-border/60">
                <th className="p-4">SKU Code & Product</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Safety Buffer</th>
                <th className="p-4">Supplier Partner</th>
                <th className="p-4">Unit Cost</th>
                <th className="p-4 text-right">Quick Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {lowStockItems.map((item) => {
                const isOrdered = orderedItems.includes(item.id);

                return (
                  <tr key={item.id} className="hover:bg-accent/40 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-foreground text-sm">{item.name}</div>
                      <div className="text-[10px] font-mono text-muted-foreground">{item.sku}</div>
                    </td>
                    <td className="p-4">
                      <span className="font-extrabold text-rose-500 bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20 text-xs">
                        {item.stock} Units Left
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground font-semibold">Min {item.min} Units</td>
                    <td className="p-4 text-foreground font-medium">{item.supplier}</td>
                    <td className="p-4 font-bold text-foreground">{item.cost}</td>
                    <td className="p-4 text-right">
                      <Button
                        size="sm"
                        disabled={isOrdered}
                        onClick={() => handleReorder(item)}
                        className={`rounded-xl text-xs font-bold h-9 px-4 ${
                          isOrdered
                            ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 cursor-default"
                            : "gold-gradient text-obsidian-900 shadow-sm hover:opacity-90"
                        }`}
                      >
                        {isOrdered ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> PO Sent ({item.reorderQty})
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5 mr-1" /> Order {item.reorderQty} Units
                          </>
                        )}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-time Movement & Audit Stream */}
      <MovementLog />
    </div>
  );
}
