"use client";

import { useState, useEffect, useRef } from "react";
import { 
  Settings, 
  User, 
  ShieldCheck, 
  Globe, 
  Bell, 
  Palette, 
  CreditCard, 
  Zap,
  ArrowLeft,
  Camera,
  Mail,
  Lock,
  Smartphone,
  Check,
  ChevronRight,
  LogOut,
  Moon,
  Sun,
  Laptop,
  Key,
  ShieldAlert,
  QrCode,
  Languages,
  DollarSign,
  Clock,
  ExternalLink,
  Github,
  Chrome
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Modals state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  if (!mounted) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20">
      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleImageUpload} 
      />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <Link href="/dashboard" className="group flex items-center text-[10px] font-black text-slate-400 hover:text-blue-600 transition-all mb-4 bg-white dark:bg-slate-900 px-4 py-2 rounded-2xl w-fit shadow-sm border border-slate-100 dark:border-slate-800 uppercase tracking-[0.2em]">
            <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to App Dashboard
          </Link>
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shadow-inner">
              <Settings className="w-8 h-8 text-slate-400" />
            </div>
            <div>
               <h1 className="text-5xl font-black tracking-tighter text-slate-900 dark:text-white italic uppercase leading-none">
                 System <span className="text-blue-600">Settings</span>
               </h1>
               <p className="text-slate-500 text-sm font-medium mt-1">
                 Manage your enterprise profile, security, and preferences.
               </p>
            </div>
          </div>
        </div>
        <Button 
          onClick={() => toast.success("Settings saved successfully!")}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 px-10 font-black shadow-xl shadow-blue-600/20 active:scale-95 transition-all"
        >
          <Check className="w-5 h-5 mr-3" /> SAVE CHANGES
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Settings Sidebar */}
        <div className="lg:col-span-1 space-y-2">
           <SettingsNavItem icon={User} label="Profile" active={activeTab === "general"} onClick={() => setActiveTab("general")} />
           <SettingsNavItem icon={ShieldCheck} label="Security" active={activeTab === "security"} onClick={() => setActiveTab("security")} />
           <SettingsNavItem icon={Bell} label="Notifications" active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} />
           <SettingsNavItem icon={Globe} label="Region & Language" active={activeTab === "region"} onClick={() => setActiveTab("region")} />
           <SettingsNavItem icon={Palette} label="Appearance" active={activeTab === "appearance"} onClick={() => setActiveTab("appearance")} />
           <SettingsNavItem icon={Zap} label="Integrations" active={activeTab === "integrations"} onClick={() => setActiveTab("integrations")} />
           <div className="pt-8 mt-8 border-t border-slate-100 dark:border-slate-800">
              <button className="w-full flex items-center space-x-4 p-4 rounded-2xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-all font-black uppercase text-[10px] tracking-widest">
                 <LogOut className="w-5 h-5" />
                 <span>Logout Session</span>
              </button>
           </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3 space-y-10">
           {activeTab === "general" && (
             <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
                   <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase mb-8">Profile Information</h3>
                   <div className="flex flex-col md:flex-row items-center gap-10 mb-10">
                      <div className="relative group/avatar">
                         <div className="w-32 h-32 rounded-[40px] bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 overflow-hidden shadow-inner border-4 border-white dark:border-slate-900">
                            {profileImage ? (
                               <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                               <User className="w-16 h-16" />
                            )}
                         </div>
                         <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute -bottom-2 -right-2 w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-600/20 group-hover/avatar:scale-110 transition-transform"
                         >
                            <Camera className="w-5 h-5" />
                         </button>
                      </div>
                      <div className="flex-1 space-y-4">
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                               <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</Label>
                               <Input defaultValue="Md Mamun Hossain" className="h-14 rounded-2xl border-slate-100 dark:border-slate-800 focus:ring-blue-600 font-bold" />
                            </div>
                            <div className="space-y-2">
                               <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Professional Role</Label>
                               <Input defaultValue="Chief Executive Officer" className="h-14 rounded-2xl border-slate-100 dark:border-slate-800 focus:ring-blue-600 font-bold" />
                            </div>
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</Label>
                            <div className="relative">
                               <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                               <Input defaultValue="mamun@injaazh.com" className="h-14 pl-12 rounded-2xl border-slate-100 dark:border-slate-800 focus:ring-blue-600 font-bold" />
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
                   <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase mb-8">Company Details</h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                         <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Organization Name</Label>
                         <Input defaultValue="Injaazh Enterprises Ltd." className="h-14 rounded-2xl border-slate-100 dark:border-slate-800 focus:ring-blue-600 font-bold" />
                      </div>
                      <div className="space-y-2">
                         <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tax ID / VAT Number</Label>
                         <Input defaultValue="TR-98234-EX" className="h-14 rounded-2xl border-slate-100 dark:border-slate-800 focus:ring-blue-600 font-bold" />
                      </div>
                      <div className="md:col-span-2 space-y-2">
                         <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Business Address</Label>
                         <textarea className="w-full bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl p-6 text-sm font-bold focus:ring-4 focus:ring-blue-600/5 focus:border-blue-600/50 outline-none transition-all h-32 resize-none" defaultValue="Level 12, Financial District Tower, 1205 Dhaka, Bangladesh" />
                      </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === "security" && (
             <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
                   <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase mb-8">Access Control</h3>
                   <div className="space-y-8">
                      <SecurityActionItem 
                         icon={Lock} 
                         title="Change System Password" 
                         desc="Last updated 45 days ago. We recommend a change every 90 days." 
                         actionLabel="Update Password"
                         onClick={() => setIsPasswordModalOpen(true)}
                      />
                      <div className="h-px bg-slate-50 dark:bg-slate-800" />
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
                
                <div className="bg-rose-500/5 border border-rose-500/10 rounded-[40px] p-10">
                   <div className="flex items-start space-x-6">
                      <div className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center shadow-lg shadow-rose-500/20 shrink-0">
                         <ShieldAlert className="w-6 h-6 text-white" />
                      </div>
                      <div className="space-y-4">
                         <div>
                            <h4 className="text-xl font-black italic uppercase text-rose-600">Danger Zone</h4>
                            <p className="text-xs text-rose-500/70 font-medium leading-relaxed">Deactivating your account will permanently remove all associated data. This action cannot be undone.</p>
                         </div>
                         <Button variant="ghost" className="text-rose-600 font-black text-[10px] uppercase tracking-[0.2em] p-0 h-auto hover:bg-transparent">Deactivate Account Now →</Button>
                      </div>
                   </div>
                </div>
             </div>
           )}

           {activeTab === "notifications" && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                 <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
                    <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase mb-8">Notification Preferences</h3>
                    <div className="space-y-6">
                       <ToggleSetting title="Email Notifications" desc="Receive weekly reports and system alerts via email." active={true} />
                       <ToggleSetting title="WhatsApp Alerts" desc="Get real-time project updates directly on WhatsApp." active={false} />
                       <ToggleSetting title="In-App Notifications" desc="Show desktop notifications for mentions and tasks." active={true} />
                    </div>
                 </div>
              </div>
           )}

           {activeTab === "region" && (
              <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
                 <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
                    <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase mb-8">Localization</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center"><Languages className="w-3 h-3 mr-2" /> Primary Language</Label>
                          <select className="w-full h-14 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 font-bold outline-none">
                             <option>English (US)</option>
                             <option>Bengali (BD)</option>
                             <option>Arabic (UAE)</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center"><DollarSign className="w-3 h-3 mr-2" /> Default Currency</Label>
                          <select className="w-full h-14 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 font-bold outline-none">
                             <option>USD ($)</option>
                             <option>BDT (৳)</option>
                             <option>AED (د.إ)</option>
                          </select>
                       </div>
                       <div className="space-y-2">
                          <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 flex items-center"><Clock className="w-3 h-3 mr-2" /> Timezone</Label>
                          <select className="w-full h-14 bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 rounded-2xl px-5 font-bold outline-none">
                             <option>(GMT +06:00) Dhaka</option>
                             <option>(GMT -05:00) New York</option>
                             <option>(GMT +04:00) Dubai</option>
                          </select>
                       </div>
                    </div>
                 </div>
              </div>
           )}

           {activeTab === "appearance" && (
             <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
                   <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase mb-8">Visual Preferences</h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <AppearanceCard label="Light" icon={Sun} active={theme === "light"} onClick={() => setTheme("light")} />
                      <AppearanceCard label="Dark" icon={Moon} active={theme === "dark"} onClick={() => setTheme("dark")} />
                      <AppearanceCard label="System" icon={Laptop} active={theme === "system"} onClick={() => setTheme("system")} />
                   </div>
                </div>
             </div>
           )}

           {activeTab === "integrations" && (
             <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
                <div className="bg-white dark:bg-slate-900 rounded-[40px] border border-slate-200 dark:border-slate-800 p-10 shadow-sm">
                   <h3 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white italic uppercase mb-8">Cloud Integrations</h3>
                   <div className="space-y-6">
                      <IntegrationItem icon={Github} name="GitHub Console" status="Connected" desc="Automate project tracking via commit messages." />
                      <IntegrationItem icon={Smartphone} name="WhatsApp API" status="Disconnected" desc="Business communication & broadcast gateway." />
                      <IntegrationItem icon={Chrome} name="Chrome Extension" status="Active" desc="Capture leads directly from your browser." />
                   </div>
                </div>
             </div>
           )}
        </div>
      </div>

      {/* Password Update Modal */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl bg-white dark:bg-slate-950">
          <div className="bg-slate-950 p-10 text-white relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center space-x-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Key className="w-6 h-6" />
              </div>
              <h2 className="text-3xl font-black tracking-tight italic uppercase">Update Password</h2>
            </div>
            
            <div className="space-y-6 relative z-10">
               <div className="space-y-2">
                  <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Current Password</Label>
                  <Input type="password" placeholder="••••••••" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 text-white font-bold px-5" />
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">New Password</Label>
                     <Input type="password" placeholder="••••••••" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 text-white font-bold px-5" />
                  </div>
                  <div className="space-y-2">
                     <Label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Confirm New</Label>
                     <Input type="password" placeholder="••••••••" className="h-14 bg-white/5 border-white/10 rounded-2xl focus:ring-blue-600 text-white font-bold px-5" />
                  </div>
               </div>
               <Button 
                onClick={() => { toast.success("Password updated successfully."); setIsPasswordModalOpen(false); }}
                className="w-full h-16 rounded-[24px] bg-blue-600 hover:bg-blue-500 text-white font-black shadow-2xl shadow-blue-600/40 text-lg tracking-tight uppercase italic"
               >
                 VERIFY & UPDATE
               </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* 2FA Setup Modal */}
      <Dialog open={is2FAModalOpen} onOpenChange={setIs2FAModalOpen}>
        <DialogContent className="max-w-xl p-0 overflow-hidden border-none rounded-[40px] shadow-2xl bg-white dark:bg-slate-950">
          <div className="bg-slate-950 p-10 text-white relative text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="w-20 h-20 rounded-3xl bg-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-600/20 mx-auto mb-6">
              <QrCode className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-black tracking-tight italic uppercase mb-2">Enable 2FA Security</h2>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-10">Scan the QR code with your authenticator app</p>
            
            <div className="bg-white p-4 rounded-3xl w-fit mx-auto mb-10 shadow-2xl">
               <div className="w-48 h-48 bg-slate-900 rounded-2xl flex items-center justify-center">
                  {/* Simulated QR Code */}
                  <div className="grid grid-cols-4 gap-2">
                     {[...Array(16)].map((_, i) => (
                       <div key={i} className={cn("w-6 h-6 bg-white", Math.random() > 0.5 ? "opacity-100" : "opacity-20")} />
                     ))}
                  </div>
               </div>
            </div>

            <div className="space-y-6 max-w-sm mx-auto">
               <Input placeholder="Enter 6-digit code" className="h-16 bg-white/5 border-white/10 rounded-2xl text-center text-2xl font-black tracking-[0.5em] focus:ring-emerald-600 text-white" />
               <Button 
                onClick={() => { toast.success("2FA Enabled successfully."); setIs2FAModalOpen(false); }}
                className="w-full h-16 rounded-[24px] bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-2xl shadow-emerald-600/40 text-lg tracking-tight uppercase italic"
               >
                 ACTIVATE SECURITY
               </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function SettingsNavItem({ icon: Icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group",
        active ? "bg-slate-900 text-white shadow-xl dark:bg-white dark:text-slate-950" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
      )}
    >
      <div className="flex items-center space-x-4">
         <div className={cn(
           "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
           active ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:text-blue-600"
         )}>
            <Icon className="w-5 h-5" />
         </div>
         <span className="text-xs font-black uppercase tracking-widest">{label}</span>
      </div>
      <ChevronRight className={cn("w-4 h-4 opacity-0 transition-all", active && "opacity-50 translate-x-1")} />
    </button>
  );
}

