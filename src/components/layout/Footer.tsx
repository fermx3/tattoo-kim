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
        location: 'Ubicación',
        weekdays: 'Lun – Vie:',
        saturday: 'Sábado:',
        sunday: 'Domingo:',
        rights: '© 2025 Kim Tattoo Studio. Todos los derechos reservados.',
    },
    en: {
        tagline:
            'More than a studio, an artistic experience dedicated to personal expression and technical excellence.',
        schedule: 'Hours',
        location: 'Location',
        weekdays: 'Mon – Fri:',
        saturday: 'Saturday:',
        sunday: 'Sunday:',
        rights: '© 2025 Kim Tattoo Studio. All rights reserved.',
    },
};

const closedLabel = { es: 'Cerrado', en: 'Closed' };

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
                            className="flex items-center gap-3 mb-8 group w-fit"
                            aria-label="Kim Tattoo"
                        >
                            <div className="size-8 bg-[#134e4a] rounded flex items-center justify-center ring-1 ring-white/10">
                                <span className="text-[10px] font-black text-white">KT</span>
                            </div>
                            <span className="text-xl font-black text-white uppercase tracking-tighter">
                                Kim Tattoo
                            </span>
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
                                    {t.weekdays}
                                </span>
                                {pdcLocation.hours.weekdays}
                            </li>
                            <li>
                                <span className="text-white font-medium inline-block w-28">
                                    {t.saturday}
                                </span>
                                {pdcLocation.hours.saturday}
                            </li>
                            <li>
                                <span className="text-white font-medium inline-block w-28">
                                    {t.sunday}
                                </span>
                                {closedLabel[locale]}
                            </li>
                        </ul>
                    </div>

                    {/* Location */}
                    <div>
                        <h5 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-[10px]">
                            {t.location}
                        </h5>
                        <p className="text-slate-500 font-light text-sm leading-loose">
                            Av 30 Esquina Calle 72<br />
                            Colonia Gonzalo Guerrero<br />
                            Playa del Carmen, Q.R.
                        </p>
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
