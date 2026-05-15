"use client";

import { useState } from "react";
import { Metadata } from "next";
import { Plus, Database, MapPin, User, Search, ArrowLeft, Warehouse } from "lucide-react";
import { Button } from "@/components/ui/button";
import WarehouseCard from "../components/WarehouseCard";
import Link from "next/link";
import AddWarehouseModal from "../components/AddWarehouseModal";

export default function WarehousesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const warehouses = [
    { name: "Main Distribution Center", location: "Uttara, Dhaka", manager: "Akram Khan", products: 850, value: 450000, utilization: 85 },
    { name: "Secondary Hub", location: "Chittagong", manager: "Sarah Islam", products: 340, value: 120000, utilization: 42 },
    { name: "Showroom Store", location: "Banani, Dhaka", manager: "Rafiq Ahmed", products: 120, value: 85000, utilization: 65 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/inventory" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-injaazh-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Inventory
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Warehouse <span className="text-injaazh-600">Management</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Monitor storage utilization, locations, and inventory distribution.
          </p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-injaazh-600/20 active:scale-95 transition-all"
        >
          <Plus className="w-5 h-5 mr-3" /> Add Warehouse
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {warehouses.map((w) => (
          <WarehouseCard key={w.name} {...w} />
        ))}
        
        {/* Add New Placeholder */}
        <div 
          onClick={() => setIsModalOpen(true)}
          className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-[32px] p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-injaazh-600 hover:bg-injaazh-50/30 dark:hover:bg-injaazh-900/10 transition-all cursor-pointer group shadow-sm hover:shadow-xl hover:shadow-injaazh-600/5"
        >
          <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-injaazh-600 group-hover:bg-white dark:group-hover:bg-slate-900 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500">
            <Plus className="w-8 h-8" />
          </div>
          <div>
            <p className="font-black text-slate-900 dark:text-white tracking-tight">Create New Location</p>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Expand your storage network</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-injaazh-600/5 rounded-full blur-3xl" />
        <h2 className="text-2xl font-black mb-8 tracking-tight">Global Stock Distribution</h2>
        <div className="h-[350px] flex flex-col items-center justify-center text-center space-y-4 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-[32px] bg-slate-50/30 dark:bg-slate-950/20">
          <Warehouse className="w-16 h-16 text-slate-200 dark:text-slate-800 animate-pulse" />
          <div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Interactive Distribution Map</p>
            <p className="text-xs text-slate-400 mt-2">Visualize real-time asset density across geographical nodes.</p>
          </div>
          <Button variant="outline" className="rounded-xl border-slate-200 text-[10px] font-black uppercase tracking-widest">Activate Map View</Button>
        </div>
      </div>

      <AddWarehouseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
