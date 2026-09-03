"use client";

import { useState, useEffect } from "react";
import { 
  Bell, Search, Menu, Moon, Sun, User, 
  Settings, LogOut, Shield, Command, Sparkles, Activity,
  PanelLeftOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui.store";
import BreadCrumb from "./BreadCrumb";
import NotificationCenter from "./NotificationCenter";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Header() {
  const isSidebarCollapsed = useUIStore((state) => state.isSidebarCollapsed);
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const toggleMobileSidebar = useUIStore((state) => state.toggleMobileSidebar);

  const { setTheme, theme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const userRole = (session?.user as any)?.role || "USER";

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", ctrlKey: true }));
  };

  return (
    <header className="h-20 border-b border-border/60 bg-background/80 backdrop-blur-2xl px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Left: Mobile Toggle, Desktop Expand Toggle (when collapsed) & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-muted-foreground hover:bg-accent rounded-xl" 
          onClick={toggleMobileSidebar}
        >
          <Menu className="w-5 h-5" />
        </Button>

        {mounted && isSidebarCollapsed && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={toggleSidebar}
                aria-label="Expand Sidebar (⌘B)"
                className="hidden md:flex p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-gold-500/10 hover:border-gold-500/30 border border-border/60 transition-all active:scale-95 group shrink-0 cursor-pointer shadow-xs"
              >
                <PanelLeftOpen className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="bottom" sideOffset={8}>
              <span className="flex items-center gap-1.5 font-medium">
                <span>Expand Sidebar</span>
                <kbd className="px-1.5 py-0.5 rounded bg-accent border border-border text-[9px] font-mono text-muted-foreground">⌘B</kbd>
              </span>
            </TooltipContent>
          </Tooltip>
        )}

        <div className="hidden sm:block">
          <BreadCrumb />
        </div>
      </div>

      {/* Center: Command Bar Quick Launch Trigger */}
      <div className="hidden lg:flex items-center justify-center flex-1 max-w-md mx-6">
        <button
          onClick={handleOpenCommandPalette}
          className="w-full flex items-center justify-between px-4 py-2 rounded-2xl bg-card/70 hover:bg-card border border-border/80 hover:border-gold-500/40 text-muted-foreground hover:text-foreground text-xs shadow-xs hover:shadow-md transition-all group"
        >
          <span className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-gold-500 group-hover:scale-110 transition-transform" />
            <span className="font-medium text-foreground/75 group-hover:text-foreground">Search modules, records, AI commands...</span>
          </span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-accent text-[10px] font-mono border border-border text-foreground font-semibold shadow-xs">
            <Command className="w-3 h-3" /> K
          </kbd>
        </button>
      </div>

      {/* Right: Actions, Mobile Search, Notifications, Theme, Profile */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOpenCommandPalette}
          className="lg:hidden h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent border border-border/40"
          title="Search"
        >
          <Search className="w-4 h-4 text-gold-500" />
        </Button>

        {/* System Health Beacon */}
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 cursor-default shadow-xs hover:bg-emerald-500/15 transition-colors">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse ring-2 ring-emerald-500/25" />
              <span>Operational</span>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" sideOffset={8}>
            <div className="text-xs space-y-0.5 py-0.5">
              <div className="font-bold text-emerald-500">Tactical Node Active</div>
              <div className="text-muted-foreground text-[10px]">12 Nodes Synchronized • 42ms Latency</div>
            </div>
          </TooltipContent>
        </Tooltip>

        {/* Theme Switcher */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-gold-500/10 hover:border-gold-500/30 border border-border/50 transition-all shadow-xs"
          title="Toggle Theme"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="w-4 h-4 text-gold-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-gold-600 hover:-rotate-12 transition-transform" />
            )
          ) : (
            <div className="w-4 h-4" />
          )}
        </Button>

        {/* Notifications */}
        <NotificationCenter />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-3 p-1 rounded-2xl hover:bg-card/70 border border-transparent hover:border-border/60 transition-all cursor-pointer group select-none">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-bold text-foreground leading-none mb-1 group-hover:text-gold-500 transition-colors">
                  {session?.user?.name || "Enterprise User"}
                </span>
                <span className="text-[9px] font-extrabold text-gold-600 dark:text-gold-400 uppercase tracking-widest bg-gold-500/10 px-1.5 py-0.2 rounded border border-gold-500/25">
                  {userRole}
                </span>
              </div>
              <div className="relative">
                <div className="w-10 h-10 rounded-xl gold-gradient p-[2px] shadow-md shadow-gold-500/20 group-hover:scale-105 transition-transform">
                  <div className="w-full h-full rounded-[10px] bg-card flex items-center justify-center text-gold-500 font-extrabold text-sm border border-border/40">
                    {session?.user?.name?.[0] || "U"}
                  </div>
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-card animate-pulse" />
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 mt-3 p-2 rounded-2xl border border-border bg-card/95 backdrop-blur-3xl shadow-2xl animate-in slide-in-from-top-2 duration-200">
            <div className="px-3 py-2.5 mb-1">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Active Session</p>
              <h4 className="text-sm font-bold text-foreground truncate">{session?.user?.name || "Enterprise User"}</h4>
              <p className="text-xs text-muted-foreground truncate">{session?.user?.email || "user@injaazh.com"}</p>
            </div>
            
            <DropdownMenuSeparator className="bg-border/60 my-1" />
            
            <div className="p-1 space-y-1">
              <DropdownMenuItem 
                onClick={() => router.push("/profile")}
                className="flex items-center p-2 rounded-xl cursor-pointer hover:bg-accent text-xs font-medium group"
              >
                <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center mr-2.5 group-hover:bg-gold-500/20 group-hover:text-gold-500">
                  <User className="h-3.5 w-3.5" />
                </div>
                <span>Profile & Identity</span>
              </DropdownMenuItem>
              
              {userRole !== "USER" && (
                <DropdownMenuItem 
                  onClick={() => router.push("/settings")}
                  className="flex items-center p-2 rounded-xl cursor-pointer hover:bg-accent text-xs font-medium group"
                >
                  <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center mr-2.5 group-hover:bg-gold-500/20 group-hover:text-gold-500">
                    <Settings className="h-3.5 w-3.5" />
                  </div>
                  <span>System Configuration</span>
                </DropdownMenuItem>
              )}
            </div>

            <DropdownMenuSeparator className="bg-border/60 my-1" />
            
            <DropdownMenuItem 
              className="flex items-center p-2 rounded-xl cursor-pointer hover:bg-destructive/10 text-destructive text-xs font-semibold group" 
              onClick={() => signOut()}
            >
              <div className="w-7 h-7 rounded-lg bg-destructive/10 flex items-center justify-center mr-2.5 group-hover:bg-destructive/20">
                <LogOut className="h-3.5 w-3.5 text-destructive" />
              </div>
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
