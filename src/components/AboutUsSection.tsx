import React from 'react';
import { Crown, Heart, ShieldCheck, Award, Sparkles, Clock, CheckCircle2 } from 'lucide-react';
import { SiteInfo } from '../types';

interface AboutUsSectionProps {
  siteInfo: SiteInfo;
}

export const AboutUsSection: React.FC<AboutUsSectionProps> = ({ siteInfo }) => {
  const highlights = [
    {
      title: 'Serving Since 2007',
      description: 'Over 18 years of unwavering dedication to baking perfection in Macherla.',
      icon: Clock,
    },
    {
      title: '100% Fresh Daily',
      description: 'Baked fresh every morning with pure butter, fresh dairy, and finest flour.',
      icon: Sparkles,
    },
    {
      title: 'Hygiene & Quality First',
      description: 'Strict clean-room baking standards and quality checks on every item.',
      icon: ShieldCheck,
    },
    {
      title: 'Affordable Family Value',
      description: 'Premium gourmet taste priced fairly so every family celebration feels special.',
      icon: Award,
    },
  ];

  return (
    <section id="about" className="py-16 md:py-24 bg-[#FCF9F2] border-b border-[#D4AF37]/20">
      <div className="container mx-auto px-4">
        
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Decorative Cards / Heritage Visual */}
          <div className="relative">
            <div className="bg-[#001030] rounded-lg p-8 text-white border border-[#D4AF37]/40 card-shadow relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded bg-[#000d28] border border-[#D4AF37]/40 text-[#D4AF37] text-xs font-semibold uppercase tracking-wider mb-6">
                <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Macherla’s Heritage Bakery</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                Crafting Moments of Pure Joy & Celebration
              </h3>

              <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-8 font-sans">
                At Parasakthi Bakery, we believe that every milestone deserves a slice of sweetness. Since opening our doors under HDFC Bank on Main Road in 2007, we have earned the trust of thousands of families across Palnadu District.
              </p>

              <div className="space-y-3 pt-4 border-t border-[#D4AF37]/20 text-xs font-medium font-sans">
                <div className="flex items-center gap-2.5 text-[#F3E5AB]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Handcrafted Celebration Cakes & Fondant Artistry</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#F3E5AB]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Fresh Morning Breads, Buns, & Crispy Savory Puffs</span>
                </div>
                <div className="flex items-center gap-2.5 text-[#F3E5AB]">
                  <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
                  <span>Handpicked Premium Dry Fruits & Pure Dairy Essentials</span>
                </div>
              </div>
            </div>

            {/* Badge Floating */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white rounded-lg p-4 card-shadow border border-[#D4AF37] hidden sm:flex items-center gap-3">
              <div className="w-12 h-12 rounded gold-gradient flex items-center justify-center text-[#001030]">
                <Heart className="w-6 h-6 fill-[#001030]" />
              </div>
              <div>
                <div className="font-serif font-bold text-[#001030] text-base">Trusted by Thousands</div>
                <div className="text-xs text-gray-500 font-sans">Quality, Care & Love</div>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] block mb-2">
              Our Story & Promise
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#001030] mb-4">
              A Blend of Quality, Care & Love with Trust.
            </h2>
            <div className="h-1 w-20 gold-gradient mb-6"></div>

            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
              Founded in 2007 under the vision and dedication of proprietary owner <strong className="text-[#001030] font-bold">{siteInfo.ownerName || 'Srinivasarao Kolisetty'}</strong>, Parasakthi Bakery has grown into Macherla's premier destination for custom celebration cakes and daily baked delicacies. Under his leadership, we strictly source Grade-A raw materials, fresh farm milk, and pure butter to guarantee clean, delicious taste for every family.
            </p>

            {/* Owner Leadership Highlight Card */}
            <div className="bg-[#001030] text-white p-4 rounded-xl border border-[#D4AF37]/50 mb-8 flex items-center gap-3.5 shadow-md">
              <div className="w-12 h-12 rounded-full gold-gradient p-0.5 shrink-0">
                <div className="w-full h-full bg-[#000d28] rounded-full flex items-center justify-center text-[#F3E5AB]">
                  <Crown className="w-6 h-6 text-[#D4AF37]" />
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#D4AF37] font-mono uppercase tracking-widest font-bold">
                  PROPRIETARY OWNER & MANAGEMENT
                </p>
                <h4 className="font-serif font-bold text-base text-[#F3E5AB]">
                  {siteInfo.ownerName || 'Srinivasarao Kolisetty'}
                </h4>
                <p className="text-[11px] text-slate-300 font-sans">
                  Steering Parasakthi Bakery Macherla with quality, trust & personal customer care since 2007.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="bg-white p-4 rounded-lg border border-[#001030]/5 card-shadow flex items-start gap-3">
                    <div className="p-2.5 rounded bg-[#FCF9F2] border border-[#D4AF37]/30 text-[#001030] shrink-0">
                      <IconComponent className="w-5 h-5 text-[#C5A059]" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-[#001030] text-base mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed font-sans">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
