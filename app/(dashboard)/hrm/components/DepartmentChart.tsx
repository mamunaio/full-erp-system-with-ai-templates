"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "Engineering", value: 45, color: "#c9952e" },
  { name: "Operations", value: 30, color: "#d4a853" },
  { name: "HR & Admin", value: 10, color: "#e8c97a" },
  { name: "Finance", value: 15, color: "#b8862d" },
];

export default function DepartmentChart() {
  return (
    <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
      <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Department Distribution</h3>
      <div className="h-[220px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--card) / 0.95)",
                backdropFilter: "blur(20px)",
                color: "hsl(var(--foreground))",
                fontSize: "13px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center text-xs">
            <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }} />
            <span className="text-muted-foreground font-medium">{item.name} ({item.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
