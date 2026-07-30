import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { SiteInfo } from '../types';

interface FloatingActionsProps {
  siteInfo: SiteInfo;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ siteInfo }) => {
  const formattedWhatsapp = siteInfo.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3 items-end pointer-events-none">
      
      {/* Phone Call Floating Button */}
      <a
        href={`tel:${siteInfo.contactNumber}`}
        className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0F2C59] border-2 border-[#D4AF37] text-[#F3E5AB] flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group relative"
        title="Call Parasakthi Bakery"
        aria-label="Call Parasakthi Bakery"
      >
        <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]" />
        <span className="absolute right-16 bg-[#0A192F] text-[#F3E5AB] text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#D4AF37]/40 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:inline-block">
          Call {siteInfo.contactNumber}
        </span>
      </a>

      {/* WhatsApp Chat Floating Button */}
      <a
        href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(
          'Hello Parasakthi Bakery, I would like to inquire about custom cakes/bakery items.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group relative"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
        
        {/* Pulsing online ring */}
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-400 border-2 border-white rounded-full" />

        <span className="absolute right-16 bg-[#0A192F] text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#25D366]/50 shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:inline-block">
          Chat on WhatsApp
        </span>
      </a>

    </div>
  );
};
