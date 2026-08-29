"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Loader2,
  AlertTriangle,
  Send,
  FileText,
  ListChecks,
  HelpCircle,
  ArrowRightCircle,
} from "lucide-react";
import AiResponseCard from "@/components/ai/AiResponseCard";

const SECTION_ICONS = {
  "situation recap": FileText,
  "key considerations": ListChecks,
  "questions worth asking": HelpCircle,
  "suggested next step": ArrowRightCircle,
};

const EXAMPLE_PROMPT =
  "I earn ₦150,000 a month from a part-time job. I want to save for a phone, help my family sometimes, and I just got offered a ₦50,000 loan. Not sure how to balance it all.";

const MIN_LENGTH = 15;
const MAX_LENGTH = 800;

export default function CustomScenario() {
  const [description, setDescription] = useState("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiUnavailable, setAiUnavailable] = useState(false);

  const tooShort = description.trim().length > 0 && description.trim().length < MIN_LENGTH;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = description.trim();
    if (trimmed.length < MIN_LENGTH || loading) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch("/api/scenario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: trimmed }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 503) setAiUnavailable(true);
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setResponse(data.content);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card border-forest-200 bg-gradient-to-br from-forest-50 to-white">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-forest-600">
        <Sparkles size={14} /> Describe Your Own Situation
      </div>
      <p className="mt-2 text-sm text-charcoal-500">
        Tell MoneySense what&rsquo;s going on with your money right now, and get back a
        structured way to think it through — not advice, a way to reason about it yourself.
      </p>

      {aiUnavailable ? (
        <div className="mt-4 rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-charcoal-700">
          This feature needs the AI assistant, which is temporarily unavailable. Try one of the
          example scenarios below instead.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-4 space-y-2">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={EXAMPLE_PROMPT}
            rows={4}
            maxLength={MAX_LENGTH}
            aria-label="Describe your financial situation"
            className="field-input resize-none"
          />
          <div className="flex items-center justify-between">
            <p className="text-xs text-charcoal-300">
              {tooShort
                ? `A little more detail helps (at least ${MIN_LENGTH} characters).`
                : `${description.length}/${MAX_LENGTH}`}
            </p>
            <button
              type="submit"
              disabled={loading || description.trim().length < MIN_LENGTH}
              className="btn-primary"
            >
              {loading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
              Get MoneySense&rsquo;s Take
            </button>
          </div>
        </form>
      )}

      {loading && (
        <motion.div
          className="mt-4 flex items-center gap-2 text-sm text-charcoal-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Loader2 size={16} className="animate-spin text-forest-500" />
          MoneySense is thinking about your situation...
        </motion.div>
      )}

      {error && (
        <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertTriangle size={18} className="mt-0.5 shrink-0" />
          <div>
            <p>{error}</p>
            <button onClick={handleSubmit} className="mt-1 font-semibold underline underline-offset-2">
              Try again
            </button>
          </div>
        </div>
      )}

      {response && !loading && (
        <div className="mt-4">
          <AiResponseCard
            content={response}
            label="MoneySense's Take"
            labelIcon={Sparkles}
            sectionIcons={SECTION_ICONS}
          />
        </div>
      )}

      <p className="mt-4 text-xs text-charcoal-300">
        MoneySense provides general financial education, not professional financial advice.{" "}
        <Link href="/about#safety" className="underline">
          Learn more
        </Link>
        .
      </p>
    </div>
  );
}
