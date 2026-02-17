import type { Metadata } from "next";
import { getAllUseCases } from "@/lib/data";
import { UseCaseListingClient } from "@/components/use-cases/UseCaseListingClient";

export const metadata: Metadata = {
  title: "All Use Cases",
  description:
    "Browse all curated OpenClaw and Clawdbot use cases — from crypto trading bots and content machines to smart home automation and developer tools.",
};

export default async function UseCasesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const useCases = getAllUseCases();

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-white">
          Use Cases
        </h1>
        <p className="mt-2 text-foreground-secondary">
          Real-world OpenClaw automations from the community
        </p>
      </div>

      <UseCaseListingClient
        useCases={useCases}
        initialCategory={params.category}
      />
    </div>
  );
}
