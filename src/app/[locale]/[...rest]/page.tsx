import { notFound } from 'next/navigation';

// Catch all unmatched routes within /[locale]/ and trigger the locale-aware not-found page
export default function CatchAllPage() {
    notFound();
}
