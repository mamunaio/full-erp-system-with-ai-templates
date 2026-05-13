"use client";

import { 
  Star, Phone, Mail, MoreHorizontal, 
  Plus, Search, Filter 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const vendors = [
  { id: "1", name: "Global Tech Supplies", category: "Hardware", contact: "John Smith", email: "john@globaltech.com", rating: 4.8, purchases: 45000, status: "ACTIVE" },
  { id: "2", name: "Cisco Systems", category: "Networking", contact: "Sarah Lee", email: "sarah@cisco.com", rating: 5.0, purchases: 120000, status: "ACTIVE" },
  { id: "3", name: "Local Office Mart", category: "Stationary", contact: "Mike Brown", email: "mike@officemart.com", rating: 3.5, purchases: 5200, status: "ON_HOLD" },
];

export default function VendorTable() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search vendors by name or category..."
            className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="rounded-lg h-9">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-lg h-9">
            <Plus className="w-4 h-4 mr-2" /> New Vendor
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <th className="p-4 border-b dark:border-slate-800">Vendor</th>
              <th className="p-4 border-b dark:border-slate-800">Category</th>
              <th className="p-4 border-b dark:border-slate-800">Contact</th>
              <th className="p-4 border-b dark:border-slate-800">Rating</th>
              <th className="p-4 border-b dark:border-slate-800">Total Purchase</th>
              <th className="p-4 border-b dark:border-slate-800 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {vendors.map((v) => (
              <tr key={v.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-500">
                      {v.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{v.name}</p>
                      <p className="text-[10px] text-slate-400">{v.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">{v.category}</td>
                <td className="p-4">
                  <div className="flex items-center text-xs text-slate-600">
                    <span className="font-bold mr-1.5">{v.contact}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Star className={cn("w-3 h-3 fill-amber-400 text-amber-400")} />
                    <span className="text-xs font-bold">{v.rating}</span>
                  </div>
                </td>
                <td className="p-4 font-bold text-slate-900 dark:text-white">${v.purchases.toLocaleString()}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-injaazh-600">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
