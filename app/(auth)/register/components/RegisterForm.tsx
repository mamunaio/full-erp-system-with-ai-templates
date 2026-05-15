"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Lock, User, Building, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { toast } from "sonner";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
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

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Registration failed");
      }

      toast.success("Registration successful! Please login.");
      router.push("/login");
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                {...register("name")}
                className={cn(
                  "w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-injaazh-500/50 transition-all",
                  errors.name && "border-destructive/50"
                )}
                placeholder="John Doe"
                disabled={isLoading}
              />
            </div>
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-200 ml-1">Company Name</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                {...register("companyName")}
                className={cn(
                  "w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-injaazh-500/50 transition-all",
                  errors.companyName && "border-destructive/50"
                )}
                placeholder="Injaazh Corp"
                disabled={isLoading}
              />
            </div>
            {errors.companyName && <p className="text-xs text-destructive mt-1">{errors.companyName.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200 ml-1">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              {...register("email")}
              className={cn(
                "w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-injaazh-500/50 transition-all",
                errors.email && "border-destructive/50"
              )}
              placeholder="name@company.com"
              type="email"
              disabled={isLoading}
            />
          </div>
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200 ml-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              {...register("password")}
              className={cn(
                "w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-injaazh-500/50 transition-all",
                errors.password && "border-destructive/50"
              )}
              placeholder="••••••••"
              type="password"
              disabled={isLoading}
            />
          </div>
          {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
        </div>

        <div className="pt-2">
          <p className="text-xs text-slate-400 text-center mb-4 px-4">
            By clicking Sign Up, you agree to our{" "}
            <Link href="#" className="text-injaazh-400 hover:underline">Terms of Service</Link> and{" "}
            <Link href="#" className="text-injaazh-400 hover:underline">Privacy Policy</Link>.
          </p>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-injaazh-600 hover:bg-injaazh-700 text-white py-6 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-injaazh-600/20 group"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Create Account
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
