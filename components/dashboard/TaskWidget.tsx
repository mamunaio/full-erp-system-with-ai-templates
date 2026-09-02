"use client";

import { Clock, ChevronRight, CheckCircle, ListTodo } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface TaskItem {
  id: string;
  title: string;
  priority: string;
  projectName: string;
  dueDate: string | null;
  createdAt: string;
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

const priorityConfig: Record<string, { bg: string; text: string }> = {
  URGENT: { bg: "bg-rose-500/10 border-rose-500/30", text: "text-rose-600 dark:text-rose-400" },
  HIGH: { bg: "bg-amber-500/10 border-amber-500/30", text: "text-amber-600 dark:text-amber-400" },
  MEDIUM: { bg: "bg-blue-500/10 border-blue-500/30", text: "text-blue-600 dark:text-blue-400" },
  LOW: { bg: "bg-accent border-border", text: "text-muted-foreground" },
};

export default function TaskWidget({ data }: { data: TaskItem[] }) {
  if (data.length === 0) {
    return (
      <div className="glass rounded-2xl border border-border/80 p-5 shadow-md">
        <h3 className="text-sm font-bold text-foreground font-heading mb-4">Pending Approvals & Tasks</h3>
        <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
          <CheckCircle className="w-8 h-8 text-emerald-500" />
          <p className="text-xs font-semibold text-muted-foreground">All enterprise tasks completed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl border border-border/80 p-5 shadow-md space-y-4 hover:border-gold-500/30 transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center">
            <ListTodo className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground font-heading">Action Queue</h3>
            <p className="text-[10px] text-muted-foreground">{data.length} pending execution items</p>
          </div>
        </div>
        <Link href="/projects" className="text-[11px] font-bold text-gold-600 dark:text-gold-400 hover:text-foreground transition-colors flex items-center gap-0.5">
          Projects <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-2 pt-1">
        {data.slice(0, 4).map((task) => {
          const cfg = priorityConfig[task.priority] || priorityConfig.MEDIUM;

          return (
            <div key={task.id} className="p-3 rounded-xl bg-card/60 hover:bg-card border border-border/60 hover:border-gold-500/30 transition-all cursor-pointer group space-y-1 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <p className="text-xs font-bold text-foreground group-hover:text-gold-500 transition-colors leading-snug line-clamp-1">
                  {task.title}
                </p>
                <span className={cn("text-[9px] font-extrabold px-2 py-0.2 rounded-full border uppercase tracking-wider shrink-0", cfg.bg, cfg.text)}>
                  {task.priority}
                </span>
              </div>

              <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-0.5">
                <span className="font-semibold text-foreground/80">{task.projectName}</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {timeAgo(task.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
