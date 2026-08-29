"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Send,
  Lightbulb,
  Sparkles,
  Compass,
  BookOpenCheck,
  Loader2,
  AlertTriangle,
  MessageCircleHeart,
  Calculator,
  Map,
} from "lucide-react";
import SafetyNote from "@/components/SafetyNote";
import { parseAskResponse, extractKeepLearningTopics } from "@/lib/parseAskResponse";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTED_QUESTIONS = [
  "What is compound interest?",
  "How does a loan interest rate work?",
  "How much should I save?",
  "What's the difference between saving and investing?",
  "How can I spot a financial scam?",
];

const SECTION_ICON: Record<string, typeof Lightbulb> = {
  "simple explanation": Lightbulb,
  "real-life example": Sparkles,
  "what this means": Compass,
  "keep learning": BookOpenCheck,
};

export default function AskPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiUnavailable, setAiUnavailable] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, loading]);

  async function sendMessage(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 503) setAiUnavailable(true);
        setError(data.error || "Something went wrong. Please try again.");
        setMessages(messages);
        return;
      }

      setMessages([...nextMessages, { role: "assistant", content: data.content }]);
    } catch {
      setError("Something went wrong. Please try again.");
      setMessages(messages);
    } finally {
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="container-page flex min-h-[calc(100vh-4rem)] flex-col py-8">
      {messages.length === 0 && (
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold sm:text-4xl">What would you like to understand?</h1>
          <p className="mt-3 text-charcoal-500">
            Ask a question about money and I&rsquo;ll help you understand it in simple terms.
          </p>

          {aiUnavailable ? (
            <div className="mt-8 card mx-auto max-w-md text-left">
              <p className="font-semibold text-charcoal-900">MoneySense is temporarily unavailable.</p>
              <p className="mt-1 text-sm text-charcoal-500">
                You can still explore our financial scenarios and learning activities.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Link href="/scenarios" className="btn-secondary">Explore Scenarios</Link>
                <Link href="/learn" className="btn-secondary">Go to Learn</Link>
              </div>
            </div>
          ) : (
            <div className="mt-8 grid gap-2.5 sm:grid-cols-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="card text-left text-sm font-medium text-charcoal-700 transition hover:-translate-y-0.5 hover:border-forest-300 hover:shadow-card"
                >
                  &ldquo;{q}&rdquo;
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {messages.length > 0 && (
        <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-5 pb-4">
          {messages.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-forest-600 px-4 py-3 text-sm font-medium text-white">
                {m.content}
              </div>
            ) : (
              <AssistantResponse key={i} content={m.content} />
            )
          )}

          {loading && (
            <div className="flex items-center gap-2 text-sm text-charcoal-500">
              <Loader2 size={16} className="animate-spin text-forest-500" />
              MoneySense is thinking...
            </div>
          )}

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              <AlertTriangle size={18} className="mt-0.5 shrink-0" />
              <div>
                <p>{error}</p>
                {messages.length > 0 && messages[messages.length - 1].role === "user" && (
                  <button
                    onClick={() => sendMessage(messages[messages.length - 1].content)}
                    className="mt-1 font-semibold underline underline-offset-2"
                  >
                    Try again
                  </button>
                )}
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      )}

      <div className="sticky bottom-0 mx-auto mt-4 w-full max-w-2xl bg-cream-50 pb-2 pt-2">
        <form onSubmit={handleSubmit} className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage(input);
              }
            }}
            placeholder="Ask MoneySense anything about financial literacy..."
            rows={1}
            aria-label="Ask MoneySense a question"
            className="field-input max-h-32 flex-1 resize-none"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            aria-label="Send question"
            className="btn-primary !px-4 !py-3.5"
          >
            <Send size={18} />
          </button>
        </form>
        <SafetyNote className="mt-3" />
      </div>
    </div>
  );
}

function AssistantResponse({ content }: { content: string }) {
  const sections = parseAskResponse(content);

  return (
    <div className="card space-y-4">
      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-forest-600">
        <MessageCircleHeart size={14} /> MoneySense
      </div>
      {sections.map((section, i) => {
        const key = section.heading.toLowerCase();
        if (key === "keep learning") {
          const topics = extractKeepLearningTopics(section.body);
          return (
            <div key={i}>
              <SectionHeading heading={section.heading} />
              <div className="mt-2 flex flex-wrap gap-2">
                {topics.length > 0
                  ? topics.map((t) => (
                      <Link key={t.slug} href={`/learn/${t.slug}`} className="pill hover:bg-sage-200">
                        {t.label}
                      </Link>
                    ))
                  : <p className="text-sm text-charcoal-500">{section.body}</p>}
              </div>
            </div>
          );
        }
        return (
          <div key={i}>
            <SectionHeading heading={section.heading} />
            <p className="mt-1 whitespace-pre-line text-sm text-charcoal-700">{section.body}</p>
          </div>
        );
      })}

      <div className="flex flex-wrap gap-2 border-t border-forest-100 pt-3">
        <Link href="/simulate" className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600 hover:underline">
          <Calculator size={15} /> Open Simulator
        </Link>
        <Link href="/scenarios" className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest-600 hover:underline">
          <Map size={15} /> Explore a Scenario
        </Link>
      </div>
    </div>
  );
}

function SectionHeading({ heading }: { heading: string }) {
  const Icon = SECTION_ICON[heading.toLowerCase()] ?? Lightbulb;
  return (
    <div className="flex items-center gap-1.5 text-sm font-semibold text-charcoal-900">
      <Icon size={15} className="text-forest-600" />
      {heading}
    </div>
  );
}
