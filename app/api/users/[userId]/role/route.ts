import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const session = await auth();
    const currentUserRole = (session?.user as any)?.role;
    const currentTenantId = (session?.user as any)?.tenantId;

    // 1. Authorization Check: Only ADMIN or OWNER can change roles
    if (!session || (currentUserRole !== "ADMIN" && currentUserRole !== "OWNER")) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { role } = await req.json();

    // 2. Validate Role
    const validRoles = ["USER", "ADMIN", "OWNER"];
    if (!validRoles.includes(role)) {
      return new NextResponse("Invalid Role", { status: 400 });
    }

    // 3. Ensure the target user belongs to the same tenant
    const targetUser = await prisma.user.findUnique({
      where: { id: params.userId },
      select: { tenantId: true }
    });

    if (!targetUser || targetUser.tenantId !== currentTenantId) {
      return new NextResponse("Forbidden: Target user not in your workspace", { status: 403 });
    }

    // 4. Update the role
    const updatedUser = await prisma.user.update({
      where: { id: params.userId },
      data: { role }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("[USER_ROLE_UPDATE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
