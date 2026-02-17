import { Category } from "./types";

export interface CategoryMeta {
  label: string;
  icon: string;
  description: string;
  gradient: string;
}

export const CATEGORY_META: Record<Category, CategoryMeta> = {
  productivity: {
    label: "Productivity",
    icon: "Zap",
    description: "Email, calendar, todos, and workflow automation",
    gradient: "from-blue-500 to-cyan-500",
  },
  development: {
    label: "Development",
    icon: "Code2",
    description: "Coding, DevOps, PRs, and CI/CD automation",
    gradient: "from-green-500 to-emerald-500",
  },
  "content-creation": {
    label: "Content Creation",
    icon: "PenTool",
    description: "Social media, blogs, newsletters, and content repurposing",
    gradient: "from-purple-500 to-pink-500",
  },
  "money-making": {
    label: "Money Making",
    icon: "DollarSign",
    description: "Monetization, services, and revenue generation",
    gradient: "from-yellow-500 to-orange-500",
  },
  "smart-home": {
    label: "Smart Home",
    icon: "Home",
    description: "IoT, home automation, and connected devices",
    gradient: "from-teal-500 to-green-500",
  },
  research: {
    label: "Research",
    icon: "Search",
    description: "Web research, knowledge bases, and information gathering",
    gradient: "from-indigo-500 to-blue-500",
  },
  finance: {
    label: "Finance",
    icon: "TrendingUp",
    description: "Trading, portfolio tracking, and financial analysis",
    gradient: "from-emerald-500 to-teal-500",
  },
  health: {
    label: "Health",
    icon: "Heart",
    description: "Fitness tracking, wellness, and health monitoring",
    gradient: "from-rose-500 to-pink-500",
  },
  communication: {
    label: "Communication",
    icon: "MessageCircle",
    description: "Messaging, CRM, and communication automation",
    gradient: "from-sky-500 to-blue-500",
  },
  creative: {
    label: "Creative",
    icon: "Palette",
    description: "Audio, video, design, and creative production",
    gradient: "from-fuchsia-500 to-purple-500",
  },
  crypto: {
    label: "Crypto",
    icon: "Bitcoin",
    description: "On-chain analysis, DeFi, and crypto automation",
    gradient: "from-amber-500 to-yellow-500",
  },
  freelancer: {
    label: "Freelancer",
    icon: "Briefcase",
    description: "Invoicing, bookkeeping, travel, and client management for solopreneurs",
    gradient: "from-emerald-400 to-cyan-500",
  },
  wild: {
    label: "Wild",
    icon: "Flame",
    description: "The craziest and most experimental use cases",
    gradient: "from-red-500 to-orange-500",
  },
};

export const DIFFICULTY_META: Record<string, { label: string; color: string }> = {
  beginner: { label: "Beginner", color: "text-green-400 bg-green-400/10 border-green-400/20" },
  intermediate: { label: "Intermediate", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  advanced: { label: "Advanced", color: "text-red-400 bg-red-400/10 border-red-400/20" },
};

export const SITE_CONFIG = {
  name: "Clawledge",
  tagline: "Your Knowledge Base for the OpenClaw Ecosystem",
  description:
    "Discover real-world OpenClaw and Clawdbot use cases, explore the ecosystem of skills, repos and tools, and get honest cost & setup data. The curated knowledge base for AI agent enthusiasts.",
  url: "https://clawledge.com",
};
