import Link from "next/link";
import {
  Zap,
  Code2,
  PenTool,
  DollarSign,
  Home,
  Search,
  TrendingUp,
  Heart,
  MessageCircle,
  Palette,
  Bitcoin,
  Flame,
} from "lucide-react";
import { CATEGORY_META } from "@/lib/constants";
import { getCategoryCount } from "@/lib/data";
import { Category } from "@/lib/types";

const ICON_MAP: Record<string, React.ElementType> = {
  Zap,
  Code2,
  PenTool,
  DollarSign,
  Home,
  Search,
  TrendingUp,
  Heart,
  MessageCircle,
  Palette,
  Bitcoin,
  Flame,
};

export function CategoryGrid() {
  const categories = Object.entries(CATEGORY_META) as [
    Category,
    (typeof CATEGORY_META)[Category],
  ][];

  return (
    <section className="py-16 sm:py-20 bg-surface-dark/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-white">
            Browse by Category
          </h2>
          <p className="mt-2 text-foreground-secondary">
            From productivity hacks to wild experiments
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {categories.map(([key, meta]) => {
            const Icon = ICON_MAP[meta.icon] || Zap;
            const count = getCategoryCount(key);
            return (
              <Link
                key={key}
                href={`/use-cases?category=${key}`}
                className="group flex flex-col items-center gap-2 rounded-xl border border-surface-border bg-surface p-4 text-center transition-all hover:border-claw-500/30 hover:bg-surface-light"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br ${meta.gradient} bg-opacity-10`}
                >
                  <Icon size={20} className="text-white" />
                </div>
                <span className="text-sm font-medium text-white group-hover:text-claw-400 transition-colors">
                  {meta.label}
                </span>
                <span className="text-xs text-foreground-secondary">
                  {count} {count === 1 ? "case" : "cases"}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
