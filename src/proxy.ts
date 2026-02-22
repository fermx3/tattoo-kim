import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except static files and Next.js internals
    matcher: [
        '/',
        '/(es|en)/:path*',
        '/((?!_next|_vercel|.*\\..*).*)',
    ],
};
