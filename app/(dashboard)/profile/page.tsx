"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import {
  User, Mail, Shield, Calendar, MapPin, Phone, Briefcase, Camera,
  ShieldCheck, Fingerprint, History, Edit3, Globe, Lock, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();
  const user = session?.user;

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
          <span className="text-sm text-muted-foreground font-medium">Loading Profile...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10 pb-8 max-w-[1600px] mx-auto">
      {/* Cinematic Profile Hero */}
      <motion.div variants={fadeUp}>
        <div className="relative">
          <div className="relative h-64 rounded-[48px] overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-obsidian-900 via-obsidian-800 to-obsidian-900" />
            <div className="absolute inset-0 bg-gold-500/5 mix-blend-overlay" />
          </div>

          <div className="absolute -bottom-12 left-12 flex items-end space-x-8">
            <div className="relative group/avatar">
              <div className="w-40 h-40 rounded-[48px] bg-card/60 backdrop-blur-xl p-2 shadow-2xl relative z-10 border-4 border-background">
                <div className="w-full h-full rounded-[40px] bg-gradient-to-tr from-gold-500 to-amber-600 flex items-center justify-center text-obsidian-900 text-5xl font-bold italic shadow-inner">
                  {user?.name?.[0] || "M"}
                </div>
              </div>
              <button className="absolute bottom-4 right-4 w-10 h-10 rounded-2xl bg-card/60 backdrop-blur-xl text-gold-400 flex items-center justify-center shadow-xl z-20 hover:scale-110 active:scale-95 transition-all border border-border">
                <Camera className="w-5 h-5" />
              </button>
            </div>
            <div className="pb-20 space-y-1">
              <h1 className="text-4xl font-bold text-white tracking-tight drop-shadow-lg">
                {user?.name || "Md Mamun Hossain"}
              </h1>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5 bg-gold-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-gold-500/20">
                  <Shield className="w-3 h-3 text-gold-400" />
                  <span className="text-[10px] font-bold text-gold-100 uppercase tracking-widest">{user?.role || "ADMIN"}</span>
                </div>
                <div className="flex items-center space-x-1.5 bg-emerald-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-emerald-100 uppercase tracking-widest">Active Identity</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column */}
        <motion.div variants={fadeUp} className="space-y-8">
          <Card className="border-none shadow-sm bg-card/60 backdrop-blur-xl rounded-[40px] p-8 space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground border-b border-border pb-4">Personal Matrix</h3>
            <div className="space-y-6">
              <InfoRow icon={Mail} label="Email Address" value={user?.email || "mamun@injaazh.com"} />
              <InfoRow icon={Phone} label="Contact Phone" value="+880 17XX-XXXXXX" />
              <InfoRow icon={MapPin} label="Location" value="Dhaka, Bangladesh" />
              <InfoRow icon={Calendar} label="Member Since" value="May 2024" />
            </div>
            <Button className="w-full h-14 rounded-2xl bg-gold-500 hover:bg-gold-600 text-obsidian-900 font-bold uppercase tracking-tight transition-all">
              <Edit3 className="w-4 h-4 mr-2" /> Update Profile
            </Button>
          </Card>

          <Card className="border-none shadow-sm bg-gradient-to-br from-gold-600 to-amber-700 rounded-[40px] p-8 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <div className="relative z-10 space-y-4">
              <Globe className="w-8 h-8 opacity-50" />
              <h3 className="text-xl font-bold tracking-tight">Global <span className="text-gold-200">Access</span></h3>
              <p className="text-xs font-medium text-gold-100 leading-relaxed">
                Your account is authorized for Multi-tenant operations across all Injaazh Enterprise nodes.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Right Columns */}
        <motion.div variants={fadeUp} className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-sm bg-card/60 backdrop-blur-xl rounded-[48px] p-10">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold tracking-tight">Security <span className="text-gold-400">Command</span></h3>
              <div className="p-2 rounded-xl bg-emerald-500/15">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
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
                color="gold"
              />
            </div>

            <div className="mt-10 p-6 rounded-[32px] bg-card/40 border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <History className="w-4 h-4 text-muted-foreground" />
                  <h4 className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Recent Security Activity</h4>
                </div>
                <Button variant="ghost" className="text-[9px] font-bold uppercase tracking-widest text-gold-400">Audit Logs →</Button>
              </div>
              <div className="space-y-3">
                <ActivityRow label="New Login Detected" time="2 mins ago" ip="103.45.XX.XX" />
                <ActivityRow label="Password Updated" time="3 days ago" ip="103.45.XX.XX" />
              </div>
            </div>
          </Card>

          <Card className="border-none shadow-2xl bg-obsidian-900 rounded-[48px] p-10 text-white overflow-hidden relative border border-gold-500/20">
            <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 to-transparent pointer-events-none" />
            <div className="flex items-center justify-between mb-8 relative z-10">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold tracking-tight">Enterprise <span className="text-gold-400">Privileges</span></h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Identity Tier: Tier-1 Strategic</p>
              </div>
              <Briefcase className="w-10 h-10 text-gold-400" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
              <StatBox label="Projects" value="12" />
              <StatBox label="Tasks" value="48" />
              <StatBox label="Meetings" value="15" />
              <StatBox label="Clearance" value="Lvl 4" />
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

function InfoRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start space-x-4">
      <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-400 shrink-0">
        <Icon className="w-5 h-5" />
      </div>
      <div className="space-y-0.5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
        <p className="text-sm font-bold text-card-foreground">{value}</p>
      </div>
    </div>
  );
}

function SecurityCard({ icon: Icon, title, status, desc, color }: any) {
  return (
    <div className="p-6 rounded-[32px] bg-card/40 border border-border group hover:border-gold-500/20 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center text-white",
          color === "emerald" ? "bg-emerald-500" : "bg-gold-500"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        <span className={cn(
          "text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg",
          color === "emerald" ? "bg-emerald-500/15 text-emerald-400" : "bg-gold-500/15 text-gold-400"
        )}>{status}</span>
      </div>
      <h4 className="text-sm font-bold tracking-tight mb-1">{title}</h4>
      <p className="text-[10px] text-muted-foreground font-medium leading-relaxed">{desc}</p>
    </div>
  );
}

function ActivityRow({ label, time, ip }: any) {
  return (
    <div className="flex items-center justify-between text-[10px]">
      <div className="flex items-center space-x-2">
        <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
        <span className="font-bold text-card-foreground">{label}</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-muted-foreground">{time}</span>
        <span className="font-bold text-muted-foreground">{ip}</span>
      </div>
    </div>
  );
}

function StatBox({ label, value }: any) {
  return (
    <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center space-y-1">
      <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-xl font-bold tracking-tight">{value}</span>
    </div>
  );
}
