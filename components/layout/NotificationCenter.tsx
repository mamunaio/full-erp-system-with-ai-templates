"use client";

import { useState, useEffect } from "react";
import { Bell, Check, Circle, Clock, Info, AlertTriangle, UserPlus, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      setNotifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
    // Poll every 1 minute
    const interval = setInterval(fetchNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error("Failed to mark as read", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAll: true })
      });
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (error) {
      console.error("Failed to mark all as read", error);
    }
  };

  const getIcon = (type: string, category: string) => {
    if (category === "HRM") return UserPlus;
    if (category === "Inventory") return AlertTriangle;
    if (type === "success") return Check;
    if (type === "warning") return AlertTriangle;
    return Info;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 dark:hover:bg-slate-900 rounded-xl transition-all">
          <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white dark:border-slate-950 animate-pulse" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 md:w-96 mt-2 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-0 overflow-hidden">
        <div className="p-4 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between">
          <DropdownMenuLabel className="font-bold p-0">Notifications</DropdownMenuLabel>
          {unreadCount > 0 && (
            <button 
              onClick={(e) => { e.stopPropagation(); markAllAsRead(); }}
              className="text-[10px] font-bold text-injaazh-600 hover:underline uppercase tracking-wider"
            >
              Mark all as read
            </button>
          )}
        </div>
        <DropdownMenuSeparator className="m-0" />
        <div className="max-h-[400px] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center p-8"><Loader2 className="w-6 h-6 animate-spin text-injaazh-500" /></div>
          ) : notifications.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Bell className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p className="text-sm">No new notifications</p>
            </div>
          ) : (
            notifications.map((n) => {
              const Icon = getIcon(n.type, n.category);
              return (
                <DropdownMenuItem
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  className={cn(
                    "p-4 flex items-start space-x-4 cursor-pointer focus:bg-slate-50 dark:focus:bg-slate-800/50 border-b border-slate-50 dark:border-slate-800 last:border-0",
                    !n.isRead && "bg-injaazh-50/30 dark:bg-injaazh-950/10"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0",
                    n.type === "success" && "bg-emerald-100 text-emerald-600",
                    n.type === "warning" && "bg-amber-100 text-amber-600",
                    n.type === "info" && "bg-blue-100 text-blue-600",
                    n.type === "error" && "bg-rose-100 text-rose-600"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className={cn("text-sm font-semibold", !n.isRead ? "text-slate-900 dark:text-white" : "text-slate-500")}>
                        {n.title}
                      </p>
                      {!n.isRead && <div className="w-2 h-2 bg-injaazh-500 rounded-full" />}
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {n.description}
                    </p>
                    <div className="flex items-center text-[10px] text-slate-400 pt-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                </DropdownMenuItem>
              );
            })
          )}
        </div>
        <DropdownMenuSeparator className="m-0" />
        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 text-center">
          <Link href="/notifications" className="text-xs font-semibold text-slate-500 hover:text-injaazh-600 transition-colors">
            View All Notifications
          </Link>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
