"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, Map, Target, HelpCircle, PieChart, Sparkles } from "lucide-react";
import { topics, getTopicBySlug } from "@/lib/content/topics";
import { getProgress, computeStats, hasAnyProgress, type ProgressState } from "@/lib/progress";

export default function ProgressPage() {
  const [state, setState] = useState<ProgressState | null>(null);

  useEffect(() => {
    setState(getProgress());
  }, []);

  if (!state) return null;

  if (!hasAnyProgress(state)) {
    return (
      <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <Map size={40} className="text-forest-300" />
        <h1 className="mt-4 text-2xl font-bold">Your journey starts here.</h1>
        <p className="mt-2 max-w-md text-charcoal-500">
          Complete your first quiz or explore a scenario to begin tracking your learning.
        </p>
        <Link href="/learn" className="btn-primary mt-6">
          Start Learning <ArrowRight size={16} />
        </Link>
      </div>
    );
  }

  const stats = computeStats(state);
  const nextTopic = stats.nextTopicSlug ? getTopicBySlug(stats.nextTopicSlug) : null;

  return (
    <div className="container-page max-w-2xl py-12">
      <h1 className="text-3xl font-bold">Your MoneySense Journey</h1>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={Target} label="Topics explored" value={`${stats.topicsExplored}/${stats.totalTopics}`} />
        <StatCard icon={HelpCircle} label="Quizzes completed" value={String(stats.quizzesCompleted)} />
        <StatCard
          icon={PieChart}
          label="Quiz accuracy"
          value={stats.quizAccuracyPercent !== null ? `${stats.quizAccuracyPercent}%` : "—"}
        />
        <StatCard icon={Sparkles} label="Scenarios explored" value={String(stats.scenariosExplored)} />
      </div>

      <div className="card mt-8">
        <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-300">Learning map</p>
        <ul className="mt-3 space-y-2.5">
          {topics.map((topic) => {
            const done = state.completedTopics.includes(topic.slug);
            return (
              <li key={topic.slug}>
                <Link
                  href={`/learn/${topic.slug}`}
                  className="flex items-center gap-2.5 text-sm font-medium text-charcoal-700 hover:text-forest-700"
                >
                  {done ? (
                    <CheckCircle2 size={18} className="text-forest-600" />
                  ) : (
                    <Circle size={18} className="text-charcoal-300" />
                  )}
                  {topic.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {nextTopic && (
        <div className="card mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-300">Recommended next</p>
            <p className="mt-1 font-semibold text-charcoal-900">Learn about {nextTopic.title}</p>
            <p className="text-sm text-charcoal-500">{nextTopic.shortDescription}</p>
          </div>
          <Link href={`/learn/${nextTopic.slug}`} className="btn-primary shrink-0">
            Continue <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Target; label: string; value: string }) {
  return (
    <div className="card items-start gap-1 text-left">
      <Icon size={18} className="text-forest-600" />
      <p className="mt-2 text-2xl font-bold text-charcoal-900">{value}</p>
      <p className="text-xs text-charcoal-500">{label}</p>
    </div>
  );
}
