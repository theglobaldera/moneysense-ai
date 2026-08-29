import Link from "next/link";
import { Compass, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <Compass size={40} className="text-forest-300" />
      <h1 className="mt-4 text-2xl font-bold">We couldn&rsquo;t find that page.</h1>
      <p className="mt-2 max-w-md text-charcoal-500">
        Choose a scenario or topic to get started, or head back to the homepage.
      </p>
      <Link href="/" className="btn-primary mt-6">
        Back to Home <ArrowRight size={16} />
      </Link>
    </div>
  );
}
