import type { Metadata } from 'next';
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
  },
  twitter: {
    card: 'summary_large_image',
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  return (
    <html lang={locale ?? 'es'} suppressHydrationWarning>
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
      <body className="antialiased bg-[#121212] text-white">{children}</body>
    </html>
  );
}
