import { NextRequest } from "next/server";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      // 1. Send initial connection success message
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "connected" })}\n\n`));

      // 2. Mock heartbeat
      const heartbeatInterval = setInterval(() => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ type: "ping" })}\n\n`));
      }, 30000);

      // 3. Keep connection alive
      req.signal.onabort = () => {
        clearInterval(heartbeatInterval);
        controller.close();
      };
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      "Connection": "keep-alive",
    },
  });
}
