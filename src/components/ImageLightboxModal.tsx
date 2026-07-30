import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Phone, MessageCircle, Store, Tag, Share2 } from 'lucide-react';
import { SiteInfo } from '../types';
import { ImageWithBakeryFallback } from './ImageWithBakeryFallback';

interface ImageLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: {
    name: string;
    images: string[];
    shortDescription: string;
    fullDescription?: string;
    categoryName?: string;
    isAvailableInStore?: boolean;
    price?: number;
    priceUnit?: string;
    showPrice?: boolean;
  } | null;
  siteInfo: SiteInfo;
  onShareItem?: (name: string, description: string) => void;
}

export const ImageLightboxModal: React.FC<ImageLightboxModalProps> = ({
  isOpen,
  onClose,
  item,
  siteInfo,
  onShareItem,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);

  if (!isOpen || !item) return null;

  const images = item.images && item.images.length > 0 ? item.images : [''];
  const formattedWhatsapp = siteInfo.whatsappNumber.replace(/[^0-9]/g, '');

  const nextImg = () => setCurrentIdx((prev) => (prev + 1) % images.length);
  const prevImg = () => setCurrentIdx((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#001030]/80 backdrop-blur-md animate-fade-in">
      {/* Modal Container */}
      <div 
        className="bg-white rounded-lg overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row card-shadow border border-[#D4AF37]/40 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#001030] hover:bg-[#000d28] text-[#F3E5AB] flex items-center justify-center transition-all shadow-lg border border-[#D4AF37]/40 cursor-pointer"
          aria-label="Close Preview"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Display Side */}
        <div className="md:w-3/5 bg-[#000d28] relative flex items-center justify-center min-h-[300px] md:min-h-[460px]">
          <ImageWithBakeryFallback
            src={images[currentIdx]}
            alt={item.name}
            title={item.name}
            category={item.categoryName}
            className="w-full h-full object-contain max-h-[70vh]"
          />

          {/* Multiple Image Controls */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImg}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImg}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/70 px-3 py-1 rounded text-xs text-white font-sans">
                {currentIdx + 1} / {images.length}
              </div>
            </>
          )}
        </div>

        {/* Info & Actions Side */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#FCF9F2]">
          <div>
            {item.categoryName && (
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#C5A059] block mb-1">
                {item.categoryName}
              </span>
            )}

            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#001030] mb-2">
              {item.name}
            </h3>

            {/* Price Badge if Enabled */}
            {siteInfo.globalShowPrices !== false && item.showPrice !== false && item.price ? (
              <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 bg-[#001030] text-[#F3E5AB] rounded border border-[#D4AF37]/50 shadow-sm font-mono font-bold text-sm">
                <Tag className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>₹{item.price}</span>
                <span className="text-xs text-slate-300 font-sans font-normal">{item.priceUnit || ''}</span>
              </div>
            ) : (
              <div className="mb-3 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FCF9F2] text-[#C5A059] rounded border border-[#D4AF37]/40 text-xs font-semibold">
                <span>Price on Request</span>
              </div>
            )}

            {item.isAvailableInStore && (
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-100 text-emerald-800 text-xs font-semibold mb-4 font-sans block">
                <Store className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
                <span>Available in Macherla Store</span>
              </div>
            )}

            <p className="text-gray-600 text-xs leading-relaxed mb-4 font-sans">
              {item.shortDescription}
            </p>

            {item.fullDescription && (
              <p className="text-gray-500 text-xs leading-relaxed pt-3 border-t border-[#001030]/10 font-sans">
                {item.fullDescription}
              </p>
            )}
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-[#001030]/10 space-y-2.5 font-sans">
            {onShareItem && (
              <button
                onClick={() => onShareItem(item.name, item.shortDescription)}
                className="w-full py-2.5 px-4 rounded-sm bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37] text-[#001030] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                <Share2 className="w-4 h-4 text-[#001030]" />
                <span>Share Item with Family / Friends</span>
              </button>
            )}

            <a
              href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(
                `నమస్కారం! Hello Parasakthi Bakery (Srinivasarao garu),\n\nI am inquiring about this item from your website lightbox:\n🎂 Item Name: *${item.name}*\n${item.price ? `💰 Price: ₹${item.price} ${item.priceUnit || ''}\n` : ''}📝 Details: ${item.shortDescription || 'Please let me know availability and order process.'}\n\n🔗 *Direct Product Link:* ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname : ''}?product=${encodeURIComponent(item.id)}#catalogue`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-sm bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Inquire via WhatsApp</span>
            </a>

            <a
              href={`tel:${siteInfo.contactNumber}`}
              className="w-full py-3 px-4 rounded-sm bg-[#001030] text-[#F3E5AB] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call Bakery ({siteInfo.contactNumber})</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
