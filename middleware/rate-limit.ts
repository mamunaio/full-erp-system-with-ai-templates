import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

export function rateLimit(req: NextRequest, limit: number = 60, windowMs: number = 60000) {
  const ip = req.ip || "unknown";
  const now = Date.now();
  const userData = rateLimitMap.get(ip) || { count: 0, lastReset: now };

  if (now - userData.lastReset > windowMs) {
    userData.count = 1;
    userData.lastReset = now;
  } else {
    userData.count++;
  }

  rateLimitMap.set(ip, userData);

  if (userData.count > limit) {
    return {
      success: false,
      response: NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": Math.ceil((userData.lastReset + windowMs - now) / 1000).toString() } }
      ),
    };
  }

  return { success: true };
}
