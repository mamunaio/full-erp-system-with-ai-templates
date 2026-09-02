"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, ShieldCheck, ArrowRight, Activity, 
  Users, CircleDollarSign, Package, BarChart3, 
  Zap, Database, Layers, CheckCircle2, ChevronRight,
  TrendingUp, Bot, Terminal, Lock, Globe, Cpu, Award,
  Check, Star, HelpCircle, ChevronDown, Calculator,
  Building2, Landmark, Truck, Factory, HeartHandshake
} from "lucide-react";
import { Button } from "@/components/ui/button";

const modules = [
  {
    id: "ai",
    title: "AI Neural Hub",
    subtitle: "Strategic LLM Intelligence",
    icon: Sparkles,
    badge: "Gemini 1.5 Pro & Flash",
    description: "Natural-language database querying, predictive EBITDA modeling, and automated event triggers.",
    metrics: [
      { label: "Predictive Accuracy", value: "98.4%" },
      { label: "Query Velocity", value: "<85ms" },
      { label: "Daily Automations", value: "14.2k" },
    ],
    preview: {
      title: "Autonomous Cashflow Projection",
      tag: "Neural Prediction",
      stat: "+24.8% Margin",
      details: "Q4 operational liquidity is optimized. Low-stock reorders synchronized."
    }
  },
  {
    id: "finance",
    title: "Master Ledger & Treasury",
    subtitle: "Automated Fiscal Matrix",
    icon: CircleDollarSign,
    badge: "Double-Entry Ledger",
    description: "High-fidelity real-time P&L analytics, automated multi-currency invoices, and encrypted bank vault sync.",
    metrics: [
      { label: "Monthly Inflow", value: "$420k" },
      { label: "Reconciliation", value: "100% Realtime" },
      { label: "Tax Compliance", value: "Automated" },
    ],
    preview: {
      title: "Real-Time Net Treasury",
      tag: "Fiscal Health",
      stat: "$1,240,500",
      details: "Operating margin at 53.5%. EBITDA trending upward +12.4%."
    }
  },
  {
    id: "crm",
    title: "CRM & Sales Pipeline",
    subtitle: "High-Velocity Deal Flow",
    icon: HeartHandshake,
    badge: "Interactive Kanban",
    description: "End-to-end deal management, AI lead scoring, conversion probability metrics, and contact dossiers.",
    metrics: [
      { label: "Active Deals", value: "42 Deals" },
      { label: "Win Rate", value: "68.4%" },
      { label: "Pipeline Value", value: "$3.48M" },
    ],
    preview: {
      title: "Strategic Enterprise Deals",
      tag: "High Win Odds",
      stat: "98/100 Score",
      details: "Meta Corp ($85k) & SpaceX ($62k) moved to Proposal & Contract stage."
    }
  },
  {
    id: "inventory",
    title: "Inventory & Warehouses",
    subtitle: "Multi-Hub Spatial Logistics",
    icon: Package,
    badge: "1-Click PO Replenish",
    description: "Volumetric storage tracking across 3 distribution mega-hubs, automated low-stock POs, and GRN audits.",
    metrics: [
      { label: "Tracked SKUs", value: "4,280" },
      { label: "Turnover Ratio", value: "8.4x / yr" },
      { label: "Hub Capacity", value: "84% Utilized" },
    ],
    preview: {
      title: "Autonomous Reorder Trigger",
      tag: "Buffer Safeguard",
      stat: "4 POs Dispatched",
      details: "Purchase orders dispatched automatically to authorized distributors."
    }
  },
  {
    id: "hrm",
    title: "Human Resources & Talent",
    subtitle: "Workforce Presence Command",
    icon: Users,
    badge: "Attendance Matrix",
    description: "Real-time daily presence, shift capacity tracking, 7-day leave calendar, and 1-click payroll runner.",
    metrics: [
      { label: "Total Team", value: "156 Staff" },
      { label: "Staffing Capacity", value: "91.0%" },
      { label: "Monthly Payroll", value: "$248.5k" },
    ],
    preview: {
      title: "Workforce Presence Stream",
      tag: "Live Capacity",
      stat: "118 In Office",
      details: "24 Remote, 14 on leave. Team coverage is at optimal 91% index."
    }
  },
];

