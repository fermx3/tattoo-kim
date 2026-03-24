import type { Metadata } from 'next';
import Script from 'next/script';
import { getLocale } from 'next-intl/server';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Tattoo Kim',
    default: 'Tattoo Kim | Arte en la Piel — Playa del Carmen & Cancún',
  },
  description:
    'Estudio profesional de tatuajes y piercings en Playa del Carmen y Cancún. Arte personalizado, higiene total.',
  metadataBase: new URL('https://www.tattookim.com.mx'),
  openGraph: {
    type: 'website',
    siteName: 'Tattoo Kim',
    locale: 'es_MX',
    images: [
      {
        url: '/images/og/default.webp',
        width: 1200,
        height: 630,
        alt: 'Kim Tattoo — Studio Tattoo & Piercing en Playa del Carmen y Cancún',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

type Props = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: Props) {
  const locale = await getLocale();

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
        {children}
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
