import React, { useState } from 'react';
import { CakeType, CakeModel, SiteInfo } from '../types';
import { Sparkles, MessageCircle, Eye, Cake, Crown, Share2 } from 'lucide-react';
import { ImageWithBakeryFallback } from './ImageWithBakeryFallback';

interface CakeGalleryProps {
  cakeModels: CakeModel[];
  siteInfo: SiteInfo;
  onOpenLightbox: (item: { name: string; images: string[]; shortDescription: string; categoryName: string }) => void;
  onShareProduct?: (title: string, description: string) => void;
}

const CAKE_TYPES: CakeType[] = [
  'Birthday Cakes',
  'Wedding Cakes',
  'Anniversary Cakes',
  'Fondant Cakes',
  'Theme Cakes',
  'Kids Cakes',
  'Custom Cakes',
];

export const CakeGallery: React.FC<CakeGalleryProps> = ({
  cakeModels,
  siteInfo,
  onOpenLightbox,
  onShareProduct,
}) => {
  const [selectedType, setSelectedType] = useState<CakeType | 'ALL'>('ALL');

  const formattedWhatsapp = siteInfo.whatsappNumber.replace(/[^0-9]/g, '');

  const filteredModels = cakeModels
    .filter((m) => !m.hidden)
    .filter((m) => (selectedType === 'ALL' ? true : m.type === selectedType));

  return (
    <section id="cakes" className="py-16 md:py-24 navy-gradient text-white relative overflow-hidden border-b border-[#D4AF37]/30">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37] block mb-2">
            Signature Cake Models & Designs
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-white mb-4">
            Custom Celebration Cake Gallery
          </h2>
          <div className="h-1 w-20 gold-gradient mx-auto mb-4"></div>
          <p className="text-white/70 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-sans">
            Explore our custom cake designs crafted for weddings, birthdays, anniversaries, theme parties, and kids' celebrations. Contact us to customize flavor, tier size, and toppers!
          </p>
        </div>

        {/* Filter Pills for Cake Types */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none max-w-5xl mx-auto px-2">
          <button
            onClick={() => setSelectedType('ALL')}
            className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
              selectedType === 'ALL'
                ? 'gold-gradient text-[#001030] shadow-md'
                : 'bg-[#001030]/80 text-white/80 hover:text-white border border-[#D4AF37]/20'
            }`}
          >
            All Cake Designs ({cakeModels.filter((m) => !m.hidden).length})
          </button>

          {CAKE_TYPES.map((type) => {
            const count = cakeModels.filter((m) => m.type === type && !m.hidden).length;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 rounded text-xs uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                  selectedType === type
                    ? 'gold-gradient text-[#001030] shadow-md'
                    : 'bg-[#001030]/80 text-white/80 hover:text-white border border-[#D4AF37]/20'
                }`}
              >
                {type} <span className="opacity-75 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Cake Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {filteredModels.map((model) => (
            <div
              key={model.id}
              className="bg-[#001030] rounded-lg border border-[#D4AF37]/20 overflow-hidden card-shadow hover:border-[#D4AF37] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Cake Image Preview */}
                <div 
                  className="relative aspect-[4/3] bg-[#000d28] overflow-hidden cursor-pointer"
                  onClick={() =>
                    onOpenLightbox({
                      name: model.title,
                      images: model.images,
                      shortDescription: model.description,
                      categoryName: model.type,
                    })
                  }
                >
                  <ImageWithBakeryFallback
                    src={model.images[0] || ''}
                    alt={model.title}
                    title={model.title}
                    category={model.type}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute top-3 left-3">
                    <span className="bg-[#001030] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-[#D4AF37]/40 shadow">
                      {model.type}
                    </span>
                  </div>

                  {/* Hover Cue */}
                  <div className="absolute inset-0 bg-[#001030]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="gold-gradient text-[#001030] text-xs font-bold px-3.5 py-1.5 rounded shadow-lg flex items-center gap-1.5">
                      <Eye className="w-4 h-4" />
                      Zoom Cake Model
                    </span>
                  </div>
                </div>

                {/* Cake Card Info */}
                <div className="p-5">
                  <h3 
                    onClick={() =>
                      onOpenLightbox({
                        name: model.title,
                        images: model.images,
                        shortDescription: model.description,
                        categoryName: model.type,
                      })
                    }
                    className="font-serif text-xl font-bold text-white group-hover:text-[#D4AF37] transition-colors cursor-pointer mb-2"
                  >
                    {model.title}
                  </h3>
                  <p className="text-white/70 text-xs line-clamp-2 leading-relaxed font-sans">
                    {model.description}
                  </p>
                </div>
              </div>

              {/* Inquiry Action */}
              <div className="p-4 bg-[#000d28] border-t border-[#D4AF37]/20 flex items-center justify-between gap-2">
                {onShareProduct ? (
                  <button
                    onClick={() => onShareProduct(model.title, model.description)}
                    className="py-1.5 px-2.5 rounded bg-[#001030] hover:bg-[#001840] border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                    title="Share this cake model"
                  >
                    <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Share</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold flex items-center gap-1">
                    <Cake className="w-3.5 h-3.5" /> Custom Design
                  </span>
                )}

                <a
                  href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(
                    `నమస్కారం! Hello Parasakthi Bakery (Srinivasarao garu),\n\nI would like to inquire about ordering this custom cake model:\n🎂 Cake Model: *${model.title}*\n🏷️ Type: ${model.type}\n📝 Requirement: ${model.description || 'Custom weight/flavor customization.'}\n\n🔗 *Direct Cake Model Link:* ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname : ''}?cake=${encodeURIComponent(model.id)}#cake-models`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 rounded bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Order Design</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Cake Order CTA Footer Banner */}
        <div className="mt-16 bg-[#001030] rounded-lg p-8 border border-[#D4AF37]/40 card-shadow max-w-5xl mx-auto text-center relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
              Have a Specific Cake Idea in Mind?
            </h3>
            <p className="text-xs text-white/70 mb-6 font-sans">
              Send us a reference photo on WhatsApp! Our master bakers will craft your dream cake for birthdays, weddings, anniversaries, or corporate events.
            </p>
            <a
              href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(
                'Hello Parasakthi Bakery, I have a reference photo of a custom cake design I would like to order.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-sm gold-gradient text-[#001030] font-bold text-xs uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Reference Photo on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
