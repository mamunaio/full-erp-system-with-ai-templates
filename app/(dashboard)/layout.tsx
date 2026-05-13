import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileSidebar from "@/components/layout/MobileSidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-slate-950">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        
        <MobileSidebar />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
          <Header />
          
          <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 custom-scrollbar">
            {children}
          </main>

          {/* AI Search Overlay / Shortcut Info could go here */}
        </div>
      </div>
    </ThemeProvider>
  );
}
