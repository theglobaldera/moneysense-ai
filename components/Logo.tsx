import { Sprout } from "lucide-react";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2 text-lg font-bold text-charcoal-900 ${className}`}
      aria-label="MoneySense AI — home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest-600 text-white">
        <Sprout size={18} strokeWidth={2.5} />
      </span>
      <span>
        MoneySense <span className="text-forest-600">AI</span>
      </span>
    </Link>
  );
}
