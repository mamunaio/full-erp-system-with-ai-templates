"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Users, HeartHandshake, Package, 
  CircleDollarSign, ShoppingCart, Factory, Kanban, 
  BarChart3, Sparkles, Settings, ChevronLeft, ChevronRight,
  UserCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/store/ui.store";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", module: "dashboard" },
  { label: "HRM", icon: Users, href: "/hrm", module: "hrm", children: [
    { label: "Employees", href: "/hrm/employees" },
    { label: "Attendance", href: "/hrm/attendance" },
    { label: "Leave", href: "/hrm/leave" },
    { label: "Payroll", href: "/hrm/payroll" },
  ]},
  { label: "CRM", icon: HeartHandshake, href: "/crm", module: "crm", children: [
    { label: "Contacts", href: "/crm/contacts" },
    { label: "Leads", href: "/crm/leads" },
    { label: "Activities", href: "/crm/activities" },
  ]},
  { label: "Inventory", icon: Package, href: "/inventory", module: "inventory", children: [
    { label: "Products", href: "/inventory/products" },
    { label: "Stock", href: "/inventory/stock" },
    { label: "Warehouses", href: "/inventory/warehouses" },
  ]},
  { label: "Finance", icon: CircleDollarSign, href: "/finance", module: "finance" },
  { label: "Sales", icon: ShoppingCart, href: "/sales", module: "sales" },
  { label: "Manufacturing", icon: Factory, href: "/manufacturing", module: "manufacturing" },
  { label: "Projects", icon: Kanban, href: "/projects", module: "projects" },
  { label: "Analytics", icon: BarChart3, href: "/analytics", module: "analytics" },
  { label: "AI Hub", icon: Sparkles, href: "/ai-hub", module: "ai-hub", premium: true },
  { label: "Settings", icon: Settings, href: "/settings", module: "settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarCollapsed, toggleSidebar } = useUIStore();
  const { data: session } = useSession();

  return (
    <aside 
      className={cn(
        "h-screen transition-all duration-300 flex flex-col relative z-40 border-r border-border/50 glass backdrop-blur-2xl",
        isSidebarCollapsed ? "w-20" : "w-72"
      )}
    >
      {/* Brand Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border/50 overflow-hidden shrink-0">
        <div className="w-8 h-8 rounded-lg gold-gradient flex items-center justify-center text-obsidian-900 font-bold shrink-0 shadow-lg shadow-gold-400/30">
          I
        </div>
        {!isSidebarCollapsed && (
          <span className="ml-3 font-bold text-xl text-foreground tracking-tight animate-in fade-in slide-in-from-left-2 font-heading">
            Injaazh<span className="text-gold-400">ERP</span>
          </span>
        )}
      </div>

      {/* Collapse Toggle */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-accent transition-all z-50 shadow-sm"
      >
        {isSidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Nav Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden py-6 px-3 scrollbar-thin">
        <div className="space-y-1">
          {menuItems.map((item) => {
            // Role-based filtering
            const userRole = (session?.user as any)?.role;
            if (userRole === "USER" && item.module !== "dashboard") {
              return null;
            }

            const isActive = pathname.startsWith(item.href);
            
            return (
              <Link 
                key={item.label} 
                href={item.href}
                className="relative block"
              >
                {isActive && (
                  <div className="absolute -left-3 top-2 bottom-2 w-1 bg-gold-400 rounded-r-full shadow-[0_0_12px_rgba(212,168,83,0.5)] z-10" />
                )}
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className={cn(
                    "group flex items-center rounded-xl px-3 py-2.5 transition-all relative",
                    isActive 
                      ? "bg-gold-400/10 text-gold-400 font-medium" 
                      : "hover:bg-accent/50 hover:text-foreground text-muted-foreground"
                  )}
                >
                  <item.icon className={cn(
                    "w-5 h-5 shrink-0 transition-transform group-hover:scale-110",
                    isActive ? "text-gold-400" : "text-muted-foreground"
                  )} />
                  {!isSidebarCollapsed && (
                    <span className="ml-3 truncate animate-in fade-in duration-500 text-sm">
                      {item.label}
                    </span>
                  )}
                  {item.premium && !isSidebarCollapsed && (
                    <div className="ml-auto">
                      <Sparkles className="w-3 h-3 text-gold-400" />
                    </div>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>

    </aside>
  );
}
