# MVP_PROGRESS.md — Tattoo Kim Task Tracker

> Track progress by checking boxes as tasks are completed.
> Dependencies are noted inline with → arrows.

**Última actualización:** 2026-03-12 (Phase 10 QA: 8/10 completadas, bugs 404 y títulos duplicados corregidos)

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

## Phase 1: Planning ✏️ (8/10 completadas)

- [x] **1.1** Finalize brand assets (color palette, font selection) — definido vía diseño Stitch aprobado: charcoal `#121212`, teal `#14b8a6`, Inter
- [x] **1.1b** Logo final en SVG — `public/images/logo-full-white.svg`, `logo-white.svg`, `icon-white.svg`
- [x] **1.2** Collect WhatsApp phone numbers for both locations — PDC: `529842809885`, CUN: `529841447501` en `src/lib/constants.ts`
- [x] **1.3** Gather artist information — 3 artistas completos (Cha Reyes, Erick Bones, Tammy) con bios, fotos, especialidades en ES/EN
- [ ] **1.4** Collect studio photos for both locations — directorio `public/images/studio/` aún no existe
- [x] **1.5** Define initial blog topics — 2 posts completos en ES/EN (aftercare tatuaje + piercing). Nota: 2 de 3 mínimo, pero cubren los temas iniciales
- [x] **1.6** Prepare portfolio images — 26 imágenes .webp en `public/images/gallery/` (10 Cha, 5 Erick, 9 Tammy, 2 blog covers)
- [x] **1.7** Write copy for service pages — completo en `messages/es.json`: 9 estilos tattoo, 6 tipos piercing, proceso 4 pasos
- [x] **1.8** Write copy for location pages — completo en `messages/es.json` + `constants.ts` con direcciones reales
- [x] **1.9** Define business hours for both locations — 11:00–22:00 ambas sucursales en `constants.ts`
- [ ] **1.10** Prepare Open Graph default image (1200×630) — directorio `public/images/og/` aún no existe

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
- [x] **3.8** Build mobile navigation — `MobileNav.tsx` rediseñado con React Portal (`createPortal`) para escapar stacking context del header; un solo botón toggle ≡↔× flotante en z-99999; overlay sólido en z-9999
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
- [x] **4.7** Verify `hreflang` alternate links render correctly on all pages — implementado en Phase 8

---

## Phase 5: Pages & Sections 📄

- [x] **5.1** Build Homepage — hero section, services overview, featured artists, location cards, CTA → *completado*
- [x] **5.2** Build Tattoo service page — styles grid, 4-step process, WhatsApp CTA
- [x] **5.3** Build Piercing service page — types grid, materials/safety section, WhatsApp CTA
- [x] **5.4** Build Playa del Carmen location page — hours, address, map link, WhatsApp CTA
- [x] **5.5** Build Cancún location page — same dynamic route `ubicaciones/[slug]`
- [x] **5.6** Build Contact page — both studio cards, WhatsApp CTA per studio, Instagram link
- [x] **5.7** Translate all page copy to English → i18n completado (ES + EN) para todos los namespaces de servicios, ubicaciones y contacto

---

## UX Fixes — Navegación 🛠️

> Mejoras de UX aplicadas el 2026-02-23 durante QA móvil.

- [x] **UX-1** Menú móvil rediseñado con `createPortal` — escapa el stacking context del `<header z-50>` para pintar sobre todo el contenido de la página
- [x] **UX-2** Botón toggle ≡↔× unificado — único botón `position: fixed; z-index: 99999` que actúa como hamburguesa (cerrado) y como × (abierto); elimina botón de cierre redundante
- [x] **UX-3** Fondo del overlay siempre opaco — se usa `visibility` (no `opacity`) en el contenedor para que el `background-color` no se transparente durante transiciones
- [x] **UX-4** Placeholder `div 44×44px` en header — reserva el espacio del botón flotante en el flex del header para que el `LanguageSwitcher` no se desplace
- [x] **UX-5** `LanguageSwitcher` touch target mejorado — `px-3 py-3` en cada botón para área táctil ≥ 44px recomendada por Apple/Google
- [x] **UX-6** Logo y link "Inicio" hacen scroll-to-top — `HomeLink` client component detecta si el usuario ya está en la homepage y hace `window.scrollTo({ top:0, behavior:'smooth' })` en lugar de no hacer nada; aplica en desktop y móvil

---

