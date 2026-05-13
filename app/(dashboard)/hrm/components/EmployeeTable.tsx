"use client";

import { useRouter } from "next/navigation";
import { 
  MoreHorizontal, Eye, Edit, Trash2, 
  Search, Filter, FileSpreadsheet, Mail 
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
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      {/* Table Header / Toolbar */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[300px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, ID or department..."
            className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-injaazh-500/20 outline-none transition-all"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="rounded-lg h-9">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg h-9">
            <FileSpreadsheet className="w-4 h-4 mr-2" /> Export CSV
          </Button>
          <Button variant="outline" size="sm" className="rounded-lg h-9">
            <Mail className="w-4 h-4 mr-2" /> Bulk Email
          </Button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <th className="p-4 border-b dark:border-slate-800">Employee</th>
              <th className="p-4 border-b dark:border-slate-800">ID</th>
              <th className="p-4 border-b dark:border-slate-800">Department</th>
              <th className="p-4 border-b dark:border-slate-800">Status</th>
              <th className="p-4 border-b dark:border-slate-800 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {employees.map((emp) => (
              <tr 
                key={emp.id} 
                className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group"
                onClick={() => router.push(`/hrm/employees/${emp.id}`)}
              >
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-full bg-injaazh-100 text-injaazh-600 flex items-center justify-center font-bold text-sm">
                      {emp.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{emp.name}</p>
                      <p className="text-[10px] text-slate-500">{emp.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 font-mono text-[11px] text-slate-500">{emp.employeeId}</td>
                <td className="p-4 font-medium text-slate-600 dark:text-slate-400">
                  {emp.department?.name || "N/A"}
                </td>
                <td className="p-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                    emp.status === "ACTIVE" ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"
                  )}>
                    {emp.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-injaazh-600">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-blue-600">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:text-rose-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        <p className="text-xs text-slate-500">Showing 1 to 10 of 156 employees</p>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg" disabled>Previous</Button>
          <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg bg-injaazh-600 text-white border-injaazh-600">1</Button>
          <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg">2</Button>
          <Button variant="outline" size="sm" className="h-8 px-3 rounded-lg">Next</Button>
        </div>
      </div>
    </div>
  );
}
