import { ProductCountGroup, sanityBrand, sanityCategory, sanityProduct } from "@/utils/types";
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ProductStore {
    products: sanityProduct[];
    productsFallback: sanityProduct[];
    brands: sanityBrand[];
    brandsFilter: ProductCountGroup[];
    categoryFilter: ProductCountGroup[];
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
    setProductFallback: (products: sanityProduct[]) => void;
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
    setBrandFilters: (brandFilter: ProductCountGroup[]) => void
    setCategoryFilters: (categoryFilter: ProductCountGroup[]) => void
    resetFilters: () => void;
    resetProducts: () => void;
    resetBrands: () => void;
    resetCategories: () => void;
}

export const useProductStore = create<ProductStore>()(
    persist(
        (set) => ({
            products: [],
            productsFallback: [],
            brands: [],
            brandsFilter: [],
            categoryFilter: [],
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
            setProductFallback: (products) => set({ productsFallback: products }),
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
            setBrandFilters(brandFilter) {
                set({ brandsFilter: brandFilter })
            },
            setCategoryFilters(categoryFilter) {
                set({ categoryFilter: categoryFilter })
            },
            resetProducts: () => set({ products: [] }),
            resetBrands: () => set({ brands: [] }),
            resetCategories: () => set({ categories: [] })
        }),
        {
            name: "product-store", // unique name
            partialize: (state): Partial<ProductStore> => ({
                // productsFallback: state.productsFallback,
                brands: state.brands,
                categories: state.categories,
                filters: state.filters,
                brandsFilter: state.brandsFilter,
                categoryFilter: state.categoryFilter,
                // explicitly omit 'products'
            }),
        }
    )
)