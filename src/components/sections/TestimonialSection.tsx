import { useTranslations } from 'next-intl';

interface QuoteProps {
    text: string;
    author: string;
    featured?: boolean;
}

function Quote({ text, author, featured = false }: QuoteProps) {
    if (featured) {
        return (
            <div className="col-span-full text-center mb-16">
                <svg className="w-10 h-10 text-[#14b8a6]/40 mx-auto mb-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-2xl md:text-3xl text-white font-light leading-relaxed italic max-w-3xl mx-auto mb-6">
                    &ldquo;{text}&rdquo;
                </p>
                <p className="text-[#14b8a6] font-black uppercase tracking-widest text-xs">
                    — {author}
                </p>
            </div>
        );
    }

    return (
        <div className="border border-white/8 p-8 hover:border-white/20 transition-colors duration-300">
            <p className="text-slate-400 font-light leading-relaxed italic text-sm mb-6">
                &ldquo;{text}&rdquo;
            </p>
            <p className="text-[#14b8a6] font-black uppercase tracking-widest text-xs">
                — {author}
            </p>
        </div>
    );
}

export default function TestimonialSection() {
    const t = useTranslations('home');

    return (
        <section className="py-32 bg-[#0d0d0d]">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                {/* Header */}
                <div className="text-center mb-4">
                    <p className="text-[#14b8a6] font-black uppercase tracking-[0.35em] text-xs mb-4">
                        {t('testimonials_label')}
                    </p>
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
                        {t('testimonials_title')}
                    </h2>
                </div>

                {/* Divider */}
                <div className="flex justify-center my-12">
                    <div className="w-16 h-[1px] bg-[#14b8a6]/40" />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {/* Featured quote */}
                    <Quote
                        text={t('testimonial_1_text')}
                        author={t('testimonial_1_author')}
                        featured
                    />
                    {/* Secondary quotes */}
                    <Quote text={t('testimonial_2_text')} author={t('testimonial_2_author')} />
                    <Quote text={t('testimonial_3_text')} author={t('testimonial_3_author')} />
                </div>
            </div>
        </section>
    );
}
