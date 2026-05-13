import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { model } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { data, context } = await req.json();

    const prompt = `
      Analyze the following business analytics data for the ${context} module:
      Data: ${JSON.stringify(data)}
      
      Provide a concise, executive summary in natural language.
      Explain:
      1. Major trends (positive or negative)
      2. Anomalies or areas of concern
      3. Strategic recommendation
      
      Language: English or Bengali.
      Format: Bullet points, bold key numbers.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    return NextResponse.json({ narration: response.text() });
  } catch (error) {
    console.error("AI Analytics Error:", error);
    return NextResponse.json({ narration: "I couldn't generate the analysis at this moment." });
  }
}
