"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, UserCheck, UserX, Calendar, 
  Briefcase, Plus, Search, Filter, 
  Mail, Phone, Clock, Sparkles, 
  CheckCircle2, AlertCircle, ArrowRight,
  TrendingUp, Award, DollarSign, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import DepartmentChart from "./components/DepartmentChart";
import BirthdaysCard from "./components/BirthdaysCard";
import ComplianceCard from "./components/ComplianceCard";

const mockEmployees = [
  { id: "e1", name: "Farhan Ahmed", role: "Principal Cloud Architect", dept: "Engineering", status: "IN_OFFICE", email: "farhan@injaazh.com", phone: "+880 1712-345678", avatar: "FA" },
  { id: "e2", name: "Ayesha Siddiqua", role: "Head of Product", dept: "Product & Design", status: "REMOTE", email: "ayesha@injaazh.com", phone: "+880 1819-223344", avatar: "AS" },
  { id: "e3", name: "Tariqul Islam", role: "Senior Financial Analyst", dept: "Finance", status: "IN_OFFICE", email: "tariq@injaazh.com", phone: "+880 1911-556677", avatar: "TI" },
  { id: "e4", name: "Nusrat Jahan", role: "Enterprise Sales Director", dept: "Sales & Marketing", status: "ON_LEAVE", email: "nusrat@injaazh.com", phone: "+880 1622-778899", avatar: "NJ" },
  { id: "e5", name: "Zubair Rahman", role: "Lead Fullstack Engineer", dept: "Engineering", status: "IN_OFFICE", email: "zubair@injaazh.com", phone: "+880 1733-990011", avatar: "ZR" },
  { id: "e6", name: "Sadia Chowdhury", role: "HR & Talent Operations", dept: "Operations", status: "IN_OFFICE", email: "sadia@injaazh.com", phone: "+880 1544-112233", avatar: "SC" },
];

const weeklyLeaveSchedule = [
  { day: "Mon", date: "Sep 01", count: 2, coverage: "98%", members: ["Nusrat Jahan", "Kamal Hossain"] },
  { day: "Tue", date: "Sep 02", count: 3, coverage: "96%", members: ["Nusrat Jahan", "Rafi Khan", "Anika Sen"] },
  { day: "Wed", date: "Sep 03", count: 1, coverage: "99%", members: ["Nusrat Jahan"] },
  { day: "Thu", date: "Sep 04", count: 4, coverage: "94%", members: ["Nusrat Jahan", "Tanvir Hasan", "Suman Roy", "Ayesha S."] },
  { day: "Fri", date: "Sep 05", count: 2, coverage: "98%", members: ["Tanvir Hasan", "Suman Roy"] },
  { day: "Sat", date: "Sep 06", count: 0, coverage: "100%", members: [] },
  { day: "Sun", date: "Sep 07", count: 0, coverage: "100%", members: [] },
];

const departments = ["All", "Engineering", "Product & Design", "Sales & Marketing", "Finance", "Operations"];

