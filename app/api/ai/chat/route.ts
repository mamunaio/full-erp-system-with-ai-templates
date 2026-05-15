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

    const { message } = await req.json();
    const tenantId = (req.auth.user as any).tenantId;

    // Fetch Context
    const [employeeCount, deptCount, presentToday, lowStockCount] = await Promise.all([
      prisma.employee.count({ where: { tenantId } }),
      prisma.department.count({ where: { tenantId } }),
      prisma.attendance.count({ 
        where: { 
          employee: { tenantId },
          date: { gte: new Date(new Date().setHours(0,0,0,0)) },
          status: "PRESENT"
        } 
      }),
      prisma.stock.count({
        where: {
          tenantId,
          quantity: { lte: 10 } 
        }
      })
    ]);

    const context = `
      You are Injaazh AI. Respond in Bengali.
      Current Business Status:
      - Employees: ${employeeCount}
      - Departments: ${deptCount}
      - Present Today: ${presentToday}
      - Low Stock: ${lowStockCount}
      
      User Question: "${message}"
      
      Instructions:
      1. For summary responses, return a RAW JSON object WITHOUT any markdown code blocks.
      2. Format:
      {
        "text": "আপনার ব্যবসার বর্তমান অবস্থা নিচে দেওয়া হলো:",
        "type": "insight",
        "content": [
          { "title": "কর্মচারী", "description": "মোট ${employeeCount} জন, আজকে উপস্থিত ${presentToday} জন।", "severity": "info" },
          { "title": "ইনভেন্টরি", "description": "${lowStockCount} টি পণ্যের স্টক কম আছে।", "severity": "${lowStockCount > 0 ? 'warning' : 'info'}" }
        ]
      }
      3. For normal chat, use plain text with emojis.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(context);
    let text = result.response.text().trim();

    // Sanitize: Strip markdown code blocks
    text = text.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();

    try {
      const jsonRes = JSON.parse(text);
      return NextResponse.json(jsonRes);
    } catch (e) {
      return NextResponse.json({ text });
    }
  } catch (error: any) {
    console.error("[AI_CHAT_ERROR]", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
});
