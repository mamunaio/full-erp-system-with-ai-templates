import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6), tenantSlug: z.string().optional() })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password, tenantSlug } = parsedCredentials.data;
          
          const user = await prisma.user.findFirst({
            where: { email },
            include: { 
              tenant: true,
            }
          });

          if (!user || !user.password) return null;

          // If tenantSlug is provided, verify it matches
          if (tenantSlug && user.tenant.slug !== tenantSlug) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            // Fetch roles and permissions
            const roleData = await prisma.role.findFirst({
              where: { tenantId: user.tenantId, name: user.role }
            });

            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
              tenantId: user.tenantId,
              tenantSlug: user.tenant.slug,
              permissions: (roleData?.permissions as any) || [],
            };
          }
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.tenantId = (user as any).tenantId;
        token.tenantSlug = (user as any).tenantSlug;
        token.permissions = (user as any).permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as any;
        session.user.tenantId = token.tenantId as string;
        session.user.tenantSlug = token.tenantSlug as string;
        session.user.permissions = token.permissions as any;
      }
      return session;
    },
  },
});
