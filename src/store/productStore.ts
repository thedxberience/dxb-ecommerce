import { sanityBrand, sanityCategory, sanityProduct } from "@/utils/types";
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProductStore {
    products: sanityProduct[];
    brands: sanityBrand[];
    categories: sanityCategory[];
    filters: {
        price: {
            max: number;
            min: number;
        },
        brandList: string[];
        categoryList: string[];
    },
    setProducts: (products: sanityProduct[]) => void;
    setBrands: (brands: sanityBrand[]) => void;
    setCategories: (categories: sanityCategory[]) => void;
    setFilters: (filters: {
        price: {
            max: number;
            min: number;
        },
        brandList: string[];
        categoryList: string[];
    }) => void;
    resetFilters: () => void;
    resetProducts: () => void;
    resetBrands: () => void;
    resetCategories: () => void;
}

export const useProductStore = create<ProductStore>()(persist((set) => ({
    products: [],
    brands: [],
    categories: [],
    filters: {
        price: {
            max: 0,
            min: 0
        },
        brandList: [],
        categoryList: []
    },
    setProducts: (products) => set({ products }),
    setBrands: (brands) => set({ brands }),
    setCategories: (categories) => set({ categories }),
    setFilters: (filters) => set({ filters }),
    resetFilters: () => set({
        filters: {
            price: {
                max: 0,
                min: 0
            },
            brandList: [],
            categoryList: []
        }
    }),
    resetProducts: () => set({ products: [] }),
    resetBrands: () => set({ brands: [] }),
    resetCategories: () => set({ categories: [] })
}), {
    name: "product-store", // unique name

}))