'use client';

import { useState } from 'react';
import Link from 'next/link';

interface MobileNavProps {
    links: { href: string; label: string }[];
    locale: 'es' | 'en';
}

export default function MobileNav({ links, locale }: MobileNavProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Hamburger button */}
            <button
                id="mobile-menu-button"
                aria-label={locale === 'es' ? 'Abrir menú' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className="md:hidden flex flex-col gap-[5px] p-2 group"
            >
                <span
                    className={`block w-6 h-[2px] bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-[7px]' : ''}`}
                />
                <span
                    className={`block w-6 h-[2px] bg-white transition-all duration-300 ${open ? 'opacity-0' : ''}`}
                />
                <span
                    className={`block w-6 h-[2px] bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-[7px]' : ''}`}
                />
            </button>

            {/* Mobile menu overlay */}
            <div
                id="mobile-menu"
                role="dialog"
                aria-label={locale === 'es' ? 'Menú de navegación' : 'Navigation menu'}
                className={`fixed inset-0 z-40 bg-[#121212] flex flex-col items-center justify-center gap-10 transition-all duration-300 md:hidden ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {links.map(({ href, label }) => (
                    <Link
                        key={href}
                        href={href}
                        onClick={() => setOpen(false)}
                        className="text-2xl font-black uppercase tracking-widest text-white hover:text-[#14b8a6] transition-colors"
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </>
    );
}
