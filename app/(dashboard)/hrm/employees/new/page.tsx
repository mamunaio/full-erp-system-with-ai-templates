import { Metadata } from "next";
import EmployeeForm from "../../components/EmployeeForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Add New Employee | Injaazh ERP",
};

export default function NewEmployeePage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="space-y-1">
        <Link href="/hrm/employees" className="group flex items-center text-sm font-medium text-slate-500 hover:text-injaazh-600 transition-colors mb-4">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Directory
        </Link>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Register New Employee
        </h1>
        <p className="text-slate-500 text-sm">
          Follow the 4-step process to add a new member to the organization.
        </p>
      </div>

      <EmployeeForm />
    </div>
  );
}
