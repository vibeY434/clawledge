import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface-dark">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦞</span>
            <span className="text-sm text-foreground-secondary">
              Clawledge — Your knowledge base for the OpenClaw ecosystem
            </span>
          </div>
          <div className="flex items-center gap-4 text-sm text-foreground-secondary">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="/impressum" className="hover:text-white transition-colors">
              Impressum
            </Link>
            <a
              href="https://github.com/clawdbot/clawdbot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              OpenClaw GitHub
            </a>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-surface-border text-center text-xs text-foreground-secondary">
          Built with Next.js and Vercel. Not affiliated with Anthropic or
          OpenClaw.
        </div>
      </div>
    </footer>
  );
}
