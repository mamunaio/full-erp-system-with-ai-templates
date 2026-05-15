"use client";

import { 
  Table, BarChart3, TrendingUp, 
  AlertCircle, Download, ExternalLink 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ResponseRenderer({ type, content }: { type: string, content: any }) {
  if (type === "text") {
    return <p className="text-sm leading-relaxed whitespace-pre-wrap">{content}</p>;
  }

  if (type === "table" && content?.headers && content?.rows) {
    return (
      <div className="space-y-4 my-4">
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 font-bold uppercase tracking-widest">
              <tr>
                {content.headers.map((h: string) => (
                  <th key={h} className="p-3 border-b dark:border-slate-800">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {content.rows.map((row: any[], i: number) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                  {row.map((cell, j) => (
                    <td key={j} className="p-3 font-medium">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button variant="outline" size="sm" className="h-8 rounded-lg text-[10px] font-bold uppercase tracking-widest">
          <Download className="w-3 h-3 mr-1.5" /> Export as CSV
        </Button>
      </div>
    );
  }

  if (type === "chart" && content?.datasets && content?.labels) {
    return (
      <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 my-4">
        <div className="flex justify-between items-center mb-6">
           <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
             <BarChart3 className="w-3 h-3 mr-1.5" /> AI Generated Insight
           </h4>
           <Button variant="ghost" size="icon" className="h-6 w-6"><ExternalLink className="w-3 h-3" /></Button>
        </div>
        <div className="h-48 w-full flex items-end justify-between px-2">
           {content.datasets[0].data.map((v: number, i: number) => (
             <div key={i} className="w-full mx-1 bg-injaazh-600 rounded-t-lg transition-all duration-1000" style={{ height: `${(v / Math.max(...content.datasets[0].data)) * 100}%` }} />
           ))}
        </div>
        <div className="flex justify-between mt-3 px-1">
           {content.labels.map((l: string) => (
             <span key={l} className="text-[8px] font-bold text-slate-400 uppercase">{l}</span>
           ))}
        </div>
      </div>
    );
  }

  if (type === "insight" && Array.isArray(content)) {
    return (
      <div className="space-y-3 my-4">
        {content.map((insight: any, i: number) => (
          <div key={i} className={cn(
            "p-4 rounded-2xl border flex items-start space-x-3",
            insight.severity === "critical" ? "bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30" :
            insight.severity === "warning" ? "bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30" : "bg-blue-50 border-blue-100 dark:bg-blue-950/20 dark:border-blue-900/30"
          )}>
            <div className={cn(
              "p-2 rounded-xl shrink-0",
              insight.severity === "critical" ? "text-rose-600 bg-white" :
              insight.severity === "warning" ? "text-amber-600 bg-white" : "text-blue-600 bg-white"
            )}>
              <AlertCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">{insight.title}</p>
              <p className="text-[11px] text-slate-500 mt-0.5">{insight.description}</p>
              {insight.action && (
                <Button variant="link" className="h-6 p-0 text-[10px] font-bold text-injaazh-600 uppercase tracking-widest mt-2">
                  Take Action →
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Fallback for unexpected data structure
  return <p className="text-sm leading-relaxed whitespace-pre-wrap">{typeof content === 'string' ? content : JSON.stringify(content)}</p>;
}
