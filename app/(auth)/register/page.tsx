"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import RegisterForm from "./components/RegisterForm";
import { ShieldCheck, Sparkles, Fingerprint, UserPlus } from "lucide-react";

export default function RegisterPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 px-6 py-20 selection:bg-blue-500/30">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl animate-in fade-in zoom-in duration-1000">
        <div className="flex flex-col items-center text-center space-y-6 mb-12">
          <div className="w-20 h-20 rounded-[28px] bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl shadow-blue-600/30 relative group">
            <div className="absolute inset-0 bg-white/20 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity" />
            <UserPlus className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-5xl font-black tracking-tighter text-white italic uppercase leading-none">
              Injaazh <span className="text-blue-600">Enterprise</span>
            </h1>
            <p className="text-slate-500 text-sm font-black uppercase tracking-[0.2em]">
              Initialize Your Organization Workspace
            </p>
          </div>
        </div>
        
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[48px] shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
           <RegisterForm />
        </div>

        <div className="mt-12 flex flex-col items-center space-y-8">
           <p className="text-sm text-slate-500 font-medium">
             Already authorized?{" "}
             <Link href="/login" className="font-black text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest text-[11px]">
               Secure Login Entry →
             </Link>
           </p>

           <div className="flex items-center space-x-6 pt-8 border-t border-white/5 w-full justify-center">
              <SecurityBadge icon={ShieldCheck} label="Data Privacy Shield" />
              <SecurityBadge icon={Fingerprint} label="Identity Verification" />
              <SecurityBadge icon={Sparkles} label="Intelligent Setup" />
           </div>
        </div>
      </div>
    </div>
  );
}

function SecurityBadge({ icon: Icon, label }: any) {
  return (
    <div className="flex items-center space-x-2 opacity-30 hover:opacity-100 transition-opacity cursor-default group">
       <Icon className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500" />
       <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white">{label}</span>
    </div>
  );
}
