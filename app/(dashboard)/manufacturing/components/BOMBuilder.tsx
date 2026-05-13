"use client";

import { useState } from "react";
import { 
  Plus, Trash2, Save, Layers, 
  ChevronRight, Calculator 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BOMBuilder() {
  const [items, setItems] = useState([
    { id: 1, productId: "", quantity: 1, unit: "pcs", cost: 0, wastage: 0 }
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), productId: "", quantity: 1, unit: "pcs", cost: 0, wastage: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const totalMaterialCost = items.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
  const laborCost = 45.00;
  const overhead = totalMaterialCost * 0.1;
  const grandTotal = totalMaterialCost + laborCost + overhead;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
        {/* Header Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-injaazh-600 flex items-center justify-center text-white font-black text-2xl shadow-lg">
                B
              </div>
              <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Bill of Materials</h1>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Version Control: v1.0</p>
              </div>
            </div>
            
            <div className="space-y-4">
               <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Target Finished Product</label>
                  <select className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm outline-none">
                    <option>Select Product...</option>
                    <option>Injaazh Server Pro X1</option>
                  </select>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">BOM Name</label>
                    <input type="text" placeholder="Standard Assembly" className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl py-2 px-4 text-sm outline-none" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Output Qty</label>
                    <input type="number" defaultValue={1} className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl py-2 px-4 text-sm outline-none" />
                  </div>
               </div>
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/50 rounded-3xl p-6 space-y-4 border border-slate-100 dark:border-slate-800">
             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center">
                <Calculator className="w-4 h-4 mr-2" /> Costing Summary
             </h3>
             <div className="space-y-3">
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Materials Total</span>
                   <span className="font-bold">${totalMaterialCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Labor (Planned)</span>
                   <span className="font-bold">${laborCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                   <span className="text-slate-500">Overhead (10%)</span>
                   <span className="font-bold">${overhead.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                   <span className="text-lg font-bold">Unit Cost</span>
                   <span className="text-2xl font-black text-injaazh-600">${grandTotal.toFixed(2)}</span>
                </div>
             </div>
          </div>
        </div>

        {/* Components Table */}
        <div className="space-y-4">
           <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
                 <Layers className="w-4 h-4 mr-2 text-injaazh-600" /> Components & Raw Materials
              </h3>
              <Button variant="ghost" size="sm" onClick={addItem} className="text-injaazh-600 font-bold text-xs h-8">
                <Plus className="w-3 h-3 mr-1.5" /> Add Row
              </Button>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    <th className="py-4 pl-2">Component / Raw Material</th>
                    <th className="py-4 w-24">Qty</th>
                    <th className="py-4 w-20">UOM</th>
                    <th className="py-4 w-24">Wastage %</th>
                    <th className="py-4 w-32">Unit Cost</th>
                    <th className="py-4 w-32">Total</th>
                    <th className="py-4 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
                  {items.map((item) => (
                    <tr key={item.id} className="group">
                      <td className="py-4 pl-2">
                        <select className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium outline-none">
                          <option>Select Material...</option>
                          <option>CPU Intel i9</option>
                          <option>Motherboard X570</option>
                        </select>
                      </td>
                      <td className="py-4">
                        <input type="number" defaultValue={item.quantity} className="w-16 bg-slate-50 dark:bg-slate-950 border-none rounded-lg py-1 px-2 text-sm font-bold outline-none" />
                      </td>
                      <td className="py-4 text-slate-400 text-xs">pcs</td>
                      <td className="py-4">
                        <input type="number" defaultValue={0} className="w-12 bg-transparent border-none text-sm outline-none" />
                      </td>
                      <td className="py-4 font-mono text-xs text-slate-500">$0.00</td>
                      <td className="py-4 font-bold text-slate-900 dark:text-white">$0.00</td>
                      <td className="py-4 text-right">
                        <button onClick={() => removeItem(item.id)} className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
           </div>
        </div>
      </div>

      {/* Floating Actions */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-2xl z-50">
        <Button variant="outline" className="rounded-xl h-12 px-6 border-slate-200 font-bold">Preview Tree</Button>
        <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-12 px-10 font-bold shadow-xl shadow-injaazh-600/30">
          <Save className="w-4 h-4 mr-2" /> Save BOM
        </Button>
      </div>
    </div>
  );
}
