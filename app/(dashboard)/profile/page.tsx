"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import {
  User, Mail, Shield, Calendar, MapPin, Phone, Briefcase, Camera,
  ShieldCheck, Fingerprint, History, Edit3, Globe, Lock, Sparkles,
  Key, Laptop, Smartphone, Monitor, CheckCircle2, ArrowRight,
  LogOut, RefreshCw, Layers, AlertCircle, Building2, Check,
  Sliders, Bell, Save, X, Eye, FileDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface DeviceSession {
  id: string;
  device: string;
  os: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
  type: "desktop" | "laptop" | "mobile";
}

const initialSessions: DeviceSession[] = [
  {
    id: "s-1",
    device: "Custom Gaming & Workstation Rig",
    os: "Windows 11 Pro 64-bit",
    browser: "Google Chrome 128.0",
    location: "Dhaka, Bangladesh",
    ip: "103.45.122.84",
    lastActive: "Active Now",
    isCurrent: true,
    type: "desktop",
  },
  {
    id: "s-2",
    device: "Apple MacBook Pro 16\" M3 Max",
    os: "macOS Sonoma 14.6",
    browser: "Safari 17.5",
    location: "Singapore Gateway Hub",
    ip: "165.225.112.40",
    lastActive: "2 hours ago",
    isCurrent: false,
    type: "laptop",
  },
  {
    id: "s-3",
    device: "Apple iPhone 16 Pro Max",
    os: "iOS 18.0",
    browser: "Injaazh Mobile App",
    location: "London, United Kingdom",
    ip: "82.165.197.12",
    lastActive: "Yesterday, 06:30 PM",
    isCurrent: false,
    type: "mobile",
  },
];

const rbacPrivileges = [
  { module: "General Ledger & Fiscal Treasury", access: "Full Unrestricted (L5)", status: "Granted" },
  { module: "Procurement & Sourcing Contracts", access: "Authorize & Sign (L5)", status: "Granted" },
  { module: "Manufacturing & Robotic MES", access: "Plant Supervisor (L5)", status: "Granted" },
  { module: "Inventory Vaults & Safety Buffers", access: "Master Allocation (L5)", status: "Granted" },
  { module: "AI Hub & Gemini Neural Models", access: "Model Orchestrator (L5)", status: "Granted" },
  { module: "Project Portfolio & Sprint Gates", access: "Program Director (L5)", status: "Granted" },
];

