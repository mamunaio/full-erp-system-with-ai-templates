"use client";

import { useState, useEffect } from "react";
import { 
  Bell, Search, Menu, Moon, Sun, User, 
  Settings, LogOut, Shield, Command, Sparkles, Activity
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

export default function Header() {
  const { toggleMobileSidebar } = useUIStore();
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
      {/* Left: Mobile Toggle & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden text-muted-foreground hover:bg-accent rounded-xl" 
          onClick={toggleMobileSidebar}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <div className="hidden sm:block">
          <BreadCrumb />
        </div>
      </div>

      {/* Center: Command Bar Quick Launch Trigger */}
      <div className="hidden lg:flex items-center justify-center flex-1 max-w-md mx-6">
        <button
          onClick={handleOpenCommandPalette}
          className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-card/60 hover:bg-card border border-border/80 text-muted-foreground hover:text-foreground text-xs shadow-sm transition-all group"
        >
          <span className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gold-500 group-hover:scale-110 transition-transform" />
            <span>Search modules, records, AI commands...</span>
          </span>
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-lg bg-accent text-[10px] font-mono border border-border text-foreground font-semibold">
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
        <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-500">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Operational</span>
        </div>

        {/* Theme Switcher */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-10 w-10 rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent border border-border/40"
          title="Toggle Theme"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun className="w-4 h-4 text-gold-400 animate-in spin-in-180 duration-300" />
            ) : (
              <Moon className="w-4 h-4 text-gold-600 animate-in spin-in-180 duration-300" />
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
            <div className="flex items-center gap-3 pl-2 py-1 cursor-pointer group select-none">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs font-bold text-foreground leading-none mb-1">
                  {session?.user?.name || "Enterprise User"}
                </span>
                <span className="text-[9px] font-bold text-gold-500 uppercase tracking-widest bg-gold-500/10 px-1.5 py-0.5 rounded border border-gold-500/20">
                  {userRole}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl gold-gradient p-[2px] shadow-md shadow-gold-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full rounded-[10px] bg-card flex items-center justify-center text-gold-500 font-extrabold text-sm border border-border/40">
                  {session?.user?.name?.[0] || "U"}
                </div>
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
