"use client";

import StatsCard from "@/components/dashboard/StatsCard";
import AIInsightBanner from "@/components/dashboard/AIInsightBanner";
import AICommandBar from "@/components/dashboard/AICommandBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  CartesianGrid, Tooltip, AreaChart, Area, PieChart, Pie, Cell 
} from "recharts";
import { 
  AlertCircle, ArrowRight, CheckCircle2, Clock, 
  Package, ShoppingCart, UserCheck, Wallet 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock Data
const kpiData = [
  { value: 400 }, { value: 600 }, { value: 500 }, { value: 800 }, 
  { value: 700 }, { value: 900 }, { value: 1100 }
];

const revenueData = [
  { month: "Jan", revenue: 4500, expense: 3200 },
  { month: "Feb", revenue: 5200, expense: 3400 },
  { month: "Mar", revenue: 4800, expense: 3100 },
  { month: "Apr", revenue: 6100, expense: 4200 },
  { month: "May", revenue: 5900, expense: 3900 },
  { month: "Jun", revenue: 7200, expense: 4500 },
];

const categoryData = [
  { name: "Hardware", value: 400, color: "#0d8ee9" },
  { name: "Software", value: 300, color: "#37a8f7" },
  { month: "Services", value: 300, color: "#bae0fd" },
  { month: "Others", value: 200, color: "#e0effe" },
];

import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("/api/dashboard/stats");
        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Business Overview
        </h1>
        <p className="text-slate-500">
          Welcome back! Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      {/* AI Command Bar */}
      <AICommandBar />

      {/* KPI Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Revenue" 
          value={loading ? "..." : `$${stats?.revenue?.value?.toLocaleString() || '0'}`} 
          change={stats?.revenue?.change || "+0%"} 
          trend="up" 
          data={kpiData} 
          color="#0d8ee9"
        />
        <StatsCard 
          title="Total Expenses" 
          value="$0" 
          change="0%" 
          trend="down" 
          data={kpiData.map(d => ({ value: 1200 - d.value }))} 
          color="#f43f5e"
        />
        <StatsCard 
          title="Active Employees" 
          value={loading ? "..." : stats?.employees?.value?.toString() || '0'} 
          change={stats?.employees?.change || "+0"} 
          trend="up" 
          data={kpiData.slice(0, 5)} 
          color="#10b981"
        />
        <StatsCard 
          title="Open Leads" 
          value={loading ? "..." : stats?.leads?.value?.toString() || '0'} 
          change={stats?.leads?.change || "0%"} 
          trend="up" 
          data={kpiData} 
          color="#8b5cf6"
        />
      </div>

      {/* AI Insight Banner */}
      <AIInsightBanner />

      {/* Charts Row */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-md bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Revenue vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0d8ee9" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0d8ee9" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#0d8ee9" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                  <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={3} fill="none" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-md bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4 mt-4 w-full px-4">
                {categoryData.map((item) => (
                  <div key={item.name} className="flex items-center text-xs">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-500 font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity & Alerts Row */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Recent Transactions */}
        <Card className="lg:col-span-2 border-none shadow-md bg-white dark:bg-slate-900">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-bold">Recent Transactions</CardTitle>
            <Button variant="ghost" size="sm" className="text-injaazh-600">View All</Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center h-40 text-slate-400">Loading...</div>
              ) : stats?.transactions?.length > 0 ? (
                stats.transactions.map((i: any) => (
                  <div key={i.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                        <ShoppingCart className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{i.title}</p>
                        <p className="text-[10px] text-slate-500">{new Date(i.date).toLocaleDateString()} • {i.contact}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-emerald-600">
                        +${i.amount.toLocaleString()}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{i.status}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                  <Clock className="w-8 h-8 mb-2 opacity-20" />
                  <p className="text-sm">No recent transactions</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="border-none shadow-md bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center text-rose-500">
              <AlertCircle className="w-5 h-5 mr-2" /> Low Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {loading ? (
                <div className="flex items-center justify-center h-40 text-slate-400">Loading...</div>
              ) : stats?.lowStock?.length > 0 ? (
                stats.lowStock.map((item: any) => (
                  <div key={item.name} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-400">
                        {item.img}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{item.name}</p>
                        <p className="text-[10px] text-slate-500">Min Stock: {item.min}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-rose-600">{item.stock}</p>
                      <p className="text-[10px] text-slate-400">Available</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-slate-400">
                  <CheckCircle2 className="w-8 h-8 mb-2 text-emerald-500/20" />
                  <p className="text-sm">Stock levels are healthy</p>
                </div>
              )}
            </div>
            <Button className="w-full mt-6 bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-slate-800 dark:text-white border-none">
              Reorder All
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="border-none shadow-md bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center">
              <Clock className="w-5 h-5 mr-2 text-injaazh-600" /> My Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["Review Q2 Financials", "Setup AI Automations", "Client Meeting"].map((task, i) => (
                <div key={task} className="flex items-center space-x-3 group cursor-pointer">
                  <div className="w-5 h-5 rounded border border-slate-300 dark:border-slate-700 group-hover:border-injaazh-500 transition-colors shrink-0" />
                  <span className="text-sm text-slate-700 dark:text-slate-300 group-hover:text-injaazh-600 transition-colors">{task}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold flex items-center">
              <CheckCircle2 className="w-5 h-5 mr-2 text-emerald-500" /> Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Leave Request", user: "Sarah Ahmed", date: "May 15-17" },
                { type: "Purchase Order", user: "Vendor X", amount: "$1,200" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold">
                      {item.user[0]}
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{item.type}</p>
                      <p className="text-[10px] text-slate-500">{item.user}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="h-7 px-3 text-[10px]">Review</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md bg-white dark:bg-slate-900 overflow-hidden relative">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Injaazh AI Pulse</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-slate-500 italic">
                &quot;Business health is optimal. Cash flow is positive for the 4th consecutive week.&quot;
              </p>
              <div className="flex items-center text-xs font-bold text-injaazh-600">
                Generate Growth Report <ArrowRight className="w-3 h-3 ml-1" />
              </div>
            </div>
          </CardContent>
          <div className="absolute right-[-10px] bottom-[-10px] w-24 h-24 bg-injaazh-500/5 rounded-full blur-2xl" />
        </Card>
      </div>
    </div>
  );
}
