import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

const GALLERY_IMAGES = [
    { src: '/images/gallery/portfolio-medusa.webp', alt: 'Tatuaje de medusa fine-line' },
    { src: '/images/gallery/portfolio-balance.webp', alt: 'Tatuaje lettering BALANCE en cuello' },
    { src: '/images/gallery/portfolio-pareja.webp', alt: 'Tatuajes de pareja cactus' },
    { src: '/images/gallery/portfolio-luffy.webp', alt: 'Tatuaje anime Luffy blackwork' },
    { src: '/images/gallery/portfolio-barracuda.webp', alt: 'Tatuaje barracuda con flores' },
    { src: '/images/gallery/portfolio-amor.webp', alt: 'Tatuaje fine-line amor' },
    { src: '/images/gallery/portfolio-tom.webp', alt: 'Tatuaje Tom blackwork' },
    { src: '/images/gallery/portfolio-unforgettable.webp', alt: 'Tatuaje tribal Unforgettable' },
];

export default function GallerySection() {
    const t = useTranslations('home');

    return (
        <section className="py-32 bg-[#121212] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                {/* Header with Stitch-style layout */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
                    <div>
                        <p className="text-[#14b8a6] font-black uppercase tracking-[0.35em] text-xs mb-4">
                            {t('portfolio_label')}
                        </p>
                        <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
                            {t('portfolio_title')}
                        </h2>
                    </div>
                    <Link
                        href="/artistas"
                        className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#14b8a6] hover:gap-4 transition-all duration-300 shrink-0"
                    >
                        {t('portfolio_view_artists')}
                        <span>→</span>
                    </Link>
                </div>
            </div>

            {/* Masonry-style grid with Stitch creative elements */}
            <div className="max-w-7xl mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {/* Row 1: 4 images with varied heights */}
                    <div className="group relative aspect-[3/4] overflow-hidden border border-white/5 hover:border-[#14b8a6]/30 transition-all duration-500">
                        <div className="absolute top-0 left-0 w-6 h-[2px] bg-[#14b8a6] z-10 group-hover:w-12 transition-all duration-500" />
                        <Image
                            src={GALLERY_IMAGES[0].src}
                            alt={GALLERY_IMAGES[0].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="group relative aspect-[3/4] md:translate-y-8 overflow-hidden border border-white/5 hover:border-[#14b8a6]/30 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-6 h-[2px] bg-[#14b8a6] z-10 group-hover:w-12 transition-all duration-500" />
                        <Image
                            src={GALLERY_IMAGES[1].src}
                            alt={GALLERY_IMAGES[1].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="group relative aspect-[3/4] overflow-hidden border border-white/5 hover:border-[#14b8a6]/30 transition-all duration-500">
                        <div className="absolute top-0 left-0 w-6 h-[2px] bg-[#14b8a6] z-10 group-hover:w-12 transition-all duration-500" />
                        <Image
                            src={GALLERY_IMAGES[2].src}
                            alt={GALLERY_IMAGES[2].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="group relative aspect-[3/4] md:translate-y-8 overflow-hidden border border-white/5 hover:border-[#14b8a6]/30 transition-all duration-500">
                        <div className="absolute top-0 right-0 w-6 h-[2px] bg-[#14b8a6] z-10 group-hover:w-12 transition-all duration-500" />
                        <Image
                            src={GALLERY_IMAGES[3].src}
                            alt={GALLERY_IMAGES[3].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Row 2: 4 images with opposite offset */}
                    <div className="group relative aspect-[3/4] md:-translate-y-4 overflow-hidden border border-white/5 hover:border-[#14b8a6]/30 transition-all duration-500">
                        <div className="absolute bottom-0 left-0 w-[2px] h-6 bg-[#14b8a6] z-10 group-hover:h-12 transition-all duration-500" />
                        <Image
                            src={GALLERY_IMAGES[4].src}
                            alt={GALLERY_IMAGES[4].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="group relative aspect-[3/4] overflow-hidden border border-white/5 hover:border-[#14b8a6]/30 transition-all duration-500">
                        <div className="absolute bottom-0 right-0 w-[2px] h-6 bg-[#14b8a6] z-10 group-hover:h-12 transition-all duration-500" />
                        <Image
                            src={GALLERY_IMAGES[5].src}
                            alt={GALLERY_IMAGES[5].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="group relative aspect-[3/4] md:-translate-y-4 overflow-hidden border border-white/5 hover:border-[#14b8a6]/30 transition-all duration-500">
                        <div className="absolute bottom-0 left-0 w-[2px] h-6 bg-[#14b8a6] z-10 group-hover:h-12 transition-all duration-500" />
                        <Image
                            src={GALLERY_IMAGES[6].src}
                            alt={GALLERY_IMAGES[6].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    <div className="group relative aspect-[3/4] overflow-hidden border border-white/5 hover:border-[#14b8a6]/30 transition-all duration-500">
                        <div className="absolute bottom-0 right-0 w-[2px] h-6 bg-[#14b8a6] z-10 group-hover:h-12 transition-all duration-500" />
                        <Image
                            src={GALLERY_IMAGES[7].src}
                            alt={GALLERY_IMAGES[7].alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                </div>

                {/* Bottom decorative line — Stitch accent */}
                <div className="flex items-center gap-4 mt-16">
                    <div className="h-[1px] flex-1 bg-white/5" />
                    <div className="w-2 h-2 border border-[#14b8a6] rotate-45" />
                    <div className="h-[1px] flex-1 bg-white/5" />
                </div>
            </div>
        </section>
    );
}
