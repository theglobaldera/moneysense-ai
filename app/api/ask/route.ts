import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { ASK_MONEYSENSE_SYSTEM_PROMPT } from "@/lib/ai/systemPrompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-haiku-4-5-20251001";
const MAX_MESSAGES = 20;
const MAX_MESSAGE_LENGTH = 2000;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI is not configured on this server yet. Add ANTHROPIC_API_KEY to enable Ask MoneySense." },
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
    const anthropic = new Anthropic({ apiKey });
    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: 700,
      system: ASK_MONEYSENSE_SYSTEM_PROMPT,
      messages: sanitized,
    });

    const textBlock = response.content.find((block) => block.type === "text");
    const content = textBlock && textBlock.type === "text" ? textBlock.text : "";

    if (!content) {
      return NextResponse.json(
        { error: "MoneySense didn't return a response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ content });
  } catch (err: unknown) {
    const status = (err as { status?: number })?.status;
    if (status === 429) {
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
