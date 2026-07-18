"use client";

import { ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "invoice" | "payment";
  title: string;
  contact: string;
  amount: number;
  status: string;
  date: string;
}

function timeAgo(date: string) {
  const now = new Date();
  const then = new Date(date);
  const diffMs = now.getTime() - then.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  const diffD = Math.floor(diffH / 24);
  return `${diffD}d ago`;
}

export default function ActivityFeed({ data }: { data: ActivityItem[] }) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="text-base font-semibold text-card-foreground mb-4">Recent Activity</h3>
        <p className="text-sm text-muted-foreground">No recent transactions.</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-emerald-500/5 blur-[40px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-card-foreground">Recent Activity</h3>
          <button className="text-[11px] text-primary hover:text-primary/80 font-semibold transition-colors flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-1">
          {data.map((item) => (
            <div key={item.id} className="flex items-center justify-between py-3 px-3 -mx-3 rounded-xl hover:bg-accent/50 transition-all duration-200 cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
                  item.type === "payment"
                    ? "bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400"
                    : "bg-gradient-to-br from-blue-500/15 to-blue-500/5 text-blue-600 dark:text-blue-400"
                )}>
                  {item.type === "payment" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-card-foreground group-hover:text-foreground transition-colors">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.contact} · {timeAgo(item.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={cn(
                  "text-sm font-bold tabular-nums",
                  item.type === "payment" ? "text-emerald-600 dark:text-emerald-400" : "text-blue-600 dark:text-blue-400"
                )}>
                  +${item.amount.toLocaleString()}
                </p>
                <span className="text-[10px] text-muted-foreground font-medium">{item.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
