"use client";

import { useUIStore } from "@/store/ui.store";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function MobileSidebar() {
  const { isMobileSidebarOpen, setMobileSidebarOpen } = useUIStore();
  const pathname = usePathname();

  // Close sidebar when navigating
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [pathname, setMobileSidebarOpen]);

  return (
    <Sheet open={isMobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
      <SheetContent side="left" className="p-0 w-72 bg-slate-950 border-none">
        <div className="h-full">
          {/* We reuse the Sidebar but override some styles if needed */}
          <Sidebar />
        </div>
      </SheetContent>
    </Sheet>
  );
}
