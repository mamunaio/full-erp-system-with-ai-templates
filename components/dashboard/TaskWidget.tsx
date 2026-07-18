"use client";

import { Clock, ChevronRight, CheckCircle } from "lucide-react";
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

const priorityConfig: Record<string, string> = {
  URGENT: "bg-gold-500 ring-gold-500/30",
  HIGH: "bg-amber-500 ring-amber-500/30",
  MEDIUM: "bg-blue-500 ring-blue-500/30",
  LOW: "bg-zinc-400 ring-zinc-400/30",
};

export default function TaskWidget({ data }: { data: TaskItem[] }) {
  if (data.length === 0) {
    return (
      <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
        <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Active Tasks</h3>
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <CheckCircle className="w-6 h-6 text-gold-400 mb-1" />
          <p className="text-sm text-muted-foreground font-medium">All tasks completed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-white/5 p-5 hover:border-gold-500/20 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-card-foreground font-heading">Active Tasks</h3>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full font-bold">{data.length}</span>
          <Link href="/projects" className="text-[11px] text-gold-400 hover:text-gold-300 font-semibold transition-colors flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      <div className="space-y-1">
        {data.slice(0, 4).map((task) => (
          <div key={task.id} className="flex items-center justify-between py-2.5 px-3 -mx-3 rounded-xl hover:bg-gold-500/5 transition-all duration-200 cursor-pointer group">
            <div className="flex items-center gap-3 min-w-0">
              <div className={cn(
                "w-2.5 h-2.5 rounded-full ring-2 ring-offset-1 ring-offset-card shrink-0",
                priorityConfig[task.priority] || priorityConfig.MEDIUM
              )} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-card-foreground group-hover:text-gold-400 transition-colors truncate">{task.title}</p>
                {task.projectName && (
                  <p className="text-[10px] text-muted-foreground truncate">{task.projectName}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground shrink-0">
              <Clock className="w-3 h-3" />
              <span className="text-[10px]">{timeAgo(task.createdAt)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
