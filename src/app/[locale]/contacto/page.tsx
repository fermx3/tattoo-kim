import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import JsonLd from '@/components/ui/JsonLd';
import { LOCATIONS, INSTAGRAM_URL, SITE_URL } from '@/lib/constants';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { buildAlternates } from '@/lib/seo';
import { buildBreadcrumbJsonLd } from '@/lib/jsonld';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    return {
        title: locale === 'es'
            ? 'Contacto | Tattoo Kim — Playa del Carmen & Cancún'
            : 'Contact | Tattoo Kim — Playa del Carmen & Cancún',
        description: locale === 'es'
            ? 'Contáctanos por WhatsApp para agendar tu cita en Tattoo Kim.'
            : 'Contact us via WhatsApp to book your appointment at Tattoo Kim.',
        alternates: buildAlternates(locale, '/contacto', '/contact'),
    };
}

export default async function ContactPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'contact' });
    const loc = await getTranslations({ locale, namespace: 'locations' });

    const dayLabels = {
        weekdays: loc('weekdays'),
        saturday: loc('saturday'),
        sunday: loc('sunday'),
    };

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: 'Tattoo Kim', url: `${SITE_URL}/${locale}` },
        { name: locale === 'es' ? 'Contacto' : 'Contact', url: `${SITE_URL}/${locale}/${locale === 'es' ? 'contacto' : 'contact'}` },
    ]);

    return (
        <main className="min-h-screen bg-[#121212]">
            <JsonLd data={breadcrumb} />
            {/* Hero */}
            <PageHero
                label={t('label')}
                title={t('title')}
                description={t('desc')}
            />

            {/* Studios */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#14b8a6] mb-12 text-center">
                        {t('studios_title')}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5">
                        {LOCATIONS.map((location) => (
                            <div
                                key={location.slug}
                                className="bg-[#121212] p-10 flex flex-col gap-8"
                            >
                                {/* Name */}
                                <h2 className="text-2xl font-black tracking-tighter text-white">
                                    {location.name}
                                </h2>

                                {/* Address */}
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {location.address}
                                </p>

                                {/* Hours */}
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">
                                        {t('hours_label')}
                                    </p>
                                    <div className="space-y-2">
                                        {(
                                            [
                                                ['weekdays', location.hours.weekdays],
                                                ['saturday', location.hours.saturday],
                                                ['sunday', location.hours.sunday],
                                            ] as const
                                        ).map(([key, value]) => (
                                            <div key={key} className="flex justify-between text-sm">
                                                <span className="text-slate-400">{dayLabels[key]}</span>
                                                <span className="text-white font-black">{value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* WhatsApp CTA */}
                                <a
                                    href={buildWhatsAppUrl(
                                        location.slug as 'playa-del-carmen' | 'cancun',
                                        'general',
                                        locale
                                    )}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-[#14b8a6] text-[#121212] px-6 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-colors duration-300 w-fit mt-auto"
                                >
                                    {/* WhatsApp icon */}
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                    </svg>
                                    {t('whatsapp_cta')}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Instagram */}
            <section className="py-16 px-6 border-t border-white/5">
                <div className="max-w-5xl mx-auto text-center">
                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-slate-400 text-[11px] font-black uppercase tracking-widest hover:text-white transition-colors duration-300"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        {t('instagram_cta')}
                    </a>
                </div>
            </section>
        </main>
    );
}
