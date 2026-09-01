"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, FileText, Users, 
  Settings, Package, Sparkles,
  Command, X, ArrowRight, Zap,
  CircleDollarSign, HeartHandshake,
  Bot, Factory, Kanban, ShieldCheck
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  name: string;
  category: "Modules" | "Fast Actions" | "AI Neural Tools";
  icon: any;
  href?: string;
  action?: () => void;
  badge?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const commandItems: CommandItem[] = [
    { id: "mod-dash", name: "Command Center Dashboard", category: "Modules", icon: Sparkles, href: "/dashboard" },
    { id: "mod-crm", name: "CRM & Deal Pipelines", category: "Modules", icon: HeartHandshake, href: "/crm" },
    { id: "mod-hrm", name: "Human Resources (HRM)", category: "Modules", icon: Users, href: "/hrm" },
    { id: "mod-inv", name: "Inventory & Stock Matrix", category: "Modules", icon: Package, href: "/inventory" },
    { id: "mod-fin", name: "Finance & Master Ledger", category: "Modules", icon: CircleDollarSign, href: "/finance" },
    { id: "mod-ai", name: "AI Intelligence Hub", category: "Modules", icon: Bot, href: "/ai-hub", badge: "Gemini 1.5" },
    { id: "mod-proj", name: "Project Command & Tasks", category: "Modules", icon: Kanban, href: "/projects" },
    { id: "mod-manuf", name: "Manufacturing & BOMs", category: "Modules", icon: Factory, href: "/manufacturing" },
    { id: "mod-set", name: "System Configuration & RBAC", category: "Modules", icon: Settings, href: "/settings" },

    { id: "act-lead", name: "Create New CRM Lead", category: "Fast Actions", icon: Zap, href: "/crm/leads" },
    { id: "act-inv", name: "Generate Financial Invoice", category: "Fast Actions", icon: FileText, href: "/finance" },
    { id: "act-stock", name: "Audit Low Stock SKUs", category: "Fast Actions", icon: Package, href: "/inventory" },

    { id: "ai-rev", name: "AI Forecast: Revenue Trajectory for Q4", category: "AI Neural Tools", icon: Sparkles, href: "/ai-hub" },
    { id: "ai-risk", name: "AI Pulse: Run Enterprise Risk Diagnostic", category: "AI Neural Tools", icon: Bot, href: "/ai-hub" },
  ];

  const filteredItems = commandItems.filter(item => 
    item.name.toLowerCase().includes(query.toLowerCase()) || 
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const handleSelect = (item: CommandItem) => {
    setIsOpen(false);
    if (item.href) {
      router.push(item.href);
    } else if (item.action) {
      item.action();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % (filteredItems.length || 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % (filteredItems.length || 1));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4 bg-background/70 backdrop-blur-md">
          <div className="fixed inset-0" onClick={() => setIsOpen(false)} />

          <motion.div 
            initial={{ opacity: 0, scale: 0.96, y: -15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-2xl bg-card/95 backdrop-blur-3xl rounded-3xl border border-border/80 shadow-2xl overflow-hidden relative z-10"
          >
            {/* Input Bar */}
            <div className="p-4 sm:p-5 border-b border-border/60 flex items-center gap-3">
              <Search className="w-5 h-5 text-gold-500 shrink-0 ml-1" />
              <input 
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search modules, records, or ask AI... (↑ ↓ to navigate)"
                className="flex-1 bg-transparent border-none text-base font-semibold outline-none text-foreground placeholder:text-muted-foreground"
              />
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results Section */}
            <div className="max-h-[380px] overflow-y-auto p-3 custom-scrollbar space-y-4">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  No matching commands found for &ldquo;{query}&rdquo;
                </div>
              ) : (
                ["Modules", "Fast Actions", "AI Neural Tools"].map((cat) => {
                  const itemsInCat = filteredItems.filter(i => i.category === cat);
                  if (itemsInCat.length === 0) return null;

                  return (
                    <div key={cat} className="space-y-1">
                      <div className="px-3 py-1 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {cat}
                      </div>
                      {itemsInCat.map((item) => {
                        const globalIdx = filteredItems.findIndex(x => x.id === item.id);
                        const isSelected = selectedIndex === globalIdx;

                        return (
                          <button 
                            key={item.id}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setSelectedIndex(globalIdx)}
                            className={cn(
                              "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all text-left text-sm font-medium",
                              isSelected 
                                ? "bg-gold-500/15 text-gold-600 dark:text-gold-300 border border-gold-500/30 shadow-sm" 
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-7 h-7 rounded-lg flex items-center justify-center transition-colors",
                                isSelected ? "bg-gold-500/20 text-gold-500" : "bg-accent text-muted-foreground"
                              )}>
                                <item.icon className="w-3.5 h-3.5" />
                              </div>
                              <span className={cn("text-xs font-semibold", isSelected && "text-foreground")}>
                                {item.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {item.badge && (
                                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-gold-500/10 text-gold-500 border border-gold-500/20">
                                  {item.badge}
                                </span>
                              )}
                              <ArrowRight className={cn("w-3.5 h-3.5 opacity-0 transition-opacity", isSelected && "opacity-100 text-gold-500")} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Hints */}
            <div className="p-3.5 bg-background/50 border-t border-border/50 flex items-center justify-between text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-accent border border-border">↵</kbd> Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-accent border border-border">↑</kbd>
                  <kbd className="px-1.5 py-0.5 rounded bg-accent border border-border">↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-accent border border-border">ESC</kbd> Close
                </span>
              </div>
              <span className="gold-text font-bold">Injaazh Command Palette</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
