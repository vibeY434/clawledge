import Link from "next/link";
import { getWildUseCases } from "@/lib/data";
import { Card } from "@/components/ui/Card";
import { CategoryBadge, DifficultyBadge } from "@/components/ui/Badge";

export function WildCasesSection() {
  const wildCases = getWildUseCases().slice(0, 4);

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-white">
            🤯 Wild Use Cases
          </h2>
          <p className="mt-2 text-foreground-secondary">
            The craziest things people are doing with OpenClaw
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {wildCases.map((uc) => (
            <Link key={uc.id} href={`/use-cases/${uc.id}`}>
              <Card className="h-full">
                <div className="flex flex-wrap gap-2 mb-3">
                  <CategoryBadge category={uc.category} />
                  <DifficultyBadge difficulty={uc.difficulty} />
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white mb-2">
                  {uc.title}
                </h3>
                <p className="text-sm text-foreground-secondary leading-relaxed">
                  {uc.description}
                </p>
                {uc.source.quote && (
                  <blockquote className="mt-3 border-l-2 border-claw-500/40 pl-3 text-sm italic text-foreground-secondary">
                    &ldquo;{uc.source.quote}&rdquo;
                  </blockquote>
                )}
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
