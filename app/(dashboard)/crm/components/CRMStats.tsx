"use client";

import StatsCard from "@/components/dashboard/StatsCard";

export default function CRMStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatsCard 
        title="Total Contacts" 
        value="2,450" 
        change="+8%" 
        trend="up" 
        data={[{value: 2200}, {value: 2350}, {value: 2450}]} 
        color="#0d8ee9"
      />
      <StatsCard 
        title="Active Leads" 
        value="124" 
        change="+15%" 
        trend="up" 
        data={[{value: 100}, {value: 110}, {value: 124}]} 
        color="#8b5cf6"
      />
      <StatsCard 
        title="Deals Won" 
        value="42" 
        change="+5%" 
        trend="up" 
        data={[{value: 38}, {value: 40}, {value: 42}]} 
        color="#10b981"
      />
      <StatsCard 
        title="Pipeline Value" 
        value="$540,200" 
        change="+12%" 
        trend="up" 
        data={[{value: 480000}, {value: 510000}, {value: 540200}]} 
        color="#f59e0b"
      />
    </div>
  );
}
