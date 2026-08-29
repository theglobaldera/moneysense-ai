import Link from "next/link";
import {
  ArrowRight,
  MessageCircleHeart,
  Calculator,
  GraduationCap,
  ShieldAlert,
  Sparkles,
  Lock,
  BookOpenCheck,
  Users,
  TrendingUp,
  Wallet,
  PiggyBank,
  Percent,
  HandCoins,
  Scale,
} from "lucide-react";
import SafetyNote from "@/components/SafetyNote";
import { scenarios } from "@/lib/content/scenarios";
import { topics } from "@/lib/content/topics";

const coreExperiences = [
  {
    icon: MessageCircleHeart,
    title: "Ask",
    prompt: "Have a money question?",
    body: "Ask MoneySense to explain financial concepts in simple language.",
    cta: "Ask a Question",
    href: "/ask",
  },
  {
    icon: Calculator,
    title: "Simulate",
    prompt: "Want to see the numbers?",
    body: "Explore savings and loan scenarios using real calculations.",
    cta: "Try Simulator",
    href: "/simulate",
  },
  {
    icon: GraduationCap,
    title: "Learn",
    prompt: "Test what you know.",
    body: "Take short financial-literacy quizzes and learn from your answers.",
    cta: "Take a Quiz",
    href: "/learn",
  },
  {
    icon: ShieldAlert,
    title: "Spot the Risk",
    prompt: "Something doesn't look right?",
    body: "Learn common warning signs associated with suspicious financial offers.",
    cta: "Learn About Scams",
    href: "/learn/scam-awareness",
  },
];

const howItWorks = [
  { number: "01", title: "Ask", body: "Tell MoneySense what you want to understand." },
  { number: "02", title: "Explore", body: "See examples, scenarios and calculations." },
  { number: "03", title: "Learn", body: "Test your knowledge and build financial confidence." },
];

const topicIcons: Record<string, typeof Wallet> = {
  budgeting: Wallet,
  saving: PiggyBank,
  interest: Percent,
  borrowing: HandCoins,
  "scam-awareness": ShieldAlert,
  debt: Scale,
};

const featuredTopics = topics.filter((t) =>
  ["saving", "budgeting", "interest", "borrowing", "scam-awareness"].includes(t.slug)
);

