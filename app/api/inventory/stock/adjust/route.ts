import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { productId, warehouseId, type, quantity, reason, reference } = await req.json();
    const tenantId = session.user.tenantId;

    // Use a transaction to update stock and log movement
    const result = await prisma.$transaction(async (tx) => {
      // 1. Find or create stock record
      const stock = await tx.stock.upsert({
        where: { productId_warehouseId: { productId, warehouseId } },
        update: {
          quantity: type === "ADD" ? { increment: quantity } : 
                   type === "REMOVE" ? { decrement: quantity } : quantity
        },
        create: {
          productId,
          warehouseId,
          tenantId,
          quantity: type === "ADD" ? quantity : type === "SET" ? quantity : -quantity
        }
      });

      // 2. Log movement
      await tx.stockMovement.create({
        data: {
          tenantId,
          productId,
          warehouseId,
          type: "ADJUSTMENT",
          quantity: type === "REMOVE" ? -quantity : quantity,
          reference,
          note: reason
        }
      });

      return stock;
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Stock Adjustment Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
