export interface AskSection {
  heading: string;
  body: string;
}

/**
 * Splits the AI's markdown-headed response (## Simple Explanation, etc.) into
 * sections the UI can render as distinct cards, per the product spec's
 * "structured response" requirement.
 */
export function parseAskResponse(raw: string): AskSection[] {
  const lines = raw.split("\n");
  const sections: AskSection[] = [];
  let current: AskSection | null = null;

  for (const line of lines) {
    const headingMatch = line.match(/^##\s+(.+)/);
    if (headingMatch) {
      if (current) sections.push(current);
      current = { heading: headingMatch[1].trim(), body: "" };
    } else if (current) {
      current.body += (current.body ? "\n" : "") + line;
    }
  }
  if (current) sections.push(current);

  if (sections.length === 0) {
    return [{ heading: "MoneySense says", body: raw.trim() }];
  }

  return sections.map((s) => ({ heading: s.heading, body: s.body.trim() }));
}

const TOPIC_SLUG_MAP: Record<string, string> = {
  budgeting: "budgeting",
  saving: "saving",
  savings: "saving",
  interest: "interest",
  borrowing: "borrowing",
  debt: "debt",
  "scam awareness": "scam-awareness",
};

export function extractKeepLearningTopics(body: string): { label: string; slug: string }[] {
  return body
    .split(",")
    .map((s) => s.replace(/[.•\-*]/g, "").trim())
    .filter(Boolean)
    .map((label) => ({ label, slug: TOPIC_SLUG_MAP[label.toLowerCase()] }))
    .filter((t): t is { label: string; slug: string } => Boolean(t.slug));
}
