export type Category =
  | "productivity"
  | "development"
  | "content-creation"
  | "money-making"
  | "smart-home"
  | "research"
  | "finance"
  | "health"
  | "communication"
  | "creative"
  | "crypto"
  | "freelancer"
  | "wild";

export type SourceType =
  | "x-post"
  | "github"
  | "blog"
  | "reddit"
  | "discord"
  | "youtube"
  | "medium"
  | "hacker-news"
  | "substack";

export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Source {
  type: SourceType;
  url: string;
  author: string;
  authorHandle?: string;
  date?: string;
  quote?: string;
}

export interface GitHubRepo {
  name: string;
  url: string;
  description: string;
  stars: number;
  category: Category;
  isOfficial: boolean;
  lastUpdated: string;
}

export interface UseCase {
  id: string;
  title: string;
  description: string;
  fullContent: string;
  category: Category;
  tags: string[];
  difficulty: Difficulty;
  estimatedSetupTime: string;
  source: Source;
  requirements: string[];
  monthlyApiCost: string;
  monetizable: boolean;
  revenueEstimate?: string;
  verified: boolean;
  dateAdded: string;
  featured: boolean;
  impactScore?: number;
  relatedSkills?: string[];
  relatedRepos?: string[];
}
