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

  const filteredData = data;

  return (
    <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 relative overflow-hidden hover:border-gold-500/20 transition-all duration-300">
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gold-500/5 blur-[60px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-card-foreground font-heading">Revenue Trend</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Monthly performance overview</p>
          </div>
          <div className="flex items-center gap-1 bg-card/40 rounded-lg p-0.5 border border-border/50">
            {ranges.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRange(r)}
                className={cn(
                  "text-[11px] font-semibold px-3 py-1.5 rounded-md transition-all duration-200",
                  activeRange === r
                    ? "bg-gold-500/20 text-gold-400 shadow-sm"
                    : "text-muted-foreground hover:text-gold-400/60"
                )}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-gold-500" />
            <span className="text-[11px] text-muted-foreground font-medium">Revenue</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-rose-400" />
            <span className="text-[11px] text-muted-foreground font-medium">Expense</span>
          </div>
        </div>

        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c9952e" stopOpacity={0.3} />
                  <stop offset="50%" stopColor="#c9952e" stopOpacity={0.1} />
                  <stop offset="100%" stopColor="#c9952e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-border/50" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }} dy={8} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))', fontWeight: 500 }} tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card) / 0.95)',
                  border: '1px solid hsl(var(--border) / 0.5)',
                  borderRadius: '12px',
                  fontSize: '12px',
                  backdropFilter: 'blur(20px)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                }}
                labelStyle={{ color: 'hsl(var(--muted-foreground))', fontWeight: 600 }}
                itemStyle={{ color: 'hsl(var(--card-foreground))', fontWeight: 500 }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#c9952e" strokeWidth={2.5} fillOpacity={1} fill="url(#goldGradient)" />
              <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={2} fill="none" strokeDasharray="6 4" strokeOpacity={0.7} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
