import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import JsonLd from '@/components/ui/JsonLd';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { buildAlternates } from '@/lib/seo';
import { buildBreadcrumbJsonLd } from '@/lib/jsonld';
import { SITE_URL } from '@/lib/constants';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'services' });
    return {
        title: locale === 'es'
            ? 'Piercings Profesionales | Tattoo Kim — Playa del Carmen & Cancún'
            : 'Professional Piercings | Tattoo Kim — Playa del Carmen & Cancún',
        description: t('piercings_desc'),
        alternates: buildAlternates(locale, '/servicios/piercings', '/services/piercings'),
    };
}

const piercingTypes = [
    { key: 'ear', icon: '◑' },
    { key: 'nose', icon: '◎' },
    { key: 'cartilage', icon: '◔' },
    { key: 'belly', icon: '◉' },
    { key: 'surface', icon: '◈' },
    { key: 'micro', icon: '✦' },
] as const;

const materials = ['titanium', 'implant', 'sterile'] as const;

export default async function PiercingsPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'services' });

    const breadcrumb = buildBreadcrumbJsonLd([
        { name: 'Tattoo Kim', url: `${SITE_URL}/${locale}` },
        { name: 'Piercings', url: `${SITE_URL}/${locale === 'es' ? 'es/servicios/piercings' : 'en/services/piercings'}` },
    ]);

    return (
        <main className="min-h-screen bg-[#121212]">
            <JsonLd data={breadcrumb} />
            {/* Hero */}
            <PageHero
                label={t('piercings_label')}
                title={t('piercings_title')}
                description={t('piercings_desc')}
            />

            {/* Types Grid */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#14b8a6] mb-4">
                            {t('piercings_types_label')}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
                            {t('piercings_types_title')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
                        {piercingTypes.map(({ key, icon }) => (
                            <div
                                key={key}
                                className="bg-[#121212] p-8 group hover:bg-[#0d1f1e] transition-colors duration-300"
                            >
                                <div className="text-3xl text-[#14b8a6] mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                                    {icon}
                                </div>
                                <h3 className="text-lg font-black text-white uppercase tracking-wider mb-3">
                                    {t(`piercing_${key}_title` as Parameters<typeof t>[0])}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {t(`piercing_${key}_desc` as Parameters<typeof t>[0])}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Materials / Safety */}
            <section className="py-24 px-6 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#14b8a6] mb-4">
                            {t('materials_label')}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
                            {t('materials_title')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {materials.map((mat) => (
                            <div
                                key={mat}
                                className="border border-white/10 p-8 hover:border-[#14b8a6]/40 transition-colors duration-300"
                            >
                                <div className="w-10 h-10 bg-[#14b8a6]/10 flex items-center justify-center mb-6">
                                    <span className="text-[#14b8a6] text-lg">✔</span>
                                </div>
                                <h3 className="text-base font-black text-white uppercase tracking-wider mb-3">
                                    {t(`materials_${mat}_title` as Parameters<typeof t>[0])}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {t(`materials_${mat}_desc` as Parameters<typeof t>[0])}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-6">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white mb-4">
                        {t('piercings_cta_title')}
                    </h2>
                    <p className="text-slate-400 mb-10 text-lg">{t('piercings_cta_desc')}</p>
                    <a
                        href={buildWhatsAppUrl('playa-del-carmen', 'piercing')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#14b8a6] text-[#121212] px-10 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-colors duration-300"
                    >
                        {t('piercings_cta_button')}
                    </a>
                </div>
            </section>
        </main>
    );
}
