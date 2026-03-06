import type { StudioLocation } from '@/types';

// ─── WhatsApp ────────────────────────────────────────────────────────────────
export const WHATSAPP_NUMBERS = {
    'playa-del-carmen': '529842809885', // +52 984 280 9885
    cancun: '529841447501',            // +52 984 144 7501
} as const;

// ─── Social ──────────────────────────────────────────────────────────────────
export const INSTAGRAM_URL = 'https://www.instagram.com/tattoo_kim/';

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
        mapUrl: 'https://maps.app.goo.gl/Jptg6VLaGabGqM7a8',
        hours: {
            weekdays: '11:00 - 22:00',
            saturday: '11:00 - 22:00',
            sunday: '11:00 - 22:00',
        },
        coords: {
            lat: 20.6296, // TODO: confirm
            lng: -87.0739,
        },
    },
    {
        slug: 'cancun',
        name: 'Cancún',
        address: 'Av. Tulúm 232, SMZ 4, 77500 Cancún, Q.R.',
        phone: WHATSAPP_NUMBERS.cancun,
        mapUrl: 'https://maps.app.goo.gl/EpnExGCyz9RiJgBK9', // TODO: confirm
        hours: {
            weekdays: '11:00 - 22:00',
            saturday: '11:00 - 22:00',
            sunday: '11:00 - 22:00',
        },
        coords: {
            lat: 21.1619, // TODO: confirm
            lng: -86.8515,
        },
    },
];
