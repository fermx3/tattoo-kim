import { useId } from 'react';

interface GoogleStarsProps {
    rating: number;
    size?: 'sm' | 'md';
}

export default function GoogleStars({ rating, size = 'md' }: GoogleStarsProps) {
    const px = size === 'sm' ? 16 : 20;
    const id = useId();

    return (
        <div className="flex gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
            {[1, 2, 3, 4, 5].map((star) => {
                const fill = Math.min(1, Math.max(0, rating - (star - 1)));
                const gradientId = `${id}-star-${star}`;
                return (
                    <svg
                        key={star}
                        width={px}
                        height={px}
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                    >
                        <defs>
                            <linearGradient id={gradientId}>
                                <stop offset={`${fill * 100}%`} stopColor="#facc15" />
                                <stop offset={`${fill * 100}%`} stopColor="#3f3f46" />
                            </linearGradient>
                        </defs>
                        <path
                            d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.33L10 13.27l-4.77 2.45.91-5.33L2.27 6.62l5.34-.78L10 1z"
                            fill={`url(#${gradientId})`}
                        />
                    </svg>
                );
            })}
        </div>
    );
}
