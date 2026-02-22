import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    locales: ['es', 'en'],
    defaultLocale: 'es',

    // Localized path segments (ES <-> EN)
    pathnames: {
        '/': '/',
        '/servicios/tatuajes': {
            es: '/servicios/tatuajes',
            en: '/services/tattoos',
        },
        '/servicios/piercings': {
            es: '/servicios/piercings',
            en: '/services/piercings',
        },
        '/artistas': {
            es: '/artistas',
            en: '/artists',
        },
        '/artistas/[slug]': {
            es: '/artistas/[slug]',
            en: '/artists/[slug]',
        },
        '/ubicaciones/playa-del-carmen': {
            es: '/ubicaciones/playa-del-carmen',
            en: '/locations/playa-del-carmen',
        },
        '/ubicaciones/cancun': {
            es: '/ubicaciones/cancun',
            en: '/locations/cancun',
        },
        '/blog': '/blog',
        '/blog/[slug]': '/blog/[slug]',
        '/contacto': {
            es: '/contacto',
            en: '/contact',
        },
    },
});
