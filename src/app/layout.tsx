import type { Metadata } from 'next';
import '@/styles/globals.css';

// Este layout NO renderiza <html>/<body> a propósito.
//
// El root layout vive fuera de [locale], así que no recibe params y no puede
// conocer el idioma sin leer la request. Cuando lo hacía (await getLocale()),
// envolvía todas las rutas en render dinámico y el sitio no prerenderizaba ni
// una página. El <html lang> ahora lo emite src/app/[locale]/layout.tsx, que
// recibe el locale por params y se mantiene estático.
//
// Las rutas que cuelgan directamente de aquí emiten su propio <html>:
// not-found.tsx. page.tsx sólo hace redirect('/es'), nunca renderiza markup.

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

export default function RootLayout({ children }: Props) {
  return children;
}
