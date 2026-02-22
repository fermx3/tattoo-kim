# Skill: Internationalization (i18n) Strategy — Tattoo Kim

## Purpose

Define the complete internationalization approach for the bilingual ES/EN website using `next-intl` with the Next.js App Router.

---

## Library Choice

**`next-intl`** — selected because:
- First-class App Router and RSC support.
- Lightweight (no heavy runtime).
- Built-in middleware for locale detection and routing.
- Supports localized pathnames (different URL segments per language).

## Supported Locales

| Locale | Code | URL Prefix | Role |
|--------|------|------------|------|
| Spanish (Mexico) | `es` | `/es/...` | Default locale |
| English | `en` | `/en/...` | Secondary locale |

- The default locale is `es` because the target audience is primarily in Mexico.
- Root `/` always redirects to `/es`.

## Middleware Behavior

Configure `next-intl` middleware in `src/middleware.ts`:

1. **First visit (no locale cookie):**
   - Check `Accept-Language` header.
   - If `en` is preferred → redirect to `/en`.
   - Otherwise → redirect to `/es`.
2. **Subsequent visits:**
   - Respect the previously chosen locale (stored by `next-intl` in a cookie).
3. **Direct URL access:**
   - `/es/...` → serve Spanish.
   - `/en/...` → serve English.
   - `/anything-without-locale` → redirect to `/es/anything-without-locale`.

## Localized Pathnames

URLs must be semantic in both languages. Configure in `next-intl`:

```
Pathnames config (conceptual, not code):

/es/servicios/tatuajes       ↔  /en/services/tattoos
/es/servicios/piercings      ↔  /en/services/piercings
/es/artistas                 ↔  /en/artists
/es/artistas/[slug]          ↔  /en/artists/[slug]
/es/ubicaciones/playa-del-carmen  ↔  /en/locations/playa-del-carmen
/es/ubicaciones/cancun       ↔  /en/locations/cancun
/es/blog                     ↔  /en/blog
/es/blog/[slug]              ↔  /en/blog/[slug]
/es/contacto                 ↔  /en/contact
```

Note: The `[slug]` values for artists are the same in both languages. Blog slugs differ by language (each locale has its own slug in the MDX frontmatter).

## Translation Files

UI strings are stored in JSON files:

```
messages/
├── es.json
└── en.json
```

### Structure Convention

Organize translations by page/section namespace:

```json
{
  "nav": {
    "home": "Inicio",
    "services": "Servicios",
    "tattoos": "Tatuajes",
    "piercings": "Piercings",
    "artists": "Artistas",
    "locations": "Ubicaciones",
    "blog": "Blog",
    "contact": "Contacto"
  },
  "home": {
    "hero_title": "...",
    "hero_subtitle": "...",
    "hero_cta": "..."
  },
  "common": {
    "whatsapp_cta": "Agenda tu cita",
    "read_more": "Leer más",
    "view_all": "Ver todos",
    "back": "Volver"
  },
  "footer": { ... },
  "services": { ... },
  "locations": { ... },
  "contact": { ... },
  "not_found": { ... },
  "translation_unavailable": { ... }
}
```

### Rules for Translation Strings

- Keys are always in English (snake_case).
- Values are in the file's locale language.
- Do not use dynamic string concatenation — always use ICU message format for interpolation: `"greeting": "Hola, {name}"`.
- Every key that exists in `es.json` MUST also exist in `en.json`. Missing keys should be caught during build/lint.
- Do not put MDX content (blog posts, artist bios) in translation files. MDX content lives in `content/`.

## Language Switcher

### Behavior

- Always visible in the site header.
- Shows the current language and links to the other.
- Clicking the switcher navigates to the equivalent page in the other locale.
- For MDX content (blog, artists): the switcher uses the `translationSlug` to find the counterpart. If no counterpart exists, it links to the listing page in the other locale.
- For static pages (home, services, locations, contact): always has a 1:1 mapping.

### Display

- Use language codes or flags: `ES | EN` or a simple toggle.
- Must be accessible (keyboard navigable, proper ARIA labels).
- Must not cause layout shift when switching.

## Fallback Strategy

### UI Strings

If a translation key is missing in `en.json`, fall back to the `es.json` value. This prevents broken UI but should be caught in development via linting.

### Content Pages (MDX)

If a blog post or artist page exists in one language but not the other:
- The language switcher should NOT link to a 404.
- Instead, show a "translation not available" page with:
  - A message: "This content is not yet available in [requested language]."
  - A link to read it in the available language.
  - A link back to the listing page.

## SEO for i18n

- Every page must render `<link rel="alternate" hreflang="es" href="...">` and `<link rel="alternate" hreflang="en" href="...">` in the `<head>`.
- Add `<link rel="alternate" hreflang="x-default" href="{es-url}">` (Spanish as default).
- The `lang` attribute on `<html>` must match the current locale.
- Canonical URLs must include the locale prefix.
- Sitemap must include all URLs for both locales with proper `hreflang` annotations.
