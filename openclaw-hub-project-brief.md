# OpenClaw Hub – Project Brief & Übergabe für Claude Code

## Projektübersicht

**Ziel:** Eine kuratierte Website, die reale OpenClaw/Clawdbot Use Cases sammelt, beschreibt, kategorisiert und die besten GitHub-Repositories katalogisiert. Die Referenz-Seite im deutschsprachigen (und englischsprachigen) Raum für OpenClaw werden.

**Eigentümer:** Dominik (Controller/Business Analyst, Mainz – erfahren mit WordPress, Web-Monetarisierung, Power BI, hat bereits meindeinunser.com aufgebaut)

**Zeitdruck:** OpenClaw ist erst ~3 Wochen alt (Explosion Ende Januar 2026). First-Mover-Advantage ist real. Es gibt noch keine kuratierte Ressource dieser Art.

**Sprache der Website:** Englisch (primär), optional Deutsch als Zweitsprache später

---

## Tech Stack Empfehlung

### Primär: Next.js + Vercel
- **Framework:** Next.js 14+ (App Router)
- **Hosting:** Vercel (bereits connected in Dominiks Claude-Setup)
- **Styling:** Tailwind CSS
- **Content:** MDX oder JSON-basierte Use Case Dateien (kein CMS nötig am Anfang – Content lebt im Repo)
- **Suche:** Client-side Fuzzy Search (z.B. Fuse.js)
- **Analytics:** Vercel Analytics + optional Plausible

### Warum nicht WordPress?
- Performance, SEO-Vorteile von statisch generierten Seiten
- Kostenlos auf Vercel hostbar
- Moderner Tech-Stack passt zur Zielgruppe (Entwickler, Tech-Enthusiasten)
- Einfacher zu maintainen, kein Plugin-Chaos

### Domain-Ideen
- openclawcases.com
- openclawindex.com  
- openclawdirectory.com
- clawdex.com (kurz, catchy)
- openclawbase.com

---

## Datenmodell

### Use Case

```typescript
interface UseCase {
  id: string;                    // slug, z.B. "overnight-code-review"
  title: string;                 // "Overnight Code Review & PR Creation"
  description: string;           // Kurzbeschreibung (2-3 Sätze)
  fullContent: string;           // Ausführliche Beschreibung (MDX)
  category: Category;            // Hauptkategorie
  tags: string[];                // z.B. ["automation", "developer", "github"]
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedSetupTime: string;    // z.B. "30 min", "2 hours", "1 weekend"
  source: Source;                // Woher kommt der Use Case
  requirements: string[];        // z.B. ["Mac Mini", "Claude API Key", "GitHub Account"]
  monthlyApiCost: string;        // Geschätzte monatliche Kosten, z.B. "$20-50"
  monetizable: boolean;          // Kann man damit Geld verdienen?
  revenueEstimate?: string;      // z.B. "$500-1200/month"
  verified: boolean;             // Wurde der Use Case verifiziert?
  dateAdded: string;             // ISO date
  featured: boolean;             // Auf Startseite hervorheben
  relatedSkills?: string[];      // OpenClaw Skills die benötigt werden
  relatedRepos?: GitHubRepo[];   // Verknüpfte Repositories
}

interface Source {
  type: "x-post" | "github" | "blog" | "reddit" | "discord" | "youtube" | "medium";
  url: string;
  author: string;
  authorHandle?: string;         // z.B. "@davekiss"
  date?: string;
  quote?: string;                // Originalzitat (kurz)
}

type Category = 
  | "productivity"       // E-Mail, Kalender, Todos
  | "development"        // Coding, DevOps, PRs
  | "content-creation"   // Social Media, Blogs, Newsletter
  | "money-making"       // Monetarisierung, Services
  | "smart-home"         // IoT, Philips Hue, etc.
  | "research"           // Web Research, Knowledge Base
  | "finance"            // Trading, Portfolio, Tracking
  | "health"             // WHOOP, Fitness, Wellness
  | "communication"      // Messaging, CRM
  | "creative"           // Audio, Video, Design
  | "crypto"             // On-chain, DeFi, Airdrops
  | "wild"               // Verrückte/experimentelle Use Cases
```

### GitHub Repository

