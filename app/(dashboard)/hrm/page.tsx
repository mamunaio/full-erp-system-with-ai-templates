import { Metadata } from "next";
import { 
  Users, UserCheck, CalendarDays, 
  Wallet, Briefcase, GraduationCap,
  Plus, Search, ArrowRight, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import HRMStats from "./components/HRMStats";

export const metadata: Metadata = {
  title: "HRM Dashboard | Injaazh ERP",
};

export default async function HRMPage() {
  const session = await auth();
  const tenantId = (session?.user as any)?.tenantId;

  // Real data for counts
  const totalEmployees = await prisma.employee.count({ where: { tenantId } });
  const activeEmployees = await prisma.employee.count({ where: { tenantId, status: "ACTIVE" } });
  const departmentsCount = await prisma.department.count({ where: { tenantId } });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Human Resources
          </h1>
          <p className="text-slate-500 text-sm">
            Manage your global workforce, payroll, and performance.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/hrm/employees/new">
            <Button className="bg-injaazh-600 hover:bg-injaazh-700 text-white rounded-xl h-11 px-6 shadow-lg shadow-injaazh-600/20">
              <Plus className="w-5 h-5 mr-2" /> Add Employee
            </Button>
          </Link>
        </div>
      </div>

      {/* AI Insight Banner */}
      <div className="relative group rounded-2xl border border-injaazh-100 bg-injaazh-50/50 dark:bg-injaazh-950/20 dark:border-injaazh-900/30 p-4 pl-12 backdrop-blur-sm overflow-hidden">
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Sparkles className="w-5 h-5 text-injaazh-600" />
        </div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-200">
          <span className="font-bold text-injaazh-600">HR AI Insight:</span> Total Employees: {totalEmployees}. You have {departmentsCount} departments set up. 
          <Link href="/ai-hub">
            <button className="ml-2 text-injaazh-500 font-bold hover:underline focus:outline-none focus:ring-2 focus:ring-injaazh-500 rounded px-1 transition-all">
              View Talent Analytics →
            </button>
          </Link>
        </p>
      </div>

      {/* Quick Links / Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ModuleCard 
          href="/hrm/employees"
          title="Employees"
          description={`${totalEmployees} total registered`}
          icon={Users}
          color="bg-blue-500"
        />
        <ModuleCard 
          href="/hrm/attendance"
          title="Attendance"
          description="Daily logs & tracking"
          icon={CalendarDays}
          color="bg-emerald-500"
        />
        <ModuleCard 
          href="/hrm/payroll"
          title="Payroll"
          description="Salary & Disbursements"
          icon={Wallet}
          color="bg-amber-500"
        />
        <ModuleCard 
          href="/hrm/leave"
          title="Leave"
          description="Requests & Balances"
          icon={Briefcase}
          color="bg-rose-500"
        />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Hires or Announcements */}
        <Card className="lg:col-span-2 border-none shadow-md bg-white dark:bg-slate-900 overflow-hidden">
          <CardHeader className="border-b border-slate-50 dark:border-slate-800/50 bg-slate-50/30 dark:bg-slate-950/30">
            <CardTitle className="text-lg font-bold">Organization Health</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                   <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Department Distribution</h4>
                   <div className="space-y-3">
                      {[
                        { name: "IT & Development", value: 45, color: "bg-blue-500" },
                        { name: "Sales & Marketing", value: 30, color: "bg-emerald-500" },
                        { name: "Human Resources", value: 10, color: "bg-rose-500" },
                        { name: "Finance", value: 15, color: "bg-amber-500" },
                      ].map(dept => (
                        <div key={dept.name} className="space-y-1.5">
                           <div className="flex items-center justify-between text-xs font-medium">
                              <span>{dept.name}</span>
                              <span className="text-slate-500">{dept.value}%</span>
                           </div>
                           <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                              <div className={`h-full ${dept.color}`} style={{ width: `${dept.value}%` }} />
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
                <div className="space-y-4">
                   <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Quick Actions</h4>
                   <div className="grid grid-cols-1 gap-3">
                      <Button variant="outline" className="justify-start h-12 rounded-xl text-slate-600 hover:bg-injaazh-50 hover:text-injaazh-700 hover:border-injaazh-200 focus:ring-2 focus:ring-injaazh-500 transition-all">
                         <GraduationCap className="w-5 h-5 mr-3 text-injaazh-600" /> Training Programs
                      </Button>
                      <Button variant="outline" className="justify-start h-12 rounded-xl text-slate-600 hover:bg-injaazh-50 hover:text-injaazh-700 hover:border-injaazh-200 focus:ring-2 focus:ring-injaazh-500 transition-all">
                         <Briefcase className="w-5 h-5 mr-3 text-injaazh-600" /> Active Job Openings
                      </Button>
                      <Button variant="outline" className="justify-start h-12 rounded-xl text-slate-600 hover:bg-injaazh-50 hover:text-injaazh-700 hover:border-injaazh-200 focus:ring-2 focus:ring-injaazh-500 transition-all">
                         <Users className="w-5 h-5 mr-3 text-injaazh-600" /> Organization Chart
                      </Button>
                   </div>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-none shadow-md bg-white dark:bg-slate-900">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Upcoming Birthdays</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Sarah Ahmed", date: "May 20", role: "UI Designer" },
                { name: "Kamal Hossain", date: "May 24", role: "Backend Dev" },
                { name: "Rina Aktar", date: "June 02", role: "HR Associate" },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4">
                   <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-injaazh-600">
                      {item.name[0]}
                   </div>
                   <div className="flex-1">
                      <p className="text-sm font-bold">{item.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{item.role}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-xs font-bold text-injaazh-600">{item.date}</p>
                   </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-8 bg-slate-100 hover:bg-injaazh-100 text-slate-900 hover:text-injaazh-700 dark:bg-slate-800 dark:text-white border-none rounded-xl focus:ring-2 focus:ring-injaazh-500 transition-all">
              View Calendar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ModuleCard({ href, title, description, icon: Icon, color }: any) {
  return (
    <Link href={href}>
      <div className="group bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:border-injaazh-200 transition-all cursor-pointer overflow-hidden relative">
        <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white group-hover:text-injaazh-600 transition-colors">{title}</h3>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
        <ArrowRight className="absolute right-6 bottom-6 w-5 h-5 text-slate-300 group-hover:text-injaazh-600 group-hover:translate-x-1 transition-all" />
        <div className={`absolute -right-8 -top-8 w-24 h-24 ${color} opacity-[0.03] rounded-full blur-2xl group-hover:opacity-10 transition-opacity`} />
      </div>
    </Link>
  );
}
