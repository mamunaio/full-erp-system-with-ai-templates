"use client";

import { useState } from "react";
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
  
  const [localEvents, setLocalEvents] = useState(events);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", type: "Meeting" });

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

    setLocalEvents([...localEvents, addedEvent]);
    setIsAddEventOpen(false);
    setNewEvent({ title: "", date: "", type: "Meeting" });
  }

  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center">
            <CalendarIcon className="w-8 h-8 mr-3 text-injaazh-600" /> HR Calendar
          </h1>
          <p className="text-slate-500 text-sm">
            Schedule and track birthdays, holidays, and HR events.
          </p>
        </div>
        <Button 
          onClick={() => setIsAddEventOpen(true)}
          className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Calendar Main */}
        <Card className="lg:col-span-3 border-none shadow-xl bg-white dark:bg-slate-900 overflow-hidden rounded-[32px]">
          <CardHeader className="border-b border-slate-50 dark:border-slate-800 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {months[month]} {year}
              </h2>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon" onClick={prevMonth} className="rounded-xl border-slate-200">
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button variant="outline" onClick={() => setCurrentDate(new Date())} className="rounded-xl border-slate-200">
                  Today
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth} className="rounded-xl border-slate-200">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 border-b border-slate-50 dark:border-slate-800">
              {days.map(day => (
                <div key={day} className="py-4 text-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {calendarDays.map((day, idx) => {
                const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                const dayEvents = localEvents.filter(e => e.day === day && e.month === month);

                return (
                  <div 
                    key={idx} 
                    className={cn(
                      "min-h-[120px] p-2 border-r border-b border-slate-50 dark:border-slate-800 last:border-r-0 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30",
                      !day && "bg-slate-50/30 dark:bg-slate-950/30"
                    )}
                  >
                    {day && (
                      <div className="space-y-2">
                        <span className={cn(
                          "inline-flex w-7 h-7 items-center justify-center text-sm font-bold rounded-lg",
                          isToday ? "bg-injaazh-600 text-white shadow-lg shadow-injaazh-600/30" : "text-slate-600 dark:text-slate-400"
                        )}>
                          {day}
                        </span>
                        <div className="space-y-1">
                          {dayEvents.map((event, eIdx) => (
                            <button 
                              key={eIdx} 
                              onClick={() => {}}
                              className={cn(
                                "w-full text-[10px] p-1.5 rounded-lg flex items-center shadow-sm truncate hover:scale-105 transition-transform",
                                event.color
                              )}
                            >
                              <event.icon className="w-3 h-3 mr-1 shrink-0" />
                              <span className="truncate font-medium">{event.title}</span>
                            </button>
                          ))}
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
          <Card className="border-none shadow-lg bg-white dark:bg-slate-900 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-lg font-bold">Upcoming This Month</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {localEvents.filter(e => e.month === month).sort((a, b) => a.day - b.day).map((event, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 rounded-2xl border border-slate-50 dark:border-slate-800 hover:border-injaazh-200 transition-colors">
                    <div className={cn("p-2 rounded-xl shrink-0", event.color)}>
                      <event.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">{event.title}</p>
                      <p className="text-[10px] text-slate-500">{months[event.month]} {event.day}, {year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-injaazh-600 to-blue-700 text-white rounded-3xl overflow-hidden relative group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform">
              <Sparkles className="w-12 h-12" />
            </div>
            <CardContent className="p-6 relative">
               <h3 className="text-lg font-bold mb-2">AI Event Planner</h3>
               <p className="text-xs text-injaazh-100 mb-4 leading-relaxed">
                 Would you like me to draft an announcement for the Company Foundation Day?
               </p>
               <Button 
                onClick={handleGenerateDraft}
                disabled={isDrafting}
                className="w-full bg-white text-injaazh-700 hover:bg-injaazh-50 rounded-xl font-bold"
               >
                 {isDrafting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Generate Draft"}
               </Button>

               {draftResult && (
                 <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/20 text-[10px] leading-relaxed animate-in fade-in slide-in-from-bottom-2">
                   <p className="whitespace-pre-wrap">{draftResult}</p>
                   <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-2 h-7 text-[10px] text-white hover:bg-white/10"
                    onClick={() => {
                      navigator.clipboard.writeText(draftResult);
                    }}
                   >
                     Copy to Clipboard
                   </Button>
                 </div>
               )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Event Dialog */}
      <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border-none shadow-2xl rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add New Event</DialogTitle>
            <DialogDescription>
              Create a new HR event, holiday, or meeting.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-bold">Event Title</label>
              <input 
                placeholder="e.g. Annual Picnic" 
                value={newEvent.title}
                onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                className="w-full p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:ring-2 focus:ring-injaazh-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold">Date</label>
                <input 
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:ring-2 focus:ring-injaazh-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold">Type</label>
                <select 
                  value={newEvent.type}
                  onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}
                  className="w-full p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:ring-2 focus:ring-injaazh-500"
                >
                  <option>Meeting</option>
                  <option>Holiday</option>
                  <option>Celebration</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddEventOpen(false)} className="rounded-xl">Cancel</Button>
            <Button onClick={handleSaveEvent} className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl">Save Event</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}



