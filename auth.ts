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
          
          // Lazy import bcryptjs to avoid build issues
          const bcrypt = await import("bcryptjs");
          
          const user = await prisma.user.findFirst({
            where: { email },
            include: { 
              tenant: true,
            }
          });

          if (!user || !user.password) return null;

          if (tenantSlug && user.tenant?.slug !== tenantSlug) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            const roleData = await prisma.role.findFirst({
              where: { tenantId: user.tenantId, name: user.role }
            });

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

        return null;
      },
    }),
  ],
});
