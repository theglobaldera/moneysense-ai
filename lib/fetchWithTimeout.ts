/**
 * A safety net on top of the server-side AI timeout: if the round trip
 * (network + serverless cold start + platform-level limits) somehow takes
 * longer than this, the browser gives up with a clear error instead of a
 * spinner that never resolves.
 */
export async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs = 15_000
): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

export function isAbortError(err: unknown): boolean {
  return err instanceof DOMException && err.name === "AbortError";
}
