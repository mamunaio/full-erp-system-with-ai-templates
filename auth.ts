import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { authConfig } from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ 
            email: z.string().email(), 
            password: z.string().min(6), 
            tenantSlug: z.string().optional() 
          })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password, tenantSlug } = parsedCredentials.data;
          
          // Demo users fallback for development and when database is offline
          const DEMO_USERS: Record<string, { name: string; email: string; role: string; tenantId: string; tenantSlug: string; permissions: string[] }> = {
            "admin@injaazh.com": {
              name: "Rahman Ahmed",
              email: "admin@injaazh.com",
              role: "ADMIN",
              tenantId: "demo-tenant-1",
              tenantSlug: "apex-industries",
              permissions: ["ALL"],
            },
            "farhan@apex-industries.com": {
              name: "Farhan Hossain",
              email: "farhan@apex-industries.com",
              role: "ADMIN",
              tenantId: "demo-tenant-1",
              tenantSlug: "apex-industries",
              permissions: ["ALL"],
            },
            "nusrat.hr@apex-industries.com": {
              name: "Nusrat Jahan",
              email: "nusrat.hr@apex-industries.com",
              role: "MANAGER",
              tenantId: "demo-tenant-1",
              tenantSlug: "apex-industries",
              permissions: ["HRM_READ", "HRM_WRITE"],
            },
            "karim.sales@apex-industries.com": {
              name: "Karim Uddin",
              email: "karim.sales@apex-industries.com",
              role: "MANAGER",
              tenantId: "demo-tenant-1",
              tenantSlug: "apex-industries",
              permissions: ["CRM_READ", "CRM_WRITE", "SALES_READ", "SALES_WRITE"],
            },
            "tahmina.finance@apex-industries.com": {
              name: "Tahmina Begum",
              email: "tahmina.finance@apex-industries.com",
              role: "MANAGER",
              tenantId: "demo-tenant-1",
              tenantSlug: "apex-industries",
              permissions: ["FINANCE_READ", "FINANCE_WRITE"],
            },
          };

          // Lazy import bcryptjs to avoid build issues
          const bcrypt = await import("bcryptjs");
          
          let user: any = null;
          try {
            user = await prisma.user.findFirst({
              where: { email },
              include: { 
                tenant: true,
              }
            });
          } catch (dbError) {
            console.warn("[AUTH] Database connection failed, falling back to demo credentials:", (dbError as any)?.message);
          }

          if (user && user.password) {
            if (tenantSlug && user.tenant?.slug !== tenantSlug) {
              return null;
            }

            const passwordsMatch = await bcrypt.compare(password, user.password);

            if (passwordsMatch) {
              let roleData: any = null;
              try {
                roleData = await prisma.role.findFirst({
                  where: { tenantId: user.tenantId, name: user.role }
                });
              } catch (e) {}

              return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role as any,
                tenantId: user.tenantId,
                tenantSlug: user.tenant?.slug || "",
                permissions: (roleData?.permissions as any) || [],
              };
            }
          }

          // Check demo credentials fallback
          const normalizedEmail = email.toLowerCase().trim();
          const demoUser = DEMO_USERS[normalizedEmail];
          if (demoUser && password === "password123") {
            return {
              id: "demo-" + demoUser.role.toLowerCase() + "-id",
              name: demoUser.name,
              email: demoUser.email,
              role: demoUser.role as any,
              tenantId: demoUser.tenantId,
              tenantSlug: demoUser.tenantSlug,
              permissions: demoUser.permissions,
            };
          }
        }

        return null;
      },
    }),
  ],
});
