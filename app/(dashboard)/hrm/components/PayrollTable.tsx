"use client";

import { useState } from "react";
import { FileDown, CheckCircle2, MoreHorizontal, Eye, ShieldCheck, Clock, Printer, X, Download, User, Wallet, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function PayrollTable() {
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const data = [
    { name: "John Doe", id: "EMP-001", basic: 5000, allowance: 1200, deductions: 200, net: 6000, status: "PAID", type: "Full-time", dept: "Engineering" },
    { name: "Sarah Ahmed", id: "EMP-002", basic: 4500, allowance: 1000, deductions: 150, net: 5350, status: "PENDING", type: "Contract", dept: "Marketing" },
    { name: "Mike Ross", id: "EMP-003", basic: 4800, allowance: 1100, deductions: 180, net: 5720, status: "PAID", type: "Full-time", dept: "Legal" },
    { name: "Jessica Pearson", id: "EMP-004", basic: 7500, allowance: 2500, deductions: 500, net: 9500, status: "PROCESSING", type: "Senior", dept: "Management" },
    { name: "Louis Litt", id: "EMP-005", basic: 6200, allowance: 1500, deductions: 300, net: 7400, status: "PAID", type: "Full-time", dept: "Legal" },
  ];

  const handleViewPayslip = (emp: any) => {
    setSelectedEmployee(emp);
    setIsModalOpen(true);
    toast.info(`Generating payslip for ${emp.name}...`);
  };

  const handleDownloadPDF = (name: string) => {
    toast.success(`Download started: ${name}_Payslip_May.pdf`);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-950/50 text-slate-400 font-black uppercase tracking-[0.2em] text-[10px]">
              <th className="p-6">Employee Info</th>
              <th className="p-6 text-center">Basic Salary</th>
              <th className="p-6 text-center">Allowance</th>
              <th className="p-6 text-center">Deductions</th>
              <th className="p-6 text-center">Net Payout</th>
              <th className="p-6 text-center">Status</th>
              <th className="p-6 text-right">Quick Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {data.map((row) => (
              <tr key={row.id} className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-all duration-300">
                <td className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-900 dark:text-white font-black text-xs shadow-inner group-hover:bg-injaazh-600 group-hover:text-white transition-all duration-500">
                      {row.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white leading-none mb-1">{row.name}</p>
                      <div className="flex items-center space-x-2">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">#{row.id}</p>
                         <span className="w-1 h-1 rounded-full bg-slate-300" />
                         <p className="text-[10px] font-bold text-injaazh-600">{row.type}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="p-6 text-center font-bold text-slate-600 dark:text-slate-400">${row.basic.toLocaleString()}</td>
                <td className="p-6 text-center font-bold text-emerald-600">
                  <span className="bg-emerald-50 dark:bg-emerald-900/20 px-2 py-1 rounded-lg">
                    +${row.allowance.toLocaleString()}
                  </span>
                </td>
                <td className="p-6 text-center font-bold text-rose-600">
                   <span className="bg-rose-50 dark:bg-rose-900/20 px-2 py-1 rounded-lg">
                    -${row.deductions.toLocaleString()}
                  </span>
                </td>
                <td className="p-6 text-center">
                   <p className="text-base font-black text-slate-900 dark:text-white tracking-tight">${row.net.toLocaleString()}</p>
                </td>
                <td className="p-6 text-center">
                  <div className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border",
                    row.status === "PAID" && "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-800",
                    row.status === "PENDING" && "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:border-amber-800",
                    row.status === "PROCESSING" && "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:border-blue-800",
                  )}>
                    {row.status === "PAID" && <ShieldCheck className="w-3 h-3 mr-2" />}
                    {row.status === "PENDING" && <Clock className="w-3 h-3 mr-2" />}
                    {row.status === "PROCESSING" && <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse mr-2" />}
                    {row.status}
                  </div>
                </td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="View Payslip" 
                      onClick={() => handleViewPayslip(row)}
                      className="w-9 h-9 rounded-xl text-slate-400 hover:text-injaazh-600 hover:bg-injaazh-50 dark:hover:bg-injaazh-900/20"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="Download PDF" 
                      onClick={() => handleDownloadPDF(row.name)}
                      className="w-9 h-9 rounded-xl text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    >
                      <FileDown className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl text-slate-400">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Payslip Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl">
          <div className="bg-slate-950 p-10 text-white relative overflow-hidden">
             {/* Abstract background shapes */}
             <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-injaazh-600/20 rounded-full blur-3xl" />
             <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
             
             <div className="relative z-10">
               <div className="flex items-start justify-between mb-10">
                 <div>
                   <div className="flex items-center space-x-3 mb-4">
                     <div className="w-10 h-10 rounded-xl bg-injaazh-600 flex items-center justify-center font-black text-xl">I</div>
                     <span className="font-black text-2xl tracking-tighter">Injaazh<span className="text-injaazh-500">ERP</span></span>
                   </div>
                   <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Employee Pay Stub</p>
                   <h2 className="text-3xl font-black mt-1">May 2026</h2>
                 </div>
                 <div className="text-right">
                   <div className={cn(
                     "px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest inline-flex items-center border border-white/10 bg-white/5",
                     selectedEmployee?.status === "PAID" ? "text-emerald-400" : "text-amber-400"
                   )}>
                     <ShieldCheck className="w-3 h-3 mr-2" /> {selectedEmployee?.status}
                   </div>
                   <p className="text-slate-500 text-[10px] font-bold mt-4 uppercase tracking-widest">Issued on June 01, 2026</p>
                 </div>
               </div>

               <div className="grid grid-cols-2 gap-8 p-8 bg-white/5 rounded-[32px] border border-white/10 backdrop-blur-md">
                 <div className="space-y-6">
                   <div className="flex items-center space-x-4">
                     <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center"><User className="text-injaazh-400 w-6 h-6" /></div>
                     <div>
                       <p className="text-[10px] font-bold text-slate-500 uppercase">Employee</p>
                       <p className="font-black text-lg">{selectedEmployee?.name}</p>
                       <p className="text-xs text-slate-400 font-medium">{selectedEmployee?.type} • {selectedEmployee?.dept}</p>
                     </div>
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Earnings</p>
                     <div className="space-y-3">
                       <div className="flex justify-between items-center text-sm">
                         <span className="text-slate-400 font-medium">Basic Salary</span>
                         <span className="font-black">${selectedEmployee?.basic.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between items-center text-sm text-emerald-400">
                         <span className="font-medium">Allowance</span>
                         <span className="font-black">+${selectedEmployee?.allowance.toLocaleString()}</span>
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 <div className="space-y-6 flex flex-col justify-between">
                    <div className="flex items-center space-x-4">
                       <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center"><Building2 className="text-injaazh-400 w-6 h-6" /></div>
                       <div>
                         <p className="text-[10px] font-bold text-slate-500 uppercase">Company ID</p>
                         <p className="font-black text-lg">{selectedEmployee?.id}</p>
                         <p className="text-xs text-slate-400 font-medium">Tax ID: ERP-992-XXXX</p>
                       </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase mb-2 tracking-widest">Deductions</p>
                      <div className="flex justify-between items-center text-sm text-rose-400">
                         <span className="font-medium">Tax & PF</span>
                         <span className="font-black">-${selectedEmployee?.deductions.toLocaleString()}</span>
                      </div>
                    </div>
                 </div>
               </div>

               <div className="mt-8 p-8 bg-injaazh-600 rounded-[32px] flex items-center justify-between shadow-2xl shadow-injaazh-600/40">
                 <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center"><Wallet className="text-white w-8 h-8" /></div>
                    <div>
                      <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Total Net Payout</p>
                      <p className="text-4xl font-black text-white tracking-tighter">${selectedEmployee?.net.toLocaleString()}</p>
                    </div>
                 </div>
                 <div className="flex flex-col items-end">
                    <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Currency</p>
                    <p className="text-xl font-black text-white tracking-tighter">USD</p>
                 </div>
               </div>

               <div className="mt-10 flex items-center justify-center space-x-4">
                 <Button onClick={() => toast.success("Sending to printer...")} className="flex-1 h-14 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-black border border-white/10">
                   <Printer className="w-5 h-5 mr-3" /> Print Payslip
                 </Button>
                 <Button onClick={() => handleDownloadPDF(selectedEmployee?.name)} className="flex-1 h-14 rounded-2xl bg-injaazh-500 hover:bg-injaazh-400 text-white font-black shadow-xl shadow-injaazh-600/20">
                   <Download className="w-5 h-5 mr-3" /> Download PDF
                 </Button>
               </div>
             </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
