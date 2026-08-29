"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, HandCoins } from "lucide-react";
import {
  calculateLoanPlan,
  formatNaira,
  formatNumber,
  unitLabel,
  validatePositiveNumber,
  type Frequency,
  type LoanResult,
} from "@/lib/finance";
import Field from "./Field";

interface FormState {
  principal: string;
  rate: string;
  termMonths: string;
  frequency: Frequency;
}

const INITIAL: FormState = {
  principal: "100000",
  rate: "24",
  termMonths: "6",
  frequency: "monthly",
};

export default function LoanSimulator() {
  const [form, setForm] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [result, setResult] = useState<LoanResult | null>(null);
  const [calculating, setCalculating] = useState(false);
  const [resultKey, setResultKey] = useState(0);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleCalculate(e: React.FormEvent) {
    e.preventDefault();

    const newErrors: Partial<Record<keyof FormState, string>> = {
      principal: validatePositiveNumber(form.principal, { min: 1, label: "Amount borrowed" }) ?? undefined,
      rate: validatePositiveNumber(form.rate, { min: 0, label: "Interest rate" }) ?? undefined,
      termMonths: validatePositiveNumber(form.termMonths, { min: 1, label: "Repayment period" }) ?? undefined,
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some(Boolean)) {
      setResult(null);
      return;
    }

    setCalculating(true);
    setTimeout(() => {
      const plan = calculateLoanPlan({
        principal: Number(form.principal),
        annualRatePercent: Number(form.rate),
        termMonths: Number(form.termMonths),
        frequency: form.frequency,
      });
      setResult(plan);
      setCalculating(false);
      setResultKey((k) => k + 1);
    }, 300);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <form onSubmit={handleCalculate} className="card space-y-4">
        <Field label="Amount borrowed" prefix="₦" value={form.principal} onChange={(v) => update("principal", v)} error={errors.principal} />
        <Field label="Interest rate (annual %)" suffix="%" value={form.rate} onChange={(v) => update("rate", v)} error={errors.rate} />
        <Field label="Repayment period (months)" value={form.termMonths} onChange={(v) => update("termMonths", v)} error={errors.termMonths} />

        <div>
          <label className="field-label" htmlFor="loan-frequency">Repayment frequency</label>
          <select
            id="loan-frequency"
            className="field-input"
            value={form.frequency}
            onChange={(e) => update("frequency", e.target.value as Frequency)}
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="annually">Annually</option>
          </select>
        </div>

        <button type="submit" disabled={calculating} className="btn-primary w-full">
          {calculating ? <Loader2 size={18} className="animate-spin" /> : null}
          Calculate
        </button>
      </form>

      <div>
        <AnimatePresence mode="wait">
          {!result && !calculating && (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card flex h-full flex-col items-center justify-center gap-3 text-center text-charcoal-500"
            >
              <HandCoins size={32} className="text-forest-300" />
              <p>Enter your loan details and calculate to see the true cost of borrowing.</p>
            </motion.div>
          )}

          {calculating && (
            <motion.div
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card flex h-full flex-col items-center justify-center gap-2 text-charcoal-500"
            >
              <Loader2 size={24} className="animate-spin text-forest-500" />
              Calculating...
            </motion.div>
          )}

          {result && !calculating && (
            <motion.div
              key={resultKey}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <LoanResultCard result={result} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LoanResultCard({ result }: { result: LoanResult }) {
  const unit = unitLabel(result.frequency, result.numberOfInstallments);
  const singularUnit = unitLabel(result.frequency, 1);

  return (
    <div className="card space-y-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-forest-600">
        Estimated results (simplified calculation)
      </p>

      <dl className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="text-charcoal-500">Amount borrowed</dt>
          <dd className="text-xl font-bold text-charcoal-900">{formatNaira(result.principal)}</dd>
        </div>
        <div>
          <dt className="text-charcoal-500">Estimated interest</dt>
          <dd className="text-xl font-bold text-amber-600">{formatNaira(result.totalInterest)}</dd>
        </div>
        <div>
          <dt className="text-charcoal-500">Estimated total repayment</dt>
          <dd className="text-xl font-bold text-charcoal-900">{formatNaira(result.totalRepayment)}</dd>
        </div>
        <div>
          <dt className="text-charcoal-500">Cost of borrowing</dt>
          <dd className="text-xl font-bold text-amber-600">
            {formatNaira(result.totalInterest)}{" "}
            <span className="text-sm font-medium text-charcoal-500">
              ({formatNumber(result.costOfBorrowingPercent)}%)
            </span>
          </dd>
        </div>
      </dl>

      <p className="border-t border-forest-100 pt-4 text-sm text-charcoal-700">
        You would repay approximately {formatNaira(result.totalInterest)} more than the amount
        originally borrowed under this simplified calculation — about {formatNaira(result.installmentAmount)}{" "}
        per {singularUnit} across {result.numberOfInstallments} {unit}.
      </p>

      <p className="text-xs text-charcoal-300">
        This is a simplified, education-only estimate using a flat-interest calculation. Real
        lenders may calculate interest differently — always check a lender&rsquo;s exact terms
        before borrowing.
      </p>
    </div>
  );
}