export default function ProfilePage() {
  const { data: session } = useSession();
  const authUser = session?.user;

  // Profile Form States
  const [name, setName] = useState(authUser?.name || "Md Mamun Hossain");
  const [email, setEmail] = useState(authUser?.email || "mamun@injaazh.com");
  const [jobTitle, setJobTitle] = useState("Chief Executive Officer & Chief Architect");
  const [department, setDepartment] = useState("Executive Board & Core Systems");
  const [phone, setPhone] = useState("+880 1712-345678");
  const [location, setLocation] = useState("Dhaka Node • Silicon Valley HQ");
  const [bio, setBio] = useState("Leading high-velocity enterprise AI and ERP architecture. Overseeing sovereign multi-tenant cloud operations and cryptographic general ledger integrity.");

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "security" | "rbac" | "preferences">("overview");

  // Security States
  const [sessions, setSessions] = useState<DeviceSession[]>(initialSessions);
  const [isTestingPasskey, setIsTestingPasskey] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(true);
  const [preferredCurrency, setPreferredCurrency] = useState("USD ($)");
  const [realtimeAlerts, setRealtimeAlerts] = useState(true);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      toast.success("Executive Profile Matrix Updated!", {
        description: "Profile metadata synchronized across Injaazh Enterprise Sovereign nodes.",
      });
    }, 1000);
  };

  const handleTestPasskey = () => {
    setIsTestingPasskey(true);
    setTimeout(() => {
      setIsTestingPasskey(false);
      toast.success("Biometric WebAuthn Signature Verified!", {
        description: "FIPS 140-2 Level 3 cryptographic hardware token validated.",
      });
    }, 1200);
  };

  const handleRevokeSession = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    toast.info("Device session revoked and access token invalidated.");
  };

  const handleExportAudit = () => {
    toast.success("Identity Security Audit Log Exported!", {
      description: "Signed cryptographic CSV security log downloaded.",
    });
  };

  return (
    <div className="space-y-6 pb-16 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Cinematic Sovereign Hero Banner */}
      <div className="glass-strong rounded-3xl border border-border/80 shadow-2xl relative overflow-hidden p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Avatar & User Details */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="relative group/avatar shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl gold-gradient p-1 shadow-2xl shadow-gold-500/30">
                <div className="w-full h-full rounded-[22px] bg-obsidian-950 flex items-center justify-center text-gold-500 font-heading font-black text-3xl sm:text-4xl shadow-inner">
                  {name.charAt(0) || "M"}
                </div>
              </div>
              <button 
                title="Change Avatar"
                onClick={() => toast.info("Profile Avatar Customizer: Upload feature initialized.")}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-xl bg-card border border-border shadow-lg flex items-center justify-center text-gold-500 hover:scale-110 active:scale-95 transition-all cursor-pointer"
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/15 px-2.5 py-0.5 rounded-full border border-gold-500/30 uppercase tracking-widest font-mono flex items-center gap-1">
                  <Shield className="w-3 h-3 text-gold-500" /> Sovereign Super-Admin (Level 5)
                </span>
                <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/30 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Active Identity
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-foreground font-heading tracking-tight">
                {name}
              </h1>

              <p className="text-xs sm:text-sm font-semibold text-muted-foreground">
                {jobTitle} • <strong className="text-foreground">{department}</strong>
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-muted-foreground pt-1">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gold-500" /> {email}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" /> {location}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2.5">
            <Button
              variant="outline"
              onClick={handleExportAudit}
              className="h-11 px-4 rounded-xl text-xs font-bold bg-card border-border hover:border-gold-500/40 cursor-pointer shadow-sm flex items-center gap-2"
            >
              <FileDown className="w-4 h-4 text-blue-500" />
              <span>Export Audit</span>
            </Button>

            <Button
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "h-11 px-6 rounded-xl font-black text-xs shadow-lg transition-all cursor-pointer flex items-center gap-2",
                isEditing 
                  ? "bg-card border border-border text-foreground hover:bg-accent" 
                  : "gold-gradient text-obsidian-950 shadow-gold-500/25 hover:opacity-95"
              )}
            >
              {isEditing ? (
                <>
                  <X className="w-4 h-4" /> Cancel Editing
                </>
              ) : (
                <>
                  <Edit3 className="w-4 h-4" /> Edit Profile Matrix
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar pt-6 mt-6 border-t border-border/60">
          {[
            { id: "overview", label: "Executive Matrix", icon: User },
            { id: "security", label: "Security & Passkeys", icon: ShieldCheck },
            { id: "rbac", label: "Authority & Privileges", icon: Key },
            { id: "preferences", label: "AI Preferences", icon: Sliders },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border",
                activeTab === tab.id
                  ? "gold-gradient text-obsidian-950 border-gold-400 shadow-md font-black scale-102"
                  : "bg-card/60 hover:bg-card border-border/70 text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: EXECUTIVE PROFILE MATRIX */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
          {/* Main Info / Edit Form */}
          <div className="lg:col-span-2 glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gold-500/15 text-gold-500 flex items-center justify-center font-bold">
                  <Briefcase className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-heading">
                    {isEditing ? "Modify Executive Information" : "Executive Personal Matrix"}
                  </h3>
                  <p className="text-[10px] text-muted-foreground">Authorized identity credentials and operational coordinates</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                Verified Identity
              </span>
            </div>

            {isEditing ? (
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Full Legal Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-11 bg-background/60 border-border/80 rounded-2xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Enterprise Email</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 bg-background/60 border-border/80 rounded-2xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Executive Title</Label>
                    <Input
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      className="h-11 bg-background/60 border-border/80 rounded-2xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Department</Label>
                    <Input
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="h-11 bg-background/60 border-border/80 rounded-2xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Contact Phone</Label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-11 bg-background/60 border-border/80 rounded-2xl text-xs font-semibold"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Primary Node Location</Label>
                    <Input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="h-11 bg-background/60 border-border/80 rounded-2xl text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">Executive Biography</Label>
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full bg-background/60 border border-border/80 rounded-2xl p-3 text-xs font-medium text-foreground outline-none focus:border-gold-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="h-11 px-5 rounded-xl text-xs font-bold cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSaving}
                    className="h-11 px-6 rounded-xl gold-gradient text-obsidian-950 font-black text-xs cursor-pointer shadow-lg shadow-gold-500/20"
                  >
                    {isSaving ? "Saving Matrix..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</span>
                    <p className="text-sm font-extrabold text-foreground">{name}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Corporate Email</span>
                    <p className="text-sm font-extrabold text-foreground">{email}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Executive Role</span>
                    <p className="text-sm font-extrabold text-foreground">{jobTitle}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Assigned Department</span>
                    <p className="text-sm font-extrabold text-foreground">{department}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Contact Phone</span>
                    <p className="text-sm font-extrabold text-foreground">{phone}</p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-card/60 border border-border/70 space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Primary Station Node</span>
                    <p className="text-sm font-extrabold text-foreground">{location}</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-card/60 border border-border/70 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Executive Biography</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">{bio}</p>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Global Node Clearance */}
          <div className="space-y-6">
            <div className="glass rounded-3xl border border-border/80 p-5 sm:p-6 shadow-xl space-y-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
              <div className="flex items-center gap-2.5 pb-3 border-b border-border/60">
                <Globe className="w-5 h-5 text-gold-500" />
                <h3 className="text-sm font-bold text-foreground font-heading">Global Node Access</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your sovereign credential holds unrestricted Level 5 multi-tenant clearance across Dhaka Central, Silicon Valley Alpha, Frankfurt Beta, and Singapore Gamma nodes.
              </p>
              <div className="pt-2 border-t border-border/60 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Security Clearance:</span>
                  <span className="font-bold text-gold-500">Level 5 (Unrestricted)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Multi-Tenant Vault:</span>
                  <span className="font-semibold text-emerald-500">Enterprise Core</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Audit Signature:</span>
                  <span className="font-mono text-[10px] text-muted-foreground">SHA-256: 8f9b...a47c</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SECURITY & HARDWARE MFA VAULT */}
      {activeTab === "security" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {/* Security Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass rounded-3xl p-5 border border-border/80 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-500 flex items-center justify-center">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Active
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground">Biometric Passkey / WebAuthn</h4>
                <p className="text-[10px] text-muted-foreground mt-0.5">FIDO2 hardware biometric signature enabled</p>
              </div>
              <Button
                onClick={handleTestPasskey}
                disabled={isTestingPasskey}
                variant="outline"
                className="w-full h-9 rounded-xl text-xs font-bold cursor-pointer"
              >
                {isTestingPasskey ? "Validating Token..." : "Test Biometric Signature"}
              </Button>
            </div>

            <div className="glass rounded-3xl p-5 border border-border/80 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/15 text-blue-500 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold text-blue-500 bg-blue-500/10 px-2.5 py-0.5 rounded-full border border-blue-500/20">
                  AES-256
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground">Hardware Cryptographic Keys</h4>
                <p className="text-[10px] text-muted-foreground mt-0.5">End-to-end ledger signing & encryption</p>
              </div>
              <div className="font-mono text-[10px] p-2 bg-background/60 rounded-xl text-muted-foreground truncate border border-border/60">
                0x9F42A7C8...3B11D4
              </div>
            </div>

            <div className="glass rounded-3xl p-5 border border-border/80 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-gold-500/15 text-gold-500 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-extrabold text-gold-500 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/20">
                  Strict
                </span>
              </div>
              <div>
                <h4 className="font-bold text-sm text-foreground">Zero-Trust Telemetry</h4>
                <p className="text-[10px] text-muted-foreground mt-0.5">Continuous identity behavioral validation</p>
              </div>
              <div className="text-[11px] text-emerald-500 font-bold flex items-center gap-1.5 pt-1">
                <CheckCircle2 className="w-4 h-4" /> 100% Zero-Trust Compliance
              </div>
            </div>
          </div>

          {/* Active Device Sessions Fleet */}
          <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground font-heading">Active Authorized Device Fleet</h3>
                  <p className="text-[10px] text-muted-foreground">Manage authorized workstations and mobile tokens logged into your identity</p>
                </div>
              </div>
              <span className="text-xs font-bold text-muted-foreground">{sessions.length} Authorized</span>
            </div>

            <div className="border border-border/80 rounded-2xl overflow-hidden divide-y divide-border/60 bg-card/40">
              {sessions.map((session) => (
                <div key={session.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground shrink-0 mt-0.5">
                      {session.type === "desktop" ? <Monitor className="w-5 h-5 text-gold-500" /> :
                       session.type === "laptop" ? <Laptop className="w-5 h-5 text-blue-500" /> :
                       <Smartphone className="w-5 h-5 text-emerald-500" />}
                    </div>

                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-foreground">{session.device}</h4>
                        {session.isCurrent && (
                          <span className="text-[9px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/25">
                            Current Device
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {session.os} • {session.browser}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        📍 {session.location} ({session.ip}) • <span className="font-semibold text-foreground">{session.lastActive}</span>
                      </p>
                    </div>
                  </div>

                  {!session.isCurrent && (
                    <Button
                      variant="outline"
                      onClick={() => handleRevokeSession(session.id)}
                      className="h-9 px-3 rounded-xl text-xs font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 border-border self-end sm:self-auto cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5 mr-1.5" /> Revoke
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RBAC AUTHORITY & PRIVILEGES */}
      {activeTab === "rbac" && (
        <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gold-500/15 text-gold-500 flex items-center justify-center font-bold">
                <Key className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground font-heading">Role-Based Access Control (RBAC) Matrix</h3>
                <p className="text-[10px] text-muted-foreground">Enterprise module authority gates and cryptographic signing privileges</p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/15 px-2.5 py-0.5 rounded-full border border-gold-500/30 font-mono">
              ROOT CLEARANCE
            </span>
          </div>

          <div className="border border-border/80 rounded-2xl overflow-hidden bg-card/40">
            <table className="w-full text-left text-xs">
              <thead className="bg-card/80 border-b border-border/80 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="py-3.5 pl-4">System Module</th>
                  <th className="py-3.5">Assigned Authority Level</th>
                  <th className="py-3.5 pr-4 text-right">Access Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {rbacPrivileges.map((item, idx) => (
                  <tr key={idx} className="hover:bg-accent/40 transition-colors">
                    <td className="py-3.5 pl-4 font-bold text-foreground flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{item.module}</span>
                    </td>
                    <td className="py-3.5 font-semibold text-gold-600 dark:text-gold-400">
                      {item.access}
                    </td>
                    <td className="py-3.5 pr-4 text-right">
                      <span className="text-[9px] font-extrabold uppercase tracking-widest text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20 inline-block">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: WORKSPACE & AI PREFERENCES */}
      {activeTab === "preferences" && (
        <div className="glass-strong rounded-3xl border border-border/80 p-5 sm:p-7 shadow-xl space-y-6 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-3 border-b border-border/60">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-500 flex items-center justify-center font-bold">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground font-heading">Workspace & AI Copilot Preferences</h3>
                <p className="text-[10px] text-muted-foreground">Configure AI telemetry prompts, currency defaults, and system notifications</p>
              </div>
            </div>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-card/60 border border-border/70 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-bold text-foreground block">Proactive AI Copilot Inquiries</span>
                <p className="text-muted-foreground text-[11px]">Enable Gemini 1.5 Pro to suggest automated POs and risk mitigations</p>
              </div>
              <input
                type="checkbox"
                checked={aiSuggestions}
                onChange={(e) => setAiSuggestions(e.target.checked)}
                className="w-5 h-5 rounded-md accent-gold-500 cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-2xl bg-card/60 border border-border/70 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-bold text-foreground block">Primary Fiscal Currency</span>
                <p className="text-muted-foreground text-[11px]">Default denomination displayed across financial statements</p>
              </div>
              <select
                value={preferredCurrency}
                onChange={(e) => setPreferredCurrency(e.target.value)}
                className="bg-background border border-border/80 rounded-xl h-10 px-3 font-bold text-foreground outline-none focus:border-gold-500"
              >
                <option value="USD ($)">USD ($) — United States Dollar</option>
                <option value="EUR (€)">EUR (€) — Euro</option>
                <option value="BDT (৳)">BDT (৳) — Bangladeshi Taka</option>
                <option value="AED (د.إ)">AED (د.إ) — UAE Dirham</option>
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-card/60 border border-border/70 flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="font-bold text-foreground block">Real-time Double-Entry Ledger Rebalancing Sound</span>
                <p className="text-muted-foreground text-[11px]">Play subtle audio haptic confirmation on verified audit reconciliations</p>
              </div>
              <input
                type="checkbox"
                checked={realtimeAlerts}
                onChange={(e) => setRealtimeAlerts(e.target.checked)}
                className="w-5 h-5 rounded-md accent-gold-500 cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
