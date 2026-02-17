import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="text-6xl mb-4">🦞</div>
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white mb-2">
        404 — Page Not Found
      </h1>
      <p className="text-foreground-secondary mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist. Maybe the lobster crawled
        away with it.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="inline-flex items-center rounded-lg bg-gradient-to-r from-claw-500 to-orange-500 px-5 py-2.5 text-sm font-medium text-white"
        >
          Go Home
        </Link>
        <Link
          href="/use-cases"
          className="inline-flex items-center rounded-lg border border-surface-border px-5 py-2.5 text-sm font-medium text-foreground-secondary hover:text-white transition-colors"
        >
          Browse Use Cases
        </Link>
      </div>
    </div>
  );
}
