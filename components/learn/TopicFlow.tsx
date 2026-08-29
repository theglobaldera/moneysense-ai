"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  Lightbulb,
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Trophy,
} from "lucide-react";
import type { Topic } from "@/lib/content/topics";
import { getTopicBySlug, topicOrder } from "@/lib/content/topics";
import { recordQuizAttempt } from "@/lib/progress";

type Step = "intro" | "quiz" | "complete";

export default function TopicFlow({ topic }: { topic: Topic }) {
  const [step, setStep] = useState<Step>("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const recorded = useRef(false);

  const question = topic.quiz[questionIndex];
  const isLastQuestion = questionIndex === topic.quiz.length - 1;

  useEffect(() => {
    setStep("intro");
    setQuestionIndex(0);
    setSelectedOptionId(null);
    setScore(0);
    recorded.current = false;
  }, [topic.slug]);

  useEffect(() => {
    if (step === "complete" && !recorded.current) {
      recordQuizAttempt(topic.slug, score, topic.quiz.length);
      recorded.current = true;
    }
  }, [step, score, topic.slug, topic.quiz.length]);

  function selectOption(optionId: string) {
    if (selectedOptionId) return;
    setSelectedOptionId(optionId);
    if (optionId === question.correctOptionId) setScore((s) => s + 1);
  }

  function nextQuestion() {
    if (isLastQuestion) {
      setStep("complete");
      return;
    }
    setQuestionIndex((i) => i + 1);
    setSelectedOptionId(null);
  }

  if (step === "intro") {
    return (
      <motion.div
        className="mt-6 space-y-5"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="card">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-forest-600">
            <Lightbulb size={14} /> Simple Explanation
          </div>
          <p className="mt-2 text-charcoal-700">{topic.intro}</p>
        </div>
        <div className="card">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-forest-600">
            <Sparkles size={14} /> Real-Life Example
          </div>
          <p className="mt-2 text-charcoal-700">{topic.example}</p>
        </div>
        <button onClick={() => setStep("quiz")} className="btn-primary w-full sm:w-auto">
          Start Quick Check <ArrowRight size={16} />
        </button>
      </motion.div>
    );
  }

  if (step === "quiz") {
    const isCorrect = selectedOptionId === question.correctOptionId;
    return (
      <div className="mt-6 space-y-5">
        <p className="text-sm font-medium text-charcoal-500">
          Question {questionIndex + 1} of {topic.quiz.length}
        </p>
        <AnimatePresence mode="wait">
          <motion.div
            key={questionIndex}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
          >
            <div className="card">
              <h2 className="text-lg font-semibold">{question.question}</h2>
              <div className="mt-4 grid gap-2.5">
                {question.options.map((option) => {
                  const selected = selectedOptionId === option.id;
                  const showCorrect = selectedOptionId && option.id === question.correctOptionId;
                  const showIncorrect = selected && !isCorrect;
                  return (
                    <motion.button
                      key={option.id}
                      onClick={() => selectOption(option.id)}
                      disabled={Boolean(selectedOptionId)}
                      whileHover={!selectedOptionId ? { y: -2 } : undefined}
                      whileTap={!selectedOptionId ? { scale: 0.98 } : undefined}
                      className={`flex items-center justify-between rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                        showCorrect
                          ? "border-forest-500 bg-forest-50 text-forest-800"
                          : showIncorrect
                          ? "border-red-300 bg-red-50 text-red-800"
                          : "border-charcoal-300/30 text-charcoal-700 hover:border-forest-300"
                      } ${selectedOptionId ? "cursor-default" : "cursor-pointer"}`}
                    >
                      {option.label}
                      {showCorrect && <CheckCircle2 size={18} className="shrink-0 text-forest-600" />}
                      {showIncorrect && <XCircle size={18} className="shrink-0 text-red-600" />}
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence>
                {selectedOptionId && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.25 }}
                    className={`mt-4 overflow-hidden rounded-lg p-4 text-sm ${isCorrect ? "bg-forest-50 text-forest-800" : "bg-amber-400/10 text-charcoal-700"}`}
                  >
                    <p className="font-semibold">{isCorrect ? "Correct." : "Not quite."}</p>
                    <p className="mt-1">{question.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {selectedOptionId && (
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                onClick={nextQuestion}
                className="btn-primary mt-5"
              >
                {isLastQuestion ? "See Results" : "Next Question"} <ArrowRight size={16} />
              </motion.button>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  const nextTopicSlug = topicOrder[(topicOrder.indexOf(topic.slug) + 1) % topicOrder.length];
  const nextTopic = getTopicBySlug(nextTopicSlug);
  const percent = Math.round((score / topic.quiz.length) * 100);

  return (
    <motion.div
      className="mt-6 space-y-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="card items-center text-center">
        <motion.div
          initial={{ scale: 0, rotate: -15 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 15, delay: 0.1 }}
        >
          <Trophy size={32} className="mx-auto text-amber-500" />
        </motion.div>
        <p className="mt-3 text-3xl font-bold text-charcoal-900">
          {score} / {topic.quiz.length}
        </p>
        <p className="mt-1 text-charcoal-500">You scored {percent}% on {topic.title}.</p>
      </div>

      {nextTopic && (
        <div className="card flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
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

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link href="/learn" className="btn-secondary">Back to Learn</Link>
        <Link href="/progress" className="btn-secondary">View Progress</Link>
      </div>
    </motion.div>
  );
}
