import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // Check DB connection using MongoDB ping command
    await prisma.$runCommandRaw({ ping: 1 });

    return NextResponse.json({
      status: "healthy",
      version: "1.0.0",
      database: "connected",
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    return NextResponse.json({
      status: "unhealthy",
      database: "disconnected",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 503 });
  }
}
