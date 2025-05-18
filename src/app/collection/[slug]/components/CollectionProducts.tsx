"use client";
import ProductCard from "@/app/(home)/product_sections/components/ProductCard";
import { FilterSortDrawer } from "@/components/shared/filter/filter-sort-drawer";
import { useProductStore } from "@/store/productStore";
import { ProductCountGroup, sanityProduct } from "@/utils/types";
import {
  FormatSlugAsText,
  getAssociatedGroupsWithProductCount,
} from "@/utils/util";
import { useEffect } from "react";

type CollectionProductsProps = {
  slug: string;
  collectionProducts: sanityProduct[];
};

const CollectionProducts = ({
  slug,
  collectionProducts,
}: CollectionProductsProps) => {
  // Add feature to check if a product contains a valid src while setting products
  const setProducts = useProductStore((state) => state.setProducts);
  const setProductFallback = useProductStore(
    (state) => state.setProductFallback
  );
  const products = useProductStore((state) => state.products);
  const setBrandFilters = useProductStore((state) => state.setBrandFilters);
  const setCategoryFilters = useProductStore(
    (state) => state.setCategoryFilters
  );
  const filters = useProductStore((state) => state.filters);
  const setFilters = useProductStore((state) => state.setFilters);
  const resetFilters = useProductStore((state) => state.resetFilters);

  const checkSlugInFilters = ({
    slug,
    groupType,
    productGroup,
  }: {
    slug: string;
    groupType: "brands" | "categories";
    productGroup: ProductCountGroup[];
  }) => {
    // Format slug to string
    const formattedSlug = FormatSlugAsText(slug);

    // check if the slug is present in the product group
    const isPresentInGroup = productGroup.find(
      (prod) => prod.name.toLowerCase() === formattedSlug.toLowerCase()
    );

    if (isPresentInGroup) {
      const foundGroupName = isPresentInGroup.name;
      if (groupType === "brands") {
        const brandFilters: Set<string> = new Set(filters.brandList);
        brandFilters.add(foundGroupName);
        setFilters({ ...filters, brandList: Array.from(brandFilters) });
      } else {
        const categoryFilters: Set<string> = new Set(filters.categoryList);
        categoryFilters.add(foundGroupName);
        setFilters({ ...filters, categoryList: Array.from(categoryFilters) });
      }
    }
  };

  useEffect(() => {
    resetFilters();
    setProducts(collectionProducts);
    setProductFallback(collectionProducts);
    const { brands, categories } =
      getAssociatedGroupsWithProductCount(collectionProducts);
    setBrandFilters(brands);
    setCategoryFilters(categories);
    checkSlugInFilters({ slug, groupType: "brands", productGroup: brands });
    checkSlugInFilters({
      slug,
      groupType: "categories",
      productGroup: categories,
    });
  }, [collectionProducts, setProducts, slug]);

  return (
    <section className="container flex flex-col justify-center items-center gap-8 mt-10">
      <div className="filter flex flex-col justify-start items-start gap-4 w-full max-w-11/12">
        <FilterSortDrawer />
        <p className="text-primary">{products.length} Products</p>
      </div>
      <div className="product-grid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 justify-center items-center w-full mt-6 max-w-11/12">
        {products.map((product, index) => (
          <ProductCard
            alt={product.thumbnail.imgAlt}
            brand={product.brand}
            price={product.price}
            name={product.name}
            src={product.thumbnail.imgSrc}
            slug={product.slug}
            key={index}
            className="min-w-full"
          />
        ))}
      </div>
    </section>
  );
};

export default CollectionProducts;
