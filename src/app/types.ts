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
  asset: {
    src: string;
    alt: string;
  };
  parentVariant?: string;
  variants: Product[];
};
