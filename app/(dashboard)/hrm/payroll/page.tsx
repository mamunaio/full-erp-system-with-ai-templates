"use client";

import { useState } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Wallet, FileDown, Calculator, CheckCircle2, MoreHorizontal, ArrowRight, ArrowLeft, TrendingUp, TrendingDown, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import PayrollTable from "../components/PayrollTable";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function PayrollPage() {
  const [mounted, setMounted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleGeneratePayroll = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success("May 2026 Payroll generated successfully!", {
        description: "156 payslips have been created and are ready for review.",
      });
    }, 2000);
  };

  const handleBulkApprove = () => {
    setIsApproving(true);
    setTimeout(() => {
      setIsApproving(false);
      toast.success("All pending payrolls approved!", {
        description: "Disbursement process has been initiated.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/hrm" className="group flex items-center text-xs font-bold text-slate-400 hover:text-injaazh-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            BACK TO DASHBOARD
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Payroll <span className="text-injaazh-600">Hub</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage your company's financial heartbeat with precision.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={() => toast.info("Recalculating all entries...")}
            className="rounded-2xl h-14 px-8 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-50 transition-all"
          >
            <Calculator className="w-5 h-5 mr-3 text-slate-400" /> Recalculate
          </Button>
          <Button 
            onClick={handleGeneratePayroll}
            disabled={isGenerating}
            className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-injaazh-600/20 active:scale-95 transition-all min-w-[200px]"
          >
            {isGenerating ? (
              <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Generating...</>
            ) : (
              "Generate May Payroll"
            )}
          </Button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid gap-6 md:grid-cols-3">
        <PayrollSummaryCard 
          label="Total Net Payout" 
          value="$842,500" 
          subValue="+12.5% from last month"
          icon={TrendingUp}
          color="text-injaazh-600" 
          bgColor="bg-injaazh-50 dark:bg-injaazh-900/20"
        />
        <PayrollSummaryCard 
          label="Total Deductions" 
          value="$42,150" 
          subValue="-2.4% since Q1"
          icon={TrendingDown}
          color="text-rose-600" 
          bgColor="bg-rose-50 dark:bg-rose-900/20"
        />
        <PayrollSummaryCard 
          label="Approved Payments" 
          value="124 / 156" 
          subValue="85% completion rate"
          icon={Users}
          color="text-emerald-600" 
          bgColor="bg-emerald-50 dark:bg-emerald-900/20"
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Payroll - May 2026</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Real-time financial logs</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleBulkApprove}
            disabled={isApproving}
            className="rounded-xl h-11 px-6 font-bold border-slate-200 dark:border-slate-800"
          >
            {isApproving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4 mr-2 text-emerald-500" />
            )}
            Bulk Approve
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => toast.promise(new Promise(res => setTimeout(res, 2000)), {
              loading: 'Preparing PDF archives...',
              success: 'All payslips downloaded successfully!',
              error: 'Failed to generate archive.',
            })}
            className="rounded-xl h-11 px-6 font-bold border-slate-200 dark:border-slate-800"
          >
            <FileDown className="w-4 h-4 mr-2 text-injaazh-500" /> Download All PDF
          </Button>
        </div>
      </div>

      <PayrollTable />
    </div>
  );
}

function PayrollSummaryCard({ label, value, subValue, icon: Icon, color, bgColor }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm relative overflow-hidden group hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 duration-500", bgColor)}>
          <Icon className={cn("w-7 h-7", color)} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className={cn("text-3xl font-black tracking-tight", color)}>{value}</p>
        </div>
      </div>
      <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-tight">
        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse" />
        {subValue}
      </div>
    </div>
  );
}
