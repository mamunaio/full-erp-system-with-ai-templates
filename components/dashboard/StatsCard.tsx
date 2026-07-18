"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { ResponsiveContainer, LineChart, Line } from "recharts";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  data: { value: number }[];
  color?: string;
}

export default function StatsCard({ title, value, change, trend, data, color = "#0d8ee9" }: StatsCardProps) {
  return (
    <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-slate-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
        {trend === "up" ? (
          <div className="flex items-center text-emerald-500 text-xs font-bold">
            <ArrowUpRight className="w-3 h-3 mr-1" /> {change}
          </div>
        ) : (
          <div className="flex items-center text-rose-500 text-xs font-bold">
            <ArrowDownRight className="w-3 h-3 mr-1" /> {change}
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        <div className="px-6 pb-2">
          <div className="text-2xl font-bold">{value}</div>
        </div>
        <div className="h-[60px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