export default function HRMPage() {
  const [selectedDept, setSelectedDept] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPayrollRunning, setIsPayrollRunning] = useState(false);

  const filteredEmployees = mockEmployees.filter((emp) => {
    const matchesDept = selectedDept === "All" || emp.dept === selectedDept;
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || emp.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDept && matchesSearch;
  });

  const handleRunPayroll = () => {
    setIsPayrollRunning(true);
    setTimeout(() => {
      setIsPayrollRunning(false);
      toast.success("September Monthly Payroll Batch dispatched successfully! ($248,500 to 156 employees)");
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">
      {/* Top Banner: Workforce Presence & Capacity Matrix */}
      <div className="glass-strong rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-[11px] font-extrabold text-emerald-500 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Live Workforce Command
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
              Human Capital & <span className="gold-text">Talent Operations</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-xl">
              Real-time daily presence, shift attendance, leave capacity planning, and automated payroll operations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/hrm/employees">
              <Button variant="outline" className="rounded-2xl h-11 sm:h-12 px-5 border-border bg-card/60 font-bold text-xs sm:text-sm hover:bg-accent">
                <Users className="w-4 h-4 mr-2 text-gold-500" /> All Personnel (156)
              </Button>
            </Link>
            <Link href="/hrm/employees/new">
              <Button className="gold-gradient text-obsidian-900 font-extrabold text-xs sm:text-sm rounded-2xl h-11 sm:h-12 px-6 shadow-lg shadow-gold-500/20 hover:opacity-90">
                <Plus className="w-4 h-4 mr-1.5" /> Recruit New Talent
              </Button>
            </Link>
          </div>
        </div>

        {/* Presence Breakdown Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 mt-6 border-t border-border/50">
          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>In Office Today</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">118 <span className="text-xs text-emerald-500 font-sans font-bold">75.6%</span></div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Remote Work</span>
              <span className="w-2 h-2 rounded-full bg-blue-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">24 <span className="text-xs text-blue-500 font-sans font-bold">15.4%</span></div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>On Leave</span>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">14 <span className="text-xs text-amber-500 font-sans font-bold">9.0%</span></div>
          </div>

          <div className="bg-card/50 p-4 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-xs text-muted-foreground font-semibold mb-1">
              <span>Staffing Capacity</span>
              <span className="w-2 h-2 rounded-full bg-purple-500" />
            </div>
            <div className="text-2xl font-extrabold text-foreground font-heading">91.0% <span className="text-xs text-emerald-500 font-sans font-bold">Optimal</span></div>
          </div>
        </div>
      </div>

      {/* Main Grid: Employee Directory + Leave Capacity Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Interactive Employee Directory */}
        <div className="lg:col-span-2 space-y-4">
          <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-lg">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">Personnel Directory</h3>
                <p className="text-xs text-muted-foreground">Filter team by department, role, or active status</p>
              </div>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search staff..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-background/80 border border-border text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-gold-500/50"
                />
              </div>
            </div>

            {/* Department Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-2 mb-4">
              {departments.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDept(d)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    selectedDept === d
                      ? "bg-gold-500/15 text-gold-600 dark:text-gold-300 border-gold-500/40 shadow-sm"
                      : "bg-card/40 text-muted-foreground border-border hover:bg-card hover:text-foreground"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* Employee Cards Grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {filteredEmployees.map((emp) => (
                <div key={emp.id} className="p-4 rounded-2xl bg-card/60 hover:bg-card border border-border/70 hover:border-gold-500/30 transition-all space-y-3 shadow-sm group">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center font-extrabold text-obsidian-900 text-xs shadow-sm">
                        {emp.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground group-hover:text-gold-500 transition-colors">{emp.name}</h4>
                        <p className="text-[11px] text-muted-foreground">{emp.role}</p>
                      </div>
                    </div>

                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                      emp.status === "IN_OFFICE" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                      emp.status === "REMOTE" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                      "bg-amber-500/10 text-amber-500 border-amber-500/20"
                    }`}>
                      {emp.status.replace("_", " ")}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-border/40 flex items-center justify-between text-xs text-muted-foreground">
                    <span className="text-[10px] font-medium bg-accent/60 px-2 py-0.5 rounded-md text-foreground">{emp.dept}</span>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toast.info(`Email copied: ${emp.email}`)}
                        className="p-1 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                        title="Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </button>
                      <button 
                        onClick={() => toast.info(`Phone: ${emp.phone}`)}
                        className="p-1 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground"
                        title="Call"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7-Day Leave Schedule & Coverage Heatmap */}
          <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-foreground font-heading">7-Day Staffing & Leave Timeline</h3>
                <p className="text-xs text-muted-foreground">Forecasted operational capacity across coming shifts</p>
              </div>
              <Link href="/hrm/leave">
                <Button variant="ghost" size="sm" className="text-xs font-semibold text-gold-500 hover:text-gold-400">
                  Manage Leaves <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 pt-2">
              {weeklyLeaveSchedule.map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-card/50 border border-border text-center space-y-1">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">{item.day}</div>
                  <div className="text-xs font-bold text-foreground">{item.date}</div>
                  <div className="text-lg font-extrabold text-gold-500 font-heading">{item.coverage}</div>
                  <div className="text-[9px] text-muted-foreground">{item.count} on leave</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Department Sunburst, Payroll Batch Run & Milestones */}
        <div className="space-y-6">
          {/* Quick Payroll Dispatch Card */}
          <div className="glass rounded-3xl p-5 sm:p-6 border border-border/80 shadow-lg space-y-4 bg-gradient-to-br from-card to-background">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gold-500 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/20">
                Monthly Compensation
              </span>
              <DollarSign className="w-4 h-4 text-gold-500" />
            </div>

            <div>
              <h4 className="text-sm font-bold text-foreground font-heading">September Payroll Cycle</h4>
              <div className="text-3xl font-extrabold gold-text font-heading my-1">$248,500.00</div>
              <p className="text-xs text-muted-foreground">156 active employees verified. Tax & compliance deducted.</p>
            </div>

            <Button 
              onClick={handleRunPayroll}
              disabled={isPayrollRunning}
              className="w-full gold-gradient text-obsidian-900 font-extrabold text-xs rounded-2xl h-11 shadow-md shadow-gold-500/20"
            >
              {isPayrollRunning ? "Processing Batch..." : "Dispatch Payroll Batch"}
            </Button>
          </div>

          {/* Department Headcount Breakdown */}
          <DepartmentChart />

          {/* Birthdays & Anniversaries */}
          <BirthdaysCard />

          {/* Policy Compliance */}
          <ComplianceCard />
        </div>
      </div>
    </div>
  );
}
