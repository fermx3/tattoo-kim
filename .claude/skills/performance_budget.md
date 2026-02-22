# Skill: Performance Budget — Tattoo Kim

## Purpose

Define hard performance limits and enforcement strategies to guarantee Lighthouse 90+ and excellent Core Web Vitals. Performance is not optional — it is a hard project requirement.

---

## Performance Targets

| Metric | Target | Hard Fail |
|--------|--------|-----------|
| Lighthouse Performance Score | ≥ 90 | < 85 |
| Largest Contentful Paint (LCP) | < 2.5s | > 3.0s |
| Interaction to Next Paint (INP) | < 100ms | > 200ms |
| Cumulative Layout Shift (CLS) | < 0.1 | > 0.15 |
| First Contentful Paint (FCP) | < 1.5s | > 2.0s |
| Total Blocking Time (TBT) | < 150ms | > 300ms |
| Total Page Weight (initial) | < 500KB | > 750KB |
| JavaScript Bundle (gzipped) | < 150KB | > 200KB |
| CSS (gzipped) | < 30KB | > 50KB |

**"Hard Fail"** means: if a page exceeds this threshold, it must be fixed before shipping to production.

---

## JavaScript Rules

### Minimize Client-Side JS

- **Server Components are the default.** Only add `"use client"` for elements that absolutely require browser interactivity.
- Acceptable client components: language switcher, mobile nav toggle, image gallery lightbox (if implemented).
- Unacceptable: anything that could be a server component but was made client for convenience.

### No Heavy Libraries

**Banned:**
- Framer Motion, GSAP, AOS, Animate.css (use CSS transitions/animations only)
- Moment.js, date-fns (not needed — if date formatting is required, use `Intl.DateTimeFormat`)
- Lodash (use native JS methods)
- Axios (not needed — no client-side data fetching)
- Any UI component library

### Bundle Analysis

- Run `@next/bundle-analyzer` before every release.
- Investigate any module > 20KB gzipped.
- If a dependency is used for a single utility function, replace it with a hand-written version.

---

## CSS Rules

- **Tailwind CSS only.** Tailwind purges unused styles at build time, resulting in minimal CSS.
- No CSS modules, no styled-components, no Emotion, no inline style objects.
- Define the full design system (colors, spacing, fonts, breakpoints) in `tailwind.config.ts` — do not use arbitrary values (`text-[#1a1a1a]`) except in rare, justified cases.
- Dark theme colors should be defined once in the Tailwind config, not repeated across components.

---

## Font Rules

- **Self-host all fonts.** No Google Fonts CDN. Download WOFF2 files and place them in `public/fonts/`.
- **Maximum 2 font families** (one for headings, one for body — or just one if it works).
- **Maximum 3 weights total** across all families (e.g., Regular 400, Medium 500, Bold 700).
- Preload the primary font in the root layout: `<link rel="preload" as="font" type="font/woff2" href="/fonts/..." crossorigin>`.
- Use `font-display: swap` to prevent invisible text during load.
- Use `size-adjust` in `@font-face` to minimize layout shift when the web font replaces the fallback.

---

## Image Rules

- **Use `next/image` for ALL images.** No raw `<img>` tags anywhere.
- **WebP format only** for all images in `public/images/`.
- **Explicit `width` and `height`** on every `<Image>` component to prevent CLS.
- **Lazy loading by default.** Only hero images (above the fold on the homepage) should have `priority={true}`.
- **Responsive `sizes` prop** on every image:
  - Full-width hero: `sizes="100vw"`
  - Card in grid: `sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"`
- **Max file sizes:**
  - Hero images: < 200KB
  - Gallery thumbnails: < 100KB
  - Artist headshots: < 80KB
  - Blog cover images: < 150KB
  - OG images: < 150KB
- **Blur placeholders:** Generate `blurDataURL` for hero and cover images. Use a tiny (10px wide) base64-encoded placeholder.

---

## External Resources

- **No external scripts at initial load.** No Google Analytics, no Facebook Pixel, no Hotjar, no chat widgets on MVP.
- If analytics is added post-launch, it MUST:
  - Use `next/script` with `strategy="afterInteractive"` or `strategy="lazyOnload"`.
  - Not block the main thread.
  - Not increase TBT by more than 50ms.
- **No external fonts** (covered above — self-host only).
- **No external CSS** (everything is in Tailwind).
- **Google Maps embeds** on location pages must be lazy-loaded (only load the iframe when scrolled into view, or use a static map image with a click-to-load interaction).

---

## Rendering Performance

- **Zero client-side navigation overhead.** Next.js App Router with static pages means navigation is a simple HTML fetch, prefetched via `<Link>`.
- **Prefetch critical routes.** Next.js does this automatically for `<Link>` components in the viewport.
- **Avoid waterfalls.** Ensure all data fetching for a page happens in parallel at build time (e.g., don't fetch a blog post, then fetch the author — fetch both in `Promise.all`).

---

## Testing & Enforcement

### Pre-Merge Checks

Before any PR is merged:
1. Run Lighthouse CI on the affected pages — must meet targets above.
2. Run `@next/bundle-analyzer` — no unexpected bundle growth.
3. Visually verify no layout shift on page load (test on mobile).

### Production Monitoring

After launch:
1. Monitor Core Web Vitals in Google Search Console.
2. Run Lighthouse on production monthly (or set up automated Lighthouse CI in GitHub Actions).
3. If any metric degrades below "Hard Fail" thresholds, treat it as a P1 bug.

### Quick Performance Audit Checklist

- [ ] No `"use client"` directives on pages that don't need interactivity
- [ ] No external scripts loaded at page render
- [ ] All images use `next/image` with explicit dimensions
- [ ] Hero images have `priority={true}`, everything else is lazy
- [ ] Fonts are self-hosted WOFF2 with `font-display: swap`
- [ ] CSS is Tailwind only — no additional CSS files or inline styles
- [ ] Bundle analyzer shows no modules > 20KB gzipped
- [ ] Total JS < 150KB gzipped
- [ ] Google Maps (if used) is lazy-loaded
- [ ] No layout shift visible on 3G throttled mobile
