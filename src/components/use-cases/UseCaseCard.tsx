import Link from "next/link";
import { UseCase } from "@/lib/types";
import { Card } from "@/components/ui/Card";
import {
  CategoryBadge,
  DifficultyBadge,
  MonetizableBadge,
  VerifiedBadge,
} from "@/components/ui/Badge";
import { Clock, DollarSign } from "lucide-react";

export function UseCaseCard({ useCase }: { useCase: UseCase }) {
  return (
    <Link href={`/use-cases/${useCase.id}`}>
      <Card className="h-full flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          <CategoryBadge category={useCase.category} />
          <DifficultyBadge difficulty={useCase.difficulty} />
          {useCase.monetizable && <MonetizableBadge />}
          {useCase.verified && <VerifiedBadge />}
        </div>

        <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-semibold text-white mb-2 leading-snug">
          {useCase.title}
        </h3>

        <p className="text-sm text-foreground-secondary leading-relaxed flex-1">
          {useCase.description}
        </p>

        <div className="mt-4 flex items-center gap-4 text-xs text-foreground-secondary">
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {useCase.estimatedSetupTime}
          </span>
          <span className="flex items-center gap-1">
            <DollarSign size={12} />
            {useCase.monthlyApiCost}/mo
          </span>
        </div>

        {useCase.revenueEstimate && (
          <div className="mt-2 text-xs text-emerald-400">
            Revenue: {useCase.revenueEstimate}
          </div>
        )}
      </Card>
    </Link>
  );
}
