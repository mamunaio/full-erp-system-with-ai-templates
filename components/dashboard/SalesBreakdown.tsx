"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { useTheme } from "next-themes";

interface CategoryData {
  name: string;
  value: number;
}

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"];

export default function SalesBreakdown({ data }: { data: CategoryData[] }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden">
      <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-violet-500/5 blur-[40px] pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-card-foreground">Sales by Category</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Stock distribution across lines</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {data.map((_, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: isDark ? 'rgba(18,18,24,0.95)' : 'rgba(255,255,255,0.95)',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`,
                    borderRadius: '12px',
                    fontSize: '12px',
                    backdropFilter: 'blur(20px)',
                  }}
                  formatter={(value: number) => [`${value} units`, ""]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-3xl font-bold text-card-foreground tabular-nums">{total.toLocaleString()}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium mt-0.5">Total Units</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full mt-4">
            {data.map((item, i) => (
              <div key={item.name} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-secondary/50 border border-border/50">
                <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-[11px] text-muted-foreground truncate font-medium">{item.name}</span>
                <span className="text-[11px] text-card-foreground font-bold ml-auto">{total > 0 ? ((item.value / total) * 100).toFixed(0) : 0}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
