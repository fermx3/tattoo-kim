# Tattoo Kim

Sitio web bilingüe (ES/EN) del estudio de tatuajes y piercings **Tattoo Kim**, con sucursales en Playa del Carmen y Cancún.

Estático de punta a punta, sin CMS ni base de datos: el contenido vive en MDX dentro del repo y la captación de clientes va enteramente por WhatsApp. Estética oscura y minimalista.

**Producción:** [www.tattookim.com.mx](https://www.tattookim.com.mx)

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Lenguaje | TypeScript en modo strict |
| Estilos | Tailwind CSS v4 |
| i18n | next-intl 4 con rutas localizadas |
| Contenido | MDX (`content/`) |
| Deploy | Vercel |

Todas las páginas se prerenderizan en build (SSG). No hay backend salvo una API route sancionada — ver [Excepciones](#excepciones-a-la-arquitectura).

## Arranque

Requiere **Node 22.23.1** (fijado en `.nvmrc`; `nvm use` lo toma solo).

```bash
nvm use
npm ci
cp .env.example .env.local   # opcional en desarrollo, ver abajo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) — redirige a `/es`.

### Variables de entorno

Copia `.env.example` a `.env.local` y rellena lo que necesites. **Todas son opcionales en desarrollo:** sin ellas el sitio usa datos de respaldo (`FALLBACK_DATA` en `src/lib/google-reviews.ts`) y el build sale limpio igual.

| Variable | Para qué | Necesaria en |
|---|---|---|
| `GOOGLE_PLACES_API_KEY` | Reseñas y rating de Google | producción |
| `GOOGLE_PLACE_ID_PDC` | Ficha de Playa del Carmen | producción |
| `GOOGLE_PLACE_ID_CUN` | Ficha de Cancún | producción |
| `CRON_SECRET` | Protege `GET /api/cron` | producción |

`.env.local` está en `.gitignore` y nunca debe commitearse. En producción viven en Vercel; el CI no las necesita.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Valida el frontmatter MDX y compila |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint — debe salir en 0 errores y 0 warnings |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run analyze` | Build con el bundle analyzer |
| `npm run generate:blur` | Regenera los placeholders blur de las imágenes |

## Estructura

```
content/              # MDX: blog/{es,en}/ y artists/{es,en}/
messages/             # Cadenas de UI: es.json, en.json
public/               # Imágenes (.webp), fuentes (.woff2), OG
scripts/              # validate-frontmatter.mjs, generate-blur-placeholders.mjs
src/
  app/
    layout.tsx        # Root: pass-through, NO emite <html> (ver CLAUDE.md)
    [locale]/         # Todas las páginas; su layout emite <html lang>
    api/cron/         # Única API route (refresco mensual de reseñas)
  components/         # ui/ layout/ sections/ blog/ artists/ whatsapp/
  i18n/               # routing.ts (rutas localizadas), navigation.ts
  i18n.ts             # Config de request de next-intl
  lib/                # mdx, content, whatsapp, google-reviews, constants
  proxy.ts            # Middleware de next-intl (renombrado en Next 16)
```

## Rutas

Español por defecto en `/es`, inglés en `/en`, con segmentos traducidos:

| Español | Inglés |
|---|---|
| `/es/servicios/tatuajes` | `/en/services/tattoos` |
| `/es/servicios/piercings` | `/en/services/piercings` |
| `/es/artistas/[slug]` | `/en/artists/[slug]` |
| `/es/ubicaciones/cancun` | `/en/locations/cancun` |
| `/es/blog/[slug]` | `/en/blog/[slug]` |
| `/es/contacto` | `/en/contact` |

El mapeo vive en `src/i18n/routing.ts`.

## Contenido

Cada post y cada artista es un `.mdx` con frontmatter, bajo `content/{blog,artists}/{es,en}/`. El campo `translationSlug` enlaza las versiones ES y EN de una misma pieza.

`npm run build` valida el frontmatter antes de compilar (`scripts/validate-frontmatter.mjs`), así que un archivo mal formado rompe el build en vez de llegar a producción. Los esquemas están en `CLAUDE.md` y en la skill `mdx-content-system`.

## Excepciones a la arquitectura

El proyecto es SSG puro con una sola excepción deliberada: `src/app/api/cron/route.ts`, que refresca la caché de reseñas de Google una vez al mes (`vercel.json`) para mantener las llamadas a Places API dentro del free tier. Está autenticada con `CRON_SECRET`.

No añadas más rutas bajo `src/app/api/`. El razonamiento completo está en la sección *Sanctioned Exceptions* de `CLAUDE.md`.

## CI

`.github/workflows/ci.yml` corre en cada PR y en cada push a `master`: ESLint, `tsc --noEmit`, build y Lighthouse CI (3 corridas, se evalúa la mediana).

Los umbrales están calibrados sobre varianza medida, no sobre aspiraciones — el criterio de cada uno está comentado en el propio workflow. Accessibility, SEO, CLS, performance y best-practices rompen el build; LCP y TBT sólo avisan.

## Documentación

| Dónde | Qué |
|---|---|
| [`CLAUDE.md`](./CLAUDE.md) | Arquitectura, decisiones y Non-Goals. Léelo antes de tocar nada |
| [`.claude/skills/`](./.claude/skills/) | Guías por área: arquitectura, i18n, MDX, SEO, performance |
| [`docs/MVP_PROGRESS.md`](./docs/MVP_PROGRESS.md) | Estado de las fases del MVP |
| [`docs/PROJECT_KICKOFF_SUMMARY.md`](./docs/PROJECT_KICKOFF_SUMMARY.md) | Alcance y objetivos iniciales |

## Deploy

Vercel, automático desde `master`. Cada PR recibe una preview. `master` es la rama de producción y requiere PR.
