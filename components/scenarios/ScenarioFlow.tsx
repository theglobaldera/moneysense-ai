"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";
import type { Scenario } from "@/lib/content/scenarios";
import { recordScenarioExplored } from "@/lib/progress";

export default function ScenarioFlow({ scenario }: { scenario: Scenario }) {
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedChoiceId) recordScenarioExplored(scenario.slug);
  }, [selectedChoiceId, scenario.slug]);

  const outcome = selectedChoiceId ? scenario.outcomes[selectedChoiceId] : null;

  return (
    <div className="mt-6 space-y-6">
      <div className="card">
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-600">Situation</p>
        <p className="mt-2 text-charcoal-700">{scenario.situation}</p>
      </div>

      <AnimatePresence mode="wait">
        {!outcome ? (
          <motion.div
            key="choices"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-lg font-semibold">{scenario.choicePrompt}</h2>
            <div className="mt-4 grid gap-3">
              {scenario.choices.map((choice, i) => (
                <motion.button
                  key={choice.id}
                  onClick={() => setSelectedChoiceId(choice.id)}
                  className="card text-left"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.06 }}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="font-semibold text-charcoal-900">{choice.label}</p>
                  <p className="mt-1 text-sm text-charcoal-500">{choice.description}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="outcome"
            className="space-y-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <div className="card border-forest-200 bg-forest-50">
              <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-forest-700">
                <CheckCircle2 size={14} /> Outcome
              </div>
              <p className="mt-2 text-charcoal-900">{outcome.outcome}</p>
            </div>

            <div className="card">
              <p className="text-xs font-semibold uppercase tracking-wide text-charcoal-300">Explanation</p>
              <p className="mt-2 text-sm text-charcoal-700">{outcome.explanation}</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button
                onClick={() => setSelectedChoiceId(null)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-500 hover:text-forest-700"
              >
                <RotateCcw size={15} /> Try a different choice
              </button>
              <Link href={scenario.nextStepHref} className="btn-primary">
                {scenario.nextStepLabel} <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
