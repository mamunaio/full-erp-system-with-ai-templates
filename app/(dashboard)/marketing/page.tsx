"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Megaphone, TrendingUp, Users, Mail, ArrowRight,
  BarChart3, MessageSquare, Target, Sparkles, MousePointerClick
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import AICommandBar from "@/components/dashboard/AICommandBar";
import SmartAlerts from "@/components/dashboard/SmartAlerts";
import KPICard from "@/components/dashboard/KPICard";
import RevenueChart from "@/components/dashboard/RevenueChart";
import QuickActions from "@/components/dashboard/QuickActions";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

const marketingSuggestions = [ "Campaign performance", "Lead generation trends", "Email analytics", "Social media ROI" ];

const marketingAlerts = [
  { id: "1", severity: "critical" as const, title: "Campaign Underperforming", description: "Q3 email campaign open rate dropped 8% below target.", time: "1h ago" },
  { id: "2", severity: "warning" as const, title: "Budget Nearly Exhausted", description: "Marketing spend at 85% of quarterly budget.", time: "3h ago" },
  { id: "3", severity: "info" as const, title: "New Lead Source", description: "LinkedIn Ads driving 40% more conversions this week.", time: "5h ago" },
  { id: "4", severity: "warning" as const, title: "Content Pipeline Low", description: "Only 2 blog posts scheduled for next month.", time: "8h ago" },
  { id: "5", severity: "info" as const, title: "Social Growth Milestone", description: "Instagram followers crossed 10K — 22% engagement rate.", time: "12h ago" },
];

const campaignData = [
  { month: "Jan", revenue: 12000, expense: 8000 },
  { month: "Feb", revenue: 15000, expense: 9000 },
  { month: "Mar", revenue: 18000, expense: 10000 },
  { month: "Apr", revenue: 22000, expense: 12000 },
  { month: "May", revenue: 20000, expense: 11000 },
  { month: "Jun", revenue: 28000, expense: 14000 },
  { month: "Jul", revenue: 32000, expense: 16000 },
  { month: "Aug", revenue: 29000, expense: 15000 },
  { month: "Sep", revenue: 35000, expense: 18000 },
  { month: "Oct", revenue: 38000, expense: 19000 },
  { month: "Nov", revenue: 42000, expense: 21000 },
  { month: "Dec", revenue: 48000, expense: 24000 },
];

const moduleCards = [
  { href: "/marketing/campaigns", title: "Campaigns", description: "8 Active Campaigns", icon: Megaphone, trend: "+2" },
  { href: "/marketing/leads", title: "Leads Generated", description: "1,284 Total Leads", icon: Users, trend: "+18%" },
  { href: "/marketing/email", title: "Email Marketing", description: "42% Open Rate", icon: Mail, trend: "Stable" },
  { href: "/marketing/analytics", title: "Analytics", description: "ROI Dashboard", icon: BarChart3, trend: "View" },
];

export default function MarketingPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center gap-4">
          <div className="relative w-10 h-10">
            <div className="absolute inset-0 rounded-xl border-2 border-gold-500/20" />
            <div className="absolute inset-0 rounded-xl border-2 border-transparent border-t-gold-500 animate-spin" />
            <div className="absolute inset-1 rounded-lg bg-gold-500/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-gold-400 animate-pulse" />
            </div>
          </div>
          <span className="text-sm text-muted-foreground font-medium">Loading Marketing...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6 pb-8 max-w-[1600px] mx-auto">
      <motion.div variants={fadeUp}>
        <div className="bg-card/40 backdrop-blur-2xl rounded-2xl border border-border p-6 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-gold-500/5 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-gold-500/5 blur-[60px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Marketing Online</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-heading">
                Marketing <span className="text-gold-400">Command Center</span>
              </h1>
              <p className="text-muted-foreground text-sm">
                Campaign orchestration, lead generation, and brand analytics.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/marketing/campaigns/new">
                <Button className="bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-[20px] h-14 px-8 shadow-lg shadow-gold-500/20 font-bold uppercase tracking-tight transition-all active:scale-95">
                  <Megaphone className="w-5 h-5 mr-3" /> New Campaign
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <AICommandBar suggestions={marketingSuggestions} />
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <KPICard title="Active Campaigns" value="8" change="+2" trend="up" icon={Megaphone} sparkline={[4, 5, 5, 6, 7, 7, 8]} />
          <KPICard title="Leads Generated" value="1,284" change="+18%" trend="up" icon={Users} sparkline={[800, 920, 1050, 1100, 1180, 1240, 1284]} />
          <KPICard title="Conversion Rate" value="24.8%" change="+2.4%" trend="up" icon={Target} sparkline={[18, 20, 21, 22, 23, 24, 24.8]} />
          <KPICard title="Email Open Rate" value="42%" change="+3.1%" trend="up" icon={Mail} sparkline={[32, 35, 37, 38, 40, 41, 42]} />
        </div>
      </motion.div>

      <motion.div variants={fadeUp}>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 [&>*]:break-inside-avoid [&>*]:mb-4">
          <div className="lg:col-span-1">
            <RevenueChart data={campaignData} />
          </div>
          <div>
            <SmartAlerts data={marketingAlerts} />
          </div>
          <div className="space-y-4">
            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <h3 className="text-sm font-semibold text-card-foreground font-heading mb-4">Quick Navigation</h3>
              <div className="grid grid-cols-1 gap-3">
                {moduleCards.map((mod) => (
                  <Link key={mod.href} href={mod.href}>
                    <div className="group flex items-center gap-4 p-4 rounded-xl bg-gold-500/5 hover:bg-gold-500/10 border border-transparent hover:border-gold-500/20 transition-all cursor-pointer">
                      <div className="w-12 h-12 rounded-xl bg-gold-500/20 flex items-center justify-center text-gold-400 shadow-md group-hover:scale-110 transition-transform shrink-0">
                        <mod.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-card-foreground group-hover:text-gold-400 transition-colors font-heading">{mod.title}</h4>
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{mod.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-gold-400 uppercase tracking-widest bg-gold-500/10 px-2 py-1 rounded-full">{mod.trend}</span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-card/60 backdrop-blur-xl rounded-xl border border-border p-5 hover:border-gold-500/20 transition-all duration-300">
              <div className="flex items-center gap-2 mb-4">
                <MousePointerClick className="w-4 h-4 text-gold-400" />
                <h3 className="text-sm font-semibold text-card-foreground font-heading">Channel Performance</h3>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                    <span>Social Media</span>
                    <span className="text-gold-400">34%</span>
                  </div>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-[34%] bg-gold-500 rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                    <span>Email</span>
                    <span className="text-gold-400">28%</span>
                  </div>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-[28%] bg-gold-500 rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                    <span>Paid Ads</span>
                    <span className="text-gold-400">22%</span>
                  </div>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-[22%] bg-gold-500 rounded-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
                    <span>Organic Search</span>
                    <span className="text-gold-400">16%</span>
                  </div>
                  <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                    <div className="h-full w-[16%] bg-gold-500 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
