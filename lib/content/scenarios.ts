// Deterministic, hand-written scenario content — no AI dependency, so the
// core demo path never breaks on a network or model issue.

export interface ScenarioChoice {
  id: string;
  label: string;
  description: string;
}

export interface ScenarioOutcome {
  outcome: string;
  explanation: string;
}

export interface Scenario {
  slug: string;
  number: string;
  title: string;
  teaser: string;
  situation: string;
  choicePrompt: string;
  choices: ScenarioChoice[];
  outcomes: Record<string, ScenarioOutcome>;
  nextStepLabel: string;
  nextStepHref: string;
  relatedTopicSlug: string;
}

export const scenarios: Scenario[] = [
  {
    slug: "i-want-to-save",
    number: "01",
    title: "I want to save",
    teaser: "See how regular contributions can help you reach a savings goal.",
    situation:
      "You want to save ₦200,000 for a new laptop. You currently have ₦20,000 saved. You get paid at the end of every month and want to know how contributing regularly could get you there.",
    choicePrompt: "How much could you realistically set aside every month?",
    choices: [
      { id: "low", label: "₦10,000 / month", description: "A smaller, easier-to-sustain amount." },
      { id: "mid", label: "₦30,000 / month", description: "A moderate, disciplined amount." },
      { id: "high", label: "₦50,000 / month", description: "An ambitious, fast-tracked amount." },
    ],
    outcomes: {
      low: {
        outcome: "At ₦10,000 per month, it would take about 18 months to reach ₦200,000.",
        explanation:
          "Smaller contributions are easier to sustain, but they stretch your timeline. If your goal has a deadline, a smaller monthly amount may mean missing it — worth checking whether 18 months still works for you.",
      },
      mid: {
        outcome: "At ₦30,000 per month, it would take about 6 months to reach ₦200,000.",
        explanation:
          "This is a balance between speed and sustainability. Before committing, check that ₦30,000 still leaves room for your essential monthly expenses — a plan only works if you can keep it up.",
      },
      high: {
        outcome: "At ₦50,000 per month, it would take about 4 months to reach ₦200,000.",
        explanation:
          "This gets you there fastest, but ambitious targets are the ones most likely to be abandoned if income is irregular. It can help to have a smaller backup amount for tighter months.",
      },
    },
    nextStepLabel: "Try the exact numbers in the Savings Simulator",
    nextStepHref: "/simulate?tab=savings",
    relatedTopicSlug: "saving",
  },
  {
    slug: "should-i-take-this-loan",
    number: "02",
    title: "Should I take this loan?",
    teaser: "Understand how much borrowing may actually cost.",
    situation:
      "A lender offers you a ₦100,000 loan to cover an urgent expense, to be repaid over 6 months at a 24% annual interest rate. It sounds manageable, but you're not sure what you'd actually pay back.",
    choicePrompt: "What would you want to understand before deciding?",
    choices: [
      { id: "total", label: "How much I'd repay in total", description: "The full cost of the loan, not just the monthly figure." },
      { id: "monthly", label: "Whether the monthly repayment fits my income", description: "Can I actually afford the instalments?" },
      { id: "alternatives", label: "Whether there's a cheaper way to cover this", description: "Savings, family, or a smaller loan." },
    ],
    outcomes: {
      total: {
        outcome:
          "Under a simplified calculation, ₦100,000 at 24% annual interest over 6 months costs about ₦12,000 in interest — a total repayment of roughly ₦112,000.",
        explanation:
          "That ₦12,000 is the cost of borrowing: money you pay on top of what you received, purely for the ability to have the cash now instead of later. The longer the term or higher the rate, the larger this cost grows.",
      },
      monthly: {
        outcome:
          "Split over 6 monthly instalments, that's roughly ₦18,700 per month — the full repayment amount divided evenly across the term.",
        explanation:
          "A loan is only manageable if the instalment fits comfortably alongside your essential expenses. If ₦18,700 a month would be a stretch, the loan is riskier than it first appears — even if the interest rate looks reasonable.",
      },
      alternatives: {
        outcome:
          "Comparing options is often more valuable than comparing loans: dipping into savings costs you ₦0 in interest, and a smaller loan for only what's essential reduces your cost of borrowing proportionally.",
        explanation:
          "Borrowing isn't inherently bad, but it's rarely free. Before accepting an offer, it's worth asking whether the full amount is needed, and whether a lower-cost source could cover part of it.",
      },
    },
    nextStepLabel: "Run your own numbers in the Loan Simulator",
    nextStepHref: "/simulate?tab=loan",
    relatedTopicSlug: "borrowing",
  },
  {
    slug: "where-did-my-money-go",
    number: "03",
    title: "Where did my money go?",
    teaser: "Explore how income can be divided between different needs.",
    situation:
      "You earn ₦120,000 a month from a mix of freelance work and a small side hustle. By the end of most months, there's little left over, and you're not sure where it's going.",
    choicePrompt: "Which approach to dividing your income would you like to explore?",
    choices: [
      { id: "fifty", label: "50 / 30 / 20 split", description: "Needs, wants, savings — a common starting framework." },
      { id: "needs-first", label: "Needs first, then everything else", description: "Cover essentials, then decide what's left." },
      { id: "save-first", label: "Save first, spend the rest", description: "Pay your future self before anything else." },
    ],
    outcomes: {
      fifty: {
        outcome:
          "On ₦120,000: about ₦60,000 to needs (rent, transport, food), ₦36,000 to wants, and ₦24,000 to savings.",
        explanation:
          "This split gives every purpose a clear share up front, which makes it easier to spot when one category — usually 'wants' — is quietly taking over the budget.",
      },
      "needs-first": {
        outcome:
          "If needs genuinely cost ₦70,000, that leaves ₦50,000 to split between savings and discretionary spending — but only if needs are tracked honestly.",
        explanation:
          "This approach is realistic, but it only works if 'needs' doesn't quietly expand to include things that are actually wants. Being specific about what counts as essential is what makes this method effective.",
      },
      "save-first": {
        outcome:
          "Setting aside ₦20,000 (about 17%) the moment you're paid, before any spending happens, still leaves ₦100,000 for everything else.",
        explanation:
          "Saving first removes the temptation to save 'whatever's left' — which is usually nothing. Even a modest fixed percentage, moved immediately, tends to survive the month better than a good intention.",
      },
    },
    nextStepLabel: "Build your own plan in the Savings Simulator",
    nextStepHref: "/simulate?tab=savings",
    relatedTopicSlug: "budgeting",
  },
  {
    slug: "is-this-offer-safe",
    number: "04",
    title: "Is this offer safe?",
    teaser: "Learn how to identify potential financial warning signs.",
    situation:
      "You see a message: \"Invest ₦20,000 today and get ₦60,000 back in 7 days, guaranteed. Limited slots — pay now to secure yours!\" A friend says they've heard of people earning from it.",
    choicePrompt: "What stands out to you first?",
    choices: [
      { id: "guarantee", label: "\"Guaranteed\" returns", description: "A promise that the outcome is certain." },
      { id: "urgency", label: "Pressure to act immediately", description: "\"Limited slots\", \"pay now\"." },
      { id: "unrealistic", label: "The size of the return", description: "₦20,000 becoming ₦60,000 in 7 days." },
    ],
    outcomes: {
      guarantee: {
        outcome:
          "Every legitimate investment carries some risk — none can honestly guarantee a fixed return. \"Guaranteed profit\" is one of the clearest warning signs of a scam.",
        explanation:
          "Real returns fluctuate with markets, businesses, and time. When something removes risk from the pitch entirely, it's usually because the real risk is being hidden, not eliminated.",
      },
      urgency: {
        outcome:
          "Artificial urgency — countdowns, \"limited slots\", pressure to pay before you can think it over — is a classic tactic to stop you researching or asking questions.",
        explanation:
          "Legitimate opportunities can usually wait a day for you to check details, read terms, or ask someone you trust. If an offer pressures you to skip that step, that pressure is the warning sign.",
      },
      unrealistic: {
        outcome:
          "Tripling your money in 7 days implies a return no legitimate, low-risk investment can realistically sustain. If it sounds too good to be true, it usually is.",
        explanation:
          "It can help to compare the promised return to something familiar, like a bank savings rate. A gap that large is a signal to slow down, not speed up.",
      },
    },
    nextStepLabel: "Test your scam awareness in Learn",
    nextStepHref: "/learn/scam-awareness",
    relatedTopicSlug: "scam-awareness",
  },
];

export function getScenarioBySlug(slug: string): Scenario | undefined {
  return scenarios.find((s) => s.slug === slug);
}
