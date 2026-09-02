"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Users, HeartHandshake, Package, 
  CircleDollarSign, ShoppingCart, Factory, Kanban, 
  BarChart3, Sparkles, Settings, ChevronLeft, ChevronRight,
  Shield, Building2, Bell, Truck, FileSpreadsheet
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui.store";
import { useSession } from "next-auth/react";

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
      { label: "AI Intelligence Hub", icon: Sparkles, href: "/ai-hub", module: "ai-hub", badge: "Neural", badgeColor: "bg-gold-500/10 text-gold-500 border-gold-500/30" },
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
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();
  const { data: session } = useSession();

  const userRole = (session?.user as any)?.role || "ADMIN";

  return (
    <aside 
      className={cn(
        "h-screen transition-all duration-300 flex flex-col relative z-40 border-r border-border/60 bg-card/60 backdrop-blur-3xl shadow-xl",
        isSidebarCollapsed ? "w-[76px]" : "w-[270px]"
      )}
    >
      {/* Brand Logo & Workspace Header */}
      <div className="h-20 flex items-center px-5 border-b border-border/50 overflow-hidden shrink-0 justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center text-obsidian-900 font-extrabold text-lg shrink-0 shadow-lg shadow-gold-500/20">
            I
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col truncate">
              <span className="font-extrabold text-base tracking-tight font-heading text-foreground">
                Injaazh<span className="gold-text">ERP</span>
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1">
                <Building2 className="w-2.5 h-2.5 text-gold-500" />
                Enterprise
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Collapse Toggle Floating Button - Desktop Only */}
      <button 
        onClick={toggleSidebar}
        title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        className="hidden md:flex absolute -right-3.5 top-24 w-7 h-7 rounded-full bg-card border border-border items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all z-50 shadow-md hover:scale-110 active:scale-95"
      >
        {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Nav Items List */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-5 px-3 custom-scrollbar space-y-6">
        {menuSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            {!isSidebarCollapsed && (
              <div className="px-3 pb-1.5 text-[10px] font-bold text-muted-foreground/70 uppercase tracking-widest">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              // Role-based restrictions
              if (userRole === "USER" && item.module !== "dashboard") {
                return null;
              }

              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link 
                  key={item.href} 
                  href={item.href}
                  title={isSidebarCollapsed ? item.label : undefined}
                  className="relative block"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePill"
                      className="absolute -left-3 top-1.5 bottom-1.5 w-1.5 bg-gold-400 rounded-r-full shadow-[0_0_12px_rgba(212,168,83,0.8)]"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <div
                    className={cn(
                      "group flex items-center rounded-xl px-3 py-2.5 transition-all text-sm font-medium relative",
                      isSidebarCollapsed && "justify-center px-0",
                      isActive 
                        ? "bg-gold-500/15 text-gold-600 dark:text-gold-300 font-semibold border border-gold-500/20 shadow-sm" 
                        : "hover:bg-accent/70 hover:text-foreground text-muted-foreground"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                      isActive ? "text-gold-500" : "text-muted-foreground group-hover:text-foreground"
                    )} />
                    
                    {!isSidebarCollapsed && (
                      <span className="ml-3 truncate text-xs flex-1">
                        {item.label}
                      </span>
                    )}

                    {!isSidebarCollapsed && item.badge && (
                      <span className={cn("ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded-full border uppercase tracking-wider", item.badgeColor)}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}
      </div>

      {/* User Status Bar at Bottom */}
      <div className="p-3 border-t border-border/50 bg-background/40">
        <div className={cn("flex items-center gap-3 p-2 rounded-xl glass-light", isSidebarCollapsed && "justify-center p-1.5")}>
          <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center font-bold text-obsidian-900 text-xs shrink-0 shadow-sm">
            {session?.user?.name?.[0] || "U"}
          </div>
          {!isSidebarCollapsed && (
            <div className="flex flex-col min-w-0 flex-1">
              <span className="text-xs font-semibold text-foreground truncate">{session?.user?.name || "Enterprise User"}</span>
              <span className="text-[10px] text-muted-foreground truncate uppercase font-bold tracking-wider">{userRole}</span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
