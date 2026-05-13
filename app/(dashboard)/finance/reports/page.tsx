"use client";

import { useState } from "react";
import { 
  FileText, TrendingUp, BarChart3, 
  Sparkles, Download, Calendar 
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ReportsPage() {
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAIAnalysis = async () => {
    setLoading(true);
    // Mocking API call for demo
    setTimeout(() => {
      setAiAnalysis(`
## Financial Analysis Summary - May 2026

### Key Observations
* **Revenue Growth**: Your revenue has increased by **18%** compared to last month, primarily driven by the "Sales Revenue" account.
* **Cost Management**: Operating expenses are stable, but "Marketing Expenses" have seen a slight spike.

### Risk Assessment
* **Liquidity**: Your current ratio is **1.4**, which is healthy. However, **$12,450** in overdue invoices poses a minor risk to cash flow.

### Recommendations
1. **Aggressive Follow-up**: Implement automated reminders for the 8 overdue invoices.
2. **Expansion**: Given the high net profit margin (**50%**), consider increasing your inventory for top-selling items.
      `);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Financial Reports
          </h1>
          <p className="text-slate-500 text-sm">
            Generate P&L, Balance Sheet, and AI-powered business insights.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-slate-200">
            <Calendar className="w-5 h-5 mr-2" /> May 2026
          </Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
            <Download className="w-5 h-5 mr-2" /> Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pl" className="space-y-8">
        <TabsList className="bg-slate-100 dark:bg-slate-900 p-1 rounded-2xl h-14">
          <TabsTrigger value="pl" className="rounded-xl px-8 h-12 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 shadow-sm transition-all">P&L Statement</TabsTrigger>
          <TabsTrigger value="balance" className="rounded-xl px-8 h-12 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 shadow-sm transition-all">Balance Sheet</TabsTrigger>
          <TabsTrigger value="cashflow" className="rounded-xl px-8 h-12 data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 shadow-sm transition-all">Cash Flow</TabsTrigger>
          <TabsTrigger value="ai" className="rounded-xl px-8 h-12 data-[state=active]:bg-injaazh-600 data-[state=active]:text-white shadow-lg transition-all flex items-center">
            <Sparkles className="w-4 h-4 mr-2" /> AI Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pl" className="outline-none">
          <ReportContainer title="Profit & Loss Statement">
             <div className="space-y-8">
                <ReportSection title="Revenue" total={84230}>
                  <ReportRow label="Sales Revenue" amount={80000} />
                  <ReportRow label="Service Income" amount={4230} />
                </ReportSection>
                <ReportSection title="Operating Expenses" total={42150}>
                  <ReportRow label="Salaries & Wages" amount={25000} />
                  <ReportRow label="Rent Expense" amount={5000} />
                  <ReportRow label="Marketing" amount={8000} />
                  <ReportRow label="Utilities" amount={4150} />
                </ReportSection>
                <div className="pt-6 border-t-2 border-slate-900 dark:border-white flex justify-between items-center font-black text-2xl">
                  <span>Net Profit</span>
                  <span className="text-emerald-600">$42,080</span>
                </div>
             </div>
          </ReportContainer>
        </TabsContent>

        <TabsContent value="ai" className="outline-none">
          <div className="max-w-4xl mx-auto space-y-6">
            {!aiAnalysis ? (
              <div className="bg-gradient-to-tr from-injaazh-600 to-blue-700 rounded-[32px] p-12 text-center text-white shadow-2xl shadow-injaazh-600/30 relative overflow-hidden">
                <div className="relative z-10 space-y-6">
                  <div className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mx-auto shadow-inner">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-black italic tracking-tighter">AI Financial Brain</h2>
                    <p className="text-white/70 max-w-md mx-auto">Gemini analyzes your entire ledger to find hidden patterns, risks, and growth opportunities.</p>
                  </div>
                  <Button 
                    onClick={generateAIAnalysis} 
                    disabled={loading}
                    className="bg-white hover:bg-slate-100 text-injaazh-600 font-bold px-10 h-14 rounded-2xl shadow-xl transition-all hover:scale-105 active:scale-95"
                  >
                    {loading ? "Analyzing Data..." : "Generate Analysis Report"}
                  </Button>
                </div>
                <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-10 shadow-xl prose dark:prose-invert max-w-none animate-in zoom-in-95 duration-500">
                 <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center space-x-3 text-injaazh-600 font-bold">
                      <Sparkles className="w-6 h-6" />
                      <span>Gemini Intelligence</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setAiAnalysis(null)} className="text-xs">Regenerate</Button>
                 </div>
                 <div dangerouslySetInnerHTML={{ __html: aiAnalysis.replace(/\n/g, '<br/>') }} />
                 <Button className="mt-8 bg-injaazh-600 text-white rounded-xl h-11 px-8 shadow-lg shadow-injaazh-600/20">
                    <Download className="w-4 h-4 mr-2" /> Download Report PDF
                 </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function ReportContainer({ title, children }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-10 pb-6 border-b-2 border-slate-50 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic">{title}</h2>
          <p className="text-slate-500 text-xs mt-1">For the period May 1, 2026 to May 31, 2026</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-sm">Injaazh ERP</p>
          <p className="text-[10px] text-slate-400">Printed: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

function ReportSection({ title, total, children }: any) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
        <span>{title}</span>
        <span>Amount (USD)</span>
      </div>
      <div className="space-y-3">
        {children}
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800 font-bold text-lg">
        <span className="text-slate-500">Total {title}</span>
        <span>${total.toLocaleString()}</span>
      </div>
    </div>
  );
}

function ReportRow({ label, amount }: any) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-600 dark:text-slate-400 font-medium">{label}</span>
      <span className="font-bold text-slate-900 dark:text-white">${amount.toLocaleString()}</span>
    </div>
  );
}
