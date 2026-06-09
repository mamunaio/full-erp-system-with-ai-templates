import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { model } from "@/lib/gemini";

export async function GET() {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const tenantId = session.user.tenantId;

    // 1. Fetch Summary Data from DB
    const [revenue, expenses, lowStock, pendingApprovals] = await Promise.all([
      prisma.transaction.aggregate({
        where: { tenantId, type: "CREDIT" },
        _sum: { amount: true },
      }),
      prisma.transaction.aggregate({
        where: { tenantId, type: "DEBIT" },
        _sum: { amount: true },
      }),
      prisma.product.count({
        where: {
          tenantId,
          stocks: { some: { quantity: { lte: prisma.product.fields.minStock } } }
        }
      }),
      prisma.leave.count({
        where: { employee: { tenantId }, status: "PENDING" }
      })
    ]);

    // 2. Prepare Prompt for Gemini
    const prompt = `
      You are an AI ERP Consultant for Injaazh ERP. 
      Analyze the following business data for tenant ${session.user.tenantSlug}:
      - Total Revenue: $${revenue._sum.amount || 0}
      - Total Expenses: $${expenses._sum.amount || 0}
      - Low Stock Count: ${lowStock}
      - Pending Approvals: ${pendingApprovals}

      Return exactly 3 concise, actionable business insights in JSON format:
      {
        "insights": [
          { "type": "warning" | "success" | "info", "text": "string" }
        ]
      }
      Focus on inventory alerts, financial health, or operational bottlenecks.
      Language: English or Bengali (mix is fine).
    `;

    // 3. Call Gemini API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean JSON response (sometimes Gemini adds ```json ... ```)
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const insights = JSON.parse(jsonStr);

    return NextResponse.json(insights);
  } catch (error) {
    console.error("AI Insights Error:", error);
    return NextResponse.json({
      insights: [
        { type: "info", text: "Welcome back! AI insights are being generated." },
        { type: "warning", text: "Please check your inventory levels." },
        { type: "success", text: "System is performing within normal parameters." }
      ]
    });
  }
}
