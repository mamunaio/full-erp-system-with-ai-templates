"use client";

import { useState, useEffect } from "react";
import { Check, X, Clock, Loader2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function AttendanceList({ onUpdate }: { onUpdate: () => void }) {
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/hrm/employees");
      const data = await res.json();
      setEmployees(data);
    } catch (error) {
      toast.error("Failed to load employees");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const markAttendance = async (employeeId: string, status: string) => {
    setMarkingId(employeeId);
    try {
      const res = await fetch("/api/hrm/attendance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, status })
      });

      if (!res.ok) throw new Error();

      toast.success(`Marked as ${status}`);
      onUpdate();
    } catch (error) {
      toast.error("Failed to update attendance");
    } finally {
      setMarkingId(null);
    }
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(search.toLowerCase()) || 
    emp.employeeId.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-injaazh-600" /></div>;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
      <div className="p-4 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
        <h3 className="font-bold">Daily Attendance Log</h3>
        <div className="relative w-64">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <input 
             type="text" 
             placeholder="Search employee..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-xl py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-injaazh-500/20 outline-none transition-all"
           />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-900/50 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
              <th className="p-4">Employee</th>
              <th className="p-4">ID</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {filteredEmployees.map((emp) => (
              <tr key={emp.id} className="hover:bg-slate-50/30 transition-colors">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-injaazh-100 text-injaazh-600 flex items-center justify-center font-bold text-xs">
                      {emp.name[0]}
                    </div>
                    <span className="font-medium">{emp.name}</span>
                  </div>
                </td>
                <td className="p-4 text-xs font-mono text-slate-500">{emp.employeeId}</td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => markAttendance(emp.id, "PRESENT")}
                      disabled={markingId === emp.id}
                      className="h-8 rounded-lg border-emerald-100 text-emerald-600 hover:bg-emerald-50"
                    >
                      <Check className="w-4 h-4 mr-1" /> Present
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => markAttendance(emp.id, "LATE")}
                      disabled={markingId === emp.id}
                      className="h-8 rounded-lg border-amber-100 text-amber-600 hover:bg-amber-50"
                    >
                      <Clock className="w-4 h-4 mr-1" /> Late
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => markAttendance(emp.id, "ABSENT")}
                      disabled={markingId === emp.id}
                      className="h-8 rounded-lg border-rose-100 text-rose-600 hover:bg-rose-50"
                    >
                      <X className="w-4 h-4 mr-1" /> Absent
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
