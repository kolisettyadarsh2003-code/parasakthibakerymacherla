import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Key, 
  Plus, 
  Trash2, 
  Eye, 
  EyeOff, 
  Edit, 
  Upload, 
  Save, 
  RotateCcw, 
  Check, 
  AlertCircle,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Settings,
  Cake,
  ArrowUp,
  ArrowDown,
  ShieldAlert
} from 'lucide-react';
import { Product, Category, SiteInfo, CakeModel, CakeType } from '../types';
import { compressAndResizeImage } from '../utils/imagePlaceholder';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteInfo: SiteInfo;
  products: Product[];
  categories: Category[];
  cakeModels: CakeModel[];
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onToggleProductVisibility: (productId: string) => void;
  onReorderProducts: (products: Product[]) => void;
  onSaveCakeModel: (model: CakeModel) => void;
  onDeleteCakeModel: (modelId: string) => void;
  onSaveCategory: (category: Category) => void;
  onDeleteCategory: (categoryId: string) => void;
  onUpdateSiteInfo: (info: SiteInfo) => void;
  onResetAll: () => void;
}

const CAKE_TYPES: CakeType[] = [
  'Birthday Cakes',
  'Wedding Cakes',
  'Anniversary Cakes',
  'Fondant Cakes',
  'Theme Cakes',
  'Kids Cakes',
  'Custom Cakes',
];

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  siteInfo,
  products,
  categories,
  cakeModels,
  onSaveProduct,
  onDeleteProduct,
  onToggleProductVisibility,
  onReorderProducts,
  onSaveCakeModel,
  onDeleteCakeModel,
  onSaveCategory,
  onDeleteCategory,
  onUpdateSiteInfo,
  onResetAll,
}) => {
  // Dual Passcode Protection State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authStep, setAuthStep] = useState<1 | 2>(1);
  const [step1Passcode, setStep1Passcode] = useState('');
  const [step2Passcode, setStep2Passcode] = useState('');
  const [showPasscode1, setShowPasscode1] = useState(false);
  const [showPasscode2, setShowPasscode2] = useState(false);
  const [passcodeError, setPasscodeError] = useState('');

  // Active tab
  const [activeTab, setActiveTab] = useState<'PRODUCTS' | 'CAKES' | 'CATEGORIES' | 'SITE_INFO'>('PRODUCTS');

  // Product Form State
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [productImages, setProductImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  // Cake Model Form State
  const [editingCakeModel, setEditingCakeModel] = useState<Partial<CakeModel> | null>(null);

  // Category Form State
  const [editingCategory, setEditingCategory] = useState<Partial<Category> | null>(null);

  // Site Info Form State
  const [infoForm, setInfoForm] = useState<SiteInfo>(siteInfo);

  if (!isOpen) return null;

  // Handle Dual PIN / Passcode Authentication
  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasscodeError('');

    if (authStep === 1) {
      const primaryTarget = siteInfo.adminPasscodeHash || '2007';
      if (step1Passcode.trim() === primaryTarget) {
        setAuthStep(2);
        setStep1Passcode('');
        setPasscodeError('');
      } else {
        setPasscodeError('Primary Owner Password incorrect! Default Primary PIN is 2007.');
      }
    } else {
      const secondaryTarget = siteInfo.adminSecondaryPasscodeHash || '7777';
      if (step2Passcode.trim() === secondaryTarget) {
        setIsAuthenticated(true);
        setPasscodeError('');
      } else {
        setPasscodeError('Secondary Security Password incorrect! Default Secondary PIN is 7777.');
      }
    }
  };

// Image Upload Handler - Cloudinary Upload
const handleImageFiles = async (
  files: FileList | File[],
  isForCakeModel = false
) => {
  if (!files || files.length === 0) return;

  setIsUploading(true);
  setUploadStatus('Uploading images...');

  try {
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'upload_preset',
        'parasakthi_uploads'
      );

      const response = await fetch(
        'https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        uploadedUrls.push(data.secure_url);
      }
    }

    if (isForCakeModel && editingCakeModel) {
      setEditingCakeModel({
        ...editingCakeModel,
        images: [
          ...(editingCakeModel.images || []),
          ...uploadedUrls,
        ],
      });
    } else {
      setProductImages((prev) => [
        ...prev,
        ...uploadedUrls,
      ]);
    }

    setUploadStatus(
      `Successfully uploaded ${uploadedUrls.length} image(s)!`
    );

  } catch (error) {
    console.error(
      "Cloudinary upload error:",
      error
    );

    setUploadStatus(
      "Image upload failed"
    );

  } finally {
    setIsUploading(false);
  }
};
    if (!files || files.length === 0) return;
    setIsUploading(true);
    setUploadStatus('Compressing & optimizing images...');

    try {
      const compressedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const compressed = await compressAndResizeImage(file, 1000, 1000, 0.82);
        compressedUrls.push(compressed);
      }

      if (isForCakeModel && editingCakeModel) {
        setEditingCakeModel({
          ...editingCakeModel,
          images: [...(editingCakeModel.images || []), ...compressedUrls],
        });
      } else {
        setProductImages((prev) => [...prev, ...compressedUrls]);
      }
      setUploadStatus(`Successfully optimized ${compressedUrls.length} image(s)!`);
    } catch (err) {
      console.error(err);
      setUploadStatus('Error processing image. Please try a standard JPG/PNG.');
    } finally {
      setIsUploading(false);
    }
  };

  // Drag and drop handlers
  const handleDrop = (e: React.DragEvent, isForCakeModel = false) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageFiles(e.dataTransfer.files, isForCakeModel);
    }
  };

  // Save Product Submit
  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name || !editingProduct.categoryId) {
      alert('Please fill in Product Name and select a Category.');
      return;
    }

    const prodToSave: Product = {
      id: editingProduct.id || `prod-${Date.now()}`,
      name: editingProduct.name,
      categoryId: editingProduct.categoryId,
      shortDescription: editingProduct.shortDescription || '',
      fullDescription: editingProduct.fullDescription || '',
      images: productImages.length > 0 ? productImages : ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%230F2C59"><rect width="400" height="300" fill="%230F2C59"/><text x="50%" y="50%" fill="%23F3E5AB" font-family="sans-serif" font-size="16" text-anchor="middle">Photo Pending Upload</text></svg>'],
      isAvailableInStore: editingProduct.isAvailableInStore ?? true,
      isFeatured: editingProduct.isFeatured ?? false,
      cakeType: editingProduct.cakeType,
      sortOrder: editingProduct.sortOrder ?? products.length + 1,
      createdAt: editingProduct.createdAt || Date.now(),
      hidden: editingProduct.hidden ?? false,
    };

    onSaveProduct(prodToSave);
    setEditingProduct(null);
    setProductImages([]);
    setUploadStatus('Product saved successfully!');
  };

  // Move product up/down in sort order
  const moveProductOrder = (index: number, direction: 'UP' | 'DOWN') => {
    if ((direction === 'UP' && index === 0) || (direction === 'DOWN' && index === products.length - 1)) return;
    const targetIdx = direction === 'UP' ? index - 1 : index + 1;
    const reordered = [...products];
    const temp = reordered[index];
    reordered[index] = reordered[targetIdx];
    reordered[targetIdx] = temp;
    onReorderProducts(reordered);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-[#001030]/85 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-white rounded-lg overflow-hidden max-w-5xl w-full max-h-[92vh] flex flex-col card-shadow border border-[#D4AF37]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-[#001030] text-white p-4 sm:p-6 border-b border-[#D4AF37]/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#F3E5AB]" />
            </div>
            <div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-white">
                Parasakthi Bakery • Owner Admin Panel
              </h2>
              <p className="text-xs text-[#D4AF37] uppercase tracking-wider font-semibold font-sans">
                Manage Products, Cake Models, Categories & Store Info
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#000d28] hover:bg-slate-800 text-[#F3E5AB] flex items-center justify-center transition-all border border-[#D4AF37]/30 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unauthenticated Dual Passcode Protection */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto my-auto space-y-6 font-sans">
            <div className="w-16 h-16 rounded-2xl bg-[#001030] text-[#F3E5AB] flex items-center justify-center mx-auto border-2 border-[#D4AF37] shadow-lg">
              <ShieldAlert className="w-8 h-8 text-[#D4AF37]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-300 text-[#001030] text-[11px] font-bold uppercase tracking-wider mb-2">
                <Lock className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Step {authStep} of 2 • Double Password Protected</span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-[#001030] mb-1">
                {authStep === 1 ? 'Primary Owner Password' : 'Secondary Security Password'}
              </h3>
              <p className="text-xs text-gray-500">
                {authStep === 1
                  ? 'Step 1: Enter primary owner password. Default is 2007.'
                  : 'Step 2: Primary verified! Enter secondary security password. Default is 7777.'}
              </p>
            </div>

            <form onSubmit={handlePasscodeSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type={authStep === 1 ? (showPasscode1 ? 'text' : 'password') : (showPasscode2 ? 'text' : 'password')}
                  value={authStep === 1 ? step1Passcode : step2Passcode}
                  onChange={(e) =>
                    authStep === 1 ? setStep1Passcode(e.target.value) : setStep2Passcode(e.target.value)
                  }
                  placeholder={authStep === 1 ? 'Enter Primary Password (e.g. 2007)' : 'Enter Secondary Password (e.g. 7777)'}
                  className="w-full text-center tracking-widest text-lg py-3 px-10 rounded-xl border border-gray-300 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/30 font-mono font-bold"
                  maxLength={15}
                  autoFocus
                />

                <button
                  type="button"
                  onClick={() =>
                    authStep === 1 ? setShowPasscode1(!showPasscode1) : setShowPasscode2(!showPasscode2)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                >
                  {(authStep === 1 ? showPasscode1 : showPasscode2) ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {passcodeError && (
                <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200 flex items-center justify-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{passcodeError}</span>
                </div>
              )}

              <div className="flex gap-2">
                {authStep === 2 && (
                  <button
                    type="button"
                    onClick={() => {
                      setAuthStep(1);
                      setPasscodeError('');
                    }}
                    className="py-3 px-4 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Back
                  </button>
                )}

                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl gold-gradient text-[#001030] font-bold text-xs uppercase tracking-widest shadow-md hover:scale-[1.01] transition-transform cursor-pointer"
                >
                  {authStep === 1 ? 'Verify Step 1 → Next' : 'Unlock Admin Dashboard'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard View */
          <div className="flex-1 overflow-y-auto flex flex-col">
            
            {/* Admin Tabs */}
            <div className="bg-[#FAF8F5] border-b border-slate-200 px-4 pt-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
              <button
                onClick={() => setActiveTab('PRODUCTS')}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                  activeTab === 'PRODUCTS'
                    ? 'bg-white text-[#0F2C59] border-t-2 border-[#D4AF37] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Layers className="w-4 h-4 text-[#C5A059]" />
                <span>Products Catalogue ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('CAKES')}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                  activeTab === 'CAKES'
                    ? 'bg-white text-[#0F2C59] border-t-2 border-[#D4AF37] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Cake className="w-4 h-4 text-[#C5A059]" />
                <span>Cake Models Gallery ({cakeModels.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('CATEGORIES')}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                  activeTab === 'CATEGORIES'
                    ? 'bg-white text-[#0F2C59] border-t-2 border-[#D4AF37] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sparkles className="w-4 h-4 text-[#C5A059]" />
                <span>Categories ({categories.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('SITE_INFO')}
                className={`px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all ${
                  activeTab === 'SITE_INFO'
                    ? 'bg-white text-[#0F2C59] border-t-2 border-[#D4AF37] shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Settings className="w-4 h-4 text-[#C5A059]" />
                <span>Store Info & Banners</span>
              </button>
            </div>

            {/* Tab Body Content */}
            <div className="p-4 sm:p-6 flex-1 overflow-y-auto">
              
              {/* TAB 1: PRODUCTS MANAGER */}
              {activeTab === 'PRODUCTS' && (
                <div className="space-y-6">
                  
                  {/* Top Bar Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] p-4 rounded-2xl border border-slate-200">
                    <div>
                      <h3 className="font-serif-display font-bold text-[#0F2C59] text-lg">Product Items</h3>
                      <p className="text-xs text-slate-500">Add new products, upload images, feature or hide items.</p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingProduct({
                          name: '',
                          categoryId: categories[0]?.id || '',
                          shortDescription: '',
                          isAvailableInStore: true,
                          isFeatured: false,
                        });
                        setProductImages([]);
                      }}
                      className="px-4 py-2 rounded-xl gold-gradient-bg text-[#0A192F] font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Product</span>
                    </button>
                  </div>

                  {/* Add / Edit Product Form Modal Overlay */}
                  {editingProduct && (
                    <div className="bg-slate-50 p-6 rounded-2xl border-2 border-[#D4AF37]/50 shadow-lg space-y-4 animate-fade-in">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                        <h4 className="font-serif-display font-bold text-xl text-[#0F2C59]">
                          {editingProduct.id ? 'Edit Product' : 'Add New Product'}
                        </h4>
                        <button
                          onClick={() => setEditingProduct(null)}
                          className="text-slate-400 hover:text-slate-700"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleProductSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Product Name *</label>
                            <input
                              type="text"
                              required
                              value={editingProduct.name || ''}
                              onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                              placeholder="e.g. Royal Black Forest Cake"
                              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                            <select
                              value={editingProduct.categoryId || ''}
                              onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                              className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300 bg-white"
                            >
                              {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Cake Type Selection if category is Cakes */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Cake Type (Optional, for Cake Gallery)</label>
                          <select
                            value={editingProduct.cakeType || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, cakeType: e.target.value as any })}
                            className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300 bg-white"
                          >
                            <option value="">None (Standard Product)</option>
                            {CAKE_TYPES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
                          <textarea
                            rows={2}
                            value={editingProduct.shortDescription || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                            placeholder="Brief details about freshness, flavor, or ingredients..."
                            className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300 bg-white"
                          />
                        </div>

                        {/* Price Controls (Enable / Disable Pricing flexibility) */}
                        <div className="bg-amber-50/60 p-3 rounded-xl border border-amber-200/80 space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="text-xs font-bold text-[#0F2C59] flex items-center gap-1.5 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={editingProduct.showPrice ?? true}
                                onChange={(e) => setEditingProduct({ ...editingProduct, showPrice: e.target.checked })}
                                className="rounded border-slate-300 text-[#0F2C59] focus:ring-[#D4AF37]"
                              />
                              <span>Enable Price Display for this Product</span>
                            </label>
                            <span className="text-[10px] text-slate-500 font-medium">
                              {editingProduct.showPrice ? 'Price visible' : 'Shows "Price on Request"'}
                            </span>
                          </div>

                          {editingProduct.showPrice && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Price Amount (₹)</label>
                                <input
                                  type="number"
                                  min="0"
                                  value={editingProduct.price ?? ''}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || undefined })}
                                  placeholder="e.g. 450"
                                  className="w-full py-1.5 px-3 text-xs rounded-lg border border-slate-300 bg-white"
                                />
                              </div>
                              <div>
                                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Price Unit / Weight</label>
                                <input
                                  type="text"
                                  value={editingProduct.priceUnit || ''}
                                  onChange={(e) => setEditingProduct({ ...editingProduct, priceUnit: e.target.value })}
                                  placeholder="e.g. per kg, per piece, 1/2 kg"
                                  className="w-full py-1.5 px-3 text-xs rounded-lg border border-slate-300 bg-white"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Drag and drop image upload */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Product Images (Upload JPG/PNG/WEBP/HEIC)</label>
                          
                          <div
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => handleDrop(e, false)}
                            className="border-2 border-dashed border-slate-300 hover:border-[#D4AF37] rounded-xl p-4 text-center bg-white cursor-pointer transition-colors"
                          >
                            <Upload className="w-6 h-6 text-[#C5A059] mx-auto mb-1" />
                            <p className="text-xs font-semibold text-slate-700">Drag & Drop product photos here, or click to browse</p>
                            <p className="text-[10px] text-slate-400 mt-1">Automatic compression & cloud optimization</p>
                            <input
                              type="file"
                              multiple
                              accept="image/jpeg,image/png,image/webp,image/heic"
                              onChange={(e) => e.target.files && handleImageFiles(e.target.files, false)}
                              className="hidden"
                              id="product-file-input"
                            />
                            <label htmlFor="product-file-input" className="inline-block mt-2 px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-medium cursor-pointer">
                              Select Image Files
                            </label>
                          </div>

                          {uploadStatus && (
                            <p className="text-[11px] text-[#0F2C59] font-medium mt-1">{uploadStatus}</p>
                          )}

                          {/* Uploaded Images Preview Grid */}
                          {productImages.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {productImages.map((img, idx) => (
                                <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-300">
                                  <img src={img} alt="preview" className="w-full h-full object-cover" />
                                  <button
                                    type="button"
                                    onClick={() => setProductImages(productImages.filter((_, i) => i !== idx))}
                                    className="absolute top-0.5 right-0.5 bg-rose-600 text-white rounded-full p-0.5 text-[9px]"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* Checkbox Toggles */}
                        <div className="flex flex-wrap gap-4 pt-2">
                          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingProduct.isAvailableInStore ?? true}
                              onChange={(e) => setEditingProduct({ ...editingProduct, isAvailableInStore: e.target.checked })}
                              className="rounded border-slate-300 text-[#0F2C59] focus:ring-[#D4AF37]"
                            />
                            <span>Available in Store Today</span>
                          </label>

                          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingProduct.isFeatured ?? false}
                              onChange={(e) => setEditingProduct({ ...editingProduct, isFeatured: e.target.checked })}
                              className="rounded border-slate-300 text-[#0F2C59] focus:ring-[#D4AF37]"
                            />
                            <span>Feature on Homepage</span>
                          </label>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setEditingProduct(null)}
                            className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 rounded-xl bg-[#0F2C59] text-[#F3E5AB] text-xs font-bold shadow"
                          >
                            Save Product
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Products Table List */}
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-700">
                        <thead className="bg-slate-100 text-[#0F2C59] font-bold text-[11px] uppercase tracking-wider">
                          <tr>
                            <th className="p-3">Order</th>
                            <th className="p-3">Image</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">In Store</th>
                            <th className="p-3">Featured</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {products.map((prod, idx) => {
                            const catName = categories.find((c) => c.id === prod.categoryId)?.name || 'General';

                            return (
                              <tr key={prod.id} className={`hover:bg-slate-50 ${prod.hidden ? 'opacity-50' : ''}`}>
                                <td className="p-3 font-mono">
                                  <div className="flex items-center gap-1">
                                    <button
                                      onClick={() => moveProductOrder(idx, 'UP')}
                                      disabled={idx === 0}
                                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                                    >
                                      <ArrowUp className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => moveProductOrder(idx, 'DOWN')}
                                      disabled={idx === products.length - 1}
                                      className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20"
                                    >
                                      <ArrowDown className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>

                                <td className="p-3">
                                  <img
                                    src={prod.images[0] || ''}
                                    alt={prod.name}
                                    className="w-10 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200"
                                  />
                                </td>

                                <td className="p-3 font-bold text-[#0F2C59]">
                                  {prod.name}
                                  {prod.hidden && <span className="text-[10px] text-rose-600 block">(Hidden)</span>}
                                </td>

                                <td className="p-3 font-medium text-slate-600">{catName}</td>

                                <td className="p-3">
                                  {prod.isAvailableInStore ? (
                                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">Yes</span>
                                  ) : (
                                    <span className="bg-slate-100 text-slate-500 text-[10px] px-2 py-0.5 rounded">No</span>
                                  )}
                                </td>

                                <td className="p-3">
                                  {prod.isFeatured ? (
                                    <span className="bg-[#D4AF37]/20 text-[#0F2C59] text-[10px] font-bold px-2 py-0.5 rounded border border-[#D4AF37]/40">Featured</span>
                                  ) : (
                                    <span className="text-slate-400 text-[10px]">-</span>
                                  )}
                                </td>

                                <td className="p-3 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    <button
                                      onClick={() => onToggleProductVisibility(prod.id)}
                                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600"
                                      title={prod.hidden ? 'Show Product' : 'Hide Product'}
                                    >
                                      {prod.hidden ? <EyeOff className="w-3.5 h-3.5 text-rose-600" /> : <Eye className="w-3.5 h-3.5" />}
                                    </button>

                                    <button
                                      onClick={() => {
                                        setEditingProduct(prod);
                                        setProductImages(prod.images || []);
                                      }}
                                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0F2C59]"
                                      title="Edit Product"
                                    >
                                      <Edit className="w-3.5 h-3.5" />
                                    </button>

                                    <button
                                      onClick={() => {
                                        if (confirm(`Delete "${prod.name}" permanently?`)) {
                                          onDeleteProduct(prod.id);
                                        }
                                      }}
                                      className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                                      title="Delete Product"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: CAKE MODELS */}
              {activeTab === 'CAKES' && (
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-3 bg-[#FAF8F5] p-4 rounded-2xl border border-slate-200">
                    <div>
                      <h3 className="font-serif-display font-bold text-[#0F2C59] text-lg">Cake Design Models</h3>
                      <p className="text-xs text-slate-500">Upload custom cake designs for wedding, birthday, and fondant galleries.</p>
                    </div>

                    <button
                      onClick={() =>
                        setEditingCakeModel({
                          title: '',
                          type: 'Birthday Cakes',
                          description: '',
                          images: [],
                        })
                      }
                      className="px-4 py-2 rounded-xl gold-gradient-bg text-[#0A192F] font-bold text-xs flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Cake Model</span>
                    </button>
                  </div>

                  {/* Add / Edit Cake Model Form */}
                  {editingCakeModel && (
                    <div className="bg-slate-50 p-6 rounded-2xl border-2 border-[#D4AF37]/50 shadow-lg space-y-4">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                        <h4 className="font-serif-display font-bold text-xl text-[#0F2C59]">
                          {editingCakeModel.id ? 'Edit Cake Model' : 'Add Cake Design Model'}
                        </h4>
                        <button onClick={() => setEditingCakeModel(null)} className="text-slate-400 hover:text-slate-700">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Cake Model Title *</label>
                          <input
                            type="text"
                            value={editingCakeModel.title || ''}
                            onChange={(e) => setEditingCakeModel({ ...editingCakeModel, title: e.target.value })}
                            placeholder="e.g. 3D Superhero Fondant Cake"
                            className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300 bg-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Cake Category Type *</label>
                          <select
                            value={editingCakeModel.type || 'Birthday Cakes'}
                            onChange={(e) => setEditingCakeModel({ ...editingCakeModel, type: e.target.value as CakeType })}
                            className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300 bg-white"
                          >
                            {CAKE_TYPES.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Design Description</label>
                        <textarea
                          rows={2}
                          value={editingCakeModel.description || ''}
                          onChange={(e) => setEditingCakeModel({ ...editingCakeModel, description: e.target.value })}
                          placeholder="Details about layers, toppers, and themes..."
                          className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300 bg-white"
                        />
                      </div>

                      {/* Image Upload Box */}
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Cake Photos (Drag & Drop)</label>
                        <div
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleDrop(e, true)}
                          className="border-2 border-dashed border-slate-300 hover:border-[#D4AF37] rounded-xl p-4 text-center bg-white cursor-pointer"
                        >
                          <Upload className="w-5 h-5 text-[#C5A059] mx-auto mb-1" />
                          <p className="text-xs font-semibold text-slate-700">Drop cake model photo here or click browse</p>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) => e.target.files && handleImageFiles(e.target.files, true)}
                            className="hidden"
                            id="cake-file-input"
                          />
                          <label htmlFor="cake-file-input" className="inline-block mt-2 px-3 py-1 bg-slate-100 rounded-lg text-xs font-medium cursor-pointer">
                            Select Photo
                          </label>
                        </div>

                        {editingCakeModel.images && editingCakeModel.images.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
                            {editingCakeModel.images.map((img, idx) => (
                              <div key={idx} className="relative w-16 h-16 rounded-lg overflow-hidden border border-slate-300">
                                <img src={img} alt="cake preview" className="w-full h-full object-cover" />
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button
                          onClick={() => setEditingCakeModel(null)}
                          className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 text-xs font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            if (!editingCakeModel.title) return alert('Enter Cake Title');
                            onSaveCakeModel({
                              id: editingCakeModel.id || `cake-${Date.now()}`,
                              title: editingCakeModel.title,
                              type: editingCakeModel.type || 'Birthday Cakes',
                              description: editingCakeModel.description || '',
                              images: editingCakeModel.images && editingCakeModel.images.length > 0
                                ? editingCakeModel.images
                                : ['data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%230F2C59"><rect width="400" height="300" fill="%230F2C59"/><text x="50%" y="50%" fill="%23F3E5AB" font-family="sans-serif" font-size="16" text-anchor="middle">Cake Photo Pending</text></svg>'],
                              isFeatured: editingCakeModel.isFeatured ?? true,
                            });
                            setEditingCakeModel(null);
                          }}
                          className="px-6 py-2 rounded-xl bg-[#0F2C59] text-[#F3E5AB] text-xs font-bold shadow"
                        >
                          Save Cake Model
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Cake Models List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cakeModels.map((model) => (
                      <div key={model.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-start justify-between gap-3">
                        <img src={model.images[0]} alt={model.title} className="w-16 h-16 rounded-lg object-cover bg-slate-100 shrink-0 border border-slate-200" />
                        <div className="flex-1 min-w-0">
                          <span className="text-[10px] font-bold text-[#C5A059] uppercase">{model.type}</span>
                          <h4 className="font-bold text-xs text-[#0F2C59] truncate">{model.title}</h4>
                          <p className="text-[11px] text-slate-500 line-clamp-1">{model.description}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setEditingCakeModel(model)}
                            className="text-[#0F2C59] hover:text-[#D4AF37] p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                            title="Edit Cake Model"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete cake design "${model.title}" permanently?`)) {
                                onDeleteCakeModel(model.id);
                              }
                            }}
                            className="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                            title="Delete Cake Model"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: CATEGORIES */}
              {activeTab === 'CATEGORIES' && (
                <div className="space-y-6">
                  <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-slate-200 flex justify-between items-center">
                    <div>
                      <h3 className="font-serif-display font-bold text-[#0F2C59] text-lg">Product Categories</h3>
                      <p className="text-xs text-slate-500">Manage store category groupings and blank future categories.</p>
                    </div>

                    <button
                      onClick={() =>
                        setEditingCategory({
                          name: '',
                          slug: '',
                          description: '',
                          icon: 'Cake',
                        })
                      }
                      className="px-4 py-2 rounded-xl gold-gradient-bg text-[#0A192F] font-bold text-xs flex items-center gap-1.5 shadow cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Category</span>
                    </button>
                  </div>

                  {editingCategory && (
                    <div className="bg-slate-50 p-5 rounded-2xl border border-[#D4AF37] space-y-3">
                      <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                        <h4 className="font-bold text-sm text-[#0F2C59]">
                          {editingCategory.id ? 'Edit Category' : 'Add New Category'}
                        </h4>
                        <button onClick={() => setEditingCategory(null)} className="text-slate-400 hover:text-slate-700">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Category Name *</label>
                          <input
                            type="text"
                            required
                            value={editingCategory.name || ''}
                            onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                            placeholder="e.g. Festival Sweets & Hampers"
                            className="w-full py-1.5 px-3 text-xs rounded-lg border border-slate-300 bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                          <input
                            type="text"
                            value={editingCategory.description || ''}
                            onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                            placeholder="Brief description for category card..."
                            className="w-full py-1.5 px-3 text-xs rounded-lg border border-slate-300 bg-white"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end gap-2 pt-2">
                        <button onClick={() => setEditingCategory(null)} className="px-3 py-1.5 text-xs bg-slate-200 text-slate-700 rounded-lg cursor-pointer font-medium">Cancel</button>
                        <button
                          onClick={() => {
                            if (!editingCategory.name) return alert('Category Name is required');
                            onSaveCategory({
                              id: editingCategory.id || `cat-${Date.now()}`,
                              name: editingCategory.name,
                              slug: editingCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                              description: editingCategory.description || '',
                              icon: editingCategory.icon || 'Cake',
                              sortOrder: editingCategory.sortOrder || categories.length + 1,
                            });
                            setEditingCategory(null);
                          }}
                          className="px-4 py-1.5 text-xs bg-[#0F2C59] text-[#F3E5AB] rounded-lg font-bold shadow cursor-pointer"
                        >
                          Save Category
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((cat) => (
                      <div key={cat.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-sm text-[#0F2C59] truncate">{cat.name}</h4>
                          <p className="text-xs text-slate-500 line-clamp-1">{cat.description || 'No description provided'}</p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => setEditingCategory(cat)}
                            className="text-[#0F2C59] hover:text-[#D4AF37] p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
                            title="Edit Category"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete category "${cat.name}"? Products in this category will still remain accessible.`)) {
                                onDeleteCategory(cat.id);
                              }
                            }}
                            className="text-rose-600 hover:text-rose-800 p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 transition-colors cursor-pointer"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: STORE INFO & SECURITY */}
              {activeTab === 'SITE_INFO' && (
                <div className="space-y-6 max-w-2xl mx-auto">
                  <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-slate-200 space-y-4">
                    <h3 className="font-serif-display font-bold text-xl text-[#0F2C59]">
                      Store Contact & Header Configuration
                    </h3>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Business Name</label>
                      <input
                        type="text"
                        value={infoForm.businessName}
                        onChange={(e) => setInfoForm({ ...infoForm, businessName: e.target.value })}
                        className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Owner / Proprietor Name</label>
                        <input
                          type="text"
                          value={infoForm.ownerName || 'Srinivasarao Kolisetty'}
                          onChange={(e) => setInfoForm({ ...infoForm, ownerName: e.target.value })}
                          placeholder="e.g. Srinivasarao Kolisetty"
                          className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300 font-semibold text-[#0F2C59]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Owner Title</label>
                        <input
                          type="text"
                          value={infoForm.ownerTitle || 'Founder & Proprietary Owner'}
                          onChange={(e) => setInfoForm({ ...infoForm, ownerTitle: e.target.value })}
                          placeholder="e.g. Founder & Proprietary Owner"
                          className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    {/* Global Pricing Toggle */}
                    <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-[#0F2C59]">Global Product Pricing Section</p>
                        <p className="text-[10px] text-slate-500">Enable or disable pricing visibility across the entire website</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={infoForm.globalShowPrices ?? true}
                          onChange={(e) => setInfoForm({ ...infoForm, globalShowPrices: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0F2C59]"></div>
                      </label>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Tagline</label>
                      <input
                        type="text"
                        value={infoForm.tagline}
                        onChange={(e) => setInfoForm({ ...infoForm, tagline: e.target.value })}
                        className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                        <input
                          type="text"
                          value={infoForm.contactNumber}
                          onChange={(e) => setInfoForm({ ...infoForm, contactNumber: e.target.value })}
                          className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">WhatsApp Number</label>
                        <input
                          type="text"
                          value={infoForm.whatsappNumber}
                          onChange={(e) => setInfoForm({ ...infoForm, whatsappNumber: e.target.value })}
                          className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Store Address Line</label>
                      <input
                        type="text"
                        value={infoForm.address.fullAddress}
                        onChange={(e) =>
                          setInfoForm({
                            ...infoForm,
                            address: { ...infoForm.address, fullAddress: e.target.value },
                          })
                        }
                        className="w-full py-2 px-3 text-xs rounded-xl border border-slate-300"
                      />
                    </div>

                    {/* Dual Security Passwords Section */}
                    <div className="p-4 bg-[#001030] text-white rounded-xl border border-[#D4AF37]/50 space-y-3">
                      <div className="flex items-center gap-2 text-[#F3E5AB]">
                        <ShieldAlert className="w-4 h-4 text-[#D4AF37]" />
                        <h4 className="font-bold text-xs uppercase tracking-wider">Dual Password Protection Settings</h4>
                      </div>
                      <p className="text-[11px] text-slate-300">
                        Customize both primary and secondary passwords required to log into this Owner Admin Panel.
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                        <div>
                          <label className="block text-[11px] font-semibold text-[#F3E5AB] mb-1">
                            Primary Passcode (Step 1)
                          </label>
                          <input
                            type="text"
                            value={infoForm.adminPasscodeHash}
                            onChange={(e) => setInfoForm({ ...infoForm, adminPasscodeHash: e.target.value })}
                            placeholder="Primary PIN (default 2007)"
                            className="w-full py-2 px-3 text-xs rounded-lg bg-[#000d28] border border-[#D4AF37]/40 text-[#F3E5AB] font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-[#F3E5AB] mb-1">
                            Secondary Passcode (Step 2)
                          </label>
                          <input
                            type="text"
                            value={infoForm.adminSecondaryPasscodeHash || '7777'}
                            onChange={(e) => setInfoForm({ ...infoForm, adminSecondaryPasscodeHash: e.target.value })}
                            placeholder="Secondary PIN (default 7777)"
                            className="w-full py-2 px-3 text-xs rounded-lg bg-[#000d28] border border-[#D4AF37]/40 text-[#F3E5AB] font-mono font-bold focus:outline-none focus:border-[#D4AF37]"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onUpdateSiteInfo(infoForm);
                        alert('Store Settings Saved Successfully!');
                      }}
                      className="w-full py-3 rounded-xl gold-gradient-bg text-[#0A192F] font-bold text-xs flex items-center justify-center gap-2 shadow"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save Settings</span>
                    </button>
                  </div>

                  {/* Danger Zone / Reset Defaults */}
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-rose-800">Reset System Data</h4>
                      <p className="text-[11px] text-rose-600">Restore all initial placeholder products & default settings.</p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('Are you sure you want to reset all data back to clean factory defaults?')) {
                          onResetAll();
                          alert('Reset completed.');
                          onClose();
                        }
                      }}
                      className="px-3 py-1.5 rounded-lg bg-rose-600 text-white text-xs font-semibold flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Defaults</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
