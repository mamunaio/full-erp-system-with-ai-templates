"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, CalendarDays, Wallet, Briefcase, ArrowRight, UserPlus, Sparkles, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import AICommandBar from "@/components/dashboard/AICommandBar";
import KPICard from "@/components/dashboard/KPICard";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import DepartmentChart from "./components/DepartmentChart";
import BirthdaysCard from "./components/BirthdaysCard";
import ComplianceCard from "./components/ComplianceCard";
import HRMQuickActions from "./components/HRMQuickActions";
import DashboardEventReminder from "./components/DashboardEventReminder";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const hrSuggestions = ["Workforce analysis", "Leave trends", "Hiring forecast", "Department health"];

const hrAlerts = [
  { id: "1", severity: "critical" as const, title: "Leave Coverage Gap", description: "3 team members in Engineering scheduled off same week in August.", time: "10m ago" },
  { id: "2", severity: "warning" as const, title: "Compliance Review Due", description: "Quarterly policy audit deadline approaching in 5 days.", time: "1h ago" },
  { id: "3", severity: "info" as const, title: "New Hire Onboarding", description: "2 new recruits starting next Monday — onboarding ready.", time: "2h ago" },
  { id: "4", severity: "warning" as const, title: "Payroll Approval Pending", description: "Monthly payroll for 142 employees needs final approval.", time: "4h ago" },
  { id: "5", severity: "info" as const, title: "Training Completion", description: "85% of staff completed Q2 compliance training.", time: "6h ago" },
];

const moduleCards = [
  { href: "/hrm/employees", title: "Employees", description: "156 Active Staff", icon: Users, trend: "+4.2%" },
  { href: "/hrm/attendance", title: "Attendance", description: "Daily Presence", icon: CalendarDays, trend: "98%" },
  { href: "/hrm/payroll", title: "Payroll", description: "Compensation", icon: Wallet, trend: "Processed" },
  { href: "/hrm/leave", title: "Leave", description: "Capacity Plan", icon: Briefcase, trend: "2 Pending" },
];

export default function HRMPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-xl border-2 border-gold-500/20" />
            <div className="absolute inset-0 rounded-xl border-2 border-transparent border-t-gold-500 animate-spin" />
            <div className="absolute inset-1 rounded-lg bg-gold-500/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
            </div>
          </div>
          <span className="text-sm text-muted-foreground font-medium">Loading HRM...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 pb-8 max-w-[1600px] mx-auto">
      <DashboardEventReminder />

      <motion.div variants={fadeUp}>
        <div className="bg-card/40 backdrop-blur-2xl rounded-2xl border border-border p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-500/5 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gold-500/5 blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">HR System Online</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-heading">
                Human <span className="text-gold-400">Resources</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Strategic Talent Management for Injaazh Enterprise
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 mr-2 bg-card/40 p-2 rounded-xl border border-border px-4">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">142 Active Now</span>
              </div>
              <Link href="/hrm/employees/new">
                <Button className="bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-[20px] h-14 px-8 shadow-lg shadow-gold-500/20 font-bold uppercase tracking-tight transition-all active:scale-95">
                  <UserPlus className="w-5 h-5 mr-3" /> Recruit Talent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AICommandBar suggestions={hrSuggestions} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Total Workforce" value="156" change="+12%" trend="up" icon={Users} sparkline={[120, 130, 140, 145, 150, 155, 156]} />
          <KPICard title="Active Employees" value="142" change="+2%" trend="up" icon={Users} sparkline={[130, 135, 138, 140, 141, 142, 142]} />
          <KPICard title="Departments" value="8" change="+1" trend="up" icon={Target} sparkline={[5, 6, 6, 7, 7, 8, 8]} />
          <KPICard title="Open Positions" value="5" change="+2" trend="up" icon={Briefcase} sparkline={[3, 4, 3, 5, 4, 5, 5]} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:break-inside-avoid [&>*]:mb-4">
          <DepartmentChart />
          <SmartAlerts data={hrAlerts} />
          <HRMQuickActions />
          <BirthdaysCard />
          <ComplianceCard />

          <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
            <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Quick Navigation</h3>
            <div className="grid grid-cols-1 gap-3">
              {moduleCards.map((mod) => (
                <Link key={mod.href} href={mod.href}>
                  <div className="group flex items-center gap-4 p-4 rounded-xl bg-gold-500/5 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/20 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400 shadow-md group-hover:scale-110 transition-transform shrink-0">
                      <mod.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-card-foreground group-hover:text-gold-400 transition-colors font-heading">{mod.title}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{mod.description}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-gold-400 uppercase tracking-widest bg-gold-500/10 px-2 py-1 rounded-full">{mod.trend}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
