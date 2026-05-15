import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const GET = auth(async function GET(req) {
  try {
    if (!req.auth?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tenantId = (req.auth.user as any).tenantId;
    const userId = (req.auth.user as any).id;

    const notifications = await prisma.notification.findMany({
      where: {
        tenantId,
        OR: [
          { userId: null },
          { userId: userId }
        ]
      },
      orderBy: { createdAt: "desc" },
      take: 20
    });

    return NextResponse.json(notifications);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

export const PATCH = auth(async function PATCH(req) {
  try {
    if (!req.auth?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, isAll } = await req.json();
    const tenantId = (req.auth.user as any).tenantId;

    if (isAll) {
      await prisma.notification.updateMany({
        where: { tenantId, isRead: false },
        data: { isRead: true }
      });
    } else {
      await prisma.notification.update({
        where: { id },
        data: { isRead: true }
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
