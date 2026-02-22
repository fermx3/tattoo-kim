# Skill: SEO Optimization — Tattoo Kim

## Purpose

Ensure every page is fully optimized for search engines, targeting local tattoo/piercing queries in Mexico's Riviera Maya region for both Spanish and English audiences.

---

## Target Keywords (Guidance)

### Spanish (Primary)

- "tatuajes Playa del Carmen"
- "tatuajes Cancún"
- "estudio de tatuajes Riviera Maya"
- "piercing Playa del Carmen"
- "piercing Cancún"
- "tatuador Playa del Carmen"
- "blackwork tatuaje México"
- "cuidados después del tatuaje"

### English (Secondary — Tourist Audience)

- "tattoo shop Playa del Carmen"
- "tattoo Cancún"
- "best tattoo studio Riviera Maya"
- "piercing near me Cancún"
- "tattoo aftercare"

These keywords inform page titles, descriptions, headings, and blog topics. Do NOT keyword-stuff — integrate naturally.

---

## Metadata Rules

Every page must use Next.js `generateMetadata()` to produce:

### Required Tags

| Tag | Rule |
|-----|------|
| `<title>` | Unique per page. Format: `{Page Title} \| Tattoo Kim`. Max 60 chars. |
| `<meta name="description">` | Unique per page. 120–160 chars. Include location and service keywords naturally. |
| `og:title` | Same as `<title>` |
| `og:description` | Same as meta description |
| `og:image` | Page-specific image or default OG image (1200×630) |
| `og:url` | Full canonical URL including locale prefix |
| `og:type` | `website` for pages, `article` for blog posts |
| `og:locale` | `es_MX` or `en_US` |
| `og:site_name` | `Tattoo Kim` |
| `twitter:card` | `summary_large_image` |
| `twitter:title` | Same as `<title>` |
| `twitter:description` | Same as meta description |
| `twitter:image` | Same as `og:image` |

### Forbidden

- No duplicate titles across any two pages.
- No duplicate descriptions across any two pages.
- No generic titles like "Home" or "Page".
- No missing descriptions on any page.

---

## Structured Data (JSON-LD)

Inject JSON-LD scripts in the `<head>` of relevant pages:

### LocalBusiness (Location Pages + Homepage)

For each location (Playa del Carmen and Cancún), include:

- `@type`: `TattooParlor` (or `LocalBusiness` with `additionalType`)
- `name`: "Tattoo Kim — Playa del Carmen" / "Tattoo Kim — Cancún"
- `address`: Full structured address
- `telephone`: WhatsApp number
- `url`: Location page URL
- `geo`: Latitude/longitude
- `openingHoursSpecification`: Business hours
- `image`: Studio photo URL
- `priceRange`: "$$"

### Article (Blog Posts)

- `@type`: `Article`
- `headline`: Post title
- `author`: `{ "@type": "Person", "name": "..." }`
- `datePublished`: ISO date
- `image`: Cover image
- `publisher`: `{ "@type": "Organization", "name": "Tattoo Kim" }`

### Person (Artist Pages)

- `@type`: `Person`
- `name`: Artist name
- `jobTitle`: Role
- `worksFor`: `{ "@type": "Organization", "name": "Tattoo Kim" }`
- `image`: Headshot URL
- `sameAs`: [Instagram URL]

### BreadcrumbList (All Pages)

Every page should have breadcrumb structured data:

```
Home > Services > Tattoos
Home > Artists > Kim
Home > Blog > Post Title
```

---

## Canonical URLs & hreflang

### Canonical

Every page must have: `<link rel="canonical" href="{full_url_with_locale}" />`

The canonical always includes the locale prefix (`/es/...` or `/en/...`). No page should be accessible without a locale prefix.

### hreflang

Every page must have both alternates:

```
<link rel="alternate" hreflang="es" href="https://www.tattookim.com.mx/es/..." />
<link rel="alternate" hreflang="en" href="https://www.tattookim.com.mx/en/..." />
<link rel="alternate" hreflang="x-default" href="https://www.tattookim.com.mx/es/..." />
```

For blog posts/artists where a translation doesn't exist, the hreflang for the missing locale should point to the listing page in that locale (e.g., `/en/blog` instead of a nonexistent post URL).

---

## Sitemap

Use `next-sitemap` to auto-generate at build time:

- Include all pages in both locales.
- Set `changefreq` appropriately: `monthly` for static pages, `weekly` for blog listing.
- Set `priority`: `1.0` for homepage, `0.8` for services/locations, `0.6` for blog posts, `0.5` for artists.
- Sitemap must be accessible at `https://www.tattookim.com.mx/sitemap.xml`.

## robots.txt

```
User-agent: *
Allow: /
Sitemap: https://www.tattookim.com.mx/sitemap.xml
```

No pages should be blocked from crawling.

---

## Content SEO Guidelines

- Every page must have exactly one `<h1>` tag, unique to that page.
- Use `<h2>` and `<h3>` for subtopics. Do not skip heading levels.
- All images must have descriptive `alt` text in the page's locale language.
- Internal links between related pages (e.g., blog post mentioning an artist → link to artist page).
- Location pages should mention the city name multiple times naturally.
- Blog posts should be 500–1500 words, targeting one primary keyword per post.

---

## Technical SEO Checklist (Per Page)

- [ ] Unique `<title>` (≤ 60 chars)
- [ ] Unique `<meta description>` (120–160 chars)
- [ ] Open Graph tags complete
- [ ] Twitter Card tags complete
- [ ] Canonical URL set
- [ ] hreflang alternates set (ES, EN, x-default)
- [ ] JSON-LD structured data (appropriate type)
- [ ] Single `<h1>` tag
- [ ] All images have `alt` text
- [ ] No broken internal links
- [ ] Page loads in < 3 seconds
- [ ] Mobile-friendly layout
