import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/whatsapp/WhatsAppButton';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

// Emite el documento completo. Vive aquí y no en el root layout porque este
// segmento sí recibe el locale por params: permite un <html lang> correcto por
// idioma sin leer la request, que es lo que mantiene el prerender estático.
export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as 'es' | 'en')) {
        notFound();
    }

    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <head>
                <link
                    rel="preload"
                    href="/fonts/inter-regular.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/inter-medium.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/inter-bold.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
            </head>
            <body className="antialiased bg-[#121212] text-white">
                <NextIntlClientProvider messages={messages}>
                    <Header locale={locale as 'es' | 'en'} />
                    {children}
                    <Footer locale={locale as 'es' | 'en'} />
                    <WhatsAppButton location="playa-del-carmen" variant="floating" locale={locale} />
                </NextIntlClientProvider>
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=AW-18008991723"
                    strategy="afterInteractive"
                />
                <Script id="google-ads" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18008991723');
          `}
                </Script>
            </body>
        </html>
    );
}
