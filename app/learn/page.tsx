"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Circle, Wallet, PiggyBank, Percent, HandCoins, Scale, ShieldAlert } from "lucide-react";
import { topics } from "@/lib/content/topics";
import { getProgress, type ProgressState } from "@/lib/progress";

const TOPIC_ICONS: Record<string, typeof Wallet> = {
  budgeting: Wallet,
  saving: PiggyBank,
  interest: Percent,
  borrowing: HandCoins,
  debt: Scale,
  "scam-awareness": ShieldAlert,
};

export default function LearnPage() {
  const [progress, setProgress] = useState<ProgressState | null>(null);

  useEffect(() => {
    setProgress(getProgress());
  }, []);

  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Learn money, one concept at a time.</h1>
        <p className="mt-3 text-charcoal-500">
          Pick a topic, work through a short explanation, and test what you&rsquo;ve learned.
        </p>
      </div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic) => {
          const Icon = TOPIC_ICONS[topic.slug] ?? Wallet;
          const done = progress?.completedTopics.includes(topic.slug);
          return (
            <Link
              key={topic.slug}
              href={`/learn/${topic.slug}`}
              className="card flex flex-col gap-3 transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-forest-700">
                  <Icon size={20} />
                </span>
                {done ? (
                  <CheckCircle2 size={20} className="text-forest-600" />
                ) : (
                  <Circle size={20} className="text-charcoal-300" />
                )}
              </div>
              <h2 className="font-semibold">{topic.title}</h2>
              <p className="text-sm text-charcoal-500">{topic.shortDescription}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
