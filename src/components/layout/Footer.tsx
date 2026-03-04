import Image from 'next/image';
import Link from 'next/link';
import { LOCATIONS, INSTAGRAM_URL } from '@/lib/constants';

interface FooterProps {
    locale: 'es' | 'en';
}

const content = {
    es: {
        tagline:
            'Más que un estudio, una experiencia artística dedicada a la expresión personal y la excelencia técnica.',
        schedule: 'Horario',
        location: 'Ubicaciones',
        allWeek: 'Lun – Dom:',
        rights: '© 2025 Kim Tattoo Studio. Todos los derechos reservados.',
    },
    en: {
        tagline:
            'More than a studio, an artistic experience dedicated to personal expression and technical excellence.',
        schedule: 'Hours',
        location: 'Locations',
        allWeek: 'Mon – Sun:',
        rights: '© 2025 Kim Tattoo Studio. All rights reserved.',
    },
};

export default function Footer({ locale }: FooterProps) {
    const t = content[locale];
    const pdcLocation = LOCATIONS[0];

    return (
        <footer className="bg-black py-24 px-8 border-t border-white/5">
            <div className="max-w-[1920px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <Link
                            href={`/${locale}`}
                            className="mb-8 block w-fit"
                            aria-label="Kim Tattoo"
                        >
                            <Image
                                src="/images/icon-white.svg"
                                alt="Kim Tattoo"
                                width={64}
                                height={64}
                                className="size-16"
                            />
                        </Link>
                        <p className="text-slate-500 font-light max-w-sm text-base leading-relaxed">
                            {t.tagline}
                        </p>
                    </div>

                    {/* Schedule */}
                    <div>
                        <h5 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-[10px]">
                            {t.schedule}
                        </h5>
                        <ul className="text-slate-500 font-light text-sm space-y-3">
                            <li>
                                <span className="text-white font-medium inline-block w-28">
                                    {t.allWeek}
                                </span>
                                {pdcLocation.hours.weekdays}
                            </li>
                        </ul>
                    </div>

                    {/* Locations */}
                    <div>
                        <h5 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-[10px]">
                            {t.location}
                        </h5>
                        <ul className="text-slate-500 font-light text-sm space-y-4">
                            <li>
                                <p className="text-white font-medium mb-1">Playa del Carmen</p>
                                <a href="tel:529842809885" className="hover:text-[#14b8a6] transition-colors">
                                    +52 984 280 9885
                                </a>
                            </li>
                            <li>
                                <p className="text-white font-medium mb-1">Cancún</p>
                                <a href="tel:529841447501" className="hover:text-[#14b8a6] transition-colors">
                                    +52 984 144 7501
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-600 font-light text-xs tracking-wider">
                        {t.rights}
                    </p>
                    <a
                        href={INSTAGRAM_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Instagram de Kim Tattoo"
                        className="text-slate-500 hover:text-[#14b8a6] transition-colors text-sm font-black uppercase tracking-widest"
                    >
                        Instagram
                    </a>
                </div>
            </div>
        </footer>
    );
}
