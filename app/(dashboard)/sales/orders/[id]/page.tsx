import { Metadata } from "next";
import OrderTimeline from "../../components/OrderTimeline";
import { 
  Package, Truck, FileCheck, 
  CreditCard, ArrowLeft, Printer,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order Details | Injaazh ERP",
};

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex items-center justify-between">
        <Link href="/sales/orders" className="group flex items-center text-sm font-medium text-slate-500 hover:text-injaazh-600 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Orders
        </Link>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-10"><Printer className="w-4 h-4 mr-2" /> Print Order</Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-10">Confirm Order</Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
            Order #SO-2024-005
            <span className="ml-4 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
              Confirmed
            </span>
          </h1>
          <p className="text-slate-500 text-sm mt-1">Placed on May 12, 2026 • 8 items • Total $14,200</p>
        </div>
        <div className="flex -space-x-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-slate-100 flex items-center justify-center font-bold text-xs">U</div>
          ))}
          <div className="w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 bg-injaazh-600 text-white flex items-center justify-center font-bold text-[10px]">+2</div>
        </div>
      </div>

      <OrderTimeline currentStatus="CONFIRMED" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Order Items */}
          <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
            <h3 className="font-bold mb-6 flex items-center"><Package className="w-5 h-5 mr-2 text-injaazh-600" /> Order Items</h3>
            <div className="space-y-6">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between pb-6 border-b border-slate-50 dark:border-slate-800 last:border-0 last:pb-0">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-950 flex items-center justify-center text-slate-300">
                      <Package className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Cisco Switch 24P</h4>
                      <p className="text-xs text-slate-500">Qty: 2 • Price: $450.00</p>
                    </div>
                  </div>
                  <p className="font-bold text-lg">$900.00</p>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
               <div className="flex justify-between text-sm"><span className="text-slate-500">Subtotal</span><span className="font-bold">$12,347.00</span></div>
               <div className="flex justify-between text-sm"><span className="text-slate-500">Shipping</span><span className="font-bold">$50.00</span></div>
               <div className="flex justify-between text-lg font-black pt-2"><span className="text-slate-900 dark:text-white">Total</span><span className="text-injaazh-600">$14,200.00</span></div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
           {/* Customer Info */}
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <h3 className="font-bold mb-6">Customer Details</h3>
              <div className="space-y-4">
                 <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-injaazh-100 text-injaazh-600 flex items-center justify-center font-bold">AR</div>
                    <div>
                       <p className="font-bold">Alex Rivera</p>
                       <p className="text-xs text-slate-500">TechFlow Inc.</p>
                    </div>
                 </div>
                 <div className="pt-4 border-t border-slate-50 dark:border-slate-800 space-y-2">
                    <p className="text-xs text-slate-500 leading-relaxed">
                       123 Business Ave, Suite 400<br/>San Francisco, CA 94107
                    </p>
                 </div>
              </div>
           </div>

           {/* Next Action Card */}
           <div className="bg-gradient-to-tr from-injaazh-600 to-blue-700 rounded-[32px] p-8 text-white shadow-xl shadow-injaazh-600/20 relative overflow-hidden">
              <div className="relative z-10 space-y-4">
                 <div className="flex items-center text-white/80 text-xs font-bold uppercase tracking-widest">
                    <Sparkles className="w-4 h-4 mr-2" /> AI Next Action
                 </div>
                 <h3 className="text-xl font-bold">Process & Ship</h3>
                 <p className="text-sm text-white/70">Inventory has enough stock. Recommended: Process now to meet the 48h delivery goal.</p>
                 <Button className="w-full bg-white text-injaazh-600 font-bold rounded-xl h-12 shadow-lg">Start Picking</Button>
              </div>
              <div className="absolute right-[-20px] bottom-[-20px] w-32 h-32 bg-white/10 rounded-full blur-3xl" />
           </div>
        </div>
      </div>
    </div>
  );
}
