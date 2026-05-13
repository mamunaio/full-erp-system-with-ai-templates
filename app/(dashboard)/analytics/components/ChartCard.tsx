"use client";

import { ReactNode } from "react";
import { Maximize2, MoreHorizontal, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  onExplain?: () => void;
}

export default function ChartCard({ title, subtitle, children, className, onExplain }: ChartCardProps) {
  return (
    <div className={cn(
      "bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm flex flex-col group",
      className
    )}>
      <div className="flex items-start justify-between mb-8">
        <div>
          <h3 className="text-xl font-black italic tracking-tighter uppercase text-slate-900 dark:text-white group-hover:text-injaazh-600 transition-colors">
            {title}
          </h3>
          {subtitle && <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">{subtitle}</p>}
        </div>
        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {onExplain && (
            <Button variant="ghost" size="icon" onClick={onExplain} className="h-8 w-8 text-injaazh-600 hover:bg-injaazh-50">
              <Sparkles className="w-4 h-4" />
            </Button>
          )}
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
            <Download className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 min-h-[300px]">
        {children}
      </div>

      <div className="mt-6 pt-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center">
         <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5"><div className="w-2.5 h-2.5 rounded-full bg-injaazh-600" /><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Current</span></div>
            <div className="flex items-center space-x-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-200" /><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Previous</span></div>
         </div>
         <Button variant="ghost" className="text-[10px] font-bold text-slate-400 uppercase tracking-widest hover:text-injaazh-600">
           View Full Report
         </Button>
      </div>
    </div>
  );
}
