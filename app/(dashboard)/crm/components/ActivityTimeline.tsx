"use client";

import {
  Phone, Mail, Users, FileText,
  CheckCircle2, Clock
} from "lucide-react";

const activities = [
  { id: 1, type: "CALL", subject: "Initial discovery call", contact: "Alex Rivera", date: "Today, 10:30 AM", status: "DONE" },
  { id: 2, type: "EMAIL", subject: "Sent proposal draft", contact: "Sarah Connor", date: "Yesterday, 4:15 PM", status: "DONE" },
  { id: 3, type: "MEETING", subject: "Project requirements discussion", contact: "Alex Rivera", date: "Tomorrow, 11:00 AM", status: "TODO" },
  { id: 4, type: "NOTE", subject: "Follow up next week about budget", contact: "Bruce Wayne", date: "May 12, 2026", status: "DONE" },
];

const icons: Record<string, React.ReactNode> = {
  CALL: <Phone className="w-4 h-4" />,
  EMAIL: <Mail className="w-4 h-4" />,
  MEETING: <Users className="w-4 h-4" />,
  NOTE: <FileText className="w-4 h-4" />,
};

export default function ActivityTimeline() {
  return (
    <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
      <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Activity Timeline</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative pl-10">
            {index < activities.length - 1 && (
              <div className="absolute left-[19px] top-10 bottom-[-16px] w-0.5 bg-border" />
            )}
            <div className={`absolute left-0 top-1 w-10 h-10 rounded-full border-2 border-card flex items-center justify-center shadow-sm ${
              activity.status === "DONE" ? "bg-emerald-500/15 text-emerald-400" : "bg-gold-500/15 text-gold-400"
            }`}>
              {icons[activity.type]}
            </div>
            <div className="bg-card/40 backdrop-blur-xl rounded-xl border border-border p-4 hover:border-gold-500/10 transition-all">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{activity.type}</span>
                <span className="text-[10px] text-muted-foreground font-medium">{activity.date}</span>
              </div>
              <h4 className="font-bold text-card-foreground text-sm">{activity.subject}</h4>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center text-xs text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 flex items-center justify-center text-[8px] font-bold text-gold-400 mr-2">
                    {activity.contact[0]}
                  </div>
                  {activity.contact}
                </div>
                {activity.status === "TODO" ? (
                  <div className="flex items-center text-xs font-bold text-gold-400">
                    <Clock className="w-3 h-3 mr-1" /> Upcoming
                  </div>
                ) : (
                  <div className="flex items-center text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
