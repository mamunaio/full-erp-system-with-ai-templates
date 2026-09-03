"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { 
  Loader2, Mail, Lock, User, Building2, ArrowRight, 
  Eye, EyeOff, Check, ShieldCheck, Briefcase
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(2, "Administrator name must be at least 2 characters"),
  email: z.string().email("Please enter a valid work email"),
  companyName: z.string().min(2, "Enterprise name must be at least 2 characters"),
  industry: z.string().default("technology"),
  password: z.string().min(8, "Security key must be at least 8 characters"),
  confirmPassword: z.string(),
  agreeTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the Enterprise Service Agreement",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Access keys do not match",
  path: ["confirmPassword"],
});

type RegisterValues = z.infer<typeof registerSchema>;

const industries = [
  { value: "technology", label: "Technology & SaaS" },
  { value: "manufacturing", label: "Manufacturing & Heavy Industry" },
  { value: "finance", label: "Financial Services & Fintech" },
  { value: "logistics", label: "Logistics & Supply Chain" },
  { value: "retail", label: "Omnichannel Retail & E-Commerce" },
  { value: "healthcare", label: "Healthcare & Pharmaceuticals" },
  { value: "conglomerate", label: "Holding Group & Conglomerate" },
];

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      industry: "technology",
      agreeTerms: true,
    },
  });

  const passwordValue = watch("password", "");

  const hasMinLength = passwordValue.length >= 8;
  const hasNumberOrSpecial = /[0-9!@#$%^&*]/.test(passwordValue);

  async function onSubmit(data: RegisterValues) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          companyName: data.companyName,
          password: data.password,
        }),
      });

      if (response.ok) {
        toast.success("Enterprise Workspace Initialized! Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 800);
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Registration failed. Please check details.");
      }
    } catch {
      toast.error("Network gateway error. Please verify connection and retry.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Admin Name & Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
            Executive Name
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold-500 transition-colors">
              <User className="w-full h-full" />
            </div>
            <input
              {...register("name")}
              className={cn(
                "w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-11 pr-3 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all",
                errors.name && "border-destructive/60 focus:border-destructive"
              )}
              placeholder="e.g. Sarah Jenkins"
              disabled={isLoading}
            />
          </div>
          {errors.name && <p className="text-[10px] font-bold text-destructive ml-1">{errors.name.message}</p>}
        </div>

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
                "w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-11 pr-3 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all",
                errors.email && "border-destructive/60 focus:border-destructive"
              )}
              placeholder="sarah@enterprise.com"
              type="email"
              disabled={isLoading}
            />
          </div>
          {errors.email && <p className="text-[10px] font-bold text-destructive ml-1">{errors.email.message}</p>}
        </div>
      </div>

      {/* Enterprise Company Name & Industry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
            Enterprise Name
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold-500 transition-colors">
              <Building2 className="w-full h-full" />
            </div>
            <input
              {...register("companyName")}
              className={cn(
                "w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-11 pr-3 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all",
                errors.companyName && "border-destructive/60 focus:border-destructive"
              )}
              placeholder="e.g. Apex Global Industries"
              disabled={isLoading}
            />
          </div>
          {errors.companyName && <p className="text-[10px] font-bold text-destructive ml-1">{errors.companyName.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
            Industry Sector
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold-500 transition-colors pointer-events-none">
              <Briefcase className="w-full h-full" />
            </div>
            <select
              {...register("industry")}
              disabled={isLoading}
              className="w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-11 pr-4 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all cursor-pointer appearance-none"
            >
              {industries.map((ind) => (
                <option key={ind.value} value={ind.value} className="bg-card text-foreground">
                  {ind.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Password & Confirm Password */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
            Access Key
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold-500 transition-colors">
              <Lock className="w-full h-full" />
            </div>
            <input
              {...register("password")}
              className={cn(
                "w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-11 pr-10 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all",
                errors.password && "border-destructive/60 focus:border-destructive"
              )}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
          {errors.password && <p className="text-[10px] font-bold text-destructive ml-1">{errors.password.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1">
            Confirm Key
          </label>
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-gold-500 transition-colors">
              <Lock className="w-full h-full" />
            </div>
            <input
              {...register("confirmPassword")}
              className={cn(
                "w-full bg-background/60 border border-border/80 rounded-2xl h-11 pl-11 pr-10 text-xs font-semibold text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/60 transition-all",
                errors.confirmPassword && "border-destructive/60 focus:border-destructive"
              )}
              placeholder="••••••••"
              type={showConfirmPassword ? "text" : "password"}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-[10px] font-bold text-destructive ml-1">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      {/* Dynamic Key Strength Indicators */}
      <div className="flex items-center gap-4 px-1 text-[10px] text-muted-foreground">
        <span className={cn("flex items-center gap-1 font-semibold", hasMinLength ? "text-emerald-500" : "text-muted-foreground")}>
          <Check className="w-3 h-3" /> Min. 8 characters
        </span>
        <span className={cn("flex items-center gap-1 font-semibold", hasNumberOrSpecial ? "text-emerald-500" : "text-muted-foreground")}>
          <Check className="w-3 h-3" /> Number or symbol
        </span>
      </div>

      {/* Terms and Privacy Agreement */}
      <div className="space-y-1 pt-1">
        <label className="flex items-start gap-2.5 ml-1 cursor-pointer select-none">
          <input
            type="checkbox"
            {...register("agreeTerms")}
            id="agreeTerms"
            className="w-4 h-4 rounded-md border-border bg-card text-gold-500 focus:ring-gold-500/40 accent-gold-500 cursor-pointer mt-0.5"
          />
          <span className="text-[11px] font-medium text-muted-foreground leading-snug">
            I agree to the Injaazh Sovereign Cloud <a href="#" className="text-gold-600 dark:text-gold-400 font-bold hover:underline">Service Level Agreement</a> and <a href="#" className="text-gold-600 dark:text-gold-400 font-bold hover:underline">Data Protection Policy</a>.
          </span>
        </label>
        {errors.agreeTerms && <p className="text-[10px] font-bold text-destructive ml-1">{errors.agreeTerms.message}</p>}
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
            <span>Provisioning Isolated Tenant Vault...</span>
          </div>
        ) : (
          <span className="flex items-center justify-center gap-2">
            Initialize Sovereign Workspace <ArrowRight className="w-4 h-4" />
          </span>
        )}
      </Button>
    </form>
  );
}
