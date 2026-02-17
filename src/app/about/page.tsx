import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Clawledge is the independent knowledge base for the OpenClaw ecosystem. Honest use cases, real cost data, curated repos and skills.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-white mb-8">
        About Clawledge
      </h1>

      <div className="prose prose-sm max-w-none space-y-6">
        <p className="text-foreground-secondary leading-relaxed">
          Clawledge (Claw + Knowledge) is the independent knowledge base for the OpenClaw ecosystem. We curate real-world use cases with honest cost data, verified sources, and practical setup information — not just highlight reels.
        </p>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          What is OpenClaw?
        </h2>
        <p className="text-foreground-secondary leading-relaxed">
          OpenClaw is an open-source autonomous AI agent framework created by Peter Steinberger. It lets AI models operate independently on your computer — browsing the web, writing code, managing files, sending messages, and executing complex multi-step tasks with minimal human supervision. With 150,000+ GitHub stars, it has become one of the fastest-growing open-source projects ever.
        </p>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          Why Clawledge?
        </h2>
        <p className="text-foreground-secondary leading-relaxed">
          The OpenClaw ecosystem is exploding — 5,700+ skills on ClawHub, hundreds of community repos, and use cases scattered across X, Reddit, Hacker News, and countless blog posts. But finding honest information is hard. Most content is either hype or marketing.
        </p>
        <p className="text-foreground-secondary leading-relaxed">
          Clawledge brings it all together with a focus on honesty: real cost data (not just &ldquo;it&apos;s cheap&rdquo;), actual setup difficulty, and verified sources. We link back to the original creators and give credit where it&apos;s due.
        </p>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          The Naming History
        </h2>
        <div className="rounded-lg border border-surface-border bg-surface p-5">
          <ul className="space-y-3 text-sm text-foreground-secondary">
            <li className="flex gap-3">
              <span className="text-white font-medium shrink-0">Nov 2025</span>
              <span>Launched as <strong className="text-white">Clawdbot</strong> (named after Anthropic&apos;s Claude)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white font-medium shrink-0">Jan 27, 2026</span>
              <span>Renamed to <strong className="text-white">Moltbot</strong> after trademark complaint from Anthropic</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white font-medium shrink-0">Jan 29, 2026</span>
              <span>Handle snipers claimed @clawdbot on X, launched scam token ($16M market cap, then crash)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-white font-medium shrink-0">Jan 30, 2026</span>
              <span>Renamed to <strong className="text-white">OpenClaw</strong> (current name). Mascot: Molty the Space Lobster 🦞</span>
            </li>
          </ul>
        </div>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          What We Cover
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 not-prose">
          {[
            { title: "Use Cases", desc: "Real-world automations with honest cost and difficulty ratings" },
            { title: "Ecosystem", desc: "GitHub repos, skills, deployment templates, and tools" },
            { title: "Cost Data", desc: "Actual API costs from real users — not marketing estimates" },
            { title: "Source Verification", desc: "Every case links back to its original source" },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-surface-border bg-surface p-4"
            >
              <div className="text-sm font-medium text-white">{item.title}</div>
              <div className="text-xs text-foreground-secondary mt-1">{item.desc}</div>
            </div>
          ))}
        </div>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          Contributing
        </h2>
        <p className="text-foreground-secondary leading-relaxed">
          Found an interesting OpenClaw use case we haven&apos;t covered? Have a correction or cost update? We&apos;d love to hear from you. Reach out via our GitHub repository or submit a use case through the community channels.
        </p>

        <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-10">
          Useful Links
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 not-prose">
          {[
            {
              label: "OpenClaw GitHub",
              url: "https://github.com/openclaw/openclaw",
              desc: "Official repository (150K+ stars)",
            },
            {
              label: "OpenClaw Docs",
              url: "https://docs.openclaw.ai",
              desc: "Official documentation",
            },
            {
              label: "ClawHub Skills",
              url: "https://clawhub.com",
              desc: "5,700+ community skills marketplace",
            },
            {
              label: "Awesome OpenClaw",
              url: "https://github.com/rohitg00/awesome-openclaw",
              desc: "Comprehensive community resource (179K+ stars)",
            },
          ].map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 rounded-lg border border-surface-border bg-surface p-4 hover:border-claw-500/30 hover:bg-surface-light transition-all group"
            >
              <div className="flex-1">
                <div className="text-sm font-medium text-white group-hover:text-claw-400 transition-colors flex items-center gap-1">
                  {link.label}
                  <ExternalLink size={12} />
                </div>
                <div className="text-xs text-foreground-secondary mt-0.5">
                  {link.desc}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-12 pt-8 border-t border-surface-border text-center">
        <Link
          href="/use-cases"
          className="inline-flex items-center rounded-lg bg-gradient-to-r from-claw-500 to-orange-500 px-6 py-3 text-sm font-medium text-white shadow-lg shadow-claw-500/25 hover:shadow-claw-500/40 transition-shadow"
        >
          Browse Use Cases
        </Link>
      </div>
    </div>
  );
}
