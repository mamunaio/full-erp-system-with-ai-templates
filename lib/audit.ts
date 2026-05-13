import prisma from "@/lib/prisma";

export async function recordAuditLog({
  tenantId,
  userId,
  module,
  action,
  entityId,
  oldValue,
  newValue,
  ipAddress
}: {
  tenantId: string;
  userId: string;
  module: string;
  action: string;
  entityId?: string;
  oldValue?: any;
  newValue?: any;
  ipAddress?: string;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        module,
        action,
        entityId,
        oldValue,
        newValue,
        ipAddress
      }
    });
  } catch (error) {
    console.error("Audit Log Error:", error);
  }
}
