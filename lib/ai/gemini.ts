import { GoogleGenAI } from "@google/genai";

// gemini-3.6-flash is on Google AI Studio's free tier (no credit card required):
// 1,500 requests/day, 10 requests/minute — comfortably enough for this app.
// (gemini-2.5-flash, used here previously, is no longer available to new API
// keys as of Google's own deprecation notice — see GEMINI_MODEL if you need
// to override this.)
export const DEFAULT_GEMINI_MODEL = "gemini-3.6-flash";

export interface GeminiMessage {
  role: "user" | "assistant";
  content: string;
}

// Kept under 10s so this fires before a Vercel Hobby-plan function's own
// platform timeout would kill the request with a generic 504 page instead
// of this route's friendly JSON error.
const DEFAULT_TIMEOUT_MS = 9_000;

export class GeminiTimeoutError extends Error {
  constructor() {
    super("GEMINI_TIMEOUT");
    this.name = "GeminiTimeoutError";
  }
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new GeminiTimeoutError()), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      }
    );
  });
}

export async function callGemini({
  apiKey,
  model,
  systemInstruction,
  messages,
  maxOutputTokens = 700,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: {
  apiKey: string;
  model: string;
  systemInstruction: string;
  messages: GeminiMessage[];
  maxOutputTokens?: number;
  timeoutMs?: number;
}): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });
  const response = await withTimeout(
    ai.models.generateContent({
      model,
      contents: messages.map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
      config: { systemInstruction, maxOutputTokens },
    }),
    timeoutMs
  );
  return response.text ?? "";
}

export function isRateLimitError(err: unknown): boolean {
  const status = (err as { status?: number })?.status;
  const message = err instanceof Error ? err.message : "";
  return status === 429 || message.includes("RESOURCE_EXHAUSTED") || message.includes("429");
}

export function isTimeoutError(err: unknown): boolean {
  return err instanceof GeminiTimeoutError;
}
