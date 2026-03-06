import { WHATSAPP_NUMBERS } from '@/lib/constants';

type WhatsAppContext =
    | 'general'
    | 'tattoo'
    | 'piercing'
    | { artist: string };

type LocationSlug = 'playa-del-carmen' | 'cancun';

const MESSAGES: Record<string, Record<string, string>> = {
    es: {
        general:
            'Hola! Me gustaría obtener más información sobre el estudio Tattoo Kim.',
        tattoo:
            'Hola! Me gustaría solicitar una cotización para un tatuaje.',
        piercing:
            'Hola! Me gustaría agendar una cita para un piercing.',
    },
    en: {
        general:
            "Hi! I'd like to get more information about Tattoo Kim studio.",
        tattoo:
            "Hi! I'd like to request a quote for a tattoo.",
        piercing:
            "Hi! I'd like to book an appointment for a piercing.",
    },
};

function buildArtistMessage(name: string, locale: string): string {
    return locale === 'en'
        ? `Hi! I'd like to book an appointment with ${name}.`
        : `Hola! Me gustaría agendar una cita con ${name}.`;
}

export function buildWhatsAppUrl(
    location: LocationSlug,
    context: WhatsAppContext = 'general',
    locale: string = 'es'
): string {
    const phone = WHATSAPP_NUMBERS[location];
    const msgs = MESSAGES[locale] ?? MESSAGES.es;

    let message: string;
    if (typeof context === 'object' && 'artist' in context) {
        message = buildArtistMessage(context.artist, locale);
    } else {
        message = msgs[context] ?? msgs.general;
    }

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encoded}`;
}
