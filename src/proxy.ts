import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except static files, Next.js internals, and API routes
    matcher: [
        '/',
        '/(es|en)/:path*',
        '/((?!_next|_vercel|api|.*\\..*).*)',
    ],
};
