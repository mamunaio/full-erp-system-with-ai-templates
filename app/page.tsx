"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, ShieldCheck, ArrowRight, Activity, 
  Users, CircleDollarSign, Package, BarChart3, 
  Zap, Database, Layers, CheckCircle2, ChevronRight,
  TrendingUp, Bot, Terminal, Lock, Globe, Cpu, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";

const modules = [
  {
    id: "ai",
    title: "AI Pulse & Hub",
    subtitle: "Strategic Neural Engine",
    icon: Sparkles,
    color: "from-amber-500 to-yellow-300",
    badge: "Gemini 1.5 Flash",
    description: "Real-time enterprise health forecasting, autonomous anomaly detection, and natural language database queries.",
    metrics: [
      { label: "Predictive Accuracy", value: "98.4%" },
      { label: "Query Velocity", value: "<120ms" },
      { label: "Daily Automations", value: "14.2k" },
    ],
    preview: {
      title: "Autonomous Cashflow Projection",
      tag: "Neural Prediction",
      stat: "+24.8%",
      details: "Q4 operational liquidity is optimized. Reorder cycles synchronized."
    }
  },
  {
    id: "finance",
    title: "Master Ledger & Finance",
    subtitle: "Automated Fiscal Matrix",
    icon: CircleDollarSign,
    color: "from-emerald-500 to-teal-300",
    badge: "Double-Entry Ledger",
    description: "High-fidelity real-time P&L analytics, automated multi-currency invoices, and bank reconciliation.",
    metrics: [
      { label: "Monthly Flow", value: "$4.8M" },
      { label: "Reconciliation", value: "Real-time" },
      { label: "Tax Compliance", value: "100%" },
    ],
    preview: {
      title: "Real-Time Net Revenue",
      tag: "Fiscal Health",
      stat: "$1,280,450",
      details: "Operating margin at 34.2%. EBITDA trending upward +6.1%."
    }
  },
  {
    id: "crm",
    title: "CRM & Sales Command",
    subtitle: "High-Velocity Pipeline",
    icon: Users,
    color: "from-blue-500 to-cyan-300",
    badge: "Kanban Pipeline",
    description: "End-to-end deal management, AI lead scoring, conversion probability metrics, and contact dossiers.",
    metrics: [
      { label: "Active Deals", value: "184" },
      { label: "Win Rate", value: "68.2%" },
      { label: "Pipeline Value", value: "$12.4M" },
    ],
    preview: {
      title: "Strategic Enterprise Deals",
      tag: "High Win Probability",
      stat: "85% Score",
      details: "Meta Corp & SpaceX contracts moved to final negotiation stage."
    }
  },
  {
    id: "inventory",
    title: "Inventory & Supply Matrix",
    subtitle: "Multi-Warehouse Assets",
    icon: Package,
    color: "from-violet-500 to-indigo-300",
    badge: "Neural Reorder",
    description: "Automated low-stock triggers, multi-warehouse distribution, batch tracking, and supplier integration.",
    metrics: [
      { label: "Tracked SKUs", value: "18,400" },
      { label: "Stock Accuracy", value: "99.9%" },
      { label: "Warehouses", value: "8 Hubs" },
    ],
    preview: {
      title: "Autonomous Reorder Trigger",
      tag: "Low Stock Safeguard",
      stat: "24 SKUs Inbound",
      details: "Purchase orders dispatched automatically to tier-1 vendors."
    }
  },
];

const sampleQueries = [
  { q: "Forecast Q4 cashflow vs planned expenses", a: "Predicted net surplus of $420,000 with 94% confidence based on current deals." },
  { q: "Show inventory items with stock under 10 days", a: "3 SKUs flagged: MacBook Pro M3 (2 units), Dell 32 (5 units). Reorders sent." },
  { q: "Identify top 5 revenue-generating clients this quarter", a: "1. Meta Corp ($85k) 2. SpaceX ($62k) 3. Tesla ($48k) 4. Stripe ($39k) 5. Apple ($31k)" },
];

