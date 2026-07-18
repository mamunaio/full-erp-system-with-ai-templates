"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Search, Filter, CheckCircle2, Clock, UserPlus, AlertTriangle, FileText, ArrowLeft, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

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
    return FileText;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-xl border-2 border-gold-500/20" />
            <div className="absolute inset-0 rounded-xl border-2 border-transparent border-t-gold-500 animate-spin" />
            <div className="absolute inset-1 rounded-lg bg-gold-500/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
            </div>
          </div>
          <span className="text-sm text-muted-foreground font-medium">Loading notifications...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="max-w-5xl mx-auto space-y-6 pb-8">
      <motion.div variants={fadeUp}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <Link href="/dashboard" className="group flex items-center text-sm font-medium text-muted-foreground hover:text-gold-400 transition-colors mb-2">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-foreground tracking-tight font-heading">
              All <span className="text-gold-400">Notifications</span>
            </h1>
            <p className="text-muted-foreground text-sm">
              Stay updated with everything happening in your business.
            </p>
          </div>
          <Button
            onClick={markAllAsRead}
            variant="outline"
            className="rounded-xl border-border"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" /> Mark all as read
          </Button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {["all", "unread", "hrm", "inventory"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-6 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap",
              filter === f
                ? "bg-gold-500 text-obsidian-900 shadow-lg shadow-gold-500/20"
                : "bg-card/60 text-muted-foreground hover:text-gold-400 border border-border"
            )}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border shadow-sm overflow-hidden">
        <div className="divide-y divide-border">
          {filtered.length === 0 ? (
            <div className="py-24 text-center text-muted-foreground">
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
                    "p-6 flex items-start space-x-6 hover:bg-gold-500/5 transition-colors group relative",
                    !n.isRead && "bg-gold-500/5"
                  )}
                >
                  {!n.isRead && <div className="absolute left-0 top-0 bottom-0 w-1 bg-gold-500" />}

                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                    n.type === "success" ? "bg-emerald-500/15 text-emerald-400" :
                    n.type === "warning" ? "bg-amber-500/15 text-amber-400" :
                    "bg-blue-500/15 text-blue-400"
                  )}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h3 className={cn("font-bold text-lg", !n.isRead ? "text-foreground" : "text-muted-foreground")}>
                          {n.title}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-card text-[10px] font-bold text-muted-foreground uppercase border border-border">
                          {n.category}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground font-medium">
                        {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                      {n.description}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
