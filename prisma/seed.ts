import { PrismaClient, UserRole, ContactType } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Starting Seed process...");

  // 1. Tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: "apex-industries" },
    update: {},
    create: {
      name: "Apex Industries Ltd.",
      slug: "apex-industries",
      plan: "ENTERPRISE",
      settings: {
        modules: ["HRM", "CRM", "INVENTORY", "FINANCE", "SALES", "MANUFACTURING", "PROJECTS", "ANALYTICS"]
      }
    }
  });
  console.log("✅ Tenant created: Apex Industries Ltd.");

  // 2. Users
  const users = [
    { name: "Rahman Ahmed", email: "admin@injaazh.com", role: "ADMIN" as UserRole },
    { name: "Farhan Hossain", email: "farhan@apex-industries.com", role: "ADMIN" as UserRole },
    { name: "Nusrat Jahan", email: "nusrat.hr@apex-industries.com", role: "MANAGER" as UserRole },
    { name: "Karim Uddin", email: "karim.sales@apex-industries.com", role: "MANAGER" as UserRole },
    { name: "Tahmina Begum", email: "tahmina.finance@apex-industries.com", role: "MANAGER" as UserRole },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        ...u,
        password: "password123", 
        tenantId: tenant.id
      }
    });
  }
  console.log("✅ 5 users created");

  // 3. HRM - Departments
  const depts = ["Administration", "Sales & Marketing", "Finance & Accounts", "Production", "Human Resources"];
  for (const d of depts) {
    await prisma.department.upsert({
      where: { tenantId_name: { tenantId: tenant.id, name: d } },
      update: {},
      create: { name: d, tenantId: tenant.id }
    });
  }
  console.log("✅ 5 departments created");

  // 4. CRM - Contacts
  const companies = ["Square Pharmaceuticals Ltd.", "BRAC Bank Limited", "Walton Hi-Tech Industries", "Pran-RFL Group"];
  for (const c of companies) {
    await prisma.contact.create({
      data: {
        name: c,
        type: ContactType.CUSTOMER,
        email: `info@${c.toLowerCase().replace(/ /g, '')}.com`,
        phone: "01700000000",
        tenantId: tenant.id
      }
    });
  }
  console.log("✅ 4 companies created in CRM");

  // 5. Inventory - Categories & Products
  const categories = ["Raw Materials", "Finished Goods", "Electronics"];
  for (const cat of categories) {
    const category = await prisma.category.upsert({
      where: { tenantId_name: { tenantId: tenant.id, name: cat } },
      update: {},
      create: { name: cat, tenantId: tenant.id }
    });

    if (cat === "Finished Goods") {
       await prisma.product.upsert({
         where: { tenantId_sku: { tenantId: tenant.id, sku: "FAN-X2" } },
         update: {},
         create: {
           name: "Industrial Fan X2",
           sku: "FAN-X2",
           categoryId: category.id,
           salePrice: 3500,
           costPrice: 2800,
           unit: "PCS",
           tenantId: tenant.id
         }
       });
    }
  }
  console.log("✅ Inventory categories and sample products created");

  console.log("🏁 Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
