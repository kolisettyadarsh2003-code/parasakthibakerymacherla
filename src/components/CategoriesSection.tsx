import React from 'react';
import { 
  Cake, 
  Cookie, 
  UtensilsCrossed, 
  Coffee, 
  Sparkles, 
  Milk, 
  Gift, 
  Wheat,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { Category, Product } from '../types';

interface CategoriesSectionProps {
  categories: Category[];
  products: Product[];
  onSelectCategory: (categoryId: string) => void;
}

export const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  categories,
  products,
  onSelectCategory,
}) => {
  // Helper to get category icon
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cake': return <Cake className="w-6 h-6 text-[#D4AF37]" />;
      case 'Cookie': return <Cookie className="w-6 h-6 text-[#D4AF37]" />;
      case 'Wheat': return <Wheat className="w-6 h-6 text-[#D4AF37]" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-6 h-6 text-[#D4AF37]" />;
      case 'Coffee': return <Coffee className="w-6 h-6 text-[#D4AF37]" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-[#D4AF37]" />;
      case 'Milk': return <Milk className="w-6 h-6 text-[#D4AF37]" />;
      case 'Gift': return <Gift className="w-6 h-6 text-[#D4AF37]" />;
      default: return <Cake className="w-6 h-6 text-[#D4AF37]" />;
    }
  };

  return (
    <section id="categories" className="py-16 md:py-24 bg-[#FCF9F2] border-b border-[#D4AF37]/20">
      <div className="container mx-auto px-4">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 max-w-7xl mx-auto">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059] block mb-2">
              Our Fresh Offerings
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#001030]">
              Premium Categories
            </h2>
            <div className="h-1 w-20 gold-gradient mt-3"></div>
          </div>
          <p className="text-[#001030]/70 text-xs sm:text-sm max-w-md mt-4 md:mt-0 font-sans">
            From signature celebration cakes to daily oven-fresh snacks, beverages, dry fruits, and dairy essentials.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {categories.map((cat) => {
            const itemCount = products.filter(
              (p) => p.categoryId === cat.id && !p.hidden
            ).length;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group cursor-pointer bg-white rounded-lg p-6 border border-[#001030]/5 card-shadow hover:border-[#D4AF37]/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 gold-gradient opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#FCF9F2] border border-[#D4AF37]/30 flex items-center justify-center mb-5 group-hover:bg-[#001030] transition-colors duration-300">
                    <div className="group-hover:text-[#F3E5AB] transition-colors">
                      {getCategoryIcon(cat.icon)}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold text-[#001030] group-hover:text-[#C5A059] transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest bg-[#FCF9F2] px-2.5 py-1 rounded border border-[#D4AF37]/20">
                      {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </span>
                  </div>

                  <p className="text-gray-500 text-xs leading-relaxed mb-6 font-sans">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#001030]/5 flex items-center justify-between text-xs font-semibold text-[#001030] group-hover:text-[#C5A059] transition-colors">
                  <span className="uppercase tracking-widest text-[10px]">Explore Items</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#D4AF37]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
