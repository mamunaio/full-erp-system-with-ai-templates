import { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./components/LoginForm";

export const metadata: Metadata = {
  title: "Login | Injaazh ERP",
  description: "Login to your Injaazh ERP account",
};

export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-injaazh-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Injaazh<span className="text-injaazh-500">ERP</span>
          </h1>
          <p className="text-sm text-slate-400">
            Welcome back! Please enter your details.
          </p>
        </div>
        
        <LoginForm />

        <p className="mt-8 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="font-semibold text-injaazh-400 hover:text-injaazh-300">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
