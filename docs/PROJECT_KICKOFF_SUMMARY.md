# PROJECT_KICKOFF_SUMMARY.md — Tattoo Kim

## Estado Actual — 2026-02-22

| Etapa | Estado |
|-------|--------|
| Arquitectura técnica (`CLAUDE.md`) | ✅ Completo |
| Skills de directrices (5 archivos en `.claude/skills/`) | ✅ Revisados y aprobados |
| Diseño UI de referencia (Stitch) | ✅ Aprobado como fuente de verdad visual |
| Setup del proyecto Next.js | ⏳ Pendiente (Phase 2) |
| Implementación de páginas | ⏳ Pendiente (Phase 3+) |

---

## Executive Summary

Tattoo Kim is a statically generated, bilingual (ES/EN) Next.js website for a tattoo & piercing studio with two locations in Mexico. The entire lead funnel goes through WhatsApp. Content is managed via MDX files committed to Git — no CMS, no database, no external APIs. The site ships dark, minimal, and fast (Lighthouse 90+).

---

## Practical Next Steps to Begin Development

1. **Collect brand assets immediately.** Logo (SVG), color palette (exact hex codes), and font selection must be finalized before any UI work. If no brand guide exists, establish one — even a minimal one with 3–4 colors and 1–2 fonts is enough.

2. **Lock down WhatsApp numbers and business info.** Get the exact phone numbers (with country code +52) for both locations, physical addresses, Google Maps coordinates, business hours, and Instagram handles. Store everything in a single constants file from day one.

3. **Initialize the Next.js project with the exact tech stack.** App Router, TypeScript strict, Tailwind CSS, `next-intl`, MDX support, and `next-sitemap`. Follow the folder structure defined in CLAUDE.md precisely — no deviations.

4. **Set up i18n routing first.** Configure `next-intl` middleware, create the `messages/es.json` and `messages/en.json` files with navigation strings, and build the locale layout. Verify that `/` → `/es`, `/en/...` works, and the language switcher toggles correctly. This is foundational — everything else depends on it.

5. **Build the shell (Header + Footer + WhatsApp button) before any pages.** These are shared across every page. Get the dark theme, fonts, and navigation working globally before touching individual pages.

6. **Implement the MDX content pipeline early.** Build `getAllPosts()`, `getPostBySlug()`, `getAllArtists()`, and `getArtistBySlug()` with frontmatter parsing and validation. Test with one placeholder blog post and one placeholder artist in both languages. This unblocks Phases 6 and 7 in parallel.

7. **Build pages in priority order: Homepage → Services → Locations → Contact → Artists → Blog.** The homepage and service pages are the most important for lead generation. Blog and artists can be completed in parallel once the MDX pipeline works.

8. **Write Spanish content first, then translate to English.** The primary audience is in Mexico. Get all Spanish copy finalized and reviewed before translating. Use the `translationSlug` system from the start to keep translations linked.

9. **Run Lighthouse after every major page is built — not just at the end.** Catching performance regressions early is 10x cheaper than fixing them at the end. Target 90+ from the first page. Run bundle analyzer after adding any new dependency.

10. **Implement SEO incrementally with each page.** Do not leave `generateMetadata()`, JSON-LD, and hreflang as a "Phase 8 cleanup." Add them when building each page — it takes 5 extra minutes per page and prevents a painful retrofit later.

11. **Prepare real content before deployment.** The site should not launch with "Lorem ipsum." Minimum viable content: 3 blog posts (ES + EN), all artist bios, all service page copy, and all location details. Portfolio images (at least 10 tattoo + 5 piercing photos) should be optimized and ready.

12. **Deploy to Vercel early — even with placeholder content.** Get the domain, SSL, and deployment pipeline working in Phase 2. Use preview deployments for every PR. Do not wait until the site is "done" to set up Vercel.

13. **QA on real mobile devices, not just browser DevTools.** Test WhatsApp links on an actual phone (both iOS and Android). Test navigation with a thumb. Test on a mid-range Android device on a real cellular connection in Mexico.

14. **Submit to Google Search Console and Bing Webmaster Tools on launch day.** Upload the sitemap immediately. Create or claim Google Business Profile listings for both locations and link them to the website.

15. **Plan post-launch content cadence.** The blog exists for SEO. Commit to at least 2 posts per month (ES + EN) covering tattoo aftercare, style guides, studio news, and local culture. This is what drives organic traffic over time.

---

## Key Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| Content delays (photos, copy not ready) | Start with placeholder content; deploy early; swap in real content as it arrives |
| Performance regression from new features | Lighthouse CI on every PR; bundle analyzer before merges |
| Missing translations at launch | Build validation that flags unpaired `translationSlug` entries |
| WhatsApp links broken on some devices | Test on iOS Safari, Android Chrome, and desktop browsers before launch |
| SEO not indexed quickly | Submit sitemap on day 1; create Google Business Profiles; blog consistently |
