"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Settings, User, ShieldCheck, Globe, Bell, Palette, CreditCard, Zap,
  Camera, Mail, Lock, Smartphone, Check, ChevronRight, LogOut,
  Moon, Sun, Laptop, Key, ShieldAlert, QrCode, Languages, DollarSign,
  Clock, ExternalLink, Github, Chrome, Sparkles, ArrowLeft,
  Building2, Database, Shield, Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import PermissionMatrix from "./components/PermissionMatrix";
import AuditTable from "./components/AuditTable";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [companyName, setCompanyName] = useState("Injaazh Global PLC");
  const [adminEmail, setAdminEmail] = useState("admin@injaazh.com");
  const [timezone, setTimezone] = useState("Asia/Dhaka (GMT+6)");
  const [currency, setCurrency] = useState("USD ($)");

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [autoAuditLogs, setAutoAuditLogs] = useState(true);
  const [geminiModel, setGeminiModel] = useState("gemini-1.5-pro");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success("Executive Avatar preview updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = () => {
    toast.success("Enterprise configurations and preferences successfully saved!");
  };

  return (
    <div className="space-y-6 pb-12 max-w-[1600px] mx-auto">
      {/* Top Banner: Enterprise Settings & Security Command */}
      <div className="glass-strong rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center text-obsidian-950 font-extrabold shadow-lg shadow-gold-500/20 shrink-0">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Global Configuration Active
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-foreground">
                Enterprise & <span className="gold-text">Security Settings</span>
              </h1>
              <p className="text-muted-foreground text-xs sm:text-sm mt-0.5">
                Manage organization profile, authentication credentials, RBAC access matrix, and billing tiers.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={handleSaveSettings}
              className="gold-gradient text-obsidian-900 font-extrabold text-xs sm:text-sm rounded-2xl h-11 sm:h-12 px-6 shadow-lg shadow-gold-500/20 hover:opacity-90"
            >
              <Save className="w-4 h-4 mr-1.5" /> Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-card/60 p-1 rounded-2xl border border-border flex flex-wrap gap-1 w-fit">
          <TabsTrigger value="general" className="rounded-xl font-bold text-xs px-4 py-2 data-[state=active]:gold-gradient data-[state=active]:text-obsidian-950">
            <User className="w-3.5 h-3.5 mr-1.5" /> General & Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-xl font-bold text-xs px-4 py-2 data-[state=active]:gold-gradient data-[state=active]:text-obsidian-950">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" /> Security & 2FA
          </TabsTrigger>
          <TabsTrigger value="rbac" className="rounded-xl font-bold text-xs px-4 py-2 data-[state=active]:gold-gradient data-[state=active]:text-obsidian-950">
            <Shield className="w-3.5 h-3.5 mr-1.5" /> RBAC Permissions
          </TabsTrigger>
          <TabsTrigger value="audit" className="rounded-xl font-bold text-xs px-4 py-2 data-[state=active]:gold-gradient data-[state=active]:text-obsidian-950">
            <Clock className="w-3.5 h-3.5 mr-1.5" /> Audit Trail
          </TabsTrigger>
          <TabsTrigger value="billing" className="rounded-xl font-bold text-xs px-4 py-2 data-[state=active]:gold-gradient data-[state=active]:text-obsidian-950">
            <CreditCard className="w-3.5 h-3.5 mr-1.5" /> Enterprise Tier
          </TabsTrigger>
        </TabsList>

        {/* Tab 1: General & Profile */}
        <TabsContent value="general" className="space-y-6">
          <div className="glass rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">Executive Profile & Organization Info</h3>
              <p className="text-xs text-muted-foreground">General workspace parameters, timezones, and display configurations</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-border/50">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <div className="w-20 h-20 rounded-2xl gold-gradient flex items-center justify-center font-extrabold text-obsidian-950 text-2xl shadow-md overflow-hidden">
                  {profileImage ? (
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    session?.user?.name?.[0] || "A"
                  )}
                </div>
                <div className="absolute inset-0 rounded-2xl bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Camera className="w-5 h-5" />
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  accept="image/*" 
                  className="hidden" 
                />
              </div>

              <div className="space-y-1 text-center sm:text-left">
                <h4 className="text-sm font-bold text-foreground">{session?.user?.name || "Commander Admin"}</h4>
                <p className="text-xs text-muted-foreground">{session?.user?.email || "admin@injaazh.com"}</p>
                <span className="inline-block text-[10px] font-extrabold text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2 py-0.5 rounded-full border border-gold-500/20 mt-1">
                  Tenant Owner • Super Admin
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground">Organization Legal Entity</Label>
                <Input 
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="rounded-xl bg-background border-border text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground">Primary Security & Billing Email</Label>
                <Input 
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="rounded-xl bg-background border-border text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground">System Primary Timezone</Label>
                <Input 
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="rounded-xl bg-background border-border text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-foreground">Base Financial Currency</Label>
                <Input 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="rounded-xl bg-background border-border text-xs"
                />
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 2: Security & 2FA */}
        <TabsContent value="security" className="space-y-6">
          <div className="glass rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl space-y-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-foreground font-heading">Authentication & Cryptographic Security</h3>
              <p className="text-xs text-muted-foreground">Two-factor authentication, cryptographic session locks, and API keys</p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-card/60 border border-border/70 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-gold-500" />
                    <h4 className="text-xs font-bold text-foreground">Hardware & TOTP Two-Factor Authentication (2FA)</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Require authenticator app codes on every authorized sign-in.</p>
                </div>
                <Switch 
                  checked={twoFactorEnabled} 
                  onCheckedChange={(checked) => {
                    setTwoFactorEnabled(checked);
                    toast.success(checked ? "2FA Authentication activated." : "2FA Authentication disabled.");
                  }}
                />
              </div>

              <div className="p-4 rounded-2xl bg-card/60 border border-border/70 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-emerald-500" />
                    <h4 className="text-xs font-bold text-foreground">Continuous Cryptographic Audit Stream</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Log all database queries and transaction modifications immutably.</p>
                </div>
                <Switch 
                  checked={autoAuditLogs} 
                  onCheckedChange={(checked) => {
                    setAutoAuditLogs(checked);
                    toast.success("Audit log policy updated.");
                  }}
                />
              </div>

              <div className="p-4 rounded-2xl bg-card/60 border border-border/70 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-blue-500" />
                    <h4 className="text-xs font-bold text-foreground">Enterprise REST & GraphQL API Key</h4>
                  </div>
                  <p className="text-[11px] font-mono text-muted-foreground">inj_live_9942a884f10c78b209e99a...</p>
                </div>
                <Button 
                  onClick={() => toast.success("New API Key generated and copied to clipboard!")}
                  variant="outline" 
                  size="sm" 
                  className="text-xs rounded-xl"
                >
                  Rotate Key
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Tab 3: RBAC Permissions */}
        <TabsContent value="rbac" className="space-y-6">
          <PermissionMatrix />
        </TabsContent>

        {/* Tab 4: Audit Trail */}
        <TabsContent value="audit" className="space-y-6">
          <AuditTable />
        </TabsContent>

        {/* Tab 5: Enterprise Tier & Billing */}
        <TabsContent value="billing" className="space-y-6">
          <div className="glass rounded-3xl p-5 sm:p-7 border border-border/80 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-gold-600 dark:text-gold-400 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/20">
                  Active Subscription Tier
                </span>
                <h3 className="text-2xl font-extrabold font-heading text-foreground mt-1">Scale Sovereign Enterprise</h3>
                <p className="text-xs text-muted-foreground">Unlimited team seats, all 12 core modules, and Google Gemini 1.5 Pro</p>
              </div>

              <div className="text-right">
                <div className="text-3xl font-extrabold gold-text font-heading">$1,299.00</div>
                <span className="text-xs text-muted-foreground font-semibold">Billed monthly • Next billing Oct 01</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border/50">
              <div className="p-4 rounded-2xl bg-card/60 border border-border space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">Seat Capacity</div>
                <div className="text-lg font-extrabold text-foreground font-heading">156 / Unlimited Seats</div>
              </div>
              <div className="p-4 rounded-2xl bg-card/60 border border-border space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">Neural Token Quota</div>
                <div className="text-lg font-extrabold gold-text font-heading">1,000,000 Tokens (100% Left)</div>
              </div>
              <div className="p-4 rounded-2xl bg-card/60 border border-border space-y-1">
                <div className="text-[10px] font-bold text-muted-foreground uppercase">SLA Uptime</div>
                <div className="text-lg font-extrabold text-emerald-500 font-heading">99.99% Guaranteed</div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
