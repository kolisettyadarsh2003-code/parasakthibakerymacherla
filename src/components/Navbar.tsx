import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MessageCircle, 
  Lock, 
  Menu, 
  X, 
  MapPin, 
  Search, 
  Store,
  Crown,
  ChevronRight,
  Share2
} from 'lucide-react';
import { SiteInfo } from '../types';

interface NavbarProps {
  siteInfo: SiteInfo;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenAdmin: () => void;
  onOpenSearch: () => void;
  onShareWebsite?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  siteInfo,
  activeSection,
  onNavigate,
  onOpenAdmin,
  onOpenSearch,
  onShareWebsite,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'categories', label: 'Categories' },
    { id: 'tutorial', label: 'తెలుగు వీడియో' },
    { id: 'catalogue', label: 'Products' },
    { id: 'cakes', label: 'Cake Gallery' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact & Location' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const formattedWhatsapp = siteInfo.whatsappNumber.replace(/[^0-9]/g, '');

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-[#000d28] text-[#F3E5AB] text-xs py-2 px-4 border-b border-[#D4AF37]/20 flex flex-wrap justify-between items-center gap-2">
        <div className="container mx-auto flex flex-wrap justify-between items-center text-center sm:text-left gap-2">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="inline-flex items-center gap-1 bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded text-[10px] font-semibold tracking-widest uppercase border border-[#D4AF37]/30">
              Since {siteInfo.establishedYear}
            </span>
            <span className="text-[#E2E8F0] font-medium hidden sm:inline text-xs tracking-wide">
              {siteInfo.tagline}
            </span>
          </div>

          <div className="flex items-center gap-4 mx-auto sm:mx-0">
            <a 
              href={`tel:${siteInfo.contactNumber}`}
              className="flex items-center gap-1.5 text-[#E2E8F0] hover:text-[#D4AF37] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-medium">{siteInfo.contactNumber}</span>
            </a>
            <span className="text-[#D4AF37]/40 hidden md:inline">•</span>
            <div className="hidden md:flex items-center gap-1.5 text-[#CBD5E1]">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Under HDFC Bank, Main Road, Macherla</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#001030]/95 backdrop-blur-md shadow-xl border-b border-[#D4AF37]/30 py-3'
            : 'bg-[#001030] py-4 border-b border-[#D4AF37]/30'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo & Brand Title */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 text-left group"
          >
            <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center text-[#001030] font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-300">
              <Crown className="w-5 h-5 text-[#001030]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-wide text-white group-hover:text-[#D4AF37] transition-colors">
                  {siteInfo.businessName}
                </span>
              </div>
              <p className="text-[#D4AF37] text-[10px] tracking-widest uppercase font-semibold">
                Quality • Care • Love • Since {siteInfo.establishedYear}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-widest">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-all relative py-1 font-semibold ${
                  activeSection === link.id
                    ? 'text-[#D4AF37] border-b border-[#D4AF37]'
                    : 'text-white/80 hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-[#E2E8F0] hover:text-[#D4AF37] bg-[#0A192F]/80 hover:bg-[#0A192F] border border-[#D4AF37]/30 rounded-lg transition-all"
              title="Search Catalogue"
              aria-label="Search Catalogue"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Share Website Button */}
            {onShareWebsite && (
              <button
                onClick={onShareWebsite}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 border border-[#D4AF37] text-[#F3E5AB] text-xs font-bold transition-all hover:scale-105 cursor-pointer shadow-sm"
                title="Share Website Link"
              >
                <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="hidden md:inline">Share Page</span>
              </button>
            )}

            {/* Direct WhatsApp Action */}
            <a
              href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(
                'Hello Parasakthi Bakery, I would like to inquire about your bakery items/cakes.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-semibold shadow-md transition-all hover:scale-105"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>

            {/* Owner Admin Lock Button */}
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#F3E5AB] text-xs font-semibold transition-all hover:border-[#D4AF37]"
              title="Owner Portal"
            >
              <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Owner Portal</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#FAF8F5] hover:text-[#D4AF37] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#0A192F] border-b border-[#D4AF37]/30 px-4 pt-3 pb-6 mt-3 shadow-2xl animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-left text-sm transition-all ${
                    activeSection === link.id
                      ? 'bg-[#D4AF37]/20 text-[#F3E5AB] font-semibold border border-[#D4AF37]/40'
                      : 'text-[#E2E8F0] hover:bg-[#0F2C59] hover:text-[#F3E5AB]'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </button>
              ))}

              <div className="pt-3 mt-2 border-t border-[#D4AF37]/20 flex flex-col gap-2.5">
                <a
                  href={`tel:${siteInfo.contactNumber}`}
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#0F2C59] border border-[#D4AF37]/30 text-[#F3E5AB] text-sm font-medium"
                >
                  <Phone className="w-4 h-4 text-[#D4AF37]" />
                  <span>Call {siteInfo.contactNumber}</span>
                </a>

                <a
                  href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(
                    'Hello Parasakthi Bakery, I would like to inquire about your products.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#25D366] text-white text-sm font-semibold shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
