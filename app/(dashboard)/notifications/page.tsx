"use client";

import { useState, useEffect } from "react";
import { Bell, Search, Filter, CheckCircle2, Clock, UserPlus, AlertTriangle, FileText, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

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
  }, []);

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

  const filtered = notifications.filter(n => {
    if (filter === "unread") return !n.isRead;
    if (filter === "hrm") return n.category === "HRM";
    if (filter === "inventory") return n.category === "Inventory";
    return true;
  });

  const getIcon = (type: string, category: string) => {
    if (category === "HRM") return UserPlus;
    if (category === "Inventory") return AlertTriangle;
    if (type === "success") return CheckCircle2;
    if (type === "warning") return AlertTriangle;
    return Info;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link href="/dashboard" className="group flex items-center text-sm font-medium text-slate-500 hover:text-injaazh-600 transition-colors mb-2">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            All Notifications
          </h1>
          <p className="text-slate-500 text-sm">
            Stay updated with everything happening in your business.
          </p>
        </div>
        <Button 
          onClick={markAllAsRead}
          variant="outline" 
          className="rounded-xl border-slate-200"
        >
          <CheckCircle2 className="w-4 h-4 mr-2" /> Mark all as read
        </Button>
      </div>

      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        <FilterButton active={filter === "all"} onClick={() => setFilter("all")}>All</FilterButton>
        <FilterButton active={filter === "unread"} onClick={() => setFilter("unread")}>Unread</FilterButton>
        <FilterButton active={filter === "hrm"} onClick={() => setFilter("hrm")}>HRM</FilterButton>
        <FilterButton active={filter === "inventory"} onClick={() => setFilter("inventory")}>Inventory</FilterButton>
      </div>

      {loading ? (
        <div className="flex justify-center py-24"><Loader2 className="w-12 h-12 animate-spin text-injaazh-600" /></div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.length === 0 ? (
              <div className="py-24 text-center text-slate-400">
                <Bell className="w-12 h-12 mx-auto mb-4 opacity-10" />
                <p>No notifications found in this category.</p>
              </div>
            ) : (
              filtered.map((n) => {
                const Icon = getIcon(n.type, n.category);
                return (
                  <div 
                    key={n.id} 
                    className={cn(
                      "p-6 flex items-start space-x-6 hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors group relative",
                      !n.isRead && "bg-injaazh-50/20 dark:bg-injaazh-950/10"
                    )}
                  >
                    {!n.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-injaazh-500" />}
                    
                    <div className={cn(
                      "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                      n.type === "success" && "bg-emerald-100 text-emerald-600",
                      n.type === "warning" && "bg-amber-100 text-amber-600",
                      n.type === "info" && "bg-blue-100 text-blue-600"
                    )}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <h3 className={cn("font-bold text-lg", !n.isRead ? "text-slate-900 dark:text-white" : "text-slate-500")}>
                            {n.title}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase">
                            {n.category}
                          </span>
                        </div>
                        <span className="text-xs text-slate-400 font-medium">
                           {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-2xl">
                        {n.description}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function FilterButton({ children, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-6 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
        active 
          ? "bg-injaazh-600 text-white shadow-lg shadow-injaazh-600/20" 
          : "bg-white dark:bg-slate-900 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
      )}
    >
      {children}
    </button>
  );
}

function Info(props: any) {
  return <FileText {...props} />;
}
