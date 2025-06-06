"use client";
import ProductCard from "@/app/(home)/product_sections/components/ProductCard";
import { FilterSortDrawer } from "@/components/shared/filter/filter-sort-drawer";
import { useProductStore } from "@/store/productStore";
import { ProductCountGroup, sanityProduct } from "@/utils/types";
import {
  FormatSlugAsText,
  getAssociatedGroupsWithProductCount,
} from "@/utils/util";
import { useEffect, useRef, useState } from "react";
import Pagination from "./pagination";
import { usePaginationStore } from "@/store/paginationStore";
import { getAllSanityProductsByFilters } from "@/server/sanity/products/products";
import Loading from "../loading";
import { useCallback } from "react";

type CollectionProductsProps = {
  slug: string;
  currentPage: number;
  productCount: number;
  collectionProducts: sanityProduct[];
};

const CollectionProducts = ({
  slug,
  currentPage,
  productCount,
  collectionProducts,
}: CollectionProductsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const productGrid = useRef<HTMLDivElement>(null);

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

  // const currentPage = usePaginationStore((state) => state.currentPage);
  // const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const itemsPerPage = usePaginationStore((state) => state.itemsPerPage);
  const getLastIdPerPage = usePaginationStore(
    (state) => state.getLastIdPerPage
  );
  const setLastIdPerPage = usePaginationStore(
    (state) => state.setLastIdPerPage
  );

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

  const handleLastIdPerPage = (products?: sanityProduct[]) => {
    if (!products || products.length === 0) return;
    // Set the last product ID for the current page
    const lastId = products[products.length - 1]?.id;
    if (lastId) {
      setLastIdPerPage(currentPage, lastId);
    }
  };

  const handleOnPageChange = async (page: number) => {
    // setCurrentPage(page);
    // get the last ID of the previous page for the new page
    const lastId = getLastIdPerPage(page - 1);

    setIsLoading(true);
    if (productGrid.current) {
      productGrid.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    const { data: collectionProducts, error: fetchSanityProductsErr } =
      await getAllSanityProductsByFilters({
        category: slug,
        subCategory: slug,
        brand: slug,
        pageNumber: currentPage,
        pageSize: itemsPerPage,
        lastId: lastId || undefined,
      });

    if (fetchSanityProductsErr) {
      console.error("Error fetching products:", fetchSanityProductsErr);
      return;
    }
    if (!collectionProducts || collectionProducts.length === 0) {
      console.warn("No products found for the current page.");
      return;
    }
    setIsLoading(false);
    setProducts(collectionProducts);
    handleLastIdPerPage(collectionProducts);
  };

  const totalPages = Math.ceil((productCount || 0) / itemsPerPage);

  const handleRenderProducts = useCallback(() => {
    if (isLoading) {
      return (
        <div className="w-full">
          <Loading />
        </div>
      );
    } else if (products.length === 0) {
      return (
        <p className="text-center text-gray-500 w-full">No products found.</p>
      );
    } else {
      return (
        <div
          ref={productGrid}
          className="product-grid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 justify-center items-center w-full mt-6 max-w-11/12"
        >
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
      );
    }
  }, [isLoading, products]);

  useEffect(() => {
    handleLastIdPerPage(products);
    // Update the last ID for the current page when products change
  }, [products, currentPage, setLastIdPerPage]);

  useEffect(() => {
    resetFilters();
    if (currentPage === 1) {
      setIsLoading(true);
      setProducts(collectionProducts);
      setIsLoading(false);
    } else {
      handleOnPageChange(currentPage);
    }
    setProductFallback(collectionProducts);
    const { brands, categories } = getAssociatedGroupsWithProductCount(
      currentPage === 1 ? collectionProducts : products
    );
    setBrandFilters(brands);
    setCategoryFilters(categories);
    checkSlugInFilters({ slug, groupType: "brands", productGroup: brands });
    checkSlugInFilters({
      slug,
      groupType: "categories",
      productGroup: categories,
    });
    // setCurrentPage(1);
    setLastIdPerPage(
      1,
      collectionProducts[collectionProducts.length - 1]?.id || ""
    );
  }, [collectionProducts, setProducts, slug, currentPage]);

  return (
    <section className="container flex flex-col justify-center items-center gap-8 mt-10 w-full">
      <div className="filter flex flex-col justify-start items-start gap-4 w-full max-w-11/12">
        <FilterSortDrawer />
        <p className="text-primary">
          Page {currentPage} of {totalPages}
        </p>
      </div>
      {handleRenderProducts()}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handleOnPageChange}
      />
    </section>
  );
};

export default CollectionProducts;
