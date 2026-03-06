'use client';

import { useParams } from 'next/navigation';
import { useRouter, usePathname } from '@/i18n/navigation';

interface LanguageSwitcherProps {
    locale: 'es' | 'en';
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useParams();

    function switchLocale(nextLocale: 'es' | 'en') {
        if (nextLocale === locale) return;
        // Extract dynamic params (slug, etc.) excluding locale
        const { locale: _locale, ...dynamicParams } = params;
        router.replace(
            // @ts-expect-error -- pathname is a valid localized route key
            { pathname, params: dynamicParams },
            { locale: nextLocale }
        );
    }

    return (
        <div className="flex items-center text-[10px] font-black uppercase tracking-widest">
            <button
                onClick={() => switchLocale('es')}
                aria-label="Cambiar idioma a Español"
                className={`px-3 py-3 transition-colors ${locale === 'es'
                    ? 'text-[#14b8a6]'
                    : 'text-slate-500 hover:text-slate-300'
                    }`}
            >
                ES
            </button>
            <span className="text-slate-700 select-none">|</span>
            <button
                onClick={() => switchLocale('en')}
                aria-label="Switch language to English"
                className={`px-3 py-3 transition-colors ${locale === 'en'
                    ? 'text-[#14b8a6]'
                    : 'text-slate-500 hover:text-slate-300'
                    }`}
            >
                EN
            </button>
        </div>
    );
}
