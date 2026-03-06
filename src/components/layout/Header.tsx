import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import HomeLink from '@/components/ui/HomeLink';
import LanguageSwitcher from './LanguageSwitcher';
import MobileNav from './MobileNav';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface HeaderProps {
    locale: 'es' | 'en';
}

const navLinks = [
    { href: '/' as const, label: { es: 'Inicio', en: 'Home' } },
    { href: '/artistas' as const, label: { es: 'Artistas', en: 'Artists' } },
    { href: '/servicios/tatuajes' as const, label: { es: 'Tatuajes', en: 'Tattoos' } },
    { href: '/servicios/piercings' as const, label: { es: 'Piercings', en: 'Piercings' } },
    { href: '/ubicaciones/playa-del-carmen' as const, label: { es: 'Ubicaciones', en: 'Locations' } },
    { href: '/blog' as const, label: { es: 'Blog', en: 'Blog' } },
];

const ctaLabel = { es: 'Agenda tu Cita', en: 'Book Appointment' };

export default function Header({ locale }: HeaderProps) {
    const resolvedLinks = navLinks.map((link) => ({
        href: link.href,
        label: link.label[locale],
    }));

    return (
        <header className="fixed top-0 w-full z-50 bg-[#121212]/90 backdrop-blur-xl border-b border-white/5">
            <nav
                className="max-w-[1920px] mx-auto px-8 h-20 md:h-28 flex items-center justify-between"
                aria-label="Main navigation"
            >
                {/* Logo */}
                <HomeLink
                    href="/"
                    className="shrink-0"
                    aria-label="Kim Tattoo — Inicio"
                >
                    <Image
                        src="/images/logo-white.svg"
                        alt="Kim Tattoo"
                        width={160}
                        height={56}
                        className="h-10 md:h-14 w-auto"
                        priority
                    />
                </HomeLink>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-10">
                    {resolvedLinks.map(({ href, label }, i) => {
                        if (i === 0) {
                            return (
                                <HomeLink
                                    key={href}
                                    href={href}
                                    className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-[#14b8a6] transition-colors font-black"
                                >
                                    {label}
                                </HomeLink>
                            );
                        }
                        return (
                            <Link
                                key={href}
                                href={href}
                                className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-[#14b8a6] transition-colors font-black"
                            >
                                {label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right side: Language switcher + CTA + Mobile trigger */}
                <div className="flex items-center gap-6">
                    <LanguageSwitcher locale={locale} />
                    <a
                        href={buildWhatsAppUrl('playa-del-carmen', 'general', locale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:inline-block bg-[#134e4a] text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#14b8a6] transition-all"
                    >
                        {ctaLabel[locale]}
                    </a>
                    <MobileNav links={resolvedLinks} locale={locale} />
                </div>
            </nav>
        </header>
    );
}
