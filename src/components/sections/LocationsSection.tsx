import { useTranslations } from 'next-intl';
import { LOCATIONS } from '@/lib/constants';
import { buildWhatsAppUrl } from '@/lib/whatsapp';

function ClockIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
}

function MapPinIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
        </svg>
    );
}

export default function LocationsSection() {
    const t = useTranslations('home');

    return (
        <section className="py-32 px-6 lg:px-16 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-16">
                <p className="text-[#14b8a6] font-black uppercase tracking-[0.35em] text-xs mb-4">
                    {t('locations_label')}
                </p>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
                    {t('locations_title')}
                </h2>
            </div>

            {/* Location cards */}
            <div className="grid md:grid-cols-2 gap-6">
                {LOCATIONS.map((location) => {
                    const whatsappUrl = buildWhatsAppUrl(location.slug, 'general');
                    const isPlaya = location.slug === 'playa-del-carmen';

                    return (
                        <div
                            key={location.slug}
                            className="relative border border-white/10 p-10 hover:border-[#14b8a6]/40 transition-all duration-500 group"
                        >
                            {/* Top accent */}
                            <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#14b8a6] group-hover:w-full transition-all duration-700" />

                            {/* Location number */}
                            <p className="text-[#14b8a6]/30 font-black text-7xl absolute top-6 right-8 leading-none select-none">
                                {isPlaya ? '01' : '02'}
                            </p>

                            {/* Name */}
                            <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-8 relative z-10">
                                {location.name}
                            </h3>

                            <div className="space-y-5">
                                {/* Address */}
                                <div className="flex gap-3 items-start">
                                    <span className="text-[#14b8a6] mt-0.5 flex-shrink-0"><MapPinIcon /></span>
                                    <p className="text-slate-400 font-light text-sm leading-relaxed">
                                        {location.address}
                                    </p>
                                </div>

                                {/* Phone */}
                                <div className="flex gap-3 items-center">
                                    <span className="text-[#14b8a6] flex-shrink-0"><PhoneIcon /></span>
                                    <a
                                        href={`tel:${location.phone}`}
                                        className="text-slate-300 text-sm font-light hover:text-[#14b8a6] transition-colors duration-200"
                                    >
                                        {location.slug === 'cancun' ? '+52 984 144 7501' : '+52 984 280 9885'}
                                    </a>
                                </div>

                                {/* Hours */}
                                <div className="flex gap-3 items-center">
                                    <span className="text-[#14b8a6] flex-shrink-0"><ClockIcon /></span>
                                    <div className="text-sm flex gap-3">
                                        <span className="text-slate-500 font-light">{t('locations_hours_weekdays')}</span>
                                        <span className="text-slate-300">{location.hours.weekdays}</span>
                                    </div>
                                </div>
                            </div>

                            {/* CTA */}
                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-10 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white border-b-2 border-[#14b8a6] pb-1 hover:text-[#14b8a6] hover:gap-4 transition-all duration-300"
                            >
                                {t('locations_cta')}
                                <span>→</span>
                            </a>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
