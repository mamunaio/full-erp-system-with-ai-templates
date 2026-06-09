import { Metadata } from "next";
import WorkOrderTimeline from "../../components/WorkOrderTimeline";
import MaterialAvailability from "../../components/MaterialAvailability";
import {
   Package, Play, CheckCircle2,
   ArrowLeft, Printer, Activity,
   Calculator, History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

export const metadata: Metadata = {
   title: "Work Order Details | Injaazh ERP",
};

export default function WorkOrderDetailPage({ params }: { params: { id: string } }) {
   return (
      <div className="space-y-8 animate-in fade-in duration-700 pb-20">
         <div className="flex items-center justify-between">
            <Link href="/manufacturing/work-orders" className="group flex items-center text-sm font-medium text-slate-500 hover:text-injaazh-600 transition-colors">
               <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
               Back to Work Orders
            </Link>
            <div className="flex items-center space-x-2">
               <Button variant="outline" className="rounded-xl h-10"><Printer className="w-4 h-4 mr-2" /> Print Order</Button>
               <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-10 shadow-lg shadow-injaazh-600/20">
                  <Play className="w-4 h-4 mr-2" /> Start Production
               </Button>
            </div>
         </div>

         <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
               <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
                  Work Order #WO-2024-045
                  <span className="ml-4 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                     Confirmed
                  </span>
               </h1>
               <p className="text-slate-500 text-sm mt-1">Product: Injaazh Server X1 • Qty: 50 Units • BOM: Standard v1.0</p>
            </div>
            <div className="flex flex-col items-end">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Target End Date</p>
               <p className="text-sm font-bold text-rose-500">May 25, 2026 (12 days left)</p>
            </div>
         </div>

         <WorkOrderTimeline currentStatus="CONFIRMED" />

         <Tabs defaultValue="materials" className="space-y-8">
            <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl h-14">
               <TabsTrigger value="materials" className="rounded-xl px-8 h-12 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 shadow-sm transition-all">Materials & Stock</TabsTrigger>
               <TabsTrigger value="log" className="rounded-xl px-8 h-12 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 shadow-sm transition-all">Production Log</TabsTrigger>
               <TabsTrigger value="cost" className="rounded-xl px-8 h-12 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 shadow-sm transition-all">Cost Tracking</TabsTrigger>
            </TabsList>

            <TabsContent value="materials" className="outline-none">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                     <MaterialAvailability />
                  </div>
                  <div className="space-y-8">
                     <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                        <h3 className="font-bold mb-6 flex items-center"><Activity className="w-5 h-5 mr-2 text-injaazh-600" /> Stock Reservation</h3>
                        <p className="text-sm text-slate-500 leading-relaxed mb-6">You can reserve the required materials to prevent them from being used in other orders.</p>
                        <Button className="w-full bg-slate-900 text-white rounded-xl h-12 font-bold">Reserve Materials</Button>
                     </div>
                     <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 p-6 rounded-3xl">
                        <p className="text-xs font-bold text-amber-800 dark:text-amber-200">Recommendation</p>
                        <p className="text-[11px] text-amber-700 dark:text-amber-300/70 mt-2">Stock for "Z690 Motherboard" is low. A purchase order of at least 10 units is suggested to avoid production delays.</p>
                     </div>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="log" className="outline-none">
               <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="font-bold flex items-center"><History className="w-5 h-5 mr-2 text-injaazh-600" /> Daily Production Entries</h3>
                     <Button size="sm" className="bg-injaazh-600 text-white rounded-lg h-9"><Plus className="w-4 h-4 mr-2" /> Log Progress</Button>
                  </div>
                  <div className="text-center py-12">
                     <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-300">
                        <Package className="w-8 h-8" />
                     </div>
                     <p className="text-slate-500 text-sm">No production has been logged yet for this order.</p>
                  </div>
               </div>
            </TabsContent>

            <TabsContent value="cost" className="outline-none">
               <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm max-w-4xl">
                  <div className="flex items-center justify-between mb-10">
                     <h3 className="text-xl font-bold italic tracking-tighter uppercase flex items-center"><Calculator className="w-5 h-5 mr-2 text-injaazh-600" /> Planned vs Actual Costing</h3>
                     <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total Planned Cost</p>
                        <p className="text-2xl font-black text-injaazh-600">$14,200.00</p>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <CostRow label="Raw Materials" planned={12000} actual={0} />
                     <CostRow label="Labor Cost" planned={1500} actual={0} />
                     <CostRow label="Overhead" planned={700} actual={0} />
                     <div className="pt-6 border-t-2 border-slate-900 dark:border-white flex justify-between items-center">
                        <span className="font-black text-lg">Total Production Cost</span>
                        <span className="font-black text-lg">$14,200.00</span>
                     </div>
                  </div>
               </div>
            </TabsContent>
         </Tabs>
      </div>
   );
}

function CostRow({ label, planned, actual }: any) {
   return (
      <div className="grid grid-cols-3 items-center py-4 border-b border-slate-50 dark:border-slate-800 last:border-0">
         <span className="font-bold text-slate-900 dark:text-white">{label}</span>
         <div className="text-center">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Planned</p>
            <p className="font-bold">${planned.toLocaleString()}</p>
         </div>
         <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Actual</p>
            <p className="font-bold text-slate-300">${actual.toLocaleString()}</p>
         </div>
      </div>
   );
}
