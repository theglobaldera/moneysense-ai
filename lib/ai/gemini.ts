import { GoogleGenAI } from "@google/genai";

// "gemini-flash-latest" is a self-updating alias: Google always points it at
// their current recommended Flash-tier model, so this app can't be broken by
// a future model retirement the way it was when pinned to "gemini-2.5-flash"
// (which stopped working for new API keys) — see callGemini's fallback retry
// below for the remaining edge case (a GEMINI_MODEL override that itself
// gets retired).
export const DEFAULT_GEMINI_MODEL = "gemini-flash-latest";
const FALLBACK_GEMINI_MODEL = "gemini-flash-latest";

// Free tier (no credit card required): 1,500 requests/day, 10/minute —
// comfortably enough for this app.

export interface GeminiMessage {
  role: "user" | "assistant";
  content: string;
}

// This project runs on Vercel Fluid Compute (see maxDuration in each route),
// which allows far longer function execution than the classic 10s Hobby
// limit — so this can be generous enough for a genuinely long, in-depth
// response without the platform killing the request first.
const DEFAULT_TIMEOUT_MS = 30_000;

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

function isModelNotFoundError(err: unknown): boolean {
  const status = (err as { status?: number })?.status;
  const message = err instanceof Error ? err.message : "";
  return status === 404 || message.includes("NOT_FOUND") || message.includes("no longer available");
}

async function generate({
  apiKey,
  model,
  systemInstruction,
  messages,
  maxOutputTokens,
  timeoutMs,
}: {
  apiKey: string;
  model: string;
  systemInstruction: string;
  messages: GeminiMessage[];
  maxOutputTokens: number;
  timeoutMs: number;
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

/**
 * Calls Gemini with automatic fallback: if the requested model has been
 * retired or renamed (a 404 "no longer available" error — exactly what
 * happened with gemini-2.5-flash), retries once against a self-updating
 * "latest" alias instead of failing the whole request. This is a real
 * safety net, not just belt-and-braces: Google has already done this once
 * to this app, and will likely do it again eventually.
 */
export async function callGemini({
  apiKey,
  model,
  systemInstruction,
  messages,
  maxOutputTokens = 2048,
  timeoutMs = DEFAULT_TIMEOUT_MS,
}: {
  apiKey: string;
  model: string;
  systemInstruction: string;
  messages: GeminiMessage[];
  maxOutputTokens?: number;
  timeoutMs?: number;
}): Promise<string> {
  try {
    return await generate({ apiKey, model, systemInstruction, messages, maxOutputTokens, timeoutMs });
  } catch (err) {
    if (isModelNotFoundError(err) && model !== FALLBACK_GEMINI_MODEL) {
      console.warn(
        `Gemini model "${model}" is unavailable (likely retired) — retrying with "${FALLBACK_GEMINI_MODEL}".`
      );
      return await generate({
        apiKey,
        model: FALLBACK_GEMINI_MODEL,
        systemInstruction,
        messages,
        maxOutputTokens,
        timeoutMs,
      });
    }
    throw err;
  }
}

export function isRateLimitError(err: unknown): boolean {
  const status = (err as { status?: number })?.status;
  const message = err instanceof Error ? err.message : "";
  return status === 429 || message.includes("RESOURCE_EXHAUSTED") || message.includes("429");
}

export function isTimeoutError(err: unknown): boolean {
  return err instanceof GeminiTimeoutError;
}
