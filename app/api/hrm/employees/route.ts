import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export const GET = auth(async function GET(req) {
  try {
    if (!req.auth?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tenantId = (req.auth.user as any).tenantId;

    const employees = await prisma.employee.findMany({
      where: { tenantId },
      include: {
        department: { select: { name: true } },
        designation: { select: { name: true } }
      },
      orderBy: { createdAt: "desc" }
    });

    return NextResponse.json(employees);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tenantId = (req.auth.user as any).tenantId;
    const data = await req.json();
    console.log("Creating employee with data:", JSON.stringify(data, null, 2));

    const employee = await prisma.employee.create({
      data: {
        tenantId,
        employeeId: data.employeeId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        dob: data.dob ? new Date(data.dob) : null,
        gender: data.gender,
        joiningDate: new Date(data.joiningDate),
        employmentType: data.employmentType,
        salary: data.basicSalary,
        status: "ACTIVE",
        role: data.role || "USER",
        departmentId: (data.departmentId && data.departmentId.length === 24) ? data.departmentId : undefined,
        designationId: (data.designationId && data.designationId.length === 24) ? data.designationId : undefined,
      }
    });

    console.log("Employee created:", employee.id);

    // Handle Payroll Setup (simplified)
    try {
      await prisma.payroll.create({
        data: {
          employeeId: employee.id,
          basic: data.basicSalary,
          allowances: data.houseAllowance + data.medicalAllowance + data.transportAllowance,
          deductions: 0,
          netPay: data.basicSalary + data.houseAllowance + data.medicalAllowance + data.transportAllowance,
          month: new Date().getMonth() + 1,
          year: new Date().getFullYear(),
          status: "DRAFT"
        }
      });
      console.log("Payroll created for employee");
    } catch (payrollError: any) {
      console.error("Payroll creation failed but employee was created:", payrollError);
    }

    // Create notification for new employee
    try {
      await prisma.notification.create({
        data: {
          tenantId,
          title: "New Employee Registered",
          description: `${employee.name} has been added to the system as ${data.employmentType || "Full-time"}.`,
          type: "success",
          category: "HRM"
        }
      });
    } catch (notifError) {
      console.error("Failed to create notification:", notifError);
    }

    return NextResponse.json(employee);
  } catch (error: any) {
    console.error("[EMPLOYEE_CREATE_ERROR] Full Error:", error);
    return NextResponse.json({ error: error.message || "Failed to create employee" }, { status: 500 });
  }
});
