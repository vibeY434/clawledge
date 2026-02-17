import { CATEGORY_META, DIFFICULTY_META } from "@/lib/constants";
import { Category, Difficulty } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryBadge({ category }: { category: Category }) {
  const meta = CATEGORY_META[category];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium border",
        "bg-gradient-to-r bg-clip-text text-transparent",
        meta.gradient,
        "border-white/10 bg-white/5"
      )}
      style={{
        backgroundImage: `linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {meta.label}
    </span>
  );
}

export function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const meta = DIFFICULTY_META[difficulty];
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
        meta.color
      )}
    >
      {meta.label}
    </span>
  );
}

export function MonetizableBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-emerald-400/10 text-emerald-400 border border-emerald-400/20">
      💰 Monetizable
    </span>
  );
}

export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-400/10 text-blue-400 border border-blue-400/20">
      ✓ Verified
    </span>
  );
}
