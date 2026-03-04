import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import LocationsSection from '@/components/sections/LocationsSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import { fetchAllGoogleReviews, combineRatings } from '@/lib/google-reviews';

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

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const googleData = await fetchAllGoogleReviews();
    const combined = combineRatings(googleData);
    const profileUrl = googleData[0]?.profileUrl ?? 'https://maps.app.goo.gl/Jptg6VLaGabGqM7a8';

    return (
        <>
            <HeroSection googleRating={combined} profileUrl={profileUrl} />
            <TestimonialSection reviews={googleData} combined={combined} profileUrl={profileUrl} />
            <ServicesSection />
            <AboutSection googleScore={combined.score} />
            <LocationsSection />
            <FinalCTASection />
        </>
    );
}
