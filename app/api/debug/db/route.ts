import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    const tenants = await prisma.tenant.findMany();
    const users = await prisma.user.findMany({ include: { tenant: true } });
    return NextResponse.json({ tenants, users });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};
