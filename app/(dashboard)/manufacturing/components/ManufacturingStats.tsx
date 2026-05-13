"use client";

import StatsCard from "@/components/dashboard/StatsCard";

export default function ManufacturingStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatsCard 
        title="Active Work Orders" 
        value="12" 
        change="+2" 
        trend="up" 
        data={[{value: 8}, {value: 10}, {value: 12}]} 
        color="#0d8ee9"
      />
      <StatsCard 
        title="Completed (Month)" 
        value="45" 
        change="+15%" 
        trend="up" 
        data={[{value: 30}, {value: 38}, {value: 45}]} 
        color="#10b981"
      />
      <StatsCard 
        title="Efficiency" 
        value="94.2%" 
        change="+1.5%" 
        trend="up" 
        data={[{value: 92}, {value: 93}, {value: 94.2}]} 
        color="#8b5cf6"
      />
      <StatsCard 
        title="Material Alerts" 
        value="3" 
        change="Critical" 
        trend="down" 
        data={[{value: 5}, {value: 4}, {value: 3}]} 
        color="#f43f5e"
      />
    </div>
  );
}
