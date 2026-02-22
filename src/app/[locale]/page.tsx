import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import LocationsSection from '@/components/sections/LocationsSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import FinalCTASection from '@/components/sections/FinalCTASection';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'home' });

    return {
        title: locale === 'es'
            ? 'Tattoo Kim | Arte en la Piel — Playa del Carmen & Cancún'
            : 'Tattoo Kim | Art on Skin — Playa del Carmen & Cancún',
        description: t('hero_subtitle'),
    };
}

export default function HomePage() {
    return (
        <>
            <HeroSection />
            <ServicesSection />
            <AboutSection />
            <LocationsSection />
            <TestimonialSection />
            <FinalCTASection />
        </>
    );
}
