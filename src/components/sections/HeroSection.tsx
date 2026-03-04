import Image from 'next/image';
import { useTranslations } from 'next-intl';
import CTAButton from '@/components/ui/CTAButton';
import GoogleRatingBadge from '@/components/ui/GoogleRatingBadge';
import type { CombinedGoogleRating } from '@/types';

interface HeroSectionProps {
    googleRating: CombinedGoogleRating;
    profileUrl: string;
}

export default function HeroSection({ googleRating, profileUrl }: HeroSectionProps) {
    const t = useTranslations('home');

    return (
        <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
            {/* Background image */}
            <Image
                src="/images/hero-brand.jpg"
                alt="Kim Tattoo Studio"
                fill
                className="object-cover object-center scale-[1.02] opacity-90"
                priority
                sizes="100vw"
            />
            {/* Gradient overlays to handle the white/dark split and ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-[#121212]/90" />
            <div className="absolute inset-0 bg-[#121212]/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-16 flex justify-end">
                <div className="max-w-2xl text-right flex flex-col items-end">
                    {/* Studio label */}
                    <p className="text-[#14b8a6] font-black uppercase tracking-[0.35em] text-xs mb-6">
                        Kim Tattoo Studio
                    </p>

                    {/* Title */}
                    <h1 className="text-6xl md:text-[6rem] lg:text-[7.5rem] font-black text-white mb-6 leading-[0.88] uppercase tracking-tighter">
                        {t('hero_title')}
                    </h1>

                    {/* Accent line */}
                    <div className="w-16 h-[2px] bg-[#14b8a6] mb-8" />

                    {/* Subtitle */}
                    <p className="text-lg text-slate-300 mb-6 font-light leading-relaxed max-w-lg">
                        {t('hero_subtitle')}
                    </p>

                    {/* Google Rating Badge */}
                    <div className="mb-12">
                        <GoogleRatingBadge rating={googleRating} profileUrl={profileUrl} />
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 items-end">
                        <CTAButton
                            location="playa-del-carmen"
                            context="general"
                            variant="primary"
                            size="lg"
                            label={t('hero_cta')}
                        />
                        <CTAButton
                            location="playa-del-carmen"
                            context="general"
                            variant="secondary"
                            size="lg"
                            label={t('hero_secondary_cta')}
                        />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                <div className="w-[1px] h-12 bg-white animate-pulse" />
            </div>
        </section>
    );
}
