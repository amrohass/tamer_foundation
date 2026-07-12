# CLAUDE.md — Tamer Interactive Geo-Library (Demonstration Build)

> Project guardrails for this repository. Read this file at the start of **every** task and follow it.
> When a request conflicts with this file, follow this file and say so.

---

## 1. What this project is

This repository is a **working demonstration** of the *Tamer Interactive Geo-Library, Digital Reading & Community Engagement Hub* (Tender **TA/26/18**, Tamer Institute for Community Education), built by **HK Technologies**.

It is a **focused proof-of-concept**, not the full product. Its purpose is to show — running, in the browser — that we understand the requirements and can deliver them to a professional standard. A small number of the platform's headline features are built to production quality; the remaining scope is represented on a **roadmap page** inside the app.

**Audience:** a mixed technical/non-technical evaluation committee. Everything must look and feel finished, be intuitive without instructions, and work on first click with **no login wall**.

---

## 2. The golden rule — scope discipline

**Build the selected features well. Do not build the whole platform.**

- Implement the **In-scope** features (Section 4) to a polished, production-quality standard.
- Represent the **Out-of-scope** features (Section 4) only on the in-app **Roadmap** page — do **not** implement them.
- Prefer **depth over breadth**: a few features that feel complete beat many that feel half-built.
- **Do not over-engineer.** No microservices, no complex state libraries, no premature abstraction, no auth system, no CI beyond basics. Keep the codebase small, readable, and obviously correct.
- If a task would expand scope beyond Section 4, **stop and ask** before building it.

Target total effort: a tight, high-quality build — think days, not weeks. Every hour goes into polish and reliability of the in-scope slices.

---

## 3. Tech stack (fixed — do not substitute)

| Layer | Choice |
|---|---|
| Framework | **Next.js (latest, App Router, TypeScript)** |
| Styling | **Tailwind CSS** (with logical properties for RTL) |
| Backend / data | **Supabase** — Postgres + **PostGIS** (map) + **pgvector** (semantic search) |
| Maps | **Mapbox GL JS** (via `react-map-gl`) — free tier |
| i18n | **next-intl** — full Arabic (RTL) + English |
| Icons | **lucide-react** |
| Hosting | **Vercel** (web) + **managed Supabase** — both free tiers |

- This mirrors the technical offer exactly. Do not swap frameworks or add heavy dependencies without asking.
- Keep the dependency list minimal. Justify any new package.

---

## 4. Scope

### ✅ In-scope — build these, to a high standard

1. **Interactive Geo-Library (map).** Mapbox map of **8–10 seeded partner libraries** across real Palestinian cities (Ramallah, Nablus, Hebron, Bethlehem, Jenin, Gaza, Khan Younis). Filter by **city** and **library name**; click a pin to see the library card with its **available books**. Backed by PostGIS.
2. **Bilingual Arabic / English with true RTL.** A single, prominent toggle that flips the **entire UI** between English (LTR) and Arabic (RTL). This must be flawless — it is a headline requirement.
3. **Digital Reading Passport.** A demo child profile: avatar, XP progress bar, and 2–3 badges. A **“Scan to log a book”** button that simulates a QR check-in and animates the XP/badge gain.
4. **Facilitator Hub + semantic search.** Seed **15–20 “Activity Recipes”** (title, target age, duration, book, 1 lesson-learned line). A natural-language search box: e.g. *“15-minute empathy activity for 8-year-olds”* returns relevant recipes via **pgvector** similarity.
5. **AI Co-pilot (single feature).** On a book detail view, a **“Generate discussion questions”** button that returns 3–4 age-appropriate questions (Arabic/English). One LLM call, with a **safe cached fallback** so the demo never breaks if no API key is present (see Section 9).
6. **“View as” role switcher.** A top-bar control to preview the app as **Youth / Facilitator / Librarian / Administrator** — demonstrates the four RBAC audiences **without** building real authentication.
7. **Roadmap page.** Lists all **six ToR Core Components**; marks what is **Live in this demo** vs **Delivered in the full build**. Professional, honest, one screen.

