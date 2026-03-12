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
            score: 5,
            totalReviews: 390,
            reviews: [
                {
                    author: 'Gustavo Lira Alejando',
                    rating: 5,
                    text: 'Alejandro me atendió súper, la neta ni me dolió, fue bastante rápido y muy buen trabajo, ya quedé que regreso por otros trabajitos que tengo en mente! RECOMENDADO 100%',
                    date: '2026-01-13',
                },
                {
                    author: 'Carlos eduardo Alejandro',
                    rating: 5,
                    text: 'Muchas gracias por mi tatuaje, el servicio impecable y gran atención de parte de Erick, recomendado!!',
                    date: '2025-11-23',
                },
                {
                    author: 'Ricardo',
                    rating: 5,
                    text: 'Súper recomendable, fui a hacerme un Micro dermal facial, con Tammy y me trato de la mejor manera posible, todo limpio e higiénico, amable y me explico todo el proceso con calma, la atención y el procedimiento realizado 1000/10, definitivamente volveré por otro piercing próximamente!',
                    date: '2026-01-27',
                },
            ],
            profileUrl: GOOGLE_PROFILE_URLS['playa-del-carmen'],
        },
        {
            location: 'cancun',
            score: 5,
            totalReviews: 15,
            reviews: [
                {
                    author: 'Nallely Cortez',
                    rating: 5,
                    text: 'Muy a gusto y ameno el estudio, los trabajos excelentes ✨',
                    date: '2026-03-07',
                },
                {
                    author: 'Mariel BP',
                    rating: 5,
                    text: 'Excelente trato, higiene, profesionalismo de los chicos recomendado!!',
                    date: '2026-03-09',
                },
                {
                    author: 'Vianney Alvarez',
                    rating: 5,
                    text: 'Excelente lugar, seguro y buen trato. Erick quien realiza las perforaciones, muy profesional para realizar su trabajo',
                    date: '2026-03-08',
                },
            ],
            profileUrl: GOOGLE_PROFILE_URLS.cancun,
        },
    ],
    en: [
        {
            location: 'playa-del-carmen',
            score: 5,
            totalReviews: 390,
            reviews: [
                {
                    author: 'Tiana Carter',
                    rating: 5,
                    text: 'Best tattoo shop in Mexico!! My family went and got tattoos!! It was my son\u2019s first tattoo! And they had so much patience with him and were so kind.',
                    date: '2025-12-26',
                },
                {
                    author: 'Pamela Martin',
                    rating: 5,
                    text: 'Alejandro is AMAZING\u2026a true artist!!!! He transformed my and my husband\u2019s visions for our tattoos into MASTERPIECES. Shop was clean and everything used was sterile.',
                    date: '2025-12-09',
                },
                {
                    author: 'Klara Schmidt',
                    rating: 5,
                    text: 'We had an amazing experience here at Tattoo Kim! We messaged Monserrat and one day later we got an appointment where we talked about designs and a day later we got tattooed. She answered all my questions and overall it felt really professional.',
                    date: '2025-01-12',
                },
            ],
            profileUrl: GOOGLE_PROFILE_URLS['playa-del-carmen'],
        },
        {
            location: 'cancun',
            score: 5,
            totalReviews: 15,
            reviews: [
                {
                    author: 'pascal thibault-desparois',
                    rating: 5,
                    text: 'I had a awesome time with Alessandro, I just walk-in and he took me in. Ask good question for my idea and really good on the line work. Highly recommended!',
                    date: '2026-03-09',
                },
                {
                    author: 'Fabio Bacchetti',
                    rating: 5,
                    text: 'The last day of my holiday in Cancun I decided to make my a tattoo and I couldn\'t do a better choice. I really appreciate the tattoo and the kind of work of the guys. Highly recommend',
                    date: '2026-03-06',
                },
                {
                    author: 'Nallely Cortez',
                    rating: 5,
                    text: 'The study was very pleasant and enjoyable, the work was excellent ✨',
                    date: '2026-03-07',
                },
            ],
            profileUrl: GOOGLE_PROFILE_URLS.cancun,
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
        return { score: 5, totalReviews: 405, reviews: [] };
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
