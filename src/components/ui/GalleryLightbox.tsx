'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

type GalleryImage = { src: string; alt: string };

export default function GalleryLightbox({ images }: { images: GalleryImage[] }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const close = useCallback(() => setActiveIndex(null), []);
    const prev = useCallback(() => setActiveIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null)), [images.length]);
    const next = useCallback(() => setActiveIndex((i) => (i !== null ? (i + 1) % images.length : null)), [images.length]);

    useEffect(() => {
        if (activeIndex === null) return;

        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') prev();
            if (e.key === 'ArrowRight') next();
        }

        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [activeIndex, close, prev, next]);

    return (
        <>
            {/* Grid */}
            <div className="columns-2 md:columns-3 gap-px">
                {images.map((img, i) => (
                    <button
                        key={img.src}
                        type="button"
                        onClick={() => setActiveIndex(i)}
                        className="group block w-full break-inside-avoid mb-px overflow-hidden cursor-pointer"
                    >
                        <Image
                            src={img.src}
                            alt={img.alt}
                            width={600}
                            height={600}
                            sizes="(max-width: 768px) 50vw, 33vw"
                            className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
                        />
                    </button>
                ))}
            </div>

            {/* Lightbox modal */}
            {activeIndex !== null && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                    onClick={close}
                >
                    {/* Close button */}
                    <button
                        type="button"
                        onClick={close}
                        className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl leading-none z-10 cursor-pointer"
                        aria-label="Close"
                    >
                        ✕
                    </button>

                    {/* Prev */}
                    {images.length > 1 && (
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute left-4 md:left-8 text-white/70 hover:text-white text-4xl z-10 cursor-pointer"
                            aria-label="Previous"
                        >
                            ‹
                        </button>
                    )}

                    {/* Image */}
                    <div
                        className="relative max-h-[90vh] max-w-[90vw]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={images[activeIndex].src}
                            alt={images[activeIndex].alt}
                            width={1200}
                            height={1200}
                            sizes="90vw"
                            className="max-h-[90vh] w-auto h-auto object-contain"
                            priority
                        />
                    </div>

                    {/* Next */}
                    {images.length > 1 && (
                        <button
                            type="button"
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute right-4 md:right-8 text-white/70 hover:text-white text-4xl z-10 cursor-pointer"
                            aria-label="Next"
                        >
                            ›
                        </button>
                    )}

                    {/* Counter */}
                    <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-widest">
                        {activeIndex + 1} / {images.length}
                    </span>
                </div>
            )}
        </>
    );
}
