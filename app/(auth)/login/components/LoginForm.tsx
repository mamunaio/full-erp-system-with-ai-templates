"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  remember: z.boolean().default(false),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

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
        setError("Invalid email or password");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg text-center">
            {error}
          </div>
        )}

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
          <div className="flex items-center justify-between ml-1">
            <label className="text-sm font-medium text-slate-200">Password</label>
            <a href="#" className="text-xs font-semibold text-injaazh-400 hover:text-injaazh-300">
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              {...register("password")}
              className={cn(
                "w-full bg-slate-900/50 border border-slate-800 rounded-xl py-2.5 pl-10 pr-12 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-injaazh-500/50 transition-all",
                errors.password && "border-destructive/50"
              )}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
        </div>

        <div className="flex items-center space-x-2 ml-1">
          <input
            type="checkbox"
            {...register("remember")}
            id="remember"
            className="w-4 h-4 rounded border-slate-800 bg-slate-900 text-injaazh-600 focus:ring-injaazh-500/50"
          />
          <label htmlFor="remember" className="text-sm text-slate-400 cursor-pointer">
            Remember me
          </label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-injaazh-600 hover:bg-injaazh-700 text-white py-6 rounded-xl font-semibold text-lg transition-all shadow-lg shadow-injaazh-600/20"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
