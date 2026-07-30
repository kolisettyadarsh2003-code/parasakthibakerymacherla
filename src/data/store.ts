import { useState, useEffect } from 'react';
import { Product, Category, SiteInfo, CakeModel } from '../types';
import { initialProducts, initialCategories, initialSiteInfo, initialCakeModels } from './initialData';

const STORAGE_KEYS = {
  SITE_INFO: 'parasakthi_bakery_site_info_v1',
  CATEGORIES: 'parasakthi_bakery_categories_v1',
  PRODUCTS: 'parasakthi_bakery_products_v1',
  CAKE_MODELS: 'parasakthi_bakery_cake_models_v1',
};

// Helper to safely parse local storage
function getStoredData<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function setStoredData<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    // Dispatch custom event to sync tabs or state
    window.dispatchEvent(new CustomEvent('parasakthi_store_updated', { detail: { key } }));
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
  }
}

// Global state getters and setters
export const bakeryStore = {
  getSiteInfo: (): SiteInfo => {
    const stored = getStoredData(STORAGE_KEYS.SITE_INFO, initialSiteInfo);
    return { ...initialSiteInfo, ...stored };
  },
  setSiteInfo: (info: SiteInfo) => setStoredData(STORAGE_KEYS.SITE_INFO, info),

  getCategories: (): Category[] => {
    const cats = getStoredData(STORAGE_KEYS.CATEGORIES, initialCategories);
    return cats.sort((a, b) => a.sortOrder - b.sortOrder);
  },
  setCategories: (cats: Category[]) => setStoredData(STORAGE_KEYS.CATEGORIES, cats),

  getProducts: (): Product[] => {
    const prods = getStoredData(STORAGE_KEYS.PRODUCTS, initialProducts);
    return prods.sort((a, b) => a.sortOrder - b.sortOrder);
  },
  setProducts: (prods: Product[]) => setStoredData(STORAGE_KEYS.PRODUCTS, prods),

  getCakeModels: (): CakeModel[] => {
    return getStoredData(STORAGE_KEYS.CAKE_MODELS, initialCakeModels);
  },
  setCakeModels: (models: CakeModel[]) => setStoredData(STORAGE_KEYS.CAKE_MODELS, models),

  resetToDefaults: () => {
    localStorage.removeItem(STORAGE_KEYS.SITE_INFO);
    localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
    localStorage.removeItem(STORAGE_KEYS.PRODUCTS);
    localStorage.removeItem(STORAGE_KEYS.CAKE_MODELS);
    window.dispatchEvent(new CustomEvent('parasakthi_store_updated', { detail: { key: 'all' } }));
  }
};

// Custom React Hook for live UI updates
export function useBakeryStore() {
  const [siteInfo, setSiteInfoState] = useState<SiteInfo>(bakeryStore.getSiteInfo());
  const [categories, setCategoriesState] = useState<Category[]>(bakeryStore.getCategories());
  const [products, setProductsState] = useState<Product[]>(bakeryStore.getProducts());
  const [cakeModels, setCakeModelsState] = useState<CakeModel[]>(bakeryStore.getCakeModels());

  const refreshAll = () => {
    setSiteInfoState(bakeryStore.getSiteInfo());
    setCategoriesState(bakeryStore.getCategories());
    setProductsState(bakeryStore.getProducts());
    setCakeModelsState(bakeryStore.getCakeModels());
  };

  useEffect(() => {
    const handleUpdate = () => refreshAll();
    window.addEventListener('parasakthi_store_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('parasakthi_store_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    siteInfo,
    categories,
    products,
    cakeModels,
    
    // Actions
    updateSiteInfo: (info: SiteInfo) => {
      bakeryStore.setSiteInfo(info);
      setSiteInfoState(info);
    },

    saveProduct: (product: Product) => {
      const current = bakeryStore.getProducts();
      const existingIdx = current.findIndex(p => p.id === product.id);
      let updated: Product[];
      if (existingIdx >= 0) {
        updated = [...current];
        updated[existingIdx] = product;
      } else {
        updated = [product, ...current];
      }
      bakeryStore.setProducts(updated);
      setProductsState(updated);
    },

    deleteProduct: (productId: string) => {
      const current = bakeryStore.getProducts();
      const updated = current.filter(p => p.id !== productId);
      bakeryStore.setProducts(updated);
      setProductsState(updated);
    },

    toggleProductVisibility: (productId: string) => {
      const current = bakeryStore.getProducts();
      const updated = current.map(p => p.id === productId ? { ...p, hidden: !p.hidden } : p);
      bakeryStore.setProducts(updated);
      setProductsState(updated);
    },

    reorderProducts: (reordered: Product[]) => {
      const updated = reordered.map((p, idx) => ({ ...p, sortOrder: idx + 1 }));
      bakeryStore.setProducts(updated);
      setProductsState(updated);
    },

    saveCakeModel: (model: CakeModel) => {
      const current = bakeryStore.getCakeModels();
      const existingIdx = current.findIndex(m => m.id === model.id);
      let updated: CakeModel[];
      if (existingIdx >= 0) {
        updated = [...current];
        updated[existingIdx] = model;
      } else {
        updated = [model, ...current];
      }
      bakeryStore.setCakeModels(updated);
      setCakeModelsState(updated);
    },

    deleteCakeModel: (modelId: string) => {
      const current = bakeryStore.getCakeModels();
      const updated = current.filter(m => m.id !== modelId);
      bakeryStore.setCakeModels(updated);
      setCakeModelsState(updated);
    },

    saveCategory: (cat: Category) => {
      const current = bakeryStore.getCategories();
      const existingIdx = current.findIndex(c => c.id === cat.id);
      let updated: Category[];
      if (existingIdx >= 0) {
        updated = [...current];
        updated[existingIdx] = cat;
      } else {
        updated = [...current, cat];
      }
      bakeryStore.setCategories(updated);
      setCategoriesState(updated);
    },

    deleteCategory: (catId: string) => {
      const current = bakeryStore.getCategories();
      const updated = current.filter(c => c.id !== catId);
      bakeryStore.setCategories(updated);
      setCategoriesState(updated);
    },

    resetAll: () => {
      bakeryStore.resetToDefaults();
      refreshAll();
    }
  };
}
