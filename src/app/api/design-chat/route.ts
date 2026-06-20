import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

/* CoastAI — the renovation design concierge that fronts CoastHomeHub.
   Vision-capable: the homeowner can upload a photo of their space.
   Goal: give real design + a realistic QLD ballpark, then hand off to
   "get 3 licensed quotes". Honest, on-topic, ranges (never fixed prices). */

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || "",
});

// Default to the most capable model; override with ANTHROPIC_MODEL if needed.
const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";

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
  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response(
      JSON.stringify({ error: "AI is not configured yet (missing ANTHROPIC_API_KEY)." }),
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

  // Map our wire format → Anthropic message blocks (text + optional image).
  const apiMessages: Anthropic.MessageParam[] = messages.map((m) => {
    const content: Anthropic.ContentBlockParam[] = [];
    if (m.image?.data) {
      content.push({
        type: "image",
        source: {
          type: "base64",
          media_type: m.image.media_type as
            | "image/jpeg"
            | "image/png"
            | "image/gif"
            | "image/webp",
          data: m.image.data,
        },
      });
    }
    content.push({ type: "text", text: m.text || "" });
    return { role: m.role, content };
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const llm = client.messages.stream({
          model: MODEL,
          max_tokens: 1500,
          system: SYSTEM,
          messages: apiMessages,
        });
        for await (const event of llm) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
        await llm.finalMessage();
      } catch (err) {
        console.error("design-chat error:", err);
        controller.enqueue(
          encoder.encode(
            "\n\n⚠️ Sorry — I hit a snag just then. Please try again in a moment."
          )
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
