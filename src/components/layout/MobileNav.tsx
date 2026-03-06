'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from '@/i18n/navigation';

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

    // The single toggle button — always floats above everything via inline z-index
    const toggleButton = (
        <button
            id="mobile-menu-button"
            aria-label={open
                ? (locale === 'es' ? 'Cerrar menú' : 'Close menu')
                : (locale === 'es' ? 'Abrir menú' : 'Open menu')}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden fixed flex items-center justify-center w-11 h-11 rounded-full"
            style={{
                // Matches header px-8 (32px) and h-20 center (80px / 2 - 22px = 18px)
                top: 18,
                right: 20,
                zIndex: 99999,
                background: open ? 'rgba(20,184,166,0.12)' : 'transparent',
                border: open ? '1px solid rgba(20,184,166,0.3)' : '1px solid transparent',
                transition: 'background 250ms ease, border-color 250ms ease',
            }}
        >
            <span className="relative w-5 h-[14px] flex flex-col justify-between">
                {/* Top bar: straight or top-arm of X */}
                <span
                    className="block w-full h-[2px] bg-white origin-center"
                    style={{
                        transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
                        transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
                    }}
                />
                {/* Middle bar: fades out */}
                <span
                    className="block w-full h-[2px] bg-white"
                    style={{
                        transition: 'opacity 200ms ease, transform 300ms ease',
                        opacity: open ? 0 : 1,
                        transform: open ? 'scaleX(0)' : 'none',
                    }}
                />
                {/* Bottom bar: straight or bottom-arm of X */}
                <span
                    className="block w-full h-[2px] bg-white origin-center"
                    style={{
                        transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
                        transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
                    }}
                />
            </span>
        </button>
    );

    const overlay = open && (
        <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label={locale === 'es' ? 'Menú de navegación' : 'Navigation menu'}
            className="fixed inset-0 flex flex-col px-8 overflow-y-auto"
            style={{ backgroundColor: '#080d0c', zIndex: 9999 }}
        >
            {/* Ambient glow top-right */}
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
                                href={href as '/'}
                                onClick={() => {
                                    setOpen(false);
                                    // First link is always "Inicio/Home" — scroll to top
                                    if (i === 0) {
                                        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50);
                                    }
                                }}
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
            {/* Spacer in header flow — keeps LanguageSwitcher from shifting right */}
            <div className="md:hidden w-11 h-11 shrink-0" aria-hidden="true" />

            {/* Toggle button rendered in portal so it's always above overlay */}
            {mounted && createPortal(toggleButton, document.body)}

            {/* Overlay in portal */}
            {mounted && createPortal(overlay, document.body)}
        </>
    );
}
