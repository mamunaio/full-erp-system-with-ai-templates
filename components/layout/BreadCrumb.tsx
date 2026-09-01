"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function BreadCrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "" && item !== "(dashboard)");

  return (
    <nav className="flex items-center space-x-1.5 text-xs text-muted-foreground font-medium">
      <Link href="/dashboard" className="p-1 rounded-md hover:text-gold-500 hover:bg-accent transition-all">
        <Home className="w-3.5 h-3.5" />
      </Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;

        return (
          <div key={segment} className="flex items-center space-x-1.5 capitalize">
            <ChevronRight className="w-3 h-3 text-muted-foreground/40" />
            {isLast ? (
              <span className="font-bold text-foreground bg-accent/60 px-2 py-0.5 rounded-md border border-border/40">
                {segment.replace(/-/g, " ")}
              </span>
            ) : (
              <Link href={href} className="hover:text-gold-500 transition-colors">
                {segment.replace(/-/g, " ")}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
