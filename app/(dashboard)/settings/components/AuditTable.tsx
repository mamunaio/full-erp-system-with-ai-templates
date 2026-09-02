"use client";

import { useState } from "react";
import { 
  History, User, Activity, 
  Search, Filter, Download,
  ExternalLink, ShieldCheck, FileSpreadsheet
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const logs = [
  { id: 1, user: "Farhan Ahmed", action: "Dispatched Payroll Batch", module: "HRM", time: "2m ago", ip: "103.145.112.4", detail: "$248.5K monthly payroll executed" },
  { id: 2, user: "Nusrat Jahan", action: "Moved Deal to Proposal", module: "CRM", time: "15m ago", ip: "103.145.112.18", detail: "Meta Corp ($85k) moved to Proposal" },
  { id: 3, user: "System Daemon", action: "Multi-Warehouse Inventory Sync", module: "INVENTORY", time: "1h ago", ip: "Internal Loopback", detail: "All 3 mega-hubs synchronized" },
  { id: 4, user: "Tariqul Islam", action: "Reconciled Master Ledger", module: "FINANCE", time: "3h ago", ip: "103.145.112.22", detail: "Zero discrepancy trial balance" },
];

export default function AuditTable() {
  const [search, setSearch] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      toast.success("Security & Transaction Audit Log exported to CSV/PDF dossier.");
    }, 1000);
  };

  const filteredLogs = logs.filter((l) => 
    l.user.toLowerCase().includes(search.toLowerCase()) || 
    l.action.toLowerCase().includes(search.toLowerCase()) || 
    l.module.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user, action or module..." 
            className="w-full bg-background border border-border rounded-xl py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-gold-500/50" 
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button 
            onClick={handleExport}
            disabled={isExporting}
            variant="outline" 
            className="rounded-xl h-10 border-border text-xs font-bold bg-card/60"
          >
            <FileSpreadsheet className="w-4 h-4 mr-2 text-gold-500" /> Export Audit Log
          </Button>
        </div>
      </div>

      <div className="glass rounded-3xl border border-border/80 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-card/60 text-muted-foreground font-extrabold uppercase tracking-wider text-[10px] border-b border-border/60">
                <th className="p-4">Timestamp</th>
                <th className="p-4">User</th>
                <th className="p-4">Action</th>
                <th className="p-4">Module</th>
                <th className="p-4">IP Address</th>
                <th className="p-4">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-accent/40 transition-colors group">
                  <td className="p-4 text-muted-foreground font-medium">{log.time}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-7 h-7 rounded-xl gold-gradient flex items-center justify-center text-[10px] font-extrabold text-obsidian-950 shrink-0">
                        {log.user.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-bold text-foreground">{log.user}</span>
                    </div>
                  </td>
                  <td className="p-4 font-bold text-foreground">{log.action}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 text-[9px] font-extrabold uppercase tracking-wider">
                      {log.module}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[10px] text-muted-foreground">{log.ip}</td>
                  <td className="p-4 text-muted-foreground">{log.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
