import { Metadata } from "next";
import Link from "next/link";
import { Plus, Sparkles, ArrowLeft, UserPlus, Users, Activity, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import HRMStats from "../components/HRMStats";
import EmployeeTable from "../components/EmployeeTable";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Employee Directory | Injaazh ERP",
};

export default async function EmployeesPage() {
  const session = await auth();
  const tenantId = (session?.user as any)?.tenantId;

  const employees = await prisma.employee.findMany({
    where: { tenantId },
    include: {
      department: { select: { name: true } },
      designation: { select: { name: true } }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/hrm" className="group inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to HRM Center
          </Link>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white italic uppercase leading-none">
            Talent <span className="text-blue-600">Directory</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Orchestrating <span className="text-slate-900 dark:text-white font-bold">{employees.length}</span> active personnel across Injaazh Enterprise
          </p>
        </div>
        <Link href="/hrm/employees/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-[20px] h-14 px-8 shadow-2xl shadow-blue-600/20 font-black uppercase italic tracking-tighter transition-all active:scale-95">
            <UserPlus className="w-5 h-5 mr-3" /> Recruit Talent
          </Button>
        </Link>
      </div>

      {/* Neural AI Insight Hub */}
      <div className="relative group overflow-hidden rounded-[40px] border border-blue-100 dark:border-blue-900/30 bg-white dark:bg-slate-900 p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-6 relative z-10">
           <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
           </div>
           <div className="flex-1">
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                <span className="text-blue-600 uppercase italic font-black mr-2">Neural Insight:</span> 
                HRM-এ এই মাসে ৩ জন পদত্যাগ করেছেন। বর্তমানে আপনার এট্রিশন রেট (Attrition Rate) স্বাভাবিকের চেয়ে সামান্য বেশি। 
              </p>
           </div>
           <Button variant="ghost" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:bg-blue-50">Strategy Hub →</Button>
        </div>
      </div>

      <HRMStats />
      
      <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
         <EmployeeTable employees={employees as any} /> 
      </div>
    </div>
  );
}
