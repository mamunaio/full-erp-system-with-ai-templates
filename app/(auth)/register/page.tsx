"use client";

import Link from "next/link";
import RegisterForm from "./components/RegisterForm";
import { 
  ShieldCheck, Sparkles, Fingerprint, UserPlus, 
  ArrowLeft, CheckCircle2, Globe, Server, 
  Layers, Bot, CircleDollarSign
} from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background text-foreground relative overflow-hidden selection:bg-gold-500/30">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-15%] right-[-10%] w-[600px] h-[600px] bg-gold-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] bg-grid" />
      </div>

      {/* LEFT COLUMN: Sovereign Cloud Onboarding Showcase (Visible on lg+) */}
      <div className="hidden lg:flex lg:w-1/2 relative z-10 flex-col justify-between p-12 xl:p-16 border-r border-border/60 bg-card/20 backdrop-blur-3xl">
        {/* Top Brand Header */}
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl gold-gradient flex items-center justify-center text-obsidian-950 font-black font-heading text-xl shadow-lg shadow-gold-500/25 group-hover:scale-105 transition-transform">
              I
            </div>
            <div>
              <span className="font-heading text-xl font-extrabold text-foreground tracking-tight">
                Injaazh<span className="gold-text">ERP</span>
              </span>
              <span className="block text-[9px] font-extrabold text-gold-600 dark:text-gold-400 uppercase tracking-widest">
                Multi-Tenant Provisioning Core
              </span>
            </div>
          </Link>

          <Link 
            href="/"
            className="flex items-center gap-1.5 text-xs font-bold text-muted-foreground hover:text-foreground bg-card/60 hover:bg-card border border-border/80 rounded-xl px-3 py-1.5 transition-all cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return to Portal
          </Link>
        </div>

        {/* Center Live Provisioning & Value Props */}
        <div className="space-y-8 my-auto max-w-lg">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-600 dark:text-gold-400 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-gold-500" />
              <span>Instant Cloud Workspace Deployment</span>
            </div>

            <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-black text-foreground font-heading tracking-tight leading-tight">
              Deploy Your <br />
              <span className="gold-text">Enterprise Operating Core</span> <br />
              in 60 Seconds.
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Experience the power of universal multi-tenant isolation, Google Gemini 1.5 Pro forecasting, and automated GAAP accounting.
            </p>
          </div>

          {/* Core Modules Inclusion Preview */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 space-y-1">
              <div className="flex items-center gap-2 text-gold-500 font-bold text-xs">
                <Bot className="w-4 h-4" />
                <span>AI Neural Hub</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Natural language querying & predictive EBITDA</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 space-y-1">
              <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs">
                <CircleDollarSign className="w-4 h-4" />
                <span>Master Treasury</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Double-entry GAAP ledger & liquidity stream</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 space-y-1">
              <div className="flex items-center gap-2 text-blue-500 font-bold text-xs">
                <Layers className="w-4 h-4" />
                <span>Interactive CRM</span>
              </div>
              <p className="text-[11px] text-muted-foreground">Dynamic Kanban funnels & deal scoring</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 space-y-1">
              <div className="flex items-center gap-2 text-purple-500 font-bold text-xs">
                <Server className="w-4 h-4" />
                <span>Multi-Warehouse</span>
              </div>
              <p className="text-[11px] text-muted-foreground">BOM manufacturing & automated PO dispatch</p>
            </div>
          </div>

          {/* Security Features Check List */}
          <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>14-Day Full Enterprise Trial</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Zero Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Dedicated MongoDB Atlas Vault</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Automated Daily Backups</span>
            </div>
          </div>
        </div>

        {/* Bottom Security Compliance Seal Badges */}
        <div className="flex items-center justify-between pt-6 border-t border-border/50 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-gold-500" /> SOC-2 Type II</span>
          <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-gold-500" /> ISO 27001</span>
          <span className="flex items-center gap-1.5"><Server className="w-4 h-4 text-gold-500" /> AES-256 Bit</span>
        </div>
      </div>

      {/* RIGHT COLUMN: Interactive Registration Portal */}
      <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 xl:p-16 overflow-y-auto custom-scrollbar">
        {/* Mobile Top Navigation */}
        <div className="w-full max-w-lg flex lg:hidden items-center justify-between mb-6">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gold-gradient flex items-center justify-center text-obsidian-950 font-black font-heading">
              I
            </div>
            <span className="font-heading text-lg font-extrabold text-foreground">
              Injaazh<span className="gold-text">ERP</span>
            </span>
          </Link>
          <Link 
            href="/"
            className="text-xs font-bold text-muted-foreground hover:text-foreground flex items-center gap-1 bg-card/60 border border-border px-3 py-1.5 rounded-xl"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Return
          </Link>
        </div>

        <div className="w-full max-w-lg space-y-5">
          {/* Header Title */}
          <div className="space-y-1.5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-600 dark:text-gold-400 text-xs font-bold">
              <UserPlus className="w-3.5 h-3.5 text-gold-500" />
              <span>New Organization Setup</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
              Create Enterprise Workspace
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Initialize your sovereign multi-tenant cluster in seconds.
            </p>
          </div>

          {/* Form Container Card */}
          <div className="glass-strong p-5 sm:p-8 rounded-3xl shadow-2xl border border-border/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
            <RegisterForm />
          </div>

          {/* Footer Login Link */}
          <div className="text-center space-y-2.5 pt-1">
            <p className="text-xs text-muted-foreground">
              Already have an authorized workspace?{" "}
              <Link 
                href="/login" 
                className="font-bold text-gold-600 dark:text-gold-400 hover:underline transition-colors ml-1"
              >
                Secure Login Entry →
              </Link>
            </p>

            <div className="flex items-center justify-center gap-5 pt-2 text-[10px] text-muted-foreground font-semibold">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> AES-256 Encrypted</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Fingerprint className="w-3.5 h-3.5 text-gold-500" /> Multi-Tenant Shield</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-blue-500" /> 14-Day Free Access</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
