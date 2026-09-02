import Link from 'next/link';

// Emite su propio <html>/<body>: el root layout ya no lo hace, para no forzar
// render dinámico en todo el árbol (ver el comentario en src/app/layout.tsx).
// Sólo se alcanza en rutas sin locale; dentro de /es y /en manda
// src/app/[locale]/not-found.tsx.
export default function NotFound() {
    return (
        <html lang="es" suppressHydrationWarning>
            <body className="antialiased bg-[#121212] text-white">
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
            </body>
        </html>
    );
}
