import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = session.user.tenantId;

    // 1. Fetch historical movement data
    const movements = await prisma.stockMovement.findMany({
      where: { tenantId, createdAt: { gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) } },
      include: { product: { select: { name: true, sku: true } } },
      take: 100,
    });

    // 2. Prepare data for Gemini
    const dataSummary = movements.map(m => ({
      product: m.product.name,
      type: m.type,
      qty: m.quantity,
      date: m.createdAt
    }));

    const prompt = `
      Analyze the following 90-day inventory movement data for tenant ${session.user.tenantSlug}:
      ${JSON.stringify(dataSummary)}
      
      Predict the demand for the next 30 days and provide reorder recommendations.
      Return strictly as JSON:
      {
        "forecast": [
          { "product": "name", "predictedDemand": number, "recommendedReorder": number, "confidence": "HIGH" | "MEDIUM" | "LOW" }
        ]
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();

    return NextResponse.json(JSON.parse(jsonStr));
  } catch (error) {
    console.error("AI Forecast Error:", error);
    return NextResponse.json({ forecast: [] });
  }
}
