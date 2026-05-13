import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-injaazh-50 to-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col gap-8">
        <h1 className="text-6xl font-extrabold tracking-tight text-injaazh-900 text-center">
          Injaazh ERP
        </h1>
        <p className="text-xl text-injaazh-700 text-center max-w-2xl">
          The next-generation AI-Native Enterprise ERP System. 
          Universal, Multi-tenant, and Scalable.
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button size="lg" className="bg-injaazh-600 hover:bg-injaazh-700">
              Get Started
            </Button>
          </Link>
          <Button size="lg" variant="outline">
            Documentation
          </Button>
        </div>
      </div>
    </main>
  );
}
