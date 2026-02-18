import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-claw-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-claw-500/10 px-4 py-1.5 text-sm text-claw-400 border border-claw-500/20">
          <span>🦞</span>
          <span>The OpenClaw knowledge base — honest, curated, independent</span>
        </div>

        <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight">
          Real-World{" "}
          <span className="bg-gradient-to-r from-claw-400 to-orange-400 bg-clip-text text-transparent">
            OpenClaw
          </span>{" "}
          Use Cases
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-foreground-secondary max-w-2xl mx-auto leading-relaxed">
          Discover what people build with OpenClaw (formerly Clawdbot). Honest
          use cases, real cost data, and the full ecosystem. No hype — just
          what works.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/use-cases"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-claw-500 to-orange-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-claw-500/25 hover:shadow-claw-500/40 transition-shadow"
          >
            Browse Use Cases
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center rounded-lg border border-surface-border px-6 py-3 text-sm font-medium text-foreground-secondary hover:text-white hover:border-white/20 transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
