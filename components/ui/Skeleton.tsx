"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
  count?: number;
}

export default function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className={cn(
            "bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden relative",
            className
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent -translate-x-full animate-shimmer" />
        </motion.div>
      ))}
    </>
  );
}

// Pre-built skeletons
export function TableSkeleton() {
  return (
    <div className="space-y-4">
       <Skeleton className="h-10 w-full rounded-xl" />
       {Array.from({ length: 5 }).map((_, i) => (
         <div key={i} className="flex space-x-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 flex-1" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-16" />
         </div>
       ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-[32px] border border-slate-200 dark:border-slate-800 space-y-4">
       <div className="flex justify-between items-start">
          <Skeleton className="w-12 h-12 rounded-2xl" />
          <Skeleton className="w-4 h-4 rounded-full" />
       </div>
       <div className="space-y-2">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-8 w-32" />
       </div>
    </div>
  );
}
