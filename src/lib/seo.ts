import { SITE_URL } from '@/lib/constants';

type Alternates = {
    canonical: string;
    languages: {
        'es-MX': string;
        en: string;
    };
};

export function buildAlternates(locale: string, esPath: string, enPath: string): Alternates {
    const canonical = `${SITE_URL}/${locale === 'es' ? `es${esPath}` : `en${enPath}`}`;
    return {
        canonical,
        languages: {
            'es-MX': `${SITE_URL}/es${esPath}`,
            en: `${SITE_URL}/en${enPath}`,
        },
    };
}
