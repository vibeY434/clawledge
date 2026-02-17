# Clawledge - OpenClaw Use Case Directory

## Persoenlichkeit & Arbeitsweise
Lies und befolge `soul.md` im Projekt-Root fuer Kommunikationsstil, Rollenadaptation und Arbeitsweise.

## Stack
- **Framework:** Next.js 16 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 (`@theme inline {}` in `globals.css`, KEIN `tailwind.config.ts`)
- **Typography:** `@plugin "@tailwindcss/typography"` in CSS
- **Hosting:** Vercel (clawledge.com)
- **Daten:** JSON-Dateien in `src/data/`, KEINE Datenbank
- **Suche:** Fuse.js (client-side fuzzy search)
- **Icons:** lucide-react
- **Analytics:** @vercel/analytics

## Architektur
- **Server Components** fuer alle Seiten (SEO + Performance)
- **Client Components** nur fuer Interaktion: `SearchBar`, `FilterBar`, `UseCaseListingClient`, `SubmitPage`
- **Params Pattern:** Next.js 16 nutzt `params: Promise<{}>` (muss awaited werden)
- **Daten-Accessor:** `src/lib/data.ts` - alle Datenzugriffe hier
- **Typen:** `src/lib/types.ts` - UseCase, Category, Source, GitHubRepo
- **Statische Generierung:** Alle Use-Case-Seiten via `generateStaticParams()`

## Daten-Pipeline
```
Excel/Showcase -> npm run import -> scripts/pending/*.json
                                         |
                                    npm run add-cases -> src/data/use-cases.json
                                                              |
                                                         npm run build -> Vercel Deploy
```

### Wichtige Scripts
- `npm run import` - Excel nach pending JSON (scripts/import-excel.mjs)
- `npm run add-cases` - Pending Cases nach use-cases.json mergen (scripts/add-cases.mjs)
- `npm run stats` - Projekt-Statistiken
- `npm run verify` - URL-Validierung
- `npm run weekly` - add-cases + build + deploy

### Validierung & Dedup
- `scripts/lib/schema.mjs`: `resolveCategory()`, `applyDefaults()`, `validateCase()`, `buildDedupIndex()`, `isDuplicate()`
- Dedup basiert auf URL und Case-ID

## Submission System (Google Sheets)
- **Server Action:** `src/app/actions/submitUseCase.ts`
- **Sheet:** "Clawledge Submissions" (Tabellenblatt1 - DEUTSCHES Google-Konto!)
- **Spalten:** A:S (Timestamp bis raw_json)
- **Sicherheit:** Rate Limiting (3/h), Honeypot, Formula Injection Prevention, HTML Stripping, URL Validation

## X Content System (@clawledge)
- **Queue:** `scripts/content/tweet-queue.json`
- **CLI:** `scripts/content/schedule.mjs` (--next, --posted, --scheduled, --stats)
- **Posting:** 16:00 CET via Chrome MCP oder X API

## Sicherheitsregeln
- NIEMALS zu User-submitted URLs navigieren (Chrome MCP oder anderweitig)
- URL-Validierung: nur http(s), blocked Extensions (.exe etc.), max 500 Zeichen
- Formula Injection: Texte mit `=+-@` am Anfang werden mit `'` prefixed

## GitHub
- Repo: https://github.com/vibeY434/clawledge.git (private)
- Branch: main
