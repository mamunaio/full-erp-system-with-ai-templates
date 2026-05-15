"use client";

import { useState, useEffect } from "react";
import { 
  Users, 
  Target, 
  TrendingUp, 
  DollarSign, 
  Plus, 
  Phone, 
  Mail, 
  Calendar,
  ArrowRight,
  Flame,
  Clock,
  ArrowUpRight,
  Loader2,
  CheckCircle2,
  X,
  ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CRMDashboard() {
  const [mounted, setMounted] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(15);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsLeadModalOpen(false);
      toast.success("New Lead Created!", {
        description: "The lead has been added to your sales pipeline.",
      });
    }, 1500);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/dashboard" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-blue-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to App Dashboard
          </Link>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            CRM <span className="text-blue-600">Intelligence</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Strategic relationship management and deal flow optimization.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={() => toast.info("Fetching recent activities...")}
            className="rounded-2xl h-14 px-8 border-slate-200 dark:border-slate-800 font-bold bg-white dark:bg-slate-900 shadow-sm active:scale-95 transition-all"
          >
             Activity Log
          </Button>
          <Button 
            onClick={() => setIsLeadModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5 mr-3" /> New Lead
          </Button>
        </div>
      </div>

      {/* Analytics Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <CRMStatsCard icon={Users} label="Total Leads" value="1,284" subValue="+18% this month" color="text-blue-600" bgColor="bg-blue-50 dark:bg-blue-900/20" />
        <CRMStatsCard icon={Target} label="Active Deals" value="42" subValue="12 awaiting follow-up" color="text-blue-500" bgColor="bg-blue-50 dark:bg-blue-900/20" />
        <CRMStatsCard icon={TrendingUp} label="Conversion" value="24.8%" subValue="+2.4% from Q1" color="text-emerald-600" bgColor="bg-emerald-50 dark:bg-emerald-900/20" />
        <CRMStatsCard icon={DollarSign} label="Pipeline Value" value="$2.4M" subValue="Projected revenue" color="text-amber-600" bgColor="bg-amber-50 dark:bg-amber-900/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Pipeline Overview */}
        <div className="lg:col-span-2 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm overflow-hidden relative">
             <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl" />
             <div className="flex items-center justify-between mb-8 relative z-10">
                <div>
                   <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Sales Funnel</h3>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Lead distribution by stage</p>
                </div>
                <Link href="/crm/pipeline" className="text-xs font-black text-blue-600 hover:underline tracking-widest uppercase">VIEW FULL PIPELINE</Link>
             </div>
             
             <div className="space-y-6 relative z-10">
                <PipelineBar label="New Leads" value={45} count="45" color="bg-blue-500" />
                <PipelineBar label="Contacted" value={32} count="32" color="bg-indigo-500" />
                <PipelineBar label="Qualified" value={18} count="18" color="bg-indigo-600" />
                <PipelineBar label="Proposal" value={12} count="12" color="bg-amber-500" />
                <PipelineBar label="Won" value={8} count="8" color="bg-emerald-500" />
             </div>
           </div>

           <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm overflow-hidden relative">
              <div className="flex items-center justify-between mb-8 relative z-10">
                <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Top Hot Leads</h3>
                <span className="flex items-center text-[10px] font-black text-rose-500 uppercase tracking-widest bg-rose-50 dark:bg-rose-900/20 px-3 py-1.5 rounded-full"><Flame className="w-3 h-3 mr-2" /> High Intent</span>
              </div>
              <div className="space-y-4 relative z-10">
                 <HotLeadRow name="Meta Corp" value="$12,000" score={98} status="Hot" onClick={() => toast.info("Opening Meta Corp deal profile...")} />
                 <HotLeadRow name="Tesla Inc" value="$50,000" score={92} status="Hot" onClick={() => toast.info("Opening Tesla Inc deal profile...")} />
                 <HotLeadRow name="Amazon AWS" value="$35,000" score={85} status="Warm" onClick={() => toast.info("Opening Amazon AWS deal profile...")} />
              </div>
           </div>
        </div>

        {/* Sidebar - Recent Activities */}
        <div className="space-y-6">
           <div className="bg-slate-950 rounded-[32px] p-8 text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
              <h3 className="text-xl font-black mb-6 relative z-10">Upcoming Activities</h3>
              <div className="space-y-6 relative z-10">
                 <ActivityItem icon={Phone} label="Call Meta Corp" time="10:30 AM" type="Call" />
                 <ActivityItem icon={Mail} label="Email Tesla" time="1:00 PM" type="Email" />
                 <ActivityItem icon={Calendar} label="Demo SpaceX" time="4:15 PM" type="Meeting" />
              </div>
              <Button 
                onClick={() => setIsCalendarOpen(true)}
                className="w-full mt-8 h-12 rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/10 font-bold transition-all active:scale-95 relative z-10"
              >
                View Calendar
              </Button>
           </div>

           <div className="bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[32px] p-8 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden group">
              <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="flex items-center justify-between mb-4">
                 <TrendingUp className="w-8 h-8 opacity-50" />
                 <div className="bg-white/20 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Target: 120%</div>
              </div>
              <h4 className="text-xs font-black uppercase tracking-[0.2em] opacity-60">Monthly Revenue Goal</h4>
              <p className="text-4xl font-black mt-1">$450,000</p>
              <div className="mt-6 w-full h-2 bg-white/20 rounded-full overflow-hidden">
                 <div className="w-[75%] h-full bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
              </div>
              <p className="text-[10px] font-bold mt-4 opacity-80 uppercase tracking-widest">75% Achieved • $112k to go</p>
           </div>
        </div>
      </div>

      {/* New Lead Modal */}
      <Dialog open={isLeadModalOpen} onOpenChange={setIsLeadModalOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl">
          <div className="bg-slate-950 p-10 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center font-black text-2xl shadow-lg shadow-blue-600/20">L</div>
                <div>
                   <h2 className="text-3xl font-black tracking-tight">Create New Lead</h2>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Strategic Deal Entry</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsLeadModalOpen(false)} className="rounded-full text-slate-500 hover:text-white hover:bg-white/10">
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <form onSubmit={handleCreateLead} className="space-y-6 relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Company Name</Label>
                  <Input required placeholder="e.g. Google Inc" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Deal Value ($)</Label>
                  <Input required type="number" placeholder="50000" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 focus:border-blue-600 text-white font-medium px-5" />
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full h-16 rounded-[24px] bg-blue-600 hover:bg-blue-500 text-white font-black shadow-2xl shadow-blue-600/40 text-lg tracking-tight active:scale-[0.98] transition-all"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> SYNCHRONIZING...</>
                  ) : (
                    "CREATE STRATEGIC LEAD"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CRMStatsCard({ icon: Icon, label, value, subValue, color, bgColor }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-500">
      <div className="flex items-center justify-between mb-6">
        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 duration-500", bgColor)}>
          <Icon className={cn("w-7 h-7", color)} />
        </div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className={cn("text-3xl font-black tracking-tight", color)}>{value}</p>
        </div>
      </div>
      <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-tight">
        <ArrowUpRight className="w-3 h-3 mr-2 text-emerald-500" />
        {subValue}
      </div>
    </div>
  );
}

