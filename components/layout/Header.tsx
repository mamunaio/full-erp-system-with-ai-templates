"use client";

import { Bell, Search, Menu, Moon, Sun, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui.store";
import BreadCrumb from "./BreadCrumb";
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

export default function Header() {
  const { toggleMobileSidebar } = useUIStore();
  const { setTheme, theme } = useTheme();
  const { data: session } = useSession();

  return (
    <header className="h-16 border-b bg-white dark:bg-slate-950 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 backdrop-blur-md bg-opacity-80">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileSidebar}>
          <Menu className="w-5 h-5" />
        </Button>
        <div className="hidden md:block">
          <BreadCrumb />
        </div>
      </div>

      <div className="flex-1 max-w-md mx-8 hidden lg:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-injaazh-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search anything... (Ctrl+K)"
            className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 transition-all outline-none"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 border px-1.5 py-0.5 rounded-md bg-white dark:bg-slate-800">
            ⌘K
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 md:space-x-4">
        <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>

        <div className="relative cursor-pointer group">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-950" />
          </Button>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center space-x-3 pl-2 cursor-pointer hover:opacity-80 transition-opacity">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold">{session?.user?.name || "John Doe"}</span>
                <span className="text-[10px] text-slate-500 uppercase tracking-wider">{session?.user?.role || "Admin"}</span>
              </div>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-injaazh-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
                {session?.user?.name?.[0] || "A"}
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
