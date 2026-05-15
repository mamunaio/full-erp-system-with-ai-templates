const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function checkDB() {
  try {
    const user = await prisma.user.findFirst({
        include: { tenant: true }
    });
    console.log("--- DB STATUS ---");
    console.log("User:", user?.email);
    console.log("Tenant ID:", user?.tenantId);
    
    if (user?.tenantId) {
        const counts = await Promise.all([
            prisma.employee.count({ where: { tenantId: user.tenantId } }),
            prisma.department.count({ where: { tenantId: user.tenantId } }),
            prisma.product.count({ where: { tenantId: user.tenantId } }),
            prisma.salesOrder.count({ where: { tenantId: user.tenantId } })
        ]);
        
        console.log("Employees:", counts[0]);
        console.log("Departments:", counts[1]);
        console.log("Products:", counts[2]);
        console.log("Sales Orders:", counts[3]);
    }
    console.log("-----------------");
  } catch (error) {
    console.error("DB Error:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkDB();
