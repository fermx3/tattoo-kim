'use client';

import { usePathname, useRouter } from 'next/navigation';

interface LanguageSwitcherProps {
    locale: 'es' | 'en';
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
    const pathname = usePathname();
    const router = useRouter();

    function switchLocale(nextLocale: 'es' | 'en') {
        if (nextLocale === locale) return;
        // Replace current locale prefix with target
        const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
        router.push(newPath);
    }

    return (
        <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest">
            <button
                onClick={() => switchLocale('es')}
                aria-label="Cambiar idioma a Español"
                className={`transition-colors ${locale === 'es'
                        ? 'text-[#14b8a6]'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
            >
                ES
            </button>
            <span className="text-slate-700">|</span>
            <button
                onClick={() => switchLocale('en')}
                aria-label="Switch language to English"
                className={`transition-colors ${locale === 'en'
                        ? 'text-[#14b8a6]'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
            >
                EN
            </button>
        </div>
    );
}
