import { getTranslations, setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import LocationsSection from '@/components/sections/LocationsSection';
import FinalCTASection from '@/components/sections/FinalCTASection';
import JsonLd from '@/components/ui/JsonLd';
import { fetchAllGoogleReviews, combineRatings } from '@/lib/google-reviews';
import { buildAlternates } from '@/lib/seo';
import { buildLocalBusinessJsonLd, buildBreadcrumbJsonLd } from '@/lib/jsonld';
import { LOCATIONS, SITE_URL } from '@/lib/constants';

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
        alternates: buildAlternates(locale, '', ''),
        openGraph: {
            title: locale === 'es'
                ? 'Tattoo Kim | Arte en la Piel'
                : 'Tattoo Kim | Art on Skin',
            description: t('hero_subtitle'),
            images: [{ url: `${SITE_URL}/images/hero-brand.webp` }],
        },
    };
}

export default async function HomePage({ params }: Props) {
    const { locale } = await params;
    setRequestLocale(locale);

    const googleData = await fetchAllGoogleReviews();
    const combined = combineRatings(googleData);
    const profileUrl = googleData[0]?.profileUrl ?? 'https://maps.app.goo.gl/Jptg6VLaGabGqM7a8';

    const jsonLdData = [
        ...LOCATIONS.map((loc) => buildLocalBusinessJsonLd(loc, locale)),
        buildBreadcrumbJsonLd([{ name: 'Tattoo Kim', url: `${SITE_URL}/${locale}` }]),
    ];

    return (
        <>
            <JsonLd data={jsonLdData} />
            <HeroSection googleRating={combined} profileUrl={profileUrl} />
            <TestimonialSection reviews={googleData} combined={combined} profileUrl={profileUrl} />
            <ServicesSection />
            <AboutSection googleScore={combined.score} />
            <LocationsSection />
            <FinalCTASection />
        </>
    );
}
