import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { to, eventName, date } = await req.json();

    const WHATSAPP_TOKEN = "EAAhbZBSxLDM8BRbeqvUR8QAgBv1EfHCj5y0riU9ZC8xImn95X8ObU1E3C9uXVFMW8qgatwNvKLX2f5eC5HogtHTvI6ffFO0w7ukMONaBQsuZCh1BYIXOApctNvgtkGKxQ4uuRnzPE6BcHI898PQt1DKlroarEZCNd8yXP5lAQAqUOsv5oxMG4g2Q7lsweqEy0yEz0f2hIJjo9qKvXCtwTOpGcpqV9IHLyaZCVSALmUeQt9FFWlCJBTZCaw8OfxOaVOAVewD4GqqrTpKIVmNkFGZASfMRmbgWB92ZAgZDZD";
    const PHONE_NUMBER_ID = "1092416637294472";

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
          name: "hello_world",
          language: {
            code: "en_US",
          },
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
