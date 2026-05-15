import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const GET = auth(async function GET(req) {
  try {
    if (!req.auth?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tenantId = (req.auth.user as any).tenantId;

    // Seed Departments
    const depts = ["IT", "HR", "Sales", "Marketing", "Finance", "Operations"];
    for (const name of depts) {
      await prisma.department.upsert({
        where: { tenantId_name: { tenantId, name } },
        update: {},
        create: { tenantId, name }
      });
    }

    const itDept = await prisma.department.findFirst({ where: { tenantId, name: "IT" } });
    const hrDept = await prisma.department.findFirst({ where: { tenantId, name: "HR" } });

    // Seed Designations
    const desigs = [
      { name: "Software Engineer", deptId: itDept?.id },
      { name: "HR Manager", deptId: hrDept?.id },
      { name: "CEO", deptId: null }
    ];

    for (const d of desigs) {
      await prisma.designation.upsert({
        where: { tenantId_name: { tenantId, name: d.name } },
        update: {},
        create: { tenantId, name: d.name, departmentId: d.deptId }
      });
    }

    return NextResponse.json({ success: true, message: "Basic HRM data seeded" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
