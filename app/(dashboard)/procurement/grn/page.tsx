import { Metadata } from "next";
import { Plus, Package, FileCheck, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "GRN | Injaazh ERP",
};

export default function GRNPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Goods Received Note (GRN)
          </h1>
          <p className="text-slate-500 text-sm">
            Receive incoming stock from purchase orders and update inventory.
          </p>
        </div>
        <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
          <Plus className="w-5 h-5 mr-2" /> New Receipt
        </Button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by GRN # or PO #..."
              className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="rounded-lg h-9">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                <th className="p-4 border-b dark:border-slate-800">GRN #</th>
                <th className="p-4 border-b dark:border-slate-800">PO #</th>
                <th className="p-4 border-b dark:border-slate-800">Vendor</th>
                <th className="p-4 border-b dark:border-slate-800">Received Date</th>
                <th className="p-4 border-b dark:border-slate-800">Warehouse</th>
                <th className="p-4 border-b dark:border-slate-800">Status</th>
                <th className="p-4 border-b dark:border-slate-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {[1, 2].map((i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="p-4 font-bold">GRN-2024-0{i}</td>
                  <td className="p-4 text-injaazh-600 font-bold">PO-2024-10{i}</td>
                  <td className="p-4 font-medium">Global Tech Supplies</td>
                  <td className="p-4 text-slate-500">May 12, 2026</td>
                  <td className="p-4">Main Distribution</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-600 text-[10px] font-bold uppercase tracking-wider">
                      Received
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Button variant="ghost" size="sm" className="rounded-lg h-8 px-3">View Details</Button>
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
