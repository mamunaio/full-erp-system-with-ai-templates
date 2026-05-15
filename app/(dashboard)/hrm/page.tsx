import { Metadata } from "next";
import { 
  Users, CalendarDays, Wallet, Briefcase, Plus, ArrowRight, Sparkles, UserPlus, ShieldCheck, Brain, Target
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import HRMQuickActions from "./components/HRMQuickActions";
import BirthdaysCard from "./components/BirthdaysCard";
import DashboardEventReminder from "./components/DashboardEventReminder";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "HRM Command Center | Injaazh ERP",
};

export default async function HRMPage() {
  const session = await auth();
  const tenantId = (session?.user as any)?.tenantId;

  // Fetch metrics from DB
  const totalEmployees = await prisma.employee.count({ where: { tenantId } });
  const activeEmployees = await prisma.employee.count({ where: { tenantId, status: "ACTIVE" } });
  const departmentsCount = await prisma.department.count({ where: { tenantId } });

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <DashboardEventReminder />

      {/* Cinematic Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white italic uppercase leading-none">
            Human <span className="text-blue-600">Resources</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Strategic Talent Management for <span className="text-slate-900 dark:text-white font-bold">Injaazh Enterprise</span>
          </p>
        </div>
        <div className="flex items-center space-x-4">
           <div className="hidden md:flex items-center space-x-2 mr-4 bg-white dark:bg-slate-900 p-2 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm px-4">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{activeEmployees} Active Now</span>
           </div>
           <Link href="/hrm/employees/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-[20px] h-14 px-8 shadow-2xl shadow-blue-600/20 font-black uppercase italic tracking-tighter transition-all active:scale-95">
              <UserPlus className="w-5 h-5 mr-3" /> Recruit Talent
            </Button>
          </Link>
        </div>
      </div>

      {/* HR AI Intelligence Hub */}
      <div className="relative group overflow-hidden rounded-[40px] border border-blue-100 dark:border-blue-900/30 bg-white dark:bg-slate-900 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
           <div className="w-16 h-16 rounded-[24px] bg-blue-600 flex items-center justify-center shadow-xl shadow-blue-600/30 shrink-0">
              <Brain className="w-8 h-8 text-white" />
           </div>
           <div className="flex-1 space-y-1">
              <h3 className="text-xl font-black italic uppercase tracking-tight text-slate-900 dark:text-white">HR AI <span className="text-blue-600">Strategic Insight</span></h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Workforce capacity is at <span className="text-blue-600 font-bold">85%</span>. Your {totalEmployees} employees are distributed across {departmentsCount} departments.
              </p>
           </div>
           <Link href="/ai-hub">
              <Button variant="outline" className="rounded-2xl h-12 px-6 border-slate-200 dark:border-slate-800 font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all">
                 Talent Analytics →
              </Button>
           </Link>
        </div>
      </div>

      {/* Strategic Talent Modules */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ModuleCard 
          href="/hrm/employees"
          title="Employees"
          description={`${totalEmployees} Active Staff`}
          icon={Users}
          color="blue"
          trend="+4.2%"
        />
        <ModuleCard 
          href="/hrm/attendance"
          title="Attendance"
          description="Daily Presence"
          icon={CalendarDays}
          color="emerald"
          trend="98%"
        />
        <ModuleCard 
          href="/hrm/payroll"
          title="Payroll"
          description="Compensation"
          icon={Wallet}
          color="amber"
          trend="Processed"
        />
        <ModuleCard 
          href="/hrm/leave"
          title="Leave"
          description="Capacity Plan"
          icon={Briefcase}
          color="rose"
          trend="2 Pending"
        />
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <Card className="lg:col-span-2 border-none shadow-sm bg-white dark:bg-slate-900 rounded-[48px] p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000" />
          <div className="flex items-center justify-between mb-10 relative z-10">
            <h3 className="text-2xl font-black italic uppercase tracking-tight text-slate-900 dark:text-white">Organization <span className="text-blue-600">Health</span></h3>
            <div className="flex items-center space-x-2 bg-slate-50 dark:bg-slate-800 p-2 rounded-xl">
               <Target className="w-4 h-4 text-blue-600" />
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Efficiency: 92%</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-6">
              <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Department Stats</h4>
              <div className="space-y-6">
                {[
                  { name: "Engineering", value: 45, color: "bg-blue-600" },
                  { name: "Operations", value: 30, color: "bg-emerald-500" },
                  { name: "HR & Admin", value: 10, color: "bg-rose-500" },
                  { name: "Finance", value: 15, color: "bg-amber-500" },
                ].map(dept => (
                  <div key={dept.name} className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black uppercase italic tracking-tight text-slate-700 dark:text-slate-300">{dept.name}</span>
                      <span className="text-[10px] font-black text-blue-600">{dept.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full transition-all duration-1000", dept.color)} style={{ width: `${dept.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
               <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Quick Actions</h4>
               <HRMQuickActions />
            </div>
          </div>
        </Card>

        <div className="space-y-10">
           <BirthdaysCard />
           <Card className="border-none shadow-sm bg-slate-950 rounded-[40px] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center space-x-3 mb-6 relative z-10">
                 <ShieldCheck className="w-5 h-5 text-blue-500" />
                 <h4 className="text-sm font-black uppercase italic tracking-tight">Compliance Status</h4>
              </div>
              <div className="space-y-2 mb-6 relative z-10">
                 <p className="text-2xl font-black italic tracking-tighter">100% SECURE</p>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Policy Audits Passed</p>
              </div>
              <Button className="w-full bg-white text-slate-950 hover:bg-blue-600 hover:text-white rounded-2xl font-black uppercase italic tracking-tighter h-12 transition-all">
                 System Audit
              </Button>
           </Card>
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ href, title, description, icon: Icon, color, trend }: any) {
  const colorMap: any = {
    blue: "bg-blue-600",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500"
  };

  const trendBgMap: any = {
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600"
  };

  return (
    <Link href={href}>
      <div className="group bg-white dark:bg-slate-900 rounded-[40px] border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all cursor-pointer overflow-hidden relative h-full">
        <div className="flex justify-between items-start mb-6">
          <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110", colorMap[color])}>
            <Icon className="w-7 h-7" />
          </div>
          <div className={cn("px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest", trendBgMap[color])}>
            {trend}
          </div>
        </div>
        <div className="space-y-1">
           <h3 className="text-lg font-black italic uppercase tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors leading-none">{title}</h3>
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{description}</p>
        </div>
        <ArrowRight className="absolute right-8 bottom-8 w-6 h-6 text-slate-200 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
      </div>
    </Link>
  );
}
