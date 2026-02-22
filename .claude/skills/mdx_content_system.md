# Skill: MDX Content System — Tattoo Kim

## Purpose

Define rules and best practices for authoring, parsing, and rendering MDX content for the blog and artist systems.

---

## Content Architecture

All content lives in the `content/` directory at the project root (NOT inside `src/`):

```
content/
├── blog/
│   ├── es/
│   │   └── cuidados-despues-tatuaje.mdx
│   └── en/
│       └── tattoo-aftercare.mdx
└── artists/
    ├── es/
    │   └── kim.mdx
    └── en/
        └── kim.mdx
```

Content is read from the filesystem at **build time only**. No runtime file access.

## Blog Frontmatter Schema

Every blog `.mdx` file MUST contain these frontmatter fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | ✅ | Post title in the file's locale |
| `slug` | string | ✅ | URL-safe slug (lowercase, hyphens only) |
| `description` | string | ✅ | Meta description (120–160 chars) |
| `date` | string (ISO) | ✅ | Publication date: `YYYY-MM-DD` |
| `author` | string | ✅ | Author slug (matches an artist slug) |
| `tags` | string[] | ✅ | 2–5 tags for categorization |
| `image` | string | ✅ | Path to cover image in `/public/images/` |
| `locale` | `"es"` or `"en"` | ✅ | Must match the directory the file lives in |
| `translationSlug` | string | ✅ | Shared key linking ES ↔ EN versions |

## Artist Frontmatter Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | ✅ | Display name |
| `slug` | string | ✅ | URL-safe slug |
| `role` | string | ✅ | Title/role in the studio |
| `location` | `"playa-del-carmen"` / `"cancun"` / `"both"` | ✅ | Primary location |
| `specialties` | string[] | ✅ | List of tattoo styles |
| `image` | string | ✅ | Path to headshot in `/public/images/artists/` |
| `instagram` | string | ❌ | Full Instagram URL |
| `locale` | `"es"` or `"en"` | ✅ | Must match directory |
| `translationSlug` | string | ✅ | Shared key for ES ↔ EN linking |

## MDX Body Rules

- Keep MDX bodies simple: headings, paragraphs, images, bold/italic, and lists.
- Do NOT import React components inside MDX files. If custom components are needed for rendering (e.g., a gallery grid), map them via the MDX component provider in the rendering layer, not in the MDX file itself.
- Images in MDX should use standard Markdown image syntax: `![alt text](/images/gallery/example.webp)`. The rendering layer must intercept these and replace them with `next/image` components.
- No inline JSX or JavaScript expressions inside MDX files.
- Maximum post length: aim for 500–1500 words. Blog posts are for SEO and information, not longform essays.

## Content Fetching Pattern

Build two primary utility functions in `src/lib/content.ts`:

### Blog

- `getAllPosts(locale: 'es' | 'en')` → Returns all posts for a locale, sorted by date descending. Used by the blog listing page and `generateStaticParams()`.
- `getPostBySlug(locale: 'es' | 'en', slug: string)` → Returns a single post with compiled MDX content. Used by the blog post page.

### Artists

- `getAllArtists(locale: 'es' | 'en')` → Returns all artists for a locale. Used by the artists listing page and `generateStaticParams()`.
- `getArtistBySlug(locale: 'es' | 'en', slug: string)` → Returns a single artist with compiled MDX bio. Used by the artist detail page.

### Translation Linking

- `getTranslation(type: 'blog' | 'artist', translationSlug: string, targetLocale: 'es' | 'en')` → Returns the slug of the counterpart in the other language, or `null` if it doesn't exist. Used by the language switcher to link to the translated version of the current page.

## Build-Time Validation

At build time (or in a pre-build script), validate:

1. Every MDX file has all required frontmatter fields.
2. The `locale` field matches the file's parent directory.
3. The `slug` field is URL-safe (lowercase, no spaces, only hyphens and alphanumeric).
4. The `image` path points to an existing file in `public/`.
5. The `date` field is a valid ISO date string.
6. No duplicate slugs within the same locale and content type.

If validation fails, the build must fail with a clear error message identifying the offending file and field.

## Performance Considerations

- MDX compilation happens at build time. Use `next-mdx-remote/rsc` for RSC-compatible rendering, or compile MDX to static HTML during the content fetching step.
- Do not bundle the MDX compiler in the client-side JavaScript. All MDX processing must happen server-side / at build time.
- Cache compiled MDX results if using a custom build pipeline (but with full SSG, Next.js handles this naturally).
