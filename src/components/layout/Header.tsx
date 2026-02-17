"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/use-cases", label: "Use Cases" },
  { href: "/submit", label: "Submit" },
  { href: "/risks", label: "Risks" },
  { href: "/about", label: "About" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-2xl" role="img" aria-label="Lobster">
              🦞
            </span>
            <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white group-hover:text-claw-400 transition-colors">
              Clawledge
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-foreground-secondary hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://github.com/clawdbot/clawdbot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm px-4 py-2 rounded-lg bg-claw-500/10 text-claw-400 hover:bg-claw-500/20 border border-claw-500/20 transition-colors"
            >
              GitHub ↗
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-foreground-secondary hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <nav className="md:hidden pb-4 border-t border-surface-border pt-4">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-foreground-secondary hover:text-white transition-colors py-1"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://github.com/clawdbot/clawdbot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-claw-400 hover:text-claw-300 transition-colors py-1"
              >
                GitHub ↗
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
