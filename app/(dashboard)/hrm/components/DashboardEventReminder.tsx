"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bell, Sparkles, Calendar, MessageSquare } from "lucide-react";

export default function DashboardEventReminder() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenReminder = localStorage.getItem("eventReminderSeen");
    if (!hasSeenReminder) {
      const timer = setTimeout(() => setIsOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    localStorage.setItem("eventReminderSeen", "true");
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border border-border shadow-2xl rounded-[40px] bg-card/95 backdrop-blur-2xl">
        <div className="relative">
          <div className="h-32 bg-gradient-to-br from-gold-500 to-obsidian-700 relative overflow-hidden">
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
              <DialogTitle className="text-3xl font-black tracking-tight mb-2 font-heading text-card-foreground">
                Upcoming Team Event!
              </DialogTitle>
              <DialogDescription className="text-muted-foreground text-base font-medium">
                Don&apos;t forget the <span className="text-gold-400 font-bold">Company Foundation Day</span> coming up on May 28th.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-8 space-y-4">
              <div className="flex items-center p-4 bg-card/40 rounded-2xl border border-border group hover:border-gold-500/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mr-4 group-hover:scale-110 transition-transform shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Status</p>
                  <p className="text-sm font-bold text-card-foreground">WhatsApp Updates Sent</p>
                </div>
              </div>

              <div className="flex items-center p-4 bg-card/40 rounded-2xl border border-border group hover:border-gold-500/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400 mr-4 group-hover:scale-110 transition-transform shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date & Time</p>
                  <p className="text-sm font-bold text-card-foreground">May 28, 2026 &bull; 10:00 AM</p>
                </div>
              </div>
            </div>

            <DialogFooter className="mt-10 sm:justify-center">
              <Button
                onClick={handleDismiss}
                className="w-full bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-2xl h-14 font-bold shadow-xl shadow-gold-500/20 active:scale-95 transition-all"
              >
                I&apos;ll be there!
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
