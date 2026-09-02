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
                {/* Sólo se precarga bold: es el peso que resuelve el <h1> del hero,
                    que es el elemento LCP. Precargar los tres competía por ancho de
                    banda en la ruta crítica (72 KB en prioridad alta) sin que
                    regular ni medium participen del primer render. Ambos siguen
                    cargando por @font-face con font-display: swap. */}
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
                {/* lazyOnload, no afterInteractive: gtag pesa 145 KB, el recurso más
                    grande de la página, y competía por el hilo principal durante la
                    carga. Google Ads se queda; sólo deja de estorbar al LCP. */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=AW-18008991723"
                    strategy="lazyOnload"
                />
                <Script id="google-ads" strategy="lazyOnload">
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
