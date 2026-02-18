import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllUseCases, getUseCaseBySlug } from "@/lib/data";
import { SITE_CONFIG } from "@/lib/constants";
import { UseCaseDetail } from "@/components/use-cases/UseCaseDetail";

export function generateStaticParams() {
  return getAllUseCases().map((uc) => ({ slug: uc.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);
  if (!useCase) return {};

  const url = `${SITE_CONFIG.url}/use-cases/${slug}`;

  return {
    title: useCase.title,
    description: useCase.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: useCase.title,
      description: useCase.description,
      url,
      type: "article",
      publishedTime: useCase.dateAdded,
    },
    twitter: {
      card: "summary_large_image",
      title: useCase.title,
      description: useCase.description,
    },
  };
}

export default async function UseCaseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const useCase = getUseCaseBySlug(slug);
  if (!useCase) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: useCase.title,
    description: useCase.description,
    datePublished: useCase.dateAdded,
    author: {
      "@type": "Person",
      name: useCase.source.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <UseCaseDetail useCase={useCase} />
    </>
  );
}