function SecurityActionItem({ icon: Icon, title, desc, actionLabel, status, onClick }: any) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
       <div className="flex items-start space-x-6">
          <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
             <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
             <div className="flex items-center space-x-3 mb-1">
                <h4 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">{title}</h4>
                {status && <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-500 text-[8px] font-black uppercase tracking-widest border border-rose-100">{status}</span>}
             </div>
             <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-md">{desc}</p>
          </div>
       </div>
       <Button 
        onClick={onClick}
        variant="outline" 
        className="rounded-xl h-11 border-slate-100 dark:border-slate-800 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800"
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
        "p-8 rounded-[32px] border-2 flex flex-col items-center justify-center space-y-4 cursor-pointer transition-all duration-300 relative group",
        active ? "border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 shadow-xl" : "border-slate-50 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700"
      )}
    >
       <div className={cn(
         "w-14 h-14 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110",
         active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30" : "bg-slate-100 dark:bg-slate-800 text-slate-400"
       )}>
          <Icon className="w-7 h-7" />
       </div>
       <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
       {active && (
         <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-lg animate-in zoom-in duration-300">
           <Check className="w-3.5 h-3.5" />
         </div>
       )}
    </div>
  );
}

function ToggleSetting({ title, desc, active }: any) {
   return (
      <div className="flex items-center justify-between p-6 rounded-3xl bg-slate-50/50 dark:bg-slate-800/20 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all">
         <div className="space-y-1">
            <h4 className="font-black text-sm uppercase tracking-tight text-slate-900 dark:text-white">{title}</h4>
            <p className="text-xs text-slate-500 font-medium">{desc}</p>
         </div>
         <Switch checked={active} className="data-[state=checked]:bg-blue-600" />
      </div>
   );
}

function IntegrationItem({ icon: Icon, name, status, desc }: any) {
   return (
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 rounded-[32px] bg-white dark:bg-slate-900 border border-slate-50 dark:border-slate-800 hover:shadow-xl transition-all group">
         <div className="flex items-start space-x-6">
            <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
               <Icon className="w-7 h-7" />
            </div>
            <div>
               <div className="flex items-center space-x-3 mb-1">
                  <h4 className="font-black text-lg text-slate-900 dark:text-white tracking-tight">{name}</h4>
                  <span className={cn(
                     "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border",
                     status === "Connected" || status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-50 text-slate-400 border-slate-200"
                  )}>{status}</span>
               </div>
               <p className="text-xs text-slate-500 font-medium">{desc}</p>
            </div>
         </div>
         <Button variant="ghost" size="icon" className="rounded-full text-slate-300 hover:text-blue-600"><ExternalLink className="w-5 h-5" /></Button>
      </div>
   );
}
