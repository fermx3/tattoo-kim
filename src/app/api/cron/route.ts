import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { fetchAllGoogleReviews, combineRatings } from '@/lib/google-reviews';

export async function GET(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ ok: false }, { status: 401 });
    }

    try {
        // Invalidate the cached Google Places data for both locales
        revalidateTag('google-reviews-es', 'max');
        revalidateTag('google-reviews-en', 'max');

        // Warm the cache with fresh fetches for both languages
        const [locationsEs, locationsEn] = await Promise.all([
            fetchAllGoogleReviews('es'),
            fetchAllGoogleReviews('en'),
        ]);
        const combined = combineRatings(locationsEs);

        return NextResponse.json({
            ok: true,
            revalidatedAt: new Date().toISOString(),
            locations: locationsEs.length,
            locationsEn: locationsEn.length,
            score: combined.score,
            totalReviews: combined.totalReviews,
        });
    } catch (error) {
        console.error('Cron job failed:', error);
        return NextResponse.json(
            { ok: false, error: error instanceof Error ? error.message : 'Unknown error' },
            { status: 500 },
        );
    }
}