const sampleQueries = [
  { q: "Forecast Q4 cashflow vs planned operating expenses", a: "Predicted net surplus of $420,000 with 96% model confidence based on active deals and recurring SaaS contracts." },
  { q: "Identify critical inventory items with stock below buffer", a: "4 SKUs flagged: Apple MacBook Pro M3 (2 units), Dell 32\" 4K (5 units). Automated PO drafts sent to suppliers." },
  { q: "Show top 3 high-probability revenue deals in CRM pipeline", a: "1. Meta Corp ($85,000 • Score 98/100) 2. SpaceX ($62,000 • Score 94/100) 3. Tesla Energy ($48,000 • Score 89/100)." },
];

const clientLogos = [
  "Meta Systems", "Tesla Energy", "SpaceX Logistics", "Stripe Corporate", "Apex Global", "Quantum Scale"
];

const pricingPlans = [
  {
    name: "Growth Enterprise",
    price: "$499",
    period: "/month",
    desc: "For fast-scaling companies requiring unified operations & AI forecasting.",
    features: [
      "Up to 50 Team Members",
      "Full Finance & Double-Entry Ledger",
      "Interactive CRM & Kanban Pipeline",
      "Multi-Warehouse Inventory Tracking",
      "Google Gemini 1.5 Flash AI Engine",
      "Standard Email & Chat Support",
    ],
    popular: false,
    cta: "Start 14-Day Free Trial",
    href: "/register",
  },
  {
    name: "Scale Sovereign",
    price: "$1,299",
    period: "/month",
    desc: "For mid-to-large enterprises needing deep AI automations & multi-tenant isolation.",
    features: [
      "Unlimited Team Members & Seats",
      "All 12 Core Modules Unlocked",
      "Google Gemini 1.5 Pro Neural Hub",
      "Autonomous 24/7 Event Workflows",
      "Real-Time Bank API Synchronization",
      "Dedicated Technical Account Director",
      "Custom SLA & 99.99% Uptime Guarantee",
    ],
    popular: true,
    cta: "Initialize Enterprise Workspace",
    href: "/register",
  },
  {
    name: "Custom Private Cloud",
    price: "Custom",
    period: "annual",
    desc: "On-premises or dedicated VPC cloud deployment with bespoke compliance.",
    features: [
      "Self-Hosted on AWS / Azure / GCP",
      "Dedicated MongoDB Atlas Isolated Cluster",
      "Custom LLM Fine-Tuning on Company Data",
      "Custom ERP Integrations & Migration",
      "Air-Gapped & HIPAA / SOC2 Compliance",
      "24/7/365 Sovereign Engineering Support",
    ],
    popular: false,
    cta: "Contact Enterprise Sales",
    href: "/login",
  },
];

const faqs = [
  {
    q: "How does the Google Gemini AI integration work with our ERP database?",
    a: "Injaazh ERP integrates directly with Google Gemini 1.5 Pro & Flash via secure server-side neural nodes. It queries real-time MongoDB Atlas streams with zero data leakage, enabling natural-language business queries, anomaly detection, and autonomous PO dispatch."
  },
  {
    q: "Can we migrate our existing accounting and customer data into Injaazh?",
    a: "Yes! Injaazh provides automated CSV, JSON, and direct database migration bridges for QuickBooks, Xero, Salesforce, and legacy SQL ERPs, allowing seamless onboarding in under 24 hours."
  },
  {
    q: "Is multi-tenant security and role-based access control (RBAC) included?",
    a: "Absolutely. Every tenant is strictly isolated with cryptographic encryption at rest (AES-256) and in transit (TLS 1.3). Granular RBAC allows custom permissions across Owner, Admin, Manager, and Staff tiers."
  },
  {
    q: "What devices and operating systems are supported?",
    a: "Injaazh is fully responsive across all desktop browsers, laptops, tablets, and smartphones, featuring mobile drawer navigation and touch-optimized Kanban workflows."
  },
];

