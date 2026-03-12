import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPosts, getTranslation } from '@/lib/content';
import { buildWhatsAppUrl } from '@/lib/whatsapp';
import { buildAlternates } from '@/lib/seo';
import { buildArticleJsonLd, buildBreadcrumbJsonLd } from '@/lib/jsonld';
import { SITE_URL } from '@/lib/constants';
import JsonLd from '@/components/ui/JsonLd';
import type { Locale } from '@/types';

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateStaticParams() {
    const esParams = getAllPosts('es').map((p) => ({ locale: 'es', slug: p.slug }));
    const enParams = getAllPosts('en').map((p) => ({ locale: 'en', slug: p.slug }));
    return [...esParams, ...enParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, slug } = await params;
    const post = getPostBySlug(locale as Locale, slug);
    if (!post) return {};

    const targetLocale = locale === 'es' ? 'en' : 'es';
    const translatedSlug = getTranslation('blog', post.translationSlug, targetLocale as Locale);
    const esSlug = locale === 'es' ? slug : (translatedSlug ?? slug);
    const enSlug = locale === 'en' ? slug : (translatedSlug ?? slug);

    return {
        title: post.title,
        description: post.description,
        alternates: buildAlternates(locale, `/blog/${esSlug}`, `/blog/${enSlug}`),
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.description,
            images: [{ url: post.image }],
            publishedTime: post.date,
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const post = getPostBySlug(locale as Locale, slug);

    if (!post) notFound();

    const t = await getTranslations({ locale, namespace: 'blog' });

    const formattedDate = new Date(post.date).toLocaleDateString(
        locale === 'es' ? 'es-MX' : 'en-US',
        { year: 'numeric', month: 'long', day: 'numeric' }
    );

    const jsonLdData = [
        buildArticleJsonLd(post, locale),
        buildBreadcrumbJsonLd([
            { name: 'Tattoo Kim', url: `${SITE_URL}/${locale}` },
            { name: 'Blog', url: `${SITE_URL}/${locale}/blog` },
            { name: post.title, url: `${SITE_URL}/${locale}/blog/${slug}` },
        ]),
    ];

    return (
        <main className="min-h-screen bg-[#121212]">
            <JsonLd data={jsonLdData} />
            {/* Cover Image */}
            <div className="relative w-full h-[50vh] min-h-[320px] max-h-[520px] overflow-hidden">
                <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-black/40 to-transparent" />
            </div>

            {/* Header */}
            <div className="max-w-3xl mx-auto px-6 -mt-16 relative z-10">
                <div className="flex flex-wrap gap-2 mb-5">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-[9px] font-black uppercase tracking-widest text-[#14b8a6] border border-[#14b8a6]/40 px-2 py-1"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white leading-tight mb-4">
                    {post.title}
                </h1>

                <p className="text-slate-400 text-base mb-6">{post.description}</p>

                <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest text-slate-600 mb-12 pb-8 border-b border-white/10">
                    <time dateTime={post.date}>{t('published_on')} {formattedDate}</time>
                    <span>·</span>
                    <span>{t('by')} {post.author}</span>
                </div>
            </div>

            {/* Body */}
            <article className="max-w-3xl mx-auto px-6 pb-24">
                <div className="prose prose-invert prose-lg max-w-none
                    prose-headings:font-black prose-headings:tracking-tight prose-headings:text-white
                    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                    prose-h3:text-lg prose-h3:mb-3 prose-h3:text-[#14b8a6]
                    prose-p:text-slate-300 prose-p:leading-relaxed
                    prose-li:text-slate-300 prose-li:leading-relaxed
                    prose-strong:text-white prose-strong:font-black
                    prose-hr:border-white/10 prose-hr:my-10
                    prose-ul:space-y-2 prose-ol:space-y-2
                ">
                    <MDXRemote source={post.content} />
                </div>

                {/* WhatsApp CTA */}
                <div className="mt-16 border border-white/10 p-8 md:p-12 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.25em] text-[#14b8a6] mb-4">
                        {t('whatsapp_cta_title')}
                    </p>
                    <p className="text-slate-400 text-sm mb-8 max-w-md mx-auto">
                        {t('whatsapp_cta_desc')}
                    </p>
                    <a
                        href={buildWhatsAppUrl('playa-del-carmen', 'general', locale)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#14b8a6] text-[#121212] px-10 py-4 text-[11px] font-black uppercase tracking-widest hover:bg-white transition-colors duration-300"
                    >
                        {t('whatsapp_cta_button')}
                    </a>
                </div>

                {/* Back link */}
                <div className="mt-10 text-center">
                    <Link
                        href={`/${locale}/blog`}
                        className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#14b8a6] transition-colors duration-300"
                    >
                        ← {t('back_to_blog')}
                    </Link>
                </div>
            </article>
        </main>
    );
}
