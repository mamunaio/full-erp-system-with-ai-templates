import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { recordAuditLog } from "@/lib/audit";

export async function GET(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenant = await prisma.tenant.findUnique({
      where: { id: session.user.tenantId }
    });

    return NextResponse.json(tenant);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const oldData = await prisma.tenant.findUnique({ where: { id: session.user.tenantId } });

    const tenant = await prisma.tenant.update({
      where: { id: session.user.tenantId },
      data: body
    });

    await recordAuditLog({
      tenantId: session.user.tenantId,
      userId: session.user.id,
      module: "SETTINGS",
      action: "UPDATE_COMPANY_PROFILE",
      oldValue: oldData,
      newValue: tenant
    });

    return NextResponse.json(tenant);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
