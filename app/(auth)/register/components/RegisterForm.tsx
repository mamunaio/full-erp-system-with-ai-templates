"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Lock, User, Building2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterValues = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterValues) {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast.success("Workspace Initialized! Redirecting to login...");
        router.push("/login");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Registration failed.");
      }
    } catch (err) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider ml-1">Administrator Name</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-gold-400 transition-colors">
               <User className="w-full h-full" />
            </div>
            <input
              {...register("name")}
              className={cn(
                "w-full bg-card/50 border border-border/50 rounded-xl h-16 pl-14 pr-4 text-foreground font-medium placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50 transition-all",
                errors.name && "border-destructive/50"
              )}
              placeholder="Full Name"
              disabled={isLoading}
            />
          </div>
          {errors.name && <p className="text-[10px] font-medium text-destructive mt-1 ml-1 uppercase">{errors.name.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider ml-1">Workspace Email</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-gold-400 transition-colors">
               <Mail className="w-full h-full" />
            </div>
            <input
              {...register("email")}
              className={cn(
                "w-full bg-card/50 border border-border/50 rounded-xl h-16 pl-14 pr-4 text-foreground font-medium placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50 transition-all",
                errors.email && "border-destructive/50"
              )}
              placeholder="name@company.com"
              type="email"
              disabled={isLoading}
            />
          </div>
          {errors.email && <p className="text-[10px] font-medium text-destructive mt-1 ml-1 uppercase">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider ml-1">Organization Identity</label>
        <div className="relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-gold-400 transition-colors">
             <Building2 className="w-full h-full" />
          </div>
          <input
            {...register("companyName")}
            className={cn(
              "w-full bg-card/50 border border-border/50 rounded-xl h-16 pl-14 pr-4 text-foreground font-medium placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50 transition-all",
              errors.companyName && "border-destructive/50"
            )}
            placeholder="Enterprise Name"
            disabled={isLoading}
          />
        </div>
        {errors.companyName && <p className="text-[10px] font-bold text-rose-500 mt-1 ml-1 uppercase">{errors.companyName.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider ml-1">Access Key</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-gold-400 transition-colors">
               <Lock className="w-full h-full" />
            </div>
            <input
              {...register("password")}
              className={cn(
                "w-full bg-card/50 border border-border/50 rounded-xl h-16 pl-14 pr-4 text-foreground font-medium placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50 transition-all",
                errors.password && "border-destructive/50"
              )}
              placeholder="••••••••"
              type="password"
              disabled={isLoading}
            />
          </div>
          {errors.password && <p className="text-[10px] font-medium text-destructive mt-1 ml-1 uppercase">{errors.password.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider ml-1">Confirm Key</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-gold-400 transition-colors">
               <Lock className="w-full h-full" />
            </div>
            <input
              {...register("confirmPassword")}
              className={cn(
                "w-full bg-card/50 border border-border/50 rounded-xl h-16 pl-14 pr-4 text-foreground font-medium placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50 transition-all",
                errors.confirmPassword && "border-destructive/50"
              )}
              placeholder="••••••••"
              type="password"
              disabled={isLoading}
            />
          </div>
          {errors.confirmPassword && <p className="text-[10px] font-bold text-rose-500 mt-1 ml-1 uppercase">{errors.confirmPassword.message}</p>}
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-16 rounded-xl text-base font-semibold tracking-tight transition-all shadow-2xl shadow-gold-500/20 active:scale-[0.98] group overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 text-[10px] flex items-center justify-center pointer-events-none">INITIALIZING...</div>
        {isLoading ? (
          <Loader2 className="w-7 h-7 animate-spin" />
        ) : (
          <span className="flex items-center">
            Initialize Workspace <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </span>
        )}
      </Button>
    </form>
  );
}
