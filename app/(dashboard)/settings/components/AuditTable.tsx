"use client";

import { 
  History, User, Activity, 
  Search, Filter, Download,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const logs = [
  { id: 1, user: "Alex Rivera", action: "Update BOM", module: "MANUFACTURING", time: "2m ago", ip: "192.168.1.1", detail: "Standard Assembly v1.0 updated" },
  { id: 2, user: "Sarah Jenkins", action: "Create Lead", module: "CRM", time: "15m ago", ip: "192.168.1.45", detail: "New lead: Meta Corp" },
  { id: 3, user: "System", action: "Inventory Backup", module: "SYSTEM", time: "1h ago", ip: "Local", detail: "Daily backup completed" },
  { id: 4, user: "Mike Johnson", action: "Delete Invoice", module: "FINANCE", time: "3h ago", ip: "102.34.12.1", detail: "Invoice #INV-2024-001 deleted" },
];

export default function AuditTable() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <input type="text" placeholder="Search by user, action or module..." className="w-full bg-white dark:bg-slate-900 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none shadow-sm" />
        </div>
        <div className="flex items-center space-x-2">
           <Button variant="outline" className="rounded-xl h-10 border-slate-200"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
           <Button variant="outline" className="rounded-xl h-10 border-slate-200"><Download className="w-4 h-4 mr-2" /> Export Log</Button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                <th className="p-6 border-b dark:border-slate-800">Timestamp</th>
                <th className="p-6 border-b dark:border-slate-800">User</th>
                <th className="p-6 border-b dark:border-slate-800">Action</th>
                <th className="p-6 border-b dark:border-slate-800">Module</th>
                <th className="p-6 border-b dark:border-slate-800">IP Address</th>
                <th className="p-6 border-b dark:border-slate-800">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="p-6 text-slate-400">{log.time}</td>
                  <td className="p-6">
                    <div className="flex items-center space-x-2">
                       <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">
                          {log.user.split(' ').map(n => n[0]).join('')}
                       </div>
                       <span className="font-bold text-slate-900 dark:text-white">{log.user}</span>
                    </div>
                  </td>
                  <td className="p-6 font-medium">{log.action}</td>
                  <td className="p-6">
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                       {log.module}
                    </span>
                  </td>
                  <td className="p-6 font-mono text-[10px] text-slate-400">{log.ip}</td>
                  <td className="p-6">
                    <div className="flex items-center justify-between">
                       <span className="text-slate-500 text-xs">{log.detail}</span>
                       <button className="opacity-0 group-hover:opacity-100 transition-opacity text-injaazh-600">
                          <ExternalLink className="w-4 h-4" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
