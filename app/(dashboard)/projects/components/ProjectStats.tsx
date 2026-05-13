"use client";

import StatsCard from "@/components/dashboard/StatsCard";

export default function ProjectStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatsCard 
        title="Total Projects" 
        value="24" 
        change="+3" 
        trend="up" 
        data={[{value: 18}, {value: 21}, {value: 24}]} 
        color="#0d8ee9"
      />
      <StatsCard 
        title="Active Tasks" 
        value="142" 
        change="+12" 
        trend="up" 
        data={[{value: 120}, {value: 130}, {value: 142}]} 
        color="#8b5cf6"
      />
      <StatsCard 
        title="Budget Utilization" 
        value="68%" 
        change="+5%" 
        trend="up" 
        data={[{value: 60}, {value: 63}, {value: 68}]} 
        color="#f59e0b"
      />
      <StatsCard 
        title="Overdue Tasks" 
        value="8" 
        change="-2" 
        trend="down" 
        data={[{value: 12}, {value: 10}, {value: 8}]} 
        color="#f43f5e"
      />
    </div>
  );
}
