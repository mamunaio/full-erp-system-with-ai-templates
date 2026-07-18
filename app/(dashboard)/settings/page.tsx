"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Settings, User, ShieldCheck, Globe, Bell, Palette, CreditCard, Zap,
  Camera, Mail, Lock, Smartphone, Check, ChevronRight, LogOut,
  Moon, Sun, Laptop, Key, ShieldAlert, QrCode, Languages, DollarSign,
  Clock, ExternalLink, Github, Chrome, Sparkles, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const stagger = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const fadeUp = { hidden: { opacity: 0, y: 24, scale: 0.97 }, show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };
const slideIn = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0, transition: { duration: 0.3 } } };

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("general");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast.success("Profile image preview updated!");
      };
      reader.readAsDataURL(file);
    }
  };

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
          <span className="text-sm text-muted-foreground font-medium">Loading Settings...</span>
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
                <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">Settings Online</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center">
                  <Settings className="w-7 h-7 text-gold-400" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight font-heading">
                    System <span className="text-gold-400">Settings</span>
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    Manage your enterprise profile, security, and preferences.
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={() => toast.success("Settings saved successfully!")}
              className="bg-gold-500 hover:bg-gold-600 text-obsidian-900 rounded-[20px] h-14 px-10 shadow-lg shadow-gold-500/20 font-bold uppercase tracking-tight transition-all active:scale-95"
            >
              <Check className="w-5 h-5 mr-3" /> SAVE CHANGES
            </Button>
          </div>
        </div>
      </motion.div>

      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />

      <motion.div variants={fadeUp}>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Settings Sidebar */}
          <div className="lg:col-span-1 space-y-1">
            <SettingsNavItem icon={User} label="Profile" active={activeTab === "general"} onClick={() => setActiveTab("general")} />
            <SettingsNavItem icon={ShieldCheck} label="Security" active={activeTab === "security"} onClick={() => setActiveTab("security")} />
            <SettingsNavItem icon={Bell} label="Notifications" active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} />
            <SettingsNavItem icon={Globe} label="Region & Language" active={activeTab === "region"} onClick={() => setActiveTab("region")} />
            <SettingsNavItem icon={Palette} label="Appearance" active={activeTab === "appearance"} onClick={() => setActiveTab("appearance")} />
            <SettingsNavItem icon={Zap} label="Integrations" active={activeTab === "integrations"} onClick={() => setActiveTab("integrations")} />
            <div className="pt-6 mt-6 border-t border-border">
              <button className="w-full flex items-center space-x-4 p-4 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-all font-bold uppercase text-[10px] tracking-widest">
                <LogOut className="w-5 h-5" />
                <span>Logout Session</span>
              </button>
            </div>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3 space-y-6">
            {activeTab === "general" && (
              <motion.div variants={slideIn} initial="hidden" animate="show" className="space-y-6">
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 md:p-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />
                  <h3 className="text-lg font-bold text-card-foreground font-heading mb-6">Profile Information</h3>
                  <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                    <div className="relative group/avatar">
                      <div className="w-28 h-28 rounded-[32px] bg-gold-500/10 flex items-center justify-center overflow-hidden border-4 border-border">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User className="w-14 h-14 text-gold-400" />
                        )}
                      </div>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-gold-500 text-obsidian-900 flex items-center justify-center shadow-xl shadow-gold-500/20 group-hover/avatar:scale-110 transition-transform"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Full Name</Label>
                          <Input defaultValue="Md Mamun Hossain" className="h-12 rounded-xl border-border focus:ring-gold-500 font-bold" />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Professional Role</Label>
                          <Input defaultValue="Chief Executive Officer" className="h-12 rounded-xl border-border focus:ring-gold-500 font-bold" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input defaultValue="mamun@injaazh.com" className="h-12 pl-10 rounded-xl border-border focus:ring-gold-500 font-bold" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 md:p-8">
                  <h3 className="text-lg font-bold text-card-foreground font-heading mb-6">Company Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Organization Name</Label>
                      <Input defaultValue="Injaazh Enterprises Ltd." className="h-12 rounded-xl border-border focus:ring-gold-500 font-bold" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Tax ID / VAT Number</Label>
                      <Input defaultValue="TR-98234-EX" className="h-12 rounded-xl border-border focus:ring-gold-500 font-bold" />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Business Address</Label>
                      <textarea className="w-full bg-card/40 border border-border rounded-xl p-4 text-sm font-bold focus:ring-4 focus:ring-gold-500/5 focus:border-gold-500/50 outline-none transition-all h-24 resize-none" defaultValue="Level 12, Financial District Tower, 1205 Dhaka, Bangladesh" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "security" && (
              <motion.div variants={slideIn} initial="hidden" animate="show" className="space-y-6">
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 md:p-8">
                  <h3 className="text-lg font-bold text-card-foreground font-heading mb-6">Access Control</h3>
                  <div className="space-y-6">
                    <SecurityActionItem
                      icon={Lock}
                      title="Change System Password"
                      desc="Last updated 45 days ago. We recommend a change every 90 days."
                      actionLabel="Update Password"
                      onClick={() => setIsPasswordModalOpen(true)}
                    />
                    <div className="h-px bg-border" />
                    <SecurityActionItem
                      icon={Smartphone}
                      title="Two-Factor Authentication (2FA)"
                      desc="Add an extra layer of security to your account using TOTP."
                      actionLabel="Enable 2FA"
                      status="Not Enabled"
                      onClick={() => setIs2FAModalOpen(true)}
                    />
                  </div>
                </div>

                <div className="bg-rose-500/5 border border-rose-500/10 rounded-2xl p-6 md:p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/20 shrink-0">
                      <ShieldAlert className="w-6 h-6 text-white" />
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-lg font-bold text-rose-400">Danger Zone</h4>
                        <p className="text-xs text-rose-500/70 font-medium leading-relaxed">Deactivating your account will permanently remove all associated data. This action cannot be undone.</p>
                      </div>
                      <Button variant="ghost" className="text-rose-400 font-bold text-[10px] uppercase tracking-[0.2em] p-0 h-auto hover:bg-transparent">Deactivate Account Now →</Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div variants={slideIn} initial="hidden" animate="show" className="space-y-6">
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 md:p-8">
                  <h3 className="text-lg font-bold text-card-foreground font-heading mb-6">Notification Preferences</h3>
                  <div className="space-y-4">
                    <ToggleSetting title="Email Notifications" desc="Receive weekly reports and system alerts via email." active={true} />
                    <ToggleSetting title="WhatsApp Alerts" desc="Get real-time project updates directly on WhatsApp." active={false} />
                    <ToggleSetting title="In-App Notifications" desc="Show desktop notifications for mentions and tasks." active={true} />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "region" && (
              <motion.div variants={slideIn} initial="hidden" animate="show" className="space-y-6">
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 md:p-8">
                  <h3 className="text-lg font-bold text-card-foreground font-heading mb-6">Localization</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 flex items-center"><Languages className="w-3 h-3 mr-2" /> Primary Language</Label>
                      <select className="w-full h-12 bg-card/40 border border-border rounded-xl px-4 font-bold outline-none">
                        <option>English (US)</option>
                        <option>Bengali (BD)</option>
                        <option>Arabic (UAE)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 flex items-center"><DollarSign className="w-3 h-3 mr-2" /> Default Currency</Label>
                      <select className="w-full h-12 bg-card/40 border border-border rounded-xl px-4 font-bold outline-none">
                        <option>USD ($)</option>
                        <option>BDT (৳)</option>
                        <option>AED (د.إ)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1 flex items-center"><Clock className="w-3 h-3 mr-2" /> Timezone</Label>
                      <select className="w-full h-12 bg-card/40 border border-border rounded-xl px-4 font-bold outline-none">
                        <option>(GMT +06:00) Dhaka</option>
                        <option>(GMT -05:00) New York</option>
                        <option>(GMT +04:00) Dubai</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "appearance" && (
              <motion.div variants={slideIn} initial="hidden" animate="show" className="space-y-6">
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 md:p-8">
                  <h3 className="text-lg font-bold text-card-foreground font-heading mb-6">Visual Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <AppearanceCard label="Light" icon={Sun} active={theme === "light"} onClick={() => setTheme("light")} />
                    <AppearanceCard label="Dark" icon={Moon} active={theme === "dark"} onClick={() => setTheme("dark")} />
                    <AppearanceCard label="System" icon={Laptop} active={theme === "system"} onClick={() => setTheme("system")} />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "integrations" && (
              <motion.div variants={slideIn} initial="hidden" animate="show" className="space-y-6">
                <div className="bg-card/60 backdrop-blur-xl rounded-2xl border border-border p-6 md:p-8">
                  <h3 className="text-lg font-bold text-card-foreground font-heading mb-6">Cloud Integrations</h3>
                  <div className="space-y-4">
                    <IntegrationItem icon={Github} name="GitHub Console" status="Connected" desc="Automate project tracking via commit messages." />
                    <IntegrationItem icon={Smartphone} name="WhatsApp API" status="Disconnected" desc="Business communication & broadcast gateway." />
                    <IntegrationItem icon={Chrome} name="Chrome Extension" status="Active" desc="Capture leads directly from your browser." />
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Password Update Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl">
          <div className="bg-obsidian-900 p-10 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center space-x-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center shadow-lg shadow-gold-500/20">
                <Key className="w-6 h-6 text-obsidian-900" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Update Password</h2>
            </div>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Current Password</Label>
                <Input type="password" placeholder="••••••••" className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-gold-500 text-white font-bold px-4" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">New Password</Label>
                  <Input type="password" placeholder="••••••••" className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-gold-500 text-white font-bold px-4" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest ml-1">Confirm New</Label>
                  <Input type="password" placeholder="••••••••" className="h-12 bg-white/5 border-white/10 rounded-xl focus:ring-gold-500 text-white font-bold px-4" />
                </div>
              </div>
              <Button
                onClick={() => { toast.success("Password updated successfully."); setIsPasswordModalOpen(false); }}
                className="w-full h-14 rounded-[24px] bg-gold-500 hover:bg-gold-600 text-obsidian-900 font-bold shadow-2xl shadow-gold-500/40 text-lg tracking-tight transition-all"
              >
                VERIFY & UPDATE
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 2FA Setup Modal */}
      <Dialog open={is2FAModalOpen} onOpenChange={setIs2FAModalOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl">
          <div className="bg-obsidian-900 p-10 text-white relative text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="w-20 h-20 rounded-3xl bg-gold-500 flex items-center justify-center shadow-lg shadow-gold-500/20 mx-auto mb-6">
              <QrCode className="w-10 h-10 text-obsidian-900" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Enable 2FA Security</h2>
            <p className="text-muted-foreground text-xs font-bold uppercase tracking-widest mb-8">Scan the QR code with your authenticator app</p>

            <div className="bg-white p-4 rounded-3xl w-fit mx-auto mb-8 shadow-2xl">
              <div className="w-48 h-48 bg-obsidian-900 rounded-2xl flex items-center justify-center">
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className={cn("w-6 h-6 bg-white", Math.random() > 0.5 ? "opacity-100" : "opacity-20")} />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-6 max-w-sm mx-auto">
              <Input placeholder="Enter 6-digit code" className="h-14 bg-white/5 border-white/10 rounded-2xl text-center text-2xl font-bold tracking-[0.5em] focus:ring-gold-500 text-white" />
              <Button
                onClick={() => { toast.success("2FA Enabled successfully."); setIs2FAModalOpen(false); }}
                className="w-full h-14 rounded-[24px] bg-gold-500 hover:bg-gold-600 text-obsidian-900 font-bold shadow-2xl shadow-gold-500/40 text-lg tracking-tight transition-all"
              >
                ACTIVATE SECURITY
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}

function SettingsNavItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group",
        active ? "bg-gold-500 text-obsidian-900 shadow-xl" : "text-muted-foreground hover:bg-gold-500/5"
      )}
    >
      <div className="flex items-center space-x-4">
        <div className={cn(
          "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
          active ? "bg-obsidian-900 text-gold-500" : "bg-gold-500/10 text-gold-400 group-hover:text-gold-500"
        )}>
          <Icon className="w-5 h-5" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest">{label}</span>
      </div>
      <ChevronRight className={cn("w-4 h-4 transition-all", active && "opacity-50 translate-x-1")} />
    </button>
  );
}