```typescript
interface GitHubRepo {
  name: string;                  // Repo-Name
  url: string;                   // GitHub URL
  description: string;           // Was macht es
  stars: number;                 // Sterne
  category: Category;
  isOfficial: boolean;           // Offizielles OpenClaw Repo?
  lastUpdated: string;           // Letztes Update
}
```

---

## Kuratierte Use Cases (aus Recherche)

### 🤯 Kategorie: "Wild" – Mit den Ohren schlackern

#### 1. Krypto-Bot der sich seine eigene GPU verdienen soll
- **Beschreibung:** Ein Nutzer gab seinem Clawdbot ein $2.000 Trading-Wallet auf Hyperliquid und sagte: "Wenn du eine RTX 4090 willst, verdien sie dir." Der Bot tradet seitdem 24/7 – scannt X-Sentiment, trackt Trump-Posts und trifft eigenständig Handelsentscheidungen.
- **Quelle:** @Legendaryy auf X, 24. Januar 2026
- **URL:** Referenced in beincrypto.com/openclaw-ai-agents-enter-crypto-markets/
- **Kategorie:** crypto, wild
- **Difficulty:** advanced

#### 2. Komplette Website per Telegram vom Sofa aus neu gebaut
- **Beschreibung:** @davekiss hat seine komplette persönliche Website neu gebaut – per Telegram-Chat, vom Sofa aus, während er Netflix schaute. 18 Blogposts von Notion zu Astro migriert, DNS zu Cloudflare umgezogen. Nie den Laptop aufgeklappt.
- **Quelle:** @davekiss auf X
- **URL:** clawd.bot/showcase
- **Kategorie:** development, wild
- **Difficulty:** intermediate

#### 3. Deployment gefixt beim Gassi gehen per Sprachbefehl
- **Beschreibung:** Ein Nutzer packte seinen Bot auf einen Hetzner-Server. Nachts entdeckte der Agent ein fehlgeschlagenes Railway-Deployment, analysierte Logs, identifizierte den Root Cause (falsche Build-Commands), fixte die Configs, redeployed und erstellte einen PR. Alles gesteuert per Voice beim Hund ausführen.
- **Quelle:** X-Post, referenziert auf clawd.bot/showcase
- **Kategorie:** development, wild
- **Difficulty:** advanced

#### 4. Moltbook – Soziales Netzwerk nur für AI-Agenten
- **Beschreibung:** Matt Schlicht (Octane AI) ließ seinen OpenClaw-Agent "Clawd Clawderberg" Moltbook bauen – ein soziales Netzwerk ausschließlich für AI-Agenten. Über 1,5 Millionen Agents posten, kommentieren und interagieren. Menschen dürfen nur zuschauen.
- **Quelle:** IBM Think, CNBC, Wikipedia
- **URL:** ibm.com/think/news/clawdbot-ai-agent-testing-limits-vertical-integration
- **Kategorie:** wild, creative
- **Difficulty:** advanced

#### 5. Sora-Video mit automatischer Watermark-Entfernung
- **Beschreibung:** Jemand bat seinen OpenClaw ein Sora2-Video zu erstellen und es "etwas edgy" zu machen. 5 Minuten später kam der Bot zurück – hatte eigenständig die Watermark-Entfernung herausgefunden, API-Keys organisiert und einen kompletten Workflow gebaut.
- **Quelle:** @xMikeMickelson auf X
- **URL:** openclaw.ai
- **Kategorie:** creative, wild
- **Difficulty:** advanced

### 💰 Kategorie: Gelddruckmaschine

#### 6. Content-Maschine für Social Media (X, LinkedIn, Newsletter)
- **Beschreibung:** Der Agent verwandelt Longform-Content (Blogposts, Podcasts, Videos) automatisch in X-Threads, LinkedIn-Posts, E-Mail-Newsletter und Social Media Posts. Content Creator zahlen $600–$1.200/Monat dafür als Service. API-Kosten: ~$40-80/Monat.
- **Quelle:** markaicode.com/openclaw-money-making-automations-2026
- **Kategorie:** money-making, content-creation
- **Revenue:** $600-1.200/month per client
- **Difficulty:** intermediate

