import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { gemini } from "@/lib/ai/gemini.client";
import { MASTER_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import { ContextBuilder } from "@/lib/ai/context.builder";

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { query } = await req.json();
    const tenantId = (req.auth.user as any).tenantId;

    // 1. Build Context
    const context = await ContextBuilder.buildForQuery(tenantId, query);

    // 2. Prepare Final Prompt
    const finalSystemPrompt = `${MASTER_SYSTEM_PROMPT}\n\nREAL-TIME ERP DATA CONTEXT:\n${context}`;

    // 3. Generate AI Response
    const aiResponse = await gemini.generateJSON(query, finalSystemPrompt);

    return NextResponse.json(aiResponse);
  } catch (error) {
    console.error("AI Query Error:", error);
    return NextResponse.json({ 
      text: "I encountered an error while processing your request. Please try again later.",
      severity: "error"
    }, { status: 500 });
  }
});
