"use client";

import { useState } from "react";
import { Check, X, Shield, Lock, Eye, Edit3, Trash2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const modules = [
  "Dashboard", "Finance", "CRM", "Inventory", "HRM", 
  "Sales", "Procurement", "Manufacturing", "Projects", "Analytics", "AI Hub"
];

const actions = ["View", "Create", "Edit", "Delete", "Export"];

export default function PermissionMatrix() {
  const [permissions, setPermissions] = useState<Record<string, string[]>>({
    "Dashboard": ["View", "Export"],
    "Finance": ["View", "Create", "Edit", "Export"],
    "CRM": ["View", "Create", "Edit", "Delete", "Export"],
    "Inventory": ["View", "Create", "Edit", "Export"],
    "HRM": ["View", "Create", "Edit"],
    "AI Hub": ["View", "Create", "Edit", "Export"],
  });

  const togglePermission = (module: string, action: string) => {
    setPermissions(prev => {
      const current = prev[module] || [];
      const updated = current.includes(action)
        ? current.filter(a => a !== action)
        : [...current, action];
      return { ...prev, [module]: updated };
    });
    toast.success(`Updated ${action} permission for ${module}`);
  };

  return (
    <div className="glass rounded-3xl border border-border/80 shadow-xl overflow-hidden space-y-2">
      <div className="p-5 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gold-500/10 text-gold-500 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground font-heading">Role-Based Access Control (RBAC) Matrix</h3>
            <p className="text-xs text-muted-foreground">Define granular permissions across executive, manager, and staff tiers</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-xs font-bold">
          <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" /> Allowed</span>
          <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-border mr-1.5" /> Restricted</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead>
            <tr className="bg-card/60 text-muted-foreground font-extrabold uppercase tracking-wider text-[10px] border-b border-border/60">
              <th className="p-4">Enterprise Module</th>
              {actions.map(action => (
                <th key={action} className="p-4 text-center">
                  {action}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {modules.map((mod) => (
              <tr key={mod} className="hover:bg-accent/40 transition-colors">
                <td className="p-4 font-bold text-foreground text-sm">
                  {mod}
                </td>
                {actions.map(action => {
                  const isEnabled = (permissions[mod] || []).includes(action);

                  return (
                    <td key={action} className="p-4 text-center">
                      <button
                        onClick={() => togglePermission(mod, action)}
                        className={cn(
                          "w-7 h-7 rounded-xl flex items-center justify-center mx-auto transition-all border",
                          isEnabled 
                            ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30 hover:bg-emerald-500/25" 
                            : "bg-accent/40 text-muted-foreground/40 border-border/50 hover:border-gold-500/30"
                        )}
                      >
                        {isEnabled ? <Check className="w-4 h-4" /> : <X className="w-3.5 h-3.5" />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
