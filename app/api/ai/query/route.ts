import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const POST = auth(async function POST(req) {
  try {
    if (!req.auth?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { query } = await req.json();
    const tenantId = (req.auth.user as any).tenantId;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Fetch Context
    const [employeeCount, deptCount, presentToday, lowStockCount, totalRevenue] = await Promise.all([
      prisma.employee.count({ where: { tenantId } }),
      prisma.department.count({ where: { tenantId } }),
      prisma.attendance.count({ 
        where: { 
          employee: { tenantId },
          date: { gte: today },
          status: "PRESENT"
        } 
      }),
      prisma.stock.count({ where: { tenantId, quantity: { lte: 10 } } }),
      prisma.salesOrder.aggregate({
        where: { tenantId, status: "COMPLETED" },
        _sum: { total: true }
      })
    ]);

    const context = `
      You are Injaazh ERP Executive AI.
      Language & Greeting Rules:
      - Always respond in polite, professional Bengali.
      - Greet with "আসসালামু আলাইকুম" or "হ্যালো! ইনজাজ এআই-তে আপনাকে স্বাগতম।"
      - NEVER use the word "নমস্কার" under any circumstances.
      
      Current Business Status:
      - Employees: ${employeeCount}
      - Departments: ${deptCount}
      - Present Today: ${presentToday}
      - Low Stock: ${lowStockCount}
      - Total Revenue: $${totalRevenue._sum.total || 0}
      
      User Question: "${query}"
      
      Instructions:
      1. For summary/overview, return a RAW JSON object WITHOUT any markdown formatting or code blocks.
      2. JSON structure:
      {
        "text": "আসসালামু আলাইকুম! আপনার বর্তমান ব্যবসার সংক্ষিপ্ত অবস্থা নিচে দেওয়া হলো:",
        "type": "insight",
        "content": [
          { "title": "কর্মচারী", "description": "মোট ${employeeCount} জন, আজকে উপস্থিত ${presentToday} জন", "severity": "info" },
          { "title": "ইনভেন্টরি", "description": "${lowStockCount} টি পণ্যের স্টক কম আছে", "severity": "${lowStockCount > 0 ? 'warning' : 'info'}" },
          { "title": "রেভিনিউ", "description": "মোট সেলস $${totalRevenue._sum.total || 0}", "severity": "info" }
        ]
      }
      3. For other questions, answer helpfully in natural professional Bengali with emojis.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(context);
    let text = result.response.text().trim();

    // Sanitize: Remove markdown code blocks if AI included them
    text = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

    try {
      const jsonRes = JSON.parse(text);
      return NextResponse.json(jsonRes);
    } catch (e) {
      return NextResponse.json({ text });
    }
  } catch (error: any) {
    console.error("[AI_QUERY_ERROR]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
