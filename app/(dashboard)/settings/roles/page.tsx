import { Metadata } from "next";
import PermissionMatrix from "../components/PermissionMatrix";
import { 
  Plus, Shield, Info, 
  ChevronRight, Save, Trash2 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Roles & Permissions | Injaazh ERP",
};

export default function RolesSettingsPage() {
  const roles = [
    { name: "Super Admin", count: 2, type: "system" },
    { name: "Manager", count: 8, type: "custom" },
    { name: "HR Specialist", count: 3, type: "custom" },
    { name: "Sales Rep", count: 15, type: "custom" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Roles & Permissions
          </h1>
          <p className="text-slate-500 text-sm">
            Manage user roles and define granular access control across modules.
          </p>
        </div>
        <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
          <Plus className="w-5 h-5 mr-2" /> Create New Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Roles Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2 mb-4">Available Roles</h3>
          {roles.map((role) => (
            <div 
              key={role.name} 
              className={cn(
                "group flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all",
                role.name === "Manager" ? "bg-injaazh-600 text-white shadow-xl shadow-injaazh-600/20" : "bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-injaazh-200"
              )}
            >
              <div className="flex items-center space-x-3">
                <Shield className={cn("w-4 h-4", role.name === "Manager" ? "text-white/50" : "text-slate-300")} />
                <div>
                   <p className="text-sm font-bold">{role.name}</p>
                   <p className={cn("text-[10px] font-medium", role.name === "Manager" ? "text-white/60" : "text-slate-400")}>{role.count} Users</p>
                </div>
              </div>
              <ChevronRight className={cn("w-4 h-4", role.name === "Manager" ? "text-white" : "text-slate-300")} />
            </div>
          ))}
        </div>

        {/* Permission Builder */}
        <div className="lg:col-span-3 space-y-8">
           <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30 p-6 rounded-[32px] flex items-start space-x-4">
              <Info className="w-5 h-5 text-amber-600 mt-0.5" />
              <div className="flex-1">
                 <p className="text-sm font-bold text-amber-900 dark:text-amber-200">System Role Notice</p>
                 <p className="text-xs text-amber-700 dark:text-amber-300/70 mt-1">
                    You are editing the <span className="font-bold">Manager</span> role. Changes will take effect immediately for all 8 assigned users.
                 </p>
              </div>
           </div>

           <PermissionMatrix />

           <div className="flex items-center justify-between pt-8">
              <Button variant="ghost" className="text-rose-500 hover:text-rose-600 font-bold">
                 <Trash2 className="w-4 h-4 mr-2" /> Delete Role
              </Button>
              <div className="flex items-center space-x-3">
                 <Button variant="outline" className="rounded-xl h-12 px-8 font-bold border-slate-200">Cancel</Button>
                 <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-12 px-10 font-bold shadow-xl shadow-injaazh-600/30">
                    <Save className="w-4 h-4 mr-2" /> Save Permissions
                 </Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

import { cn } from "@/lib/utils";
