"use client";

import { 
  Users, UserCheck, UserMinus, CalendarDays 
} from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";

export default function HRMStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <StatsCard 
        title="Total Employees" 
        value="156" 
        change="+12%" 
        trend="up" 
        data={[{value: 140}, {value: 145}, {value: 156}]} 
        color="#0d8ee9"
      />
      <StatsCard 
        title="Active" 
        value="142" 
        change="+2%" 
        trend="up" 
        data={[{value: 138}, {value: 140}, {value: 142}]} 
        color="#10b981"
      />
      <StatsCard 
        title="On Leave Today" 
        value="8" 
        change="-15%" 
        trend="down" 
        data={[{value: 12}, {value: 10}, {value: 8}]} 
        color="#f59e0b"
      />
      <StatsCard 
        title="New This Month" 
        value="5" 
        change="+25%" 
        trend="up" 
        data={[{value: 2}, {value: 4}, {value: 5}]} 
        color="#8b5cf6"
      />
    </div>
  );
}