export default function LandingPage() {
  const [activeModule, setActiveModule] = useState(modules[0].id);
  const [activeQueryIndex, setActiveQueryIndex] = useState(0);
  const [teamSize, setTeamSize] = useState(150);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentModule = modules.find((m) => m.id === activeModule) || modules[0];

  // ROI calculations based on team size
  const hoursSavedPerMonth = Math.round(teamSize * 9.5);
  const estimatedSavings = Math.round(teamSize * 1150).toLocaleString();

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

          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-muted-foreground uppercase tracking-wider">
            <a href="#features" className="hover:text-foreground transition-colors">Modules</a>
            <a href="#demo-cockpit" className="hover:text-foreground transition-colors">Cockpit Demo</a>
            <a href="#roi-calculator" className="hover:text-foreground transition-colors">ROI Calculator</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="font-semibold text-xs rounded-xl hover:bg-accent px-2.5 sm:px-3">
                Sign In
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="sm" className="gold-gradient text-obsidian-900 font-extrabold text-xs rounded-xl hover:opacity-90 shadow-md shadow-gold-500/20 transition-transform active:scale-95 px-3 sm:px-4">
                <span className="hidden xs:inline">Launch Console</span>
                <span className="xs:hidden">Launch</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-28 sm:pt-40 pb-12 sm:pb-16 px-4 md:px-8 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-5 sm:space-y-6 flex flex-col items-center"
        >
          {/* Animated Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/30 backdrop-blur-md shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-gold-500 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-bold gold-text tracking-wide uppercase">
              Next-Gen Enterprise Resource Planning with Google Gemini 1.5
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-heading leading-[1.12] sm:leading-[1.08] max-w-4xl text-foreground">
            Tactical Command for the <span className="gold-text">Modern Enterprise</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-2xl font-normal leading-relaxed px-2">
            Unify Master Treasury, CRM Deal Pipelines, HRM Talent Rosters, and Warehouse Logistics with real-time strategic intelligence.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full sm:w-auto px-4 sm:px-0">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto h-12 sm:h-13 px-6 sm:px-8 gold-gradient text-obsidian-900 font-extrabold text-sm sm:text-base rounded-2xl shadow-xl shadow-gold-500/25 hover:shadow-gold-500/40 hover:scale-[1.02] transition-all">
                Enter Tactical Command Center <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/register" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 sm:h-13 px-5 sm:px-7 rounded-2xl border-border bg-card/60 backdrop-blur-xl font-bold hover:bg-accent text-xs sm:text-sm">
                <ShieldCheck className="w-4 h-4 mr-2 text-gold-500 shrink-0" />
                Initialize New Workspace
              </Button>
            </Link>
          </div>

          {/* Key Metric Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full pt-10 sm:pt-14 max-w-4xl">
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

      {/* Social Proof Brand Marquee */}
      <section className="relative z-10 py-8 border-y border-border/40 bg-card/30 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-6">
            Trusted by Leaders at High-Growth & Enterprise Organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-70">
            {clientLogos.map((brand, i) => (
              <span key={i} className="text-base sm:text-lg font-extrabold tracking-tight font-heading text-muted-foreground hover:text-foreground transition-colors cursor-default">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Cockpit Preview */}
      <section id="demo-cockpit" className="relative z-10 py-16 sm:py-24 px-4 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-10">
          <span className="text-xs font-extrabold uppercase tracking-widest text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
            Live Software Experience
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-foreground">
            Experience the <span className="gold-text">Tactical Cockpit</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto">
            A unified obsidian glass workspace designed for executive clarity and zero operational friction.
          </p>
        </div>

        {/* Cockpit Window Container */}
        <div className="glass-strong rounded-3xl border border-border/80 shadow-2xl p-4 sm:p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Window Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/60">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-muted-foreground ml-2 hidden sm:inline">injaazh://tactical-command-node</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                All 12 Modules Synchronized
              </span>
              <Link href="/dashboard">
                <Button size="sm" className="gold-gradient text-obsidian-900 font-extrabold text-xs rounded-xl h-8 px-3">
                  Open Live App <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Miniature Interactive Dashboard View */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-card/60 border border-border space-y-2">
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Liquid Treasury</div>
              <div className="text-2xl font-extrabold gold-text font-heading">$1,240,500</div>
              <div className="text-xs text-emerald-500 font-semibold">+14.2% YoY Growth • Realtime Sync</div>
            </div>

            <div className="p-4 rounded-2xl bg-card/60 border border-border space-y-2">
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Active CRM Pipeline</div>
              <div className="text-2xl font-extrabold text-foreground font-heading">$3,480,000</div>
              <div className="text-xs text-blue-500 font-semibold">42 Enterprise Deals • 68.4% Win Rate</div>
            </div>

            <div className="p-4 rounded-2xl bg-card/60 border border-border space-y-2">
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Daily Workforce Presence</div>
              <div className="text-2xl font-extrabold text-foreground font-heading">118 in Office</div>
              <div className="text-xs text-purple-500 font-semibold">24 Remote • 91.0% Staffing Index</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Enterprise Modules Showcase */}
      <section id="features" className="relative z-10 py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-foreground">
            Complete Enterprise <span className="gold-text">Ecosystem</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-base max-w-xl mx-auto">
            Every business node is synchronized across a single, unified multi-tenant architecture.
          </p>
        </div>

        {/* Module Selector Tabs */}
        <div className="flex overflow-x-auto custom-scrollbar sm:flex-wrap sm:justify-center gap-2 mb-8 pb-2 sm:pb-0 px-1">
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
                  <Button className="w-full sm:w-auto gold-gradient text-obsidian-900 font-extrabold rounded-xl text-xs h-10 px-5">
                    Launch {currentModule.title} <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Visual Preview Matrix */}
            <div className="bg-gradient-to-br from-card to-background p-5 sm:p-7 rounded-2xl border border-border/80 shadow-inner space-y-4">
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

      {/* ROI & Business Value Calculator */}
      <section id="roi-calculator" className="relative z-10 py-16 px-4 max-w-5xl mx-auto">
        <div className="glass-strong rounded-3xl p-6 sm:p-10 border border-border/80 shadow-2xl space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20 text-xs font-bold mb-2">
                <Calculator className="w-3.5 h-3.5" /> Interactive ROI Model
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground">
                Calculate Your Enterprise Impact
              </h3>
            </div>
            <span className="text-xs text-muted-foreground font-semibold">
              Estimated with Google Gemini operational benchmarks
            </span>
          </div>

          {/* Slider */}
          <div className="space-y-3 bg-card/50 p-6 rounded-2xl border border-border">
            <div className="flex items-center justify-between text-sm font-bold">
              <span className="text-foreground">Total Employee Roster:</span>
              <span className="gold-text text-xl font-heading font-extrabold">{teamSize} Personnel</span>
            </div>
            <input 
              type="range"
              min="20"
              max="1000"
              step="10"
              value={teamSize}
              onChange={(e) => setTeamSize(parseInt(e.target.value))}
              className="w-full h-2 bg-accent rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
              <span>20 Staff</span>
              <span>500 Staff</span>
              <span>1,000+ Staff</span>
            </div>
          </div>

          {/* Calculated Output Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-card/60 border border-border text-center space-y-1">
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Hours Saved / Month</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-foreground font-heading">{hoursSavedPerMonth} hrs</div>
              <p className="text-[10px] text-emerald-500 font-semibold">Automated workflows & AI queries</p>
            </div>

            <div className="p-4 rounded-2xl bg-card/60 border border-border text-center space-y-1">
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Estimated Annual Savings</div>
              <div className="text-2xl sm:text-3xl font-extrabold gold-text font-heading">${estimatedSavings}</div>
              <p className="text-[10px] text-emerald-500 font-semibold">Labor & software consolidation</p>
            </div>

            <div className="p-4 rounded-2xl bg-card/60 border border-border text-center space-y-1">
              <div className="text-[10px] font-bold text-muted-foreground uppercase">Efficiency Multiple</div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-500 font-heading">3.8x ROI</div>
              <p className="text-[10px] text-muted-foreground font-semibold">Average payback in 45 days</p>
            </div>
          </div>
        </div>
      </section>

      {/* Transparent Enterprise Pricing */}
      <section id="pricing" className="relative z-10 py-16 sm:py-24 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-14">
          <span className="text-xs font-extrabold uppercase tracking-widest text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
            Transparent Investment
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-foreground">
            Enterprise Tier <span className="gold-text">Architecture</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm max-w-xl mx-auto">
            Choose the operational capacity tailored to your organizational scale.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricingPlans.map((plan, i) => (
            <div 
              key={i} 
              className={`glass rounded-3xl p-6 sm:p-8 border relative flex flex-col justify-between transition-all ${
                plan.popular 
                  ? "border-gold-500/50 shadow-2xl scale-[1.03] bg-card/80" 
                  : "border-border/80 hover:border-gold-500/30"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gold-gradient text-obsidian-950 font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                  Most Popular for Enterprises
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-foreground font-heading">{plan.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-1 my-3">
                  <span className="text-3xl sm:text-4xl font-extrabold text-foreground font-heading">{plan.price}</span>
                  <span className="text-xs text-muted-foreground font-semibold">{plan.period}</span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-border/50 text-xs">
                  {plan.features.map((f, fi) => (
                    <div key={fi} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span className="text-muted-foreground font-medium">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Link href={plan.href} className="block">
                  <Button 
                    className={`w-full rounded-2xl h-11 font-extrabold text-xs shadow-md transition-all ${
                      plan.popular 
                        ? "gold-gradient text-obsidian-900 shadow-gold-500/20 hover:opacity-90" 
                        : "bg-accent/80 hover:bg-card border border-border text-foreground"
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive FAQ Accordion */}
      <section id="faq" className="relative z-10 py-16 px-4 max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-foreground">
            Frequently Asked <span className="gold-text">Questions</span>
          </h2>
          <p className="text-muted-foreground text-xs sm:text-sm">
            Everything you need to know about Injaazh Enterprise ERP architecture.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;

            return (
              <div 
                key={i} 
                className="glass rounded-2xl border border-border/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-foreground"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-gold-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* High-Conversion Final CTA Banner */}
      <section className="relative z-10 py-16 px-4 max-w-6xl mx-auto">
        <div className="glass-strong rounded-3xl p-8 sm:p-14 border border-gold-500/40 shadow-2xl text-center relative overflow-hidden space-y-6">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

          <span className="text-xs font-extrabold uppercase tracking-widest text-gold-500 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
            Deploy in Under 60 Seconds
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-foreground max-w-2xl mx-auto">
            Ready to Unify Your <span className="gold-text">Enterprise Command?</span>
          </h2>

          <p className="text-muted-foreground text-xs sm:text-base max-w-xl mx-auto leading-relaxed">
            Join forward-thinking enterprise executives running their entire business operations on Injaazh ERP.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 gold-gradient text-obsidian-900 font-extrabold text-sm rounded-2xl shadow-xl shadow-gold-500/20 hover:opacity-90">
                Initialize Enterprise Workspace <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-6 rounded-2xl border-border bg-card/60 font-bold hover:bg-accent text-xs">
                Explore Demo Console
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Comprehensive Enterprise Footer */}
      <footer className="relative z-10 border-t border-border/60 py-16 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl gold-gradient flex items-center justify-center text-obsidian-900 font-bold text-sm">
                I
              </div>
              <span className="font-bold text-lg text-foreground font-heading">
                Injaazh<span className="gold-text">ERP</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
              Unified Enterprise Resource Planning platform powered by Google Gemini 1.5, MongoDB Atlas, and Next.js 14.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-500 font-semibold pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Global Sovereign Cluster Active • 99.99% Uptime</span>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <h5 className="font-bold text-foreground font-heading uppercase tracking-wider text-[11px]">Core Modules</h5>
            <div className="flex flex-col space-y-1.5 text-muted-foreground">
              <Link href="/finance" className="hover:text-foreground transition-colors">Master Treasury</Link>
              <Link href="/crm" className="hover:text-foreground transition-colors">CRM & Pipelines</Link>
              <Link href="/hrm" className="hover:text-foreground transition-colors">Talent Roster</Link>
              <Link href="/inventory" className="hover:text-foreground transition-colors">Warehouse Logistics</Link>
              <Link href="/ai-hub" className="hover:text-foreground transition-colors">Strategic AI Hub</Link>
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <h5 className="font-bold text-foreground font-heading uppercase tracking-wider text-[11px]">Platform</h5>
            <div className="flex flex-col space-y-1.5 text-muted-foreground">
              <Link href="/dashboard" className="hover:text-foreground transition-colors">Command Dashboard</Link>
              <Link href="/login" className="hover:text-foreground transition-colors">Authorized Sign In</Link>
              <Link href="/register" className="hover:text-foreground transition-colors">Create Workspace</Link>
              <Link href="/analytics" className="hover:text-foreground transition-colors">Executive Analytics</Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} Injaazh PLC. All rights reserved. Enterprise Resource Planning.</span>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Confidential & Proprietary</span>
            <span>•</span>
            <span>AES-256 Encrypted</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
