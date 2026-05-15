"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Plus, Users, Cake, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  const [currentDate, setCurrentDate] = useState(new Date(2026, 4, 15)); // Set to May 2026

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

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
        <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
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
                const isToday = day === 15 && month === 4 && year === 2026;
                const dayEvents = events.filter(e => e.day === day && e.month === month);

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
                            <div 
                              key={eIdx} 
                              className={cn(
                                "text-[10px] p-1.5 rounded-lg flex items-center shadow-sm truncate",
                                event.color
                              )}
                            >
                              <event.icon className="w-3 h-3 mr-1 shrink-0" />
                              <span className="truncate font-medium">{event.title}</span>
                            </div>
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
                {events.map((event, i) => (
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
               <Button className="w-full bg-white text-injaazh-700 hover:bg-injaazh-50 rounded-xl font-bold">
                 Generate Draft
               </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
