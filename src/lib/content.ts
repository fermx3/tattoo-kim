import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost, Artist, Locale } from '@/types';

const contentDir = path.join(process.cwd(), 'content');

// ─── Blog ────────────────────────────────────────────────────────────────────

export function getAllPosts(locale: Locale): BlogPost[] {
    const dir = path.join(contentDir, 'blog', locale);

    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

    const posts = files.map((file) => {
        const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
        const { data } = matter(raw);
        return data as BlogPost;
    });

    return posts.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export function getPostBySlug(
    locale: Locale,
    slug: string
): (BlogPost & { content: string }) | null {
    const filePath = path.join(contentDir, 'blog', locale, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    return { ...(data as BlogPost), content };
}

// ─── Artists ─────────────────────────────────────────────────────────────────

export function getAllArtists(locale: Locale): Artist[] {
    const dir = path.join(contentDir, 'artists', locale);

    if (!fs.existsSync(dir)) return [];

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

    return files.map((file) => {
        const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
        const { data } = matter(raw);
        return data as Artist;
    });
}

export function getArtistBySlug(
    locale: Locale,
    slug: string
): (Artist & { content: string }) | null {
    const filePath = path.join(contentDir, 'artists', locale, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) return null;

    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);

    return { ...(data as Artist), content };
}

// ─── Translation Linking ─────────────────────────────────────────────────────

export function getTranslation(
    type: 'blog' | 'artist',
    translationSlug: string,
    targetLocale: Locale
): string | null {
    const dir = path.join(
        contentDir,
        type === 'blog' ? 'blog' : 'artists',
        targetLocale
    );

    if (!fs.existsSync(dir)) return null;

    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.mdx'));

    for (const file of files) {
        const raw = fs.readFileSync(path.join(dir, file), 'utf-8');
        const { data } = matter(raw);
        if (data.translationSlug === translationSlug) {
            return data.slug as string;
        }
    }

    return null;
}
