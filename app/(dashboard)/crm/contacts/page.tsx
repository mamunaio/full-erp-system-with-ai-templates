import { Metadata } from "next";
import CRMStats from "../components/CRMStats";
import ContactTable from "../components/ContactTable";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Contacts | Injaazh ERP",
};

export default function ContactsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            CRM Contacts
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your leads, prospects, and customers in one place.
          </p>
        </div>
      </div>

      <div className="relative group rounded-2xl border border-injaazh-100 bg-injaazh-50/50 dark:bg-injaazh-950/20 dark:border-injaazh-900/30 p-4 pl-12 backdrop-blur-sm overflow-hidden">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Sparkles className="w-5 h-5 text-injaazh-600" />
        </div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          <span className="font-bold text-injaazh-600">AI Suggestion:</span> Best time to follow up with 
          <span className="font-bold"> Alex Rivera</span> is today between 2 PM - 4 PM.
          <span className="ml-2 text-injaazh-500 cursor-pointer hover:underline">Draft Email →</span>
        </p>
      </div>

      <CRMStats />
      
      <ContactTable />
    </div>
  );
}
