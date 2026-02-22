import { useTranslations } from 'next-intl';
import Link from 'next/link';

function TattooIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
            <path d="M8 12h8M12 8v8" />
        </svg>
    );
}

function PiercingIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        </svg>
    );
}

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    cta: string;
    href: string;
}

function ServiceCard({ icon, title, description, cta, href }: ServiceCardProps) {
    return (
        <div className="group relative border border-white/10 p-10 hover:border-[#14b8a6]/50 transition-all duration-500 flex flex-col gap-6">
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-8 h-[2px] bg-[#14b8a6] group-hover:w-16 transition-all duration-500" />

            <div className="text-[#14b8a6]">{icon}</div>

            <div>
                <h3 className="text-2xl font-black uppercase tracking-tighter text-white mb-3">
                    {title}
                </h3>
                <p className="text-slate-400 font-light leading-relaxed text-sm">
                    {description}
                </p>
            </div>

            <Link
                href={href}
                className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#14b8a6] hover:gap-4 transition-all duration-300 mt-auto"
            >
                {cta}
                <span>→</span>
            </Link>
        </div>
    );
}

export default function ServicesSection() {
    const t = useTranslations('home');

    return (
        <section className="py-32 px-6 lg:px-16 max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-16">
                <p className="text-[#14b8a6] font-black uppercase tracking-[0.35em] text-xs mb-4">
                    {t('services_label')}
                </p>
                <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight max-w-xl">
                    {t('services_title')}
                </h2>
            </div>

            {/* Cards grid */}
            <div className="grid md:grid-cols-2 gap-0 border border-white/10">
                <ServiceCard
                    icon={<TattooIcon />}
                    title={t('services_tattoos_title')}
                    description={t('services_tattoos_desc')}
                    cta={t('services_cta')}
                    href="/servicios/tatuajes"
                />
                <div className="border-l border-white/10">
                    <ServiceCard
                        icon={<PiercingIcon />}
                        title={t('services_piercings_title')}
                        description={t('services_piercings_desc')}
                        cta={t('services_cta')}
                        href="/servicios/piercings"
                    />
                </div>
            </div>
        </section>
    );
}
