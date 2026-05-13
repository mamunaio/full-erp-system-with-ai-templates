import { Metadata } from "next";
import InvoiceTable from "../components/InvoiceTable";
import FinanceStats from "../components/FinanceStats";
import { Plus, FileDown, Mail, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Invoices | Injaazh ERP",
};

export default function InvoicesPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Billing & Invoices
          </h1>
          <p className="text-slate-500 text-sm">
            Create professional invoices, track payments, and manage receivables.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="rounded-xl h-11 px-6 border-slate-200">
            <Mail className="w-5 h-5 mr-2" /> Send Reminders
          </Button>
          <Link href="/finance/invoices/new">
            <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
              <Plus className="w-5 h-5 mr-2" /> New Invoice
            </Button>
          </Link>
        </div>
      </div>

      {/* Overdue Alert */}
      <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/30 p-4 rounded-2xl flex items-center space-x-4">
        <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0 shadow-lg shadow-rose-500/20">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-rose-800 dark:text-rose-200">Attention: 8 Overdue Invoices</p>
          <p className="text-xs text-rose-700 dark:text-rose-300/70">Total outstanding balance: <span className="font-bold">$12,450.00</span>. Follow up with customers immediately.</p>
        </div>
        <Button size="sm" variant="outline" className="rounded-lg border-rose-200 text-rose-700 hover:bg-rose-100">View All</Button>
      </div>

      <FinanceStats />

      <InvoiceTable />
    </div>
  );
}

import Link from "next/link";
