import { useTranslations } from 'next-intl';
import GoogleStars from '@/components/ui/GoogleStars';
import GoogleReviewCard from '@/components/ui/GoogleReviewCard';
import type { GoogleLocationRating, CombinedGoogleRating } from '@/types';

interface TestimonialSectionProps {
    reviews: GoogleLocationRating[];
    combined: CombinedGoogleRating;
    profileUrl: string;
}

export default function TestimonialSection({ reviews, combined, profileUrl }: TestimonialSectionProps) {
    const t = useTranslations('home');

    return (
        <section className="py-32 bg-[#0d0d0d]">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                {/* Header */}
                <div className="text-center mb-4">
                    <p className="text-[#14b8a6] font-black uppercase tracking-[0.35em] text-xs mb-4">
                        {t('google_label')}
                    </p>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
                        {t('google_title')}
                    </h2>
                </div>

                {/* Divider */}
                <div className="flex justify-center my-12">
                    <div className="w-16 h-[1px] bg-[#14b8a6]/40" />
                </div>

                {/* Combined rating summary */}
                <div className="flex flex-col items-center gap-3 mb-16">
                    <div className="flex items-center gap-3">
                        <span className="text-5xl font-black text-white">{combined.score}</span>
                        <GoogleStars rating={combined.score} size="md" />
                    </div>
                    <p className="text-slate-400 text-sm">
                        {t('google_based_on', { count: combined.totalReviews })}
                    </p>
                </div>

                {/* Review cards grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {combined.reviews.map((review, i) => (
                        <GoogleReviewCard key={i} review={review} />
                    ))}
                </div>

                {/* See all link */}
                <div className="text-center mt-12">
                    <a
                        href={profileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[#14b8a6] font-black uppercase tracking-widest text-xs hover:text-white transition-colors duration-300"
                    >
                        {t('google_see_all')}
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            <path d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
}