#### 7. Inbox-Management als Service
- **Beschreibung:** Clawdbot sortiert, priorisiert und draftet E-Mail-Antworten für Anwälte, Berater und Führungskräfte. 8 Kunden à $400/Monat = $3.200 recurring revenue. Kunden sparen 10-15 Stunden/Woche.
- **Quelle:** aimojo.io/make-money-with-clawdbody
- **Kategorie:** money-making, productivity
- **Revenue:** $400/month per client
- **Difficulty:** intermediate

#### 8. ClawHub Skills Marketplace
- **Beschreibung:** Vorgefertigte Automatisierungs-Skills bauen und auf dem ClawHub Marketplace verkaufen. Vergleich: Wie der App Store 2009. Ein Nutzer baute einen GA4-Skill in 20 Minuten und veröffentlichte ihn direkt.
- **Quelle:** clawd.bot/showcase, github.com/hesamsheikh/awesome-openclaw-usecases
- **Kategorie:** money-making, development
- **Revenue:** Variabel, First-Mover-Advantage
- **Difficulty:** intermediate

#### 9. Polymarket Trading Bot
- **Beschreibung:** OpenClaw monitort globale News-Feeds und Social Media Sentiment in Echtzeit, um automatisiert Positionen auf Polymarket zu eröffnen. Reduziert "Human Delay" und nutzt Mispricings – ein Vorteil, der normalerweise institutionellen Bots vorbehalten ist.
- **Quelle:** coinmarketcap.com/academy/article/what-is-openclaw-moltbot-clawdbot-ai-agent-crypto-twitter
- **Kategorie:** money-making, finance, crypto
- **Revenue:** Variabel, risikobehaftet
- **Difficulty:** advanced

#### 10. Dokumentenverarbeitung als Service
- **Beschreibung:** Rechnungen, PDFs, Formulare auslesen, Daten in Spreadsheets organisieren, Dateien sortieren. Für Zahnarztpraxen, Versicherungen, Immobilienbüros. Ersetzt $18-25/h Dateneingabe-Jobs. 5 Kunden à $600/Monat = $3.000.
- **Quelle:** aimojo.io/make-money-with-clawdbody
- **Kategorie:** money-making, productivity
- **Revenue:** $600/month per client
- **Difficulty:** intermediate

### ⚡ Kategorie: Produktivität & Alltag

#### 11. Drei Businesses mit einem verstaubten Mac Studio managen
- **Beschreibung:** @aiedge_ testete Clawdbot 48 Stunden und verwandelte seinen verstaubten Mac Studio in einen 24/7 AI-Agenten, der drei Businesses managt.
- **Quelle:** @aiedge_ auf X
- **URL:** clawd.bot/showcase
- **Kategorie:** productivity
- **Difficulty:** intermediate

#### 12. Intelligente Kalender-Automatisierung
- **Beschreibung:** Bot scannt Textnachrichten auf Versprechen ("Ich schau mir das morgen an!"), erstellt automatisch Kalendereinträge, erkennt Terminvorschläge und blockt Hold-Slots. Abends 20 Uhr: Briefing für den nächsten Tag.
- **Quelle:** brandon.wang/2026/clawdbot
- **Kategorie:** productivity, communication
- **Difficulty:** intermediate

#### 13. Familienassistent
- **Beschreibung:** Aggregiert alle Familienkalender in ein Morning Briefing, monitort Nachrichten für Termine, verwaltet Haushaltsinventar. Benachrichtigt über anstehende Schultests der Kinder.
- **Quelle:** github.com/hesamsheikh/awesome-openclaw-usecases + clawd.bot/showcase
- **Kategorie:** productivity
- **Difficulty:** beginner

#### 14. Inbox Zero per WhatsApp
- **Beschreibung:** Hunderte E-Mails aufgeräumt, Inbox Zero erreicht, dann einen wöchentlichen Cron Job eingerichtet – alles über WhatsApp gesteuert.
- **Quelle:** @andrewjiang auf X
- **Kategorie:** productivity
- **Difficulty:** beginner

