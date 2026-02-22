# Skill: Next.js Architecture — Tattoo Kim

## Purpose

Govern all architectural decisions for the Tattoo Kim Next.js application. Every contributor and AI coding assistant must follow these rules.

---

## Rendering Model

- **Default: Static Site Generation (SSG).** Every page must be statically generated at build time using `generateStaticParams()`.
- **No SSR.** Do not use `force-dynamic`, `revalidate`, or `fetch` with `cache: 'no-store'`.
- **No API routes.** The `src/app/api/` directory must not exist. There is no backend.
- **No ISR.** Incremental Static Regeneration is not needed — content changes trigger a full rebuild via Git push.

## Component Model

- **Server Components by default.** Every component is a React Server Component unless it requires browser APIs or interactivity.
- **`"use client"` is a last resort.** Only the following elements should be client components:
  - Language switcher (needs `usePathname`, `useRouter`)
  - Mobile navigation toggle (needs `useState`)
  - WhatsApp floating button (if it has scroll-based behavior)
- **No client-side data fetching.** No `useEffect` + `fetch`. No SWR. No React Query. All data is resolved at build time.

## Reusable Components

**Core principle: always prefer reusable components over duplicated markup.**

### Rules

1. **Extract early.** If a UI pattern appears (or will likely appear) in more than one place, extract it into a shared component immediately. Do not wait for the duplication to happen — anticipate it.
2. **Component home:** All reusable components live in `src/components/ui/`. Page-specific compositions live in `src/components/sections/`, `src/components/blog/`, `src/components/artists/`, etc.
3. **Props over duplication.** Use typed props to handle variations (size, color, layout) instead of creating near-identical copies of a component. Keep prop interfaces minimal — favor 2–5 props. If a component needs more than 7 props, consider splitting it or using composition (children/slots).
4. **Composition over configuration.** Prefer passing children or render slots over complex prop-driven conditional rendering. A `<Card>` that accepts `children` is better than a `<Card>` with 10 content props.
5. **Check before creating.** Before building any new UI element, review existing components in `src/components/ui/` to see if the need is already covered or can be covered with a small extension.

### Expected Reusable Components (minimum)

| Component | Location | Usage |
|-----------|----------|-------|
| `CTAButton` | `ui/` | WhatsApp CTA everywhere (hero, services, artists, blog, contact, footer) |
| `SectionHeading` | `ui/` | Consistent heading + subtitle pattern across homepage sections and pages |
| `Card` | `ui/` | Base card used by `BlogCard`, `ArtistCard`, `LocationCard` |
| `BlogCard` | `blog/` | Blog listing, homepage featured posts |
| `ArtistCard` | `artists/` | Artist listing, homepage featured artists |
| `LocationCard` | `ui/` | Homepage locations section, contact page |
| `ImageWrapper` | `ui/` | Standardized `next/image` with blur placeholder and aspect ratio |
| `Badge` | `ui/` | Tags, specialties, location labels |
| `WhatsAppButton` | `whatsapp/` | Floating button + inline CTA variant |
| `LanguageSwitcher` | `layout/` | Header language toggle |

### Anti-Patterns (Avoid)

- ❌ Copy-pasting a card layout into multiple pages with minor tweaks.
- ❌ Creating `TattooServiceCTA` and `PiercingServiceCTA` when a single `CTAButton` with props suffices.
- ❌ Inline styling or one-off Tailwind compositions that duplicate an existing component's visual pattern.
- ❌ Building a "generic" component that tries to handle every possible case — keep it focused.

## Routing Rules

- All pages live under `src/app/[locale]/`.
- The `[locale]` segment is handled by `next-intl` middleware.
- Dynamic segments (`[slug]`) must always have a corresponding `generateStaticParams()`.
- Localized path segments (e.g., `/servicios` vs `/services`) are configured in `next-intl`'s pathnames config, NOT by duplicating page files.

## Layout Hierarchy

```
src/app/layout.tsx              → <html>, <body>, global CSS
  └── src/app/[locale]/layout.tsx  → i18n provider, Header, Footer, WhatsApp button
        └── page.tsx / [slug]/page.tsx → Page content
```

- The root layout sets the `lang` attribute dynamically based on locale.
- The locale layout wraps all content in the `next-intl` provider.
- No nested layouts beyond the locale level unless a clear, demonstrated need arises.

## Dependency Rules

**Allowed:**
- `next` (App Router)
- `next-intl` (i18n)
- `@next/mdx` or `next-mdx-remote` (MDX rendering)
- `gray-matter` (frontmatter parsing)
- `next-sitemap` (sitemap generation)
- `tailwindcss`, `postcss`, `autoprefixer`
- `@next/bundle-analyzer` (dev only)
- `sharp` (image optimization, usually auto-installed by Vercel)

**Forbidden:**
- Animation libraries (Framer Motion, GSAP, Lottie, AOS)
- CSS-in-JS (styled-components, Emotion, Stitches)
- State management (Redux, Zustand, Jotai)
- Data fetching libraries (SWR, React Query, Axios)
- UI component libraries (Chakra, MUI, Radix, shadcn — build what you need from scratch)
- CMS SDKs of any kind
- Database ORMs or clients
- Authentication libraries

## File Naming

- **Pages and layouts:** `page.tsx`, `layout.tsx`, `not-found.tsx` (Next.js conventions).
- **Components:** PascalCase filename matching component name — `WhatsAppButton.tsx`.
- **Utilities:** camelCase — `whatsapp.ts`, `mdx.ts`.
- **Content files:** kebab-case — `tattoo-aftercare.mdx`.

## Error Handling

- Every `[locale]` directory must have a `not-found.tsx` for locale-aware 404 pages.
- The root `src/app/not-found.tsx` catches requests that don't match any locale.
- No `error.tsx` boundaries needed for MVP (no runtime errors expected in a fully static site).

## Build Validation

The build must fail if:
- TypeScript has type errors (`strict: true`).
- ESLint reports errors.
- Any MDX file has invalid or missing required frontmatter fields.
- `generateStaticParams()` returns empty arrays (indicates missing content).
