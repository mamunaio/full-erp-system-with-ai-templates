"use client";

import { useRouter } from "next/navigation";
import { 
  MoreVertical, Eye, Edit, Trash2, 
  Search, Filter, FileSpreadsheet, Mail,
  ChevronLeft, ChevronRight, Hash, Building2,
  Activity, ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Employee {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  phone: string;
  status: string;
  department?: { name: string };
  designation?: { name: string };
}

export default function EmployeeTable({ employees }: { employees: Employee[] }) {
  const router = useRouter();

  return (
    <div className="bg-white dark:bg-slate-900 overflow-hidden">
      {/* Tactical Toolbar */}
      <div className="p-8 border-b border-slate-50 dark:border-slate-800/50 flex flex-wrap items-center justify-between gap-6">
        <div className="relative flex-1 min-w-[320px] group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search Talent Matrix..."
            className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-[20px] h-14 pl-12 pr-6 text-sm font-medium focus:ring-2 focus:ring-blue-600/10 outline-none transition-all placeholder:text-slate-400"
          />
        </div>
        <div className="flex items-center space-x-3">
          <ToolbarButton icon={Filter} label="Filter" />
          <ToolbarButton icon={FileSpreadsheet} label="Export" />
          <ToolbarButton icon={Mail} label="Broadcast" />
        </div>
      </div>

      {/* Immersive Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-950/30">
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Personnel Identity</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Tactical ID</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Department Node</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Operational Status</th>
              <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Directives</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800/50">
            {employees.map((emp) => (
              <tr 
                key={emp.id} 
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 cursor-pointer transition-all group"
                onClick={() => router.push(`/hrm/employees/${emp.id}`)}
              >
                <td className="px-8 py-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-[18px] bg-gradient-to-tr from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center text-slate-500 font-black italic shadow-inner group-hover:scale-105 transition-transform">
                      {emp.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-black italic uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">{emp.name}</p>
                      <p className="text-[10px] font-bold text-slate-400 flex items-center mt-0.5">
                        <Mail className="w-3 h-3 mr-1 opacity-50" /> {emp.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center space-x-2 text-slate-500">
                      <Hash className="w-3.5 h-3.5 opacity-50" />
                      <span className="text-[11px] font-black tracking-tighter italic">{emp.employeeId || "UNASSIGNED"}</span>
                   </div>
                </td>
                <td className="px-8 py-6">
                   <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400">
                      <Building2 className="w-3.5 h-3.5 opacity-50" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{emp.department?.name || "Global Node"}</span>
                   </div>
                </td>
                <td className="px-8 py-6">
                  <div className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                    emp.status === "ACTIVE" ? "bg-emerald-50 text-emerald-600" : "bg-slate-50 text-slate-500"
                  )}>
                    <Activity className="w-3 h-3 mr-1.5" />
                    {emp.status}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                    <ActionIconButton icon={Eye} color="blue" />
                    <ActionIconButton icon={Edit} color="emerald" />
                    <ActionIconButton icon={Trash2} color="rose" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modern Pagination */}
      <div className="p-8 border-t border-slate-50 dark:border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Showing 1 - {employees.length} of {employees.length} Personnel</p>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200 dark:border-slate-800" disabled>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-1">
             <Button className="h-10 w-10 rounded-xl bg-blue-600 text-white font-black italic shadow-lg shadow-blue-600/20">1</Button>
          </div>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200 dark:border-slate-800">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function ToolbarButton({ icon: Icon, label }: any) {
  return (
    <Button variant="outline" className="rounded-[18px] h-14 px-6 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all">
       <Icon className="w-4 h-4 mr-2 text-blue-600" /> {label}
    </Button>
  );
}

function ActionIconButton({ icon: Icon, color }: any) {
  const colorMap: any = {
    blue: "text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
    emerald: "text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20",
    rose: "text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20",
  };

  return (
    <Button variant="ghost" size="icon" className={cn("h-10 w-10 rounded-xl transition-all", colorMap[color])}>
      <Icon className="w-4 h-4" />
    </Button>
  );
}
