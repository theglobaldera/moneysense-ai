"use client";

import { useState } from "react";
import { Loader2, PiggyBank } from "lucide-react";
import {
  calculateSavingsPlan,
  formatNaira,
  validatePositiveNumber,
  type Frequency,
  type SavingsResult,
} from "@/lib/finance";
import Field from "./Field";

interface FormState {
  goal: string;
  current: string;
  contribution: string;
  frequency: Frequency;
  interestRate: string;
}

const INITIAL: FormState = {
  goal: "200000",
  current: "20000",
  contribution: "30000",
  frequency: "monthly",
  interestRate: "",
};

export default function SavingsSimulator() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [result, setResult] = useState<SavingsResult | null>(null);
  const [calculating, setCalculating] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: Partial<Record<keyof FormState, string>> = {
      goal: validatePositiveNumber(form.goal, { min: 1, label: "Savings goal" }) ?? undefined,
      current: validatePositiveNumber(form.current, { required: false, label: "Current savings" }) ?? undefined,
      contribution: validatePositiveNumber(form.contribution, { min: 0, label: "Regular contribution" }) ?? undefined,
      interestRate: validatePositiveNumber(form.interestRate, { required: false, label: "Interest rate" }) ?? undefined,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      setResult(null);
      return;
    }

    setCalculating(true);
    setTimeout(() => {
      const plan = calculateSavingsPlan({
        goal: Number(form.goal),
        current: Number(form.current || 0),
        contribution: Number(form.contribution || 0),
        frequency: form.frequency,
        annualInterestRatePercent: form.interestRate ? Number(form.interestRate) : 0,
      });
      setResult(plan);
      setCalculating(false);
    }, 300);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={handleCalculate} className="card space-y-4">
        <Field label="Savings goal" prefix="₦" value={form.goal} onChange={(v) => update("goal", v)} error={errors.goal} />
        <Field label="Current savings" prefix="₦" value={form.current} onChange={(v) => update("current", v)} error={errors.current} />
        <Field
          label="Regular contribution"
          prefix="₦"
          value={form.contribution}
          onChange={(v) => update("contribution", v)}
          error={errors.contribution}
        />

        <div>
          <label className="field-label" htmlFor="savings-frequency">Frequency</label>
          <select
            id="savings-frequency"
            className="field-input"
            value={form.frequency}
            onChange={(e) => update("frequency", e.target.value as Frequency)}
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
          </select>
        </div>

        <Field
          label="Interest rate (optional, annual %)"
          suffix="%"
          value={form.interestRate}
          onChange={(v) => update("interestRate", v)}
          error={errors.interestRate}
          required={false}
        />

        <button type="submit" disabled={calculating} className="btn-primary w-full">
          {calculating ? <Loader2 size={18} className="animate-spin" /> : null}
          Calculate
        </button>
      </form>

      <div>
        {!result && !calculating && (
          <div className="card flex h-full flex-col items-center justify-center gap-3 text-center text-charcoal-500">
            <PiggyBank size={32} className="text-forest-300" />
            <p>Enter your savings details and calculate to see your results here.</p>
          </div>
        )}

        {calculating && (
          <div className="card flex h-full flex-col items-center justify-center gap-2 text-charcoal-500">
            <Loader2 size={24} className="animate-spin text-forest-500" />
            Calculating...
          </div>
        )}

        {result && !calculating && <SavingsResultCard result={result} contribution={Number(form.contribution || 0)} goal={Number(form.goal)} />}
      </div>
    </div>
  );
}

function SavingsResultCard({
  result,
  contribution,
  goal,
}: {
  result: SavingsResult;
  contribution: number;
  goal: number;
}) {
  if (!result.reached) {
    return (
      <div className="card space-y-2">
        <p className="font-semibold text-charcoal-900">This goal isn&rsquo;t reachable with these numbers.</p>
        <p className="text-sm text-charcoal-500">
          Try increasing your regular contribution, or adding a starting amount, so MoneySense can estimate a realistic timeline.
        </p>
      </div>
    );
  }

  const unit = result.frequency === "monthly" ? "month" : "week";
  const timeLabel =
    result.periodsNeeded === 0
      ? "You've already reached this goal!"
      : `${result.periodsNeeded} ${unit}${result.periodsNeeded === 1 ? "" : "s"}`;

  const maxValue = Math.max(goal, ...result.progressSeries);

  return (
    <div className="card space-y-5">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-forest-600">
          Estimated time to reach your goal
        </p>
        <p className="mt-1 text-3xl font-bold text-charcoal-900">{timeLabel}</p>
      </div>

      {result.periodsNeeded > 0 && (
        <p className="text-sm text-charcoal-700">
          At your current contribution of {formatNaira(contribution)} per {unit}, you would need
          approximately {timeLabel} to reach your goal of {formatNaira(goal)}
          {result.interestEarned > 0 ? `, including about ${formatNaira(result.interestEarned)} in estimated interest` : ""}.
        </p>
      )}

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-charcoal-300">Progress toward goal</p>
        <div className="flex h-24 items-end gap-1">
          {result.progressSeries.map((value, i) => (
            <div
              key={i}
              className="flex-1 rounded-t bg-forest-400"
              style={{ height: `${Math.max(4, (value / maxValue) * 100)}%` }}
              title={formatNaira(value)}
            />
          ))}
        </div>
      </div>

      <dl className="grid grid-cols-2 gap-4 border-t border-forest-100 pt-4 text-sm">
        <div>
          <dt className="text-charcoal-500">Total contributed</dt>
          <dd className="font-semibold text-charcoal-900">{formatNaira(result.totalContributed)}</dd>
        </div>
        <div>
          <dt className="text-charcoal-500">Projected total</dt>
          <dd className="font-semibold text-charcoal-900">{formatNaira(result.projectedTotal)}</dd>
        </div>
      </dl>
    </div>
  );
}
