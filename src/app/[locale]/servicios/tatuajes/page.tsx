import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'services' });
    return {
        title: locale === 'es'
            ? 'Tatuajes | Tattoo Kim — Playa del Carmen & Cancún'
            : 'Tattoos | Tattoo Kim — Playa del Carmen & Cancún',
        description: t('tattoos_desc'),
    };
}

const styles = [
    { key: 'blackwork', icon: '◼' },
    { key: 'realism', icon: '◎' },
    { key: 'geometric', icon: '◆' },
    { key: 'minimalist', icon: '—' },
    { key: 'watercolor', icon: '◐' },
    { key: 'custom', icon: '✦' },
] as const;

const steps = [1, 2, 3, 4] as const;

export default async function TattoosPage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations({ locale, namespace: 'services' });

    return (
        <main className="min-h-screen bg-[#121212]">
            {/* Hero */}
            <PageHero
                label={t('tattoos_label')}
                title={t('tattoos_title')}
                description={t('tattoos_desc')}
            />

            {/* Styles Grid */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section header */}
                    <div className="text-center mb-16">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#14b8a6] mb-4">
                            {t('tattoos_styles_label')}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
                            {t('tattoos_styles_title')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
                        {styles.map(({ key, icon }) => (
                            <div
                                key={key}
                                className="bg-[#121212] p-8 group hover:bg-[#0d1f1e] transition-colors duration-300"
                            >
                                <div className="text-3xl text-[#14b8a6] mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                                    {icon}
                                </div>
                                <h3 className="text-lg font-black text-white uppercase tracking-wider mb-3">
                                    {t(`style_${key}_title` as Parameters<typeof t>[0])}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {t(`style_${key}_desc` as Parameters<typeof t>[0])}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-24 px-6 bg-white/[0.02]">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#14b8a6] mb-4">
                            {t('process_label')}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
                            {t('process_title')}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((n) => (
                            <div key={n} className="relative">
                                {/* Connector line (desktop) */}
                                {n < 4 && (
                                    <div className="hidden lg:block absolute top-6 left-[calc(100%+16px)] w-full h-px bg-white/10 -translate-x-8" />
                                )}
                                <div className="text-5xl font-black text-[#14b8a6]/20 mb-4 leading-none">
                                    {t(`process_step${n}_num` as Parameters<typeof t>[0])}
                                </div>
                                <h3 className="text-base font-black text-white uppercase tracking-wider mb-3">
                                    {t(`process_step${n}_title` as Parameters<typeof t>[0])}
                                </h3>
                                <p className="text-slate-400 text-sm leading-relaxed">
                                    {t(`process_step${n}_desc` as Parameters<typeof t>[0])}
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
                        {t('cta_title')}
                    </h2>
                    <p className="text-slate-400 mb-10 text-lg">{t('cta_desc')}</p>
                    <a
                        href={buildWhatsAppUrl('playa-del-carmen', 'tattoo')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#14b8a6] text-[#121212] px-10 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-colors duration-300"
                    >
                        {t('cta_button')}
                    </a>
                </div>
            </section>
        </main>
    );
}
