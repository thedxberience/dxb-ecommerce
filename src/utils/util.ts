
import { categoryContainerData } from "../app/(home)/categories/data";

export const getCategoryContainerData = (category: string) => {
  const categoryData = categoryContainerData.filter((data) => data.category.toLowerCase() === category.toLowerCase());
  return categoryData.length > 0 ? categoryData[0] : null;
}

import { ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { ProductCountGroup, sanityProduct } from "./types";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

// Types for the result object with discriminated union
type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

// Main wrapper function
export async function tryCatch<T, E = Error>(
  promise: Promise<T>,
): Promise<Result<T, E>> {
  try {
    const data = await promise;
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as E };
  }
}

export function currencyFormatter(amount: number, currency = 'USD', locale = 'en-US') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

export const FormatSlugAsText = (slug: string) => {
  return slug.split("-").map((val) => val[0].toUpperCase() + val.slice(1)).join(" ")
}


export function getAssociatedGroupsWithProductCount(
  products: sanityProduct[]
): {
  brands: ProductCountGroup[];
  categories: ProductCountGroup[];
  subCategories: ProductCountGroup[];
} {
  const brandCounts: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};
  // const subCategoryCounts: Record<string, number> = {}; // Placeholder for future subCategory support

  products.forEach((product) => {
    // Count brands
    if (product.brand) {
      brandCounts[product.brand] = (brandCounts[product.brand] || 0) + 1;
    }

    // Count categories
    if (product.category) {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    }

    // If subCategories existed on the product, we could handle them here
    // e.g., if (product.subCategories) { ... }
  });

  // Helper to convert record to array of { name, productCount }
  const toGroupArray = (counts: Record<string, number>): ProductCountGroup[] =>
    Object.entries(counts).map(([name, productCount]) => ({ name, productCount }));

  return {
    brands: toGroupArray(brandCounts),
    categories: toGroupArray(categoryCounts),
    subCategories: [] // For now, since subCategories are not in `sanityProduct`
  };
}