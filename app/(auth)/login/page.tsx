"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import LoginForm from "./components/LoginForm";
import { ShieldCheck, Sparkles, Fingerprint, Lock } from "lucide-react";

export default function LoginPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-obsidian-950 px-4 sm:px-6 py-12 sm:py-20 selection:bg-gold-500/30">
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] rounded-full bg-gold-500/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] rounded-full bg-gold-300/5 blur-[150px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] pointer-events-none bg-grid" />
      </div>

      <div className="relative z-10 w-full max-w-lg animate-in fade-in zoom-in duration-700">
        <div className="flex flex-col items-center text-center space-y-4 sm:space-y-6 mb-8 sm:mb-12">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl gold-gradient flex items-center justify-center shadow-2xl shadow-gold-500/30 relative group">
            <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-obsidian-900" />
          </div>
          <div className="space-y-1.5 sm:space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-none font-heading">
              Injaazh <span className="gold-text">Secure</span>
            </h1>
            <p className="text-muted-foreground text-xs sm:text-sm font-medium uppercase tracking-[0.15em]">
              Authorized Access Only
            </p>
          </div>
        </div>
        
        <div className="glass-strong p-6 sm:p-10 rounded-3xl shadow-2xl relative overflow-hidden group border border-border/60">
           <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
           <LoginForm />
        </div>

        <div className="mt-12 flex flex-col items-center space-y-8">
           <p className="text-sm text-muted-foreground font-medium">
             Don&apos;t have an account?{" "}
             <Link href="/register" className="font-semibold text-gold-400 hover:text-gold-300 transition-colors uppercase tracking-wider text-[11px]">
               Initialize New Workspace →
             </Link>
           </p>

           <div className="flex items-center gap-6 pt-8 border-t border-border/50 w-full justify-center">
              <SecurityBadge icon={ShieldCheck} label="AES-256 Encrypted" />
              <SecurityBadge icon={Fingerprint} label="MFA Protected" />
              <SecurityBadge icon={Sparkles} label="AI Monitored" />
           </div>
        </div>
      </div>
    </div>
  );
}

function SecurityBadge({ icon: Icon, label }: any) {
  return (
    <div className="flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity cursor-default group">
       <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-gold-400" />
       <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground group-hover:text-foreground">{label}</span>
    </div>
  );
}
