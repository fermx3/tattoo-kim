import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import JsonLd from '@/components/ui/JsonLd';
import { LOCATIONS, SITE_URL } from '@/lib/constants';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { buildAlternates } from '@/lib/seo';
import { buildLocalBusinessJsonLd, buildBreadcrumbJsonLd } from '@/lib/jsonld';
import Link from 'next/link';

type Props = {
    params: Promise<{ locale: string; slug: string }>;
};

export async function generateStaticParams() {
    return LOCATIONS.map((loc) => ({ slug: loc.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const location = LOCATIONS.find((l) => l.slug === slug);
    if (!location) return {};
    return {
        title: locale === 'es'
            ? `Estudio ${location.name} | Tattoo Kim`
            : `${location.name} Studio | Tattoo Kim`,
        description: location.address,
        alternates: buildAlternates(locale, `/ubicaciones/${slug}`, `/locations/${slug}`),
    };
}

export default async function LocationPage({ params }: Props) {
    const { locale, slug } = await params;
    const location = LOCATIONS.find((l) => l.slug === slug);

    if (!location) notFound();

    setRequestLocale(locale);

    const t = await getTranslations({ locale, namespace: 'locations' });
    const otherLocation = LOCATIONS.find((l) => l.slug !== slug)!;

    const hours = [
        { key: 'weekdays', label: t('weekdays'), value: location.hours.weekdays },
        { key: 'saturday', label: t('saturday'), value: location.hours.saturday },
        { key: 'sunday', label: t('sunday'), value: location.hours.sunday },
    ];

    // Deduplicate rows with identical label + value
    const uniqueHours = hours.filter(
        (h, i, arr) => arr.findIndex((x) => x.label === h.label && x.value === h.value) === i
    );

    const jsonLdData = [
        buildLocalBusinessJsonLd(location, locale),
        buildBreadcrumbJsonLd([
            { name: 'Tattoo Kim', url: `${SITE_URL}/${locale}` },
            { name: location.name, url: `${SITE_URL}/${locale}/${locale === 'es' ? 'ubicaciones' : 'locations'}/${slug}` },
        ]),
    ];

    return (
        <main className="min-h-screen bg-[#121212]">
            <JsonLd data={jsonLdData} />
            {/* Hero */}
            <PageHero
                label={t('label')}
                title={location.name}
                description={location.address}
            />

            {/* Info grid */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Hours */}
                    <div>
                        <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#14b8a6] mb-8">
                            {t('hours_title')}
                        </h2>
                        <div className="space-y-4">
                            {uniqueHours.map(({ key, label, value }) => (
                                <div
                                    key={key}
                                    className="flex items-center justify-between border-b border-white/5 pb-4"
                                >
                                    <span className="text-sm text-slate-400 font-medium">{label}</span>
                                    <span className="text-sm text-white font-black">{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Address + actions */}
                    <div className="flex flex-col gap-6">
                        <div>
                            <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#14b8a6] mb-4">
                                {t('visit_us')}
                            </h2>
                            <p className="text-slate-300 text-base leading-relaxed">{location.address}</p>
                        </div>

                        <a
                            href={location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 border border-white/20 text-white px-6 py-4 text-[11px] font-black uppercase tracking-widest hover:border-[#14b8a6] hover:text-[#14b8a6] transition-all duration-300 w-fit"
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            {t('map_cta')}
                        </a>

                        <a
                            href={buildWhatsAppUrl(location.slug as 'playa-del-carmen' | 'cancun', 'general')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-[#14b8a6] text-[#121212] px-6 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-colors duration-300 w-fit"
                        >
                            {t('whatsapp_cta')}
                        </a>
                    </div>
                </div>
            </section>

            {/* Other location callout */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-slate-400 text-sm uppercase tracking-widest font-black">
                        {t('other_location')}
                    </p>
                    <Link
                        href={`/${locale}/${locale === 'es' ? 'ubicaciones' : 'locations'}/${otherLocation.slug}`}
                        className="text-lg font-black text-white hover:text-[#14b8a6] transition-colors tracking-tight"
                    >
                        {otherLocation.name} →
                    </Link>
                </div>
            </section>
        </main>
    );
}