### 🚫 Out-of-scope — roadmap only, do NOT build

Native Flutter apps · audiobook streaming/player · full e-book reader engine · real authentication/RBAC enforcement · content moderation queue · events calendar · author submission portal · institutional archive · offline sync · **any payments/e-commerce** (excluded from the project entirely) · admin analytics dashboards.

> **Optional stretch (only if everything above is done and polished):** a lightweight catalog grid with a simple e-reader modal showing one sample page with font-size and day/night toggles. Do not start this until 1–7 are complete and deployed.

---

## 5. Architecture & code conventions

- **App Router**, server components by default; client components only where interactivity requires it (`"use client"`).
- Keep **business/data logic in the data layer** (Supabase queries, Postgres functions, small server actions), and keep UI components **thin**.
- Folder structure:
  ```
  /app            # routes (localized): /[locale]/...
  /components     # reusable UI (PascalCase files)
  /lib            # supabase client, queries, helpers
  /messages       # en.json, ar.json (i18n strings)
  /supabase       # schema.sql, seed.sql, functions
  /public         # static assets, images
  ```
- **TypeScript strict.** No `any` unless justified in a comment. Type Supabase results.
- Naming: components `PascalCase`, functions/vars `camelCase`, files match their export.
- No dead code, no commented-out blocks, no `console.log` in committed code.
- Small, focused components. Extract when a component exceeds ~150 lines.
- **Do not invent Tamer facts** (real programs, staff, partner names, statistics). Use clearly plausible demo data only (Section 8).

---

## 6. Bilingual & RTL — non-negotiable

- **Every** user-facing string comes from `/messages/en.json` and `/messages/ar.json`. No hard-coded text.
- Set `dir="rtl"` on the document for Arabic and `dir="ltr"` for English.
- Use **CSS logical properties everywhere**: `ms-*/me-*`, `ps-*/pe-*`, `start-*/end-*`, `text-start/text-end` — never fixed `left/right` for layout.
- Mirror directional icons (arrows, chevrons) in RTL.
- Numbers, dates and the map UI must render correctly in both directions.
- **Arabic content must read naturally** — no machine-translation artifacts. Flag any Arabic string that needs a native-speaker review with a `// TODO: native review` comment.

---

## 7. Accessibility (WCAG 2.1 AA — minded throughout)

- Semantic HTML (`<button>`, `<nav>`, `<main>`, headings in order). No clickable `<div>`s.
- All interactive elements are **keyboard operable** with a visible focus state.
- Colour contrast meets AA (≥ 4.5:1 for text). Never convey meaning by colour alone.
- Every image/icon has a meaningful `alt` or is `aria-hidden` if decorative.
- Form fields have associated labels. The map and passport have text alternatives.
- Respect `prefers-reduced-motion` for the XP/badge animations.

---

## 8. Demo data (seed) — realistic and on-theme

- Provide one idempotent seed (`/supabase/seed.sql` or a seed script). Re-running it must not duplicate rows.
- **Libraries:** 8–10, real Palestinian cities, plausible names + realistic coordinates.
- **Books:** ~20, plausible Arabic children's/YA titles with English equivalents; age ranges; cover-image placeholders.
- **Activity recipes:** 15–20, genuinely varied themes (empathy, environment, storytelling, teamwork), varied ages/durations — so semantic search has something real to find.
- **Passport profile:** one demo child (age-appropriate name), some logged books, 2–3 earned badges + 1 locked.
- Precompute **pgvector embeddings** for recipes at seed time and store them, so runtime search is a pure DB similarity query (no live API call needed per search — keeps the demo fast and reliable).
- Content must be **child-appropriate** in every language.

---

## 9. Resilience (the demo must never break in front of the committee)

- The app must run and look complete **even if external keys are missing**:
  - No Mapbox token → show a graceful styled fallback panel listing libraries, not a broken map.
  - No LLM key → the AI Co-pilot returns **pre-written, cached** age-appropriate questions instead of erroring.
