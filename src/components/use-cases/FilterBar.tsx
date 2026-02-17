"use client";

import { Category, Difficulty } from "@/lib/types";
import { CATEGORY_META, DIFFICULTY_META } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface FilterBarProps {
  selectedCategory: Category | null;
  selectedDifficulty: Difficulty | null;
  onCategoryChange: (category: Category | null) => void;
  onDifficultyChange: (difficulty: Difficulty | null) => void;
}

export function FilterBar({
  selectedCategory,
  selectedDifficulty,
  onCategoryChange,
  onDifficultyChange,
}: FilterBarProps) {
  const categories = Object.entries(CATEGORY_META) as [
    Category,
    (typeof CATEGORY_META)[Category],
  ][];

  const difficulties = Object.entries(DIFFICULTY_META) as [
    Difficulty,
    (typeof DIFFICULTY_META)[Difficulty],
  ][];

  return (
    <div className="space-y-4">
      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
            !selectedCategory
              ? "bg-claw-500/20 text-claw-400 border-claw-500/30"
              : "bg-surface text-foreground-secondary border-surface-border hover:border-white/20"
          )}
        >
          All
        </button>
        {categories.map(([key, meta]) => (
          <button
            key={key}
            onClick={() =>
              onCategoryChange(selectedCategory === key ? null : key)
            }
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
              selectedCategory === key
                ? "bg-claw-500/20 text-claw-400 border-claw-500/30"
                : "bg-surface text-foreground-secondary border-surface-border hover:border-white/20"
            )}
          >
            {meta.label}
          </button>
        ))}
      </div>

      {/* Difficulty filters */}
      <div className="flex flex-wrap gap-2">
        {difficulties.map(([key, meta]) => (
          <button
            key={key}
            onClick={() =>
              onDifficultyChange(selectedDifficulty === key ? null : key)
            }
            className={cn(
              "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
              selectedDifficulty === key
                ? meta.color
                : "bg-surface text-foreground-secondary border-surface-border hover:border-white/20"
            )}
          >
            {meta.label}
          </button>
        ))}
      </div>
    </div>
  );
}
