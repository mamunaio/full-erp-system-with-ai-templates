import { Metadata } from "next";
import VendorTable from "../components/VendorTable";
import { Plus, Search, Filter, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Vendors | Injaazh ERP",
};

export default function VendorsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Vendor Management
          </h1>
          <p className="text-slate-500 text-sm">
            Maintain your supply chain, track vendor performance and ratings.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-slate-200">
            <Search className="w-5 h-5 mr-2" /> Find New Vendors
          </Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
            <Plus className="w-5 h-5 mr-2" /> Add Vendor
          </Button>
        </div>
      </div>

      {/* AI Insight */}
      <div className="relative group rounded-[32px] border border-injaazh-100 bg-white dark:bg-slate-900 p-6 pl-16 shadow-sm overflow-hidden">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl bg-injaazh-50 dark:bg-injaazh-950 flex items-center justify-center text-injaazh-600">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">AI Vendor Recommendation</p>
            <p className="text-xs text-slate-500 mt-0.5">Based on delivery speed and quality: <span className="font-bold text-injaazh-600">Global Tech Supplies</span> is recommended for Networking items this month.</p>
          </div>
          <Button size="sm" variant="outline" className="rounded-lg h-9">View Analysis</Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Vendors</p>
          <p className="text-2xl font-bold mt-1">124</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Rating</p>
          <div className="flex items-center mt-1">
            <p className="text-2xl font-bold mr-2">4.2</p>
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
          </div>
        </div>
      </div>

      <VendorTable />
    </div>
  );
}