#### 15. Smart Home Integration
- **Beschreibung:** Komplett integriert mit E-Mails (auto-archiviert), Home Assistant, Homelab via SSH, Todo-Liste (Things + Apple Notes), Einkaufsliste. Alles über einen einzigen Telegram-Chat erreichbar.
- **Quelle:** @acevail_ auf X
- **Kategorie:** smart-home, productivity
- **Difficulty:** intermediate

### 🔧 Kategorie: Development

#### 16. Sentry → Claw → Codex → PR Pipeline
- **Beschreibung:** Automatisierter Workflow der Bugs resolved bevor Entwickler davon erfahren: Sentry erkennt Bug → OpenClaw analysiert → Codex fixt → PR wird erstellt → Slack-Update. Komplett autonom.
- **Quelle:** clawd.bot/showcase
- **Kategorie:** development
- **Difficulty:** advanced

#### 17. Multi-Agent Business Team
- **Beschreibung:** Mehrere spezialisierte Agents (Strategie, Dev, Marketing, Business) als koordiniertes Team über einen einzigen Telegram-Chat gesteuert.
- **Quelle:** github.com/hesamsheikh/awesome-openclaw-usecases
- **Kategorie:** development, productivity
- **Difficulty:** advanced

### 📊 Kategorie: Research & Finance

#### 18. YouTube Content Research Automation
- **Beschreibung:** Automatisiertes Video-Ideen-Scouting, Research und Tracking für YouTube-Kanäle. Tägliche Zusammenfassungen neuer Videos von Lieblingskanälen.
- **Quelle:** github.com/hesamsheikh/awesome-openclaw-usecases
- **Kategorie:** research, content-creation
- **Difficulty:** intermediate

#### 19. Earnings Report Tracker
- **Beschreibung:** Tech/AI Earnings Reports automatisch tracken mit Previews, Alerts und detaillierten Summaries.
- **Quelle:** github.com/hesamsheikh/awesome-openclaw-usecases
- **Kategorie:** finance, research
- **Difficulty:** intermediate

#### 20. Reddit Digest nach Vorlieben
- **Beschreibung:** Kuratierter täglicher Digest der Lieblings-Subreddits, gefiltert nach persönlichen Präferenzen.
- **Quelle:** github.com/hesamsheikh/awesome-openclaw-usecases
- **Kategorie:** research
- **Difficulty:** beginner

---

## Wichtige GitHub Repositories zum Katalogisieren

### Offiziell
1. **clawdbot/clawdbot** – Haupt-Repository (145K+ Stars)
   - URL: github.com/clawdbot/clawdbot
   - Das Core-Projekt

2. **OpenClaw Docs** – Offizielle Dokumentation
   - URL: docs.clawd.bot

### Community
3. **hesamsheikh/awesome-openclaw-usecases** – Community Use Case Sammlung
   - URL: github.com/hesamsheikh/awesome-openclaw-usecases
   - Verifizierte Use Cases, gut gepflegt

4. **ClawHub** – Skill Marketplace
   - Skills zum Installieren und Verkaufen

### Weitere zu recherchieren (in Claude Code):
- Skills für spezifische Integrationen (GA4, Todoist, Reddit, etc.)
- ClawRouter (LLM Router, spart API-Kosten)
- Community-Forks und Erweiterungen
- Docker/Deployment-Templates

---

## Seitenstruktur

```
/                          → Landing Page (Hero, Featured Cases, Stats)
/use-cases                 → Alle Use Cases (filterbar nach Kategorie, Schwierigkeit, etc.)
/use-cases/[slug]          → Einzelner Use Case (Detail)
/categories/[category]     → Kategorie-Übersicht
/repositories              → GitHub Repo Katalog
/money-making              → Spezialseite: Geld verdienen mit OpenClaw
/getting-started           → Einsteigerguide (was braucht man, erste Schritte)
/about                     → Über das Projekt
```

### Landing Page Elemente
- Hero: "The Curated Directory of Real OpenClaw Use Cases"
- Stats: Anzahl Use Cases, Kategorien, verifizierte Cases
- Featured Use Cases (3-4 hervorgehobene)
- Kategorie-Karten mit Icons
- "Wild Cases" – die verrücktesten Storys
- "Money Makers" – Use Cases die Geld verdienen
- Newsletter Signup
- Neueste Use Cases

---

## Monetarisierungsstrategie

