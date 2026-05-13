"use client";

import { Package, MoreVertical, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const products = [
  { id: "1", sku: "SKU-001", name: "Cisco Switch 24P", category: "Networking", stock: 12, minStock: 5, salePrice: 450 },
  { id: "2", sku: "SKU-002", name: "Dell Latitude 5420", category: "Laptops", stock: 2, minStock: 5, salePrice: 1200 },
  { id: "3", sku: "SKU-003", name: "Cat6 Ethernet Cable", category: "Cables", stock: 450, minStock: 100, salePrice: 0.5 },
  { id: "4", sku: "SKU-004", name: "HP LaserJet Pro", category: "Printers", stock: 0, minStock: 3, salePrice: 350 },
];

export default function ProductGrid() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <div key={p.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-slate-400 font-mono uppercase">{p.sku}</span>
            <button className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
          
          <div className="w-full aspect-square rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-500">
            <Package className="w-12 h-12 text-slate-200 dark:text-slate-800" />
            {p.stock <= p.minStock && (
              <div className="absolute top-16 right-4 bg-rose-500 text-white p-1.5 rounded-full shadow-lg">
                <AlertCircle className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white line-clamp-1">{p.name}</h3>
            <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{p.category}</p>
          </div>

          <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
            <div className="text-lg font-black text-injaazh-600">${p.salePrice}</div>
            <div className={cn(
              "text-xs font-bold px-2 py-1 rounded-lg",
              p.stock <= 0 ? "text-slate-400 bg-slate-50" :
              p.stock <= p.minStock ? "text-rose-600 bg-rose-50" : "text-emerald-600 bg-emerald-50"
            )}>
              {p.stock} in stock
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
