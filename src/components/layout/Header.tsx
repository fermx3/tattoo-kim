import Image from 'next/image';
import Link from 'next/link';
import HomeLink from '@/components/ui/HomeLink';
import LanguageSwitcher from './LanguageSwitcher';
import MobileNav from './MobileNav';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

interface HeaderProps {
    locale: 'es' | 'en';
}

const navLinks = {
    es: [
        { href: '/es', label: 'Inicio' },
        { href: '/es/artistas', label: 'Artistas' },
        { href: '/es/servicios/tatuajes', label: 'Tatuajes' },
        { href: '/es/servicios/piercings', label: 'Piercings' },
        { href: '/es/ubicaciones/playa-del-carmen', label: 'Ubicaciones' },
        { href: '/es/blog', label: 'Blog' },
    ],
    en: [
        { href: '/en', label: 'Home' },
        { href: '/en/artists', label: 'Artists' },
        { href: '/en/services/tattoos', label: 'Tattoos' },
        { href: '/en/services/piercings', label: 'Piercings' },
        { href: '/en/locations/playa-del-carmen', label: 'Locations' },
        { href: '/en/blog', label: 'Blog' },
    ],
};

const ctaLabel = { es: 'Agenda tu Cita', en: 'Book Appointment' };

export default function Header({ locale }: HeaderProps) {
    const links = navLinks[locale];

    return (
        <header className="fixed top-0 w-full z-50 bg-[#121212]/90 backdrop-blur-xl border-b border-white/5">
            <nav
                className="max-w-[1920px] mx-auto px-8 h-20 md:h-28 flex items-center justify-between"
                aria-label="Main navigation"
            >
                {/* Logo */}
                <HomeLink
                    href={`/${locale}`}
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
                    {links.map(({ href, label }, i) => {
                        const NavLink = i === 0 ? HomeLink : Link;
                        return (
                            <NavLink
                                key={href}
                                href={href}
                                className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-[#14b8a6] transition-colors font-black"
                            >
                                {label}
                            </NavLink>
                        );
                    })}
                </div>

                {/* Right side: Language switcher + CTA + Mobile trigger */}
                <div className="flex items-center gap-6">
                    <LanguageSwitcher locale={locale} />
                    <a
                        href={buildWhatsAppUrl('playa-del-carmen', 'general')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:inline-block bg-[#134e4a] text-white px-6 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-[#14b8a6] transition-all"
                    >
                        {ctaLabel[locale]}
                    </a>
                    <MobileNav links={links} locale={locale} />
                </div>
            </nav>
        </header>
    );
}
