"use client";

import { useState, useEffect } from "react";
import { 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  BarChart3, 
  ArrowUpRight, 
  ArrowDownRight,
  Plus,
  Search,
  Filter,
  FileDown,
  Target,
  Trophy,
  Zap,
  History,
  ArrowRight,
  ArrowLeft,
  ShoppingCart,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

export default function SalesDashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/dashboard" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to App Dashboard
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Sales <span className="text-indigo-600">Command</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Monitor sales velocity, pipelines, and revenue growth.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-2xl h-14 px-8 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm active:scale-95 transition-all">
             Team Performance
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">
            <Plus className="w-5 h-5 mr-3" /> New Sales Order
          </Button>
        </div>
      </div>

      {/* Sales Stats Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <SalesStatsCard label="Gross Revenue" value="$642,800" change="+24.5%" isPositive={true} icon={TrendingUp} color="text-indigo-600" bg="bg-indigo-50 dark:bg-indigo-900/20" />
        <SalesStatsCard label="Total Orders" value="1,240" change="+12.2%" isPositive={true} icon={ShoppingCart} color="text-blue-600" bg="bg-blue-50 dark:bg-blue-900/20" />
        <SalesStatsCard label="Conversion Rate" value="14.8%" change="-2.4%" isPositive={false} icon={Zap} color="text-amber-600" bg="bg-amber-50 dark:bg-amber-900/20" />
        <SalesStatsCard label="Avg. Order Value" value="$518" change="+8.2%" isPositive={true} icon={BarChart3} color="text-emerald-600" bg="bg-emerald-50 dark:bg-emerald-900/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed & Orders */}
        <div className="lg:col-span-2 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Recent Sales Orders</h3>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Live order orchestration</p>
                </div>
                <Link href="/sales/orders">
                  <Button variant="ghost" size="sm" className="text-xs font-black text-indigo-600">VIEW ALL ORDERS</Button>
                </Link>
              </div>
              
              <div className="overflow-x-auto relative z-10">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                      <th className="pb-4">Order ID</th>
                      <th className="pb-4">Customer</th>
                      <th className="pb-4">Product</th>
                      <th className="pb-4">Total</th>
                      <th className="pb-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    <OrderRow id="#SO-8420" customer="TechNexus Ltd" product="Cisco Enterprise Switch" total="$4,500" status="Shipped" />
                    <OrderRow id="#SO-8421" customer="CyberCore Systems" product="Dell Latitude 5420 x5" total="$12,200" status="Processing" />
                    <OrderRow id="#SO-8422" customer="Vertex Agency" product="Server Maintenance Kit" total="$1,800" status="Pending" />
                    <OrderRow id="#SO-8423" customer="CloudWay Inc" product="Logitech MX Master x10" total="$2,400" status="Delivered" />
                  </tbody>
                </table>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-950 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                 <Trophy className="w-8 h-8 mb-6 text-amber-500" />
                 <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-50">Monthly Sales Goal</h4>
                 <div className="flex items-end justify-between mt-4">
                    <div>
                       <p className="text-3xl font-black text-white">$800,000</p>
                       <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">80% Achieved</p>
                    </div>
                    <div className="text-right">
                       <p className="text-xl font-black text-emerald-400">$642,800</p>
                       <p className="text-[10px] font-bold text-slate-500 uppercase">Actual Sales</p>
                    </div>
                 </div>
                 <div className="mt-6 h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full w-[80%] bg-gradient-to-r from-indigo-600 to-amber-500 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                 </div>
              </div>

              <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                 <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6 text-center">Sales Performance Hub</h4>
                 <div className="grid grid-cols-2 gap-3">
                    <QuickLink icon={History} label="Orders" link="/sales/orders" color="bg-indigo-500" />
                    <QuickLink icon={FileDown} label="Quotes" link="/sales/quotations" color="bg-blue-500" />
                    <QuickLink icon={Users} label="Customers" link="/crm" color="bg-purple-500" />
                    <QuickLink icon={Target} label="Pipelines" link="/crm/pipeline" color="bg-emerald-500" />
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar - Top Selling & Analytics */}
        <div className="space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Best Sellers</h3>
                 <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
              </div>
              <div className="space-y-6">
                 <ProductItem name="Dell Latitude 5420" sales="142 Units" revenue="$142,000" />
                 <ProductItem name="Cisco Enterprise" sales="84 Units" revenue="$210,000" />
                 <ProductItem name="Logitech MX Master" sales="210 Units" revenue="$21,000" />
                 <ProductItem name="HP LaserJet Pro" sales="56 Units" revenue="$28,000" />
              </div>
              <Button className="w-full mt-10 h-12 rounded-2xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 text-slate-900 dark:text-white border border-slate-100 dark:border-slate-800 font-bold transition-all active:scale-95">
                Full Inventory Insights
              </Button>
           </div>

           <div className="bg-gradient-to-br from-indigo-600 to-purple-800 rounded-[32px] p-8 text-white shadow-xl shadow-indigo-600/20 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <Zap className="w-8 h-8 mb-4 opacity-50" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Sales Conversion AI</h4>
              <p className="text-3xl font-black mt-1">94.2%</p>
              <p className="text-xs font-bold mt-4 opacity-80 leading-relaxed">Your team is closing leads 12% faster than last month.</p>
              <Button className="w-full mt-8 h-12 rounded-2xl bg-white text-indigo-900 font-black hover:bg-white/90 transition-all group active:scale-95">
                 SALES ANALYTICS <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
           </div>
        </div>
      </div>
    </div>
  );
}

function SalesStatsCard({ label, value, change, isPositive, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm group hover:shadow-2xl transition-all duration-500 cursor-pointer">
      <div className="flex items-center justify-between mb-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", bg)}>
          <Icon className={cn("w-7 h-7", color)} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{value}</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className={cn("flex items-center text-[10px] font-black px-2 py-1 rounded-lg", isPositive ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20" : "text-rose-600 bg-rose-50 dark:bg-rose-900/20")}>
           {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
           {change}
        </div>
        <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Since last week</p>
      </div>
    </div>
  );
}

function OrderRow({ id, customer, product, total, status }: any) {
  return (
    <tr className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
      <td className="py-5 font-black text-xs text-indigo-600 tracking-tight">{id}</td>
      <td className="py-5 font-bold text-sm text-slate-900 dark:text-white">{customer}</td>
      <td className="py-5 text-xs font-medium text-slate-500">{product}</td>
      <td className="py-5 font-black text-sm text-slate-900 dark:text-white">{total}</td>
      <td className="py-5 text-right">
        <span className={cn("text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border", 
          status === "Delivered" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : 
          status === "Shipped" ? "bg-blue-50 text-blue-600 border-blue-100" : 
          status === "Processing" ? "bg-amber-50 text-amber-600 border-amber-100" : 
          "bg-slate-50 text-slate-600 border-slate-100")}>
          {status}
        </span>
      </td>
    </tr>
  );
}

function ProductItem({ name, sales, revenue }: any) {
  return (
    <div className="flex items-center justify-between group cursor-pointer">
       <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
             <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
             <p className="font-bold text-sm text-slate-900 dark:text-white">{name}</p>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{sales}</p>
          </div>
       </div>
       <p className="font-black text-sm text-slate-900 dark:text-white">{revenue}</p>
    </div>
  );
}

function QuickLink({ icon: Icon, label, link, color }: any) {
  return (
    <Link href={link} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg transition-all group">
       <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center mb-2 shadow-sm transition-transform group-hover:scale-110", color)}>
          <Icon className="w-4 h-4 text-white" />
       </div>
       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{label}</span>
    </Link>
  );
}
