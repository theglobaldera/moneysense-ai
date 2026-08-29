// Learn topics + quizzes — hand-written and deterministic so learning content
// never depends on the AI being available.

export interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; label: string }[];
  correctOptionId: string;
  explanation: string;
}

export interface Topic {
  slug: string;
  title: string;
  shortDescription: string;
  intro: string;
  example: string;
  quiz: QuizQuestion[];
}

export const topics: Topic[] = [
  {
    slug: "budgeting",
    title: "Budgeting",
    shortDescription: "Plan where your money goes before it disappears.",
    intro:
      "A budget is simply a plan for your income: deciding in advance how much goes toward needs, wants, and savings, instead of finding out at the end of the month where it all went.",
    example:
      "If you earn ₦100,000 a month, a simple plan might set aside ₦50,000 for essentials (rent, transport, food), ₦30,000 for discretionary spending, and ₦20,000 for savings — decided before the month starts, not after.",
    quiz: [
      {
        id: "q1",
        question: "What is the main purpose of a budget?",
        options: [
          { id: "a", label: "To restrict all spending completely" },
          { id: "b", label: "To plan how income will be used in advance" },
          { id: "c", label: "To track only savings, not spending" },
        ],
        correctOptionId: "b",
        explanation:
          "A budget isn't about never spending — it's about deciding on purpose where your money goes, rather than reacting after it's gone.",
      },
      {
        id: "q2",
        question: "Which of these is typically a 'need' rather than a 'want'?",
        options: [
          { id: "a", label: "Transport to work or school" },
          { id: "b", label: "Streaming subscriptions" },
          { id: "c", label: "Eating out with friends" },
        ],
        correctOptionId: "a",
        explanation:
          "Needs are things required to function day-to-day, like transport, housing, and food. Wants add comfort or enjoyment but aren't essential to get by.",
      },
      {
        id: "q3",
        question: "If your expenses regularly exceed your income, what does that mean?",
        options: [
          { id: "a", label: "You are spending more than you earn and need to adjust your budget" },
          { id: "b", label: "Nothing — this is normal and doesn't need attention" },
          { id: "c", label: "You should take a loan to cover the difference every month" },
        ],
        correctOptionId: "a",
        explanation:
          "Spending consistently above income is a sign the budget needs adjusting — either by reducing discretionary spending or finding additional income — before it becomes a bigger problem.",
      },
    ],
  },
  {
    slug: "saving",
    title: "Saving",
    shortDescription: "Set money aside on purpose, toward a goal.",
    intro:
      "Saving means setting money aside now instead of spending it, usually toward a specific goal or as a cushion for unexpected costs. Saving regularly, even in small amounts, tends to matter more than saving large amounts occasionally.",
    example:
      "Saving ₦15,000 every month for a year adds up to ₦180,000 — even though no single contribution feels large, consistency is what gets you to the goal.",
    quiz: [
      {
        id: "q1",
        question: "Which habit is generally more effective for reaching a savings goal?",
        options: [
          { id: "a", label: "Saving a large amount occasionally, whenever there's extra money" },
          { id: "b", label: "Saving a smaller, consistent amount regularly" },
          { id: "c", label: "Waiting until income increases before saving anything" },
        ],
        correctOptionId: "b",
        explanation:
          "Consistency compounds. Regular contributions, even modest ones, build steadily and are easier to plan around than occasional, unpredictable ones.",
      },
      {
        id: "q2",
        question: "What is an emergency fund mainly used for?",
        options: [
          { id: "a", label: "Planned purchases like a new phone" },
          { id: "b", label: "Unexpected costs, like a medical bill or urgent repair" },
          { id: "c", label: "Everyday discretionary spending" },
        ],
        correctOptionId: "b",
        explanation:
          "An emergency fund exists specifically for the unplanned — so an unexpected cost doesn't force you into high-cost borrowing.",
      },
      {
        id: "q3",
        question:
          "You save ₦20,000 a month toward a ₦100,000 goal, starting from ₦0. Roughly how long will it take?",
        options: [
          { id: "a", label: "About 1 month" },
          { id: "b", label: "About 5 months" },
          { id: "c", label: "About 10 months" },
        ],
        correctOptionId: "b",
        explanation:
          "₦100,000 ÷ ₦20,000 per month = 5 months. Try the Savings Simulator to see how changing the monthly amount changes the timeline.",
      },
    ],
  },
  {
    slug: "interest",
    title: "Interest",
    shortDescription: "The cost of money — earned when you save, paid when you borrow.",
    intro:
      "Interest is the cost of money over time. When you save, a bank may pay you interest for keeping your money with them. When you borrow, you pay interest for the ability to use someone else's money now.",
    example:
      "With compound interest, you earn interest not only on the amount you originally saved, but also on interest already added. Save ₦100,000 and it earns interest — next period's interest is calculated on the new, slightly larger total.",
    quiz: [
      {
        id: "q1",
        question: "What does 'compound interest' mean?",
        options: [
          { id: "a", label: "Interest calculated only on the original amount, every time" },
          { id: "b", label: "Interest calculated on the original amount plus previously earned interest" },
          { id: "c", label: "A fixed fee charged once, unrelated to time" },
        ],
        correctOptionId: "b",
        explanation:
          "Compounding means interest builds on interest — which is why savings can grow faster over time than a flat calculation would suggest.",
      },
      {
        id: "q2",
        question: "When you take a loan, who is interest paid to?",
        options: [
          { id: "a", label: "The lender, as the cost of borrowing their money" },
          { id: "b", label: "The government, as a tax" },
          { id: "c", label: "No one — interest is only theoretical" },
        ],
        correctOptionId: "a",
        explanation:
          "Interest on a loan is what you pay the lender in exchange for being able to use their money before you've earned it yourself.",
      },
      {
        id: "q3",
        question: "All else equal, what happens to a loan's cost as its interest rate increases?",
        options: [
          { id: "a", label: "The total cost of borrowing decreases" },
          { id: "b", label: "The total cost of borrowing increases" },
          { id: "c", label: "The interest rate has no effect on total cost" },
        ],
        correctOptionId: "b",
        explanation:
          "A higher rate means more interest accrues over the same term, which increases the total amount repaid above the original amount borrowed.",
      },
    ],
  },
  {
    slug: "borrowing",
    title: "Borrowing",
    shortDescription: "Understand what a loan actually costs before you take one.",
    intro:
      "Borrowing means receiving money now that you agree to repay later, usually with interest added. The total you repay is almost always more than what you borrowed — the difference is the cost of borrowing.",
    example:
      "Borrow ₦100,000 and eventually repay ₦120,000. The additional ₦20,000 is the cost of borrowing — the price paid for accessing the money before you had it.",
    quiz: [
      {
        id: "q1",
        question: "You borrow ₦100,000 and eventually repay ₦120,000. What is the cost of borrowing?",
        options: [
          { id: "a", label: "₦10,000" },
          { id: "b", label: "₦20,000" },
          { id: "c", label: "₦100,000" },
        ],
        correctOptionId: "b",
        explanation:
          "The cost of borrowing is the extra amount paid above the original loan: ₦120,000 − ₦100,000 = ₦20,000.",
      },
      {
        id: "q2",
        question: "Before taking a loan, which is most important to check?",
        options: [
          { id: "a", label: "Only the interest rate advertised" },
          { id: "b", label: "The total repayment amount and whether instalments fit your income" },
          { id: "c", label: "How quickly the lender can send the money" },
        ],
        correctOptionId: "b",
        explanation:
          "An advertised rate alone doesn't tell the full story. What matters is the total you'll repay, and whether the repayment schedule is realistically affordable.",
      },
      {
        id: "q3",
        question: "Which of these generally makes a loan more expensive overall?",
        options: [
          { id: "a", label: "A longer repayment term at the same rate" },
          { id: "b", label: "Repaying the exact amount borrowed with no interest" },
          { id: "c", label: "Borrowing a smaller amount" },
        ],
        correctOptionId: "a",
        explanation:
          "A longer term generally means more interest accrues over time, increasing the total cost — even if the monthly instalment feels smaller.",
      },
    ],
  },
  {
    slug: "debt",
    title: "Debt",
    shortDescription: "Money owed, and why not all debt behaves the same way.",
    intro:
      "Debt is money you owe as a result of borrowing. It isn't automatically bad — a well-managed loan for something valuable can make sense — but unmanaged debt, especially high-interest debt, can grow faster than income and become difficult to escape.",
    example:
      "Carrying a balance on a high-interest debt while only making minimum payments can mean most of each payment goes toward interest, not the original amount — so the balance shrinks very slowly.",
    quiz: [
      {
        id: "q1",
        question: "Is all debt automatically a bad financial decision?",
        options: [
          { id: "a", label: "Yes, debt should always be avoided" },
          { id: "b", label: "No, it depends on the cost, purpose, and whether it's manageable" },
          { id: "c", label: "Only debt from banks is risky; other debt is always safe" },
        ],
        correctOptionId: "b",
        explanation:
          "Debt is a tool. Whether it's a good decision depends on the interest cost, what it's used for, and whether the repayments realistically fit your income.",
      },
      {
        id: "q2",
        question: "Why can high-interest debt be especially difficult to pay off?",
        options: [
          { id: "a", label: "Because interest accrues quickly, so a large share of each payment covers interest rather than the original amount" },
          { id: "b", label: "Because lenders forbid early repayment" },
          { id: "c", label: "Because high-interest debt has no fixed amount owed" },
        ],
        correctOptionId: "a",
        explanation:
          "When interest is high, more of each repayment goes toward covering that interest, leaving less to reduce the actual balance — which slows progress significantly.",
      },
      {
        id: "q3",
        question: "If you're juggling multiple debts, which is generally a sound priority?",
        options: [
          { id: "a", label: "Ignore the interest rates and pay whichever is smallest first, always" },
          { id: "b", label: "Prioritise paying down the highest-interest debt where possible" },
          { id: "c", label: "Take a new loan to pay off all existing debts without comparing costs" },
        ],
        correctOptionId: "b",
        explanation:
          "Highest-interest debt grows fastest, so reducing it first generally limits the total interest you end up paying — though any consistent repayment plan is better than none.",
      },
    ],
  },
  {
    slug: "scam-awareness",
    title: "Scam Awareness",
    shortDescription: "Spot common warning signs in financial offers.",
    intro:
      "Financial scams often share common patterns: promises of guaranteed or unusually high returns, pressure to act quickly, and requests for payment or personal information upfront. Recognising these patterns is the first line of defence.",
    example:
      "\"Invest ₦20,000 today and get ₦60,000 back in 7 days, guaranteed\" combines two major warning signs at once: an unrealistic guaranteed return, and pressure to act immediately.",
    quiz: [
      {
        id: "q1",
        question: "Which phrase is a common warning sign of a financial scam?",
        options: [
          { id: "a", label: "\"Returns vary and are not guaranteed\"" },
          { id: "b", label: "\"Guaranteed to double your money in a week\"" },
          { id: "c", label: "\"Please review the terms before deciding\"" },
        ],
        correctOptionId: "b",
        explanation:
          "No legitimate investment can honestly guarantee a fixed, short-term return — real returns carry risk and vary over time.",
      },
      {
        id: "q2",
        question: "Why do scams often create urgency (\"limited slots\", \"act now\")?",
        options: [
          { id: "a", label: "To give you time to research the opportunity properly" },
          { id: "b", label: "To pressure you into deciding before you can think it through or ask questions" },
          { id: "c", label: "Urgency has no connection to scam tactics" },
        ],
        correctOptionId: "b",
        explanation:
          "Urgency is designed to bypass careful thinking. A legitimate opportunity can typically withstand a day's delay while you check the details.",
      },
      {
        id: "q3",
        question: "If a friend says they 'know someone' who profited from an offer, does that confirm it's safe?",
        options: [
          { id: "a", label: "Yes, a personal recommendation always confirms legitimacy" },
          { id: "b", label: "No, social proof alone doesn't rule out a scam — early participants can be paid using new participants' money" },
          { id: "c", label: "It depends only on how many friends mention it" },
        ],
        correctOptionId: "b",
        explanation:
          "Many scams pay early participants to build credibility and encourage others to join — that doesn't make the underlying offer legitimate.",
      },
    ],
  },
];

export const topicOrder = topics.map((t) => t.slug);

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
