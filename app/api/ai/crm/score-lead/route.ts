import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { leadId } = await req.json();
    
    const lead = await prisma.lead.findUnique({
      where: { id: leadId, tenantId: session.user.tenantId },
      include: { contact: true, activities: true }
    });

    if (!lead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });

    const prompt = `
      Analyze the following CRM lead and give it an AI Score (Hot/Warm/Cold) with reasoning.
      Lead Title: ${lead.title}
      Contact Name: ${lead.contact.name}
      Value: ${lead.value}
      Stage: ${lead.stage}
      Total Activities: ${lead.activities.length}
      
      Return JSON: { "score": "HOT" | "WARM" | "COLD", "reasoning": "string" }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return NextResponse.json(JSON.parse(jsonStr));
  } catch (error) {
    return NextResponse.json({ score: "WARM", reasoning: "Unable to calculate AI score right now." });
  }
}
