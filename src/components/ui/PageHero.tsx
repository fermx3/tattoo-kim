interface PageHeroProps {
    label: string;
    title: string;
    description: string;
    accent?: string; // opcional: palabra del título a destacar en teal
}

export default function PageHero({ label, title, description }: PageHeroProps) {
    return (
        <section className="relative pt-40 pb-20 px-6 overflow-hidden">
            {/* Ambient glow */}
            <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden="true"
            >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#14b8a6]/8 rounded-full blur-[80px]" />
            </div>

            <div className="relative max-w-4xl mx-auto text-center">
                {/* Label */}
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#14b8a6] mb-6">
                    {label}
                </p>

                {/* Title */}
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6 leading-[1.05]">
                    {title}
                </h1>

                {/* Divider */}
                <div className="w-12 h-px bg-[#14b8a6] mx-auto mb-8" />

                {/* Description */}
                <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    {description}
                </p>
            </div>
        </section>
    );
}
