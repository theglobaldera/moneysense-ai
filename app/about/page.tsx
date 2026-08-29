import { CheckCircle2, XCircle, BookMarked, Lock } from "lucide-react";
import SafetyNote from "@/components/SafetyNote";

export const metadata = {
  title: "About / Safety — MoneySense AI",
};

const CAN_DO = [
  "Explain financial concepts in simple language",
  "Generate relatable examples",
  "Help users explore financial scenarios",
  "Provide educational feedback on quizzes",
  "Support financial-literacy learning",
];

const CANNOT_DO = [
  "Give professional financial advice",
  "Guarantee financial outcomes",
  "Predict investment returns",
  "Recommend specific investments, lenders, or products",
  "Replace a qualified financial professional",
];

export default function AboutPage() {
  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="text-3xl font-bold sm:text-4xl">About MoneySense</h1>
      <p className="mt-4 text-charcoal-500">
        MoneySense AI is an AI-powered financial literacy assistant designed to help young
        people — particularly young Nigerians aged 16-25 — understand everyday financial
        concepts and make more informed decisions about money. It combines conversational AI
        with practical financial tools and interactive learning experiences.
      </p>
      <p className="mt-3 text-charcoal-500">
        It exists because financial literacy isn&rsquo;t just about knowing definitions — a person
        can know what a loan or interest rate is and still struggle when facing a real decision.
        MoneySense is built around the situations young people actually encounter: budgeting an
        irregular income, understanding interest, evaluating borrowing costs, and identifying
        financial scams.
      </p>

      <h2 id="how-it-works" className="mt-12 scroll-mt-20 text-2xl font-bold">How MoneySense Works</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="card">
          <h3 className="font-semibold text-forest-700">AI</h3>
          <p className="mt-1 text-sm text-charcoal-500">
            Handles explanations, conversation, examples, and learning guidance.
          </p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-forest-700">Code</h3>
          <p className="mt-1 text-sm text-charcoal-500">
            Handles every financial calculation — savings timelines, loan costs — using
            programmed formulas, never AI-generated arithmetic.
          </p>
        </div>
        <div className="card">
          <h3 className="font-semibold text-forest-700">Information sources</h3>
          <p className="mt-1 text-sm text-charcoal-500">
            Grounds explanations in well-established, factual financial-literacy concepts.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="card">
          <div className="flex items-center gap-2 font-semibold text-forest-700">
            <CheckCircle2 size={18} /> What MoneySense Can Do
          </div>
          <ul className="mt-3 space-y-2 text-sm text-charcoal-700">
            {CAN_DO.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-forest-500" /> {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <div className="flex items-center gap-2 font-semibold text-red-700">
            <XCircle size={18} /> What MoneySense Cannot Do
          </div>
          <ul className="mt-3 space-y-2 text-sm text-charcoal-700">
            {CANNOT_DO.map((item) => (
              <li key={item} className="flex items-start gap-2">
                <XCircle size={15} className="mt-0.5 shrink-0 text-red-500" /> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h2 id="sources" className="mt-12 scroll-mt-20 text-2xl font-bold">Information Sources</h2>
      <div className="card mt-5">
        <div className="flex items-center gap-2 font-semibold text-charcoal-900">
          <BookMarked size={18} className="text-forest-600" /> Grounding for financial concepts
        </div>
        <p className="mt-2 text-sm text-charcoal-500">
          MoneySense&rsquo;s explanations of core concepts (budgeting, saving, interest,
          borrowing, debt, and common scam patterns) are based on widely accepted, general
          financial-literacy principles — the same fundamentals taught by consumer-protection
          and financial-education bodies. All numerical results (savings timelines, loan costs)
          are calculated in code using standard, disclosed formulas rather than sourced from any
          external data feed. MoneySense does not pull live market data, interest rates, or
          investment information from third parties, and does not claim to reflect any specific
          bank, lender, or product&rsquo;s actual terms.
        </p>
      </div>

      <h2 id="safety" className="mt-12 scroll-mt-20 text-2xl font-bold">Privacy</h2>
      <div className="card mt-5">
        <div className="flex items-center gap-2 font-semibold text-charcoal-900">
          <Lock size={18} className="text-forest-600" /> What we collect
        </div>
        <p className="mt-2 text-sm text-charcoal-500">
          MoneySense does not require an account, and does not require users to provide sensitive
          financial information to use its educational features. Learning progress (topics
          completed, quiz scores, scenarios explored) is stored only in your own browser using
          localStorage — it is never sent to a server or shared, and clearing your browser data
          will reset it. Questions you ask MoneySense are sent to our AI provider to generate a
          response, and are not linked to any personal identity.
        </p>
      </div>

      <SafetyNote className="mt-10" />
    </div>
  );
}
