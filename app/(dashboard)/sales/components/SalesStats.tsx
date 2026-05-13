"use client";

import StatsCard from "@/components/dashboard/StatsCard";

export default function SalesStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatsCard 
        title="Sales Revenue" 
        value="$124,500" 
        change="+12%" 
        trend="up" 
        data={[{value: 100000}, {value: 115000}, {value: 124500}]} 
        color="#0d8ee9"
      />
      <StatsCard 
        title="Open Quotations" 
        value="42" 
        change="+5%" 
        trend="up" 
        data={[{value: 38}, {value: 40}, {value: 42}]} 
        color="#8b5cf6"
      />
      <StatsCard 
        title="Orders to Ship" 
        value="15" 
        change="-2%" 
        trend="down" 
        data={[{value: 18}, {value: 16}, {value: 15}]} 
        color="#f59e0b"
      />
      <StatsCard 
        title="Conversion Rate" 
        value="68%" 
        change="+3%" 
        trend="up" 
        data={[{value: 65}, {value: 66}, {value: 68}]} 
        color="#10b981"
      />
    </div>
  );
}
