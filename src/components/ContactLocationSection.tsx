import React from 'react';
import { 
  MapPin, 
  Phone, 
  MessageCircle, 
  Clock, 
  Building2, 
  ExternalLink,
  Store
} from 'lucide-react';
import { SiteInfo } from '../types';

interface ContactLocationSectionProps {
  siteInfo: SiteInfo;
}

export const ContactLocationSection: React.FC<ContactLocationSectionProps> = ({ siteInfo }) => {
  const formattedWhatsapp = siteInfo.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#FCF9F2]">
      <div className="container mx-auto px-4">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] block mb-2">
            Visit & Contact Us
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#001030] mb-4">
            Store Location & Hours
          </h2>
          <div className="h-1 w-20 gold-gradient mx-auto mb-4"></div>
          <p className="text-gray-600 text-xs sm:text-sm font-sans">
            We welcome you to visit our bakery store in Macherla to explore our freshly baked collection in person.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-white rounded-lg p-6 sm:p-8 border border-[#001030]/5 card-shadow flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-12 h-12 rounded gold-gradient text-[#001030] flex items-center justify-center font-bold">
                  <Store className="w-6 h-6 text-[#001030]" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#001030]">
                    {siteInfo.businessName}
                  </h3>
                  <p className="text-[10px] text-[#C5A059] font-bold uppercase tracking-wider">
                    Since {siteInfo.establishedYear} • Proprietor: {siteInfo.ownerName || 'Srinivasarao Kolisetty'}
                  </p>
                </div>
              </div>

              <div className="space-y-5 text-xs font-sans">
                {/* Physical Address */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded bg-[#FCF9F2] text-[#001030] border border-[#D4AF37]/30 shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#001030] text-sm mb-1">Bakery Address</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {siteInfo.address.line1},<br />
                      {siteInfo.address.line2},<br />
                      {siteInfo.address.city}, {siteInfo.address.district},<br />
                      {siteInfo.address.state}, {siteInfo.address.country}
                    </p>
                  </div>
                </div>

                {/* Contact Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded bg-[#FCF9F2] text-[#001030] border border-[#D4AF37]/30 shrink-0 mt-0.5">
                    <Phone className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#001030] text-sm mb-1">Phone Inquiry</h4>
                    <a 
                      href={`tel:${siteInfo.contactNumber}`} 
                      className="text-[#001030] font-bold text-base hover:text-[#C5A059] transition-colors"
                    >
                      {siteInfo.contactNumber}
                    </a>
                    <p className="text-gray-400 text-[11px] mt-0.5">Click to make a direct call</p>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded bg-[#FCF9F2] text-[#001030] border border-[#D4AF37]/30 shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-[#C5A059]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-[#001030] text-sm mb-1">Store Timings</h4>
                    <p className="text-gray-600">
                      {siteInfo.operatingHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="pt-6 mt-8 border-t border-gray-100 grid grid-cols-2 gap-3">
              <a
                href={`tel:${siteInfo.contactNumber}`}
                className="py-3 px-4 rounded-sm bg-[#001030] text-[#F3E5AB] font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                <span>Call Store</span>
              </a>

              <a
                href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(
                  'Hello Parasakthi Bakery, I would like to visit your store and inquire about cake orders.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-sm bg-[#25D366] text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map Embed */}
          <div className="lg:col-span-7 bg-white rounded-lg border border-[#001030]/5 card-shadow overflow-hidden min-h-[380px] flex flex-col">
            <div className="p-4 bg-[#001030] text-white flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37] uppercase tracking-wider">
                <Building2 className="w-4 h-4 text-[#D4AF37]" />
                <span>Macherla Store Map View</span>
              </div>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(siteInfo.address.fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] text-[#D4AF37] hover:underline flex items-center gap-1 font-medium"
              >
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="w-full flex-1 min-h-[320px] relative bg-slate-100">
              <iframe
                title="Parasakthi Bakery Macherla Location"
                src={siteInfo.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
