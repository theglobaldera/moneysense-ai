import { Suspense } from "react";
import SimulateTabs from "@/components/simulate/SimulateTabs";

export const metadata = {
  title: "Simulate — MoneySense AI",
};

export default function SimulatePage() {
  return (
    <div className="container-page py-12">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="text-3xl font-bold sm:text-4xl">See the numbers for yourself.</h1>
        <p className="mt-3 text-charcoal-500">
          Every calculation here is produced by programmed formulas, not AI-generated arithmetic.
        </p>
      </div>

      <Suspense fallback={null}>
        <SimulateTabs />
      </Suspense>
    </div>
  );
}
