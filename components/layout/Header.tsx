"use client";

import { useState, useEffect } from "react";
import { Bell, Search, Menu, Moon, Sun, User, Settings, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui.store";
import BreadCrumb from "./BreadCrumb";
import GlobalSearch from "@/app/(dashboard)/components/GlobalSearch";
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

  const userRole = (session?.user as any)?.role;

  return (
    <header className="h-20 border-b border-border/50 bg-background/80 backdrop-blur-xl px-4 md:px-10 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      <div className="flex items-center gap-6">
        <Button variant="ghost" size="icon" className="md:hidden text-muted-foreground hover:bg-accent/50 rounded-xl" onClick={toggleMobileSidebar}>
          <Menu className="w-5 h-5" />
        </Button>
        <div className="hidden md:block">
          <BreadCrumb />
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-12 hidden lg:block">
        <GlobalSearch />
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-11 w-11 rounded-xl text-muted-foreground hover:bg-accent/50 transition-all border border-transparent hover:border-border"
        >
          {mounted ? (
            theme === "dark" ? <Sun className="w-5 h-5 text-gold-400 animate-in spin-in-180 duration-500" /> : <Moon className="w-5 h-5 text-gold-500 animate-in spin-in-180 duration-500" />
          ) : (
            <div className="w-5 h-5" />
          )}
        </Button>

        <NotificationCenter />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center gap-4 pl-3 py-1 cursor-pointer group">
              <div className="hidden md:flex flex-col items-end transition-transform group-hover:-translate-x-1 duration-300">
                <span className="text-sm font-medium text-foreground leading-none mb-1">
                  {session?.user?.name || "User"}
                </span>
                <div className="flex items-center gap-1.5 opacity-50">
                  <Shield className="w-2.5 h-2.5 text-gold-500" />
                  <span className="text-[9px] font-semibold text-muted-foreground uppercase tracking-[0.15em]">{userRole || "USER"}</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-xl gold-gradient p-[2px] shadow-lg shadow-gold-400/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-[10px] bg-card flex items-center justify-center text-gold-500 font-bold text-sm border border-border/50">
                  {session?.user?.name?.[0] || "U"}
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 mt-4 p-2 rounded-xl animate-in slide-in-from-top-2 duration-300">
            <div className="px-3 py-3 mb-1">
               <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.15em] mb-1">Authenticated Account</p>
               <h4 className="text-sm font-semibold text-foreground">{session?.user?.name || "User"}</h4>
            </div>
            
            <DropdownMenuSeparator className="bg-border/50 mx-1" />
            
            <div className="p-1 space-y-1 mt-1">
               <DropdownMenuItem 
                onClick={() => router.push("/profile")}
                className="flex items-center p-2.5 rounded-lg cursor-pointer hover:bg-accent/50 transition-all group"
               >
                 <div className="w-8 h-8 rounded-lg bg-accent/50 flex items-center justify-center mr-3 group-hover:bg-gold-400/20 group-hover:text-gold-400 transition-all">
                    <User className="h-4 w-4" />
                 </div>
                 <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">Profile Identity</span>
               </DropdownMenuItem>
               
               {userRole && userRole !== "USER" && (
                 <DropdownMenuItem 
                  onClick={() => router.push("/settings")}
                  className="flex items-center p-2.5 rounded-lg cursor-pointer hover:bg-accent/50 transition-all group"
                 >
                   <div className="w-8 h-8 rounded-lg bg-accent/50 flex items-center justify-center mr-3 group-hover:bg-gold-400/20 group-hover:text-gold-400 transition-all">
                      <Settings className="h-4 w-4" />
                   </div>
                   <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">System Settings</span>
                 </DropdownMenuItem>
               )}
            </div>

            <DropdownMenuSeparator className="bg-border/50 mx-1 mt-1" />
            
            <DropdownMenuItem 
              className="flex items-center p-2.5 rounded-lg mt-1 cursor-pointer hover:bg-destructive/10 transition-all group" 
              onClick={() => signOut()}
            >
              <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center mr-3 group-hover:bg-destructive/20 transition-all">
                 <LogOut className="h-4 w-4 text-destructive" />
              </div>
              <span className="text-xs font-medium text-destructive">Secure Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
