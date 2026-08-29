import { ShieldCheck } from "lucide-react";

export default function SafetyNote({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-charcoal-700 ${className}`}
    >
      <ShieldCheck size={18} className="mt-0.5 shrink-0 text-amber-600" />
      <p>
        MoneySense provides general financial education, not professional financial advice.
        Information provided should not be treated as a recommendation to make a specific
        financial decision.
      </p>
    </div>
  );
}
