import { buildWhatsAppUrl } from '@/lib/whatsapp';

type LocationSlug = 'playa-del-carmen' | 'cancun';
type WhatsAppContext = 'general' | 'tattoo' | 'piercing' | { artist: string };

interface CTAButtonProps {
    location?: LocationSlug;
    context?: WhatsAppContext;
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    label: string;
    className?: string;
    locale?: string;
}

export default function CTAButton({
    location = 'playa-del-carmen',
    context = 'general',
    variant = 'primary',
    size = 'md',
    label,
    className = '',
    locale = 'es',
}: CTAButtonProps) {
    const url = buildWhatsAppUrl(location, context, locale);

    const sizeClasses = {
        sm: 'px-6 py-3 text-xs',
        md: 'px-10 py-4 text-xs',
        lg: 'px-12 py-5 text-sm',
    };

    const variantClasses = {
        primary:
            'bg-white text-[#121212] hover:bg-[#14b8a6] hover:text-white',
        secondary:
            'bg-transparent text-white border-b-2 border-[#14b8a6] hover:text-[#14b8a6] rounded-none px-0 py-1',
    };

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-block font-black uppercase tracking-widest transition-all ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
        >
            {label}
        </a>
    );
}
