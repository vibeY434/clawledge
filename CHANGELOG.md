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
