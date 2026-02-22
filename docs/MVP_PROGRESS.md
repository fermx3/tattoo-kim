# MVP_PROGRESS.md — Tattoo Kim Task Tracker

> Track progress by checking boxes as tasks are completed.
> Dependencies are noted inline with → arrows.

**Última actualización:** 2026-02-22 (Phase 5.1–5.6 en progreso)

---

## Pre-Phase: Arquitectura & Diseño ✅

- [x] **0.1** Definir arquitectura técnica completa (`CLAUDE.md`) — rendering, componentes, dependencias, SEO, performance
- [x] **0.2** Crear skills de directrices: `nextjs_architecture.md`, `mdx_content_system.md`, `i18n_strategy.md`, `seo_optimization.md`, `performance_budget.md` — todos verificados y leídos
- [x] **0.3** Diseño UI de referencia aprobado — Stitch Landing Page (ID: `14928376532203837668`) revisado y validado como fuente de verdad visual
  - Paleta: charcoal `#121212` + accent-teal `#14b8a6`
  - Fuente: Inter (self-hosted en implementación)
  - Tema: dark-only, sin toggle
  - Secciones: Hero, Gallery, About, Specialties, Testimonial, Contact, Footer

---

## Phase 1: Planning ✏️

- [x] **1.1** Finalize brand assets (color palette, font selection) — definido vía diseño Stitch aprobado: charcoal `#121212`, teal `#14b8a6`, Inter
- [ ] **1.1b** Logo final en SVG (pendiente de entrega)
- [ ] **1.2** Collect WhatsApp phone numbers for both locations (Playa del Carmen & Cancún)
- [ ] **1.3** Gather artist information (names, bios, specialties, photos, Instagram handles)
- [ ] **1.4** Collect studio photos for both locations
- [ ] **1.5** Define initial blog topics (minimum 3 posts for launch)
- [ ] **1.6** Prepare portfolio images (minimum 10 tattoo photos, 5 piercing photos)
- [ ] **1.7** Write copy for service pages (tattoos + piercings) in Spanish
- [ ] **1.8** Write copy for location pages in Spanish
- [ ] **1.9** Define business hours for both locations
- [ ] **1.10** Prepare Open Graph default image (1200×630)

---

## Phase 2: Project Setup ⚙️

- [x] **2.1** Initialize Next.js project with App Router and TypeScript
- [x] **2.2** Configure `tsconfig.json` with strict mode and `@/` path alias
- [x] **2.3** Install Tailwind CSS v4 + PostCSS — custom dark theme pendiente de configurar en `tailwind.config.ts`
- [x] **2.4** Set up ESLint with `eslint-config-next` (core-web-vitals + typescript)
- [x] **2.5** Initialize Git repository with `.gitignore`
- [x] **2.6** Create folder structure per CLAUDE.md specification (`components/ui,layout,sections,blog,artists,whatsapp`, `lib/`, `styles/`, `types/`, `content/blog,artists`, `messages/`)
- [x] **2.7** Self-host fonts (Inter WOFF2) — `public/fonts/` con 3 pesos (400/500/700), `@font-face` en `src/styles/globals.css`
- [x] **2.8** Set up `next.config.ts` — MDX support (`@next/mdx`), image optimization (webp/avif), TypeScript strict
- [x] **2.9** Install core dependencies: `next-intl`, `@next/mdx`, `gray-matter`, `next-sitemap`, `@mdx-js/loader`, `@mdx-js/react`
- [x] **2.10** Create constants file with WhatsApp numbers (placeholder), addresses, social links — `src/lib/constants.ts` creado (rellenar con datos reales cuando estén disponibles)

---

## Phase 3: Core Architecture 🏗️

- [x] **3.1** Build root layout (`src/app/layout.tsx`) — Inter self-hosted preload, remove Geist/Google Fonts, metadata base
- [x] **3.2** Build locale layout (`src/app/[locale]/layout.tsx`) — NextIntlClientProvider, Header, Footer, WhatsApp floating
- [x] **3.3** Create Header component with navigation and language switcher
- [x] **3.4** Create Footer component with location info, social links, WhatsApp CTA
- [x] **3.5** Create WhatsApp floating button component (`floating` + `inline` variants)
- [x] **3.6** Build WhatsApp URL utility (`src/lib/whatsapp.ts`) with pre-filled messages per context
- [x] **3.7** Define shared TypeScript types (`src/types/index.ts`) — BlogPost, Artist, StudioLocation
- [x] **3.8** Build mobile navigation (hamburger menu, fullscreen overlay) — `MobileNav.tsx`
- [x] **3.9** Create reusable CTA button component — `CTAButton.tsx` (primary/secondary, sm/md/lg)
- [x] **3.10** Implement 404 pages — global `not-found.tsx` + locale-aware `[locale]/not-found.tsx`

