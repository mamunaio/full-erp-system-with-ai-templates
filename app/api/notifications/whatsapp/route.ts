import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { to, eventName, date } = await req.json();

    const WHATSAPP_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN;
    const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID;

    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      return NextResponse.json({ success: false, error: "WhatsApp API credentials are not configured" }, { status: 500 });
    }

    const response = await fetch(`https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${WHATSAPP_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to, // Example: "8801715974542"
        type: "template",
        template: {
          name: "event_announcement",
          language: {
            code: "en_US",
          },
          components: [
            {
              type: "body",
              parameters: [
                {
                  type: "text",
                  text: eventName,
                },
                {
                  type: "text",
                  text: date,
                },
              ],
            },
          ],
        },
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.error("WhatsApp API Error:", data.error);
      return NextResponse.json({ success: false, error: data.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("WhatsApp Broadcast Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
