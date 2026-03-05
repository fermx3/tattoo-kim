import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { fetchAllGoogleReviews, combineRatings } from '@/lib/google-reviews';

export async function GET(req: Request) {
    if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ ok: false }, { status: 401 });
    }

    try {
        // Invalidate the cached Google Places data
        revalidateTag('google-reviews', 'max');

        // Warm the cache with a fresh fetch
        const locations = await fetchAllGoogleReviews();
        const combined = combineRatings(locations);

        return NextResponse.json({
            ok: true,
            revalidatedAt: new Date().toISOString(),
            locations: locations.length,
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