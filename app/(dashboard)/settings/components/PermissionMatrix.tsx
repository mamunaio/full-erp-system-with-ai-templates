"use client";

import { useState } from "react";
import { Check, X, Shield, Lock, Eye, Edit3, Trash2, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
  "Dashboard", "HRM", "CRM", "Inventory", "Finance", 
  "Sales", "Procurement", "Manufacturing", "Projects", "Analytics"
];

const actions = ["View", "Create", "Edit", "Delete", "Export"];

export default function PermissionMatrix() {
  const [permissions, setPermissions] = useState<Record<string, string[]>>({
    "Dashboard": ["View", "Export"],
    "HRM": ["View", "Create", "Edit"],
    "CRM": ["View", "Create", "Edit", "Delete", "Export"],
  });

  const togglePermission = (module: string, action: string) => {
    setPermissions(prev => {
      const current = prev[module] || [];
      if (current.includes(action)) {
        return { ...prev, [module]: current.filter(a => a !== action) };
      } else {
        return { ...prev, [module]: [...current, action] };
      }
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 flex items-center justify-between">
         <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-injaazh-600 flex items-center justify-center text-white shadow-lg shadow-injaazh-600/20">
               <Shield className="w-5 h-5" />
            </div>
            <div>
               <h3 className="text-sm font-bold uppercase tracking-widest text-slate-900 dark:text-white">Permission Matrix</h3>
               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Define granular access for custom roles</p>
            </div>
         </div>
         <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400">
            <span className="flex items-center"><div className="w-2 h-2 rounded-full bg-emerald-500 mr-1.5" /> Enabled</span>
            <span className="flex items-center ml-4"><div className="w-2 h-2 rounded-full bg-slate-200 mr-1.5" /> Disabled</span>
         </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50">
              <th className="p-6 border-b dark:border-slate-800 font-bold text-slate-500 uppercase tracking-widest text-[10px]">Module</th>
              {actions.map(action => (
                <th key={action} className="p-6 border-b dark:border-slate-800 text-center font-bold text-slate-500 uppercase tracking-widest text-[10px]">
                   <div className="flex flex-col items-center space-y-2">
                      {action === "View" && <Eye className="w-3 h-3" />}
                      {action === "Create" && <Lock className="w-3 h-3" />}
                      {action === "Edit" && <Edit3 className="w-3 h-3" />}
                      {action === "Delete" && <Trash2 className="w-3 h-3" />}
                      {action === "Export" && <Download className="w-3 h-3" />}
                      <span>{action}</span>
                   </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {modules.map(module => (
              <tr key={module} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="p-6 font-bold text-slate-900 dark:text-white">{module}</td>
                {actions.map(action => {
                  const isEnabled = permissions[module]?.includes(action);
                  const isNA = (module === "Dashboard" && ["Create", "Edit", "Delete"].includes(action));

                  return (
                    <td key={action} className="p-6 text-center border-l border-slate-50 dark:border-slate-800">
                      {isNA ? (
                        <span className="text-slate-200 dark:text-slate-800">—</span>
                      ) : (
                        <button 
                          onClick={() => togglePermission(module, action)}
                          className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300",
                            isEnabled ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" : "bg-slate-100 dark:bg-slate-800 text-slate-300"
                          )}
                        >
                          {isEnabled ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </button>
                      )}
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
