"use client";

import { useState, useEffect } from "react";
import { 
  Bell, CheckCheck, Settings, 
  DollarSign, Users, ShoppingBag, 
  Box, Zap, Calendar, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const mockNotifications = [
  { id: 1, type: "finance", title: "New Invoice Paid", desc: "INV-2024-045 for $1,240.50", time: "2m ago", unread: true },
  { id: 2, type: "inventory", title: "Low Stock Alert", desc: "Z690 Motherboard (5 units left)", time: "15m ago", unread: true },
  { id: 3, type: "hr", title: "Leave Request", desc: "Alex Rivera requested 2 days leave", time: "1h ago", unread: false },
  { id: 4, type: "ai", title: "Market Insight", desc: "SaaS revenue projected to rise by 12%", time: "3h ago", unread: false },
];

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(2);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 hover:text-injaazh-600 transition-colors group"
      >
        <Bell className="w-5 h-5 group-hover:animate-swing" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-950">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-4 w-96 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[32px] shadow-2xl overflow-hidden z-50 animate-in slide-in-from-top-4 duration-500">
           {/* Header */}
           <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 flex items-center justify-between">
              <div>
                 <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Notifications</h3>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">{unreadCount} New Alerts</p>
              </div>
              <div className="flex items-center space-x-1">
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-injaazh-600 rounded-lg">
                    <CheckCheck className="w-4 h-4" />
                 </Button>
                 <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 rounded-lg">
                    <Settings className="w-4 h-4" />
                 </Button>
              </div>
           </div>

           {/* List */}
           <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
              {mockNotifications.map((notif) => (
                <div key={notif.id} className={cn(
                  "p-5 flex items-start space-x-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors cursor-pointer relative group",
                  notif.unread && "bg-injaazh-50/20 dark:bg-injaazh-950/10"
                )}>
                   <div className={cn(
                     "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm",
                     notif.type === "finance" ? "bg-emerald-100 text-emerald-600" :
                     notif.type === "inventory" ? "bg-rose-100 text-rose-600" :
                     notif.type === "hr" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                   )}>
                      {notif.type === "finance" && <DollarSign className="w-5 h-5" />}
                      {notif.type === "inventory" && <Box className="w-5 h-5" />}
                      {notif.type === "hr" && <Users className="w-5 h-5" />}
                      {notif.type === "ai" && <Zap className="w-5 h-5" />}
                   </div>
                   <div className="flex-1 space-y-0.5">
                      <div className="flex justify-between items-start">
                         <p className={cn("text-sm", notif.unread ? "font-bold" : "font-medium")}>{notif.title}</p>
                         <span className="text-[9px] font-bold text-slate-400 uppercase">{notif.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 line-clamp-1">{notif.desc}</p>
                   </div>
                   {notif.unread && <div className="absolute right-5 top-1/2 -translate-y-1/2 w-2 h-2 bg-injaazh-600 rounded-full" />}
                </div>
              ))}
           </div>

           {/* Footer */}
           <div className="p-4 border-t border-slate-100 dark:border-slate-800 text-center bg-slate-50/50">
              <button className="text-[10px] font-bold text-injaazh-600 uppercase tracking-widest hover:underline">
                 View All Notifications
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
