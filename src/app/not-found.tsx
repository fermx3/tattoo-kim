import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen px-8">
            <div className="text-center">
                <p className="text-[#14b8a6] font-black uppercase tracking-[0.3em] text-xs mb-4">
                    404
                </p>
                <h1 className="text-5xl font-black uppercase tracking-tighter mb-6">
                    Página no encontrada
                </h1>
                <Link
                    href="/es"
                    className="inline-block border-b-2 border-[#14b8a6] text-white text-sm font-black uppercase tracking-widest hover:text-[#14b8a6] transition-colors pb-1"
                >
                    Volver al inicio
                </Link>
            </div>
        </div>
    );
}
