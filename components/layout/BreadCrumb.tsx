"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

export default function BreadCrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter((item) => item !== "" && item !== "(dashboard)");

  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-500">
      <Link href="/dashboard" className="hover:text-injaazh-600 transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      {segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        const isLast = index === segments.length - 1;

        return (
          <div key={segment} className="flex items-center space-x-2 capitalize">
            <ChevronRight className="w-4 h-4 text-slate-300" />
            {isLast ? (
              <span className="font-semibold text-slate-900">{segment.replace(/-/g, " ")}</span>
            ) : (
              <Link href={href} className="hover:text-injaazh-600 transition-colors">
                {segment.replace(/-/g, " ")}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
