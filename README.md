# Tamer Interactive Geo-Library — Demonstration Build

A working, bilingual (العربية / English) demonstration of the **Interactive Geo-Library, Digital Reading & Community Engagement Hub**, built by **HK Technologies**.

**Live demo:** **[tamer-foundation.vercel.app](https://tamer-foundation.vercel.app)** — العربية by default, English via the toggle.

<!-- TODO: replace with a real screenshot of the map or passport before submission -->
![Interactive Geo-Library map](docs/screenshot.png)

---

## What this demo proves

| Demo feature | Platform component | How it's proven here |
|---|---|---|
| Interactive map of 9 partner libraries with city/name filters and per-library book availability | Interactive Geo-Library | Mapbox GL + **PostGIS** geography queries, RTL-aware map labels, graceful no-token fallback |
| Digital Reading Passport: XP bar, badges, reading log, simulated QR check-in with animated rewards | Digital Reading Passport | Demo child profile served from Postgres; client-side simulation keeps every demo run repeatable |
| Facilitator Hub with 18 bilingual activity recipes and natural-language search in Arabic **and** English | Facilitator & Community Hub | **pgvector** cosine similarity over precomputed multilingual embeddings; trigram + client-side fallbacks |
| Book detail pages with an AI co-pilot that generates age-appropriate discussion questions | Digital Reading & e-Library | One LLM call when a key is present; hand-written cached question library otherwise — the button can never fail |
| "View as" switcher previewing Youth / Facilitator / Librarian / Administrator | Administration & Roles | Demonstrates the four RBAC audiences without shipping auth in a demo |
| Full Arabic (RTL) ⇄ English (LTR) toggle on every screen | Platform-wide requirement | next-intl locale routing, CSS logical properties, localized plural rules, mirrored layout |
| Roadmap page | Delivery transparency | Honest per-component status: live in this demo vs delivered in the full build |

## Live here vs full build

**Live in this demo:** everything in the table above, end to end, on real infrastructure (Vercel + managed Supabase with PostGIS and pgvector).

**Delivered in the full build (see the in-app Roadmap):** native Flutter apps, full e-book reader and audiobook streaming, offline sync, real authentication and enforced RBAC, content moderation, facilitator submissions, events, and analytics dashboards.

## Resilience by design

The demo never breaks in front of an audience:

- No Mapbox token → a styled library list replaces the map.
- Database unreachable → all pages serve bundled seed content transparently.
- No LLM key (or any API failure) → the co-pilot serves a curated bilingual question library.
- Semantic search degrades to keyword search, then to client-side filtering — in that order.

## Tech stack

Next.js (App Router, TypeScript strict) · Tailwind CSS (logical properties for RTL) · Supabase Postgres with **PostGIS** + **pgvector** · Mapbox GL (react-map-gl) · next-intl · transformers.js multilingual embeddings (no API key needed) · Vercel.

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev                  # http://localhost:3000
```

Environment variables (`.env.local`):

```
NEXT_PUBLIC_SUPABASE_URL=         # Supabase → Project Settings → API
NEXT_PUBLIC_SUPABASE_ANON_KEY=    # anon/public key
SUPABASE_SERVICE_ROLE_KEY=        # server-only
NEXT_PUBLIC_MAPBOX_TOKEN=         # optional — map falls back gracefully
LLM_API_KEY=                      # optional — co-pilot uses cached questions
```

Database (once, in the Supabase SQL editor):

1. Run [`supabase/schema.sql`](supabase/schema.sql) — tables, PostGIS/pgvector extensions, read-only RLS, search functions.
2. Run [`supabase/seed.sql`](supabase/seed.sql) — 9 libraries, 20 books, 18 recipes with precomputed embeddings, demo passport. Idempotent; safe to re-run.

To regenerate the seed after editing [`supabase/seed-data.mts`](supabase/seed-data.mts):

```bash
node scripts/generate-seed.mts   # first run downloads the embedding model (~100 MB)
```

Checks: `npm run build` · `npm run lint` · `npx tsc --noEmit`
