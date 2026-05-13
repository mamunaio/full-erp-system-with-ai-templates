import { Metadata } from "next";
import { Wallet, FileDown, Calculator, CheckCircle2, MoreHorizontal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PayrollTable from "../components/PayrollTable";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Payroll | Injaazh ERP",
};

export default function PayrollPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Payroll Management
          </h1>
          <p className="text-slate-500 text-sm">
            Process salaries, calculate taxes, and generate payslips.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-slate-200">
            <Calculator className="w-5 h-5 mr-2" /> Recalculate
          </Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
            Generate May Payroll
          </Button>
        </div>
      </div>

      {/* Summary Row */}
      <div className="grid gap-6 md:grid-cols-3">
        <PayrollSummaryCard label="Total Net Payout" value="$842,500" color="text-injaazh-600" />
        <PayrollSummaryCard label="Total Deductions" value="$42,150" color="text-rose-600" />
        <PayrollSummaryCard label="Approved Payments" value="124 / 156" color="text-emerald-600" />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Payroll - May 2026</h2>
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" className="rounded-lg h-9">
            <CheckCircle2 className="w-4 h-4 mr-2" /> Bulk Approve
          </Button>
          <Button size="sm" variant="outline" className="rounded-lg h-9">
            <FileDown className="w-4 h-4 mr-2" /> Download All PDF
          </Button>
        </div>
      </div>

      <PayrollTable />
    </div>
  );
}

function PayrollSummaryCard({ label, value, color }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative overflow-hidden group">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className={cn("text-3xl font-bold", color)}>{value}</p>
      <div className="absolute right-[-10px] bottom-[-10px] w-20 h-20 bg-slate-50 dark:bg-slate-950 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="w-6 h-6 text-slate-300" />
      </div>
    </div>
  );
}
