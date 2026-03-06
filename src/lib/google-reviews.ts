import type { GoogleReviewData, GoogleLocationRating, CombinedGoogleRating } from '@/types';

const PLACE_IDS: Record<string, string | undefined> = {
    'playa-del-carmen': process.env.GOOGLE_PLACE_ID_PDC,
    cancun: process.env.GOOGLE_PLACE_ID_CUN,
};

const GOOGLE_PROFILE_URLS: Record<string, string> = {
    'playa-del-carmen': 'https://maps.app.goo.gl/Jptg6VLaGabGqM7a8',
    cancun: 'https://maps.app.goo.gl/EpnExGCyz9RiJgBK9',
};

const API_KEY = process.env.GOOGLE_PLACES_API_KEY;

const FALLBACK_DATA: Record<string, GoogleLocationRating[]> = {
    es: [
        {
            location: 'playa-del-carmen',
            score: 4.9,
            totalReviews: 127,
            reviews: [
                {
                    author: 'Valentina R.',
                    rating: 5,
                    text: 'Kim transformó mi idea en algo mucho más hermoso de lo que imaginé. El detalle y la dedicación son incomparables.',
                    date: '2025-01-15',
                },
                {
                    author: 'Diego M.',
                    rating: 5,
                    text: 'El ambiente del estudio te hace sentir seguro y en buenas manos desde el primer momento.',
                    date: '2025-02-10',
                },
                {
                    author: 'Sofía L.',
                    rating: 5,
                    text: 'Ya llevo tres tatuajes con Kim y cada vez supera al anterior. Es difícil ir a otro lugar.',
                    date: '2025-03-05',
                },
            ],
            profileUrl: GOOGLE_PROFILE_URLS['playa-del-carmen'],
        },
    ],
    en: [
        {
            location: 'playa-del-carmen',
            score: 4.9,
            totalReviews: 127,
            reviews: [
                {
                    author: 'Valentina R.',
                    rating: 5,
                    text: 'Kim turned my idea into something far more beautiful than I ever imagined. The detail and dedication are unmatched.',
                    date: '2025-01-15',
                },
                {
                    author: 'Diego M.',
                    rating: 5,
                    text: 'The studio atmosphere makes you feel safe and in good hands from the very first moment.',
                    date: '2025-02-10',
                },
                {
                    author: 'Sofía L.',
                    rating: 5,
                    text: "I already have three tattoos by Kim and each one surpasses the last. It's hard to go anywhere else.",
                    date: '2025-03-05',
                },
            ],
            profileUrl: GOOGLE_PROFILE_URLS['playa-del-carmen'],
        },
    ],
};

interface PlacesApiReview {
    authorAttribution?: {
        displayName?: string;
        uri?: string;
    };
    rating?: number;
    text?: { text?: string };
    relativePublishTimeDescription?: string;
    publishTime?: string;
}

interface PlacesApiResponse {
    rating?: number;
    userRatingCount?: number;
    reviews?: PlacesApiReview[];
}

function mapApiReview(review: PlacesApiReview): GoogleReviewData {
    return {
        author: review.authorAttribution?.displayName ?? 'Cliente',
        rating: review.rating ?? 5,
        text: review.text?.text ?? '',
        date: review.publishTime ?? '',
        profileUrl: review.authorAttribution?.uri,
    };
}

async function fetchLocationReviews(
    location: 'playa-del-carmen' | 'cancun',
    locale: string = 'es',
): Promise<GoogleLocationRating | null> {
    const placeId = PLACE_IDS[location];
    if (!placeId || !API_KEY) return null;

    const url = `https://places.googleapis.com/v1/places/${placeId}?languageCode=${locale}`;
    const res = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY,
            'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
        },
        next: { tags: [`google-reviews-${locale}`] },
    });

    if (!res.ok) {
        console.warn(`Google Places API error for ${location}: ${res.status}`);
        return null;
    }

    const data: PlacesApiResponse = await res.json();

    return {
        location,
        score: data.rating ?? 5,
        totalReviews: data.userRatingCount ?? 0,
        reviews: (data.reviews ?? [])
            .filter((r) => (r.rating ?? 0) >= 4 && r.text?.text)
            .slice(0, 5)
            .map(mapApiReview),
        profileUrl: GOOGLE_PROFILE_URLS[location],
    };
}

export async function fetchAllGoogleReviews(locale: string = 'es'): Promise<GoogleLocationRating[]> {
    const fallback = FALLBACK_DATA[locale] ?? FALLBACK_DATA.es;

    try {
        const results = await Promise.all([
            fetchLocationReviews('playa-del-carmen', locale),
            fetchLocationReviews('cancun', locale),
        ]);

        const valid = results.filter(
            (r): r is GoogleLocationRating => r !== null && r.reviews.length > 0,
        );

        return valid.length > 0 ? valid : fallback;
    } catch (error) {
        console.warn('Google Reviews fetch failed, using fallback:', error);
        return fallback;
    }
}

export function combineRatings(locations: GoogleLocationRating[]): CombinedGoogleRating {
    if (locations.length === 0) {
        return { score: 4.9, totalReviews: 127, reviews: [] };
    }

    const totalReviews = locations.reduce((sum, l) => sum + l.totalReviews, 0);
    const weightedScore =
        locations.reduce((sum, l) => sum + l.score * l.totalReviews, 0) / totalReviews;

    const reviews = locations.flatMap((l) => l.reviews);

    return {
        score: Math.round(weightedScore * 10) / 10,
        totalReviews,
        reviews,
    };
}