function SecurityActionItem({ icon: Icon, title, desc, actionLabel, status, onClick }: any) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-gold-400" />
        </div>
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h4 className="font-bold text-card-foreground tracking-tight">{title}</h4>
            {status && <span className="px-2 py-0.5 rounded-full bg-rose-500/15 text-rose-400 text-[8px] font-bold uppercase tracking-widest border border-rose-500/20">{status}</span>}
          </div>
          <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-md">{desc}</p>
        </div>
      </div>
      <Button
        onClick={onClick}
        variant="outline"
        className="rounded-xl h-10 border-border font-bold text-xs uppercase tracking-widest hover:bg-gold-500/5"
      >
        {actionLabel}
      </Button>
    </div>
  );
}

function AppearanceCard({ label, icon: Icon, active, onClick }: any) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "p-6 rounded-2xl border-2 flex flex-col items-center justify-center space-y-3 cursor-pointer transition-all duration-300 relative group",
        active ? "border-gold-500 bg-gold-500/5 shadow-xl" : "border-border hover:border-gold-500/20"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110",
        active ? "bg-gold-500 text-obsidian-900 shadow-lg shadow-gold-500/30" : "bg-gold-500/10 text-gold-400"
      )}>
        <Icon className="w-6 h-6" />
      </div>
      <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{label}</span>
      {active && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-gold-500 flex items-center justify-center text-obsidian-900 shadow-lg">
          <Check className="w-3 h-3" />
        </div>
      )}
    </div>
  );
}

function ToggleSetting({ title, desc, active }: any) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl bg-gold-500/5 border border-transparent hover:border-gold-500/20 transition-all">
      <div className="space-y-1">
        <h4 className="font-bold text-sm uppercase tracking-tight text-card-foreground">{title}</h4>
        <p className="text-xs text-muted-foreground font-medium">{desc}</p>
      </div>
      <Switch checked={active} className="data-[state=checked]:bg-gold-500" />
    </div>
  );
}

function IntegrationItem({ icon: Icon, name, status, desc }: any) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl bg-gold-500/5 border border-transparent hover:border-gold-500/20 transition-all group">
      <div className="flex items-start space-x-4">
        <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center shrink-0 group-hover:bg-gold-500/20 transition-all">
          <Icon className="w-6 h-6 text-gold-400" />
        </div>
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <h4 className="font-bold text-card-foreground tracking-tight">{name}</h4>
            <span className={cn(
              "px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-widest border",
              status === "Connected" || status === "Active" ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" : "text-muted-foreground border-border"
            )}>{status}</span>
          </div>
          <p className="text-xs text-muted-foreground font-medium">{desc}</p>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-gold-400"><ExternalLink className="w-5 h-5" /></Button>
    </div>
  );
}
