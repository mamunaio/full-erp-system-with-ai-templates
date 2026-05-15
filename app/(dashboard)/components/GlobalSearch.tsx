"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Command, Users, FileText, Settings, Package, LayoutDashboard, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  { id: "1", name: "Dashboard", category: "Pages", icon: LayoutDashboard, url: "/dashboard" },
  { id: "2", name: "Employee Directory", category: "HRM", icon: Users, url: "/hrm/employees" },
  { id: "3", name: "Attendance Tracking", category: "HRM", icon: FileText, url: "/hrm/attendance" },
  { id: "4", name: "Payroll Management", category: "HRM", icon: FileText, url: "/hrm/payroll" },
  { id: "5", name: "Inventory Products", category: "Inventory", icon: Package, url: "/inventory" },
  { id: "6", name: "System Settings", category: "Settings", icon: Settings, url: "/settings" },
];

export default function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
    setSelectedIndex(0);
  }, []);

  const filteredItems = query === "" 
    ? items 
    : items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        setIsOpen(false);
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredItems.length);
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
      }

      if (e.key === "Enter") {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex].url);
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [toggle, isOpen, filteredItems, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleSelect = (url: string) => {
    router.push(url);
    setIsOpen(false);
    setQuery("");
  };

  return (
    <>
      {/* Search Input Trigger */}
      <button 
        onClick={toggle}
        className="hidden md:flex items-center space-x-3 w-96 px-4 py-2 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 hover:border-injaazh-400 hover:bg-white dark:hover:bg-slate-900 transition-all group"
      >
        <Search className="w-4 h-4 group-hover:text-injaazh-500 transition-colors" />
        <span className="text-sm flex-1 text-left">Search anything...</span>
        <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-slate-100 dark:bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-500 opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Search Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsOpen(false)} 
          />
          
          <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-injaazh-900/20 border border-slate-200 dark:border-slate-800 overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Input Header */}
            <div className="flex items-center px-4 py-4 border-b border-slate-100 dark:border-slate-800">
              <Search className="w-5 h-5 text-injaazh-500 mr-3" />
              <input 
                autoFocus
                placeholder="Search pages, employees, reports..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-base placeholder:text-slate-400"
              />
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results Body */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-slate-500">
                  <p className="text-sm">No results found for "{query}"</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {["Pages", "HRM", "Inventory", "Settings"].map((cat) => {
                    const catItems = filteredItems.filter(i => i.category === cat);
                    if (catItems.length === 0) return null;
                    return (
                      <div key={cat} className="px-2">
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-2">{cat}</h4>
                        <div className="space-y-1">
                          {catItems.map((item) => {
                            const isSelected = filteredItems[selectedIndex]?.id === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => handleSelect(item.url)}
                                className={cn(
                                  "w-full flex items-center px-3 py-3 rounded-xl group transition-all",
                                  isSelected ? "bg-injaazh-50 dark:bg-injaazh-950/30" : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                )}
                              >
                                <div className={cn(
                                  "w-9 h-9 rounded-lg flex items-center justify-center mr-3 transition-colors",
                                  isSelected ? "bg-injaazh-100 dark:bg-injaazh-900" : "bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                                )}>
                                  <item.icon className={cn(
                                    "w-4 h-4 transition-colors",
                                    isSelected ? "text-injaazh-600" : "text-slate-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
                                  )} />
                                </div>
                                <span className={cn(
                                  "flex-1 text-left text-sm font-medium transition-colors",
                                  isSelected ? "text-injaazh-700 dark:text-injaazh-300" : "text-slate-700 dark:text-slate-200"
                                )}>
                                  {item.name}
                                </span>
                                <kbd className={cn(
                                  "transition-opacity hidden sm:inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium transition-all",
                                  isSelected ? "opacity-100 bg-injaazh-100 border-injaazh-200 text-injaazh-600" : "opacity-0 group-hover:opacity-100 bg-white dark:bg-slate-800 border-slate-200 text-slate-400"
                                )}>
                                  Enter
                                </kbd>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Help */}
            <div className="px-4 py-3 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px] text-slate-400">
              <div className="flex items-center space-x-4">
                <span className="flex items-center gap-1"><kbd className="bg-white dark:bg-slate-800 px-1 rounded border">↑↓</kbd> to navigate</span>
                <span className="flex items-center gap-1"><kbd className="bg-white dark:bg-slate-800 px-1 rounded border">Enter</kbd> to select</span>
              </div>
              <span>Press <kbd className="bg-white dark:bg-slate-800 px-1 rounded border">Esc</kbd> to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
