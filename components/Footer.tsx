import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-forest-100 bg-white">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
          <p className="mt-3 text-sm font-medium text-forest-600">Make money make sense.</p>
          <p className="mt-2 text-sm text-charcoal-500">
            An AI-powered financial literacy platform designed to help young people understand
            everyday financial concepts and financial decisions.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-charcoal-900">Product</h3>
          <ul className="mt-3 space-y-2 text-sm text-charcoal-500">
            <li><Link href="/ask" className="hover:text-forest-700">Ask MoneySense</Link></li>
            <li><Link href="/scenarios" className="hover:text-forest-700">Scenarios</Link></li>
            <li><Link href="/simulate" className="hover:text-forest-700">Simulate</Link></li>
            <li><Link href="/learn" className="hover:text-forest-700">Learn</Link></li>
            <li><Link href="/progress" className="hover:text-forest-700">Progress</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-charcoal-900">Information</h3>
          <ul className="mt-3 space-y-2 text-sm text-charcoal-500">
            <li><Link href="/about" className="hover:text-forest-700">About MoneySense</Link></li>
            <li><Link href="/about#how-it-works" className="hover:text-forest-700">How it works</Link></li>
            <li><Link href="/about#sources" className="hover:text-forest-700">Sources</Link></li>
            <li><Link href="/about#safety" className="hover:text-forest-700">Safety &amp; limitations</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-charcoal-900">Competition</h3>
          <p className="mt-3 text-sm text-charcoal-500">Built for AI BuildFest 2026</p>
          <p className="text-sm text-charcoal-500">10Alytics Business</p>
        </div>
      </div>

      <div className="border-t border-forest-100 py-6">
        <div className="container-page flex flex-col gap-2 text-xs text-charcoal-500 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} MoneySense AI</p>
          <p>MoneySense AI provides general financial education and does not provide professional financial advice.</p>
        </div>
      </div>
    </footer>
  );
}