const featuredScenario = scenarios.find((s) => s.slug === "should-i-take-this-loan")!;

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="overflow-hidden bg-gradient-to-b from-forest-50 to-cream-50">
        <div className="container-page grid gap-10 py-14 lg:grid-cols-2 lg:items-center lg:py-20">
          <div>
            <span className="pill mb-4 gap-1.5">
              <Sparkles size={14} /> AI-powered financial literacy
            </span>
            <h1 className="text-4xl font-bold leading-tight text-charcoal-900 sm:text-5xl">
              Make money <span className="text-forest-600">make sense.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-charcoal-500">
              Understand money. Explore your choices. Learn before you decide.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/ask" className="btn-primary text-base">
                <MessageCircleHeart size={20} />
                Ask MoneySense
              </Link>
              <Link href="/scenarios" className="btn-secondary text-base">
                Explore Scenarios
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
            <div className="card relative z-10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-forest-600">
                <MessageCircleHeart size={14} /> Ask MoneySense
              </div>
              <p className="rounded-lg rounded-tl-none bg-forest-50 px-3 py-2 text-sm text-charcoal-700">
                &ldquo;What is compound interest?&rdquo;
              </p>
              <div className="space-y-1.5 rounded-lg rounded-tr-none bg-sage-50 px-3 py-2 text-sm text-charcoal-700">
                <p className="font-semibold text-forest-700">Simple Explanation</p>
                <p>You earn interest on your interest, not just your original savings.</p>
              </div>
            </div>

            <div className="card absolute -bottom-8 -right-4 z-20 w-56 space-y-2 sm:-right-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-600">
                <PiggyBank size={14} /> Savings Goal
              </div>
              <p className="text-2xl font-bold text-charcoal-900">₦200,000</p>
              <div className="h-2 w-full overflow-hidden rounded-full bg-sage-100">
                <div className="h-full w-3/5 rounded-full bg-forest-500" />
              </div>
              <p className="text-xs text-charcoal-500">~6 months at ₦30,000/month</p>
            </div>

            <div className="absolute -left-6 top-6 -z-10 hidden h-40 w-40 rounded-full bg-amber-400/20 blur-2xl sm:block" />
            <div className="absolute -right-10 bottom-0 -z-10 hidden h-48 w-48 rounded-full bg-forest-400/20 blur-2xl sm:block" />
          </div>
        </div>
      </section>

      {/* Core experiences */}
      <section className="py-16">
        <div className="container-page">
          <h2 className="text-2xl font-bold sm:text-3xl">What can I do?</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {coreExperiences.map(({ icon: Icon, title, prompt, body, cta, href }) => (
              <Link
                key={title}
                href={href}
                className="card group flex flex-col transition hover:-translate-y-1 hover:shadow-card"
              >
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                  <Icon size={22} />
                </span>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm font-medium text-charcoal-700">{prompt}</p>
                <p className="mt-2 flex-1 text-sm text-charcoal-500">{body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest-600 group-hover:gap-2">
                  {cta} <ArrowRight size={16} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Problem / value */}
      <section className="bg-white py-16">
        <div className="container-page max-w-3xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">
            Financial decisions shouldn&rsquo;t feel like guesswork.
          </h2>
          <p className="mt-4 text-lg text-charcoal-500">
            Young people encounter decisions about saving, spending, borrowing and managing
            income every day. But financial information can be confusing, technical, or
            difficult to apply to real situations.
          </p>
          <p className="mt-3 text-lg font-medium text-forest-700">
            MoneySense turns financial concepts into simple, practical learning experiences.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container-page">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">How it works</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {howItWorks.map((step) => (
              <div key={step.number} className="text-center">
                <span className="text-4xl font-bold text-forest-200">{step.number}</span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-charcoal-500">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured scenario */}
      <section className="bg-forest-800 py-16 text-white">
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="pill bg-white/10 text-white">Featured Scenario</span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">{featuredScenario.title}</h2>
            <p className="mt-3 text-forest-100">{featuredScenario.situation}</p>
            <Link href={`/scenarios/${featuredScenario.slug}`} className="btn-accent mt-6">
              Try a Scenario <ArrowRight size={18} />
            </Link>
          </div>
          <div className="card bg-white/95 text-charcoal-900">
            <p className="text-sm font-semibold text-forest-700">Under a simplified calculation</p>
            <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-charcoal-500">Amount borrowed</p>
                <p className="text-xl font-bold">₦100,000</p>
              </div>
              <div>
                <p className="text-charcoal-500">Cost of borrowing</p>
                <p className="text-xl font-bold text-amber-600">₦12,000</p>
              </div>
              <div>
                <p className="text-charcoal-500">Total repayment</p>
                <p className="text-xl font-bold">₦112,000</p>
              </div>
              <div>
                <p className="text-charcoal-500">Term</p>
                <p className="text-xl font-bold">6 months</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning topics */}
      <section className="py-16">
        <div className="container-page">
          <div className="flex items-end justify-between">
            <h2 className="text-2xl font-bold sm:text-3xl">Learning topics</h2>
            <Link href="/learn" className="hidden text-sm font-semibold text-forest-600 sm:inline-flex sm:items-center sm:gap-1">
              View all <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {featuredTopics.map((topic) => {
              const Icon = topicIcons[topic.slug] ?? BookOpenCheck;
              return (
                <Link
                  key={topic.slug}
                  href={`/learn/${topic.slug}`}
                  className="card flex flex-col items-start gap-3 transition hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sage-100 text-forest-700">
                    <Icon size={20} />
                  </span>
                  <h3 className="font-semibold">{topic.title}</h3>
                  <p className="text-sm text-charcoal-500">{topic.shortDescription}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Responsible AI */}
      <section className="bg-sage-50 py-16">
        <div className="container-page">
          <h2 className="text-2xl font-bold sm:text-3xl">Responsible AI</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: GraduationCap,
                title: "Financial education",
                body: "MoneySense explains concepts and trade-offs — it never tells you what to do with your money.",
              },
              {
                icon: BookOpenCheck,
                title: "Reliable information",
                body: "Explanations are grounded in well-established financial-literacy concepts, not speculation.",
              },
              {
                icon: Calculator,
                title: "Real calculations",
                body: "Every number you see is produced by programmed formulas, not AI-generated arithmetic.",
              },
              {
                icon: Lock,
                title: "Privacy by design",
                body: "No account or sensitive financial data is required to use MoneySense's educational features.",
              },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="card">
                <Icon size={22} className="text-forest-600" />
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-charcoal-500">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social impact */}
      <section className="py-16">
        <div className="container-page grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="pill gap-1.5"><Users size={14} /> Social Impact</span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Built for young people building financial confidence.
            </h2>
            <p className="mt-4 text-charcoal-500">
              MoneySense AI is designed for students, young earners, freelancers, and first-time
              borrowers — people who understand they need to manage money better but lack easy
              access to practical financial education that fits their everyday reality.
            </p>
          </div>
          <div className="card flex items-center gap-4">
            <TrendingUp size={32} className="shrink-0 text-forest-600" />
            <p className="text-sm text-charcoal-700">
              The goal isn&rsquo;t to tell you what to do with your money — it&rsquo;s to help you
              say, <span className="font-semibold text-forest-700">&ldquo;Now I understand what I&rsquo;m dealing with.&rdquo;</span>
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-forest-600 py-16 text-white">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to make money make sense?</h2>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/ask" className="btn-accent">
              <MessageCircleHeart size={18} /> Ask MoneySense
            </Link>
            <Link href="/learn" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              Start Learning <ArrowRight size={18} />
            </Link>
          </div>
          <SafetyNote className="max-w-xl border-white/20 bg-white/10 text-white [&_svg]:text-amber-300" />
        </div>
      </section>
    </>
  );
}
