import { Metadata } from "next";
import { 
  User, Mail, Phone, MapPin, 
  Calendar, Briefcase, Wallet, FileText,
  Sparkles, Edit2, ArrowLeft, Hash, Building2,
  ShieldCheck, Activity, Brain, Clock, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AttendanceCalendar from "../../components/AttendanceCalendar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Personnel Dossier | Injaazh ERP",
};

export default function EmployeeDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Tactical Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <Link href="/hrm/employees" className="group inline-flex items-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors mb-2">
            <ArrowLeft className="w-3.5 h-3.5 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Talent Matrix
          </Link>
          <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white italic uppercase leading-none">
            Personnel <span className="text-blue-600">Dossier</span>
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="rounded-[20px] h-14 px-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 font-black uppercase italic tracking-tighter hover:bg-blue-50 transition-all active:scale-95 shadow-sm">
            <Brain className="w-5 h-5 mr-3 text-blue-600" /> Neural Summary
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-[20px] h-14 px-8 shadow-2xl shadow-blue-600/20 font-black uppercase italic tracking-tighter transition-all active:scale-95">
            <Edit2 className="w-4 h-4 mr-3" /> Update Profile
          </Button>
        </div>
      </div>

      {/* Cinematic Identity Hero */}
      <div className="relative">
        <div className="relative h-64 rounded-[48px] overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-slate-900 to-blue-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')] opacity-10 mix-blend-overlay scale-110" />
          
          <div className="absolute top-0 right-0 p-12 hidden lg:flex space-x-6">
             <MetricBadge label="Attendance" value="98%" color="emerald" />
             <MetricBadge label="Leave Ratio" value="12/20" color="blue" />
          </div>
        </div>

        <div className="absolute -bottom-16 left-12 flex items-end space-x-8">
           <div className="relative group/avatar">
              <div className="w-48 h-48 rounded-[48px] bg-white dark:bg-slate-900 p-2 shadow-2xl relative z-10 border-4 border-white dark:border-slate-950">
                 <div className="w-full h-full rounded-[40px] bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-6xl font-black italic shadow-inner">
                    JD
                 </div>
              </div>
           </div>
           <div className="pb-20 space-y-2">
              <div className="flex items-center space-x-4">
                 <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter drop-shadow-lg">John Doe</h2>
                 <div className="px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-100 uppercase tracking-widest">Active Personnel</span>
                 </div>
              </div>
              <p className="text-blue-100/60 font-black uppercase italic tracking-widest text-sm">
                 Senior Software Engineer • <span className="text-blue-400">Engineering Node</span>
              </p>
              <div className="flex items-center space-x-6 pt-2">
                 <ContactInfo icon={Mail} text="john@company.com" />
                 <ContactInfo icon={Phone} text="+880 1712 345678" />
                 <ContactInfo icon={Globe} text="Dhaka, Bangladesh" />
              </div>
           </div>
        </div>
      </div>

      <div className="mt-24">
        <Tabs defaultValue="overview" className="space-y-10">
          <TabsList className="bg-white dark:bg-slate-900 p-2 rounded-[28px] h-16 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center space-x-2 w-fit">
            <PremiumTabTrigger value="overview" icon={User} label="Overview Matrix" />
            <PremiumTabTrigger value="attendance" icon={Clock} label="Operational Logs" />
            <PremiumTabTrigger value="leave" icon={FileText} label="Leave Dossier" />
            <PremiumTabTrigger value="payroll" icon={Wallet} label="Financial Ledger" />
          </TabsList>

          <TabsContent value="overview" className="outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="grid md:grid-cols-2 gap-10">
              <DossierSection title="Personal Identity Matrix">
                <DossierRow label="Full Name" value="John Doe" icon={User} />
                <DossierRow label="Date of Birth" value="May 15, 1990" icon={Calendar} />
                <DossierRow label="Gender Identity" value="Male" icon={Activity} />
                <DossierRow label="National ID" value="123456789012" icon={ShieldCheck} />
              </DossierSection>
              
              <DossierSection title="Tactical Employment Details">
                <DossierRow label="Personnel ID" value="EMP-001" icon={Hash} />
                <DossierRow label="Assigned Dept" value="Engineering" icon={Building2} />
                <DossierRow label="Operational Role" value="Senior Engineer" icon={Briefcase} />
                <DossierRow label="Deployment Type" value="Full-time Ops" icon={Activity} />
              </DossierSection>
            </div>
          </TabsContent>

          <TabsContent value="attendance" className="outline-none animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="bg-white dark:bg-slate-900 rounded-[48px] p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
                <AttendanceCalendar />
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MetricBadge({ label, value, color }: any) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-6 text-center min-w-[140px] hover:bg-white/10 transition-all cursor-default group">
       <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 group-hover:text-white transition-colors">{label}</p>
       <p className={cn(
         "text-3xl font-black italic tracking-tighter",
         color === "emerald" ? "text-emerald-500" : "text-blue-500"
       )}>{value}</p>
    </div>
  );
}

function ContactInfo({ icon: Icon, text }: any) {
  return (
    <div className="flex items-center space-x-2 text-white/50 text-xs font-bold tracking-tight">
       <Icon className="w-3.5 h-3.5 text-blue-500" />
       <span>{text}</span>
    </div>
  );
}

function PremiumTabTrigger({ value, icon: Icon, label }: any) {
  return (
    <TabsTrigger 
      value={value} 
      className="rounded-[20px] px-8 h-12 flex items-center space-x-3 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-xl data-[state=active]:shadow-blue-600/20 text-slate-500 font-black uppercase italic tracking-tighter text-[10px] transition-all"
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </TabsTrigger>
  );
}

function DossierSection({ title, children }: any) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-[48px] border border-slate-100 dark:border-slate-800 p-10 shadow-sm space-y-8 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
      <h3 className="text-2xl font-black italic uppercase tracking-tight border-b border-slate-50 dark:border-slate-800 pb-6 relative z-10">{title}</h3>
      <div className="space-y-6 relative z-10">{children}</div>
    </div>
  );
}

function DossierRow({ label, value, icon: Icon }: any) {
  return (
    <div className="flex items-center justify-between group/row">
      <div className="flex items-center space-x-4">
         <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover/row:bg-blue-600 group-hover/row:text-white transition-all shadow-inner">
            <Icon className="w-4 h-4" />
         </div>
         <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      </div>
      <span className="text-sm font-black italic uppercase tracking-tight text-slate-900 dark:text-white">{value}</span>
    </div>
  );
}
