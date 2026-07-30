import React from 'react';
import { Crown, Heart, MapPin, Phone, MessageCircle, Lock, ShieldCheck, Star, Quote } from 'lucide-react';
import { SiteInfo } from '../types';

interface FooterProps {
  siteInfo: SiteInfo;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
}

const teluguOpinions = [
  {
    comment: "మాచర్లలో అత్యుత్తమ బేకరీ! కేకులు చాలా ఫ్రెష్‌గా, రుచిగా ఉంటాయి. నాణ్యత విషయంలో రాజీపడరు.",
    badge: "మాచర్ల లోకల్ కస్టమర్",
    rating: 5,
  },
  {
    comment: "బర్త్‌డే కేక్ డిజైన్ మేము చూపించిన ఫోటో కంటే చాలా అద్భుతంగా చేశారు. టైమ్‌కి డెలివరీ ఇచ్చారు, చాలా ధన్యవాదాలు!",
    badge: "కస్టమర్ అభిప్రాయం",
    rating: 5,
  },
  {
    comment: "2007 నుండి మా ఇంట్లో ఏ వేడుక జరిగినా కేక్ ఇక్కడే ఆర్డర్ చేస్తాం. రుచి మరియు శుభ్రత ఎప్పుడూ సూపర్‌గా ఉంటాయి.",
    badge: "రెగ్యులర్ కస్టమర్",
    rating: 5,
  },
  {
    comment: "హాట్ పఫ్‌లు, పేస్ట్రీలు మరియు ఫ్రెష్ బ్రెడ్ చాలా బాగుంటాయి. సాయంత్రం స్నాక్స్ కోసం మాచర్లలో బెస్ట్ ప్లేస్.",
    badge: "మాచర్ల నివాసి",
    rating: 5,
  },
  {
    comment: "పాప మొదటి పుట్టినరోజుకి ఆర్డర్ చేసిన థీమ్ కేక్ చాలా బాగా నచ్చింది. పిల్లలంతా కేక్ డిజైన్ చూసి చాలా ఆనందించారు.",
    badge: "కస్టమర్ రివ్యూ",
    rating: 5,
  },
  {
    comment: "ఇక్కడ స్టాఫ్ రిసీవింగ్ చాలా బాగుంటుంది. క్వాలిటీ ఫ్రెష్ బేకరీ ఉత్పత్తులు సరసమైన ధరల్లో లభిస్తాయి.",
    badge: "మాచర్ల లోకల్ కస్టమర్",
    rating: 5,
  },
];

export const Footer: React.FC<FooterProps> = ({
  siteInfo,
  onNavigate,
  onOpenAdmin,
}) => {
  const formattedWhatsapp = siteInfo.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-[#001030] text-white pt-16 pb-12 border-t border-[#D4AF37]/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* Anonymous Telugu Customer Opinions Preview Segment */}
        <div className="pb-16 mb-16 border-b border-[#D4AF37]/30">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#000d28] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-widest mb-3">
              <Star className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              <span>ప్రజల అభిప్రాయాలు • Customer Opinions</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-3">
              మాచర్ల ప్రజల ప్రేమ & అభిప్రాయాలు
            </h3>
            <div className="h-1 w-20 gold-gradient mx-auto mb-3"></div>
            <p className="text-white/70 text-xs sm:text-sm font-sans max-w-xl mx-auto">
              Authentic local words of appreciation from Macherla residents who celebrate their special moments with Parasakthi Bakery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teluguOpinions.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#000d28] rounded-lg p-5 border border-[#D4AF37]/25 card-shadow flex flex-col justify-between hover:border-[#D4AF37]/60 transition-all duration-300 relative group"
              >
                <div>
                  {/* Rating Stars & Quote Icon */}
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]"
                        />
                      ))}
                    </div>
                    <Quote className="w-5 h-5 text-[#D4AF37]/40 group-hover:text-[#D4AF37]/80 transition-colors" />
                  </div>

                  {/* Telugu Comment */}
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed font-sans font-medium mb-4 italic">
                    "{item.comment}"
                  </p>
                </div>

                {/* Anonymous Tag Footer */}
                <div className="pt-3 border-t border-[#D4AF37]/15 flex items-center justify-between">
                  <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-semibold bg-[#001030] px-2.5 py-1 rounded border border-[#D4AF37]/30">
                    {item.badge}
                  </span>
                  <span className="text-[10px] text-white/50 font-sans italic">
                    అనామక అభిప్రాయం (Anonymous)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#D4AF37]/20">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gold-gradient p-0.5">
                <div className="w-full h-full bg-[#001030] rounded-full flex items-center justify-center">
                  <Crown className="w-5 h-5 text-[#D4AF37]" />
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {siteInfo.businessName}
                </h3>
                <p className="text-[10px] text-[#D4AF37] font-semibold tracking-wider uppercase">
                  MACHERLA • Since {siteInfo.establishedYear} • Proprietor: {siteInfo.ownerName || 'Srinivasarao Kolisetty'}
                </p>
              </div>
            </div>

            <p className="font-serif italic text-[#F3E5AB] text-base font-normal">
              "{siteInfo.tagline}"
            </p>

            <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-md font-sans">
              Macherla's trusted bakery serving fresh celebration cakes, gateaux, brownies, breads, puffs, cool beverages, dry fruits, and dairy essentials daily.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#000d28] border border-[#D4AF37]/30 text-xs text-white/80 font-sans">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>100% Quality & Care Assurance</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3 font-sans">
            <h4 className="font-serif font-bold text-[#F3E5AB] text-base mb-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-[#D4AF37] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-[#D4AF37] transition-colors">
                  Product Categories
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tutorial')} className="hover:text-[#D4AF37] transition-colors text-[#D4AF37] font-semibold">
                  తెలుగు ట్యుటోరియల్ (Video Guide)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalogue')} className="hover:text-[#D4AF37] transition-colors">
                  In-Store Catalogue
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cakes')} className="hover:text-[#D4AF37] transition-colors">
                  Cake Models Gallery
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-[#D4AF37] transition-colors">
                  About Us & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#D4AF37] transition-colors">
                  Location & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Direct Phone */}
          <div className="lg:col-span-4 space-y-3 font-sans">
            <h4 className="font-serif font-bold text-[#F3E5AB] text-base mb-2">
              Store Details
            </h4>

            <div className="text-xs text-white/70 space-y-2.5">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  {siteInfo.address.line1}, {siteInfo.address.line2}, Macherla, Palnadu District, AP
                </span>
              </p>

              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <a href={`tel:${siteInfo.contactNumber}`} className="hover:text-[#D4AF37] font-semibold text-white">
                  {siteInfo.contactNumber}
                </a>
              </p>

              <div className="pt-2 flex items-center gap-3">
                <a
                  href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(
                    'Hello Parasakthi Bakery, I am inquiring from your website.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded bg-[#25D366] text-white text-xs font-semibold flex items-center gap-1.5 shadow"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Inquiry</span>
                </a>

                <button
                  onClick={onOpenAdmin}
                  className="px-3 py-2 rounded bg-[#000d28] border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-medium hover:border-[#D4AF37] flex items-center gap-1.5"
                >
                  <Lock className="w-3 h-3 text-[#D4AF37]" />
                  <span>Owner Login</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-3 text-center sm:text-left font-sans">
          <p>© {new Date().getFullYear()} {siteInfo.businessName}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for Macherla, Palnadu District</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
