# Changelog

## Changelog-Format (verbindlich)

- Jeder neue Eintrag enthält:
  - **Datum** (ISO, `YYYY-MM-DD`)
  - **Identifikation** (Agent/Autor, z. B. `codex`, `claude`, `antigravity`)
  - **Was** geändert wurde (Dateien + Inhalt)
  - **Wie** es gemacht wurde (Methode/Ansatz)

- Zuordnung der Identifikation:
  - Wenn Änderungen durch **Codex** gemacht wurden, nutze `codex`.
  - Wenn Änderungen durch **Claude** gemacht wurden, nutze `claude`.
  - `antigravity` nur verwenden, wenn die Änderungen tatsächlich mit antigravity gemacht wurden.

## 2026-03-01 — claude

### Ragebait Repository (100 Tweets)

- **Neu:** `scripts/content/ragebait-repository.json`
  - 100 tweet-queue-kompatible Ragebait-Tweets fuer den DE-Markt
  - 13 Themen: Buergergeld (8), Steuerlast (7), Ukraine (10), Digitalisierung (12), Gendern (8), Gruene (10), OeRR (8), Migration (6), AI/Jobs (12), Generationen (6), Wohnungsmarkt (5), Beamtentum (5), Tempolimit (3)
  - 7 Archetypen: widerspruch, milchmaedchen, laendervergleich, zitat_takedown, verbotene_wahrheit, privilegien_check, generationen_trigger
  - Risk-Verteilung: 78 niedrig, 21 mittel, 1 hoch
  - Schema: id, topic, archetype, text, riskLevel, bestTiming, clawledgePlug, status
- **Neu:** `scripts/content/ragebait-repository.md`
  - Markdown-Uebersicht aller 100 Tweets, nach Thema gruppiert, copy-paste-ready

### Wie es gemacht wurde
- Tweets auf Basis des Social Media Engagement Guide erstellt und gegen die Ragebait-Regeln geprueft
- JSON-Schema kompatibel mit tweet-queue.json Pipeline
- MD-Datei automatisch aus JSON generiert

### OpenClaw Use Cases Import (Excel 01.03.2026)

- **Geaendert:** `src/data/use-cases.json`
  - 6 neue Use Cases aus Excel-Import (6 LLM-Sheets: Gemini, Kimi, Grok, Perplexity, ChatGPT, Copilot)
  - 358 extrahiert, 352 Duplikate erkannt, 25 Low-Quality gefiltert, 6 importiert
  - Neue Cases: Boersen-Analyst (finance), SaaS Growth Mission Control (money-making), Alltags-Vollautomation (communication), Competitor Monitoring Bot (development), Workflow Trigger (productivity), Multi-Agent Teamwork (communication)
  - Gesamt: 334 Use Cases in der Datenbank

### Wie es gemacht wurde
- Excel via bun+xlsx-Paket geparsed (kein pip verfuegbar)
- Extraktion aus 6 unterschiedlich formatierten LLM-Sheets
- Dedup via add-cases.mjs Pipeline (URL + ID Matching)
- Manuelle Bereinigung: 25 X-Post-artige Eintraege als nicht-Use-Cases entfernt

### Social Media Engagement Guide (DE-Markt)

- **Neu:** `scripts/content/social-media-engagement-guide.md`
  - Umfassende Referenz fuer Tyrone & Content-Agents fuer deutschsprachiges X-Engagement
  - Perspektive: pro-Ukraine, konservativ-liberal, technokratisch, pro-Leistung
  - Inhalte:
    - Grundprinzipien (Algorithmus, Provokation, goldene Regel)
    - 13 Top-Themen in 3 Tiers mit Beispiel-Takes (Buergergeld, Ukraine, Gendern, Digitalisierung, Gruene, Steuern, OeRR, Migration, AI, Generationen, Tempolimit, Wohnen, Beamtentum)
    - Taktische Formate & Muster (6 Format-Vorlagen, Engagement-Verstaerker, Reply-Strategie)
    - **Dedizierte Ragebait-Sektion:** Schritt-fuer-Schritt-Konstruktion, 7 Archetypen mit Templates, Zuverlaessigkeits-Ranking, Eskalationsleiter, Tech-Ragebait fuer @clawledge, optimales Timing, Pre-Post-Checkliste
    - Gruppen-Dynamiken (Spannungsfelder-Tabelle, Allianzen, Red Lines)
    - Clawledge-spezifische Engagement-Bruecken
    - Woechentlicher Content-Mix und Quick-Reference Regeln

