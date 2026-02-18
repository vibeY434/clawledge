import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Getting Started with OpenClaw",
  description:
    "Learn how to get started with OpenClaw (formerly Clawdbot). Hardware requirements, installation steps, and beginner-friendly use cases to try first.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/getting-started`,
  },
  openGraph: {
    title: "Getting Started with OpenClaw",
    description:
      "Everything you need to start building with OpenClaw. From installation to your first automation.",
    url: `${SITE_CONFIG.url}/getting-started`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Getting Started with OpenClaw | Clawledge",
    description:
      "Everything you need to start building with OpenClaw. From installation to your first automation.",
  },
};

const beginnerCases = [
  {
    id: "family-assistant",
    title: "Family Assistant — Morning Briefings",
    desc: "Start your day with automated weather, calendar, and task summaries.",
  },
  {
    id: "inbox-zero-via-whatsapp",
    title: "Inbox Zero via WhatsApp",
    desc: "Let OpenClaw triage your email and send you a WhatsApp summary.",
  },
  {
    id: "reddit-daily-digest",
    title: "Personalized Reddit Daily Digest",
    desc: "Auto-curate Reddit posts from your favorite subreddits.",
  },
  {
    id: "wine-cellar-inventory",
    title: "Wine Cellar Inventory Management",
    desc: "Track your wine collection with photos and tasting notes.",
  },
  {
    id: "claudecode-writer-repurposing",
    title: "Automated Content Repurposing",
    desc: "Turn one article into posts for five different platforms.",
  },
];

export default function GettingStartedPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-white mb-2">
        Getting Started with OpenClaw
      </h1>
      <p className="text-foreground-secondary text-sm mb-10">
        Formerly known as Clawdbot / Moltbot
      </p>

      <div className="prose prose-sm max-w-none space-y-8 text-foreground-secondary leading-relaxed">
        {/* What is OpenClaw */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            What is OpenClaw?
          </h2>
          <p>
            OpenClaw is an open-source autonomous AI agent that runs on your
            computer. It can browse the web, write and execute code, manage
            files, control smart home devices, send messages, and handle complex
            multi-step tasks — all with minimal supervision.
          </p>
          <p>
            Think of it as an AI assistant that can actually <em>do things</em>,
            not just chat about them. It connects to APIs, automates workflows,
            and integrates with thousands of community-built skills.
          </p>
        </section>

        {/* Hardware */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            Hardware Requirements
          </h2>
          <div className="rounded-lg border border-surface-border bg-surface p-5 not-prose">
            <div className="grid gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground-secondary">
                  Recommended device
                </span>
                <span className="text-white font-medium">
                  Mac Mini M4 (or any always-on machine)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-secondary">RAM</span>
                <span className="text-white font-medium">16 GB minimum</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-secondary">OS</span>
                <span className="text-white font-medium">
                  macOS, Linux, or Windows (WSL)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-secondary">Internet</span>
                <span className="text-white font-medium">
                  Stable connection (for API calls)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground-secondary">Monthly cost</span>
                <span className="text-white font-medium">
                  $5-50 API costs (varies by usage)
                </span>
              </div>
            </div>
          </div>
          <p className="mt-3">
            OpenClaw runs as a background process. Many users run it 24/7 on a
            dedicated Mac Mini or small server. You can also run it on your daily
            machine and start/stop it as needed.
          </p>
        </section>

        {/* Installation */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            Installation
          </h2>
          <p>
            The official installation guide is maintained in the OpenClaw
            documentation. Here are the key steps:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>
              Clone the repository from{" "}
              <a
                href="https://github.com/openclaw/openclaw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-claw-400 hover:text-claw-300 transition-colors inline-flex items-center gap-1"
              >
                GitHub
                <ExternalLink size={12} />
              </a>
            </li>
            <li>Configure your API keys (Anthropic Claude, OpenAI, etc.)</li>
            <li>Install dependencies and start the agent</li>
            <li>
              Browse and install skills from{" "}
              <a
                href="https://clawhub.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-claw-400 hover:text-claw-300 transition-colors inline-flex items-center gap-1"
              >
                ClawHub
                <ExternalLink size={12} />
              </a>
            </li>
          </ol>
          <div className="mt-4 rounded-lg border border-claw-500/20 bg-claw-500/5 p-4">
            <p className="text-sm">
              For detailed, up-to-date instructions, check the{" "}
              <a
                href="https://docs.openclaw.ai/start"
                target="_blank"
                rel="noopener noreferrer"
                className="text-claw-400 hover:text-claw-300 transition-colors font-medium inline-flex items-center gap-1"
              >
                Official Docs
                <ExternalLink size={12} />
              </a>
              . The OpenClaw team keeps these current with each release.
            </p>
          </div>
        </section>

        {/* Beginner Use Cases */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            Beginner-Friendly Use Cases
          </h2>
          <p>
            These use cases are rated &ldquo;Beginner&rdquo; difficulty and are
            great starting points:
          </p>
          <div className="grid gap-3 not-prose">
            {beginnerCases.map((uc) => (
              <Link
                key={uc.id}
                href={`/use-cases/${uc.id}`}
                className="flex items-start gap-3 rounded-lg border border-surface-border bg-surface p-4 hover:border-claw-500/30 hover:bg-surface-light transition-all group"
              >
                <div className="flex-1">
                  <div className="text-sm font-medium text-white group-hover:text-claw-400 transition-colors">
                    {uc.title}
                  </div>
                  <div className="text-xs text-foreground-secondary mt-0.5">
                    {uc.desc}
                  </div>
                </div>
                <span className="text-xs text-green-400 bg-green-400/10 border border-green-400/20 px-2 py-0.5 rounded shrink-0">
                  Beginner
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-3">
            <Link
              href="/use-cases?difficulty=beginner"
              className="text-claw-400 hover:text-claw-300 transition-colors font-medium"
            >
              Browse all beginner use cases &rarr;
            </Link>
          </p>
        </section>

        {/* What Next */}
        <section>
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
            What&apos;s Next?
          </h2>
          <p>Once you have OpenClaw running, explore these paths:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <Link
                href="/use-cases"
                className="text-claw-400 hover:text-claw-300 transition-colors"
              >
                Browse all {287} use cases
              </Link>{" "}
              to find automation ideas
            </li>
            <li>
              Check the{" "}
              <Link
                href="/risks"
                className="text-claw-400 hover:text-claw-300 transition-colors"
              >
                Risks &amp; Considerations
              </Link>{" "}
              page before going all-in
            </li>
            <li>
              <Link
                href="/submit"
                className="text-claw-400 hover:text-claw-300 transition-colors"
              >
                Submit your own use case
              </Link>{" "}
              when you build something cool
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
