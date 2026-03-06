import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { getAllArtists } from '@/lib/content';
import type { Locale } from '@/types';
import PageHero from '@/components/ui/PageHero';
import JsonLd from '@/components/ui/JsonLd';
import { buildAlternates } from '@/lib/seo';
import { buildBreadcrumbJsonLd } from '@/lib/jsonld';
import { SITE_URL } from '@/lib/constants';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'artists' });
    return {
        title:
            locale === 'es'
                ? 'Artistas — Conoce al Equipo | Tattoo Kim'
                : 'Artists — Meet the Team | Tattoo Kim',
        description: t('desc'),
        alternates: buildAlternates(locale, '/artistas', '/artists'),
    };
}

const LOCATION_NAMES: Record<string, Record<string, string>> = {
    es: {
        'playa-del-carmen': 'Playa del Carmen',
        cancun: 'Cancún',
        both: 'Playa del Carmen & Cancún',
    },
    en: {
        'playa-del-carmen': 'Playa del Carmen',
        cancun: 'Cancún',
        both: 'Playa del Carmen & Cancún',
    },
};

export default async function ArtistsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'artists' });

    const artists = getAllArtists(locale as Locale);

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: 'Tattoo Kim', url: `${SITE_URL}/${locale}` },
        { name: locale === 'es' ? 'Artistas' : 'Artists', url: `${SITE_URL}/${locale}/${locale === 'es' ? 'artistas' : 'artists'}` },
    ]);

    return (
        <main className="min-h-screen bg-[#121212]">
            <JsonLd data={breadcrumb} />
            <PageHero
                label={t('label')}
                title={t('title')}
                description={t('desc')}
            />

            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    {artists.length === 0 ? (
                        <p className="text-center text-slate-500 text-lg">{t('no_artists')}</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                            {artists.map((artist) => (
                                <article
                                    key={artist.slug}
                                    className="bg-[#121212] group flex flex-col hover:bg-[#0d1f1e] transition-colors duration-300"
                                >
                                    <Link
                                        href={`/${locale}/artistas/${artist.slug}`}
                                        className="flex flex-col h-full"
                                    >
                                        <div className="relative aspect-square overflow-hidden">
                                            <Image
                                                src={artist.image}
                                                alt={artist.name}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 50vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-[#14b8a6] mb-2">
                                                    {LOCATION_NAMES[locale]?.[artist.location] ?? artist.location}
                                                </p>
                                                <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-1">
                                                    {artist.name}
                                                </h2>
                                                <p className="text-slate-400 text-sm mb-4">
                                                    {artist.role}
                                                </p>

                                                <div className="flex flex-wrap gap-2">
                                                    {artist.specialties.map((s) => (
                                                        <span
                                                            key={s}
                                                            className="text-[9px] font-black uppercase tracking-widest text-[#14b8a6] border border-[#14b8a6]/30 px-2 py-1"
                                                        >
                                                            {s}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 flex items-center justify-between mt-auto">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-[#14b8a6]">
                                                {t('view_work')} →
                                            </span>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
