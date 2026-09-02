import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { routing } from '@/i18n/routing';

type Props = {
    searchParams: Promise<{ originalUrl?: string }>;
};

export default async function NotAvailablePage({ searchParams }: Props) {
    const { originalUrl } = await searchParams;
    const t = await getTranslations('translation_unavailable');

    return (
        <div className="flex items-center justify-center min-h-screen px-8">
            <div className="text-center max-w-md">

                {/* Icon */}
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 border border-[#14b8a6]/30 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-7 h-7 text-[#14b8a6]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 6.062 14 7.7 14 9.5c0 1.856-.851 3.53-2.197 4.656m-4.137 2.332A9.03 9.03 0 0 1 3.75 12c0-2.45.979-4.675 2.566-6.284"
                            />
                        </svg>
                    </div>
                </div>

                {/* Label */}
                <p className="text-[#14b8a6] font-black uppercase tracking-[0.3em] text-xs mb-4">
                    i18n
                </p>

                {/* Title */}
                <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-6 text-white leading-tight">
                    {t('title')}
                </h1>

                {/* Message */}
                <p className="text-slate-400 mb-10 font-light leading-relaxed">
                    {t('message')}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    {originalUrl && (
                        <a
                            href={originalUrl}
                            className="inline-block bg-[#14b8a6] text-black px-8 py-4 text-sm font-black uppercase tracking-widest hover:bg-white transition-colors"
                        >
                            {t('read_original')}
                        </a>
                    )}
                    <Link
                        href="/blog"
                        className="inline-block border-b-2 border-[#14b8a6] text-white text-sm font-black uppercase tracking-widest hover:text-[#14b8a6] transition-colors pb-1"
                    >
                        {t('back_to_blog')}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}
