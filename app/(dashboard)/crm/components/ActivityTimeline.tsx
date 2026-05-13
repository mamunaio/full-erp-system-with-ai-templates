"use client";

import { 
  Phone, Mail, Users, FileText, 
  CheckCircle2, Clock, MoreVertical 
} from "lucide-react";
import { cn } from "@/lib/utils";

const activities = [
  { id: 1, type: "CALL", subject: "Initial discovery call", contact: "Alex Rivera", date: "Today, 10:30 AM", status: "DONE" },
  { id: 2, type: "EMAIL", subject: "Sent proposal draft", contact: "Sarah Connor", date: "Yesterday, 4:15 PM", status: "DONE" },
  { id: 3, type: "MEETING", subject: "Project requirements discussion", contact: "Alex Rivera", date: "Tomorrow, 11:00 AM", status: "TODO" },
  { id: 4, type: "NOTE", subject: "Follow up next week about budget", contact: "Bruce Wayne", date: "May 12, 2026", status: "DONE" },
];

const icons = {
  CALL: <Phone className="w-4 h-4" />,
  EMAIL: <Mail className="w-4 h-4" />,
  MEETING: <Users className="w-4 h-4" />,
  NOTE: <FileText className="w-4 h-4" />,
};

export default function ActivityTimeline() {
  return (
    <div className="space-y-6">
      {activities.map((activity, index) => (
        <div key={activity.id} className="relative pl-10">
          {/* Vertical Line */}
          {index < activities.length - 1 && (
            <div className="absolute left-[19px] top-10 bottom-[-24px] w-0.5 bg-slate-100 dark:bg-slate-800" />
          )}
          
          {/* Icon Circle */}
          <div className={cn(
            "absolute left-0 top-1 w-10 h-10 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center shadow-sm",
            activity.status === "DONE" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-600"
          )}>
            {(icons as any)[activity.type]}
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-4 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{activity.type}</span>
              <span className="text-[10px] text-slate-400 font-medium">{activity.date}</span>
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white">{activity.subject}</h4>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center text-xs text-slate-500">
                <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[8px] font-bold mr-2">
                  {activity.contact[0]}
                </div>
                {activity.contact}
              </div>
              {activity.status === "TODO" ? (
                <div className="flex items-center text-xs font-bold text-blue-600">
                  <Clock className="w-3 h-3 mr-1" /> Upcoming
                </div>
              ) : (
                <div className="flex items-center text-xs font-bold text-emerald-600">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
