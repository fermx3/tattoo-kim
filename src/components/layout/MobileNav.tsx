'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';

interface MobileNavProps {
    links: { href: string; label: string }[];
    locale: 'es' | 'en';
}

export default function MobileNav({ links, locale }: MobileNavProps) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [open]);

    const overlay = open && (
        <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={locale === 'es' ? 'Menú de navegación' : 'Navigation menu'}
            className="fixed inset-0 flex flex-col px-8 overflow-y-auto"
            style={{ backgroundColor: '#080d0c', zIndex: 9999 }}
        >
            {/* Close button — inside portal, always on top */}
            <button
                aria-label={locale === 'es' ? 'Cerrar menú' : 'Close menu'}
                onClick={() => setOpen(false)}
                className="fixed top-5 right-5 flex items-center justify-center w-10 h-10 rounded-full"
                style={{ zIndex: 10001, color: '#ffffff', background: 'rgba(255,255,255,0.08)' }}
            >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>

            {/* Ambient glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none fixed top-0 right-0"
                style={{
                    width: 280,
                    height: 280,
                    zIndex: 10000,
                    background: 'radial-gradient(circle at 100% 0%, rgba(20,184,166,0.2) 0%, transparent 65%)',
                }}
            />

            {/* Space below header */}
            <div style={{ height: 100 }} aria-hidden="true" />

            {/* Teal rule */}
            <div
                aria-hidden="true"
                style={{ width: 32, height: 1, backgroundColor: '#14b8a6', marginBottom: 32 }}
            />

            {/* Links */}
            <nav>
                <ul role="list" className="flex flex-col">
                    {links.map(({ href, label }, i) => (
                        <li
                            key={href}
                            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
                        >
                            <Link
                                href={href}
                                onClick={() => setOpen(false)}
                                className="group flex items-center gap-5 py-5 w-full"
                            >
                                <span
                                    aria-hidden="true"
                                    className="text-[10px] font-black tabular-nums shrink-0"
                                    style={{ color: '#14b8a6', minWidth: 20 }}
                                >
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span
                                    className="text-[1.85rem] font-black uppercase tracking-tight leading-none"
                                    style={{ color: '#ffffff' }}
                                >
                                    {label}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Bottom brand */}
            <p
                aria-hidden="true"
                className="mt-auto pb-10 text-[9px] font-black uppercase tracking-[0.22em]"
                style={{ color: 'rgba(255,255,255,0.18)' }}
            >
                Kim Tattoo — Est. 2014
            </p>
        </div>
    );

    return (
        <>
            {/* Hamburger — stays in header */}
            <button
                id="mobile-menu-button"
                aria-label={locale === 'es' ? 'Abrir menú' : 'Open menu'}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => setOpen((v) => !v)}
                className="md:hidden relative flex flex-col gap-[5px] p-2"
                style={{ zIndex: 99999 }}
            >
                <span className="block w-6 h-[2px] bg-white transition-all duration-300 origin-center"
                    style={{ transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
                <span className="block w-6 h-[2px] bg-white transition-all duration-300"
                    style={{ opacity: open ? 0 : 1 }} />
                <span className="block w-6 h-[2px] bg-white transition-all duration-300 origin-center"
                    style={{ transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>

            {/* Overlay rendered at body level via portal — escapes header stacking context */}
            {mounted && createPortal(overlay, document.body)}
        </>
    );
}
