import useCasesData from "@/data/use-cases.json";
import repositoriesData from "@/data/repositories.json";
import { UseCase, GitHubRepo, Category } from "./types";

const useCases: UseCase[] = useCasesData as UseCase[];
const repositories: GitHubRepo[] = repositoriesData as GitHubRepo[];

export function getAllUseCases(): UseCase[] {
  return [...useCases].sort(
    (a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
  );
}

export function getUseCaseBySlug(slug: string): UseCase | undefined {
  return useCases.find((uc) => uc.id === slug);
}

export function getFeaturedUseCases(): UseCase[] {
  return useCases.filter((uc) => uc.featured);
}

export function getBangerUseCases(limit = 6): UseCase[] {
  return [...useCases]
    .filter((uc) => uc.impactScore && uc.impactScore >= 7)
    .sort((a, b) => (b.impactScore ?? 0) - (a.impactScore ?? 0))
    .slice(0, limit);
}

export function getUseCasesByCategory(category: Category): UseCase[] {
  return useCases.filter((uc) => uc.category === category);
}

export function getMoneyMakingUseCases(): UseCase[] {
  return useCases.filter((uc) => uc.monetizable && uc.revenueEstimate);
}

export function getWildUseCases(): UseCase[] {
  return useCases.filter(
    (uc) => uc.category === "wild" || uc.tags.includes("autonomous")
  );
}

export function getAllCategories(): Category[] {
  const cats = new Set(useCases.map((uc) => uc.category));
  return Array.from(cats);
}

export function getCategoryCount(category: Category): number {
  return useCases.filter((uc) => uc.category === category).length;
}

export function getStats() {
  const categories = new Set(useCases.map((uc) => uc.category));
  return {
    totalCases: useCases.length,
    categories: categories.size,
    verified: useCases.filter((uc) => uc.verified).length,
    repositories: repositories.length,
  };
}

export function getAllRepositories(): GitHubRepo[] {
  return repositories;
}
