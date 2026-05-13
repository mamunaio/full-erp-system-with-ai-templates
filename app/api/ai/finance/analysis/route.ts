import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = session.user.tenantId;

    // 1. Fetch Financial Data Summary
    const accounts = await prisma.account.findMany({
      where: { tenantId },
      select: { name: true, type: true, balance: true }
    });

    const prompt = `
      Analyze the following financial position for tenant ${session.user.tenantSlug}:
      Data: ${JSON.stringify(accounts)}
      
      Provide a comprehensive AI Financial Analysis report.
      Include:
      1. Key Observations (Revenue trends, major expenses)
      2. Risk Assessment (Liquidity, high debt, etc.)
      3. Recommendations (Cost cutting, investment areas)
      
      Format the response in Markdown with clear headings.
      Language: English or Bengali.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return NextResponse.json({ analysis: response.text() });
  } catch (error) {
    console.error("AI Finance Error:", error);
    return NextResponse.json({ analysis: "I couldn't generate the analysis at this moment." });
  }
}
