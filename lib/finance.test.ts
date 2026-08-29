import { describe, it, expect } from "vitest";
import {
  calculateSavingsPlan,
  calculateLoanPlan,
  unitLabel,
  humanizeMonths,
  validatePositiveNumber,
  formatNaira,
} from "./finance";

// These tests exist because the product's own design principle is "AI never
// does the arithmetic — code does, and code is verified independently."
// This file is that verification: every number here is checked against a
// hand-worked expectation, not just "does it run."

describe("calculateSavingsPlan", () => {
  it("reports already reached when current savings already meet the goal", () => {
    const result = calculateSavingsPlan({
      goal: 50_000,
      current: 60_000,
      contribution: 0,
      frequency: "monthly",
    });
    expect(result.reached).toBe(true);
    expect(result.periodsNeeded).toBe(0);
  });

  it("matches the Learn quiz's worked example: ₦100,000 goal, ₦20,000/month, from ₦0 → 5 months", () => {
    const result = calculateSavingsPlan({
      goal: 100_000,
      current: 0,
      contribution: 20_000,
      frequency: "monthly",
    });
    expect(result.periodsNeeded).toBe(5);
    expect(result.monthsNeeded).toBe(5);
    expect(result.totalContributed).toBe(100_000);
  });

  it("matches the homepage hero example: ₦200,000 goal, ₦20,000 current, ₦30,000/month → 6 months", () => {
    const result = calculateSavingsPlan({
      goal: 200_000,
      current: 20_000,
      contribution: 30_000,
      frequency: "monthly",
    });
    expect(result.periodsNeeded).toBe(6);
  });

  it("handles daily frequency correctly: ₦50,000 goal, ₦1,000/day → 50 days", () => {
    const result = calculateSavingsPlan({
      goal: 50_000,
      current: 0,
      contribution: 1_000,
      frequency: "daily",
    });
    expect(result.periodsNeeded).toBe(50);
    expect(result.frequency).toBe("daily");
    // 50 days ≈ 2 months
    expect(result.monthsNeeded).toBe(2);
  });

  it("reports unreachable when there's no contribution and no interest", () => {
    const result = calculateSavingsPlan({
      goal: 100_000,
      current: 0,
      contribution: 0,
      frequency: "monthly",
    });
    expect(result.reached).toBe(false);
  });

  it("accrues interest on top of contributions when a rate is given", () => {
    const withInterest = calculateSavingsPlan({
      goal: 100_000,
      current: 0,
      contribution: 20_000,
      frequency: "monthly",
      annualInterestRatePercent: 12,
    });
    const withoutInterest = calculateSavingsPlan({
      goal: 100_000,
      current: 0,
      contribution: 20_000,
      frequency: "monthly",
    });
    // Earning interest should never take longer to reach the same goal.
    expect(withInterest.periodsNeeded).toBeLessThanOrEqual(withoutInterest.periodsNeeded);
    expect(withInterest.interestEarned).toBeGreaterThan(0);
  });
});

describe("calculateLoanPlan", () => {
  it("matches the homepage/simulator worked example: ₦100,000 at 24% for 6 months → ₦12,000 interest, ₦112,000 total", () => {
    const result = calculateLoanPlan({
      principal: 100_000,
      annualRatePercent: 24,
      termMonths: 6,
      frequency: "monthly",
    });
    expect(result.totalInterest).toBeCloseTo(12_000, 5);
    expect(result.totalRepayment).toBeCloseTo(112_000, 5);
    expect(result.numberOfInstallments).toBe(6);
    expect(result.installmentAmount).toBeCloseTo(112_000 / 6, 5);
    expect(result.costOfBorrowingPercent).toBeCloseTo(12, 5);
  });

  it("matches the Learn quiz's worked example: borrow ₦100,000, repay ₦120,000 → cost of borrowing ₦20,000", () => {
    // Reverse-derive the rate that produces a ₦20,000 interest cost over 6
    // months, the way the quiz question frames it, and confirm the formula
    // agrees with the quiz's stated correct answer.
    const result = calculateLoanPlan({
      principal: 100_000,
      annualRatePercent: 40, // 100000 * 0.40 * (6/12) = 20000
      termMonths: 6,
      frequency: "monthly",
    });
    expect(result.totalInterest).toBeCloseTo(20_000, 5);
    expect(result.totalRepayment).toBeCloseTo(120_000, 5);
  });

  it("scales installment count correctly across all four frequencies for a 12-month term", () => {
    const base = { principal: 120_000, annualRatePercent: 12, termMonths: 12 } as const;
    expect(calculateLoanPlan({ ...base, frequency: "monthly" }).numberOfInstallments).toBe(12);
    expect(calculateLoanPlan({ ...base, frequency: "weekly" }).numberOfInstallments).toBe(52);
    expect(calculateLoanPlan({ ...base, frequency: "daily" }).numberOfInstallments).toBe(365);
    expect(calculateLoanPlan({ ...base, frequency: "annually" }).numberOfInstallments).toBe(1);
  });

  it("never charges interest on a 0% loan", () => {
    const result = calculateLoanPlan({
      principal: 50_000,
      annualRatePercent: 0,
      termMonths: 3,
      frequency: "monthly",
    });
    expect(result.totalInterest).toBe(0);
    expect(result.totalRepayment).toBe(50_000);
  });
});

describe("unitLabel", () => {
  it("pluralizes correctly for every frequency", () => {
    expect(unitLabel("daily", 1)).toBe("day");
    expect(unitLabel("daily", 2)).toBe("days");
    expect(unitLabel("weekly", 1)).toBe("week");
    expect(unitLabel("monthly", 3)).toBe("months");
    expect(unitLabel("annually", 1)).toBe("year");
    expect(unitLabel("annually", 5)).toBe("years");
  });
});

describe("humanizeMonths", () => {
  it("handles sub-month, whole-year, and mixed durations", () => {
    expect(humanizeMonths(0)).toBe("less than a month");
    expect(humanizeMonths(1)).toBe("1 month");
    expect(humanizeMonths(5)).toBe("5 months");
    expect(humanizeMonths(12)).toBe("1 year");
    expect(humanizeMonths(14)).toBe("1 year 2 months");
    expect(humanizeMonths(24)).toBe("2 years");
  });
});

describe("validatePositiveNumber", () => {
  it("rejects empty required values, non-numbers, and below-minimum values", () => {
    expect(validatePositiveNumber("", { required: true, label: "Amount" })).toMatch(/required/);
    expect(validatePositiveNumber("abc", { label: "Amount" })).toMatch(/valid number/);
    expect(validatePositiveNumber("5", { min: 10, label: "Amount" })).toMatch(/at least 10/);
    expect(validatePositiveNumber("", { required: false })).toBeNull();
    expect(validatePositiveNumber("100", { min: 0 })).toBeNull();
  });
});

describe("formatNaira", () => {
  it("formats whole numbers as Naira currency and handles invalid input safely", () => {
    expect(formatNaira(100_000)).toContain("100,000");
    expect(formatNaira(NaN)).toBe("₦0");
  });
});
