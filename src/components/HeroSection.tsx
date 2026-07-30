import React from 'react';
import { Crown, Sparkles, Heart, ShieldCheck, ArrowRight, Phone, MessageCircle, Share2, UserCheck } from 'lucide-react';
import { SiteInfo } from '../types';

interface HeroSectionProps {
  siteInfo: SiteInfo;
  onExploreClick: () => void;
  onContactClick: () => void;
  onShareWebsite?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  siteInfo,
  onExploreClick,
  onContactClick,
  onShareWebsite,
}) => {
  const formattedWhatsapp = siteInfo.whatsappNumber.replace(/[^0-9]/g, '');
  const ownerName = siteInfo.ownerName || 'Srinivasarao Kolisetty';

  return (
    <section id="hero" className="relative navy-gradient text-white overflow-hidden py-16 md:py-24 border-b border-[#D4AF37]/30">
      {/* Background Royal Geometry & Glows */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 border border-[#D4AF37]/20 rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-80 h-80 border border-[#D4AF37]/20 rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-[#D4AF37]/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          
          {/* Established Royal Badge & Owner Mention */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-[#000d28]/80 border border-[#D4AF37]/50 mb-6 shadow-lg">
            <span className="text-[#D4AF37] text-[11px] font-bold tracking-[0.2em] uppercase flex items-center gap-1.5">
              <Crown className="w-3.5 h-3.5 text-[#F3E5AB]" />
              ESTD 2007 • MACHERLA
            </span>
            <span className="text-slate-500">•</span>
            <span className="text-[#F3E5AB] text-[11px] font-semibold flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              Proprietor: <strong className="text-white font-bold">{ownerName}</strong>
            </span>
          </div>

          {/* Business Title */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.1]">
            {siteInfo.businessName}
          </h1>

          {/* Tagline */}
          <p className="font-serif italic text-2xl sm:text-3xl text-[#D4AF37] mb-6 tracking-wide font-normal">
            "{siteInfo.tagline}"
          </p>

          {/* Subheading */}
          <p className="text-sm sm:text-base md:text-lg text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed font-sans">
            {siteInfo.heroSubheading}
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-14">
            <button
              onClick={onExploreClick}
              className="px-8 py-4 gold-gradient text-[#001030] font-bold text-xs uppercase tracking-widest rounded-sm shadow-xl hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {onShareWebsite && (
              <button
                onClick={onShareWebsite}
                className="px-6 py-4 rounded-sm bg-[#000d28] border-2 border-[#D4AF37] text-[#F3E5AB] font-bold text-xs uppercase tracking-widest hover:bg-[#D4AF37]/20 transition-all flex items-center gap-2 shadow-lg cursor-pointer"
              >
                <Share2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Share Web Page</span>
              </button>
            )}

            <a
              href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(
                'Hello Parasakthi Bakery, I would like to inquire about custom cakes and bakery items.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-4 rounded-sm border border-[#D4AF37]/60 text-[#F3E5AB] font-semibold text-xs uppercase tracking-widest hover:bg-[#D4AF37]/10 transition-all flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp Inquiry</span>
            </a>

            <a
              href={`tel:${siteInfo.contactNumber}`}
              className="px-6 py-4 rounded-sm border border-white/20 text-white font-semibold text-xs uppercase tracking-widest hover:bg-white/5 transition-all flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Call Store</span>
            </a>
          </div>

          {/* Feature Pillars / Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[#D4AF37]/20">
            <div className="p-4 rounded-lg bg-[#001030]/60 border border-[#D4AF37]/20 text-center card-shadow">
              <div className="text-xl font-serif font-bold text-[#F3E5AB] mb-1">18+ Years</div>
              <div className="text-xs text-white/60 font-medium flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                Customer Trust
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#001030]/60 border border-[#D4AF37]/20 text-center card-shadow">
              <div className="text-xl font-serif font-bold text-[#F3E5AB] mb-1">100% Fresh</div>
              <div className="text-xs text-white/60 font-medium flex items-center justify-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Daily Oven Baked
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#001030]/60 border border-[#D4AF37]/20 text-center card-shadow">
              <div className="text-xl font-serif font-bold text-[#F3E5AB] mb-1">Care & Love</div>
              <div className="text-xs text-white/60 font-medium flex items-center justify-center gap-1">
                <Heart className="w-3.5 h-3.5 text-[#D4AF37]" />
                Pure Ingredients
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#001030]/60 border border-[#D4AF37]/20 text-center card-shadow">
              <div className="text-xl font-serif font-bold text-[#F3E5AB] mb-1">Custom Cakes</div>
              <div className="text-xs text-white/60 font-medium flex items-center justify-center gap-1">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                Tailored Designs
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
