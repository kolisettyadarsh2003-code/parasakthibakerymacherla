import React, { useState } from 'react';
import { CustomerReview, SiteInfo } from '../types';
import { initialReviews } from '../data/initialData';
import { Star, MapPin, CheckCircle2, MessageSquare, Quote, Heart, Award, Sparkles } from 'lucide-react';

interface CustomerReviewsSectionProps {
  siteInfo: SiteInfo;
  customReviews?: CustomerReview[];
}

export const CustomerReviewsSection: React.FC<CustomerReviewsSectionProps> = ({
  siteInfo,
  customReviews,
}) => {
  const reviews = customReviews && customReviews.length > 0 ? customReviews : initialReviews;
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'TOURIST' | 'NEARBY' | 'ONLINE'>('ALL');

  const filteredReviews = reviews.filter((rev) => {
    if (selectedFilter === 'TOURIST') {
      return rev.location.includes('Nagarjuna Sagar') || rev.location.includes('Hyderabad') || rev.location.includes('Highway');
    }
    if (selectedFilter === 'NEARBY') {
      return rev.location.includes('Gurazala') || rev.location.includes('Rentachintala') || rev.location.includes('Guntur');
    }
    if (selectedFilter === 'ONLINE') {
      return rev.location.includes('Vijayawada') || rev.location.includes('WhatsApp');
    }
    return true;
  });

  return (
    <section id="reviews" className="py-16 md:py-24 bg-[#FCF9F2] border-b border-amber-200/80">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#001030] text-[#F3E5AB] text-xs font-bold uppercase tracking-widest mb-3 shadow-md border border-[#D4AF37]">
            <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Trusted Across Palnadu & Nearby Regions</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#001030] mb-3">
            Customer Reviews & Words of Love
          </h2>
          <p className="text-sm font-semibold text-[#C5A059] mb-2 font-serif">
            మాచర్ల మరియు చుట్టుపక్కల ప్రాంతాల కస్టమర్ల ప్రేమ మరియు అభిప్రాయాలు
          </p>

          <p className="text-xs sm:text-sm text-gray-600 font-sans leading-relaxed">
            Real feedback from local residents, highway travelers, Nagarjuna Sagar tourists, and families across Gurazala, Rentachintala, Piduguralla, Guntur, Vijayawada & Hyderabad.
          </p>
          <div className="h-1 w-24 gold-gradient mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Location Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setSelectedFilter('ALL')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === 'ALL'
                ? 'bg-[#001030] text-[#F3E5AB] shadow-md border border-[#D4AF37]'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Reviews ({reviews.length})
          </button>
          <button
            onClick={() => setSelectedFilter('TOURIST')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === 'TOURIST'
                ? 'bg-[#001030] text-[#F3E5AB] shadow-md border border-[#D4AF37]'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            ✈️ Nagarjuna Sagar & Hyderabad Tourists
          </button>
          <button
            onClick={() => setSelectedFilter('NEARBY')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === 'NEARBY'
                ? 'bg-[#001030] text-[#F3E5AB] shadow-md border border-[#D4AF37]'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            🏡 Gurazala & Rentachintala Residents
          </button>
          <button
            onClick={() => setSelectedFilter('ONLINE')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              selectedFilter === 'ONLINE'
                ? 'bg-[#001030] text-[#F3E5AB] shadow-md border border-[#D4AF37]'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            📱 Online & Vijayawada Custom Orders
          </button>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl border border-amber-200/90 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group"
            >
              <Quote className="w-8 h-8 text-[#D4AF37]/20 absolute top-4 right-4" />

              <div>
                {/* Header Info */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-base text-[#001030] font-serif flex items-center gap-1.5">
                      <span>{review.customerName}</span>
                      {review.verifiedCustomer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 shrink-0" title="Verified Customer" />
                      )}
                    </h3>
                    
                    {/* Location Badge */}
                    <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#C5A059] bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80 mt-1">
                      <MapPin className="w-3 h-3 text-[#C5A059]" />
                      <span>{review.location}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-0.5 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Telugu Review Comment */}
                <div className="bg-[#FFFDF7] p-3 rounded-xl border border-amber-200/60 mb-3 space-y-1">
                  <p className="text-xs font-bold text-[#001030] font-sans leading-relaxed">
                    "{review.commentTelugu}"
                  </p>
                </div>

                {/* English Review Comment */}
                <p className="text-xs text-gray-600 font-sans leading-relaxed mb-4">
                  "{review.commentEnglish}"
                </p>
              </div>

              {/* Card Footer Tag */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                {review.purchasedItem && (
                  <span className="font-medium text-[#001030] bg-slate-100 px-2.5 py-0.5 rounded-md text-[10px]">
                    🎂 {review.purchasedItem}
                  </span>
                )}
                <span className="text-slate-400 text-[10px] ml-auto">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Guarantee Bar */}
        <div className="mt-12 bg-[#001030] text-white p-6 rounded-2xl border border-[#D4AF37]/50 shadow-xl flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full gold-gradient p-0.5 shrink-0">
              <div className="w-full h-full bg-[#000d28] rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </div>
            <div>
              <h4 className="font-serif font-bold text-base text-[#F3E5AB]">
                100% Quality & Priority Customer Satisfaction Guaranteed
              </h4>
              <p className="text-xs text-slate-300">
                Proprietor: <strong className="text-white">{siteInfo.ownerName || 'Srinivasarao Kolisetty'}</strong> • Macherla Main Road
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${siteInfo.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
              'Hello Parasakthi Bakery, I read your customer reviews and would like to order fresh cakes / bakery items!'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 gold-gradient text-[#001030] font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Order & Share Your Experience</span>
          </a>
        </div>

      </div>
    </section>
  );
};