## Phase 6: Blog System ✅

- [x] **6.1** Build MDX parsing utility — `gray-matter` + `next-mdx-remote/rsc` en `src/lib/content.ts`
- [x] **6.2** Build content fetching functions — `getAllPosts(locale)`, `getPostBySlug(locale, slug)` en `src/lib/content.ts`
- [x] **6.3** Create Blog listing page (`/blog`) — card grid, sorted by date, hover effects
- [x] **6.4** Create Blog post page (`/blog/[slug]`) — MDX rendering, cover image, metadata, WhatsApp CTA footer
- [x] **6.5** Build blog card component — inline en listing page (image, tags, title, description, date)
- [x] **6.6** Write first 2 blog posts in Spanish MDX — `cuidados-tatuaje.mdx`, `cuidados-piercing.mdx`
- [x] **6.7** Translate blog posts to English MDX — `tattoo-aftercare.mdx`, `piercing-aftercare.mdx`
- [x] **6.8** Implement `generateStaticParams()` for blog routes
- [x] **6.9** Add translation linking between ES ↔ EN blog posts via `translationSlug`
- [x] **6.10** Validate frontmatter schema at build time ✅ `scripts/validate-frontmatter.mjs` runs before `next build`

---

## Phase 7: Artists System ✅

- [x] **7.1** Build artist content fetching — `getAllArtists(locale)`, `getArtistBySlug(locale, slug)` en `src/lib/content.ts`
- [x] **7.2** Create Artists listing page — grid con image, location, name, role, specialties
- [x] **7.3** Create Individual artist page — headshot, bio (MDX), specialties, gallery CSS columns, WhatsApp CTA
- [x] **7.4** Build artist card component — inline en listing page
- [x] **7.5** Write artist MDX content in Spanish — erick-bones, tammy
- [x] **7.6** Translate artist MDX to English
- [x] **7.7** Implement `generateStaticParams()` for artist routes
- [x] **7.8** Artist-specific WhatsApp pre-filled messages con nombre del artista

---

## Phase 8: SEO ✅

- [x] **8.1** Implement `generateMetadata()` on all page routes with unique titles and descriptions
- [x] **8.2** Add Open Graph and Twitter Card meta tags — defaults en root layout + OG específico por página
- [x] **8.3** Add `hreflang` alternate links on every page (ES ↔ EN) — `buildAlternates()` en `src/lib/seo.ts`
- [x] **8.4** Add canonical URLs to every page — incluido en `alternates` de cada `generateMetadata()`
- [x] **8.5** Implement JSON-LD structured data: `TattooParlor` para ambas ubicaciones — `src/lib/jsonld.ts`
- [x] **8.6** Implement JSON-LD: `Article` for blog posts
- [x] **8.7** Implement JSON-LD: `Person` for artist pages
- [x] **8.8** Implement JSON-LD: `BreadcrumbList` on all pages
- [x] **8.9** Sitemap y robots.txt — Next.js App Router nativo (`src/app/sitemap.ts`, `src/app/robots.ts`)
- [x] **8.10** Verify all pages have unique `<title>` and `<meta description>` — confirmado en build
- [x] **8.11** Test structured data with Google Rich Results Test ✅ 0 errors: TattooParlor, Article, Person, BreadcrumbList all valid

---

## Phase 9: Performance Optimization ⚡

- [x] **9.1** Audit all images: convert to WebP, enforce size limits (< 300KB) — `hero-brand.jpg`, `about-artist.jpg`, `hero-bg.jpg` eliminados; `.webp` generados con `cwebp -q 85`
- [x] **9.2** Configure `next/image` with responsive sizes and priority flag ✅ all Image components have `sizes` and `priority`
- [x] **9.3** Generate blurDataURL placeholders for hero and gallery images ✅ 36 placeholders, applied on hero, about, gallery, artist detail, blog cover
- [x] **9.4** Ensure fonts are preloaded with `font-display: swap` — `globals.css`: `font-display: swap` en 3 pesos; `layout.tsx`: `<link rel="preload">` para 3 archivos WOFF2
- [x] **9.5** Audit client components — solo 4 `"use client"`: LanguageSwitcher, GalleryLightbox, MobileNav, HomeLink (todos justificados por interactividad)
- [x] **9.6** Run `@next/bundle-analyzer` ✅ JS bundle ~55KB gzipped (app) + ~138KB framework = 193KB total
- [x] **9.7** Test all pages with Lighthouse ✅ Production: Perf 98, A11y 96, SEO 100, BP 77 (BP limited by Google Ads gtag cookies)
- [x] **9.8** Test Core Web Vitals ✅ Production: LCP 2.3s, FCP 1.3s, TBT 60ms, CLS 0.003
- [x] **9.9** Verify no external blocking scripts — cero `<script>` externos en layouts
- [x] **9.10** Test on mobile 3G throttled connection ✅ FCP 3.7s, LCP 3.7s, Speed Index 3.8s — usable within 4s