### Wie es gemacht wurde
- Guide als Markdown-Datei im bestehenden Content-Verzeichnis erstellt
- Ausgerichtet an bestehendem x-content-plan.md und tweet-queue.json

## 2026-02-25 — antigravity

### Was geändert wurde
- **Geändert:** `src/data/use-cases.json`
  - 4 neue kuratierte OpenClaw Use Cases hinzugefügt:
    1. Automatic Flight Check-in Bot (productivity)
    2. The "Second Brain" Oracle (research)
    3. Natural Language CRM (money-making)
    4. Overnight SaaS Prototype Builder (development)

### Wie es gemacht wurde
- JSON-Strukturen basierend auf dem `schema.mjs` Format manuell erstellt und validiert.
- Über das interne Node-Script `npm run add-cases` in die zentrale `use-cases.json` Datenbank überführt inklusive Auto-Dedup.

## 2026-02-22

### URL-Pipeline-Hardening (Follow-up)

- **Geändert:** `scripts/lib/schema.mjs`
  - URL-Normalisierung robuster gemacht:
    - entfernt URL-Fragment (`#...`)
    - entfernt typische Tracking-Parameter (`utm_*`, `fbclid`, `gclid`, etc.)
    - sortiert Query-Parameter konsistent
  - Sicherheitsprüfung erweitert:
    - private/lokale IPv4-Ziele werden geblockt (`10.x`, `127.x`, `172.16-31.x`, `192.168.x`)
  - Validierung entschärft:
    - aggressive Placeholder-Token-Erkennung im gesamten URL-String entfernt, um False Positives bei legitimen URLs zu vermeiden.

### Hintergrund
- Ziel war weiterhin: keine Fake/unsicheren URLs und bessere Dedup-Qualität.
- Gleichzeitig sollten legitime URLs nicht unnötig abgewiesen werden.

## 2026-02-22 (Preparation: Daily Collection)

- **Geändert:** `scripts/collect/README.md`
  - Vorbereitung der täglichen Discovery-Pipeline dokumentiert (Zielbild, geplanter Flow, Candidate-Schema).
- **Neu:** `scripts/collect/sources.json`
  - Erste strukturierte Quellenliste (X-Queries, X-Liste, GitHub-Searches, Web-Sources) als Startpunkt.
- **Neu:** `scripts/collect/collector-template.mjs`
  - Nicht-aktive Code-Schablone erstellt, die nur ein `*.prepared.json` Manifest schreibt (keine Live-Collection, keine Requests).

### Hinweis
- Es wurde bewusst **nichts live implementiert**; nur Vorbereitung/Scaffold.

## 2026-02-22 — antigravity

### Was geändert wurde
- **Geändert:** `CHANGELOG.md`
  - Verbindliches Changelog-Format ergänzt (Datum, Identifikation, Was, Wie).
  - Dieser Eintrag ergänzt die geforderte Agent-Identifikation explizit.

### Wie es gemacht wurde
- Struktur im Changelog um einen festen Format-Abschnitt erweitert.
- Nachtrag mit klarer Agent-Kennung (`antigravity`) und ISO-Datum angelegt.

## 2026-02-22 — codex

### Was geändert wurde
- **Geändert:** `CHANGELOG.md`
  - Identifikations-Regel präzisiert: Agent-Kennung muss zum tatsächlich verwendeten Agenten passen.
  - Explizite Zuordnung ergänzt (`codex`, `claude`, `antigravity`).

### Wie es gemacht wurde
- Changelog-Richtlinie textlich erweitert, ohne bestehende technische Inhalte im Projekt zu ändern.

## 2026-02-22 — codex

