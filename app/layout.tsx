import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/providers/session-provider";

import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "InjaazhERP | AI-Native Enterprise ERP",
  description: "Next-generation AI-native enterprise ERP system for universal industry.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.variable, playfair.variable, "font-sans min-h-screen bg-background antialiased")}>
        <AuthProvider>
          <TooltipProvider delayDuration={80}>
            {children}
            <Toaster position="top-center" richColors />
          </TooltipProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
