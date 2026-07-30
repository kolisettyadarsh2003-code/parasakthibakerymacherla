import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Phone, 
  MessageCircle, 
  Store, 
  Eye, 
  Sparkles, 
  X,
  ChevronDown,
  Share2,
  Tag
} from 'lucide-react';
import { Product, Category, SiteInfo } from '../types';
import { ImageWithBakeryFallback } from './ImageWithBakeryFallback';

interface ProductCatalogueProps {
  products: Product[];
  categories: Category[];
  siteInfo: SiteInfo;
  selectedCategoryId: string | null;
  onSelectCategory: (categoryId: string | null) => void;
  onOpenLightbox: (product: Product) => void;
  onShareProduct?: (productName: string, description: string) => void;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  products,
  categories,
  siteInfo,
  selectedCategoryId,
  onSelectCategory,
  onOpenLightbox,
  onShareProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<'ALL' | 'FEATURED' | 'AVAILABLE'>('ALL');
  const [sortBy, setSortBy] = useState<'NEWEST' | 'FEATURED' | 'NAME'>('FEATURED');

  const formattedWhatsapp = siteInfo.whatsappNumber.replace(/[^0-9]/g, '');

  // Filter and search logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => !p.hidden)
      .filter((p) => {
        // Category filter
        if (selectedCategoryId && p.categoryId !== selectedCategoryId) {
          return false;
        }

        // Availability / Featured filter
        if (availabilityFilter === 'FEATURED' && !p.isFeatured) return false;
        if (availabilityFilter === 'AVAILABLE' && !p.isAvailableInStore) return false;

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.shortDescription.toLowerCase().includes(q);
          const matchCat = categories.find((c) => c.id === p.categoryId)?.name.toLowerCase().includes(q);
          return matchName || matchDesc || matchCat;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'NEWEST') return b.createdAt - a.createdAt;
        if (sortBy === 'NAME') return a.name.localeCompare(b.name);
        // Default FEATURED first
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        return a.sortOrder - b.sortOrder;
      });
  }, [products, categories, selectedCategoryId, availabilityFilter, searchQuery, sortBy]);

  const activeCategoryName = useMemo(() => {
    if (!selectedCategoryId) return 'All Products';
    return categories.find((c) => c.id === selectedCategoryId)?.name || 'All Products';
  }, [selectedCategoryId, categories]);

  return (
    <section id="catalogue" className="py-16 md:py-24 bg-[#FCF9F2]">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] bg-white px-3.5 py-1 rounded-full border border-[#D4AF37]/30 inline-block mb-3 shadow-xs">
            In-Store Visual Catalogue
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#001030] mb-4">
            Our Fresh Bakery Collection
          </h2>
          <div className="h-1 w-20 gold-gradient mx-auto mb-4"></div>
          <p className="text-gray-600 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed font-sans">
            Browse our fresh handcrafted cakes, baked goods, beverages, dry fruits, and seasonal delights. Visit our Macherla store or call to reserve your items.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div className="bg-white rounded-lg p-4 sm:p-6 border border-[#001030]/5 card-shadow mb-10 max-w-6xl mx-auto space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cakes, cookies, puffs, dry fruits..."
                className="w-full pl-10 pr-10 py-2.5 rounded-md border border-gray-200 bg-[#FCF9F2]/50 text-xs focus:bg-white focus:outline-none focus:border-[#D4AF37] transition-all text-[#001030]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Availability Filter & Sort Dropdown */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex rounded-md p-1 bg-[#FCF9F2] border border-[#001030]/10 text-xs font-semibold">
                <button
                  onClick={() => setAvailabilityFilter('ALL')}
                  className={`px-3 py-1.5 rounded text-[11px] uppercase tracking-wider transition-all ${
                    availabilityFilter === 'ALL'
                      ? 'bg-[#001030] text-[#F3E5AB] shadow-xs'
                      : 'text-gray-600 hover:text-[#001030]'
                  }`}
                >
                  All Items
                </button>
                <button
                  onClick={() => setAvailabilityFilter('FEATURED')}
                  className={`px-3 py-1.5 rounded text-[11px] uppercase tracking-wider transition-all ${
                    availabilityFilter === 'FEATURED'
                      ? 'bg-[#001030] text-[#F3E5AB] shadow-xs'
                      : 'text-gray-600 hover:text-[#001030]'
                  }`}
                >
                  Featured
                </button>
                <button
                  onClick={() => setAvailabilityFilter('AVAILABLE')}
                  className={`px-3 py-1.5 rounded text-[11px] uppercase tracking-wider transition-all ${
                    availabilityFilter === 'AVAILABLE'
                      ? 'bg-[#001030] text-[#F3E5AB] shadow-xs'
                      : 'text-gray-600 hover:text-[#001030]'
                  }`}
                >
                  In Store
                </button>
              </div>

              {/* Sort selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="py-2 px-3 rounded-md border border-gray-200 bg-[#FCF9F2]/50 text-xs font-semibold text-[#001030] focus:outline-none focus:border-[#D4AF37]"
              >
                <option value="FEATURED">Sort: Featured</option>
                <option value="NEWEST">Sort: Newest</option>
                <option value="NAME">Sort: Alphabetical</option>
              </select>
            </div>
          </div>

          {/* Category Pill Buttons */}
          <div className="pt-3 border-t border-gray-100 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            <button
              onClick={() => onSelectCategory(null)}
              className={`px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategoryId === null
                  ? 'bg-[#001030] text-[#D4AF37] shadow-xs'
                  : 'bg-[#FCF9F2] text-gray-700 hover:bg-[#001030]/5 border border-gray-200'
              }`}
            >
              All ({products.filter((p) => !p.hidden).length})
            </button>

            {categories.map((cat) => {
              const catCount = products.filter(
                (p) => p.categoryId === cat.id && !p.hidden
              ).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => onSelectCategory(cat.id)}
                  className={`px-4 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCategoryId === cat.id
                      ? 'bg-[#001030] text-[#D4AF37] shadow-xs'
                      : 'bg-[#FCF9F2] text-gray-700 hover:bg-[#001030]/5 border border-gray-200'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="opacity-70 text-[10px]">({catCount})</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Filter Bar Summary */}
        <div className="flex items-center justify-between max-w-6xl mx-auto mb-6 px-2">
          <p className="text-xs font-semibold text-[#001030]">
            Showing <span className="text-[#C5A059] font-bold">{filteredProducts.length}</span> items in{' '}
            <span className="font-serif italic text-sm text-[#001030]">"{activeCategoryName}"</span>
          </p>

          {(selectedCategoryId || searchQuery || availabilityFilter !== 'ALL') && (
            <button
              onClick={() => {
                onSelectCategory(null);
                setSearchQuery('');
                setAvailabilityFilter('ALL');
              }}
              className="text-xs text-[#001030] hover:text-[#D4AF37] underline font-medium"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-[#001030]/5 max-w-xl mx-auto my-12 card-shadow">
            <div className="w-16 h-16 rounded-full bg-[#001030]/5 text-[#001030] flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#C5A059]" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#001030] mb-2">No Items Found</h3>
            <p className="text-gray-500 text-xs mb-6">
              No matching items match your search term or selected filters.
            </p>
            <button
              onClick={() => {
                onSelectCategory(null);
                setSearchQuery('');
                setAvailabilityFilter('ALL');
              }}
              className="px-6 py-2.5 gold-gradient text-[#001030] text-xs font-bold uppercase tracking-widest rounded-sm"
            >
              View Full Collection
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {filteredProducts.map((product) => {
              const catObj = categories.find((c) => c.id === product.categoryId);
              const mainImg = product.images[0] || '';

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg border border-[#001030]/5 card-shadow hover:border-[#D4AF37]/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Image Container with Zoom overlay */}
                    <div className="relative aspect-[4/3] bg-[#001030] overflow-hidden cursor-pointer" onClick={() => onOpenLightbox(product)}>
                      <ImageWithBakeryFallback
                        src={mainImg}
                        alt={product.name}
                        title={product.name}
                        category={catObj?.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Overlay Badges */}
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
                        {product.isFeatured ? (
                          <span className="bg-[#001030] text-[#F3E5AB] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border border-[#D4AF37]/50 shadow-md flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                            Featured
                          </span>
                        ) : <span />}

                        {product.isAvailableInStore && (
                          <span className="bg-[#25D366] text-[#001030] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded shadow-md flex items-center gap-1">
                            <Store className="w-3 h-3" />
                            In Store
                          </span>
                        )}
                      </div>

                      {/* Hover Quick Zoom Cue */}
                      <div className="absolute inset-0 bg-[#001030]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="bg-white text-[#001030] text-xs font-bold px-3 py-1.5 rounded shadow flex items-center gap-1.5">
                          <Eye className="w-4 h-4 text-[#D4AF37]" />
                          View Item
                        </span>
                      </div>
                    </div>

                    {/* Product Content Body */}
                    <div className="p-5">
                      <div className="flex items-center justify-between text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest mb-1">
                        <span>
                          {catObj?.name || 'Bakery Item'}
                          {product.cakeType && <span className="text-gray-400 font-normal"> • {product.cakeType}</span>}
                        </span>

                        {/* Share Button on Top Right of Card */}
                        {onShareProduct && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onShareProduct(product.name, product.shortDescription);
                            }}
                            className="p-1 rounded text-slate-400 hover:text-[#001030] hover:bg-[#D4AF37]/20 transition-colors cursor-pointer"
                            title="Share this product"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <h3 
                        onClick={() => onOpenLightbox(product)}
                        className="font-serif text-xl font-bold text-[#001030] group-hover:text-[#C5A059] transition-colors line-clamp-1 cursor-pointer mb-2"
                      >
                        {product.name}
                      </h3>

                      <p className="text-gray-500 text-xs line-clamp-2 leading-relaxed mb-3 font-sans">
                        {product.shortDescription}
                      </p>

                      {/* Pricing Section (Controlled per product & globally) */}
                      {siteInfo.globalShowPrices !== false && product.showPrice !== false && product.price ? (
                        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Price</span>
                          <span className="text-sm font-bold text-[#001030] bg-[#FCF9F2] px-2.5 py-0.5 rounded border border-[#D4AF37]/40 flex items-center gap-1 font-mono">
                            <Tag className="w-3 h-3 text-[#C5A059]" />
                            ₹{product.price} <span className="text-[10px] text-gray-500 font-sans font-normal">{product.priceUnit || ''}</span>
                          </span>
                        </div>
                      ) : (
                        <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
                          <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Pricing</span>
                          <span className="text-[11px] font-semibold text-[#C5A059] bg-[#FCF9F2] px-2 py-0.5 rounded border border-[#D4AF37]/30">
                            Inquire for Price
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Action Buttons (Phone, WhatsApp & Share) */}
                  <div className="p-4 bg-[#FCF9F2] border-t border-gray-100 grid grid-cols-3 gap-1.5">
                    <a
                      href={`tel:${siteInfo.contactNumber}`}
                      className="py-2 px-2 rounded bg-white hover:bg-[#001030] border border-gray-200 hover:border-[#001030] text-[#001030] hover:text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-all"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Call</span>
                    </a>

                    <a
                      href={`https://wa.me/${formattedWhatsapp}?text=${encodeURIComponent(
                        `నమస్కారం! Hello Parasakthi Bakery (Srinivasarao garu),\n\nI am interested in ordering / inquiring about:\n🎂 Item: *${product.name}*\n${product.price ? `💰 Listed Price: ₹${product.price} ${product.priceUnit || ''}\n` : ''}📝 Requirement: ${product.shortDescription || 'Please share price, availability and delivery details.'}\n\n🔗 *Direct Product Link:* ${typeof window !== 'undefined' ? window.location.origin + window.location.pathname : ''}?product=${encodeURIComponent(product.id)}#catalogue`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2 rounded bg-[#25D366] hover:bg-[#20bd5a] text-white text-[11px] font-semibold flex items-center justify-center gap-1 transition-all shadow-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>

                    {onShareProduct ? (
                      <button
                        onClick={() => onShareProduct(product.name, product.shortDescription)}
                        className="py-2 px-2 rounded bg-[#001030] hover:bg-[#001840] text-[#F3E5AB] text-[11px] font-semibold flex items-center justify-center gap-1 transition-all border border-[#D4AF37]/40 cursor-pointer"
                        title="Share with family"
                      >
                        <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Share</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenLightbox(product)}
                        className="py-2 px-2 rounded bg-[#001030] hover:bg-[#001840] text-[#F3E5AB] text-[11px] font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>View</span>
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