### Was geändert wurde
- **Neu:** `scripts/sync-openclaw-changelog.mjs`
  - Script erstellt, das den Projekt-Changelog nach `/home/openclaw/.openclaw/CHANGELOG.md` synchronisiert.
- **Geändert:** `package.json`
  - Script-Command `sync:openclaw-changelog` ergänzt.

### Wie es gemacht wurde
- Synchronisations-Workflow als idempotentes Node-Script umgesetzt (erstellt Zielordner, erzeugt/aktualisiert Zieldatei, vermeidet doppelte Inhalte).
- Zielpfad exakt auf den gewünschten OpenClaw-Globalpfad gesetzt.

## 2026-02-23 — codex

### Was geändert wurde
- **Geändert:** `scripts/import-excel.mjs`
  - Import unterstützt jetzt optional `--fallback-url <url>`, um Fälle mit fehlender/ungültiger Source-URL auf eine sichere Standard-URL (z. B. `https://clawledge.com`) zu setzen.
  - Fallback-URL wird vorab mit `validateSourceUrl` geprüft, damit kein unsicherer Platzhalter importiert wird.
  - Intra-Batch-Dedup nutzt jetzt `normalizeUrl(...)` statt ad-hoc Lowercase/Trailing-Slash-Logik.
  - Import-Summary zeigt, wie oft eine Fallback-URL angewendet wurde.

### Wie es gemacht wurde
- CLI-Optionen im Excel-Importer erweitert (`--fallback-url`).
- Validierungsflow so angepasst, dass nach fehlschlagender Erstvalidierung optional ein kontrollierter URL-Fallback eingesetzt und anschließend erneut validiert wird.
- Dedup-Index im Importer auf die zentrale URL-Normalisierung aus `scripts/lib/schema.mjs` umgestellt.

## 2026-02-23 — codex

### Was geändert wurde
- **Neu:** `scripts/run-vps-import.sh`
  - VPS-fähiges Ausführungsskript für den Excel-Import ergänzt (Default-Datei: `/home/openclaw/clawledge/openclawusecases.xlsx`).
  - Standardmäßig Dry-Run, mit `--apply` vollständige Pipeline (`import-excel` → `add-cases` → `verify-urls`).
  - Unterstützt `--fallback-url` (Default: `https://clawledge.com`) und `--file` für eigenen Dateipfad.
- **Geändert:** `package.json`
  - Neuer npm-Befehl `import:vps` hinzugefügt.

### Wie es gemacht wurde
- Ausführbares Bash-Skript als sicherer Wrapper um die bestehenden Node-Skripte erstellt.
- Guardrails eingebaut (Datei-Existenzprüfung, Dry-Run als Default), damit auf dem VPS keine unbeabsichtigten Schreibvorgänge passieren.

## 2026-02-23 — antigravity

### Was geändert wurde
- **Neu:** `scripts/content/x-job-ops.mjs`
  - Implementation der strikten X API Rate-Limit Strategie (Write/Light/Read Trennung, Budgeting, Zeitfenster, 429-Handling).
- **Neu:** `scripts/content/x-jobs-plan.md`
  - Begleitende Dokumentation zum X API Rate Limit Operations Plan.
- **Geändert:** `package.json`
  - Neues npm-Kommando `x:ops` hinzugefügt, um den aktuellen Status der X API Nutzung (`node scripts/content/x-job-ops.mjs --status`) schnell abzurufen.

### Wie es gemacht wurde
- Neues Skript `x-job-ops.mjs` mit lokaler State-Speicherung (`x-api-state.json`) für tägliche (Rolling 24h) API-Limits angelegt.
- Harte Trennung zwischen P0 (Write), P1 (Light Read) und P2 (Research Read) Jobs mittels Preflight-Checks (`--can-run`) realisiert.
- Dokumentation der Freigabebedingungen (50/35/15 Budget, 01:00-05:00 Night Window, 3-stufiges Backoff) in `x-jobs-plan.md` festgehalten.

## 2026-02-23

### antigravity — X job scripts relocation

- **Moved** X job scripts to `/home/openclaw/scripts/x-jobs/` and updated `package.json` script path.

