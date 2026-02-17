import Link from "next/link";
import { UseCase } from "@/lib/types";
import { CATEGORY_META } from "@/lib/constants";
import {
  CategoryBadge,
  DifficultyBadge,
  MonetizableBadge,
  VerifiedBadge,
} from "@/components/ui/Badge";
import { Tag } from "@/components/ui/Tag";
import {
  ArrowLeft,
  Clock,
  DollarSign,
  ExternalLink,
  User,
} from "lucide-react";

function renderContent(content: string) {
  // Convert markdown-like content to HTML
  const lines = content.split("\n");
  const html = lines
    .map((line) => {
      if (line.startsWith("## ")) {
        return `<h2>${line.slice(3)}</h2>`;
      }
      if (line.startsWith("- ")) {
        return `<li>${line.slice(2)}</li>`;
      }
      if (line.trim() === "") {
        return "<br/>";
      }
      return `<p>${line}</p>`;
    })
    .join("\n")
    // Wrap consecutive <li> elements in <ul>
    .replace(/(<li>.*?<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`)
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  return html;
}

export function UseCaseDetail({ useCase }: { useCase: UseCase }) {
  const categoryMeta = CATEGORY_META[useCase.category];

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-12">
      {/* Back link */}
      <Link
        href="/use-cases"
        className="inline-flex items-center gap-1 text-sm text-foreground-secondary hover:text-white transition-colors mb-8"
      >
        <ArrowLeft size={16} />
        Back to all use cases
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2 mb-4">
          <CategoryBadge category={useCase.category} />
          <DifficultyBadge difficulty={useCase.difficulty} />
          {useCase.monetizable && <MonetizableBadge />}
          {useCase.verified && <VerifiedBadge />}
        </div>

        <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-white leading-tight">
          {useCase.title}
        </h1>

        <p className="mt-4 text-lg text-foreground-secondary leading-relaxed">
          {useCase.description}
        </p>
      </div>

      {/* Quick info cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        <div className="rounded-lg border border-surface-border bg-surface p-3">
          <div className="flex items-center gap-1.5 text-xs text-foreground-secondary mb-1">
            <Clock size={12} />
            Setup Time
          </div>
          <div className="text-sm font-medium text-white">
            {useCase.estimatedSetupTime}
          </div>
        </div>
        <div className="rounded-lg border border-surface-border bg-surface p-3">
          <div className="flex items-center gap-1.5 text-xs text-foreground-secondary mb-1">
            <DollarSign size={12} />
            Monthly Cost
          </div>
          <div className="text-sm font-medium text-white">
            {useCase.monthlyApiCost}
          </div>
        </div>
        <div className="rounded-lg border border-surface-border bg-surface p-3">
          <div className="text-xs text-foreground-secondary mb-1">
            Category
          </div>
          <div className="text-sm font-medium text-white">
            {categoryMeta.label}
          </div>
        </div>
        <div className="rounded-lg border border-surface-border bg-surface p-3">
          <div className="text-xs text-foreground-secondary mb-1">
            Difficulty
          </div>
          <div className="text-sm font-medium text-white capitalize">
            {useCase.difficulty}
          </div>
        </div>
      </div>

      {/* Revenue estimate */}
      {useCase.monetizable && useCase.revenueEstimate && (
        <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 p-4 mb-10">
          <div className="text-sm font-medium text-emerald-400 mb-1">
            💰 Revenue Estimate
          </div>
          <div className="text-white">{useCase.revenueEstimate}</div>
        </div>
      )}

      {/* Full content */}
      <div
        className="prose prose-sm max-w-none mb-10"
        dangerouslySetInnerHTML={{ __html: renderContent(useCase.fullContent) }}
      />

      {/* Requirements */}
      {useCase.requirements.length > 0 && (
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mb-4">
            Requirements
          </h2>
          <ul className="space-y-2">
            {useCase.requirements.map((req, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-foreground-secondary"
              >
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-claw-500 shrink-0" />
                {req}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Source */}
      <div className="rounded-lg border border-surface-border bg-surface p-5 mb-10">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white mb-3">
          Source
        </h2>
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-light">
            <User size={14} className="text-foreground-secondary" />
          </div>
          <div>
            <div className="text-sm font-medium text-white">
              {useCase.source.author}
              {useCase.source.authorHandle && (
                <span className="ml-1 text-foreground-secondary">
                  {useCase.source.authorHandle}
                </span>
              )}
            </div>
            <div className="text-xs text-foreground-secondary capitalize">
              {useCase.source.type.replace("-", " ")}
              {useCase.source.date && ` · ${useCase.source.date}`}
            </div>
            {useCase.source.url && (
              <a
                href={useCase.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-claw-400 hover:text-claw-300 mt-1 transition-colors"
              >
                View source
                <ExternalLink size={10} />
              </a>
            )}
          </div>
        </div>
        {useCase.source.quote && (
          <blockquote className="mt-3 border-l-2 border-claw-500/40 pl-3 text-sm italic text-foreground-secondary">
            &ldquo;{useCase.source.quote}&rdquo;
          </blockquote>
        )}
      </div>

      {/* Tags */}
      {useCase.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {useCase.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      )}
    </div>
  );
}