- No unhandled promise rejections, no runtime console errors, no dead links.
- Every button does something visible. No “coming soon” dead-ends **except** the clearly-labelled roadmap items.
- Loading and empty states are designed, not blank.

---

## 10. Design direction

- **Tone:** warm, trustworthy, child-friendly but credible — this serves children, parents, librarians and an NGO committee.
- **Brand:** anchor on Tamer's red (approx. `#B01E28`) as the primary accent; use Tamer's real logo/characters if assets are provided, otherwise tasteful neutral placeholders (never fake a logo as final).
- **Typography:** an Arabic-capable font (e.g. IBM Plex Sans Arabic / Cairo / Noto Sans Arabic) + a clean Latin font. Arabic must look native, not fallback.
- Generous spacing, rounded, soft, modern. Mobile-first and fully responsive.
- Polished micro-interactions on the passport (XP fill, badge pop) — subtle, not gimmicky.
- Consistent design system: one set of colours, spacing, radius, shadow. Do not improvise per-page styles.

---

## 11. Build order (one focused step at a time)

1. Scaffold Next.js + Tailwind + Supabase client; env setup; base layout.
2. i18n + **RTL toggle** working end-to-end (prove it before building features).
3. Design system + shared components (buttons, cards, top bar, role switcher).
4. Supabase **schema** (PostGIS + pgvector) + **seed data** (Section 8).
5. **Map** (Geo-Library) with filters + library/book cards.
6. **Digital Reading Passport** + simulated QR check-in animation.
7. **Facilitator Hub** + pgvector semantic search.
8. **AI Co-pilot** button (with cached fallback).
9. **Roadmap** page.
10. Accessibility pass + bilingual QA + resilience check.
11. **Deploy** to Vercel + Supabase; write the README; freeze.

Commit after each step with a clear message. Keep `main` always deployable.

---

## 12. Definition of Done (per feature — check before moving on)

- [ ] Works in **both** English (LTR) and Arabic (RTL).
- [ ] Keyboard-accessible; visible focus; AA contrast.
- [ ] No console errors; graceful loading/empty/error states.
- [ ] Responsive on mobile and desktop.
- [ ] `npm run build` succeeds; `npm run lint` and type-check are clean.
- [ ] No hard-coded strings; no leftover debug code.
- [ ] Still works with missing external keys (fallbacks intact).

---

## 13. README (write this before submission — it is part of the demo)

The README must open with, in this order:
1. One-line description + the **live demo URL**.
2. One screenshot (or a short GIF) of the map or passport.
3. A **feature → ToR Core Component** table (which demo feature proves which requirement).
4. Which features are live here vs on the roadmap.
5. Local setup (env vars, `npm install`, seed, `npm run dev`).

Keep it clean and professional — this repository is reviewed by the client.

---

## 14. Environment variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # server-only, for seeding
NEXT_PUBLIC_MAPBOX_TOKEN=         # optional — app degrades gracefully without it
LLM_API_KEY=                      # optional — AI co-pilot uses cached fallback without it
```

- **Never commit secrets.** Provide `.env.example` with empty values. `.gitignore` must cover `.env*`.
- All secret keys are server-side only; never expose a non-`NEXT_PUBLIC_` key to the client.

---

## 15. Hard don'ts

- ❌ Don't build anything in the **Out-of-scope** list.
- ❌ Don't add authentication/login — use the role switcher.
- ❌ Don't add payments, e-commerce, or subscriptions (excluded from the project).
- ❌ Don't introduce heavy state managers, ORMs, or backend frameworks.
- ❌ Don't leave broken links, placeholder “lorem ipsum”, or console errors.
- ❌ Don't fabricate real Tamer facts, statistics, or partner names.
- ❌ Don't ship UI that only works in one language or one direction.
- ❌ Don't over-polish one feature while others are unbuilt — finish the in-scope set first, then polish.

---

## 16. Working agreement

- Build **one spec at a time**; show the plan for anything non-trivial before writing lots of code.
- Ask before adding scope, dependencies, or abstractions.
- Prefer boring, correct, readable solutions.
- Keep the build **live and stable** — assume it can be demoed at any moment.
