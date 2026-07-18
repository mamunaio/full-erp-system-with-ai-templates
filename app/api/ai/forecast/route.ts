import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { gemini } from "@/lib/ai/gemini.client";
import { MASTER_SYSTEM_PROMPT } from "@/lib/ai/prompts";
import prisma from "@/lib/prisma";
import { subMonths } from "date-fns";

interface HistoricalDataPoint {
  date: Date;
  total: number;
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { module, metric } = await req.json();
    const tenantId = session.user.tenantId;

    const sixMonthsAgo = subMonths(new Date(), 6);
    let historicalData: HistoricalDataPoint[] = [];

    if (module === "finance" && metric === "revenue") {
      historicalData = await prisma.invoice.findMany({
        where: { tenantId, date: { gte: sixMonthsAgo } },
        select: { date: true, total: true },
        orderBy: { date: "asc" }
      });
    }

    const forecastPrompt = `
      Analyze the provided historical time-series data and predict the next 3 months.
      Provide the forecast in this JSON structure:
      {
        "forecast": [
          { "month": "Month Name", "predicted": number, "confidence": number }
        ],
        "trend": "upward|downward|stable",
        "analysis": "Brief explanation"
      }
    `;

    const finalSystemPrompt = `${MASTER_SYSTEM_PROMPT}\n\n${forecastPrompt}\n\nHistorical Data: ${JSON.stringify(historicalData)}`;

    const aiResponse = await gemini.generateJSON(`Forecast ${metric} for ${module}.`, finalSystemPrompt);

    return NextResponse.json(aiResponse);
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
