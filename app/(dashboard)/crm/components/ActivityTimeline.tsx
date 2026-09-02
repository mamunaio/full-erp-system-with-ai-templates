"use client";

import {
  Phone, Mail, Users, FileText,
  CheckCircle2, Clock, Calendar, MessageSquare
} from "lucide-react";

const activities = [
  { id: 1, type: "CALL", subject: "Discovery with VP of Tech - Meta Corp", contact: "Mark Vance", date: "Today, 10:30 AM", status: "DONE" },
  { id: 2, type: "EMAIL", subject: "Dispatched Custom Proposal & SLA - SpaceX", contact: "Elena Rostova", date: "Today, 02:15 PM", status: "DONE" },
  { id: 3, type: "MEETING", subject: "Commercial Contract Review - Tesla Energy", contact: "Marcus Sterling", date: "Tomorrow, 11:00 AM", status: "TODO" },
  { id: 4, type: "NOTE", subject: "Q4 Multi-tenant architecture audit requested", contact: "Chloe Dupont", date: "Yesterday, 04:30 PM", status: "DONE" },
];

const icons: Record<string, React.ReactNode> = {
  CALL: <Phone className="w-4 h-4" />,
  EMAIL: <Mail className="w-4 h-4" />,
  MEETING: <Users className="w-4 h-4" />,
  NOTE: <FileText className="w-4 h-4" />,
};

export default function ActivityTimeline() {
  return (
    <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-md space-y-4 hover:border-gold-500/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-foreground font-heading">Live Interaction Pulse</h3>
          <p className="text-[10px] text-muted-foreground">Recent customer communications & meeting logs</p>
        </div>
        <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          Sync Active
        </span>
      </div>

      <div className="space-y-3 pt-2">
        {activities.map((activity, index) => (
          <div key={activity.id} className="relative pl-8">
            {index < activities.length - 1 && (
              <div className="absolute left-[13px] top-8 bottom-[-12px] w-0.5 bg-border" />
            )}
            <div className={`absolute left-0 top-1 w-7 h-7 rounded-xl border flex items-center justify-center shadow-sm ${
              activity.status === "DONE" 
                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" 
                : "bg-gold-500/10 text-gold-600 dark:text-gold-400 border-gold-500/20"
            }`}>
              {icons[activity.type]}
            </div>

            <div className="p-3.5 rounded-2xl bg-card/60 hover:bg-card border border-border/70 hover:border-gold-500/30 transition-all space-y-2 group shadow-sm">
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-extrabold text-foreground bg-accent/60 px-2 py-0.2 rounded-md">{activity.type}</span>
                <span className="text-muted-foreground">{activity.date}</span>
              </div>

              <h4 className="font-bold text-foreground text-xs leading-snug group-hover:text-gold-500 transition-colors">
                {activity.subject}
              </h4>

              <div className="flex items-center justify-between pt-1 border-t border-border/40 text-[10px]">
                <span className="text-muted-foreground font-semibold">Contact: {activity.contact}</span>
                {activity.status === "TODO" ? (
                  <span className="text-gold-600 dark:text-gold-400 font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Upcoming
                  </span>
                ) : (
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Completed
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
