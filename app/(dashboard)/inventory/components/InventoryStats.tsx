"use client";

import StatsCard from "@/components/dashboard/StatsCard";

export default function InventoryStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatsCard 
        title="Total Products" 
        value="1,240" 
        change="+5%" 
        trend="up" 
        data={[{value: 1100}, {value: 1180}, {value: 1240}]} 
        color="#0d8ee9"
      />
      <StatsCard 
        title="Low Stock Items" 
        value="24" 
        change="-12%" 
        trend="down" 
        data={[{value: 32}, {value: 28}, {value: 24}]} 
        color="#f43f5e"
      />
      <StatsCard 
        title="Out of Stock" 
        value="8" 
        change="+2%" 
        trend="up" 
        data={[{value: 6}, {value: 7}, {value: 8}]} 
        color="#64748b"
      />
      <StatsCard 
        title="Inventory Value" 
        value="$124,500" 
        change="+15%" 
        trend="up" 
        data={[{value: 100000}, {value: 115000}, {value: 124500}]} 
        color="#10b981"
      />
    </div>
  );
}
