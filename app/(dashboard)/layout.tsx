import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import MobileSidebar from "@/components/layout/MobileSidebar";
import { ThemeProvider } from "@/components/providers/theme-provider";
import CommandPalette from "@/components/ui/CommandPalette";
import AICopilotOverlay from "@/components/ui/AICopilotOverlay";

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
      <div className="flex h-screen overflow-hidden bg-background text-foreground relative">
        {/* Subtle Ambient Background Gradients */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 -right-32 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
        </div>

        <div className="hidden md:block relative z-20">
          <Sidebar />
        </div>
        
        <MobileSidebar />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
          <Header />
          
          <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 custom-scrollbar">
            {children}
          </main>

          <CommandPalette />
          <AICopilotOverlay />
        </div>
      </div>
    </ThemeProvider>
  );
}
