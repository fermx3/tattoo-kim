# CLAUDE.md — Tattoo Kim Technical Architecture

## Project Overview

**Tattoo Kim** is a bilingual (ES/EN) tattoo & piercing studio website for two locations in Mexico (Playa del Carmen and Cancún). Built with Next.js App Router, MDX-only content, dark minimal aesthetic, and WhatsApp-first lead capture. Deployed on Vercel.

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────┐
│                   Vercel Edge                    │
│              (CDN + Edge Functions)              │
├─────────────────────────────────────────────────┤
│              Next.js App Router                  │
│         (Static Generation Priority)             │
├──────────┬──────────┬───────────┬───────────────┤
│  /es/*   │  /en/*   │  MDX      │  Static       │
│  routes  │  routes  │  Content  │  Assets       │
├──────────┴──────────┴───────────┴───────────────┤
│   Tailwind CSS  │  next/image  │  next-intl     │
├─────────────────┴─────────────┴─────────────────┤
│           WhatsApp Click-to-Chat Links           │
└─────────────────────────────────────────────────┘
```

**Rendering strategy:** Static Site Generation (SSG) for all pages. No server-side runtime needed. Every page is pre-rendered at build time. This guarantees the best possible Lighthouse scores and zero cold starts.

---

## Folder Structure

```
tattoo-kim/
├── .claude/
│   └── skills/                    # AI coding assistant guidance
│       ├── nextjs_architecture.md
│       ├── mdx_content_system.md
│       ├── i18n_strategy.md
│       ├── seo_optimization.md
│       └── performance_budget.md
├── content/
│   ├── blog/
│   │   ├── es/                    # Spanish blog posts (.mdx)
│   │   └── en/                    # English blog posts (.mdx)
│   └── artists/
│       ├── es/                    # Spanish artist bios (.mdx)
│       └── en/                    # English artist bios (.mdx)
├── messages/
│   ├── es.json                    # UI string translations (Spanish)
│   └── en.json                    # UI string translations (English)
├── public/
│   ├── images/
│   │   ├── gallery/               # Tattoo/piercing portfolio images
│   │   ├── artists/               # Artist headshots
│   │   ├── studio/                # Studio photos (both locations)
│   │   └── og/                    # Open Graph images
│   ├── fonts/                     # Self-hosted WOFF2 fonts
│   ├── favicon.ico
│   ├── robots.txt
│   └── sitemap.xml                # (auto-generated at build)
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx         # Root locale layout (dark theme, fonts)
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── servicios/
│   │   │   │   ├── tatuajes/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── piercings/
│   │   │   │       └── page.tsx
│   │   │   ├── artistas/
│   │   │   │   ├── page.tsx       # Artists listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx   # Individual artist
│   │   │   ├── ubicaciones/
│   │   │   │   ├── playa-del-carmen/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── cancun/
│   │   │   │       └── page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx       # Blog listing
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx   # Blog post
│   │   │   ├── contacto/
│   │   │   │   └── page.tsx       # WhatsApp CTA page
│   │   │   └── not-found.tsx      # 404 per locale
│   │   ├── not-found.tsx          # Global 404
│   │   └── layout.tsx             # Root layout (html, body)
│   ├── components/
│   │   ├── ui/                    # Atomic UI elements
│   │   ├── layout/                # Header, Footer, Nav, LanguageSwitcher
│   │   ├── sections/              # Homepage sections, CTAs
│   │   ├── blog/                  # Blog card, listing components
│   │   ├── artists/               # Artist card, gallery
│   │   └── whatsapp/              # WhatsApp button, floating CTA
│   ├── lib/
│   │   ├── mdx.ts                 # MDX parsing utilities
│   │   ├── content.ts             # Content fetching (blog, artists)
│   │   ├── whatsapp.ts            # WhatsApp URL builder
│   │   └── constants.ts           # Phone numbers, locations, socials
│   ├── styles/
│   │   └── globals.css            # Tailwind directives + CSS variables
│   └── types/
│       └── index.ts               # Shared TypeScript types
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
├── CLAUDE.md
├── MVP_PROGRESS.md
└── PROJECT_KICKOFF_SUMMARY.md
```

---

## Content Strategy (MDX)

### Blog Posts

Each blog post is an `.mdx` file inside `content/blog/{locale}/`. Frontmatter schema:

```yaml
---
title: "Cuidados después de tu tatuaje"
slug: "cuidados-despues-tatuaje"
description: "Guía completa de aftercare para tu nuevo tatuaje."
date: "2025-01-15"
author: "kim"
tags: ["aftercare", "tattoo", "tips"]
image: "/images/gallery/aftercare-cover.webp"
locale: "es"
translationSlug: "tattoo-aftercare"   # Links ES ↔ EN counterparts
---
```

- `translationSlug` is a shared key that connects translated versions of the same post.
- If a translation doesn't exist, the language switcher links to the blog index of the other locale.

### Artists

Each artist is an `.mdx` file inside `content/artists/{locale}/`. Frontmatter schema:

```yaml
---
name: "Kim"
slug: "kim"
role: "Fundadora & Tatuadora"
location: "playa-del-carmen"       # or "cancun" or "both"
specialties: ["blackwork", "fine-line", "geometric"]
image: "/images/artists/kim.webp"
instagram: "https://instagram.com/tattookim"
locale: "es"
translationSlug: "kim"
---
```

### Content Authoring Rules

- All images referenced in MDX must exist in `public/images/`.
- All images must be `.webp` format, optimized to < 200KB.
- Blog slugs must be URL-safe, lowercase, hyphenated.
- Every blog post MUST have both `es` and `en` versions (preferred) or be marked as single-language.

---

## Translation Strategy (i18n)

**Library:** `next-intl` (chosen for App Router native support, lightweight, well-maintained).

### Routing

| Locale | URL Pattern |
|--------|-------------|
| Spanish | `/es/...` (default) |
| English | `/en/...` |

- Root `/` redirects to `/es` (Mexico audience default).
- Middleware detects `Accept-Language` header for first-time visitors.
- A visible language switcher is present in the header on every page.

### Translation Files

UI strings live in `messages/es.json` and `messages/en.json`. Structure:

```
{
  "nav": { "home": "Inicio", "services": "Servicios", ... },
  "home": { "hero_title": "...", "hero_cta": "..." },
  "services": { ... },
  "contact": { ... },
  "common": { "whatsapp_cta": "...", "read_more": "..." }
}
```

### Missing Translation Fallback

- If a page doesn't exist in the requested locale, show a friendly "translation not available" page with a link to the same content in the other language.
- UI strings: fallback to Spanish (`es`) if an English key is missing.

---

## SEO Strategy

### Technical SEO

- **Metadata API:** Use Next.js `generateMetadata()` on every page for dynamic `<title>`, `<meta description>`, Open Graph, and Twitter Card tags.
- **Structured Data (JSON-LD):** Inject on every page type:
  - `LocalBusiness` — both locations (with address, phone, hours, geo).
  - `Article` — blog posts.
  - `Person` — artist pages.
  - `BreadcrumbList` — all pages.
- **Sitemap:** Auto-generated via `next-sitemap` at build time, covering all locales.
- **robots.txt:** Allow all crawlers, reference sitemap URL.
- **Canonical URLs:** Every page has a `<link rel="canonical">` pointing to itself. Translated pages use `hreflang` alternates.
- **hreflang tags:** Every page declares both `es-MX` and `en` alternates.

### Content SEO

- Blog posts target local tattoo/piercing keywords in both languages.
- Location pages target geo-specific queries ("tatuajes Playa del Carmen", "tattoo shop Cancún").
- Service pages target service-specific queries ("piercing en Cancún", "blackwork tattoo Playa").
- Artist pages build E-E-A-T signals.

### Performance as SEO

- Lighthouse Performance 90+ is a hard requirement (Core Web Vitals directly impact ranking).
- All images optimized, lazy-loaded below fold.
- Zero layout shift from fonts (font-display: swap + size-adjust).

---

## Performance Strategy

### Budget

| Metric | Target |
|--------|--------|
| Lighthouse Performance | ≥ 90 |
| LCP | < 2.5s |
| FID / INP | < 100ms |
| CLS | < 0.1 |
| Total page weight | < 500KB initial load |
| JavaScript bundle | < 150KB gzipped |

### Tactics

1. **SSG everything.** No runtime server rendering. Every page is pre-built HTML.
2. **Minimal JavaScript.** Avoid client components unless strictly necessary (language switcher, mobile nav toggle). Default to server components.
3. **No heavy animation libraries.** CSS transitions only. No Framer Motion, GSAP, etc.
4. **Tailwind CSS.** Purged at build time. Tiny CSS footprint.
5. **Self-hosted fonts.** WOFF2 only. Preloaded. Max 2 font families, 3 weights total.
6. **Image optimization.** `next/image` with WebP, responsive `srcSet`, lazy loading below fold.
7. **No external scripts.** No analytics on initial load. If analytics needed later, use Vercel Analytics (lightweight) or defer to `afterInteractive`.
8. **Bundle analysis.** Run `@next/bundle-analyzer` before each release to catch bloat.

---

## Image Strategy

### Formats & Sizes

- All source images stored as `.webp` in `public/images/`.
- Use `next/image` component for automatic optimization, resizing, and lazy loading.
- Provide explicit `width` and `height` on every image to prevent CLS.

### Categories

| Category | Location | Max Size | Aspect Ratio |
|----------|----------|----------|--------------|
| Gallery (portfolio) | `/images/gallery/` | 1200×1200 | 1:1 or 3:4 |
| Artist headshots | `/images/artists/` | 800×800 | 1:1 |
| Studio photos | `/images/studio/` | 1600×900 | 16:9 |
| Blog covers | `/images/gallery/` | 1200×630 | ~1.91:1 (OG) |
| OG images | `/images/og/` | 1200×630 | 1.91:1 |

### Rules

- No images larger than 300KB per file.
- Hero images should have a low-quality placeholder (blurDataURL) generated at build time.
- All portfolio images must have meaningful `alt` text (bilingual, matching page locale).

---

## Routing Structure

### Spanish (default)

```
/es                           → Homepage
/es/servicios/tatuajes        → Tattoo service page
/es/servicios/piercings       → Piercing service page
/es/artistas                  → Artists listing
/es/artistas/[slug]           → Individual artist
/es/ubicaciones/playa-del-carmen → Playa del Carmen location
/es/ubicaciones/cancun        → Cancún location
/es/blog                      → Blog listing
/es/blog/[slug]               → Blog post
/es/contacto                  → Contact / WhatsApp CTA
```

### English

```
/en                           → Homepage
/en/services/tattoos          → Tattoo service page
/en/services/piercings        → Piercing service page
/en/artists                   → Artists listing
/en/artists/[slug]            → Individual artist
/en/locations/playa-del-carmen → Playa del Carmen location
/en/locations/cancun          → Cancún location
/en/blog                      → Blog listing
/en/blog/[slug]               → Blog post
/en/contact                   → Contact / WhatsApp CTA
```

**Note on localized path segments:** Use `next-intl`'s pathnames configuration to map `/servicios/tatuajes` (ES) ↔ `/services/tattoos` (EN), etc. This keeps URLs semantic in both languages while sharing the same page component.

---

## WhatsApp Integration Approach

### Philosophy

WhatsApp is the **only** lead capture mechanism. No forms, no email capture, no booking systems.

### Implementation

1. **Utility function** in `src/lib/whatsapp.ts` that builds `https://wa.me/{phoneNumber}?text={encodedMessage}` URLs.
2. **Pre-filled messages** per context:
   - General inquiry (from contact page).
   - Tattoo quote request (from tattoo service page).
   - Piercing appointment (from piercing service page).
   - Artist-specific (from artist pages).
3. **Phone numbers** per location stored in `src/lib/constants.ts`.
4. **WhatsApp floating button:** Visible on all pages (bottom-right corner), fixed position. Links to the location closest to the current page context (e.g., Cancún location page → Cancún WhatsApp number).
5. **CTA buttons** throughout the site: hero section, service pages, artist pages, blog post footers, contact page.
6. **Tracking (optional, deferred):** UTM parameters in WhatsApp pre-filled text to understand traffic source.

---

## Deployment Strategy (Vercel)

- **Platform:** Vercel (optimized for Next.js, free tier sufficient for this project scope).
- **Domain:** `www.tattookim.com.mx` → Vercel DNS or external DNS with CNAME.
- **Build command:** `next build` (static export where possible).
- **Environment variables:** Minimal — only if analytics or feature flags are needed later.
- **Preview deployments:** Every PR gets a preview URL for review.
- **Production branch:** `main`.
- **Build checks:**
  - TypeScript strict mode (no errors).
  - ESLint (no warnings).
  - Lighthouse CI threshold (≥ 90 performance).
- **CDN:** Vercel Edge Network automatically serves static assets globally.
- **Cache headers:** Immutable assets (fonts, images) cached aggressively. HTML pages revalidate on deploy.

---

## Coding Standards

### General

- **TypeScript:** Strict mode. No `any` types. Explicit return types on exported functions.
- **Components:** React Server Components by default. Only use `"use client"` when necessary (interactive elements).
- **Reusable components first:** Always prefer creating small, reusable components over duplicating markup or logic. If a UI pattern appears (or is likely to appear) in more than one place, extract it into a shared component in `src/components/ui/`. Examples: CTA buttons, section headings, cards, image wrappers, badges, location info blocks. Props should be typed explicitly and kept minimal — favor composition over configuration. Before building any new UI element, check if an existing component already covers the need.
- **Naming:** PascalCase for components, camelCase for functions/variables, kebab-case for files and folders.
- **Imports:** Absolute imports via `@/` path alias (maps to `src/`).

### Styling

- **Tailwind CSS only.** No CSS modules, no styled-components, no inline styles.
- **Design tokens:** Define colors, spacing, and typography in `tailwind.config.ts` as a custom theme.
- **Dark theme:** Default and only theme. No light mode toggle needed.

### Content

- MDX files must pass frontmatter validation at build time.
- All MDX content must have a corresponding translation or an explicit single-locale flag.

### Git

- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`.
- Branch naming: `feat/feature-name`, `fix/bug-name`.
- PR required for all changes to `main`.

---

## Sanctioned Exceptions

These deviate from the "pure SSG, no backend" rule above. They are **deliberate, reviewed, and in production** — do not remove them as architecture violations.

### Google Reviews social proof

| Piece | Path |
|-------|------|
| Cron endpoint | `src/app/api/cron/route.ts` |
| Cron schedule | `vercel.json` — `0 12 1 * *` (monthly) |
| Data layer | `src/lib/google-reviews.ts` |

**Why it exists:** real Google ratings and reviews are the strongest trust signal for a local studio, and this is the only way to surface them without a CMS or a database — both of which remain Non-Goals. The schedule is monthly *on purpose*: it caps Google Places API calls to stay inside the free tier (see commit `eb99288`).

**Constraints that still apply:**

- This is the **only** API route in the project. Do not add others.
- The endpoint is authenticated with `CRON_SECRET` (Bearer token) and returns 401 otherwise.
- Pages never call Google at request time. Fetches are tagged (`google-reviews-{locale}`) with a 30-day `revalidate`; the cron warms and invalidates that cache via `revalidateTag`.
- `src/lib/google-reviews.ts` degrades to `FALLBACK_DATA` when the API key or the network is unavailable, so builds and renders never fail on it.
- Every credential comes from `process.env` (`GOOGLE_PLACES_API_KEY`, `GOOGLE_PLACE_ID_PDC`, `GOOGLE_PLACE_ID_CUN`, `CRON_SECRET`). Nothing hardcoded, nothing committed.
- All other pages remain statically generated. This exception does not license SSR anywhere else.

---

## Non-Goals (Explicitly Avoided)

These are things we are **not** building. Do not introduce them:

- ❌ **CMS** (no Sanity, Contentful, Notion, Strapi, etc.)
- ❌ **Database** (no Postgres, Supabase, Firebase, etc.)
- ❌ **Authentication** (no user accounts, no admin panel)
- ❌ **E-commerce** (no payments, no booking/scheduling system)
- ❌ **Contact forms** (WhatsApp only — no email forms, no Formspree)
- ❌ **Heavy animations** (no Framer Motion, GSAP, Lottie)
- ❌ **Analytics on MVP** (defer to post-launch; if needed, use Vercel Analytics only)
- ❌ **Comments system** (no Disqus, no comment sections on blog)
- ❌ **Newsletter/email capture** (no Mailchimp, ConvertKit, etc.)
- ❌ **Chat widgets** (no Intercom, Drift, etc.)
- ❌ **Image carousel libraries** (if a gallery is needed, build a simple CSS grid)
- ❌ **Dark/light mode toggle** (dark only)
- ❌ **Additional API routes** (no new `/api/*` endpoints beyond the sanctioned cron — see above)
- ❌ **Third-party fetches in the render path** (no external calls at request time; sanctioned data is served from cache)
