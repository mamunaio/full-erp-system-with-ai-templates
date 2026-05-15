"use client";

import { useState } from "react";
import { 
  FileText, TrendingUp, BarChart3, 
  Sparkles, Download, Calendar,
  ArrowLeft, ChevronRight, PieChart
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/finance" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-emerald-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Finance Hub
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Financial <span className="text-emerald-600">Reports</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Generate P&L, Balance Sheet, and AI-powered business insights.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-2xl h-14 px-8 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm active:scale-95 transition-all">
            <Calendar className="w-5 h-5 mr-3 text-slate-400" /> May 2026
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-emerald-600/20 active:scale-95 transition-all">
            <Download className="w-5 h-5 mr-3" /> Export All
          </Button>
        </div>
      </div>

      <Tabs defaultValue="pl" className="space-y-8">
        <div className="bg-white dark:bg-slate-900 p-2 rounded-[24px] border border-slate-200 dark:border-slate-800 shadow-sm w-fit">
          <TabsList className="bg-transparent h-12 space-x-1">
            <TabsTrigger value="pl" className="rounded-xl px-8 h-10 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white font-bold transition-all">P&L Statement</TabsTrigger>
            <TabsTrigger value="balance" className="rounded-xl px-8 h-10 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white font-bold transition-all">Balance Sheet</TabsTrigger>
            <TabsTrigger value="cashflow" className="rounded-xl px-8 h-10 data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-slate-800 data-[state=active]:text-slate-900 dark:data-[state=active]:text-white font-bold transition-all">Cash Flow</TabsTrigger>
            <TabsTrigger value="ai" className="rounded-xl px-8 h-10 data-[state=active]:bg-emerald-600 data-[state=active]:text-white font-black shadow-lg transition-all flex items-center">
              <Sparkles className="w-4 h-4 mr-2" /> AI Analysis
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="pl" className="outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
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

        <TabsContent value="balance" className="outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ReportContainer title="Balance Sheet">
             <div className="space-y-8">
                <ReportSection title="Assets" total={1240500}>
                  <ReportRow label="Cash & Bank Balances" amount={842500} />
                  <ReportRow label="Accounts Receivable" amount={158000} />
                  <ReportRow label="Inventory Value" amount={240000} />
                </ReportSection>
                <ReportSection title="Liabilities" total={485200}>
                  <ReportRow label="Accounts Payable" amount={85200} />
                  <ReportRow label="Short-term Loans" amount={150000} />
                  <ReportRow label="Accrued Expenses" amount={250000} />
                </ReportSection>
                <div className="pt-6 border-t-2 border-slate-900 dark:border-white flex justify-between items-center font-black text-2xl">
                  <span>Equity</span>
                  <span className="text-blue-600">$755,300</span>
                </div>
             </div>
          </ReportContainer>
        </TabsContent>

        <TabsContent value="cashflow" className="outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
          <ReportContainer title="Cash Flow Statement">
             <div className="space-y-8">
                <ReportSection title="Operating Activities" total={62500}>
                  <ReportRow label="Cash Received from Customers" amount={120000} />
                  <ReportRow label="Cash Paid to Suppliers" amount={-57500} />
                </ReportSection>
                <ReportSection title="Investing Activities" total={-15000}>
                  <ReportRow label="Purchase of Equipment" amount={-15000} />
                </ReportSection>
                <ReportSection title="Financing Activities" total={-10000}>
                  <ReportRow label="Loan Repayments" amount={-10000} />
                </ReportSection>
                <div className="pt-6 border-t-2 border-slate-900 dark:border-white flex justify-between items-center font-black text-2xl">
                  <span>Net Cash Increase</span>
                  <span className="text-amber-500">$37,500</span>
                </div>
             </div>
          </ReportContainer>
        </TabsContent>

        <TabsContent value="ai" className="outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="max-w-4xl mx-auto space-y-6">
            {!aiAnalysis ? (
              <div className="bg-slate-950 rounded-[40px] p-16 text-center text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[100px] pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
                
                <div className="relative z-10 space-y-8">
                  <div className="w-24 h-24 bg-white/5 backdrop-blur-2xl rounded-[32px] flex items-center justify-center mx-auto shadow-inner border border-white/10 group-hover:rotate-12 transition-transform duration-500">
                    <Sparkles className="w-12 h-12 text-emerald-400" />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-4xl font-black tracking-tight">AI Financial Brain</h2>
                    <p className="text-slate-400 max-w-md mx-auto text-sm font-medium leading-relaxed">Gemini analyzes your entire ledger to find hidden patterns, risks, and growth opportunities with institutional-grade precision.</p>
                  </div>
                  <Button 
                    onClick={generateAIAnalysis} 
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-12 h-16 rounded-[24px] shadow-2xl shadow-emerald-600/20 transition-all hover:scale-105 active:scale-95 text-lg"
                  >
                    {loading ? (
                      <div className="flex items-center">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
                        AUDITING DATA...
                      </div>
                    ) : "START AI AUDIT"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-12 shadow-sm relative overflow-hidden animate-in zoom-in-95 duration-500">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 rounded-full blur-3xl" />
                 <div className="flex justify-between items-center mb-10 pb-6 border-b border-slate-100 dark:border-slate-800 relative z-10">
                    <div className="flex items-center space-x-3 text-emerald-600">
                      <Sparkles className="w-6 h-6 animate-pulse" />
                      <span className="font-black uppercase tracking-widest text-xs">Gemini Intelligence Audit</span>
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => setAiAnalysis(null)} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-emerald-600">Regenerate Analysis</Button>
                 </div>
                 
                 <div className="relative z-10">
                    <div 
                      className="text-slate-700 dark:text-slate-300 font-medium leading-relaxed space-y-4" 
                      dangerouslySetInnerHTML={{ 
                        __html: aiAnalysis
                          .replace(/## (.*)/g, '<h2 class="text-2xl font-black text-slate-900 dark:text-white mt-8 mb-4 tracking-tight">$1</h2>')
                          .replace(/### (.*)/g, '<h3 class="text-lg font-black text-slate-900 dark:text-white mt-6 mb-2 tracking-tight">$1</h3>')
                          .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-black text-emerald-600">$1</strong>')
                          .replace(/\* (.*)/g, '<div class="flex items-start space-x-2 mb-2"><div class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div><span>$1</span></div>')
                          .replace(/\d\. (.*)/g, '<div class="flex items-start space-x-2 mb-2"><span class="font-black text-emerald-600 shrink-0">$0</span><span>$1</span></div>')
                      }} 
                    />
                 </div>
                 
                 <Button className="mt-12 bg-slate-900 dark:bg-slate-950 text-white rounded-2xl h-14 px-10 font-black shadow-xl transition-all active:scale-95">
                    <Download className="w-5 h-5 mr-3 text-emerald-500" /> DOWNLOAD FULL AUDIT
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
    <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-12 shadow-sm max-w-4xl mx-auto relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 dark:bg-slate-800/50 rounded-full blur-3xl pointer-events-none" />
      <div className="flex justify-between items-start mb-12 pb-8 border-b-2 border-slate-50 dark:border-slate-800 relative z-10">
        <div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tighter italic leading-none">{title}</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-3 opacity-60">Accounting Period: May 2026</p>
        </div>
        <div className="text-right">
          <p className="font-black text-xl tracking-tight text-emerald-600">Injaazh ERP</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ref: {new Date().getFullYear()}/AUDIT/05</p>
        </div>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

function ReportSection({ title, total, children }: any) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 bg-slate-50 dark:bg-slate-950 px-4 py-2 rounded-lg">
        <span>{title} Breakdown</span>
        <span>Amount (USD)</span>
      </div>
      <div className="space-y-4 px-4">
        {children}
      </div>
      <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800 font-black text-xl px-4">
        <span className="text-slate-400 uppercase text-xs tracking-widest">Total {title}</span>
        <span className="text-slate-900 dark:text-white">${total.toLocaleString()}</span>
      </div>
    </div>
  );
}

function ReportRow({ label, amount }: any) {
  return (
    <div className="flex justify-between items-center text-sm group cursor-default">
      <span className="text-slate-600 dark:text-slate-400 font-bold group-hover:text-emerald-600 transition-colors">{label}</span>
      <span className="font-black text-slate-900 dark:text-white">${amount.toLocaleString()}</span>
    </div>
  );
}
