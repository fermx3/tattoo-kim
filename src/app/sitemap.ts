import type { MetadataRoute } from 'next';
import { getAllPosts, getAllArtists } from '@/lib/content';
import { LOCATIONS, SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    // Static pages with localized paths
    const staticPages: MetadataRoute.Sitemap = [
        // Homepages
        { url: `${SITE_URL}/es`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
        { url: `${SITE_URL}/en`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
        // Services — tattoos
        { url: `${SITE_URL}/es/servicios/tatuajes`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE_URL}/en/services/tattoos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        // Services — piercings
        { url: `${SITE_URL}/es/servicios/piercings`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE_URL}/en/services/piercings`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        // Artists listing
        { url: `${SITE_URL}/es/artistas`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        { url: `${SITE_URL}/en/artists`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
        // Blog listing
        { url: `${SITE_URL}/es/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
        { url: `${SITE_URL}/en/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
        // Contact
        { url: `${SITE_URL}/es/contacto`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
        { url: `${SITE_URL}/en/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ];

    // Location pages
    const locationPages: MetadataRoute.Sitemap = LOCATIONS.flatMap((loc) => [
        { url: `${SITE_URL}/es/ubicaciones/${loc.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
        { url: `${SITE_URL}/en/locations/${loc.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    ]);

    // Blog posts
    const esPosts = getAllPosts('es');
    const enPosts = getAllPosts('en');
    const blogPages: MetadataRoute.Sitemap = [
        ...esPosts.map((p) => ({
            url: `${SITE_URL}/es/blog/${p.slug}`,
            lastModified: new Date(p.date),
            changeFrequency: 'yearly' as const,
            priority: 0.6,
        })),
        ...enPosts.map((p) => ({
            url: `${SITE_URL}/en/blog/${p.slug}`,
            lastModified: new Date(p.date),
            changeFrequency: 'yearly' as const,
            priority: 0.6,
        })),
    ];

    // Artists
    const esArtists = getAllArtists('es');
    const enArtists = getAllArtists('en');
    const artistPages: MetadataRoute.Sitemap = [
        ...esArtists.map((a) => ({
            url: `${SITE_URL}/es/artistas/${a.slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
        ...enArtists.map((a) => ({
            url: `${SITE_URL}/en/artists/${a.slug}`,
            lastModified: now,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ];

    return [...staticPages, ...locationPages, ...blogPages, ...artistPages];
}
