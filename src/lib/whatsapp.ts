import { WHATSAPP_NUMBERS } from '@/lib/constants';

type WhatsAppContext =
    | 'general'
    | 'tattoo'
    | 'tattoo-quote'
    | 'piercing'
    | 'piercing-appointment'
    | { artist: string };

type LocationSlug = 'playa-del-carmen' | 'cancun';

const MESSAGES: Record<string, string> = {
    general:
        'Hola! Me gustaría obtener más información sobre el estudio Tattoo Kim.',
    tattoo:
        'Hola! Me gustaría solicitar una cotización para un tatuaje.',
    'tattoo-quote':
        'Hola! Me gustaría solicitar una cotización para un tatuaje.',
    piercing:
        'Hola! Me gustaría agendar una cita para un piercing.',
    'piercing-appointment':
        'Hola! Me gustaría agendar una cita para un piercing.',
};

export function buildWhatsAppUrl(
    location: LocationSlug,
    context: WhatsAppContext = 'general'
): string {
    const phone = WHATSAPP_NUMBERS[location];

    let message: string;
    if (typeof context === 'object' && 'artist' in context) {
        message = `Hola! Me gustaría agendar una cita con ${context.artist}.`;
    } else {
        message = MESSAGES[context] ?? MESSAGES.general;
    }

    const encoded = encodeURIComponent(message);
    return `https://wa.me/${phone}?text=${encoded}`;
}
