import { UseCase } from "@/lib/types";
import { UseCaseCard } from "./UseCaseCard";

export function UseCaseGrid({ useCases }: { useCases: UseCase[] }) {
  if (useCases.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-foreground-secondary text-lg">
          No use cases match your filters.
        </p>
        <p className="text-foreground-secondary text-sm mt-2">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {useCases.map((useCase) => (
        <UseCaseCard key={useCase.id} useCase={useCase} />
      ))}
    </div>
  );
}
