import { useTranslations } from "next-intl";
import { buildWhatsAppUrl } from '@/lib/whatsapp';

// Homepage placeholder — Phase 5 will replace this with the real homepage
export default function HomePage() {
    const t = useTranslations('home');

    return (
        <section className="relative h-screen flex items-center justify-start overflow-hidden">
            {/* Background gradient placeholder */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#121212] via-[#121212]/80 to-transparent" />

            <div className="relative z-10 w-full max-w-7xl px-8 lg:px-20">
                <div className="max-w-2xl">
                    <h1 className="text-6xl md:text-9xl font-black text-white mb-6 leading-[0.9] uppercase tracking-tighter">
                        Kim Tattoo:<br />
                        <span className="text-[#14b8a6]">Arte en la Piel</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-400 mb-12 font-light leading-relaxed">
                        {t('hero_subtitle')}
                    </p>
                    <a
                        href={buildWhatsAppUrl('playa-del-carmen', 'general')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-white text-[#121212] px-12 py-5 text-sm font-black uppercase tracking-widest hover:bg-[#14b8a6] hover:text-white transition-all"
                    >
                        {t('hero_cta')}
                    </a>
                </div>
            </div>
        </section>
    );
}
