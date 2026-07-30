import React, { useState } from 'react';
import { Crown, Sparkles } from 'lucide-react';

interface ImageWithBakeryFallbackProps {
  src?: string;
  alt: string;
  title?: string;
  category?: string;
  className?: string;
  onClick?: () => void;
  loading?: 'lazy' | 'eager';
}

export const ImageWithBakeryFallback: React.FC<ImageWithBakeryFallbackProps> = ({
  src,
  alt,
  title,
  category,
  className = 'w-full h-full object-cover',
  onClick,
  loading = 'lazy',
}) => {
  const [hasError, setHasError] = useState(false);

  // Check if src is missing or empty or an SVG placeholder data URL
  const isPlaceholderSrc =
    !src ||
    src.trim() === '' ||
    src.startsWith('data:image/svg') ||
    src.includes('Placeholder') ||
    src.includes('unsplash');

  const displayTitle = title || alt || 'Bakery Product';

  if (hasError || isPlaceholderSrc) {
    return (
      <div
        onClick={onClick}
        className={`bg-[#001030] text-white flex flex-col items-center justify-center p-4 text-center relative overflow-hidden group select-none border border-[#D4AF37]/30 ${className}`}
      >
        {/* Background Royal Pattern Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
        <div className="absolute top-2 right-2 w-12 h-12 border-t border-r border-[#D4AF37]/30 rounded-tr-lg" />
        <div className="absolute bottom-2 left-2 w-12 h-12 border-b border-l border-[#D4AF37]/30 rounded-bl-lg" />

        {/* Crown & Bakery Identity Badge */}
        <div className="relative z-10 flex flex-col items-center my-auto space-y-1.5">
          <div className="w-10 h-10 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
            <Crown className="w-5 h-5 text-[#F3E5AB]" />
          </div>

          <span className="text-[10px] font-serif font-bold text-[#F3E5AB] tracking-[0.18em] uppercase">
            PARASAKTHI BAKERY
          </span>

          <span className="text-[8px] font-mono text-[#D4AF37] uppercase tracking-wider bg-[#000d28] px-2 py-0.5 rounded border border-[#D4AF37]/30">
            MACHERLA • ESTD 2007
          </span>

          <h4 className="font-serif font-bold text-xs sm:text-sm text-white line-clamp-2 px-2 pt-1">
            {displayTitle}
          </h4>

          {category && (
            <span className="text-[9px] text-[#C5A059] font-medium block">
              {category}
            </span>
          )}

          <div className="mt-2 text-[8px] font-bold text-[#D4AF37]/80 uppercase tracking-widest bg-[#D4AF37]/10 px-2.5 py-1 rounded-full border border-[#D4AF37]/20 flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-[#F3E5AB]" />
            <span>PHOTO PENDING UPLOAD</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onClick={onClick}
      loading={loading}
      onError={() => setHasError(true)}
    />
  );
};