---

## Phase 4: Internationalization (i18n) 🌐

- [x] **4.1** Configure `next-intl` with App Router middleware (locale detection, redirect) — `src/proxy.ts` + `src/i18n.ts` + `src/i18n/routing.ts`
- [x] **4.2** Create translation files: `messages/es.json` and `messages/en.json` with all UI strings — nav, hero, footer y WhatsApp strings
- [x] **4.3** Configure localized pathnames mapping (ES ↔ EN route segments) — definido en `src/i18n/routing.ts`
- [x] **4.4** Implement language switcher component that preserves current page context — `LanguageSwitcher.tsx` con `usePathname` + `useRouter` de next-intl
- [x] **4.5** Build "translation not available" fallback page — `src/app/[locale]/not-available/page.tsx` con soporte `?originalUrl=`
- [x] **4.6** Test middleware: root `/` redirects to `/es`, `Accept-Language: en` redirects to `/en` — verificado con `curl` (HTTP 301)
- [ ] **4.7** Verify `hreflang` alternate links render correctly on all pages → *depends on 7.3*

---

## Phase 5: Pages & Sections 📄

- [x] **5.1** Build Homepage — hero section, services overview, featured artists, location cards, CTA → *completado*
- [x] **5.2** Build Tattoo service page — styles grid, 4-step process, WhatsApp CTA
- [x] **5.3** Build Piercing service page — types grid, materials/safety section, WhatsApp CTA
- [x] **5.4** Build Playa del Carmen location page — hours, address, map link, WhatsApp CTA
- [x] **5.5** Build Cancún location page — same dynamic route `ubicaciones/[slug]`
- [x] **5.6** Build Contact page — both studio cards, WhatsApp CTA per studio, Instagram link
- [ ] **5.7** Translate all page copy to English → *next-intl routes ready, translations done*

---

## Phase 6: Blog System 📝

- [ ] **6.1** Build MDX parsing utility (`src/lib/mdx.ts`) — read files, parse frontmatter, compile MDX
- [ ] **6.2** Build content fetching functions — `getAllPosts(locale)`, `getPostBySlug(locale, slug)` → *depends on 6.1*
- [ ] **6.3** Create Blog listing page (`/blog`) — card grid, sorted by date → *depends on 6.2*
- [ ] **6.4** Create Blog post page (`/blog/[slug]`) — MDX rendering, metadata, CTA footer → *depends on 6.2*
- [ ] **6.5** Build blog card component (image, title, date, excerpt)
- [ ] **6.6** Write first 3 blog posts in Spanish MDX → *depends on 1.5*
- [ ] **6.7** Translate blog posts to English MDX → *depends on 6.6*
- [ ] **6.8** Implement `generateStaticParams()` for blog routes
- [ ] **6.9** Add translation linking between ES ↔ EN blog posts via `translationSlug`
- [ ] **6.10** Validate frontmatter schema at build time (fail build on invalid MDX)

---

## Phase 7: Artists System 🎨

- [ ] **7.1** Build artist content fetching — `getAllArtists(locale)`, `getArtistBySlug(locale, slug)` → *depends on 6.1 (shared MDX util)*
- [ ] **7.2** Create Artists listing page — grid of artist cards with photos and specialties
- [ ] **7.3** Create Individual artist page — bio (MDX body), specialties, gallery, location, Instagram link, WhatsApp CTA
- [ ] **7.4** Build artist card component
- [ ] **7.5** Write artist MDX content in Spanish → *depends on 1.3*
- [ ] **7.6** Translate artist MDX to English → *depends on 7.5*
- [ ] **7.7** Implement `generateStaticParams()` for artist routes
- [ ] **7.8** Artist-specific WhatsApp pre-filled messages ("Hola, quiero una cita con Kim...")

---

## Phase 8: SEO 🔍

