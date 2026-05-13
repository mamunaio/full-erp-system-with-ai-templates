"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, FileText, Users, 
  Settings, Box, Sparkles,
  Command, X, ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const results = [
    { category: "Pages", items: ["Dashboard", "Employee List", "Invoices", "Analytics"] },
    { category: "Actions", items: ["Create Invoice", "Add Employee", "Generate Report"] },
    { category: "AI", items: ["Ask Gemini: Explain Revenue", "Forecast next month"] },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-24 px-4 bg-slate-900/60 backdrop-blur-sm">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center space-x-4">
               <Search className="w-6 h-6 text-injaazh-600" />
               <input 
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything... (Ctrl + K)"
                className="flex-1 bg-transparent border-none text-lg font-bold outline-none text-slate-900 dark:text-white placeholder:text-slate-300"
               />
               <button onClick={() => setIsOpen(false)} className="p-2 text-slate-300 hover:text-slate-600">
                  <X className="w-5 h-5" />
               </button>
            </div>

            <div className="max-h-[400px] overflow-y-auto p-4 custom-scrollbar">
               {results.map((group) => (
                 <div key={group.category} className="mb-6 last:mb-0">
                    <h3 className="px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{group.category}</h3>
                    <div className="space-y-1">
                       {group.items.map((item) => (
                         <button 
                          key={item}
                          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group"
                         >
                            <div className="flex items-center space-x-3 text-sm font-bold text-slate-700 dark:text-slate-200">
                               <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-injaazh-600 group-hover:text-white transition-colors">
                                  {group.category === "Pages" ? <FileText className="w-4 h-4" /> : 
                                   group.category === "AI" ? <Sparkles className="w-4 h-4" /> : <Zap className="w-4 h-4" />}
                               </div>
                               <span>{item}</span>
                            </div>
                            <ArrowRight className="w-4 h-4 text-slate-200 group-hover:text-injaazh-600 transition-colors" />
                         </button>
                       ))}
                    </div>
                 </div>
               ))}
            </div>

            <div className="p-4 bg-slate-50/50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
               <div className="flex items-center space-x-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  <span className="flex items-center"><Command className="w-3 h-3 mr-1" /> K to search</span>
                  <span className="flex items-center"><div className="w-6 h-4 bg-white dark:bg-slate-800 border rounded flex items-center justify-center text-[8px] mr-1">ESC</div> to close</span>
               </div>
               <span className="text-[10px] font-bold text-injaazh-600 uppercase tracking-widest">Injaazh Global Search v1.0</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
