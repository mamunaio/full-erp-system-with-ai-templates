"use client";

import { AlertTriangle, ExternalLink } from "lucide-react";
import Link from "next/link";

interface LowStockItem {
  id: string;
  name: string;
  sku: string;
  stock: number;
  min: number;
}

export default function LowStockAlert({ data }: { data: LowStockItem[] }) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-500/15 flex items-center justify-center">
            <AlertTriangle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <h3 className="text-sm font-semibold text-card-foreground">Low Stock</h3>
        </div>
        <p className="text-xs text-muted-foreground py-3">All stock levels are healthy.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-500/15 flex items-center justify-center">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          </div>
          <h3 className="text-sm font-semibold text-card-foreground">Low Stock</h3>
        </div>
        <span className="text-[10px] text-muted-foreground bg-secondary px-2 py-0.5 rounded-full font-medium">{data.length} items</span>
      </div>

      <div className="space-y-1">
        {data.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2.5 px-3 -mx-3 rounded-xl hover:bg-accent/50 transition-all group">
            <div className="min-w-0">
              <p className="text-sm font-medium text-card-foreground truncate">{item.name}</p>
              <p className="text-[10px] text-muted-foreground font-medium">{item.sku}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-amber-600 dark:text-amber-400 tabular-nums">{item.stock}</p>
                <p className="text-[9px] text-muted-foreground">min: {item.min}</p>
              </div>
              <Link href={`/inventory/products`} className="text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100">
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
