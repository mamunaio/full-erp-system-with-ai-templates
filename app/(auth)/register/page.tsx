import { Metadata } from "next";
import RegisterForm from "./components/RegisterForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Register | Injaazh ERP",
  description: "Create your Injaazh ERP account and setup your company",
};

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950 py-12">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-injaazh-600/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/20 blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-xl px-6">
        <div className="flex flex-col space-y-2 text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-white">
            Get Started with Injaazh<span className="text-injaazh-500">ERP</span>
          </h1>
          <p className="text-sm text-slate-400">
            Create your administrative account and setup your company profile.
          </p>
        </div>
        
        <RegisterForm />

        <p className="mt-8 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-injaazh-400 hover:text-injaazh-300">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