- [ ] **8.1** Implement `generateMetadata()` on all page routes with unique titles and descriptions
- [ ] **8.2** Add Open Graph and Twitter Card meta tags to all pages → *depends on 1.10*
- [ ] **8.3** Add `hreflang` alternate links on every page (ES ↔ EN)
- [ ] **8.4** Add canonical URLs to every page
- [ ] **8.5** Implement JSON-LD structured data: `LocalBusiness` for both locations
- [ ] **8.6** Implement JSON-LD: `Article` for blog posts
- [ ] **8.7** Implement JSON-LD: `Person` for artist pages
- [ ] **8.8** Implement JSON-LD: `BreadcrumbList` on all pages
- [ ] **8.9** Configure `next-sitemap` to generate sitemap.xml and robots.txt at build time
- [ ] **8.10** Verify all pages have unique `<title>` and `<meta description>` — no duplicates
- [ ] **8.11** Test structured data with Google Rich Results Test

---

## Phase 9: Performance Optimization ⚡

- [ ] **9.1** Audit all images: convert to WebP, enforce size limits (< 300KB), add dimensions
- [ ] **9.2** Configure `next/image` with responsive sizes and priority flag on above-fold hero images
- [ ] **9.3** Generate blurDataURL placeholders for hero and gallery images
- [ ] **9.4** Ensure fonts are preloaded with `font-display: swap` and `size-adjust`
- [ ] **9.5** Audit client components — minimize `"use client"` usage, ensure only interactive elements are client-side
- [ ] **9.6** Run `@next/bundle-analyzer` — verify JS bundle < 150KB gzipped
- [ ] **9.7** Test all pages with Lighthouse — target ≥ 90 Performance, Accessibility, SEO, Best Practices
- [ ] **9.8** Test Core Web Vitals: LCP < 2.5s, INP < 100ms, CLS < 0.1
- [ ] **9.9** Verify no external blocking scripts load on initial page render
- [ ] **9.10** Test on mobile 3G throttled connection — page must be usable within 4 seconds

---

## Phase 10: Pre-Launch QA 🧪

- [ ] **10.1** Test all routes in both locales — no broken links, no 404s
- [ ] **10.2** Test language switcher on every page — correct page in other language loads
- [ ] **10.3** Test WhatsApp links on mobile — correct phone number, pre-filled message opens in WhatsApp
- [ ] **10.4** Test WhatsApp links on desktop — opens WhatsApp Web
- [ ] **10.5** Cross-browser testing: Chrome, Safari, Firefox (latest versions)
- [ ] **10.6** Mobile responsive testing: iPhone SE, iPhone 14, Pixel 7, iPad
- [ ] **10.7** Validate HTML with W3C validator
- [ ] **10.8** Test 404 page for non-existent routes
- [ ] **10.9** Test translation fallback page for missing translations
- [ ] **10.10** Proofread all Spanish and English content

---

## Phase 11: Deployment 🚀

- [ ] **11.1** Create Vercel project and connect Git repository
- [ ] **11.2** Configure custom domain `www.tattookim.com.mx` in Vercel
- [ ] **11.3** Set up DNS records (CNAME or Vercel nameservers)
- [ ] **11.4** Verify SSL certificate is active
- [ ] **11.5** Deploy to production from `main` branch
- [ ] **11.6** Verify sitemap.xml accessible at `www.tattookim.com.mx/sitemap.xml`
- [ ] **11.7** Verify robots.txt accessible at `www.tattookim.com.mx/robots.txt`
- [ ] **11.8** Submit sitemap to Google Search Console
- [ ] **11.9** Submit sitemap to Bing Webmaster Tools
- [ ] **11.10** Run final Lighthouse audit on production URL
- [ ] **11.11** Set up Vercel preview deployments for PR branches
- [ ] **11.12** Create Google Business Profile entries for both locations (link to website)

---

## Post-Launch (Deferred) 📋

These are not part of MVP but documented for future reference:

- [ ] Add Vercel Analytics (lightweight, privacy-friendly)
- [ ] Set up Google Analytics 4 (deferred, loaded asynchronously)
- [ ] Create Google Ads landing pages if paid campaigns are planned
- [ ] Add more blog content on a regular schedule
- [ ] Consider Instagram feed embed (only if performance impact is minimal)
- [ ] Monitor Core Web Vitals in Search Console
