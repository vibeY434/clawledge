import Link from "next/link";
import { getBangerUseCases, getFeaturedUseCases } from "@/lib/data";
import { UseCaseCard } from "@/components/use-cases/UseCaseCard";

export function FeaturedCases() {
  // Use impact-scored bangers if available, fall back to featured
  const bangers = getBangerUseCases(6);
  const cases = bangers.length >= 3 ? bangers : getFeaturedUseCases();

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-white">
              {bangers.length >= 3 ? "Highest Impact" : "Featured Use Cases"}
            </h2>
            <p className="mt-2 text-foreground-secondary">
              {bangers.length >= 3
                ? "The most impressive, viral, and revenue-generating automations"
                : "Hand-picked highlights from the OpenClaw community"}
            </p>
          </div>
          <Link
            href="/use-cases"
            className="hidden sm:inline-flex text-sm text-claw-400 hover:text-claw-300 transition-colors"
          >
            View all →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.slice(0, 6).map((useCase) => (
            <UseCaseCard key={useCase.id} useCase={useCase} />
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/use-cases"
            className="text-sm text-claw-400 hover:text-claw-300 transition-colors"
          >
            View all use cases →
          </Link>
        </div>
      </div>
    </section>
  );
}
