import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getArtistBySlug, getAllArtists } from '@/lib/content';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { buildAlternates } from '@/lib/seo';
import { buildPersonJsonLd, buildBreadcrumbJsonLd } from '@/lib/jsonld';
import { SITE_URL } from '@/lib/constants';
import JsonLd from '@/components/ui/JsonLd';
import GalleryLightbox from '@/components/ui/GalleryLightbox';
import type { Locale } from '@/types';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
    const esParams = getAllArtists('es').map((a) => ({ locale: 'es', slug: a.slug }));
    const enParams = getAllArtists('en').map((a) => ({ locale: 'en', slug: a.slug }));
    return [...esParams, ...enParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const artist = getArtistBySlug(locale as Locale, slug);
    if (!artist) return {};

    const description = locale === 'es'
        ? `Conoce a ${artist.name}, ${artist.role} en Tattoo Kim. Especialista en ${artist.specialties.join(', ')}.`
        : `Meet ${artist.name}, ${artist.role} at Tattoo Kim. Specializing in ${artist.specialties.join(', ')}.`;

    return {
        title: `${artist.name} — ${artist.role} | Tattoo Kim`,
        description,
        alternates: buildAlternates(locale, `/artistas/${slug}`, `/artists/${slug}`),
        openGraph: {
            title: `${artist.name} — ${artist.role}`,
            description,
            images: [{ url: artist.image }],
        },
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

export default async function ArtistDetailPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const artist = getArtistBySlug(locale as Locale, slug);

    if (!artist) notFound();

    const t = await getTranslations({ locale, namespace: 'artists' });

    const whatsappLocation = artist.location === 'both' ? 'playa-del-carmen' : artist.location;

    const jsonLdData = [
        buildPersonJsonLd(artist, locale),
        buildBreadcrumbJsonLd([
            { name: 'Tattoo Kim', url: `${SITE_URL}/${locale}` },
            { name: locale === 'es' ? 'Artistas' : 'Artists', url: `${SITE_URL}/${locale}/${locale === 'es' ? 'artistas' : 'artists'}` },
            { name: artist.name, url: `${SITE_URL}/${locale}/${locale === 'es' ? 'artistas' : 'artists'}/${slug}` },
        ]),
    ];

    return (
        <main className="min-h-screen bg-[#121212]">
            <JsonLd data={jsonLdData} />
            {/* Hero Section */}
            <section className="pt-32 pb-16 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-12 items-start">
                        {/* Headshot */}
                        <div className="relative aspect-square overflow-hidden mx-auto md:mx-0 w-full max-w-[320px]">
                            <Image
                                src={artist.image}
                                alt={artist.name}
                                fill
                                priority
                                sizes="320px"
                                className="object-cover"
                            />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-center">
                            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#14b8a6] mb-4">
                                {LOCATION_NAMES[locale]?.[artist.location] ?? artist.location}
                            </p>

                            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-tight mb-2">
                                {artist.name}
                            </h1>

                            <p className="text-slate-400 text-lg mb-6">{artist.role}</p>

                            <div className="flex flex-wrap gap-2 mb-8">
                                {artist.specialties.map((s) => (
                                    <span
                                        key={s}
                                        className="text-[9px] font-black uppercase tracking-widest text-[#14b8a6] border border-[#14b8a6]/30 px-2 py-1"
                                    >
                                        {s}
                                    </span>
                                ))}
                            </div>

                            {/* Bio */}
                            <div className="prose prose-invert prose-lg max-w-none
                                prose-p:text-slate-300 prose-p:leading-relaxed
                                prose-strong:text-white prose-strong:font-black
                            ">
                                <MDXRemote source={artist.content} />
                            </div>

                            {/* WhatsApp CTA */}
                            <div className="mt-8">
                                <a
                                    href={buildWhatsAppUrl(whatsappLocation, { artist: artist.name }, locale)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-[#14b8a6] text-[#121212] px-10 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-colors duration-300"
                                >
                                    {t('book_with', { name: artist.name })}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery */}
            {artist.gallery && artist.gallery.length > 0 && (
                <section className="py-16 px-6">
                    <div className="max-w-6xl mx-auto">
                        <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#14b8a6] mb-8 text-center">
                            {t('gallery_title')}
                        </h2>

                        <GalleryLightbox
                            images={artist.gallery.map((img, i) => ({
                                src: img,
                                alt: `${artist.name} tattoo ${i + 1}`,
                            }))}
                        />
                    </div>
                </section>
            )}

            {/* Back link */}
            <div className="pb-24 text-center">
                <Link
                    href={`/${locale}/artistas`}
                    className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#14b8a6] transition-colors duration-300"
                >
                    ← {t('back_to_artists')}
                </Link>
            </div>
        </main>
    );
}
