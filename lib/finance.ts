// All financial math lives here as plain functions — never delegated to the AI.
// Every formula is intentionally simplified for financial-literacy purposes and
// labelled as such in the UI; it is not a substitute for a bank's exact terms.

export type Frequency = "daily" | "weekly" | "monthly" | "annually";

export function formatNaira(amount: number): string {
  if (!Number.isFinite(amount)) return "₦0";
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-NG", { maximumFractionDigits: 1 }).format(n);
}

export const PERIODS_PER_YEAR: Record<Frequency, number> = {
  daily: 365,
  weekly: 52,
  monthly: 12,
  annually: 1,
};

export const FREQUENCY_LABEL: Record<Frequency, string> = {
  daily: "Daily",
  weekly: "Weekly",
  monthly: "Monthly",
  annually: "Annually",
};

export const FREQUENCY_UNIT: Record<Frequency, string> = {
  daily: "day",
  weekly: "week",
  monthly: "month",
  annually: "year",
};

export function unitLabel(frequency: Frequency, count: number): string {
  const unit = FREQUENCY_UNIT[frequency];
  return `${unit}${count === 1 ? "" : "s"}`;
}

const MAX_YEARS = 100;

export interface SavingsInput {
  goal: number;
  current: number;
  contribution: number;
  frequency: Frequency;
  annualInterestRatePercent?: number;
}

export interface SavingsResult {
  reached: boolean;
  periodsNeeded: number;
  frequency: Frequency;
  monthsNeeded: number;
  totalContributed: number;
  interestEarned: number;
  projectedTotal: number;
  /** Balance at the end of each period, capped for charting (max ~25 points). */
  progressSeries: number[];
}

export function calculateSavingsPlan(input: SavingsInput): SavingsResult {
  const { goal, current, contribution, frequency } = input;
  const periodsPerYear = PERIODS_PER_YEAR[frequency];
  const maxPeriods = MAX_YEARS * periodsPerYear;
  const annualRate = input.annualInterestRatePercent ?? 0;
  const periodicRate = annualRate / 100 / periodsPerYear;

  let balance = current;
  let totalContributed = 0;
  let periods = 0;
  const series: number[] = [balance];

  if (balance >= goal) {
    return {
      reached: true,
      periodsNeeded: 0,
      frequency,
      monthsNeeded: 0,
      totalContributed: 0,
      interestEarned: 0,
      projectedTotal: balance,
      progressSeries: series,
    };
  }

  if (contribution <= 0 && periodicRate <= 0) {
    return {
      reached: false,
      periodsNeeded: maxPeriods,
      frequency,
      monthsNeeded: Math.round(maxPeriods * (12 / periodsPerYear)),
      totalContributed: 0,
      interestEarned: 0,
      projectedTotal: balance,
      progressSeries: series,
    };
  }

  while (balance < goal && periods < maxPeriods) {
    const interest = balance * periodicRate;
    balance += interest + contribution;
    totalContributed += contribution;
    periods += 1;
    series.push(balance);
  }

  const monthsNeeded = Math.round(periods * (12 / periodsPerYear));

  return {
    reached: periods < maxPeriods,
    periodsNeeded: periods,
    frequency,
    monthsNeeded,
    totalContributed,
    interestEarned: Math.max(0, balance - current - totalContributed),
    projectedTotal: balance,
    progressSeries: series.length > 25
      ? series.filter((_, i) => i % Math.ceil(series.length / 25) === 0)
      : series,
  };
}

export interface LoanInput {
  principal: number;
  annualRatePercent: number;
  termMonths: number;
  frequency: Frequency;
}

export interface LoanResult {
  principal: number;
  totalInterest: number;
  totalRepayment: number;
  numberOfInstallments: number;
  installmentAmount: number;
  frequency: Frequency;
  costOfBorrowingPercent: number;
}

/**
 * Simplified flat-interest model: interest is calculated once on the original
 * principal for the full term, then spread evenly across installments. This
 * intentionally mirrors how many short-term/consumer loans are quoted, and is
 * clearly labelled in the UI as a simplified estimate rather than a bank's
 * exact reducing-balance amortization.
 */
export function calculateLoanPlan(input: LoanInput): LoanResult {
  const { principal, annualRatePercent, termMonths, frequency } = input;
  const totalInterest = principal * (annualRatePercent / 100) * (termMonths / 12);
  const totalRepayment = principal + totalInterest;
  const numberOfInstallments = Math.max(
    1,
    Math.round((termMonths / 12) * PERIODS_PER_YEAR[frequency])
  );
  const installmentAmount = totalRepayment / numberOfInstallments;

  return {
    principal,
    totalInterest,
    totalRepayment,
    numberOfInstallments,
    installmentAmount,
    frequency,
    costOfBorrowingPercent: principal > 0 ? (totalInterest / principal) * 100 : 0,
  };
}

export function humanizeMonths(months: number): string {
  if (months < 1) return "less than a month";
  if (months < 12) return `${months} month${months === 1 ? "" : "s"}`;
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  const yearsLabel = `${years} year${years === 1 ? "" : "s"}`;
  if (remainder === 0) return yearsLabel;
  return `${yearsLabel} ${remainder} month${remainder === 1 ? "" : "s"}`;
}

export function validatePositiveNumber(
  value: string,
  { required = true, min = 0, label = "This field" }: { required?: boolean; min?: number; label?: string } = {}
): string | null {
  if (value.trim() === "") {
    return required ? `${label} is required.` : null;
  }
  const n = Number(value);
  if (!Number.isFinite(n)) return `${label} must be a valid number.`;
  if (n < min) return `${label} must be at least ${min}.`;
  return null;
}
