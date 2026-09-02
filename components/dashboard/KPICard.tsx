"use client";

import { useEffect, useState, useId } from "react";
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
  const uniqueId = useId().replace(/:/g, "_");
  const safeGradId = `sparkGrad_${title.replace(/[^a-zA-Z0-9]/g, "_")}_${uniqueId}`;

  // Extract prefix (e.g. "$"), suffix (e.g. "%" or " Staff"), and numeric value
  const prefix = value.match(/^[^\d]*/)?.[0] || "";
  const suffix = value.match(/[^\d.,]*$/)?.[0] || "";
  const numericStr = value.replace(/^[^\d]*/, "").replace(/[^\d.,]*$/, "").replace(/,/g, "");
  const numericValue = parseFloat(numericStr) || 0;
  const hasDecimals = numericStr.includes(".");

  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 700;
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

  const formattedNumber = hasDecimals
    ? displayValue.toFixed(1)
    : Math.round(displayValue).toLocaleString();

  const formattedValue = `${prefix}${formattedNumber}${suffix}`;

  return (
    <div className="glass rounded-2xl p-5 relative overflow-hidden group hover:border-gold-500/40 hover:-translate-y-0.5 transition-all duration-300 shadow-md">
      <div className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-gold-500/10 blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 flex items-center justify-center shadow-sm">
            <Icon className="w-5 h-5" />
          </div>
          <div className={cn(
            "flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full border",
            trend === "up"
              ? "text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
              : "text-rose-600 dark:text-rose-400 bg-rose-500/10 border-rose-500/20"
          )}>
            {trend === "up" ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {change}
          </div>
        </div>

        <div className="mb-2">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold mb-1">{title}</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading tabular-nums tracking-tight">
            {formattedValue}
          </p>
        </div>

        <div className="h-[44px] -mx-2 -mb-2 mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={sparkline.map((v, i) => ({ v, i }))} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
              <defs>
                <linearGradient id={safeGradId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#D4A853" stopOpacity={0.4} />
                  <stop offset="60%" stopColor="#D4A853" stopOpacity={0.12} />
                  <stop offset="100%" stopColor="#D4A853" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <Area 
                type="monotone" 
                dataKey="v" 
                stroke="#D4A853" 
                strokeWidth={2} 
                fill={`url(#${safeGradId})`} 
                dot={false} 
                isAnimationActive={true}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
