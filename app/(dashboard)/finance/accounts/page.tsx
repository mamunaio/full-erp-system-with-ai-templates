import { Metadata } from "next";
import AccountTree from "../components/AccountTree";
import { Plus, Search, FileDown, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Chart of Accounts | Injaazh ERP",
};

export default function AccountsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Chart of Accounts
          </h1>
          <p className="text-slate-500 text-sm">
            Structure your financial ledger with assets, liabilities, equity, revenue, and expenses.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-slate-200">
            <FileDown className="w-5 h-5 mr-2" /> Export Template
          </Button>
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
            <Plus className="w-5 h-5 mr-2" /> New Account
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <AccountSummaryCard label="Total Assets" value="$150,000" color="text-emerald-600" />
        <AccountSummaryCard label="Total Liabilities" value="$5,300" color="text-rose-600" />
        <AccountSummaryCard label="Total Equity" value="$102,620" color="text-blue-600" />
        <AccountSummaryCard label="Net Profit" value="$42,080" color="text-injaazh-600" />
      </div>

      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search accounts by name or code..."
            className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl py-2 pl-10 pr-4 text-sm outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-xs font-bold text-injaazh-600">Expand All</Button>
          <Button variant="ghost" size="sm" className="text-xs font-bold text-slate-400">Collapse All</Button>
        </div>
      </div>

      <AccountTree />
    </div>
  );
}

function AccountSummaryCard({ label, value, color }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
      <p className={cn("text-2xl font-black", color)}>{value}</p>
    </div>
  );
}

import { cn } from "@/lib/utils";
