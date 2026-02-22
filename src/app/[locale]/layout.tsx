import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/whatsapp/WhatsAppButton';

type Props = {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as 'es' | 'en')) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className="antialiased bg-[#121212] text-white">
                <NextIntlClientProvider messages={messages}>
                    <Header locale={locale as 'es' | 'en'} />
                    <main>{children}</main>
                    <Footer locale={locale as 'es' | 'en'} />
                    <WhatsAppButton location="playa-del-carmen" variant="floating" />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
