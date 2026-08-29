"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { PiggyBank, HandCoins } from "lucide-react";
import SavingsSimulator from "./SavingsSimulator";
import LoanSimulator from "./LoanSimulator";

type Tab = "savings" | "loan";

export default function SimulateTabs() {
  const searchParams = useSearchParams();
  const initialTab: Tab = searchParams.get("tab") === "loan" ? "loan" : "savings";
  const [tab, setTab] = useState<Tab>(initialTab);

  return (
    <div className="mt-10">
      <div className="mx-auto flex w-full max-w-xs rounded-full bg-forest-100 p-1" role="tablist">
        <TabButton active={tab === "savings"} onClick={() => setTab("savings")} icon={PiggyBank} label="Savings" />
        <TabButton active={tab === "loan"} onClick={() => setTab("loan")} icon={HandCoins} label="Loan" />
      </div>

      <div className="mx-auto mt-8 max-w-4xl" role="tabpanel">
        {tab === "savings" ? <SavingsSimulator /> : <LoanSimulator />}
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  icon: Icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: typeof PiggyBank;
  label: string;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2 text-sm font-semibold transition ${
        active ? "bg-white text-forest-700 shadow-soft" : "text-charcoal-500"
      }`}
    >
      <Icon size={16} /> {label}
    </button>
  );
}
