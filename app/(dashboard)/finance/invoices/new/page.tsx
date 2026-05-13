import { Metadata } from "next";
import InvoiceBuilder from "../../components/InvoiceBuilder";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "New Invoice | Injaazh ERP",
};

export default function NewInvoicePage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center space-x-4">
        <Link href="/finance/invoices" className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Create Professional Invoice
          </h1>
          <p className="text-slate-500 text-xs">Draft, preview and send invoices to your customers.</p>
        </div>
      </div>

      <InvoiceBuilder />
    </div>
  );
}
