"use client";

import { useState } from "react";
import { 
  Plus, Trash2, Save, Send, 
  FileDown, Eye, Calculator 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function InvoiceBuilder() {
  const [items, setItems] = useState([
    { id: 1, description: "", qty: 1, price: 0, tax: 0, total: 0 }
  ]);

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: "", qty: 1, price: 0, tax: 0, total: 0 }]);
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.qty * item.price), 0);
  const taxTotal = subtotal * 0.15; // Mock 15% tax
  const grandTotal = subtotal + taxTotal;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-20 animate-in fade-in duration-700">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          <div className="space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-injaazh-600 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-injaazh-600/20">
              I
            </div>
            <div>
              <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Bill To</h2>
              <select className="w-full md:w-64 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-xl py-2.5 px-4 text-sm outline-none">
                <option>Select Customer</option>
                <option>Meta Corp</option>
                <option>Tesla Inc</option>
              </select>
            </div>
          </div>
          <div className="space-y-4 md:text-right">
            <h1 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">Invoice</h1>
            <div className="space-y-2">
              <div className="flex md:justify-end items-center space-x-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Invoice #</span>
                <input type="text" defaultValue="INV-2024-001" className="bg-transparent border-b border-slate-200 dark:border-slate-800 text-sm font-bold text-right outline-none w-32" />
              </div>
              <div className="flex md:justify-end items-center space-x-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date</span>
                <input type="date" className="bg-transparent border-b border-slate-200 dark:border-slate-800 text-sm font-bold text-right outline-none" />
              </div>
              <div className="flex md:justify-end items-center space-x-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Due Date</span>
                <input type="date" className="bg-transparent border-b border-slate-200 dark:border-slate-800 text-sm font-bold text-right outline-none text-rose-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                <th className="py-4 pl-2">Description</th>
                <th className="py-4 w-24">Qty</th>
                <th className="py-4 w-32">Price</th>
                <th className="py-4 w-32">Amount</th>
                <th className="py-4 w-12"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-900">
              {items.map((item) => (
                <tr key={item.id} className="group">
                  <td className="py-4 pl-2">
                    <input 
                      type="text" 
                      placeholder="Item name or service description..."
                      className="w-full bg-transparent border-none focus:ring-0 text-sm font-medium outline-none"
                    />
                  </td>
                  <td className="py-4">
                    <input 
                      type="number" 
                      defaultValue={item.qty}
                      className="w-16 bg-slate-50 dark:bg-slate-950 border-none rounded-lg py-1 px-2 text-sm font-bold outline-none"
                    />
                  </td>
                  <td className="py-4">
                    <input 
                      type="number" 
                      placeholder="0.00"
                      className="w-24 bg-slate-50 dark:bg-slate-950 border-none rounded-lg py-1 px-2 text-sm font-bold outline-none"
                    />
                  </td>
                  <td className="py-4 font-bold text-slate-900 dark:text-white">$0.00</td>
                  <td className="py-4 text-right">
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Button 
            variant="ghost" 
            onClick={addItem}
            className="mt-4 text-injaazh-600 hover:text-injaazh-700 hover:bg-injaazh-50 font-bold text-xs"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Line Item
          </Button>
        </div>

        {/* Summary & Footer */}
        <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-slate-100 dark:border-slate-800">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Notes / Terms</h3>
            <textarea 
              placeholder="Enter payment instructions, terms or thank you note..."
              className="w-full h-32 bg-slate-50 dark:bg-slate-950 border-none rounded-2xl p-4 text-sm outline-none resize-none"
            />
          </div>
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-950/50 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Subtotal</span>
                <span className="font-bold">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Tax (15%)</span>
                <span className="font-bold text-amber-600">${taxTotal.toLocaleString()}</span>
              </div>
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-black text-injaazh-600">${grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center space-x-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 p-3 rounded-2xl shadow-2xl z-50">
        <Button variant="outline" className="rounded-xl h-12 px-6 border-slate-200 font-bold">
          <Save className="w-4 h-4 mr-2" /> Save Draft
        </Button>
        <Button variant="outline" className="rounded-xl h-12 px-6 border-slate-200 font-bold">
          <Eye className="w-4 h-4 mr-2" /> Preview
        </Button>
        <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-12 px-8 font-bold shadow-xl shadow-injaazh-600/30">
          <Send className="w-4 h-4 mr-2" /> Save & Send
        </Button>
      </div>
    </div>
  );
}
