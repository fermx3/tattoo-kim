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
                className="max-w-[1920px] mx-auto px-8 h-20 flex items-center justify-between"
                aria-label="Main navigation"
            >
                {/* Logo */}
                <HomeLink
                    href={`/${locale}`}
                    className="flex items-center gap-3 group"
                    aria-label="Kim Tattoo — Inicio"
                >
                    <div className="size-9 bg-[#134e4a] rounded flex items-center justify-center ring-1 ring-white/10 shrink-0">
                        <span className="text-[10px] font-black text-white">KT</span>
                    </div>
                    <span className="text-lg font-black tracking-tighter text-white uppercase">
                        Kim Tattoo
                    </span>
                </HomeLink>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-10">
                    {links.map(({ href, label }) => (
                        <Link
                            key={href}
                            href={href}
                            className="text-[10px] uppercase tracking-widest text-slate-400 hover:text-[#14b8a6] transition-colors font-black"
                        >
                            {label}
                        </Link>
                    ))}
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
