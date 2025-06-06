export type Category = {
  id: string;
  slug: string;
  name: string;
  asset: string;
  displayName: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: Category[];
  description: string;
  price: string;
  asset: string;
  parentVariant?: string;
  variants: Product[];
};

export type SanityProductFilters = {
  category?: string
  brand?: string
  parent?: string
  targetAudience?: string
  slug?: string
  subCategory?: string
  pageNumber?: number,
  pageSize?: number,
  lastId?: string
}