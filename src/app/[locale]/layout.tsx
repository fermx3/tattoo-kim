import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
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

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as 'es' | 'en')) {
        notFound();
    }

    setRequestLocale(locale);

    const messages = await getMessages();

    return (
        <NextIntlClientProvider messages={messages}>
            <Header locale={locale as 'es' | 'en'} />
            {children}
            <Footer locale={locale as 'es' | 'en'} />
            <WhatsAppButton location="playa-del-carmen" variant="floating" locale={locale} />
        </NextIntlClientProvider>
    );
}
