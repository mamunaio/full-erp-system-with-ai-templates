"use client";

import { useState, useEffect } from "react";
import { Check, X, Clock, Loader2, Search, Edit2, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

export default function AttendanceList({ onUpdate }: { onUpdate: () => void }) {
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingId, setMarkingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [attendanceMap, setAttendanceMap] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
    fetchEmployees();
  }, []);

  const isSuperAdmin = session?.user?.role === "SUPER_ADMIN";

  const fetchEmployees = async () => {
    try {
      const res = await fetch("/api/hrm/employees");
      const data = await res.json();
      setEmployees(data);
      
      // Persistence: Load from localStorage for the current date
      const today = new Date().toISOString().split('T')[0];
      const savedAttendance = localStorage.getItem(`attendance_${today}`);
      if (savedAttendance) {
        setAttendanceMap(JSON.parse(savedAttendance));
      }
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
      // Simulate API call
      await new Promise(res => setTimeout(res, 500));

      const newMap = { ...attendanceMap, [employeeId]: status };
      setAttendanceMap(newMap);
      
      // Save to localStorage
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(`attendance_${today}`, JSON.stringify(newMap));

      toast.success(`Marked as ${status}`);
      onUpdate();
    } catch (error) {
      toast.error("Failed to update attendance");
    } finally {
      setMarkingId(null);
    }
  };

  const resetAttendance = (employeeId: string) => {
    if (!isSuperAdmin) return;
    const newMap = { ...attendanceMap };
    delete newMap[employeeId];
    setAttendanceMap(newMap);
    
    const today = new Date().toISOString().split('T')[0];
    localStorage.setItem(`attendance_${today}`, JSON.stringify(newMap));
    
    toast.info("Attendance reset for editing");
  };

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(search.toLowerCase()) || 
    emp.employeeId.toLowerCase().includes(search.toLowerCase())
  );

  if (!mounted || loading) return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-injaazh-600" /></div>;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
      <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <h3 className="font-black text-xl tracking-tight text-slate-900 dark:text-white">Daily Attendance Log</h3>
        <div className="relative w-full sm:w-64">
           <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
           <input 
             type="text" 
             placeholder="Search employee..." 
             value={search}
             onChange={(e) => setSearch(e.target.value)}
             className="w-full bg-slate-50 dark:bg-slate-950 border-none rounded-2xl py-3 pl-11 pr-4 text-sm focus:ring-4 focus:ring-injaazh-500/10 outline-none transition-all font-medium"
           />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-950/50 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">
              <th className="p-6 text-slate-400">Employee Details</th>
              <th className="p-6 text-slate-400">Employee ID</th>
              <th className="p-6 text-right text-slate-400">Attendance Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {filteredEmployees.map((emp) => {
              const status = attendanceMap[emp.id];
              
              return (
                <tr key={emp.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-300">
                  <td className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-injaazh-600 to-blue-700 text-white flex items-center justify-center font-black text-xs shadow-lg shadow-injaazh-600/20 group-hover:scale-110 transition-transform duration-500">
                        {emp.name.split(' ').map((n: string) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white leading-none mb-1">{emp.name}</p>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Permanent Staff</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-xs font-black text-slate-500 font-mono tracking-tighter">#{emp.employeeId}</td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end">
                      {status ? (
                        <div className="flex items-center space-x-2 animate-in zoom-in-95 duration-300">
                          <div className={cn(
                            "px-4 py-2 rounded-xl flex items-center font-black text-[10px] uppercase tracking-widest border",
                            status === "PRESENT" && "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800",
                            status === "LATE" && "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800",
                            status === "ABSENT" && "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:border-rose-800",
                          )}>
                            {status === "PRESENT" && <ShieldCheck className="w-3 h-3 mr-2" />}
                            {status === "LATE" && <Clock className="w-3 h-3 mr-2" />}
                            {status === "ABSENT" && <X className="w-3 h-3 mr-2" />}
                            {status}
                          </div>
                          
                          {isSuperAdmin && (
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => resetAttendance(emp.id)}
                              className="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-injaazh-600 transition-all"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Button 
                            size="sm" 
                            onClick={() => markAttendance(emp.id, "PRESENT")}
                            disabled={markingId === emp.id}
                            className="h-10 rounded-xl bg-white dark:bg-slate-900 border border-emerald-100 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all font-black px-4 shadow-sm"
                          >
                            Present
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => markAttendance(emp.id, "LATE")}
                            disabled={markingId === emp.id}
                            className="h-10 rounded-xl bg-white dark:bg-slate-900 border border-amber-100 text-amber-600 hover:bg-amber-600 hover:text-white transition-all font-black px-4 shadow-sm"
                          >
                            Late
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => markAttendance(emp.id, "ABSENT")}
                            disabled={markingId === emp.id}
                            className="h-10 rounded-xl bg-white dark:bg-slate-900 border border-rose-100 text-rose-600 hover:bg-rose-600 hover:text-white transition-all font-black px-4 shadow-sm"
                          >
                            Absent
                          </Button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
