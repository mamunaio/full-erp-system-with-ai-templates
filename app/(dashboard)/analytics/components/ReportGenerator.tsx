"use client";

import { useState } from "react";
import { 
  FileText, PieChart, Users, 
  Box, TrendingUp, Calendar,
  Download, Sparkles, CheckCircle2,
  ArrowRight, FileSpreadsheet, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const reportTypes = [
  { id: "profit_loss", label: "P&L Statement", category: "Financial", icon: PieChart, color: "injaazh" },
  { id: "balance_sheet", label: "Balance Sheet", category: "Financial", icon: TrendingUp, color: "emerald" },
  { id: "attendance", label: "Attendance Summary", category: "HR", icon: Users, color: "blue" },
  { id: "stock_valuation", label: "Stock Valuation", category: "Inventory", icon: Box, color: "amber" },
  { id: "executive_dashboard", label: "Executive Summary", category: "Executive", icon: Sparkles, color: "purple" },
];

export default function ReportGenerator() {
  const [step, setStep] = useState(1);
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    // Simulate generation
    await new Promise(r => setTimeout(r, 2000));
    setResult({
      pdfUrl: "#",
      excelUrl: "#",
      aiSummary: "Based on your Q3 data, revenue has grown by 12.5%..."
    });
    setIsLoading(false);
    setStep(3);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in zoom-in duration-500">
      <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
        {/* Progress Header */}
        <div className="bg-slate-50 dark:bg-slate-950 p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
           <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-injaazh-600 flex items-center justify-center text-white shadow-lg">
                 <FileText className="w-6 h-6" />
              </div>
              <div>
                 <h2 className="text-xl font-black italic tracking-tighter uppercase">Nexus Report Engine</h2>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">Step {step} of 3</p>
              </div>
           </div>
           <div className="flex space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all duration-500",
                  step >= i ? "bg-injaazh-600 scale-125" : "bg-slate-200 dark:bg-slate-800"
                )} />
              ))}
           </div>
        </div>

        <div className="p-12">
           {step === 1 && (
             <div className="space-y-8">
                <div className="text-center">
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Choose a Report Type</h3>
                   <p className="text-slate-400 text-sm mt-1">Select the business domain you want to analyze.</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   {reportTypes.map((type) => (
                     <button 
                      key={type.id}
                      onClick={() => setSelectedReport(type.id)}
                      className={cn(
                        "p-6 rounded-[32px] border-2 text-left transition-all flex items-start space-x-4",
                        selectedReport === type.id ? "border-injaazh-600 bg-injaazh-50 dark:bg-injaazh-950/20" : "border-slate-100 dark:border-slate-800 hover:border-injaazh-200"
                      )}
                     >
                        <div className={cn(
                          "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0",
                          selectedReport === type.id ? "bg-injaazh-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
                        )}>
                           <type.icon className="w-6 h-6" />
                        </div>
                        <div>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{type.category}</p>
                           <h4 className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">{type.label}</h4>
                        </div>
                     </button>
                   ))}
                </div>
                <div className="flex justify-end">
                   <Button 
                    disabled={!selectedReport}
                    onClick={() => setStep(2)}
                    className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-12 px-8 font-bold shadow-xl"
                   >
                     Continue <ArrowRight className="w-4 h-4 ml-2" />
                   </Button>
                </div>
             </div>
           )}

           {step === 2 && (
             <div className="space-y-8">
                <div className="text-center">
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Configure Report</h3>
                   <p className="text-slate-400 text-sm mt-1">Define the period and filters for the data.</p>
                </div>
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Time Period</label>
                      <select className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl p-4 text-sm font-bold outline-none">
                         <option>This Month</option>
                         <option>Last Quarter</option>
                         <option>Last Fiscal Year</option>
                         <option>Custom Range</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Output Format</label>
                      <div className="flex space-x-2">
                         <Button variant="outline" className="flex-1 rounded-xl h-12 border-slate-200">PDF</Button>
                         <Button variant="outline" className="flex-1 rounded-xl h-12 border-slate-200">Excel</Button>
                      </div>
                   </div>
                </div>
                <div className="p-6 rounded-3xl bg-injaazh-50/50 dark:bg-injaazh-950/20 border border-injaazh-100 dark:border-injaazh-900/30 flex items-center justify-between">
                   <div className="flex items-center space-x-3">
                      <Sparkles className="w-5 h-5 text-injaazh-600" />
                      <span className="text-sm font-bold text-injaazh-900 dark:text-injaazh-200">Include AI-Powered Executive Summary</span>
                   </div>
                   <input type="checkbox" checked readOnly className="w-5 h-5 accent-injaazh-600" />
                </div>
                <div className="flex justify-between">
                   <Button variant="ghost" onClick={() => setStep(1)} className="font-bold text-slate-400">Back</Button>
                   <Button 
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-12 px-12 font-bold shadow-xl"
                   >
                     {isLoading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Processing...</> : "Generate Report"}
                   </Button>
                </div>
             </div>
           )}

           {step === 3 && (
             <div className="space-y-10 py-4">
                <div className="text-center space-y-4">
                   <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-600">
                      <CheckCircle2 className="w-10 h-10" />
                   </div>
                   <h3 className="text-3xl font-black italic tracking-tighter uppercase">Report Generated!</h3>
                   <p className="text-slate-400 text-sm">Your report is ready for download and preview.</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 p-8 rounded-[32px] border border-slate-100 dark:border-slate-800">
                   <h4 className="text-[10px] font-bold text-injaazh-600 uppercase tracking-[0.2em] mb-4 flex items-center">
                      <Sparkles className="w-3 h-3 mr-2" /> AI Summary Preview
                   </h4>
                   <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300 italic">
                      &ldquo;{result.aiSummary}&rdquo;
                   </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <Button className="h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 font-bold shadow-sm">
                      <Download className="w-5 h-5 mr-3 text-injaazh-600" /> Download PDF
                   </Button>
                   <Button className="h-16 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white hover:bg-slate-50 font-bold shadow-sm">
                      <FileSpreadsheet className="w-5 h-5 mr-3 text-emerald-600" /> Download Excel
                   </Button>
                </div>

                <div className="flex justify-center">
                   <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-400 font-bold">Start New Report</Button>
                </div>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
