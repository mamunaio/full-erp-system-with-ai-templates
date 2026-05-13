import { Metadata } from "next";
import AuditTable from "../components/AuditTable";
import { 
  ShieldCheck, Info, 
  Download, Filter 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Audit Logs | Injaazh ERP",
};

export default function AuditLogsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            System Audit Logs
          </h1>
          <p className="text-slate-500 text-sm">
            Track all system actions, record modifications, and user logins for compliance.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[40px] p-10 text-white shadow-2xl relative overflow-hidden mb-12">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
           <div className="flex items-center space-x-6">
              <div className="w-16 h-16 rounded-[24px] bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xs font-bold text-emerald-400 uppercase tracking-[0.2em] mb-1">Compliance Ready</p>
                <h3 className="text-2xl font-black italic tracking-tighter uppercase">Audit Trail is <span className="text-emerald-400">Active</span></h3>
                <p className="text-slate-400 text-sm mt-1">Logs are tamper-proof and retained for 365 days by default.</p>
              </div>
           </div>
           <div className="flex bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-x-8">
              <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Logs Today</p>
                 <p className="text-xl font-black">1,242</p>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="text-center">
                 <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Security Flags</p>
                 <p className="text-xl font-black text-rose-400">0</p>
              </div>
           </div>
        </div>
        <div className="absolute top-[-50%] right-[-10%] w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px]" />
      </div>

      <AuditTable />
    </div>
  );
}
