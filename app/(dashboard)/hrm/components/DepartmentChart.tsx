"use client";

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const data = [
  { name: "IT", value: 45, color: "#0d8ee9" },
  { name: "HR", value: 12, color: "#10b981" },
  { name: "Sales", value: 25, color: "#8b5cf6" },
  { name: "Marketing", value: 18, color: "#f43f5e" },
];

export default function DepartmentChart() {
  return (
    <div className="h-[300px] flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center text-xs">
            <div className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: item.color }} />
            <span className="text-slate-500 font-medium">{item.name} ({item.value}%)</span>
          </div>
        ))}
      </div>
    </div>
  );
}
