import { SITE_URL, SITE_NAME } from '@/lib/constants';
import type { StudioLocation } from '@/types';

export function buildLocalBusinessJsonLd(location: StudioLocation, locale: string) {
    const locationPath = locale === 'es'
        ? `/es/ubicaciones/${location.slug}`
        : `/en/locations/${location.slug}`;

    return {
        '@context': 'https://schema.org',
        '@type': 'TattooParlor',
        name: `${SITE_NAME} — ${location.name}`,
        url: `${SITE_URL}${locationPath}`,
        telephone: `+${location.phone}`,
        address: {
            '@type': 'PostalAddress',
            streetAddress: location.address,
            addressLocality: location.name,
            addressRegion: 'Quintana Roo',
            addressCountry: 'MX',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: location.coords.lat,
            longitude: location.coords.lng,
        },
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '11:00',
                closes: '22:00',
            },
        ],
    };
}

export function buildArticleJsonLd(post: {
    title: string;
    description: string;
    image: string;
    date: string;
    slug: string;
}, locale: string) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        description: post.description,
        image: `${SITE_URL}${post.image}`,
        datePublished: post.date,
        author: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: SITE_NAME,
            url: SITE_URL,
        },
        mainEntityOfPage: `${SITE_URL}/${locale}/blog/${post.slug}`,
    };
}

export function buildPersonJsonLd(artist: {
    name: string;
    role: string;
    image: string;
    specialties: string[];
    slug: string;
}, locale: string) {
    const artistPath = locale === 'es'
        ? `/es/artistas/${artist.slug}`
        : `/en/artists/${artist.slug}`;

    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: artist.name,
        jobTitle: artist.role,
        image: `${SITE_URL}${artist.image}`,
        url: `${SITE_URL}${artistPath}`,
        worksFor: {
            '@type': 'Organization',
            name: SITE_NAME,
        },
        knowsAbout: artist.specialties,
    };
}

export function buildBreadcrumbJsonLd(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: item.name,
            item: item.url,
        })),
    };
}
