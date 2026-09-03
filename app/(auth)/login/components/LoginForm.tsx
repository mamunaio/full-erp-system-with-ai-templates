"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { 
  Loader2, Mail, Lock, Eye, EyeOff, ArrowRight, 
  Crown, Landmark, HeartHandshake, Users, Sparkles,
  ShieldCheck, Chrome, Github
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid work email"),
  password: z.string().min(6, "Security key must be at least 6 characters"),
  remember: z.boolean().default(true),
});

type LoginValues = z.infer<typeof loginSchema>;

const demoPersonas = [
  {
    role: "Sovereign Admin",
    email: "admin@injaazh.com",
    password: "password123",
    icon: Crown,
    badge: "Full Access",
    color: "text-amber-500 bg-amber-500/10 border-amber-500/30",
  },
  {
    role: "Finance Director",
    email: "finance@injaazh.com",
    password: "password123",
    icon: Landmark,
    badge: "Treasury",
    color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
  },
  {
    role: "Sales Executive",
    email: "sales@injaazh.com",
    password: "password123",
    icon: HeartHandshake,
    badge: "CRM",
    color: "text-blue-500 bg-blue-500/10 border-blue-500/30",
  },
  {
    role: "HR & Talent Lead",
    email: "hr@injaazh.com",
    password: "password123",
    icon: Users,
    badge: "Workforce",
    color: "text-purple-500 bg-purple-500/10 border-purple-500/30",
  },
];

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [activePersona, setActivePersona] = useState<string | null>("admin@injaazh.com");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "admin@injaazh.com",
      password: "password123",
      remember: true,
    },
  });

  const handleSelectPersona = (persona: typeof demoPersonas[0]) => {
    setActivePersona(persona.email);
    setValue("email", persona.email, { shouldValidate: true });
    setValue("password", persona.password, { shouldValidate: true });
    toast.info(`Switched credentials to ${persona.role}`);
  };

  async function onSubmit(data: LoginValues) {
    setIsLoading(true);
    setError(null);

    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("AUTHENTICATION FAILED: INVALID CREDENTIALS");
        toast.error("Access Denied: Please check your work email and password.");
      } else {
        toast.success("Identity Verified. Accessing Enterprise Command Cockpit...");
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("SYSTEM ERROR: UNEXPECTED AUTHENTICATION FAILURE");
      toast.error("Security gateway communication error. Retrying...");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSSOLogin = (providerName: string) => {
    toast.info(`Connecting to ${providerName} Sovereign Single Sign-On gateway...`);
  };

  return (
    <div className="space-y-6">
      {/* 1-Click Demo Persona Fast Switchers */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-extrabold uppercase tracking-widest text-foreground/80 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-gold-500" />
            <span>1-Click Demo Personas</span>
          </label>
          <span className="text-[10px] text-muted-foreground font-semibold">Auto-fill Credentials</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {demoPersonas.map((persona) => {
            const isSelected = activePersona === persona.email;
            const Icon = persona.icon;
            return (
              <button
                key={persona.email}
                type="button"
                onClick={() => handleSelectPersona(persona)}
                className={cn(
                  "p-2.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex items-center justify-between group",
                  isSelected
                    ? "bg-gold-500/[0.12] border-gold-500/60 shadow-md shadow-gold-500/10 scale-[1.02]"
                    : "bg-card/60 hover:bg-card border-border/70 hover:border-gold-500/30"
                )}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className={cn("w-7 h-7 rounded-xl flex items-center justify-center shrink-0 border", persona.color)}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-foreground truncate group-hover:text-gold-500 transition-colors">
                      {persona.role}
                    </p>
                    <p className="text-[10px] text-muted-foreground truncate">{persona.email}</p>
                  </div>
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-gold-500 shrink-0 ml-1 shadow-sm shadow-gold-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="w-full border-t border-border/60" />
        <span className="bg-card px-3 text-[10px] font-extrabold uppercase tracking-widest text-muted-foreground shrink-0">
          Or Enter Credentials
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
          <div className="bg-destructive/10 border border-destructive/30 text-destructive text-xs font-bold p-3 rounded-2xl text-center animate-shake flex items-center justify-center gap-2">
            <ShieldCheck className="w-4 h-4 text-destructive" />
            <span>{error}</span>
          </div>
        )}

        {/* Email Field */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
            Work Email Gateway
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold-500 transition-colors">
              <Mail className="w-full h-full" />
            </div>
            <input
              {...register("email")}
              className={cn(
                "w-full bg-background/60 border border-border/80 rounded-2xl h-12 pl-11 pr-4 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all",
                errors.email && "border-destructive/60 focus:border-destructive"
              )}
              placeholder="operator@injaazh.com"
              type="email"
              disabled={isLoading}
            />
          </div>
          {errors.email && <p className="text-[10px] font-bold text-destructive ml-1">{errors.email.message}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between ml-1">
            <label className="text-xs font-bold text-foreground/90 uppercase tracking-wider">
              Encrypted Key
            </label>
            <button 
              type="button" 
              onClick={() => toast.info("Password reset instructions dispatched to your recovery channel.")}
              className="text-[10px] font-bold text-gold-600 dark:text-gold-400 hover:underline cursor-pointer"
            >
              Reset Key?
            </button>
          </div>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold-500 transition-colors">
              <Lock className="w-full h-full" />
            </div>
            <input
              {...register("password")}
              className={cn(
                "w-full bg-background/60 border border-border/80 rounded-2xl h-12 pl-11 pr-11 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all",
                errors.password && "border-destructive/60 focus:border-destructive"
              )}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-[10px] font-bold text-destructive ml-1">{errors.password.message}</p>}
        </div>

        {/* Remember Identity Checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 ml-1 cursor-pointer select-none">
            <input
              type="checkbox"
              {...register("remember")}
              id="remember"
              className="w-4 h-4 rounded-md border-border bg-card text-gold-500 focus:ring-gold-500/40 accent-gold-500 cursor-pointer"
            />
            <span className="text-xs font-medium text-muted-foreground">
              Keep identity session active for 30 days
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-13 rounded-2xl text-xs sm:text-sm font-extrabold tracking-wide transition-all shadow-xl shadow-gold-500/25 active:scale-[0.98] gold-gradient text-obsidian-950 hover:opacity-95 cursor-pointer mt-2"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Verifying Cryptographic Tokens...</span>
            </div>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Authorize Enterprise Access <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      {/* Enterprise Single Sign-On (SSO) Gateways */}
      <div className="space-y-3 pt-2">
        <div className="relative flex items-center justify-center">
          <div className="w-full border-t border-border/50" />
          <span className="bg-card px-3 text-[10px] font-bold uppercase tracking-widest text-muted-foreground shrink-0">
            Enterprise Single Sign-On
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => handleSSOLogin("Google Workspace")}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-background/60 hover:bg-accent border border-border/70 hover:border-gold-500/40 transition-all text-xs font-bold text-foreground cursor-pointer group shadow-sm"
          >
            <Chrome className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 transition-colors" />
            <span className="text-[11px]">Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSSOLogin("Microsoft Azure AD")}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-background/60 hover:bg-accent border border-border/70 hover:border-gold-500/40 transition-all text-xs font-bold text-foreground cursor-pointer group shadow-sm"
          >
            <div className="w-3.5 h-3.5 grid grid-cols-2 gap-0.5 shrink-0 opacity-70 group-hover:opacity-100">
              <div className="bg-red-500 rounded-[1px]" />
              <div className="bg-green-500 rounded-[1px]" />
              <div className="bg-blue-500 rounded-[1px]" />
              <div className="bg-amber-500 rounded-[1px]" />
            </div>
            <span className="text-[11px]">Azure AD</span>
          </button>

          <button
            type="button"
            onClick={() => handleSSOLogin("GitHub Enterprise")}
            className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-background/60 hover:bg-accent border border-border/70 hover:border-gold-500/40 transition-all text-xs font-bold text-foreground cursor-pointer group shadow-sm"
          >
            <Github className="w-4 h-4 text-muted-foreground group-hover:text-gold-500 transition-colors" />
            <span className="text-[11px]">GitHub</span>
          </button>
        </div>
      </div>
    </div>
  );
}