### Phase 1 (Sofort)
- **Affiliate Links:** Mac Mini (Amazon), Hetzner Hosting, API-Provider (Anthropic, OpenAI)
- **Ads:** Platzhalter für Google AdSense oder Carbon Ads (tech-focused)

### Phase 2 (Nach Traffic)
- **Sponsored Use Cases:** Unternehmen zahlen für Featured Placement
- **Newsletter:** Wöchentlicher "Best of OpenClaw" Digest (Monetarisierung über Sponsoren)
- **Digitale Produkte:** Eigene OpenClaw Setup Guides, Starter Templates

### Phase 3 (Skalierung)
- **Premium Section:** Exklusive, detaillierte Tutorials
- **Community Submissions:** Nutzer reichen Use Cases ein (Moderation durch Dominik)
- **ClawHub Skills:** Eigene Skills entwickeln und verkaufen

---

## SEO Strategie

### Primäre Keywords
- "openclaw use cases"
- "clawdbot use cases"  
- "openclaw examples"
- "clawdbot money making"
- "openclaw tutorial"
- "best openclaw skills"
- "openclaw vs chatgpt"

### Content-SEO
- Jeder Use Case ist eine eigene indexierbare Seite
- Kategorie-Seiten als Pillar Content
- "Getting Started" Guide als Evergreen Content
- Blog-Section für News und Updates

---

## Design-Richtung

- **Vibe:** Clean, modern, tech-focused aber zugänglich
- **Inspiration:** Product Hunt, Awesome Lists auf GitHub, IndieHackers
- **Farbschema:** Dunkel (passt zur Dev-Zielgruppe) mit Akzentfarbe Lobster-Rot/Orange (🦞)
- **Typografie:** Inter oder Space Grotesk
- **Icons:** Lucide React

---

## Nächste Schritte in Claude Code

1. **Next.js Projekt initialisieren** (App Router, Tailwind, TypeScript)
2. **Datenmodell implementieren** (JSON/MDX-basiert)
3. **Die 20 Use Cases aus diesem Brief einpflegen**
4. **Landing Page bauen**
5. **Use Case Listing + Detailseiten**
6. **Repository-Katalog**
7. **Responsive Design + SEO Meta Tags**
8. **Auf Vercel deployen**
9. **Domain kaufen und connecten**
10. **Monetarisierung einbauen (Affiliate Links)**

---

## Wichtige Quellen zum Nachschlagen

| Quelle | URL | Was |
|--------|-----|-----|
| Offizielles Showcase | clawd.bot/showcase | Verifizierte Community Use Cases |
| Awesome Use Cases | github.com/hesamsheikh/awesome-openclaw-usecases | Community-kuratierte Liste |
| Wikipedia | en.wikipedia.org/wiki/OpenClaw | Fakten, Timeline, Geschichte |
| CNBC | cnbc.com/2026/02/02/openclaw-... | Hintergrund, Adoption, China |
| IBM Think | ibm.com/think/news/clawdbot-... | Analyse, Moltbook, Enterprise |
| CoinMarketCap | coinmarketcap.com/.../what-is-openclaw-... | Crypto Use Cases |
| Brandon Wang | brandon.wang/2026/clawdbot | Detaillierter Erfahrungsbericht |
| MarkAICode | markaicode.com/openclaw-money-making-... | Money Making Automations |
| OpenClaw X Community | x.com/i/communities/... | Aktuelle Posts und Diskussionen |

---

## Hinweis zur Namenshistorie

- **November 2025:** Launch als "Clawdbot" (benannt nach Anthropics Claude)
- **27. Januar 2026:** Umbenennung zu "Moltbot" (Trademark-Complaint von Anthropic)
- **29. Januar 2026:** Handle-Sniper klauen @clawdbot auf X → Scam-Token ($16M Market Cap → Crash)
- **30. Januar 2026:** Umbenennung zu "OpenClaw" (aktueller Name)
- Erstellt von Peter Steinberger (Österreichischer Entwickler)
- Maskottchen: Molty, der Space Lobster 🦞

Die Website sollte sowohl "Clawdbot" als auch "OpenClaw" prominent verwenden – viele Leute suchen noch nach dem alten Namen.
