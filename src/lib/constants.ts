import type { StudioLocation } from '@/types';

// ─── WhatsApp ────────────────────────────────────────────────────────────────
// TODO: Replace with real phone numbers (international format, no spaces or dashes)
export const WHATSAPP_NUMBERS = {
    'playa-del-carmen': '521XXXXXXXXXX', // +52 1 XXX XXX XXXX
    cancun: '521XXXXXXXXXX',             // +52 1 XXX XXX XXXX
} as const;

// ─── Social ──────────────────────────────────────────────────────────────────
export const INSTAGRAM_URL = 'https://instagram.com/tattookim_studio'; // TODO: confirm handle

// ─── Site ────────────────────────────────────────────────────────────────────
export const SITE_NAME = 'Tattoo Kim';
export const SITE_URL = 'https://www.tattookim.com.mx';
export const DEFAULT_LOCALE = 'es';

// ─── Locations ───────────────────────────────────────────────────────────────
export const LOCATIONS: StudioLocation[] = [
    {
        slug: 'playa-del-carmen',
        name: 'Playa del Carmen',
        address: 'Av 30 Esquina Calle 72, Colonia Gonzalo Guerrero, Playa del Carmen, Q.R.',
        phone: WHATSAPP_NUMBERS['playa-del-carmen'],
        mapUrl: 'https://maps.google.com/?q=Av+30+Calle+72+Playa+del+Carmen', // TODO: confirm coordinates
        hours: {
            weekdays: '11:00 - 20:00',
            saturday: '10:00 - 18:00',
            sunday: 'Cerrado',
        },
        coords: {
            lat: 20.6296, // TODO: confirm
            lng: -87.0739,
        },
    },
    {
        slug: 'cancun',
        name: 'Cancún',
        address: 'TODO: Agregar dirección de Cancún',
        phone: WHATSAPP_NUMBERS.cancun,
        mapUrl: 'https://maps.google.com/?q=Cancun', // TODO: confirm
        hours: {
            weekdays: 'TODO',
            saturday: 'TODO',
            sunday: 'TODO',
        },
        coords: {
            lat: 21.1619, // TODO: confirm
            lng: -86.8515,
        },
    },
];
