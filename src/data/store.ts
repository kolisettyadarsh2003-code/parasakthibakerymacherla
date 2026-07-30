import { useState, useEffect } from 'react';
import { Product, Category, SiteInfo, CakeModel } from '../types';
import {
  initialProducts,
  initialCategories,
  initialSiteInfo,
  initialCakeModels,
} from './initialData';

import { db } from '../firebase';
import {
  collection,
  getDocs,
  setDoc,
  doc,
  deleteDoc,
} from 'firebase/firestore';

const FIRESTORE_COLLECTIONS = {
  products: 'products',
  categories: 'categories',
  cakeModels: 'cakeModels',
  siteInfo: 'siteInfo',
};

export const bakeryStore = {
  getSiteInfo: (): SiteInfo => initialSiteInfo,

  getCategories: (): Category[] => initialCategories,

  getProducts: (): Product[] => initialProducts,

  getCakeModels: (): CakeModel[] => initialCakeModels,

  resetToDefaults: () => {
    window.dispatchEvent(
      new CustomEvent('parasakthi_store_updated', {
        detail: { key: 'all' },
      })
    );
  },
};

export function useBakeryStore() {
  const [siteInfo, setSiteInfoState] =
    useState<SiteInfo>(initialSiteInfo);

  const [categories, setCategoriesState] =
    useState<Category[]>(initialCategories);

  const [products, setProductsState] =
    useState<Product[]>(initialProducts);

  const [cakeModels, setCakeModelsState] =
    useState<CakeModel[]>(initialCakeModels);


  const refreshAll = async () => {
    try {
      const productsSnap = await getDocs(
        collection(db, FIRESTORE_COLLECTIONS.products)
      );

      const productsData = productsSnap.docs.map(
        (item) => item.data() as Product
      );


      const categoriesSnap = await getDocs(
        collection(db, FIRESTORE_COLLECTIONS.categories)
      );

      const categoriesData = categoriesSnap.docs.map(
        (item) => item.data() as Category
      );


      const cakesSnap = await getDocs(
        collection(db, FIRESTORE_COLLECTIONS.cakeModels)
      );

      const cakesData = cakesSnap.docs.map(
        (item) => item.data() as CakeModel
      );


      const siteSnap = await getDocs(
        collection(db, FIRESTORE_COLLECTIONS.siteInfo)
      );

      const siteData =
        siteSnap.docs[0]?.data() as SiteInfo | undefined;


      setProductsState(
        productsData.length ? productsData : initialProducts
      );

      setCategoriesState(
        categoriesData.length ? categoriesData : initialCategories
      );

      setCakeModelsState(
        cakesData.length ? cakesData : initialCakeModels
      );

      setSiteInfoState(
        siteData || initialSiteInfo
      );

    } catch (error) {
      console.error(
        "Firestore loading error:",
        error
      );
    }
  };


  useEffect(() => {
    refreshAll();

    const handler = () => {
      refreshAll();
    };

    window.addEventListener(
      'parasakthi_store_updated',
      handler
    );

    return () => {
      window.removeEventListener(
        'parasakthi_store_updated',
        handler
      );
    };

  }, []);  return {
    siteInfo,
    categories,
    products,
    cakeModels,


    updateSiteInfo: async (info: SiteInfo) => {
      try {
        await setDoc(
          doc(
            db,
            FIRESTORE_COLLECTIONS.siteInfo,
            "main"
          ),
          info
        );

        setSiteInfoState(info);

      } catch (error) {
        console.error(
          "Site info save error:",
          error
        );
      }
    },


    saveProduct: async (product: Product) => {
      try {
        await setDoc(
          doc(
            db,
            FIRESTORE_COLLECTIONS.products,
            product.id
          ),
          product
        );

        setProductsState((prev) => {
          const filtered = prev.filter(
            (p) => p.id !== product.id
          );

          return [product, ...filtered];
        });

      } catch (error) {
        console.error(
          "Product save error:",
          error
        );
      }
    },


    deleteProduct: async (productId: string) => {
      try {
        await deleteDoc(
          doc(
            db,
            FIRESTORE_COLLECTIONS.products,
            productId
          )
        );

        setProductsState((prev) =>
          prev.filter(
            (p) => p.id !== productId
          )
        );

      } catch (error) {
        console.error(
          "Product delete error:",
          error
        );
      }
    },


    toggleProductVisibility: async (
      productId: string
    ) => {
      try {
        const updated = products.map((p) =>
          p.id === productId
            ? {
                ...p,
                hidden: !p.hidden,
              }
            : p
        );


        for (const product of updated) {
          await setDoc(
            doc(
              db,
              FIRESTORE_COLLECTIONS.products,
              product.id
            ),
            product
          );
        }


        setProductsState(updated);

      } catch (error) {
        console.error(
          "Visibility update error:",
          error
        );
      }
    },


    reorderProducts: async (
      reordered: Product[]
    ) => {
      try {
        const updated = reordered.map(
          (p, index) => ({
            ...p,
            sortOrder: index + 1,
          })
        );


        for (const product of updated) {
          await setDoc(
            doc(
              db,
              FIRESTORE_COLLECTIONS.products,
              product.id
            ),
            product
          );
        }


        setProductsState(updated);

      } catch (error) {
        console.error(
          "Reorder error:",
          error
        );
      }
    },


    saveCakeModel: async (
      model: CakeModel
    ) => {
      try {
        await setDoc(
          doc(
            db,
            FIRESTORE_COLLECTIONS.cakeModels,
            model.id
          ),
          model
        );

        setCakeModelsState((prev) => {
          const filtered = prev.filter(
            (m) => m.id !== model.id
          );

          return [model, ...filtered];
        });

      } catch (error) {
        console.error(
          "Cake save error:",
          error
        );
      }
    },


    deleteCakeModel: async (
      modelId: string
    ) => {
      try {
        await deleteDoc(
          doc(
            db,
            FIRESTORE_COLLECTIONS.cakeModels,
            modelId
          )
        );

        setCakeModelsState((prev) =>
          prev.filter(
            (m) => m.id !== modelId
          )
        );

      } catch (error) {
        console.error(
          "Cake delete error:",
          error
        );
      }
    },


    saveCategory: async (
      cat: Category
    ) => {
      try {
        await setDoc(
          doc(
            db,
            FIRESTORE_COLLECTIONS.categories,
            cat.id
          ),
          cat
        );

        setCategoriesState((prev) => {
          const filtered = prev.filter(
            (c) => c.id !== cat.id
          );

          return [...filtered, cat];
        });

      } catch (error) {
        console.error(
          "Category save error:",
          error
        );
      }
    },


    deleteCategory: async (
      catId: string
    ) => {
      try {
        await deleteDoc(
          doc(
            db,
            FIRESTORE_COLLECTIONS.categories,
            catId
          )
        );

        setCategoriesState((prev) =>
          prev.filter(
            (c) => c.id !== catId
          )
        );

      } catch (error) {
        console.error(
          "Category delete error:",
          error
        );
      }
    },


    resetAll: () => {
      bakeryStore.resetToDefaults();
      refreshAll();
    },
  };
}
