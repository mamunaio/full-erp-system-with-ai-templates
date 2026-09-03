"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { 
  Loader2, Mail, Lock, User, Building2, ArrowRight, 
  Eye, EyeOff, Check, Briefcase, ChevronDown,
  Laptop, Factory, Landmark, Truck, ShoppingCart, 
  Activity, Sparkles
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
  { value: "technology", label: "Technology & SaaS", icon: Laptop, badge: "Cloud Native" },
  { value: "manufacturing", label: "Manufacturing & Heavy Industry", icon: Factory, badge: "BOM & Plants" },
  { value: "finance", label: "Financial Services & Fintech", icon: Landmark, badge: "GAAP / IFRS" },
  { value: "logistics", label: "Logistics & Supply Chain", icon: Truck, badge: "Multi-Hub" },
  { value: "retail", label: "Omnichannel Retail & E-Commerce", icon: ShoppingCart, badge: "POS & Orders" },
  { value: "healthcare", label: "Healthcare & Pharmaceuticals", icon: Activity, badge: "HIPAA Vault" },
  { value: "conglomerate", label: "Holding Group & Conglomerate", icon: Building2, badge: "Multi-Entity" },
];

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isIndustryOpen, setIsIndustryOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      industry: "technology",
      agreeTerms: true,
    },
  });

  const selectedIndustryValue = watch("industry", "technology");
  const selectedIndustry = industries.find(ind => ind.value === selectedIndustryValue) || industries[0];
  const passwordValue = watch("password", "");

  const hasMinLength = passwordValue.length >= 8;
  const hasNumberOrSpecial = /[0-9!@#$%^&*]/.test(passwordValue);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsIndustryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectIndustry = (value: string) => {
    setValue("industry", value, { shouldValidate: true });
    setIsIndustryOpen(false);
  };

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

  const SelectedIcon = selectedIndustry.icon;

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

      {/* Enterprise Company Name & Custom Cyber-Luxe Industry Dropdown */}
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

        {/* CUSTOM CYBER-LUXE INDUSTRY DROPDOWN */}
        <div className="space-y-1.5 relative" ref={dropdownRef}>
          <label className="text-xs font-bold text-foreground/90 uppercase tracking-wider ml-1 flex items-center justify-between">
            <span>Industry Sector</span>
            <span className="text-[10px] text-gold-600 dark:text-gold-400 font-semibold">{selectedIndustry.badge}</span>
          </label>

          <button
            type="button"
            onClick={() => setIsIndustryOpen(!isIndustryOpen)}
            disabled={isLoading}
            className={cn(
              "w-full bg-background/60 border rounded-2xl h-11 px-3.5 text-xs font-semibold text-foreground transition-all flex items-center justify-between cursor-pointer group shadow-sm",
              isIndustryOpen 
                ? "border-gold-500/70 ring-2 ring-gold-500/20 bg-card" 
                : "border-border/80 hover:border-gold-500/50 hover:bg-card/80"
            )}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-6 h-6 rounded-lg bg-gold-500/10 text-gold-600 dark:text-gold-400 flex items-center justify-center shrink-0 border border-gold-500/20">
                <SelectedIcon className="w-3.5 h-3.5" />
              </div>
              <span className="truncate text-xs font-bold text-foreground font-heading">
                {selectedIndustry.label}
              </span>
            </div>

            <ChevronDown className={cn(
              "w-4 h-4 text-muted-foreground group-hover:text-gold-500 transition-transform duration-200 shrink-0 ml-2",
              isIndustryOpen && "rotate-180 text-gold-500"
            )} />
          </button>

          {/* Floating Cyber-Luxe Glass Menu */}
          {isIndustryOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 z-50 p-1.5 rounded-2xl bg-card/95 backdrop-blur-3xl border border-gold-500/30 shadow-2xl shadow-gold-500/10 space-y-1 animate-in fade-in zoom-in-95 duration-150 max-h-64 overflow-y-auto custom-scrollbar">
              {industries.map((ind) => {
                const isSelected = selectedIndustryValue === ind.value;
                const Icon = ind.icon;
                return (
                  <button
                    key={ind.value}
                    type="button"
                    onClick={() => handleSelectIndustry(ind.value)}
                    className={cn(
                      "w-full p-2 rounded-xl text-left transition-all duration-150 cursor-pointer flex items-center justify-between group",
                      isSelected 
                        ? "bg-gold-500/15 border border-gold-500/40 text-foreground font-bold" 
                        : "hover:bg-accent/80 text-muted-foreground hover:text-foreground border border-transparent"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className={cn(
                        "w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border transition-colors",
                        isSelected 
                          ? "bg-gold-500 text-obsidian-950 border-gold-500 font-bold" 
                          : "bg-card text-muted-foreground group-hover:text-gold-500 border-border/60"
                      )}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-xs block truncate font-medium group-hover:font-bold">
                          {ind.label}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded-md bg-card/60 border border-border/50 text-muted-foreground">
                        {ind.badge}
                      </span>
                      {isSelected && (
                        <Check className="w-3.5 h-3.5 text-gold-500" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}
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
