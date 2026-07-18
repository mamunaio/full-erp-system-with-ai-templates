"use client";

import { useEffect, useState } from "react";
import { ResponsiveContainer, AreaChart, Area } from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
  sparkline: number[];
}

export default function KPICard({ title, value, change, trend, icon: Icon, sparkline }: KPICardProps) {
  const numericValue = parseFloat(value.replace(/[^0-9.-]/g, ""));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const startTime = performance.now();

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (numericValue - start) * eased;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [numericValue]);

  const formattedValue = value.startsWith("$")
    ? `$${Math.round(displayValue).toLocaleString()}`
    : Number.isInteger(numericValue)
      ? Math.round(displayValue).toString()
      : displayValue.toFixed(1);

  return (
    <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 relative overflow-hidden group hover:border-gold-500/20 hover:-translate-y-0.5 transition-all duration-300">
      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gold-500/5 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center shadow-lg">
            <Icon className="w-5 h-5 text-gold-400" />
          </div>
          <div className={cn(
            "flex items-center gap-1 text-[11px] font-bold px-2.5 py-1 rounded-full",
            trend === "up"
              ? "text-emerald-400 bg-emerald-500/15"
              : "text-rose-400 bg-rose-500/15"
          )}>
            {trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {change}
          </div>
        </div>

        <div className="mb-4">
          <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold mb-1">{title}</p>
          <p className="text-2xl font-bold text-gold-400 font-heading tabular-nums tracking-tight">{formattedValue}</p>
        </div>

        <div className="h-[40px] -mb-1">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkline.map((v, i) => ({ v, i }))}>
              <defs>
                <linearGradient id={`sparkGrad-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c9952e" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="#c9952e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke="#c9952e" strokeWidth={1.5} fill={`url(#sparkGrad-${title})`} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
