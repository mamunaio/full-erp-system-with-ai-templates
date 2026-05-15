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
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Administrator Name</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors">
               <User className="w-full h-full" />
            </div>
            <input
              {...register("name")}
              className={cn(
                "w-full bg-slate-900/50 dark:bg-slate-950/50 border border-white/5 rounded-2xl h-16 pl-14 pr-4 text-white font-bold placeholder:text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all",
                errors.name && "border-rose-500/50"
              )}
              placeholder="Full Name"
              disabled={isLoading}
            />
          </div>
          {errors.name && <p className="text-[10px] font-bold text-rose-500 mt-1 ml-1 uppercase">{errors.name.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Workspace Email</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors">
               <Mail className="w-full h-full" />
            </div>
            <input
              {...register("email")}
              className={cn(
                "w-full bg-slate-900/50 dark:bg-slate-950/50 border border-white/5 rounded-2xl h-16 pl-14 pr-4 text-white font-bold placeholder:text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all",
                errors.email && "border-rose-500/50"
              )}
              placeholder="name@company.com"
              type="email"
              disabled={isLoading}
            />
          </div>
          {errors.email && <p className="text-[10px] font-bold text-rose-500 mt-1 ml-1 uppercase">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Organization Identity</label>
        <div className="relative group">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors">
             <Building2 className="w-full h-full" />
          </div>
          <input
            {...register("companyName")}
            className={cn(
              "w-full bg-slate-900/50 dark:bg-slate-950/50 border border-white/5 rounded-2xl h-16 pl-14 pr-4 text-white font-bold placeholder:text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all",
              errors.companyName && "border-rose-500/50"
            )}
            placeholder="Enterprise Name"
            disabled={isLoading}
          />
        </div>
        {errors.companyName && <p className="text-[10px] font-bold text-rose-500 mt-1 ml-1 uppercase">{errors.companyName.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Access Key</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors">
               <Lock className="w-full h-full" />
            </div>
            <input
              {...register("password")}
              className={cn(
                "w-full bg-slate-900/50 dark:bg-slate-950/50 border border-white/5 rounded-2xl h-16 pl-14 pr-4 text-white font-bold placeholder:text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-mono",
                errors.password && "border-rose-500/50"
              )}
              placeholder="••••••••"
              type="password"
              disabled={isLoading}
            />
          </div>
          {errors.password && <p className="text-[10px] font-bold text-rose-500 mt-1 ml-1 uppercase">{errors.password.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirm Key</label>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-blue-500 transition-colors">
               <Lock className="w-full h-full" />
            </div>
            <input
              {...register("confirmPassword")}
              className={cn(
                "w-full bg-slate-900/50 dark:bg-slate-950/50 border border-white/5 rounded-2xl h-16 pl-14 pr-4 text-white font-bold placeholder:text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500/50 transition-all font-mono",
                errors.confirmPassword && "border-rose-500/50"
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
        className="w-full h-18 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black italic uppercase tracking-tighter text-xl transition-all shadow-2xl shadow-blue-600/30 active:scale-95 group overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 italic text-[10px] flex items-center justify-center pointer-events-none">INITIALIZING...</div>
        {isLoading ? (
          <Loader2 className="w-7 h-7 animate-spin" />
        ) : (
          <span className="flex items-center">
            INITIALIZE WORKSPACE <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
          </span>
        )}
      </Button>
    </form>
  );
}
