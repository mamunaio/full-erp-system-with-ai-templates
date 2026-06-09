"use client";

import { useState, useEffect } from "react";
import StatsCard from "@/components/dashboard/StatsCard";
import AIInsightBanner from "@/components/dashboard/AIInsightBanner";
import AICommandBar from "@/components/dashboard/AICommandBar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, PieChart, Pie, Cell 
} from "recharts";
import { 
  AlertCircle, ArrowRight, CheckCircle2, Clock, 
  Package, ShoppingCart, UserCheck, Wallet,
  TrendingUp, TrendingDown, Activity, Zap, Sparkles,
  ArrowUpRight, ArrowDownRight, MoreVertical,
  ShieldCheck, Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

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
  { name: "Hardware", value: 400, color: "#2563eb" },
  { name: "Software", value: 300, color: "#3b82f6" },
  { name: "Services", value: 200, color: "#60a5fa" },
  { name: "Support", value: 100, color: "#93c5fd" },
];

export default function DashboardPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const { data: session } = useSession();
  const userRole = (session?.user as any)?.role;

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

  if (loading) return <div className="p-20 text-center font-black uppercase italic tracking-widest animate-pulse">Initializing Command Center...</div>;

  // ---------------------------------------------------------
  // USER ROLE VIEW (Restricted)
  // ---------------------------------------------------------
  if (userRole === "USER") {
    return (
      <div className="space-y-10 animate-in fade-in duration-700 pb-20">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white italic uppercase leading-none">
            User <span className="text-blue-600">Hub</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Personal Workspace for <span className="text-slate-900 dark:text-white font-bold">{session?.user?.name}</span>
          </p>
        </div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
           <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-[48px] p-10">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-2xl font-black italic uppercase tracking-tight">Active <span className="text-blue-600">Assignments</span></h3>
                 <CheckCircle2 className="w-6 h-6 text-emerald-500" />
              </div>
              <div className="space-y-4">
                 <TaskItem title="Complete Project Documentation" priority="High" />
                 <TaskItem title="Update Progress Report" priority="Medium" />
                 <TaskItem title="Team Sync Meeting" priority="Low" />
              </div>
           </Card>

           <Card className="border-none shadow-sm bg-slate-950 rounded-[48px] p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl" />
              <div className="relative z-10 space-y-6">
                 <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center">
                    <ShieldCheck className="w-8 h-8" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-2xl font-black italic uppercase tracking-tight">Security <span className="text-blue-600">Status</span></h3>
                    <p className="text-sm text-slate-400">Your account is secured with Enterprise-grade encryption.</p>
                 </div>
                 <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Identity Verified</span>
                    <span className="text-emerald-500 text-xs font-bold uppercase italic">Active</span>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    );
  }

  // ---------------------------------------------------------
  // ADMIN / OWNER VIEW (Full Access)
  // ---------------------------------------------------------
  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header & Command Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white italic uppercase leading-tight pb-1">
            Business <span className="text-blue-600">Command</span> Center
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Strategic overview of Injaazh Enterprise operations for <span className="text-slate-900 dark:text-white font-bold">May 2026</span>
          </p>
        </div>
        <div className="flex items-center space-x-4 bg-white dark:bg-slate-900 p-2 rounded-[24px] shadow-sm border border-slate-100 dark:border-slate-800">
           <div className="flex -space-x-3 p-1">
              {[1,2,3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 overflow-hidden" />
              ))}
           </div>
           <div className="pr-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Admins</p>
              <p className="text-xs font-bold">12 Team Members</p>
           </div>
        </div>
      </div>

      {/* AI Command Bar Upgrade */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <AICommandBar />
      </div>

      {/* KPI Hub */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <PremiumKPI 
          title="Total Revenue" 
          value={loading ? "..." : `$${(stats?.revenue?.value ?? 128400).toLocaleString()}`} 
          change="+12.4%" 
          trend="up" 
          icon={Wallet}
          color="blue"
        />
        <PremiumKPI 
          title="Operating Cost" 
          value="$42,300" 
          change="-4.2%" 
          trend="down" 
          icon={Activity}
          color="rose"
        />
        <PremiumKPI 
          title="Total Workforce" 
          value="1,240" 
          change="+12" 
          trend="up" 
          icon={UserCheck}
          color="emerald"
        />
        <PremiumKPI 
          title="Pipeline Leads" 
          value="842" 
          change="+8.1%" 
          trend="up" 
          icon={Zap}
          color="indigo"
        />
      </div>

      {/* Analytics Command */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-none shadow-sm bg-white dark:bg-slate-900 rounded-[48px] overflow-hidden p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
               <h3 className="text-2xl font-black italic uppercase tracking-tight">Revenue <span className="text-blue-600">Trajectory</span></h3>
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">Real-time Performance Analysis</p>
            </div>
            <div className="flex items-center space-x-2">
               <div className="flex items-center space-x-1 mr-4">
                  <div className="w-2 h-2 rounded-full bg-blue-600" />
                  <span className="text-[10px] font-bold text-slate-400">Revenue</span>
               </div>
               <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="text-[10px] font-bold text-slate-400">Expense</span>
               </div>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" strokeOpacity={0.1} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8', fontWeight: 'bold'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)', padding: '20px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="expense" stroke="#f43f5e" strokeWidth={4} fill="none" strokeDasharray="8 8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-3 border-none shadow-sm bg-white dark:bg-slate-900 rounded-[48px] p-8 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
          <h3 className="text-2xl font-black italic uppercase tracking-tight mb-8">Sales <span className="text-blue-600">Pulse</span></h3>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={95}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
               <p className="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-white leading-none">1,242</p>
               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">Total Units</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-8 w-full">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center">
                    <div className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: item.color }} />
                    <span className="text-[10px] font-black uppercase text-slate-500">{item.name}</span>
                  </div>
                  <span className="text-[10px] font-black text-slate-900 dark:text-white">{(item.value / 10).toFixed(0)}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      {/* Activity & AI Insights */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2 border-none shadow-sm bg-white dark:bg-slate-900 rounded-[48px] p-8">
          <div className="flex items-center justify-between mb-8 px-2">
            <h3 className="text-2xl font-black italic uppercase tracking-tight">Recent <span className="text-blue-600">Transactions</span></h3>
            <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-blue-600">View Master Ledger →</Button>
          </div>
          <div className="space-y-4">
             {[
               { id: 1, title: "Hardware Bulk Order", date: "May 15, 2026", contact: "NVIDIA Corp", amount: 12400, type: "income" },
               { id: 2, title: "Cloud Infrastructure", date: "May 14, 2026", contact: "AWS", amount: 2100, type: "expense" },
               { id: 3, title: "Consulting Fee", date: "May 14, 2026", contact: "Sarah J.", amount: 850, type: "income" },
             ].map((i) => (
               <div key={i.id} className="flex items-center justify-between p-5 rounded-[24px] bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl transition-all group cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                  <div className="flex items-center space-x-5">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg",
                      i.type === "income" ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                    )}>
                      {i.type === "income" ? <ArrowUpRight className="w-6 h-6" /> : <ArrowDownRight className="w-6 h-6" />}
                    </div>
                    <div>
                      <p className="text-sm font-black italic uppercase tracking-tight">{i.title}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{i.date} • {i.contact}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn(
                      "text-lg font-black tracking-tighter italic",
                      i.type === "income" ? "text-emerald-500" : "text-rose-500"
                    )}>
                      {i.type === "income" ? "+" : "-"}${i.amount.toLocaleString()}
                    </p>
                    <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Transaction Finalized</span>
                  </div>
               </div>
             ))}
          </div>
        </Card>

        <div className="space-y-8">
           <Card className="border-none shadow-2xl bg-slate-950 rounded-[48px] p-10 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
              <div className="flex items-center justify-between mb-10 relative z-10">
                 <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40 relative overflow-hidden">
                       <div className="absolute inset-0 bg-white/20 animate-pulse" />
                       <Brain className="w-7 h-7 relative z-10" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black italic uppercase tracking-tighter">AI <span className="text-blue-500">Pulse</span></h3>
                       <div className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Live Neural Link</span>
                       </div>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Health Score</p>
                    <p className="text-4xl font-black italic tracking-tighter text-blue-500">85<span className="text-lg text-slate-700">/100</span></p>
                 </div>
              </div>

              <div className="space-y-8 relative z-10">
                 <div className="p-6 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-md">
                    <p className="text-sm text-slate-300 leading-relaxed italic mb-4">
                      &quot;Business trajectory is optimal. Revenue is projected to hit <span className="text-white font-bold">$150K</span> by June 15th based on current lead velocity.&quot;
                    </p>
                    <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-4">
                          <div className="flex flex-col">
                             <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Growth Index</span>
                             <span className="text-xl font-black italic tracking-tighter text-emerald-500">+12.4%</span>
                          </div>
                          <div className="w-px h-8 bg-white/10" />
                          <div className="flex flex-col">
                             <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Burn Rate</span>
                             <span className="text-xl font-black italic tracking-tighter text-blue-400">Low</span>
                          </div>
                       </div>
                       <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-blue-500 group-hover:translate-x-1 transition-transform">Full Strategy →</Button>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <Button className="h-14 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black uppercase italic tracking-tighter shadow-xl shadow-blue-600/20 active:scale-95 transition-all">
                       <Zap className="w-4 h-4 mr-2" /> SCALE INVENTORY
                    </Button>
                    <Button variant="outline" className="h-14 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 text-white font-black uppercase italic tracking-tighter active:scale-95 transition-all">
                       <ShieldCheck className="w-4 h-4 mr-2" /> RISK AUDIT
                    </Button>
                 </div>
              </div>
           </Card>

           <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-[48px] p-8">
              <div className="flex items-center justify-between mb-6">
                 <h3 className="text-xl font-black italic uppercase tracking-tight">Active <span className="text-blue-600">Tasks</span></h3>
                 <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                    <MoreVertical className="w-4 h-4 text-slate-400" />
                 </div>
              </div>
              <div className="space-y-4">
                 <TaskItem title="Approve Q2 Financials" priority="High" />
                 <TaskItem title="Inventory Reorder" priority="Medium" />
                 <TaskItem title="Sarah J. One-on-One" priority="Low" />
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}

