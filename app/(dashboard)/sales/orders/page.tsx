"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  FileDown, 
  ArrowLeft,
  MoreVertical,
  ChevronRight,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SalesOrdersPage() {
  const orders = [
    { id: "#SO-8420", customer: "TechNexus Ltd", date: "May 14, 2026", items: 3, total: "$4,500", payment: "Paid", status: "Shipped" },
    { id: "#SO-8421", customer: "CyberCore Systems", date: "May 14, 2026", items: 12, total: "$12,200", payment: "Partial", status: "Processing" },
    { id: "#SO-8422", customer: "Vertex Agency", date: "May 13, 2026", items: 1, total: "$1,800", payment: "Pending", status: "Pending" },
    { id: "#SO-8423", customer: "CloudWay Inc", date: "May 12, 2026", items: 8, total: "$2,400", payment: "Paid", status: "Delivered" },
    { id: "#SO-8424", customer: "Orizon Logistics", date: "May 11, 2026", items: 2, total: "$8,900", payment: "Paid", status: "Shipped" },
    { id: "#SO-8425", customer: "Skyline Towers", date: "May 10, 2026", items: 5, total: "$15,000", payment: "Cancelled", status: "Cancelled" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/sales" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Sales Command
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Sales <span className="text-indigo-600">Orders</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage your full sales order cycle and fulfillment process.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-2xl h-14 px-8 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm active:scale-95 transition-all">
            <FileDown className="w-4 h-4 mr-3 text-slate-400" /> Export Orders
          </Button>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-indigo-600/20 active:scale-95 transition-all">
            <Plus className="w-5 h-5 mr-3" /> New Order
          </Button>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-4">
        <OrderStatusCard label="Pending Orders" value="12" icon={Clock} color="text-amber-500" bg="bg-amber-50 dark:bg-amber-900/20" />
        <OrderStatusCard label="In Processing" value="28" icon={Package} color="text-blue-500" bg="bg-blue-50 dark:bg-blue-900/20" />
        <OrderStatusCard label="Out for Delivery" value="15" icon={Truck} color="text-indigo-500" bg="bg-indigo-50 dark:bg-indigo-900/20" />
        <OrderStatusCard label="Completed Today" value="42" icon={CheckCircle2} color="text-emerald-500" bg="bg-emerald-50 dark:bg-emerald-900/20" />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
           <div className="relative flex-1 min-w-[300px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search orders, customers, or status..."
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl py-3 pl-12 pr-4 text-xs font-medium outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
              />
           </div>
           <Button variant="outline" className="rounded-xl h-11 border-slate-100 text-[10px] font-black uppercase tracking-widest"><Filter className="w-4 h-4 mr-2" /> Filter List</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 dark:border-slate-800">
                <th className="pb-4">Order ID</th>
                <th className="pb-4">Customer</th>
                <th className="pb-4">Order Date</th>
                <th className="pb-4">Items</th>
                <th className="pb-4">Total Amount</th>
                <th className="pb-4">Payment</th>
                <th className="pb-4">Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {orders.map((order) => (
                <tr key={order.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all cursor-pointer">
                  <td className="py-5 font-black text-xs text-indigo-600 tracking-tight">{order.id}</td>
                  <td className="py-5 font-bold text-sm text-slate-900 dark:text-white">{order.customer}</td>
                  <td className="py-5 text-xs font-medium text-slate-500">{order.date}</td>
                  <td className="py-5 text-xs font-black text-slate-400">{order.items} Items</td>
                  <td className="py-5 font-black text-sm text-slate-900 dark:text-white">{order.total}</td>
                  <td className="py-5">
                     <span className={cn("text-[8px] font-black uppercase tracking-widest", 
                        order.payment === "Paid" ? "text-emerald-500" : 
                        order.payment === "Partial" ? "text-amber-500" : 
                        order.payment === "Cancelled" ? "text-slate-400" : "text-rose-500")}>
                        {order.payment}
                     </span>
                  </td>
                  <td className="py-5">
                    <span className={cn("text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border", 
                      order.status === "Delivered" ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20" : 
                      order.status === "Shipped" ? "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20" : 
                      order.status === "Processing" ? "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20" : 
                      order.status === "Cancelled" ? "bg-slate-50 text-slate-400 border-slate-100 dark:bg-slate-800/40" :
                      "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20")}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-5 text-right">
                    <Button variant="ghost" size="icon" className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
                      <MoreVertical className="w-4 h-4 text-slate-400" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function OrderStatusCard({ label, value, icon: Icon, color, bg }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm flex items-center space-x-4 group hover:shadow-xl transition-all duration-500">
       <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", bg)}>
          <Icon className={cn("w-6 h-6", color)} />
       </div>
       <div>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
          <p className="text-xl font-black text-slate-900 dark:text-white mt-1">{value}</p>
       </div>
    </div>
  );
}
