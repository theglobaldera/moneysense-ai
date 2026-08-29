// Progress is stored entirely in the browser (localStorage). No accounts, no
// backend, no personal data — by design, per the MVP scope decision.

import { topicOrder } from "./content/topics";

const STORAGE_KEY = "moneysense_progress_v1";

export interface QuizAttempt {
  topicSlug: string;
  score: number;
  total: number;
  completedAt: string;
}

export interface ProgressState {
  completedTopics: string[];
  quizAttempts: QuizAttempt[];
  exploredScenarios: string[];
}

const EMPTY_STATE: ProgressState = {
  completedTopics: [],
  quizAttempts: [],
  exploredScenarios: [],
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function getProgress(): ProgressState {
  if (!isBrowser()) return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw);
    return {
      completedTopics: Array.isArray(parsed.completedTopics) ? parsed.completedTopics : [],
      quizAttempts: Array.isArray(parsed.quizAttempts) ? parsed.quizAttempts : [],
      exploredScenarios: Array.isArray(parsed.exploredScenarios) ? parsed.exploredScenarios : [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

function saveProgress(state: ProgressState) {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — fail silently,
    // the app remains fully usable without persisted progress.
  }
}

export function recordQuizAttempt(topicSlug: string, score: number, total: number): ProgressState {
  const state = getProgress();
  const withoutPrevious = state.quizAttempts.filter((a) => a.topicSlug !== topicSlug);
  const next: ProgressState = {
    ...state,
    quizAttempts: [
      ...withoutPrevious,
      { topicSlug, score, total, completedAt: new Date().toISOString() },
    ],
    completedTopics: state.completedTopics.includes(topicSlug)
      ? state.completedTopics
      : [...state.completedTopics, topicSlug],
  };
  saveProgress(next);
  return next;
}

export function recordScenarioExplored(scenarioSlug: string): ProgressState {
  const state = getProgress();
  if (state.exploredScenarios.includes(scenarioSlug)) return state;
  const next: ProgressState = {
    ...state,
    exploredScenarios: [...state.exploredScenarios, scenarioSlug],
  };
  saveProgress(next);
  return next;
}

export interface ProgressStats {
  topicsExplored: number;
  totalTopics: number;
  quizzesCompleted: number;
  quizAccuracyPercent: number | null;
  scenariosExplored: number;
  nextTopicSlug: string | null;
}

export function computeStats(state: ProgressState): ProgressStats {
  const totalCorrect = state.quizAttempts.reduce((sum, a) => sum + a.score, 0);
  const totalQuestions = state.quizAttempts.reduce((sum, a) => sum + a.total, 0);
  const nextTopicSlug =
    topicOrder.find((slug) => !state.completedTopics.includes(slug)) ?? null;

  return {
    topicsExplored: state.completedTopics.length,
    totalTopics: topicOrder.length,
    quizzesCompleted: state.quizAttempts.length,
    quizAccuracyPercent:
      totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : null,
    scenariosExplored: state.exploredScenarios.length,
    nextTopicSlug,
  };
}

export function hasAnyProgress(state: ProgressState): boolean {
  return (
    state.completedTopics.length > 0 ||
    state.quizAttempts.length > 0 ||
    state.exploredScenarios.length > 0
  );
}
