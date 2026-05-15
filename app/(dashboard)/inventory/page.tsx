"use client";

import { useState, useEffect } from "react";
import { 
  Box, 
  AlertTriangle, 
  TrendingUp, 
  Warehouse, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight,
  ArrowRight,
  History,
  Package,
  Layers,
  BarChart3,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

export default function InventoryDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Inventory <span className="text-injaazh-600">Control</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Precision stock management and supply chain visibility.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-2xl h-14 px-8 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm">
             Generate Report
          </Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-injaazh-600/20 active:scale-95 transition-all">
            <Plus className="w-5 h-5 mr-3" /> Add Product
          </Button>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <InventoryStatsCard icon={Box} label="Total SKU" value="4,280" subValue="+124 new this week" color="text-injaazh-600" bgColor="bg-injaazh-50 dark:bg-injaazh-900/20" />
        <InventoryStatsCard icon={AlertTriangle} label="Low Stock" value="12" subValue="8 critical items" color="text-rose-600" bgColor="bg-rose-50 dark:bg-rose-900/20" />
        <InventoryStatsCard icon={Warehouse} label="Warehouses" value="06" subValue="Across 3 regions" color="text-blue-600" bgColor="bg-blue-50 dark:bg-blue-900/20" />
        <InventoryStatsCard icon={TrendingUp} label="Stock Value" value="$1.8M" subValue="+5.2% from last month" color="text-emerald-600" bgColor="bg-emerald-50 dark:bg-emerald-900/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Stock Movements */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Recent Movements</h3>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time stock flow logs</p>
                </div>
                <Button variant="ghost" size="sm" className="text-xs font-black text-injaazh-600">VIEW ALL LOGS</Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                      <th className="pb-4">Product Details</th>
                      <th className="pb-4">Warehouse</th>
                      <th className="pb-4">Qty</th>
                      <th className="pb-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    <MovementRow name="Apple MacBook Pro M3" sku="HW-MBP-001" warehouse="Main HQ" qty="+25" status="Inward" color="text-emerald-500" />
                    <MovementRow name="Dell UltraSharp 32\" sku="HW-MON-012" warehouse="North Hub" qty="-10" status="Outward" color="text-rose-500" />
                    <MovementRow name="Logitech MX Master 3S" sku="HW-PER-055" warehouse="South Depot" qty="+100" status="Inward" color="text-emerald-500" />
                    <MovementRow name="Herman Miller Aeron" sku="FUR-CHR-009" warehouse="Main HQ" qty="-2" status="Outward" color="text-rose-500" />
                  </tbody>
                </table>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-injaazh-600 to-blue-700 rounded-[32px] p-8 text-white shadow-xl shadow-injaazh-600/20">
                 <BarChart3 className="w-8 h-8 mb-4 opacity-50" />
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Storage Capacity</h4>
                 <p className="text-3xl font-black mt-1">82% Full</p>
                 <div className="mt-6 w-full h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="w-[82%] h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
                 </div>
                 <p className="text-[10px] font-bold mt-4 opacity-80 uppercase tracking-widest">Global occupancy across all hubs</p>
              </div>
              <div className="bg-slate-900 dark:bg-slate-950 rounded-[32px] p-8 text-white border border-slate-800 shadow-sm relative overflow-hidden">
                 <div className="absolute -right-4 -top-4 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl" />
                 <AlertTriangle className="w-8 h-8 mb-4 text-rose-500" />
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Low Stock Alert</h4>
                 <p className="text-3xl font-black mt-1">12 Items</p>
                 <Link href="/inventory/products">
                    <Button variant="link" className="p-0 h-auto text-rose-500 text-[10px] font-black uppercase tracking-widest mt-4 hover:text-rose-400 group">
                       RESTOCK REQUIRED <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                 </Link>
              </div>
           </div>
        </div>

        {/* Sidebar - Quick Access & Warehouses */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Quick Navigation</h3>
              <div className="grid grid-cols-2 gap-3">
                 <NavCard icon={Package} label="Products" link="/inventory/products" />
                 <NavCard icon={Layers} label="Categories" link="/inventory/categories" />
                 <NavCard icon={Warehouse} label="Warehouses" link="/inventory/warehouses" />
                 <NavCard icon={History} label="Movement" link="/inventory/movements" />
              </div>
           </div>

           <div className="bg-slate-950 rounded-[32px] p-8 text-white shadow-2xl shadow-slate-950/20 relative overflow-hidden">
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-injaazh-600/10 rounded-full blur-3xl pointer-events-none" />
              <h3 className="text-xl font-black mb-6 relative z-10 text-white">Warehouse Distribution</h3>
              <div className="space-y-5 relative z-10">
                 <WarehouseBar label="Main HQ" value={65} color="bg-injaazh-500" />
                 <WarehouseBar label="North Hub" value={42} color="bg-blue-500" />
                 <WarehouseBar label="South Depot" value={88} color="bg-rose-500" />
              </div>
              <Link href="/inventory/warehouses">
                <Button className="w-full mt-8 h-12 rounded-2xl bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold transition-all active:scale-95">
                  Manage Warehouses
                </Button>
              </Link>
           </div>
        </div>
      </div>
    </div>
  );
}

function InventoryStatsCard({ icon: Icon, label, value, subValue, color, bgColor }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-500", bgColor)}>
          <Icon className={cn("w-7 h-7", color)} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className={cn("text-3xl font-black tracking-tight", color)}>{value}</p>
        </div>
      </div>
      <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-tight">
        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
        {subValue}
      </div>
    </div>
  );
}

function MovementRow({ name, sku, warehouse, qty, status, color }: any) {
  return (
    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
      <td className="py-5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-xs group-hover:bg-injaazh-600 group-hover:text-white transition-all">{name[0]}</div>
          <div>
            <p className="font-bold text-sm text-slate-900 dark:text-white leading-none mb-1">{name}</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">SKU: {sku}</p>
          </div>
        </div>
      </td>
      <td className="py-5 text-xs font-bold text-slate-500">{warehouse}</td>
      <td className={cn("py-5 text-sm font-black", color)}>{qty}</td>
      <td className="py-5 text-right">
        <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border", 
          status === "Inward" ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800" : "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800")}>
          {status}
        </span>
      </td>
    </tr>
  );
}

function NavCard({ icon: Icon, label, link }: any) {
  return (
    <Link href={link} className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-none transition-all group">
      <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 flex items-center justify-center mb-3 shadow-sm border border-slate-100 dark:border-slate-800 group-hover:scale-110 transition-transform">
        <Icon className="w-5 h-5 text-injaazh-600" />
      </div>
      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest group-hover:text-injaazh-600 transition-colors">{label}</span>
    </Link>
  );
}

function WarehouseBar({ label, value, color }: any) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-1000", color)} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
