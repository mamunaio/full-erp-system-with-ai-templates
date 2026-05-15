"use client";

import { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell, Sparkles, Calendar, MessageSquare } from "lucide-react";

export default function DashboardEventReminder() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed this reminder
    const hasSeenReminder = localStorage.getItem("eventReminderSeen");
    
    if (!hasSeenReminder) {
      // Show reminder after 1.5 seconds if they haven't seen it
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("eventReminderSeen", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-none shadow-2xl rounded-[40px] bg-white/90 dark:bg-slate-900/90 backdrop-blur-2xl">
        <div className="relative">
          {/* Header Visual */}
          <div className="h-32 bg-gradient-to-br from-injaazh-600 to-blue-700 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <Sparkles className="w-40 h-40 absolute -right-10 -top-10 text-white" />
              <Calendar className="w-24 h-24 absolute -left-5 -bottom-5 text-white" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-xl animate-bounce">
                <Bell className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>

          <div className="p-8">
            <DialogHeader className="text-center sm:text-center">
              <DialogTitle className="text-3xl font-black tracking-tight mb-2">
                Upcoming Team Event!
              </DialogTitle>
              <DialogDescription className="text-slate-600 dark:text-slate-400 text-base font-medium">
                Don't forget the <span className="text-injaazh-600 font-bold">Company Foundation Day</span> coming up on May 28th.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-8 space-y-4">
              <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-injaazh-200 transition-all">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 mr-4 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Status</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">WhatsApp Updates Sent</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 group hover:border-injaazh-200 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 mr-4 group-hover:scale-110 transition-transform">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-400">Date & Time</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">May 28, 2026 • 10:00 AM</p>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-10 sm:justify-center">
              <Button 
                onClick={handleDismiss}
                className="w-full bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-2xl h-14 font-black shadow-xl shadow-injaazh-600/20 active:scale-95 transition-all"
              >
                I'll be there!
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
