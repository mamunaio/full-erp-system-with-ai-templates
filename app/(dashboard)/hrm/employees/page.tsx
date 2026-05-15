import { Metadata } from "next";
import Link from "next/link";
import { Plus, Sparkles, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import HRMStats from "../components/HRMStats";
import EmployeeTable from "../components/EmployeeTable";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Employees | Injaazh ERP",
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
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <Link href="/hrm" className="group flex items-center text-sm font-medium text-slate-500 hover:text-injaazh-600 transition-colors mb-2">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to HRM
          </Link>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Employee Directory
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your workforce, track roles, and monitor status.
          </p>
        </div>
        <Link href="/hrm/employees/new">
          <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
            <Plus className="w-5 h-5 mr-2" /> Add Employee
          </Button>
        </Link>
      </div>

      {/* AI Insight Banner */}
      <div className="relative group rounded-2xl border border-injaazh-100 bg-injaazh-50/50 dark:bg-injaazh-950/20 dark:border-injaazh-900/30 p-4 pl-12 backdrop-blur-sm overflow-hidden">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Sparkles className="w-5 h-5 text-injaazh-600" />
        </div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          <span className="font-bold text-injaazh-600">AI Insight:</span> HRM-এ এই মাসে ৩ জন resign করেছে, attrition rate বেড়েছে। 
          <span className="ml-2 text-injaazh-500 cursor-pointer hover:underline">View Analysis →</span>
        </p>
      </div>

      <HRMStats />
      
      <EmployeeTable employees={employees as any} /> 
    </div>
  );
}