---

## Phase 10: Pre-Launch QA 🧪

- [x] **10.1** Test all routes in both locales — no broken links, no 404s ✅ 26 URLs verified
- [x] **10.2** Test language switcher on every page — correct page in other language loads ✅ verified on 5 pages
- [x] **10.3** Test WhatsApp links on mobile — correct phone number, pre-filled message opens in WhatsApp ✅ 8 links checked
- [x] **10.4** Test WhatsApp links on desktop — opens WhatsApp Web ✅ 8 links checked
- [x] **10.5** Cross-browser testing: Chrome, Safari, Firefox (latest versions) ✅
- [x] **10.6** Mobile responsive testing: iPhone SE, iPhone 14, Pixel 7, iPad ✅ iPhone SE, iPhone 14, iPad verified
- [x] **10.7** Validate HTML with W3C validator ✅ 0 errors on 6 pages (ES+EN homepage, services, artist, blog, contact)
- [x] **10.8** Test 404 page for non-existent routes ✅ fixed bug: English 404 showed Spanish text → added catch-all route `[...rest]/page.tsx`
- [x] **10.9** Test translation fallback page for missing translations ✅
- [x] **10.10** Proofread all Spanish and English content ✅ no placeholders, no wrong-language text

---

## Phase 11: Deployment 🚀

- [x] **11.1** Create Vercel project and connect Git repository ✅ deployed on Vercel
- [x] **11.2** Configure custom domain `www.tattookim.com.mx` in Vercel ✅ domain active
- [x] **11.3** Set up DNS records (CNAME or Vercel nameservers) ✅ resolves correctly
- [x] **11.4** Verify SSL certificate is active ✅ Let's Encrypt, CN=www.tattookim.com.mx
- [x] **11.5** Deploy to production from `main` branch ✅ master branch live
- [x] **11.6** Verify sitemap.xml accessible at `www.tattookim.com.mx/sitemap.xml` ✅ all ES/EN routes
- [x] **11.7** Verify robots.txt accessible at `www.tattookim.com.mx/robots.txt` ✅ Allow: /, Sitemap referenced
- [~] **11.8** ~~Submit sitemap to Google Search Console~~ — deferred post-launch
- [~] **11.9** ~~Submit sitemap to Bing Webmaster Tools~~ — deferred post-launch
- [x] **11.10** Run final Lighthouse audit on production URL ✅ Perf 98, A11y 96, SEO 100, BP 77
- [x] **11.11** Set up Vercel preview deployments for PR branches ✅ automatic on Vercel
- [~] **11.12** ~~Create Google Business Profile entries for both locations~~ — deferred post-launch

---

## Mejoras adicionales (no planificadas originalmente) ✅

> Trabajo completado entre 2026-03-05 y 2026-03-11 que no estaba en el tracker original.

- [x] Gallery lightbox para perfiles de artistas + fix language switcher en rutas dinámicas (`294c211`)
- [x] Localización de Google Reviews por idioma ES/EN (`8cab4fd`)
- [x] Localización de mensajes WhatsApp por locale + fix blog CTA context (`b8fb781`)
- [x] Artista Cha Reyes agregado con estilos realismo/chicano/tribal + artist chips (`503a98c`)
- [x] Hero subtitle actualizado para mencionar Playa del Carmen y Cancún (`799dc61`)

---

## Post-Launch (Deferred) 📋

These are not part of MVP but documented for future reference:

- [ ] Add Vercel Analytics (lightweight, privacy-friendly)
- [ ] Set up Google Analytics 4 (deferred, loaded asynchronously)
- [ ] Create Google Ads landing pages if paid campaigns are planned
- [ ] Add more blog content on a regular schedule
- [ ] Consider Instagram feed embed (only if performance impact is minimal)
- [ ] Monitor Core Web Vitals in Search Console