function PremiumKPI({ title, value, change, trend, icon: Icon, color }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[40px] p-8 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-xl transition-all group relative overflow-hidden">
       <div className={cn(
         "absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity",
         color === "blue" ? "bg-blue-600/10" : color === "rose" ? "bg-rose-500/10" : "bg-emerald-500/10"
       )} />
       <div className="flex justify-between items-start mb-6">
          <div className={cn(
            "w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg",
            color === "blue" ? "bg-blue-600 text-white" : color === "rose" ? "bg-rose-500 text-white" : "bg-emerald-500 text-white"
          )}>
             <Icon className="w-7 h-7" />
          </div>
          <div className={cn(
            "flex items-center px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest",
            trend === "up" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-500"
          )}>
             {trend === "up" ? <TrendingUp className="w-3.5 h-3.5 mr-1" /> : <TrendingDown className="w-3.5 h-3.5 mr-1" />}
             {change}
          </div>
       </div>
       <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{title}</h4>
       <p className="text-3xl font-black italic tracking-tighter text-slate-900 dark:text-white leading-none">{value}</p>
    </div>
  );
}

function TaskItem({ title, priority }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all cursor-pointer group border border-transparent hover:border-blue-100/10">
       <div className="flex items-center space-x-3">
          <div className={cn(
            "w-2 h-2 rounded-full",
            priority === "High" ? "bg-rose-500" : priority === "Medium" ? "bg-amber-500" : "bg-blue-500"
          )} />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 transition-colors">{title}</span>
       </div>
       <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-600 transition-all" />
    </div>
  );
}
