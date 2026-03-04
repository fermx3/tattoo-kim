import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts } from '@/lib/content';
import type { Locale } from '@/types';
import PageHero from '@/components/ui/PageHero';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blog' });
    return {
        title:
            locale === 'es'
                ? 'Blog — Consejos & Guías | Tattoo Kim'
                : 'Blog — Tips & Guides | Tattoo Kim',
        description: t('desc'),
    };
}

export default async function BlogPage({ params }: Props) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'blog' });

    const posts = getAllPosts(locale as Locale);

    return (
        <main className="min-h-screen bg-[#121212]">
            <PageHero
                label={t('label')}
                title={t('title')}
                description={t('desc')}
            />

            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    {posts.length === 0 ? (
                        <p className="text-center text-slate-500 text-lg">{t('no_posts')}</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
                            {posts.map((post) => (
                                <article
                                    key={post.slug}
                                    className="bg-[#121212] group flex flex-col hover:bg-[#0d1f1e] transition-colors duration-300"
                                >
                                    <Link
                                        href={`/${locale}/blog/${post.slug}`}
                                        className="flex flex-col h-full"
                                    >
                                        <div className="relative aspect-[1.91/1] overflow-hidden">
                                            <Image
                                                src={post.image}
                                                alt={post.title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        </div>

                                        <div className="p-8 flex flex-col flex-1">
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-[9px] font-black uppercase tracking-widest text-[#14b8a6] border border-[#14b8a6]/30 px-2 py-1"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <h2 className="text-xl font-black text-white tracking-tight mb-3 group-hover:text-[#14b8a6] transition-colors duration-300">
                                                {post.title}
                                            </h2>

                                            <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-6">
                                                {post.description}
                                            </p>

                                            <div className="flex items-center justify-between mt-auto">
                                                <time
                                                    dateTime={post.date}
                                                    className="text-[10px] text-slate-600 uppercase tracking-widest"
                                                >
                                                    {new Date(post.date).toLocaleDateString(
                                                        locale === 'es' ? 'es-MX' : 'en-US',
                                                        {
                                                            year: 'numeric',
                                                            month: 'long',
                                                            day: 'numeric',
                                                        }
                                                    )}
                                                </time>
                                                <span className="text-[10px] font-black uppercase tracking-widest text-[#14b8a6]">
                                                    {t('read_more')} →
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
