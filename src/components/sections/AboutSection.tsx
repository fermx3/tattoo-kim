import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CTAButton from '@/components/ui/CTAButton';

interface StatProps {
    value: string;
    label: string;
}

function Stat({ value, label }: StatProps) {
    return (
        <div className="border-l-2 border-[#14b8a6] pl-4">
            <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
            <p className="text-slate-500 text-xs uppercase tracking-widest font-medium mt-1">{label}</p>
        </div>
    );
}

interface AboutSectionProps {
    googleScore?: number;
}

export default function AboutSection({ googleScore }: AboutSectionProps) {
    const t = useTranslations('home');

    return (
        <section className="py-32 bg-[#0d0d0d]">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Text column */}
                    <div>
                        <p className="text-[#14b8a6] font-black uppercase tracking-[0.35em] text-xs mb-6">
                            {t('about_label')}
                        </p>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight mb-8">
                            {t('about_title')}
                        </h2>

                        <div className="space-y-4 mb-10">
                            <p className="text-slate-400 font-light leading-relaxed">
                                {t('about_desc1')}
                            </p>
                            <p className="text-slate-400 font-light leading-relaxed">
                                {t('about_desc2')}
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-8 mb-12">
                            <Stat value={t('about_stat1_value')} label={t('about_stat1_label')} />
                            <Stat value={t('about_stat2_value')} label={t('about_stat2_label')} />
                            <Stat value={t('about_stat3_value')} label={t('about_stat3_label')} />
                            {googleScore && (
                                <Stat value={`${googleScore}★`} label={t('about_stat4_label')} />
                            )}
                        </div>

                        <CTAButton
                            location="playa-del-carmen"
                            context="general"
                            variant="primary"
                            size="md"
                            label={t('about_cta')}
                        />
                    </div>

                    {/* Image column */}
                    <div className="relative">
                        {/* Decorative frame */}
                        <div className="absolute -top-4 -right-4 w-full h-full border border-[#14b8a6]/20 z-0" />
                        <div className="relative z-10 overflow-hidden aspect-[4/5]">
                            <Image
                                src="/images/about-artist.jpg"
                                alt="Kim Tattoo artist at work"
                                fill
                                className="object-cover object-center"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            {/* Subtle overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d]/30 to-transparent" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
