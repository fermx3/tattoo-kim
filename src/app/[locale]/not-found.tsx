import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { routing } from '@/i18n/routing';

export default function LocaleNotFound() {
    const t = useTranslations('not_found');

    return (
        <div className="flex items-center justify-center min-h-screen px-8">
            <div className="text-center">
                <p className="text-[#14b8a6] font-black uppercase tracking-[0.3em] text-xs mb-4">
                    404
                </p>
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-6 text-white">
                    {t('title')}
                </h1>
                <p className="text-slate-400 mb-10 font-light">{t('message')}</p>
                <Link
                    href="/"
                    className="inline-block border-b-2 border-[#14b8a6] text-white text-sm font-black uppercase tracking-widest hover:text-[#14b8a6] transition-colors pb-1"
                >
                    {t('back_home')}
                </Link>
            </div>
        </div>
    );
}

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}
