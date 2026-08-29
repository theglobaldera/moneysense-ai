import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { ASK_MONEYSENSE_SYSTEM_PROMPT } from "@/lib/ai/systemPrompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// gemini-2.5-flash is on Google AI Studio's free tier (no credit card required):
// 1,500 requests/day, 15 requests/minute — comfortably enough for this app.
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI is not configured on this server yet. Add GEMINI_API_KEY to enable Ask MoneySense." },
      { status: 503 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];

  if (messages.length === 0 || messages.length > MAX_MESSAGES) {
    return NextResponse.json({ error: "Invalid message history." }, { status: 400 });
  }

  const sanitized: ChatMessage[] = [];
  for (const m of messages) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      m.content.trim().length === 0
    ) {
      return NextResponse.json({ error: "Invalid message format." }, { status: 400 });
    }
    sanitized.push({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) });
  }

  if (sanitized[sanitized.length - 1].role !== "user") {
    return NextResponse.json({ error: "Last message must be from the user." }, { status: 400 });
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: sanitized.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      config: {
        systemInstruction: ASK_MONEYSENSE_SYSTEM_PROMPT,
        maxOutputTokens: 700,
      },
    });

    const content = response.text ?? "";

    if (!content) {
      return NextResponse.json(
        { error: "MoneySense didn't return a response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ content });
  } catch (err: unknown) {
    const status = (err as { status?: number })?.status;
    const message = err instanceof Error ? err.message : "";
    if (status === 429 || message.includes("RESOURCE_EXHAUSTED") || message.includes("429")) {
      return NextResponse.json(
        { error: "MoneySense is receiving a lot of questions right now. Please try again shortly." },
        { status: 429 }
      );
    }
    console.error("Ask MoneySense AI error:", err);
    return NextResponse.json(
      { error: "Something went wrong reaching MoneySense. Please try again." },
      { status: 500 }
    );
  }
}
