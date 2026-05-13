"use client";

import StatsCard from "@/components/dashboard/StatsCard";

export default function FinanceStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
      <StatsCard 
        title="Total Revenue" 
        value="$84,230" 
        change="+18%" 
        trend="up" 
        data={[{value: 70000}, {value: 78000}, {value: 84230}]} 
        color="#0d8ee9"
      />
      <StatsCard 
        title="Total Expenses" 
        value="$42,150" 
        change="+5%" 
        trend="up" 
        data={[{value: 38000}, {value: 40000}, {value: 42150}]} 
        color="#f43f5e"
      />
      <StatsCard 
        title="Net Profit" 
        value="$42,080" 
        change="+22%" 
        trend="up" 
        data={[{value: 32000}, {value: 38000}, {value: 42080}]} 
        color="#10b981"
      />
      <StatsCard 
        title="Accounts Receivable" 
        value="$12,450" 
        change="-5%" 
        trend="down" 
        data={[{value: 15000}, {value: 13500}, {value: 12450}]} 
        color="#8b5cf6"
      />
      <StatsCard 
        title="Accounts Payable" 
        value="$5,300" 
        change="+10%" 
        trend="up" 
        data={[{value: 4500}, {value: 5000}, {value: 5300}]} 
        color="#f59e0b"
      />
      <StatsCard 
        title="Cash Balance" 
        value="$128,900" 
        change="+12%" 
        trend="up" 
        data={[{value: 110000}, {value: 120000}, {value: 128900}]} 
        color="#0d8ee9"
      />
    </div>
  );
}
