import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import { gemini } from "@/lib/ai/gemini.client";
import { MASTER_SYSTEM_PROMPT } from "@/lib/ai/prompts";

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { type, period, includeAI } = await req.json();
    const tenantId = session.user.tenantId;

    let reportData: any = {};
    
    if (type === "profit_loss_statement") {
      const invoices = await prisma.invoice.findMany({
        where: { tenantId, date: { gte: new Date(period.from), lte: new Date(period.to) } }
      });
      reportData = {
        totalRevenue: invoices.reduce((sum, inv) => sum + Number(inv.total), 0),
        invoiceCount: invoices.length,
      };
    }

    let aiNarrative = "";
    if (includeAI) {
      const prompt = `Generate a professional executive summary for a ${type} report for the period ${period.from} to ${period.to}. Data: ${JSON.stringify(reportData)}`;
      aiNarrative = await gemini.generateText(prompt, MASTER_SYSTEM_PROMPT);
    }

    const result = {
      id: Date.now().toString(),
      type,
      period,
      data: reportData,
      aiNarrative,
      pdfUrl: `/reports/temp_${Date.now()}.pdf`,
      excelUrl: `/reports/temp_${Date.now()}.xlsx`
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Report Generation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
