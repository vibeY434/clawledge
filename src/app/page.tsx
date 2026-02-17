import Link from "next/link";
import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { FeaturedCases } from "@/components/home/FeaturedCases";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { WildCasesSection } from "@/components/home/WildCasesSection";
import { SITE_CONFIG } from "@/lib/constants";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    url: SITE_CONFIG.url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_CONFIG.url}/use-cases?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection />
      <StatsBar />
      <FeaturedCases />
      <CategoryGrid />
      <WildCasesSection />

      {/* Submit CTA */}
      <section className="py-16 text-center">
        <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-white mb-4">
          Got an OpenClaw Setup?
        </h2>
        <p className="text-foreground-secondary mb-6 max-w-md mx-auto">
          Share it with the community and get featured on Clawledge.
        </p>
        <Link
          href="/submit"
          className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-claw-500 to-orange-500 text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          Submit Your Use Case &rarr;
        </Link>
      </section>
    </>
  );
}
