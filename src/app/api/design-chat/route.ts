import { GoogleGenerativeAI, type Part, type Content } from "@google/generative-ai";
import { NextRequest } from "next/server";

/* CoastAI — renovation design concierge for CoastHomeHub.
   Vision-capable: homeowner can upload a photo of their space.
   Powered by Gemini 2.0 Flash. */

const SYSTEM = `You are CoastAI, the renovation design concierge for CoastHomeHub — a South East Queensland (Gold Coast, Sunshine Coast, Brisbane) home-renovation platform built and vetted by EIJ Construction, a QBCC-licensed Queensland builder.

YOUR JOB, in order:
1. Help the homeowner picture their renovation. If they share a photo, describe what you see, then propose a concrete, tasteful design concept suited to the QLD coastal climate (materials, palette, fixtures, layout ideas).
2. Give a realistic QLD ballpark cost as a RANGE (e.g. "$18k–$24k"), and say briefly what drives the range. Never quote a single fixed price and never present a number as a binding quote — only a licensed tradie can do that.
3. When they seem ready, warmly offer to line up "up to 3 verified, QBCC-licensed local tradies" to give them real quotes. Frame this as the natural next step.

STYLE: Warm, plain-spoken, genuinely helpful — like a knowledgeable local builder, not a salesperson. Keep replies short (2–4 short paragraphs max) and skimmable. Ask one focused follow-up question when you need detail (budget, timeline, suburb, what they want changed). Use Australian spelling and AUD.

TRUST & HONESTY: You are an AI assistant, and you say so if asked. Costs are estimates, not quotes. Only licensed tradies do the actual work. Don't invent specific tradie names, exact availability, or guarantees. Reassure on the trust model when relevant: every tradie is checked against the QBCC register, and using a licensed contractor protects the homeowner's Home Warranty cover.

BOUNDARIES: Stay on home renovation, design, DIY and the quoting process. If asked about anything unrelated, gently steer back. Don't give structural/engineering or legal advice beyond "that needs a licensed professional to assess on site".`;

export const runtime = "nodejs";
export const maxDuration = 60;

type InMsg = {
  role: "user" | "assistant";
  text: string;
  image?: { media_type: string; data: string }; // base64 (no data: prefix)
};

export async function POST(req: NextRequest) {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "AI is not configured yet (missing GOOGLE_GENERATIVE_AI_API_KEY)." }),
      { status: 503, headers: { "content-type": "application/json" } }
    );
  }

  let messages: InMsg[];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return new Response(JSON.stringify({ error: "Bad request" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  if (messages.length === 0) {
    return new Response(JSON.stringify({ error: "No messages" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // Map wire format → Gemini content parts.
  // Gemini uses "user"/"model" roles (not "assistant").
  const history: Content[] = messages.slice(0, -1).map((m) => {
    const parts: Part[] = [];
    if (m.image?.data) {
      parts.push({ inlineData: { mimeType: m.image.media_type, data: m.image.data } });
    }
    parts.push({ text: m.text || "" });
    return { role: m.role === "assistant" ? "model" : "user", parts };
  });

  const lastMsg = messages[messages.length - 1];
  const lastParts: Part[] = [];
  if (lastMsg.image?.data) {
    lastParts.push({ inlineData: { mimeType: lastMsg.image.media_type, data: lastMsg.image.data } });
  }
  lastParts.push({ text: lastMsg.text || "" });

  const genai = new GoogleGenerativeAI(apiKey);
  const model = genai.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: SYSTEM,
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const chat = model.startChat({ history });
        const result = await chat.sendMessageStream(lastParts);
        for await (const chunk of result.stream) {
          const text = chunk.text();
          if (text) controller.enqueue(encoder.encode(text));
        }
      } catch (err) {
        console.error("design-chat error:", err);
        controller.enqueue(
          encoder.encode("\n\n⚠️ Sorry — I hit a snag just then. Please try again in a moment.")
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
      "x-accel-buffering": "no",
    },
  });
}