function PipelineBar({ label, value, count, color }: any) {
  return (
    <div className="space-y-2 group cursor-pointer" onClick={() => toast.info(`Showing leads in ${label} stage`)}>
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
        <span className="group-hover:text-blue-600 transition-colors">{label}</span>
        <span>{count} Deals</span>
      </div>
      <div className="w-full h-3 bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-full overflow-hidden p-0.5">
        <div 
          className={cn("h-full rounded-full transition-all duration-1000 ease-out", color)} 
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function ActivityItem({ icon: Icon, label, time, type }: any) {
  return (
    <div className="flex items-center space-x-4 group cursor-pointer" onClick={() => toast.info(`Starting ${type}: ${label}`)}>
      <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
        <Icon className="w-4 h-4 text-blue-400" />
      </div>
      <div>
        <p className="text-sm font-bold text-white leading-none mb-1 group-hover:text-blue-400 transition-colors">{label}</p>
        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center">
           <Clock className="w-2 h-2 mr-1" /> {time} • {type}
        </p>
      </div>
    </div>
  );
}

function HotLeadRow({ name, value, score, status, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 dark:bg-slate-950/50 hover:bg-white dark:hover:bg-slate-800 border border-transparent hover:border-slate-100 dark:hover:border-slate-700 transition-all cursor-pointer group"
    >
       <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center font-black text-xs border border-slate-100 dark:border-slate-700 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">{name[0]}</div>
          <div>
             <p className="font-bold text-slate-900 dark:text-white leading-none mb-1">{name}</p>
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Value: {value}</p>
          </div>
       </div>
       <div className="flex items-center space-x-6 text-right">
          <div>
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Score</p>
             <p className={cn("text-sm font-black", score > 90 ? "text-rose-500" : "text-amber-500")}>{score}%</p>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 group-hover:text-blue-600 transition-all" />
       </div>
    </div>
  );
}
