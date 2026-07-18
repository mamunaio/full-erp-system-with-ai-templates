"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

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
        setError("AUTHENTICATION FAILED: INVALID CREDENTIALS");
        toast.error("Access Denied: Please check your credentials.");
      } else {
        toast.success("Identity Verified. Accessing Command Center...");
        router.push("/dashboard");
      }
    } catch (err) {
      setError("SYSTEM ERROR: UNEXPECTED AUTHENTICATION FAILURE");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive text-[10px] font-semibold uppercase tracking-wider p-4 rounded-xl text-center animate-shake">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <div className="space-y-3">
          <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider ml-1">Secure Email Gateway</label>
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
              placeholder="operator@injaazh.com"
              type="email"
              disabled={isLoading}
            />
          </div>
          {errors.email && <p className="text-[10px] font-medium text-destructive mt-1 ml-1 uppercase">{errors.email.message}</p>}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between ml-1">
            <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Encrypted Password</label>
            <a href="#" className="text-[9px] font-medium text-gold-500 hover:text-gold-400 transition-colors uppercase tracking-wider">
              Reset Key
            </a>
          </div>
          <div className="relative group">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-gold-400 transition-colors">
               <Lock className="w-full h-full" />
            </div>
            <input
              {...register("password")}
              className={cn(
                "w-full bg-card/50 border border-border/50 rounded-xl h-16 pl-14 pr-14 text-foreground font-medium placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-gold-500/20 focus:border-gold-500/50 transition-all",
                errors.password && "border-destructive/50"
              )}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-[10px] font-medium text-destructive mt-1 ml-1 uppercase">{errors.password.message}</p>}
        </div>
      </div>

      <div className="flex items-center gap-3 ml-1">
        <input
          type="checkbox"
          {...register("remember")}
          id="remember"
          className="w-5 h-5 rounded-lg border-border bg-card/50 text-gold-500 focus:ring-gold-500/50"
        />
        <label htmlFor="remember" className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider cursor-pointer select-none">
          Remember Identity
        </label>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-16 rounded-xl text-base font-semibold tracking-tight transition-all shadow-2xl shadow-gold-500/20 active:scale-[0.98] group overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 text-[10px] flex items-center justify-center pointer-events-none">VERIFYING...</div>
        {isLoading ? (
          <Loader2 className="w-7 h-7 animate-spin" />
        ) : (
          <span className="flex items-center">
            Authorize Access <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </span>
        )}
      </Button>
    </form>
  );
}
