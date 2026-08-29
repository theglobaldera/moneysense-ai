// All financial math lives here as plain functions — never delegated to the AI.
// Every formula is intentionally simplified for financial-literacy purposes and
// labelled as such in the UI; it is not a substitute for a bank's exact terms.

export type Frequency = "monthly" | "weekly";

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

const PERIODS_PER_YEAR: Record<Frequency, number> = {
  monthly: 12,
  weekly: 52,
};

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
  /** Balance at the end of each period, capped for charting (max ~24 points). */
  progressSeries: number[];
}

const MAX_PERIODS = 1200; // 100 years of monthly saving — a safe upper bound

export function calculateSavingsPlan(input: SavingsInput): SavingsResult {
  const { goal, current, contribution, frequency } = input;
  const annualRate = input.annualInterestRatePercent ?? 0;
  const periodicRate = annualRate / 100 / PERIODS_PER_YEAR[frequency];

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
      periodsNeeded: MAX_PERIODS,
      frequency,
      monthsNeeded: MAX_PERIODS,
      totalContributed: 0,
      interestEarned: 0,
      projectedTotal: balance,
      progressSeries: series,
    };
  }

  while (balance < goal && periods < MAX_PERIODS) {
    const interest = balance * periodicRate;
    balance += interest + contribution;
    totalContributed += contribution;
    periods += 1;
    series.push(balance);
  }

  const monthsNeeded =
    frequency === "monthly" ? periods : Math.round((periods / 52) * 12);

  return {
    reached: periods < MAX_PERIODS,
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
  const numberOfInstallments =
    frequency === "monthly"
      ? Math.max(1, Math.round(termMonths))
      : Math.max(1, Math.round((termMonths / 12) * 52));
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
