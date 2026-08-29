import { NextRequest, NextResponse } from "next/server";
import { callGemini, isRateLimitError, isTimeoutError, DEFAULT_GEMINI_MODEL } from "@/lib/ai/gemini";
import { CUSTOM_SCENARIO_SYSTEM_PROMPT } from "@/lib/ai/scenarioSystemPrompt";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

const MODEL = process.env.GEMINI_MODEL || DEFAULT_GEMINI_MODEL;
const MIN_LENGTH = 15;
const MAX_LENGTH = 800;

export async function POST(req: NextRequest) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI is not configured on this server yet. Add GEMINI_API_KEY to enable this feature." },
      { status: 503 }
    );
  }

  let body: { description?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const description = typeof body.description === "string" ? body.description.trim() : "";

  if (description.length < MIN_LENGTH) {
    return NextResponse.json(
      { error: `Please describe your situation in a bit more detail (at least ${MIN_LENGTH} characters).` },
      { status: 400 }
    );
  }
  if (description.length > MAX_LENGTH) {
    return NextResponse.json(
      { error: `Please keep your description under ${MAX_LENGTH} characters.` },
      { status: 400 }
    );
  }

  try {
    const content = await callGemini({
      apiKey,
      model: MODEL,
      systemInstruction: CUSTOM_SCENARIO_SYSTEM_PROMPT,
      messages: [{ role: "user", content: description }],
    });

    if (!content) {
      return NextResponse.json(
        { error: "MoneySense didn't return a response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ content });
  } catch (err: unknown) {
    if (isRateLimitError(err)) {
      return NextResponse.json(
        { error: "MoneySense is receiving a lot of requests right now. Please try again shortly." },
        { status: 429 }
      );
    }
    if (isTimeoutError(err)) {
      return NextResponse.json(
        { error: "MoneySense is taking too long to respond. Please try again in a moment." },
        { status: 504 }
      );
    }
    console.error("Custom scenario AI error:", err);
    return NextResponse.json(
      { error: "Something went wrong reaching MoneySense. Please try again." },
      { status: 500 }
    );
  }
}