export default function LandingPage() {
  const [activeModule, setActiveModule] = useState(modules[0].id);
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);

  const currentModule = modules.find((m) => m.id === activeModule) || modules[0];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-gold-500/20 selection:text-gold-300">
      {/* Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-gold-500/10 via-primary/5 to-transparent blur-[140px] rounded-full" />
        <div className="absolute top-[35%] -left-48 w-[600px] h-[600px] bg-blue-500/5 blur-[160px] rounded-full" />
        <div className="absolute top-[60%] -right-48 w-[600px] h-[600px] bg-emerald-500/5 blur-[160px] rounded-full" />
        <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.04]" />
      </div>

      {/* Top Floating Glass Navigation */}
      <header className="fixed top-2 sm:top-4 inset-x-0 z-50 max-w-6xl mx-auto px-3 sm:px-4">
        <div className="glass-strong rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between border border-border/80 shadow-2xl backdrop-blur-3xl">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl gold-gradient flex items-center justify-center text-obsidian-900 font-extrabold text-base sm:text-lg shadow-md shadow-gold-500/20 shrink-0">
              I
            </div>
            <div>
              <span className="font-bold text-base sm:text-lg tracking-tight font-heading">
                Injaazh<span className="gold-text">ERP</span>
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
                v2.0 Neural
              </span>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Core Modules</a>
            <a href="#ai-intelligence" className="hover:text-foreground transition-colors">AI Intelligence</a>
            <a href="#security" className="hover:text-foreground transition-colors">Enterprise Security</a>
            <a href="#architecture" className="hover:text-foreground transition-colors">Architecture</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-medium text-xs rounded-xl hover:bg-accent px-2.5 sm:px-3">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="gold-gradient text-obsidian-900 font-bold text-xs rounded-xl hover:opacity-90 shadow-md shadow-gold-500/20 transition-transform active:scale-95 px-3 sm:px-4">
                <span className="hidden xs:inline">Launch System</span>
                <span className="xs:hidden">Launch</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-28 sm:pt-40 pb-16 sm:pb-20 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5 sm:space-y-6 flex flex-col items-center"
        >
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold gold-text tracking-wide uppercase">
              Next-Gen Enterprise Resource Planning
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-heading leading-[1.12] sm:leading-[1.08] max-w-4xl text-foreground">
            Tactical Command for the <span className="gold-text">Modern Enterprise</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl font-normal leading-relaxed px-2">
            Unify Finance, HRM, CRM, Inventory, and Supply Chain with real-time strategic intelligence powered by <strong className="text-foreground font-semibold">Google Gemini 1.5</strong>.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto px-4 sm:px-0">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 sm:h-13 px-6 sm:px-8 gold-gradient text-obsidian-900 font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-[1.02] transition-all">
                Enter Command Center <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/login" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 sm:h-13 px-5 sm:px-7 rounded-2xl border-border bg-card/60 backdrop-blur-xl font-semibold hover:bg-accent text-xs sm:text-sm">
                <ShieldCheck className="w-4 h-4 mr-2 text-gold-500 shrink-0" />
                Access Authorized Portal
              </Button>
            </Link>
          </div>

          {/* Key Metric Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full pt-12 sm:pt-16 max-w-4xl">
            {[
              { label: "Enterprise Volume", value: "$420M+", icon: TrendingUp },
              { label: "Core Modules", value: "12 Systems", icon: Layers },
              { label: "AI Latency", value: "<85ms", icon: Zap },
              { label: "Platform Uptime", value: "99.99%", icon: Activity },
            ].map((stat, idx) => (
              <div key={idx} className="glass rounded-2xl p-4 sm:p-5 border border-border/60 text-left relative overflow-hidden group hover:border-gold-500/30 transition-all">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="text-[10px] sm:text-[11px] font-bold text-muted-foreground uppercase tracking-wider">{stat.label}</span>
                  <stat.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gold-500 group-hover:scale-110 transition-transform shrink-0" />
                </div>
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-foreground font-heading">{stat.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Interactive AI Command Simulation */}
      <section id="ai-intelligence" className="relative z-10 py-16 px-4 max-w-5xl mx-auto">
        <div className="glass-strong rounded-3xl p-6 md:p-10 border border-gold-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center">
              <Bot className="w-5 h-5 text-gold-500" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Interactive AI Pulse Simulator</h3>
              <p className="text-xs text-muted-foreground">Select a query prompt to simulate live natural-language enterprise analysis</p>
            </div>
          </div>

          {/* Sample Prompts */}
          <div className="flex flex-wrap gap-2 mb-6">
            {sampleQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveQueryIndex(idx)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all border text-left ${
                  activeQueryIndex === idx
                    ? "bg-gold-500/20 text-gold-600 dark:text-gold-300 border-gold-500/50 shadow-sm"
                    : "bg-card/40 text-muted-foreground border-border hover:bg-card hover:text-foreground"
                }`}
              >
                &ldquo;{item.q}&rdquo;
              </button>
            ))}
          </div>

          {/* Simulation Output Card */}
          <div className="bg-obsidian-950/80 rounded-2xl p-6 border border-white/10 font-mono text-sm text-slate-200">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                <span>INJAAZH_NEURAL_LINK // QUERY_RESULT</span>
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">LIVE GEMINI ENGINE</span>
            </div>
            <div className="space-y-3">
              <div className="text-gold-400 font-sans font-medium text-xs uppercase tracking-wider">
                &gt; USER QUERY: &ldquo;{sampleQueries[activeQueryIndex].q}&rdquo;
              </div>
              <div className="text-slate-100 font-sans text-sm leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                {sampleQueries[activeQueryIndex].a}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Enterprise Modules Showcase */}
      <section id="features" className="relative z-10 py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-14">
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-foreground">
            Complete Enterprise <span className="gold-text">Ecosystem</span>
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
            Every business node is synchronized across a single, unified multi-tenant architecture.
          </p>
        </div>

        {/* Module Selector Tabs - Horizontal Scroll on Mobile */}
        <div className="flex overflow-x-auto custom-scrollbar sm:flex-wrap sm:justify-center gap-2 mb-8 sm:mb-10 pb-2 sm:pb-0 px-1">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveModule(mod.id)}
              className={`flex items-center gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all border shrink-0 ${
                activeModule === mod.id
                  ? "bg-card shadow-xl border-gold-500/40 text-foreground scale-105"
                  : "bg-card/40 text-muted-foreground border-border hover:bg-card/70"
              }`}
            >
              <mod.icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${activeModule === mod.id ? "text-gold-500" : "text-muted-foreground"}`} />
              <span>{mod.title}</span>
            </button>
          ))}
        </div>

        {/* Active Module Card */}
        <div className="glass-strong rounded-3xl p-5 sm:p-8 md:p-12 border border-border/80 shadow-2xl relative overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
            <div className="space-y-4 sm:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 text-xs font-bold">
                {currentModule.badge}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">{currentModule.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm md:text-base">{currentModule.description}</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-1 sm:pt-2">
                {currentModule.metrics.map((m, i) => (
                  <div key={i} className="bg-card/50 p-3 sm:p-3.5 rounded-xl border border-border">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground tracking-wider mb-0.5 sm:mb-1">{m.label}</div>
                    <div className="text-base sm:text-lg font-extrabold text-foreground">{m.value}</div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <Link href={`/dashboard`}>
                  <Button className="w-full sm:w-auto gold-gradient text-obsidian-900 font-bold rounded-xl text-xs">
                    Explore {currentModule.title} <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Preview Matrix */}
            <div className="bg-gradient-to-br from-card to-background p-4 sm:p-6 rounded-2xl border border-border/80 shadow-inner space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-border/50">
                <span className="text-[10px] sm:text-xs font-bold text-muted-foreground uppercase tracking-wider">{currentModule.preview.tag}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-bold text-foreground">{currentModule.preview.title}</h4>
                <div className="text-2xl sm:text-3xl font-extrabold gold-text font-heading my-1.5 sm:my-2">{currentModule.preview.stat}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{currentModule.preview.details}</p>
              </div>
              <div className="pt-3 sm:pt-4 border-t border-border/50 flex items-center justify-between text-[11px] sm:text-xs text-muted-foreground">
                <span>Multi-tenant sync</span>
                <span className="text-emerald-500 font-semibold">Active Stream</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Multi-tenancy Tier */}
      <section id="security" className="relative z-10 py-20 px-4 md:px-8 max-w-6xl mx-auto border-t border-border/40">
        <div className="text-center space-y-3 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-xs font-semibold">
            <Lock className="w-3 h-3" /> Enterprise Compliance
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-foreground">
            Zero-Compromise Security Architecture
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "AES-256 Encryption", desc: "Data encrypted at rest and in transit with TLS 1.3.", icon: ShieldCheck },
            { title: "Granular RBAC", desc: "Role-based controls across Owner, Admin, Manager, and User tiers.", icon: Award },
            { title: "Multi-Tenant Isolation", desc: "Strict database level tenant segregation and domain routing.", icon: Database },
            { title: "Immutable Audit Logs", desc: "Complete cryptographic transaction and access logging.", icon: Lock },
          ].map((item, idx) => (
            <div key={idx} className="glass rounded-2xl p-6 border border-border hover:border-gold-500/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-500 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-foreground mb-2">{item.title}</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/60 py-12 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg gold-gradient flex items-center justify-center text-obsidian-900 font-bold text-xs">
              I
            </div>
            <span className="font-bold text-sm text-foreground font-heading">
              Injaazh<span className="gold-text">ERP</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/login" className="hover:text-foreground transition-colors">Sign In</Link>
            <Link href="/register" className="hover:text-foreground transition-colors">Register</Link>
            <Link href="/dashboard" className="hover:text-foreground transition-colors">Dashboard</Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Systems Operational • Confidential & Proprietary</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
