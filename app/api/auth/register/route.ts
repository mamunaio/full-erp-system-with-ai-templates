import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, companyName } = body;

    if (!name || !email || !password || !companyName) {
      return new NextResponse("Missing fields", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse("User already exists", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const slug = companyName.toLowerCase().replace(/[^a-z0-9]/g, "-");

    // Check if slug exists, if so append random string
    let finalSlug = slug;
    const existingTenant = await prisma.tenant.findUnique({
      where: { slug: finalSlug },
    });

    if (existingTenant) {
      finalSlug = `${slug}-${Math.random().toString(36).substring(2, 7)}`;
    }

    // Create Tenant and User in a transaction
    const result = await prisma.$transaction(async (tx) => {
      const tenant = await tx.tenant.create({
        data: {
          name: companyName,
          slug: finalSlug,
        },
      });

      const user = await tx.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          tenantId: tenant.id,
          role: "ADMIN",
        },
      });

      return { tenant, user };
    });

    return NextResponse.json({
      message: "User registered successfully",
      user: {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
      },
    });
  } catch (error: any) {
    console.error("[REGISTER_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
