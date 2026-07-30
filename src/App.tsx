import React, { useState } from 'react';
import { useBakeryStore } from './data/store';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CategoriesSection } from './components/CategoriesSection';
import { WebsiteTutorialSection } from './components/WebsiteTutorialSection';
import { ProductCatalogue } from './components/ProductCatalogue';
import { CakeGallery } from './components/CakeGallery';
import { AboutUsSection } from './components/AboutUsSection';
import { ContactLocationSection } from './components/ContactLocationSection';
import { FloatingActions } from './components/FloatingActions';
import { ImageLightboxModal } from './components/ImageLightboxModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { ShareModal } from './components/ShareModal';
import { CustomerReviewsSection } from './components/CustomerReviewsSection';
import { WhatsAppPriorityRedirectModal } from './components/WhatsAppPriorityRedirectModal';
import { Footer } from './components/Footer';
import { Product } from './types';

export default function App() {
  const {
    siteInfo,
    categories,
    products,
    cakeModels,
    saveProduct,
    deleteProduct,
    toggleProductVisibility,
    reorderProducts,
    saveCakeModel,
    deleteCakeModel,
    saveCategory,
    deleteCategory,
    updateSiteInfo,
    resetAll,
  } = useBakeryStore();

  // Navigation & View state
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Share Modal State
  const [shareData, setShareData] = useState<{
    isOpen: boolean;
    title: string;
    text: string;
    url: string;
  } | null>(null);

  // WhatsApp Priority Live Thanking Redirect State
  const [whatsappPriorityModal, setWhatsappPriorityModal] = useState<{
    isOpen: boolean;
    whatsappUrl: string;
    customMessageText?: string;
  } | null>(null);

  // Global Interceptor for all WhatsApp order links & Deep link handler
  React.useEffect(() => {
    // 1. Deep Link Direct Product / Cake Opening
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const prodId = urlParams.get('product');
      const cakeId = urlParams.get('cake');

      if (prodId) {
        const foundProd = products.find((p) => p.id === prodId || p.name.toLowerCase() === prodId.toLowerCase());
        if (foundProd) {
          const cat = categories.find((c) => c.id === foundProd.categoryId);
          setLightboxItem({
            name: foundProd.name,
            images: foundProd.images,
            shortDescription: foundProd.shortDescription,
            fullDescription: foundProd.fullDescription,
            price: foundProd.price,
            priceUnit: foundProd.priceUnit,
            showPrice: foundProd.showPrice,
            isAvailableInStore: foundProd.isAvailableInStore,
            categoryName: cat?.name || 'Bakery Product',
            id: foundProd.id,
          });
        }
      } else if (cakeId) {
        const foundCake = cakeModels.find((c) => c.id === cakeId || c.title.toLowerCase() === cakeId.toLowerCase());
        if (foundCake) {
          setLightboxItem({
            name: foundCake.title,
            images: foundCake.images,
            shortDescription: foundCake.description,
            categoryName: foundCake.type,
            id: foundCake.id,
          });
        }
      }
    } catch (e) {
      console.warn('Deep link parsing error', e);
    }

    // 2. Intercept WhatsApp links for VIP thanking modal
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      if (anchor && anchor.href && anchor.href.includes('wa.me')) {
        e.preventDefault();
        e.stopPropagation();
        const rawHref = anchor.href;
        let customText = '';
        try {
          const urlObj = new URL(rawHref);
          customText = urlObj.searchParams.get('text') || '';
        } catch (err) {
          // ignore
        }

        setWhatsappPriorityModal({
          isOpen: true,
          whatsappUrl: rawHref,
          customMessageText: customText,
        });
      }
    };

    document.addEventListener('click', handleGlobalClick, true);
    return () => document.removeEventListener('click', handleGlobalClick, true);
  }, [products, categories, cakeModels]);

  // Modals state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<{
    name: string;
    images: string[];
    shortDescription: string;
    fullDescription?: string;
    categoryName?: string;
    isAvailableInStore?: boolean;
    price?: number;
    priceUnit?: string;
    showPrice?: boolean;
  } | null>(null);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
    scrollToSection('catalogue');
  };

  const handleOpenProductLightbox = (product: Product) => {
    const catObj = categories.find((c) => c.id === product.categoryId);
    setLightboxItem({
      name: product.name,
      images: product.images,
      shortDescription: product.shortDescription,
      fullDescription: product.fullDescription,
      categoryName: catObj?.name,
      isAvailableInStore: product.isAvailableInStore,
      price: product.price,
      priceUnit: product.priceUnit,
      showPrice: product.showPrice,
    });
  };

  const handleShareWebsite = () => {
    setShareData({
      isOpen: true,
      title: `${siteInfo.businessName} Macherla`,
      text: `Explore Parasakthi Bakery Macherla's fresh celebration cakes, gateaux, bakery treats, cool beverages & dairy products! Proprietor: ${siteInfo.ownerName || 'Srinivasarao Kolisetty'}`,
      url: window.location.href,
    });
  };

  const handleShareProduct = (productName: string, description: string) => {
    setShareData({
      isOpen: true,
      title: `${productName} - ${siteInfo.businessName}`,
      text: `Check out "${productName}" from Parasakthi Bakery Macherla! ${description}`,
      url: window.location.href,
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E293B] flex flex-col font-sans selection:bg-[#D4AF37]/30 selection:text-[#0F2C59]">
      
      {/* Top Navbar */}
      <Navbar
        siteInfo={siteInfo}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenSearch={() => scrollToSection('catalogue')}
        onShareWebsite={handleShareWebsite}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* 1. Hero Section */}
        <HeroSection
          siteInfo={siteInfo}
          onExploreClick={() => scrollToSection('catalogue')}
          onContactClick={() => scrollToSection('contact')}
          onShareWebsite={handleShareWebsite}
        />

        {/* 2. Categories Grid */}
        <CategoriesSection
          categories={categories}
          products={products}
          onSelectCategory={handleSelectCategory}
        />

        {/* 2.5 Telugu Website Navigation Tutorial Video */}
        <WebsiteTutorialSection
          onNavigateToSection={scrollToSection}
          contactNumber={siteInfo.contactNumber}
          whatsappNumber={siteInfo.whatsappNumber}
        />

        {/* 3. Product Catalogue */}
        <ProductCatalogue
          products={products}
          categories={categories}
          siteInfo={siteInfo}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={setSelectedCategoryId}
          onOpenLightbox={handleOpenProductLightbox}
          onShareProduct={handleShareProduct}
        />

        {/* 4. Cake Models Gallery */}
        <CakeGallery
          cakeModels={cakeModels}
          siteInfo={siteInfo}
          onOpenLightbox={(item) => setLightboxItem(item)}
          onShareProduct={handleShareProduct}
        />

        {/* 5. About Us & Heritage */}
        <AboutUsSection siteInfo={siteInfo} />

        {/* 5.5 Customer Reviews & Word of Love (Nearby & Non-Local) */}
        <CustomerReviewsSection siteInfo={siteInfo} />

        {/* 6. Contact & Google Location */}
        <ContactLocationSection siteInfo={siteInfo} />

      </main>

      {/* Footer */}
      <Footer
        siteInfo={siteInfo}
        onNavigate={scrollToSection}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Floating Action Buttons (Phone & WhatsApp) */}
      <FloatingActions siteInfo={siteInfo} />

      {/* Image Lightbox Zoom Modal */}
      <ImageLightboxModal
        isOpen={!!lightboxItem}
        onClose={() => setLightboxItem(null)}
        item={lightboxItem}
        siteInfo={siteInfo}
        onShareItem={handleShareProduct}
      />

      {/* Share Web Page / Product Modal */}
      {shareData && (
        <ShareModal
          isOpen={shareData.isOpen}
          onClose={() => setShareData(null)}
          title={shareData.title}
          text={shareData.text}
          url={shareData.url}
        />
      )}

      {/* WhatsApp Priority Live Thanking Redirect Modal */}
      {whatsappPriorityModal && (
        <WhatsAppPriorityRedirectModal
          isOpen={whatsappPriorityModal.isOpen}
          whatsappUrl={whatsappPriorityModal.whatsappUrl}
          customMessageText={whatsappPriorityModal.customMessageText}
          ownerName={siteInfo.ownerName}
          onClose={() => setWhatsappPriorityModal(null)}
        />
      )}

      {/* Owner Admin Management Panel */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        siteInfo={siteInfo}
        products={products}
        categories={categories}
        cakeModels={cakeModels}
        onSaveProduct={saveProduct}
        onDeleteProduct={deleteProduct}
        onToggleProductVisibility={toggleProductVisibility}
        onReorderProducts={reorderProducts}
        onSaveCakeModel={saveCakeModel}
        onDeleteCakeModel={deleteCakeModel}
        onSaveCategory={saveCategory}
        onDeleteCategory={deleteCategory}
        onUpdateSiteInfo={updateSiteInfo}
        onResetAll={resetAll}
      />

    </div>
  );
}
