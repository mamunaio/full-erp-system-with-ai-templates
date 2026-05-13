import { Metadata } from "next";
import { Plus, Database, MapPin, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import WarehouseCard from "../components/WarehouseCard";

export const metadata: Metadata = {
  title: "Warehouses | Injaazh ERP",
};

export default function WarehousesPage() {
  const warehouses = [
    { name: "Main Distribution Center", location: "Uttara, Dhaka", manager: "Akram Khan", products: 850, value: 450000, utilization: 85 },
    { name: "Secondary Hub", location: "Chittagong", manager: "Sarah Islam", products: 340, value: 120000, utilization: 42 },
    { name: "Showroom Store", location: "Banani, Dhaka", manager: "Rafiq Ahmed", products: 120, value: 85000, utilization: 65 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Warehouse Management
          </h1>
          <p className="text-slate-500 text-sm">
            Monitor storage utilization, locations, and inventory distribution.
          </p>
        </div>
        <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
          <Plus className="w-5 h-5 mr-2" /> Add Warehouse
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {warehouses.map((w) => (
          <WarehouseCard key={w.name} {...w} />
        ))}
        
        {/* Add New Placeholder */}
        <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-6 flex flex-col items-center justify-center text-center space-y-3 hover:border-injaazh-500 hover:bg-injaazh-50/50 transition-all cursor-pointer group">
          <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-injaazh-600 group-hover:scale-110 transition-all">
            <Plus className="w-6 h-6" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-white">Create New Location</p>
            <p className="text-xs text-slate-500">Expand your storage network</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
        <h2 className="text-xl font-bold mb-6">Global Stock Distribution</h2>
        <div className="h-[300px] flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-2xl">
          {/* Placeholder for a map or detailed distribution chart */}
          Interactive Warehouse Map & Distribution Analytics
        </div>
      </div>
    </div>
  );
}
