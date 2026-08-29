import Link from "next/link";
import { ArrowRight, PiggyBank, HandCoins, Wallet, ShieldAlert } from "lucide-react";
import { scenarios } from "@/lib/content/scenarios";

const ICONS = [PiggyBank, HandCoins, Wallet, ShieldAlert];

export const metadata = {
  title: "Scenarios — MoneySense AI",
};

export default function ScenariosPage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">Explore real money situations.</h1>
        <p className="mt-3 text-charcoal-500">
          Learning money concepts is easier when you can see how they apply to everyday life.
        </p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {scenarios.map((scenario, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <Link
              key={scenario.slug}
              href={`/scenarios/${scenario.slug}`}
              className="card group flex flex-col transition hover:-translate-y-1 hover:shadow-card"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                  <Icon size={22} />
                </span>
                <span className="text-xs font-semibold text-charcoal-300">Scenario {scenario.number}</span>
              </div>
              <h2 className="mt-4 text-lg font-semibold">{scenario.title}</h2>
              <p className="mt-2 flex-1 text-sm text-charcoal-500">{scenario.teaser}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-forest-600 group-hover:gap-2">
                Explore <ArrowRight size={16} />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
