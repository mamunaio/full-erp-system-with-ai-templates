"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Users, Cake, Briefcase, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const events = [
  { day: 20, month: 4, type: "birthday", title: "Sarah Ahmed's Birthday", icon: Cake, color: "text-rose-500 bg-rose-50" },
  { day: 24, month: 4, type: "birthday", title: "Kamal Hossain's Birthday", icon: Cake, color: "text-rose-500 bg-rose-50" },
  { day: 18, month: 4, type: "meeting", title: "HR Monthly Review", icon: Users, color: "text-blue-500 bg-blue-50" },
  { day: 28, month: 4, type: "holiday", title: "Company Foundation Day", icon: Briefcase, color: "text-amber-500 bg-amber-50" },
];

export default function HRCalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 15)); // May 2026
  const [isDrafting, setIsDrafting] = useState(false);
  const [draftResult, setDraftResult] = useState<string | null>(null);
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastProgress, setBroadcastProgress] = useState(0);

  const [localEvents, setLocalEvents] = useState(events);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", type: "Meeting", notifyWhatsApp: false });

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  async function handleGenerateDraft() {
    setIsDrafting(true);
    setDraftResult(null);
    try {
      const prompt = "Draft a professional company announcement for 'Company Foundation Day' on May 28th. Just provide the text, no JSON.";
      const res = await fetch("/api/ai/query", {
        method: "POST",
        body: JSON.stringify({ query: prompt }),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();
      let result = data.text || data.response || "";
      
      if (result.startsWith("{") && result.includes('"text":')) {
        try {
          const parsed = JSON.parse(result);
          result = parsed.text || result;
        } catch (e) {}
      }
      
      setDraftResult(result);
    } catch (err) {
      setDraftResult("Unable to generate draft. Please try again later.");
    } finally {
      setIsDrafting(false);
    }
  }

  function handleSaveEvent() {
    if (!newEvent.title || !newEvent.date) return;

    const dateObj = new Date(newEvent.date);
    const eventIcon = newEvent.type === "Meeting" ? Users : newEvent.type === "Holiday" ? Briefcase : Cake;
    const eventColor = newEvent.type === "Meeting" ? "text-blue-500 bg-blue-50" : newEvent.type === "Holiday" ? "text-amber-500 bg-amber-50" : "text-rose-500 bg-rose-50";

    const addedEvent = {
      day: dateObj.getDate(),
      month: dateObj.getMonth(),
      type: newEvent.type.toLowerCase(),
      title: newEvent.title,
      icon: eventIcon,
      color: eventColor
    };

    if (editingIndex !== null) {
      const updatedEvents = [...localEvents];
      updatedEvents[editingIndex] = addedEvent;
      setLocalEvents(updatedEvents);
    } else {
      setLocalEvents([...localEvents, addedEvent]);
      if (newEvent.notifyWhatsApp) {
        startBroadcast();
      }
    }
    
    if (!newEvent.notifyWhatsApp) {
      setIsAddEventOpen(false);
      setEditingIndex(null);
      setNewEvent({ title: "", date: "", type: "Meeting", notifyWhatsApp: false });
    }
  }

  async function startBroadcast() {
    setIsBroadcasting(true);
    setBroadcastProgress(0);
    const total = 1; // Testing with one recipient for now
    let current = 0;
    
    try {
      // Calling our real Meta API route
      const res = await fetch("/api/notifications/whatsapp", {
        method: "POST",
        body: JSON.stringify({ 
          to: "8801715974542", // Your test number
          eventName: newEvent.title,
          date: newEvent.date
        }),
        headers: { "Content-Type": "application/json" }
      });
      
      const result = await res.json();
      
      if (result.success) {
        setBroadcastProgress(100);
        setTimeout(() => {
          setIsBroadcasting(false);
          setIsAddEventOpen(false);
          setEditingIndex(null);
          setNewEvent({ title: "", date: "", type: "Meeting", notifyWhatsApp: false });
          alert("Success! Real WhatsApp message sent via Meta API.");
        }, 1000);
      } else {
        throw new Error(result.error?.message || "Failed to send");
      }
    } catch (err: any) {
      console.error(err);
      alert(`WhatsApp Error: ${err.message}`);
      setIsBroadcasting(false);
    }
  }

  function handleDayClick(day: number) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setNewEvent({ title: "", date: dateStr, type: "Meeting", notifyWhatsApp: false });
    setEditingIndex(null);
    setIsAddEventOpen(true);
  }

  function handleEventClick(e: React.MouseEvent, event: any, index: number) {
    e.stopPropagation();
    const dateStr = `${year}-${String(event.month + 1).padStart(2, '0')}-${String(event.day).padStart(2, '0')}`;
    setNewEvent({ 
      title: event.title, 
      date: dateStr, 
      type: event.type.charAt(0).toUpperCase() + event.type.slice(1),
      notifyWhatsApp: false
    });
    setEditingIndex(index);
    setIsAddEventOpen(true);
  }

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  function handleDeleteEvent() {
    if (editingIndex === null) return;
    
    const updatedEvents = [...localEvents];
    updatedEvents.splice(editingIndex, 1);
    setLocalEvents(updatedEvents);
    setIsAddEventOpen(false);
    setEditingIndex(null);
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/hrm" className="text-xs font-bold text-injaazh-600 hover:underline flex items-center bg-injaazh-50 px-3 py-1.5 rounded-xl transition-all">
              <ChevronLeft className="w-3 h-3 mr-1" /> Back to HRM
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
            <div className="w-12 h-12 rounded-2xl bg-injaazh-100 dark:bg-injaazh-900/30 flex items-center justify-center mr-4 shadow-inner">
               <CalendarIcon className="w-6 h-6 text-injaazh-600" />
            </div>
            HR Calendar
          </h1>
          <p className="text-slate-500 text-sm ml-1">
            Manage your organization's schedule with AI-powered insights.
          </p>
        </div>
        <Button 
          onClick={() => {
            setNewEvent({ title: "", date: "", type: "Meeting", notifyWhatsApp: false });
            setEditingIndex(null);
            setIsAddEventOpen(true);
          }}
          className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-2xl h-12 px-8 shadow-lg shadow-injaazh-600/20 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Main */}
        <Card className="lg:col-span-3 border-none shadow-2xl bg-white dark:bg-slate-900/50 backdrop-blur-xl overflow-hidden rounded-[40px] border border-white/20">
          <CardHeader className="border-b border-slate-50 dark:border-slate-800 p-8 bg-slate-50/30 dark:bg-slate-950/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                  {months[month]} <span className="text-injaazh-600">{year}</span>
                </h2>
              </div>
              <div className="flex items-center space-x-3 bg-white dark:bg-slate-800 p-1.5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                <Button variant="ghost" size="icon" onClick={prevMonth} className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
                <Button variant="ghost" onClick={() => setCurrentDate(new Date())} className="rounded-xl font-bold text-sm px-4 hover:bg-slate-100 dark:hover:bg-slate-700">
                  Today
                </Button>
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-700 mx-1" />
                <Button variant="ghost" size="icon" onClick={nextMonth} className="rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 bg-slate-50/50 dark:bg-slate-900/50">
              {days.map(day => (
                <div key={day} className="py-4 text-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 border-t border-slate-50 dark:border-slate-800">
              {calendarDays.map((day, idx) => {
                const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                const dayEvents = localEvents.filter(e => e.day === day && e.month === month);

                return (
                  <div 
                    key={idx} 
                    onClick={() => day && handleDayClick(day)}
                    className={cn(
                      "min-h-[140px] p-3 border-r border-b border-slate-50 dark:border-slate-800 last:border-r-0 transition-all cursor-pointer relative group",
                      !day ? "bg-slate-50/30 dark:bg-slate-950/30" : "hover:bg-injaazh-50/30 dark:hover:bg-injaazh-900/10"
                    )}
                  >
                    {day && (
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <span className={cn(
                            "inline-flex w-8 h-8 items-center justify-center text-sm font-black rounded-xl transition-all",
                            isToday ? "bg-injaazh-600 text-white shadow-lg shadow-injaazh-600/40 scale-110" : "text-slate-600 dark:text-slate-400 group-hover:text-injaazh-600"
                          )}>
                            {day}
                          </span>
                          <Plus className="w-4 h-4 text-injaazh-400 opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0" />
                        </div>
                        <div className="space-y-1.5 relative z-10">
                          {dayEvents.map((event, eIdx) => {
                             const originalIndex = localEvents.findIndex(le => le === event);
                             return (
                              <button 
                                key={eIdx} 
                                onClick={(e) => handleEventClick(e, event, originalIndex)}
                                className={cn(
                                  "w-full text-[10px] p-2 rounded-xl flex items-center shadow-sm truncate hover:ring-2 hover:ring-white transition-all transform hover:-translate-y-0.5 font-bold",
                                  event.color
                                )}
                              >
                                <event.icon className="w-3 h-3 mr-2 shrink-0" />
                                <span className="truncate">{event.title}</span>
                              </button>
                             );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar Events */}
        <div className="space-y-6">
          <Card className="border-none shadow-xl bg-white dark:bg-slate-900 rounded-[32px] overflow-hidden">
            <CardHeader className="bg-slate-50/50 dark:bg-slate-800/30 p-6">
              <CardTitle className="text-lg font-bold flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-injaazh-500" /> Upcoming
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {localEvents.filter(e => e.month === month).sort((a, b) => a.day - b.day).slice(0, 5).map((event, i) => (
                  <div 
                    key={i} 
                    onClick={(e) => handleEventClick(e as any, event, localEvents.indexOf(event))}
                    className="flex items-center space-x-4 p-4 rounded-[20px] border border-slate-50 dark:border-slate-800 hover:border-injaazh-200 hover:bg-injaazh-50/30 transition-all cursor-pointer group"
                  >
                    <div className={cn("w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform", event.color)}>
                      <event.icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-black text-slate-900 dark:text-white truncate">{event.title}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{months[event.month]} {event.day}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-2xl bg-gradient-to-br from-injaazh-600 via-injaazh-700 to-blue-800 text-white rounded-[32px] overflow-hidden relative group p-1">
            <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:scale-125 group-hover:rotate-12 transition-all duration-700">
              <Sparkles className="w-16 h-16" />
            </div>
            <CardContent className="p-8 relative bg-slate-900/20 backdrop-blur-sm rounded-[30px] h-full">
               <h3 className="text-xl font-black mb-3 tracking-tight">AI Event Assistant</h3>
               <p className="text-xs text-injaazh-100 mb-6 leading-relaxed font-medium">
                 I can help you plan your next team outing or draft professional meeting invites.
               </p>
               <Button 
                onClick={handleGenerateDraft}
                disabled={isDrafting}
                className="w-full bg-white text-injaazh-700 hover:bg-injaazh-50 rounded-2xl font-black h-12 shadow-xl"
               >
                 {isDrafting ? <Loader2 className="w-5 h-5 animate-spin" /> : "Generate Plan"}
               </Button>

               {draftResult && (
                 <div className="mt-6 p-4 bg-white/10 rounded-2xl border border-white/20 text-[11px] leading-relaxed animate-in zoom-in-95 duration-500 shadow-inner">
                   <p className="whitespace-pre-wrap font-medium">{draftResult}</p>
                   <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-4 h-9 text-[11px] text-white hover:bg-white/20 rounded-xl font-bold"
                    onClick={() => {
                      navigator.clipboard.writeText(draftResult);
                    }}
                   >
                     Copy Announcement
                   </Button>
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Event Dialog */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-[480px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-none shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2)] rounded-[40px] p-0 overflow-hidden">
          <div className="p-10">
            {isBroadcasting ? (
              <div className="py-12 flex flex-col items-center text-center space-y-6 animate-in zoom-in-95">
                <div className="w-24 h-24 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border-4 border-green-500 border-t-transparent animate-spin" />
                  <svg className="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12.012 2.25c-5.387 0-9.754 4.367-9.754 9.754 0 1.722.447 3.398 1.298 4.874l-1.381 5.045 5.163-1.353c1.42.775 3.018 1.187 4.674 1.187 5.387 0 9.754-4.367 9.754-9.754 0-5.387-4.367-9.754-9.754-9.754zm5.727 13.805c-.242.684-1.21 1.258-1.666 1.332-.445.074-.99.111-2.903-.684-2.45-.99-4.037-3.486-4.156-3.649-.124-.163-.996-1.328-.996-2.531 0-1.203.633-1.796.858-2.043.225-.247.495-.309.658-.309.163 0 .326.002.467.009.15.008.35-.057.548.423.198.48.675 1.644.733 1.761.058.117.098.254.02.411-.078.156-.118.254-.236.39-.118.136-.248.305-.353.409-.118.118-.242.247-.104.485.138.238.614 1.01 1.318 1.636.907.807 1.669 1.055 1.907 1.174.238.118.376.098.514-.06.138-.156.594-.69.753-.926.158-.236.316-.198.534-.117.218.081 1.385.653 1.623.771.238.118.396.176.455.274.059.098.059.566-.183 1.25z"/></svg>
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black">WhatsApp Broadcasting</h3>
                  <p className="text-slate-500 font-bold">Sending AI-generated updates to 15 employees...</p>
                </div>
                <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className="h-full bg-green-500 transition-all duration-300 shadow-[0_0_15px_rgba(34,197,94,0.5)]" 
                    style={{ width: `${broadcastProgress}%` }} 
                  />
                </div>
                <p className="text-xl font-black text-green-600">{broadcastProgress}% Complete</p>
              </div>
            ) : (
              <>
                <DialogHeader className="mb-8">
                  <div className="w-16 h-16 rounded-3xl bg-injaazh-100 dark:bg-injaazh-900/50 flex items-center justify-center text-injaazh-600 mb-4 shadow-inner">
                    {editingIndex !== null ? <Sparkles className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
                  </div>
                  <DialogTitle className="text-3xl font-black tracking-tight">
                    {editingIndex !== null ? "Edit Event" : "Create Event"}
                  </DialogTitle>
                  <DialogDescription className="text-slate-500 font-medium">
                    {editingIndex !== null ? "Update the details for this organization event." : "Plan a new event for your team members."}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Event Title</label>
                    <input 
                      placeholder="e.g. Strategic Planning Session" 
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                      className="w-full p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 outline-none focus:ring-4 focus:ring-injaazh-500/10 focus:border-injaazh-500 transition-all font-bold text-slate-900 dark:text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Date</label>
                      <input 
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                        className="w-full p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 outline-none focus:ring-4 focus:ring-injaazh-500/10 focus:border-injaazh-500 transition-all font-bold"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Category</label>
                      <select 
                        value={newEvent.type}
                        onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                        className="w-full p-4 rounded-2xl border border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 outline-none focus:ring-4 focus:ring-injaazh-500/10 focus:border-injaazh-500 transition-all font-bold appearance-none"
                      >
                        <option>Meeting</option>
                        <option>Holiday</option>
                        <option>Celebration</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950/30 rounded-2xl border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.012 2.25c-5.387 0-9.754 4.367-9.754 9.754 0 1.722.447 3.398 1.298 4.874l-1.381 5.045 5.163-1.353c1.42.775 3.018 1.187 4.674 1.187 5.387 0 9.754-4.367 9.754-9.754 0-5.387-4.367-9.754-9.754-9.754zm5.727 13.805c-.242.684-1.21 1.258-1.666 1.332-.445.074-.99.111-2.903-.684-2.45-.99-4.037-3.486-4.156-3.649-.124-.163-.996-1.328-.996-2.531 0-1.203.633-1.796.858-2.043.225-.247.495-.309.658-.309.163 0 .326.002.467.009.15.008.35-.057.548.423.198.48.675 1.644.733 1.761.058.117.098.254.02.411-.078.156-.118.254-.236.39-.118.136-.248.305-.353.409-.118.118-.242.247-.104.485.138.238.614 1.01 1.318 1.636.907.807 1.669 1.055 1.907 1.174.238.118.376.098.514-.06.138-.156.594-.69.753-.926.158-.236.316-.198.534-.117.218.081 1.385.653 1.623.771.238.118.396.176.455.274.059.098.059.566-.183 1.25z"/></svg>
                      </div>
                      <div>
                        <p className="text-sm font-bold">Notify via WhatsApp</p>
                        <p className="text-[10px] text-slate-500">Send automatic updates to all members</p>
                      </div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={newEvent.notifyWhatsApp}
                      onChange={(e) => setNewEvent({...newEvent, notifyWhatsApp: e.target.checked})}
                      className="w-6 h-6 rounded-lg border-slate-200 text-injaazh-600 focus:ring-injaazh-500 cursor-pointer"
                    />
                  </div>
                </div>
                <div className="mt-10 flex space-x-4">
                  <Button variant="ghost" onClick={() => setIsAddEventOpen(false)} className="flex-1 rounded-2xl h-14 font-black hover:bg-slate-100 dark:hover:bg-slate-800">
                    Cancel
                  </Button>
                  {editingIndex !== null && (
                    <Button variant="outline" onClick={handleDeleteEvent} className="flex-1 border-rose-200 text-rose-600 hover:bg-rose-50 rounded-2xl h-14 font-black">
                      Delete
                    </Button>
                  )}
                  <Button onClick={handleSaveEvent} className="flex-2 bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-injaazh-600/20 transition-all active:scale-95">
                    {editingIndex !== null ? "Update Event" : "Create Event"}
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}





