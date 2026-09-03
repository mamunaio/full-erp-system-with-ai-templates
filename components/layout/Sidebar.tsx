"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Users, HeartHandshake, Package, 
  CircleDollarSign, ShoppingCart, Factory, Kanban, 
  BarChart3, Sparkles, Settings, 
  Building2, Truck, PanelLeftClose, PanelLeftOpen
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui.store";
import { useSession } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface MenuItem {
  label: string;
  icon: any;
  href: string;
  module: string;
  badge?: string;
  badgeColor?: string;
}

interface MenuSection {
  title: string;
  items: MenuItem[];
}

const menuSections: MenuSection[] = [
  {
    title: "Core Platform",
    items: [
      { label: "Command Center", icon: LayoutDashboard, href: "/dashboard", module: "dashboard" },
      { label: "AI Intelligence Hub", icon: Sparkles, href: "/ai-hub", module: "ai-hub", badge: "Neural", badgeColor: "bg-gold-500/15 text-gold-600 dark:text-gold-400 border-gold-500/30" },
      { label: "Analytics & KPIs", icon: BarChart3, href: "/analytics", module: "analytics" },
    ],
  },
  {
    title: "Operations & Sales",
    items: [
      { label: "CRM & Pipelines", icon: HeartHandshake, href: "/crm", module: "crm" },
      { label: "Sales & Orders", icon: ShoppingCart, href: "/sales", module: "sales" },
      { label: "Human Resources", icon: Users, href: "/hrm", module: "hrm" },
      { label: "Inventory & Assets", icon: Package, href: "/inventory", module: "inventory" },
      { label: "Supply Chain & PO", icon: Truck, href: "/procurement", module: "procurement" },
      { label: "Manufacturing / BOM", icon: Factory, href: "/manufacturing", module: "manufacturing" },
      { label: "Project Command", icon: Kanban, href: "/projects", module: "projects" },
    ],
  },
  {
    title: "Finance & Governance",
    items: [
      { label: "Master Ledger", icon: CircleDollarSign, href: "/finance", module: "finance" },
      { label: "System Settings", icon: Settings, href: "/settings", module: "settings" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isSidebarCollapsed = useUIStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const { data: session } = useSession();

  const userRole = (session?.user as any)?.role || "ADMIN";

  // Global Keyboard Shortcut: Ctrl+B or Cmd+B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  return (
    <aside 
      className={cn(
        "h-screen transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] flex flex-col relative z-40 border-r border-border/70 bg-card/85 backdrop-blur-3xl shadow-xl select-none",
        isSidebarCollapsed ? "w-[80px]" : "w-[276px]"
      )}
    >
      {/* Brand Logo & Workspace Header */}
      <div className="h-20 flex items-center px-4 border-b border-border/60 overflow-hidden shrink-0 justify-between relative bg-background/40">
        {isSidebarCollapsed ? (
          <div className="w-full flex justify-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleSidebar}
                  aria-label="Expand Sidebar (⌘B)"
                  className="w-11 h-11 rounded-2xl gold-gradient flex items-center justify-center text-obsidian-950 font-black text-lg shadow-lg shadow-gold-500/25 hover:scale-105 hover:shadow-gold-500/40 transition-all group relative cursor-pointer"
                >
                  <span className="group-hover:hidden font-black">I</span>
                  <PanelLeftOpen className="w-5 h-5 hidden group-hover:block text-obsidian-950 transition-transform" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={14}>
                <span className="flex items-center gap-1.5 font-medium">
                  <span>Expand Sidebar</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-accent border border-border text-[9px] font-mono text-muted-foreground">⌘B</kbd>
                </span>
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <>
            <Link 
              href="/dashboard" 
              className="flex items-center gap-3 overflow-hidden group transition-all"
            >
              <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center text-obsidian-950 font-black text-lg shrink-0 shadow-lg shadow-gold-500/25 group-hover:scale-105 group-hover:shadow-gold-500/40 transition-all">
                I
              </div>
              <div className="flex flex-col truncate">
                <span className="font-extrabold text-base tracking-tight font-heading text-foreground group-hover:text-gold-500 transition-colors">
                  Injaazh<span className="gold-text">ERP</span>
                </span>
                <span className="text-[10px] font-bold text-muted-foreground/90 dark:text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                  <Building2 className="w-2.5 h-2.5 text-gold-500" />
                  Enterprise Cockpit
                </span>
              </div>
            </Link>

            {/* Integrated Header Collapse Button */}
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={toggleSidebar}
                  aria-label="Collapse Sidebar"
                  className="hidden md:flex p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-gold-500/10 hover:border-gold-500/30 border border-transparent transition-all active:scale-95 group shrink-0 cursor-pointer"
                >
                  <PanelLeftClose className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 transition-colors" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={8}>
                <span className="flex items-center gap-1.5 font-medium">
                  <span>Collapse Sidebar</span>
                  <kbd className="px-1.5 py-0.5 rounded bg-accent border border-border text-[9px] font-mono text-muted-foreground">⌘B</kbd>
                </span>
              </TooltipContent>
            </Tooltip>
          </>
        )}
      </div>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-2.5 custom-scrollbar space-y-4">
        {menuSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!isSidebarCollapsed ? (
              <div className="px-3 pb-1.5 text-[10px] font-extrabold text-foreground/75 dark:text-muted-foreground/75 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500/70" />
                <span>{section.title}</span>
              </div>
            ) : (
              sIdx > 0 && (
                <div className="w-full flex justify-center py-1.5">
                  <div className="w-6 h-[1px] bg-border/70 rounded-full" />
                </div>
              )
            )}

            {section.items.map((item) => {
              if (userRole === "USER" && item.module !== "dashboard") {
                return null;
              }

              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              // Collapsed Mode Squircle Button
              if (isSidebarCollapsed) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link 
                        href={item.href}
                        className="flex justify-center my-1"
                      >
                        <div
                          className={cn(
                            "w-11 h-11 rounded-2xl flex items-center justify-center transition-all relative group cursor-pointer",
                            isActive 
                              ? "bg-gold-500/[0.18] dark:bg-gold-500/[0.22] border border-gold-500/50 text-gold-600 dark:text-gold-400 shadow-md shadow-gold-500/20 scale-105" 
                              : "bg-card/40 hover:bg-card border border-border/50 hover:border-gold-500/40 text-foreground/70 dark:text-muted-foreground hover:text-gold-500 hover:scale-105 shadow-2xs hover:shadow-md"
                          )}
                        >
                          <item.icon className={cn(
                            "w-5 h-5 transition-transform group-hover:scale-110",
                            isActive ? "text-gold-500 dark:text-gold-400" : "text-foreground/70 dark:text-muted-foreground group-hover:text-gold-500"
                          )} />

                          {isActive && (
                            <span className="absolute -left-1 top-2.5 bottom-2.5 w-1 rounded-r-full bg-gold-500 shadow-[0_0_8px_rgba(212,168,83,0.9)]" />
                          )}
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={14} className="flex items-center gap-2 py-1.5 px-3">
                      <span className="font-bold text-xs">{item.label}</span>
                      {item.badge && (
                        <span className={cn("text-[8px] font-extrabold px-1.5 py-0.5 rounded-full border uppercase", item.badgeColor)}>
                          {item.badge}
                        </span>
                      )}
                    </TooltipContent>
                  </Tooltip>
                );
              }

              // Expanded Mode Full-Width Pill
              return (
                <div key={item.href}>
                  <Link 
                    href={item.href}
                    className="relative block my-0.5"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="absolute -left-2.5 top-1.5 bottom-1.5 w-1 bg-gradient-to-b from-amber-400 via-gold-500 to-amber-600 rounded-r-full shadow-[0_0_12px_rgba(212,168,83,0.9)]"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    <div
                      className={cn(
                        "group flex items-center rounded-xl px-3 py-2.5 transition-all text-xs font-semibold relative h-10",
                        isActive 
                          ? "bg-gold-500/[0.14] dark:bg-gold-500/[0.18] text-foreground font-bold border border-gold-500/35 shadow-sm" 
                          : "text-foreground/85 dark:text-muted-foreground hover:bg-gold-500/[0.08] hover:text-foreground hover:border-gold-500/25 border border-transparent"
                      )}
                    >
                      <item.icon className={cn(
                        "w-4 h-4 shrink-0 transition-all group-hover:scale-110",
                        isActive 
                          ? "text-gold-500 dark:text-gold-400 scale-105" 
                          : "text-foreground/70 dark:text-muted-foreground group-hover:text-gold-500"
                      )} />
                      
                      <span className="ml-3 truncate flex-1 font-medium text-xs">
                        {item.label}
                      </span>

                      {item.badge && (
                        <span className={cn("ml-auto text-[9px] font-extrabold px-1.5 py-0.5 rounded-full border uppercase tracking-wider", item.badgeColor)}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Status Bar at Bottom */}
      <div className="p-3 border-t border-border/60 bg-background/40">
        {isSidebarCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center p-1 rounded-2xl glass-light cursor-pointer hover:border-gold-500/40 border border-border/60 transition-all group">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center font-black text-obsidian-950 text-xs shadow-md group-hover:scale-105 transition-transform">
                    {session?.user?.name?.[0] || "U"}
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-card animate-pulse" />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={14} className="space-y-1 py-2 px-3">
              <div className="font-bold text-xs text-foreground">{session?.user?.name || "Enterprise User"}</div>
              <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-semibold uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{userRole} • Active Node</span>
              </div>
            </TooltipContent>
          </Tooltip>
        ) : (
          <div className="flex items-center gap-3 p-2.5 rounded-2xl glass-light border border-border/70 hover:border-gold-500/40 transition-all shadow-sm group">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center font-black text-obsidian-950 text-xs shadow-md shadow-gold-500/20 group-hover:scale-105 transition-transform">
                {session?.user?.name?.[0] || "U"}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-card animate-pulse" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-bold text-foreground truncate group-hover:text-gold-500 transition-colors">
                {session?.user?.name || "Enterprise User"}
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-1.5 py-0.2 rounded border border-gold-500/25 uppercase tracking-wider">
                  {userRole}
                </span>
                <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  Live
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
