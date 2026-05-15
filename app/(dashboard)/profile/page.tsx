import { Metadata } from "next";
import { auth } from "@/auth";
import { 
  User, Mail, Shield, Calendar, 
  MapPin, Phone, Briefcase, Camera,
  ShieldCheck, Fingerprint, History,
  Edit3, Globe, Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Profile Identity | Injaazh ERP",
};

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      {/* Cinematic Profile Hero */}
      <div className="relative">
        <div className="relative h-64 rounded-[48px] overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-slate-900 to-blue-900" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop')] opacity-20 mix-blend-overlay scale-110" />
        </div>
        
        <div className="absolute -bottom-12 left-12 flex items-end space-x-8">
           <div className="relative group/avatar">
              <div className="w-40 h-40 rounded-[48px] bg-white dark:bg-slate-900 p-2 shadow-2xl relative z-10 border-4 border-white dark:border-slate-950">
                 <div className="w-full h-full rounded-[40px] bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-5xl font-black italic shadow-inner">
                    {user?.name?.[0] || "M"}
                 </div>
              </div>
              <button className="absolute bottom-4 right-4 w-10 h-10 rounded-2xl bg-white dark:bg-slate-800 text-blue-600 flex items-center justify-center shadow-xl z-20 hover:scale-110 active:scale-95 transition-all border border-slate-100 dark:border-slate-700">
                 <Camera className="w-5 h-5" />
              </button>
           </div>
           <div className="pb-20 space-y-1">
              <h1 className="text-4xl font-black text-white italic uppercase tracking-tighter drop-shadow-lg">
                {user?.name || "Md Mamun Hossain"}
              </h1>
              <div className="flex items-center space-x-3">
                 <div className="flex items-center space-x-1.5 bg-blue-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <Shield className="w-3 h-3 text-blue-400" />
                    <span className="text-[10px] font-black text-blue-100 uppercase tracking-widest">{user?.role || "ADMIN"}</span>
                 </div>
                 <div className="flex items-center space-x-1.5 bg-emerald-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-black text-emerald-100 uppercase tracking-widest">Active Identity</span>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Essential Info */}
        <div className="space-y-8">
           <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-[40px] p-8 space-y-6">
              <h3 className="text-sm font-black uppercase italic tracking-[0.2em] text-slate-400 border-b border-slate-50 dark:border-slate-800 pb-4">Personal Matrix</h3>
              <div className="space-y-6">
                 <InfoRow icon={Mail} label="Email Address" value={user?.email || "mamun@injaazh.com"} />
                 <InfoRow icon={Phone} label="Contact Phone" value="+880 17XX-XXXXXX" />
                 <InfoRow icon={MapPin} label="Location" value="Dhaka, Bangladesh" />
                 <InfoRow icon={Calendar} label="Member Since" value="May 2024" />
              </div>
              <Button className="w-full h-14 rounded-2xl bg-slate-950 dark:bg-white dark:text-slate-950 text-white font-black uppercase italic tracking-tighter hover:bg-blue-600 hover:text-white transition-all">
                 <Edit3 className="w-4 h-4 mr-2" /> Update Profile
              </Button>
           </Card>

           <Card className="border-none shadow-sm bg-blue-600 rounded-[40px] p-8 text-white relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              <div className="relative z-10 space-y-4">
                 <Globe className="w-8 h-8 opacity-50" />
                 <h3 className="text-xl font-black italic uppercase tracking-tight">Global <span className="text-blue-200">Access</span></h3>
                 <p className="text-xs font-medium text-blue-100 leading-relaxed">
                    Your account is authorized for Multi-tenant operations across all Injaazh Enterprise nodes.
                 </p>
              </div>
           </Card>
        </div>

        {/* Middle/Right: Security & Activity */}
        <div className="lg:col-span-2 space-y-8">
           <Card className="border-none shadow-sm bg-white dark:bg-slate-900 rounded-[48px] p-10">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-2xl font-black italic uppercase tracking-tight">Security <span className="text-blue-600">Command</span></h3>
                 <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <SecurityCard 
                    icon={Fingerprint} 
                    title="Biometric MFA" 
                    status="ENABLED" 
                    desc="Fingerprint & FaceID verification active."
                    color="emerald"
                 />
                 <SecurityCard 
                    icon={Lock} 
                    title="AES-256 Crypto" 
                    status="ACTIVE" 
                    desc="End-to-end data encryption in transit."
                    color="blue"
                 />
              </div>

              <div className="mt-10 p-6 rounded-[32px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                 <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                       <History className="w-4 h-4 text-slate-400" />
                       <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-500">Recent Security Activity</h4>
                    </div>
                    <Button variant="ghost" className="text-[9px] font-black uppercase tracking-widest text-blue-600">Audit Logs →</Button>
                 </div>
                 <div className="space-y-3">
                    <ActivityRow label="New Login Detected" time="2 mins ago" ip="103.45.XX.XX" />
                    <ActivityRow label="Password Updated" time="3 days ago" ip="103.45.XX.XX" />
                 </div>
              </div>
           </Card>

           <Card className="border-none shadow-2xl bg-slate-950 rounded-[48px] p-10 text-white overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent pointer-events-none" />
              <div className="flex items-center justify-between mb-8 relative z-10">
                 <div className="space-y-1">
                    <h3 className="text-2xl font-black italic uppercase tracking-tight">Enterprise <span className="text-blue-500">Privileges</span></h3>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest italic">Identity Tier: Tier-1 Strategic</p>
                 </div>
                 <Briefcase className="w-10 h-10 text-blue-600" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
                 <StatBox label="Projects" value="12" />
                 <StatBox label="Tasks" value="48" />
                 <StatBox label="Meetings" value="15" />
                 <StatBox label="Clearance" value="Lvl 4" />
              </div>
           </Card>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start space-x-4">
       <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
          <Icon className="w-5 h-5" />
       </div>
       <div className="space-y-0.5">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{value}</p>
       </div>
    </div>
  );
}

function SecurityCard({ icon: Icon, title, status, desc, color }: any) {
  return (
    <div className="p-6 rounded-[32px] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group hover:border-blue-100 dark:hover:border-blue-900/30 transition-all">
       <div className="flex items-center justify-between mb-4">
          <div className={cn(
             "w-10 h-10 rounded-xl flex items-center justify-center text-white",
             color === "emerald" ? "bg-emerald-500" : "bg-blue-600"
          )}>
             <Icon className="w-5 h-5" />
          </div>
          <span className={cn(
             "text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-lg",
             color === "emerald" ? "bg-emerald-50 text-emerald-600" : "bg-blue-50 text-blue-600"
          )}>{status}</span>
       </div>
       <h4 className="text-sm font-black uppercase italic tracking-tight mb-1">{title}</h4>
       <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function ActivityRow({ label, time, ip }: any) {
  return (
    <div className="flex items-center justify-between text-[10px]">
       <div className="flex items-center space-x-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          <span className="font-bold text-slate-700 dark:text-slate-300">{label}</span>
       </div>
       <div className="flex items-center space-x-4">
          <span className="text-slate-400">{time}</span>
          <span className="font-black text-slate-500">{ip}</span>
       </div>
    </div>
  );
}

function StatBox({ label, value }: any) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center justify-center space-y-1">
       <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{label}</span>
       <span className="text-xl font-black italic tracking-tighter">{value}</span>
    </div>
  );
}
