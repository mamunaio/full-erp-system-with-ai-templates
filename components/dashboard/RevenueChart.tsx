"use client";

import { useState } from "react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";

interface DataPoint {
  month: string;
  revenue: number;
  expense: number;
}

const ranges = ["7D", "1M", "3M", "1Y"];

export default function RevenueChart({ data }: { data: DataPoint[] }) {
  const [activeRange, setActiveRange] = useState("1Y");

  return (
    <div className="glass rounded-3xl border border-border/80 p-5 sm:p-6 relative overflow-hidden hover:border-gold-500/30 transition-all duration-300 shadow-xl space-y-4">
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-500/10 blur-[80px] pointer-events-none" />

      <div className="relative z-10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">
                Revenue & Expenditure Matrix
              </h3>
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                +14.2% Net Margin
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">
              Consolidated enterprise cashflow trajectory
            </p>
          </div>

          <div className="flex items-center gap-1 bg-card/60 rounded-xl p-1 border border-border self-start sm:self-auto shadow-inner">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRange(r)}
                className={cn(
                  "text-xs font-bold px-3 py-1 rounded-lg transition-all duration-200 cursor-pointer",
                  activeRange === r
                    ? "gold-gradient text-obsidian-900 shadow-sm font-extrabold"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-gold-500 shadow-sm shadow-gold-500/50" />
            <span className="text-foreground font-semibold">Gross Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-rose-500" />
            <span className="text-muted-foreground font-medium">Operating Expenses</span>
          </div>
        </div>

        <div className="h-[280px] w-full pt-2 min-h-[280px]">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="dashboardGoldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4A853" stopOpacity={0.4} />
                  <stop offset="60%" stopColor="#D4A853" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#D4A853" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontWeight: 600 }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontWeight: 600 }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card) / 0.95)',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '16px',
                  fontSize: '12px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  color: 'hsl(var(--foreground))'
                }}
                labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 700 }}
                formatter={(value: any) => [`$${Number(value).toLocaleString()}`, ""]}
              />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#D4A853" strokeWidth={2.5} fillOpacity={1} fill="url(#dashboardGoldGradient)" />
              <Area type="monotone" dataKey="expense" name="Expense" stroke="#F43F5E" strokeWidth={2} fill="none" strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
