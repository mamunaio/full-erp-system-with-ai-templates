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

  return (
    <header className="h-20 border-b bg-white dark:bg-slate-950 px-4 md:px-10 flex items-center justify-between sticky top-0 z-30 backdrop-blur-xl bg-opacity-90 border-slate-100 dark:border-slate-900 shadow-sm">
      <div className="flex items-center space-x-6">
        <Button variant="ghost" size="icon" className="md:hidden text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl" onClick={toggleMobileSidebar}>
          <Menu className="w-5 h-5" />
        </Button>
        <div className="hidden md:block">
          <BreadCrumb />
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-12 hidden lg:block">
        <GlobalSearch />
      </div>

      <div className="flex items-center space-x-3 md:space-x-5">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-11 w-11 rounded-2xl text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
        >
          {mounted ? (
            theme === "dark" ? <Sun className="w-5 h-5 text-amber-400 animate-in spin-in-180 duration-500" /> : <Moon className="w-5 h-5 text-blue-600 animate-in spin-in-180 duration-500" />
          ) : (
            <div className="w-5 h-5" />
          )}
        </Button>

        <NotificationCenter />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-4 pl-3 py-1 cursor-pointer group">
              <div className="hidden md:flex flex-col items-end transition-transform group-hover:-translate-x-1 duration-300">
                <span className="text-sm font-black text-slate-900 dark:text-white tracking-tight uppercase italic leading-none mb-1">
                  {session?.user?.name || "Md Mamun Hossain"}
                </span>
                <div className="flex items-center space-x-1.5 opacity-50">
                  <Shield className="w-2.5 h-2.5 text-blue-600" />
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">{session?.user?.role || "ADMIN"}</span>
                </div>
              </div>
              <div className="w-11 h-11 rounded-[18px] bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-[2px] shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-[16px] bg-white dark:bg-slate-900 flex items-center justify-center text-blue-600 font-black text-sm border-2 border-transparent">
                  {session?.user?.name?.[0] || "M"}
                </div>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 mt-4 p-3 rounded-[32px] border-slate-100 dark:border-slate-900 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl shadow-2xl animate-in slide-in-from-top-2 duration-300">
            <div className="px-4 py-4 mb-2">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Authenticated Account</p>
               <h4 className="text-sm font-black text-slate-900 dark:text-white tracking-tight italic uppercase">{session?.user?.name || "Md Mamun Hossain"}</h4>
            </div>
            
            <DropdownMenuSeparator className="bg-slate-50 dark:bg-slate-900 mx-2" />
            
            <div className="p-1 space-y-1 mt-2">
               <DropdownMenuItem 
                onClick={() => router.push("/profile")}
                className="flex items-center p-3 rounded-2xl cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
               >
                 <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                    <User className="h-4 w-4" />
                 </div>
                 <span className="text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">Profile Identity</span>
               </DropdownMenuItem>
               
               {session?.user?.role !== "USER" && (
                 <DropdownMenuItem 
                  onClick={() => router.push("/settings")}
                  className="flex items-center p-3 rounded-2xl cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
                 >
                   <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center justify-center mr-3 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                      <Settings className="h-4 w-4" />
                   </div>
                   <span className="text-[11px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">System Settings</span>
                 </DropdownMenuItem>
               )}
            </div>

            <DropdownMenuSeparator className="bg-slate-50 dark:bg-slate-900 mx-2 mt-2" />
            
            <DropdownMenuItem 
              className="flex items-center p-3 rounded-2xl mt-2 cursor-pointer hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all group" 
              onClick={() => signOut()}
            >
              <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center mr-3 group-hover:bg-rose-600 group-hover:text-white transition-all">
                 <LogOut className="h-4 w-4" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest text-rose-500">Secure Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
