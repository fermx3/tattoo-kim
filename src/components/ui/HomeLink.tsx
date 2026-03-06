'use client';

import { Link, usePathname } from '@/i18n/navigation';
import type { ReactNode } from 'react';

interface HomeLinkProps {
    href: string;
    className?: string;
    'aria-label'?: string;
    children: ReactNode;
}

/**
 * Works like a normal Next.js Link, but if you're already
 * on the target page it smoothly scrolls to the top instead
 * of doing nothing.
 */
export default function HomeLink({ href, className, 'aria-label': ariaLabel, children }: HomeLinkProps) {
    const pathname = usePathname();

    function handleClick() {
        if (pathname === href) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    return (
        <Link href={href as '/'} className={className} aria-label={ariaLabel} onClick={handleClick}>
            {children}
        </Link>
    );
}
