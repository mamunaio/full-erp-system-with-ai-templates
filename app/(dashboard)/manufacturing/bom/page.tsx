import { Metadata } from "next";
import { 
  Plus, Search, Filter, Layers, 
  MoreVertical, Copy, Archive 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bill of Materials | Injaazh ERP",
};

export default function BOMPage() {
  const boms = [
    { id: "1", name: "Standard Assembly", product: "Injaazh Server X1", version: "v1.0", components: 12, cost: 1240.50, status: "ACTIVE" },
    { id: "2", name: "Premium Build", product: "Injaazh Server Pro", version: "v2.1", components: 18, cost: 2150.00, status: "ACTIVE" },
    { id: "3", name: "Legacy Config", product: "Injaazh Server X1", version: "v0.9", components: 10, cost: 980.00, status: "ARCHIVED" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Bill of Materials (BOM)
          </h1>
          <p className="text-slate-500 text-sm">
            Manage product recipes, component costs and version history.
          </p>
        </div>
        <Link href="/manufacturing/bom/new">
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
            <Plus className="w-5 h-5 mr-2" /> Create New BOM
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search BOM by name or product..."
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
                <th className="p-4 border-b dark:border-slate-800">BOM Name</th>
                <th className="p-4 border-b dark:border-slate-800">Target Product</th>
                <th className="p-4 border-b dark:border-slate-800">Version</th>
                <th className="p-4 border-b dark:border-slate-800">Components</th>
                <th className="p-4 border-b dark:border-slate-800">Unit Cost</th>
                <th className="p-4 border-b dark:border-slate-800">Status</th>
                <th className="p-4 border-b dark:border-slate-800 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {boms.map((bom) => (
                <tr key={bom.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer">
                  <td className="p-4 font-bold text-slate-900 dark:text-white">{bom.name}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400 font-medium">{bom.product}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold">{bom.version}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center">
                       <Layers className="w-3 h-3 mr-2 text-slate-400" />
                       <span className="font-bold">{bom.components} items</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-emerald-600">${bom.cost.toLocaleString()}</td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      bom.status === "ACTIVE" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                    )}>
                      {bom.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-injaazh-600">
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600">
                        <Archive className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
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

import { cn } from "@/lib/utils";
