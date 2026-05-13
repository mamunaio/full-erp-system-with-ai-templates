import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { gemini } from "@/lib/ai/gemini.client";
import { MASTER_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { ContextBuilder } from "@/lib/ai/context.builder";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const tenantId = session.user.tenantId;

    // 1. Build Global Context
    const context = await ContextBuilder.buildForInsights(tenantId);

    // 2. Specialized Insight Prompt
    const insightPrompt = `
      Based on the provided ERP data, generate exactly 5 high-impact business insights.
      Each insight must follow this JSON structure:
      {
        "insights": [
          {
            "id": "unique-id",
            "module": "FINANCE|INVENTORY|HR|SALES",
            "title": "Short title",
            "description": "Natural language explanation",
            "severity": "info|warning|critical",
            "action": "Suggested next step"
          }
        ]
      }
    `;

    const finalSystemPrompt = `${MASTER_SYSTEM_PROMPT}\n\n${insightPrompt}\n\nREAL-TIME ERP DATA SUMMARY:\n${context}`;

    // 3. Generate
    const aiResponse = await gemini.generateJSON("Generate 5 business insights.", finalSystemPrompt);

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error("AI Insights Error:", error);
    return NextResponse.json({ insights: [] }, { status: 500 });
  }
}
