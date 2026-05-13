"use client";

import { 
  MoreHorizontal, Edit, Eye, Trash2, 
  AlertTriangle, Package, DollarSign 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const products = [
  { id: "1", sku: "SKU-001", name: "Cisco Switch 24P", category: "Networking", stock: 12, minStock: 5, salePrice: 450, unit: "pcs" },
  { id: "2", sku: "SKU-002", name: "Dell Latitude 5420", category: "Laptops", stock: 2, minStock: 5, salePrice: 1200, unit: "pcs" },
  { id: "3", sku: "SKU-003", name: "Cat6 Ethernet Cable", category: "Cables", stock: 450, minStock: 100, salePrice: 0.5, unit: "meters" },
];

export default function ProductTable() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <th className="p-4 border-b dark:border-slate-800">Product</th>
              <th className="p-4 border-b dark:border-slate-800">Category</th>
              <th className="p-4 border-b dark:border-slate-800">Price</th>
              <th className="p-4 border-b dark:border-slate-800 text-center">Stock</th>
              <th className="p-4 border-b dark:border-slate-800">Status</th>
              <th className="p-4 border-b dark:border-slate-800 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{p.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono">{p.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">{p.category}</td>
                <td className="p-4">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">${p.salePrice}</div>
                  <div className="text-[10px] text-slate-400">per {p.unit}</div>
                </td>
                <td className="p-4 text-center font-bold">
                  <span className={cn(
                    p.stock <= p.minStock ? "text-rose-500" : "text-emerald-500"
                  )}>
                    {p.stock}
                  </span>
                </td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    p.stock <= 0 ? "bg-slate-100 text-slate-500" :
                    p.stock <= p.minStock ? "bg-rose-100 text-rose-600" : "bg-emerald-100 text-emerald-600"
                  )}>
                    {p.stock <= 0 ? "Out of Stock" : p.stock <= p.minStock ? "Low Stock" : "In Stock"}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-injaazh-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-blue-600">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
