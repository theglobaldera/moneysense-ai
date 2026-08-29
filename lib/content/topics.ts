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
      {
        id: "q4",
        question: "If your income is irregular (e.g. freelance or side-hustle work), what's a sound budgeting approach?",
        options: [
          { id: "a", label: "Budget based on your best month and spend accordingly every month" },
          { id: "b", label: "Budget based on a conservative, lower estimate and treat extra income as a bonus for savings" },
          { id: "c", label: "Skip budgeting entirely since income changes too much" },
        ],
        correctOptionId: "b",
        explanation:
          "Planning around your lowest realistic income protects you in leaner months, while any extra in better months can boost savings instead of being relied upon in advance.",
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
      {
        id: "q4",
        question: "What does it mean to 'pay yourself first'?",
        options: [
          { id: "a", label: "Setting aside savings immediately when you're paid, before spending on anything else" },
          { id: "b", label: "Spending on personal treats before paying any bills" },
          { id: "c", label: "Paying off other people before saving anything" },
        ],
        correctOptionId: "a",
        explanation:
          "Moving savings out immediately — even automatically — means it isn't competing with the rest of the month's spending, which is why it tends to stick better than 'saving whatever's left'.",
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
      {
        id: "q4",
        question: "What does APR (Annual Percentage Rate) represent?",
        options: [
          { id: "a", label: "The yearly cost of borrowing, expressed as a percentage, including most standard fees" },
          { id: "b", label: "A one-time fee unrelated to time" },
          { id: "c", label: "The amount you can borrow, not what it costs" },
        ],
        correctOptionId: "a",
        explanation:
          "APR gives you a standardised yearly cost figure, which makes it easier to compare the true cost of different loans rather than comparing headline numbers alone.",
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
      {
        id: "q4",
        question: "Two loans offer the same amount and term, but one lists extra 'processing' or 'service' fees. What should you compare?",
        options: [
          { id: "a", label: "Only the advertised interest rate" },
          { id: "b", label: "The total amount you'd repay across the whole term, fees included" },
          { id: "c", label: "Whichever lender responds fastest" },
        ],
        correctOptionId: "b",
        explanation:
          "Fees add to the real cost of borrowing even when they're not called 'interest'. Comparing total repayment amounts avoids being misled by a low headline rate.",
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
      {
        id: "q4",
        question: "Which is a reasonable example of debt used with a clear purpose, versus debt taken carelessly?",
        options: [
          { id: "a", label: "A student loan for education you couldn't otherwise afford, with a manageable repayment plan" },
          { id: "b", label: "Multiple small loans taken to cover discretionary spending, without a repayment plan" },
          { id: "c", label: "Both are equally risky regardless of purpose or planning" },
        ],
        correctOptionId: "a",
        explanation:
          "The same word 'debt' covers very different situations — what matters is the purpose, the cost, and whether there's a realistic plan to repay it.",
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
      {
        id: "q4",
        question: "What's a reasonable step before putting money into an unfamiliar investment offer?",
        options: [
          { id: "a", label: "Check whether the company or scheme is registered with the relevant financial regulator" },
          { id: "b", label: "Send a small 'test' payment first, since scammers won't ask for more if it's fake" },
          { id: "c", label: "Trust it if the website looks professionally designed" },
        ],
        correctOptionId: "a",
        explanation:
          "A professional-looking website costs little to fake, and a small test payment doesn't protect you — scammers happily take small amounts too. Checking regulatory registration is a real, verifiable signal.",
      },
    ],
  },
  {
    slug: "investing",
    title: "Investing Basics",
    shortDescription: "How investing differs from saving, and why risk and time matter.",
    intro:
      "Investing means putting money into something — like shares, a business, or a fund — with the hope it grows in value over time. Unlike a standard savings account, investments can lose value as well as gain it. In exchange for that risk, investments have the potential for higher returns over the long run.",
    example:
      "₦100,000 kept in savings might grow slowly and predictably with interest. The same ₦100,000 invested in shares could be worth more in five years — or less, if the market falls in the short term. That trade-off between predictability and potential growth is the core of investing.",
    quiz: [
      {
        id: "q1",
        question: "What is the main difference between saving and investing?",
        options: [
          { id: "a", label: "Saving carries risk of loss; investing guarantees growth" },
          { id: "b", label: "Investing carries risk of loss in exchange for potentially higher returns; saving is generally more predictable" },
          { id: "c", label: "There is no real difference between the two" },
        ],
        correctOptionId: "b",
        explanation:
          "Saving prioritises safety and predictability. Investing accepts some risk of loss in exchange for the potential of higher returns over time — neither is 'better', they serve different purposes.",
      },
      {
        id: "q2",
        question: "Why does investing generally suit longer time horizons better than short-term goals?",
        options: [
          { id: "a", label: "Because investments guarantee a fixed date to double in value" },
          { id: "b", label: "Because value can drop in the short term, and a longer timeline gives it a chance to recover before you need the money" },
          { id: "c", label: "Because investments cannot be sold quickly under any circumstances" },
        ],
        correctOptionId: "b",
        explanation:
          "If money is needed soon, a short-term drop in value could force you to sell at a loss. A longer horizon gives investments room to ride out ups and downs.",
      },
      {
        id: "q3",
        question: "What does 'diversification' mean in investing?",
        options: [
          { id: "a", label: "Putting all your money into a single promising opportunity" },
          { id: "b", label: "Spreading money across different investments so one poor performer doesn't sink the whole picture" },
          { id: "c", label: "Only investing in businesses you personally know the owners of" },
        ],
        correctOptionId: "b",
        explanation:
          "Spreading investments reduces how much a single loss can hurt you overall — it's a basic way to manage risk rather than eliminate it.",
      },
      {
        id: "q4",
        question: "Can a legitimate investment guarantee a specific profit in advance?",
        options: [
          { id: "a", label: "Yes, reputable investments always state a guaranteed return" },
          { id: "b", label: "No — all genuine investments carry some uncertainty about their return" },
          { id: "c", label: "Only investments backed by well-known companies can guarantee returns" },
        ],
        correctOptionId: "b",
        explanation:
          "No legitimate investment can honestly promise a guaranteed profit — returns depend on real-world performance, which is never fully certain. A guarantee is a warning sign, not a reassurance.",
      },
    ],
  },
  {
    slug: "emergency-fund",
    title: "Emergency Fund",
    shortDescription: "A cushion set aside specifically for the unexpected.",
    intro:
      "An emergency fund is money set aside purely for unplanned, urgent costs — a medical bill, sudden job loss, or urgent repair — kept separate from everyday spending or long-term savings goals so it's there when you actually need it.",
    example:
      "If your essential monthly costs are ₦80,000, a starter emergency fund goal might be one month's worth (₦80,000), built up gradually, before working toward a larger cushion of three months (₦240,000).",
    quiz: [
      {
        id: "q1",
        question: "What is the primary purpose of an emergency fund?",
        options: [
          { id: "a", label: "Funding planned purchases like a vacation" },
          { id: "b", label: "Covering unexpected, urgent costs without relying on high-cost borrowing" },
          { id: "c", label: "Everyday spending money" },
        ],
        correctOptionId: "b",
        explanation:
          "An emergency fund exists so that a sudden cost doesn't force you into a high-interest loan just to cover something urgent and unplanned.",
      },
      {
        id: "q2",
        question: "Where is generally the most sensible place to keep an emergency fund?",
        options: [
          { id: "a", label: "Somewhere easily accessible, like a basic savings account — not locked away or invested" },
          { id: "b", label: "Invested in shares for maximum growth" },
          { id: "c", label: "Lent to a friend who will repay 'eventually'" },
        ],
        correctOptionId: "a",
        explanation:
          "The point of this fund is availability when needed, not maximum growth. Keeping it accessible matters more than earning the highest possible return on it.",
      },
      {
        id: "q3",
        question: "Should an emergency fund be mixed with money saved toward a specific goal, like a new phone?",
        options: [
          { id: "a", label: "Yes, combining them is simpler and works just as well" },
          { id: "b", label: "No — mixing them makes it easy to accidentally spend the emergency cushion on non-emergencies" },
          { id: "c", label: "It doesn't matter as long as the total amount is large enough" },
        ],
        correctOptionId: "b",
        explanation:
          "Keeping the emergency fund separate makes its purpose clear, and makes it much less likely to quietly get spent on something that isn't actually an emergency.",
      },
      {
        id: "q4",
        question: "If you're just starting out with irregular income, what's a realistic first emergency-fund goal?",
        options: [
          { id: "a", label: "A small, achievable buffer (e.g. one month of essential costs), built up gradually" },
          { id: "b", label: "Nothing — wait until income is stable before starting" },
          { id: "c", label: "A full year of expenses before doing anything else with your money" },
        ],
        correctOptionId: "a",
        explanation:
          "A smaller, achievable first target builds the habit and gives real protection sooner. The fund can keep growing over time — it doesn't need to be complete on day one.",
      },
    ],
  },
];

export const topicOrder = topics.map((t) => t.slug);

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}
