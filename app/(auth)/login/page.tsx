"use client";

import Link from "next/link";
import LoginForm from "./components/LoginForm";
import { 
  ShieldCheck, Sparkles, Fingerprint, Lock, 
  Activity, ArrowLeft, Cpu, TrendingUp, CheckCircle2,
  Building2, Globe, Server
} from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-background text-foreground relative overflow-hidden selection:bg-gold-500/30">
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[600px] h-[600px] bg-gold-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/5 blur-[150px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] bg-grid" />
      </div>

      {/* LEFT COLUMN: Cyber-Luxe Sovereign Showcase (Visible on lg+) */}
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
                Sovereign Enterprise Engine
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

        {/* Center Live Telemetry & Value Proposition */}
        <div className="space-y-8 my-auto max-w-lg">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Sovereign Neural Cluster 2.5 • All Systems Nominal</span>
            </div>

            <h1 className="text-3xl xl:text-4xl 2xl:text-5xl font-black text-foreground font-heading tracking-tight leading-tight">
              The Next-Gen <br />
              <span className="gold-text">AI-Native Operating Core</span> <br />
              for Global Enterprises.
            </h1>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Unified real-time intelligence orchestration across Master Treasury, CRM Pipeline Funnels, Multi-Warehouse Logistics, and Human Capital.
            </p>
          </div>

          {/* Live Mini Operational Metric Card */}
          <div className="glass-strong p-5 rounded-3xl border border-border/80 shadow-2xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-gold-500/15 text-gold-500 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-foreground">Global Cluster Telemetry</span>
                  <span className="text-[10px] text-muted-foreground block">Active Tenant Node • injaazh-production-01</span>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                99.99% UPTIME
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-2.5 rounded-2xl bg-card/60 border border-border/60">
                <span className="text-[9px] uppercase font-bold text-muted-foreground block">Managed Assets</span>
                <span className="text-sm xl:text-base font-extrabold text-foreground font-heading">$4.82M</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-card/60 border border-border/60">
                <span className="text-[9px] uppercase font-bold text-muted-foreground block">EBITDA Margin</span>
                <span className="text-sm xl:text-base font-extrabold text-emerald-500 font-heading">+34.2%</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-card/60 border border-border/60">
                <span className="text-[9px] uppercase font-bold text-muted-foreground block">Active Nodes</span>
                <span className="text-sm xl:text-base font-extrabold text-gold-500 font-heading">12 Nodes</span>
              </div>
            </div>
          </div>

          {/* Security Features Check List */}
          <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Multi-Tenant Vault Isolation</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Gemini 1.5 Flash AI Engine</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Double-Entry GAAP Ledger</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Zero-Trust RBAC Governance</span>
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

      {/* RIGHT COLUMN: Interactive Executive Authentication Portal */}
      <div className="w-full lg:w-1/2 relative z-10 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 xl:p-16 overflow-y-auto custom-scrollbar">
        {/* Mobile Top Navigation */}
        <div className="w-full max-w-md flex lg:hidden items-center justify-between mb-8">
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

        <div className="w-full max-w-md space-y-6">
          {/* Header Title */}
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/25 text-gold-600 dark:text-gold-400 text-xs font-bold">
              <Lock className="w-3.5 h-3.5 text-gold-500" />
              <span>Sovereign Identity Access</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
              Executive Sign In
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Authorize session with credentials or select a 1-click test persona below.
            </p>
          </div>

          {/* Form Container Card */}
          <div className="glass-strong p-6 sm:p-8 rounded-3xl shadow-2xl border border-border/80 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl pointer-events-none" />
            <LoginForm />
          </div>

          {/* Footer Workspace Link */}
          <div className="text-center space-y-3 pt-2">
            <p className="text-xs text-muted-foreground">
              Need a new dedicated enterprise tenant?{" "}
              <Link 
                href="/register" 
                className="font-bold text-gold-600 dark:text-gold-400 hover:underline transition-colors ml-1"
              >
                Initialize Workspace →
              </Link>
            </p>

            <div className="flex items-center justify-center gap-5 pt-3 text-[10px] text-muted-foreground font-semibold">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> AES-256 Encrypted</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Fingerprint className="w-3.5 h-3.5 text-gold-500" /> MFA Enforced</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5 text-blue-500" /> Zero Data Leakage</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
