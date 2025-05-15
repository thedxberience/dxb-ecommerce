"use client";
import ProductCard from "@/app/(home)/product_sections/components/ProductCard";
import { FilterSortDrawer } from "@/components/shared/filter/filter-sort-drawer";
import { useProductStore } from "@/store/productStore";
import { sanityProduct } from "@/utils/types";
import { useEffect } from "react";

type CollectionProductsProps = {
  collectionProducts: sanityProduct[];
};

const CollectionProducts = ({
  collectionProducts,
}: CollectionProductsProps) => {
  const setProducts = useProductStore((state) => state.setProducts);
  const products = useProductStore((state) => state.products);

  useEffect(() => {
    setProducts(collectionProducts);
  }, [collectionProducts, setProducts]);

  return (
    <section className="container flex flex-col justify-center items-center gap-8 mt-10">
      <div className="filter flex flex-col justify-start items-start gap-4 w-full max-w-11/12">
        <FilterSortDrawer />
        {/* <button className="border border-accent-100 px-6 py-3">
            <span className="text-primary text-center">Filter & Sort</span>
          </button> */}
        <p className="text-primary">{products.length} Products</p>
      </div>
      <div className="product-grid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 justify-center items-center w-full mt-6 max-w-11/12">
        {products.map((product, index) => (
          <ProductCard
            alt={product.thumbnail.imgAlt}
            brand={product.brand}
            price={product.price}
            summary={product.summary || ""}
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
