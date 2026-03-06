import { useTranslations, useLocale } from 'next-intl';
import CTAButton from '@/components/ui/CTAButton';

export default function FinalCTASection() {
    const t = useTranslations('home');
    const locale = useLocale();

    return (
        <section className="relative py-40 overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-[#121212]" />
            {/* Teal glow effect */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[600px] h-[600px] bg-[#14b8a6]/5 rounded-full blur-3xl" />
            </div>
            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px),
                                     linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-16 text-center">
                <p className="text-[#14b8a6] font-black uppercase tracking-[0.35em] text-xs mb-6">
                    {t('final_cta_label')}
                </p>

                <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-white uppercase tracking-tighter leading-[0.88] mb-8">
                    {t('final_cta_title')}
                </h2>

                <div className="w-16 h-[2px] bg-[#14b8a6] mx-auto mb-8" />

                <p className="text-slate-400 font-light text-lg leading-relaxed max-w-xl mx-auto mb-14">
                    {t('final_cta_desc')}
                </p>

                <CTAButton
                    location="playa-del-carmen"
                    context="general"
                    variant="primary"
                    size="lg"
                    label={t('final_cta_button')}
                    locale={locale}
                />
            </div>
        </section>
    );
}
