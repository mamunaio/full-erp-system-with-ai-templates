"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, TrendingDown, AlertCircle, 
  Lightbulb, RefreshCw, CheckCircle2 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const insights = [
  {
    category: "Finance",
    title: "Projected Cash Flow Increase",
    description: "Based on current accounts receivable, a 15% increase in cash flow is expected by next month.",
    severity: "success",
    action: "Review AR Aging",
    time: "2 hours ago"
  },
  {
    category: "Inventory",
    title: "Stock Depletion Warning",
    description: "High performance servers are selling faster than usual. You will run out in 12 days at this rate.",
    severity: "warning",
    action: "Create PO",
    time: "5 hours ago"
  },
  {
    category: "HRM",
    title: "Employee Satisfaction Peak",
    description: "Recent engagement survey shows a 20% improvement in the IT department.",
    severity: "info",
    action: "View Survey Results",
    time: "1 day ago"
  },
  {
    category: "Operations",
    title: "Bottleneck Detected",
    description: "Production line B has seen a 5% increase in waste. Might need maintenance.",
    severity: "critical",
    action: "Schedule Maintenance",
    time: "30 mins ago"
  }
];

export default function AIInsights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Intelligent Insights</h2>
        <Button variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" /> Regenerate
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {insights.map((insight) => (
          <Card key={insight.title} className="border-none shadow-md bg-white dark:bg-slate-900 overflow-hidden group">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between mb-2">
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full",
                  insight.category === "Finance" ? "bg-blue-100 text-blue-600" :
                  insight.category === "Inventory" ? "bg-amber-100 text-amber-600" :
                  insight.category === "HRM" ? "bg-emerald-100 text-emerald-600" :
                  "bg-rose-100 text-rose-600"
                )}>
                  {insight.category}
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{insight.time}</span>
              </div>
              <CardTitle className="text-lg flex items-start space-x-3">
                <div className={cn(
                  "mt-1 w-2 h-2 rounded-full shrink-0 animate-pulse",
                  insight.severity === "success" ? "bg-emerald-500" :
                  insight.severity === "warning" ? "bg-amber-500" :
                  insight.severity === "critical" ? "bg-rose-500" : "bg-blue-500"
                )} />
                <span>{insight.title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {insight.description}
              </p>
              <div className="flex items-center justify-between pt-2">
                <Button variant="ghost" size="sm" className="text-injaazh-600 hover:text-injaazh-700 p-0 h-auto font-bold text-xs">
                  {insight.action} →
                </Button>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" className="w-7 h-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <CheckCircle2 className="w-4 h-4 text-slate-400" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
