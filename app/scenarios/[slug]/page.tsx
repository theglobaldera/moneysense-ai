import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getScenarioBySlug, scenarios } from "@/lib/content/scenarios";
import ScenarioFlow from "@/components/scenarios/ScenarioFlow";

export function generateStaticParams() {
  return scenarios.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const scenario = getScenarioBySlug(params.slug);
  return { title: scenario ? `${scenario.title} — MoneySense AI` : "Scenario — MoneySense AI" };
}

export default function ScenarioDetailPage({ params }: { params: { slug: string } }) {
  const scenario = getScenarioBySlug(params.slug);
  if (!scenario) notFound();

  return (
    <div className="container-page max-w-2xl py-10">
      <Link href="/scenarios" className="inline-flex items-center gap-1 text-sm font-medium text-forest-600 hover:underline">
        <ChevronLeft size={16} /> Back to Scenarios
      </Link>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-charcoal-300">
        Scenario {scenario.number}
      </p>
      <h1 className="mt-1 text-3xl font-bold">{scenario.title}</h1>

      <ScenarioFlow scenario={scenario} />
    </div>
  );
}
