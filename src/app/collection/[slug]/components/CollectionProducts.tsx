"use client";
import ProductCard from "@/app/(home)/product_sections/components/ProductCard";
import { FilterSortDrawer } from "@/components/shared/filter/filter-sort-drawer";
import { useProductStore } from "@/store/productStore";
import { sanityProduct } from "@/utils/types";
import { tryCatch } from "@/utils/util";
import { useEffect, useMemo, useRef, useState } from "react";
import Pagination from "./pagination";
import { usePaginationStore } from "@/store/paginationStore";
// import { getAllSanityProductsByFilters } from "@/server/sanity/products/products";
import Loading from "../loading";
import { useCallback } from "react";
import { notFound } from "next/navigation";
import { collectionReqFetchResponse } from "../page";

type CollectionProductsProps = {
  slug: string;
  currentPage: number;
  // collectionProducts: sanityProduct[];
};

const CollectionProducts = ({ slug, currentPage }: CollectionProductsProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [productCount, setProductCount] = useState<number>();
  const productGrid = useRef<HTMLDivElement>(null);

  const setProducts = useProductStore((state) => state.setProducts);
  const setProductFallback = useProductStore(
    (state) => state.setProductFallback
  );
  const products = useProductStore((state) => state.products);

  // const currentPage = usePaginationStore((state) => state.currentPage);
  // const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const itemsPerPage = usePaginationStore((state) => state.itemsPerPage);
  const getLastIdPerPage = usePaginationStore(
    (state) => state.getLastIdPerPage
  );
  const setLastIdPerPage = usePaginationStore(
    (state) => state.setLastIdPerPage
  );

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
        // block: "start",
      });
    }

    const payload = {
      category: slug,
      subCategory: slug,
      brand: slug,
      pageNumber: String(currentPage),
      pageSize: String(itemsPerPage),
      lastId: lastId || "",
    };

    const queryParams = new URLSearchParams(payload);

    const uri = `${
      process.env.NEXT_PUBLIC_SITE_URL
    }/api/collections?${queryParams.toString()}`;

    const { data, error } = await tryCatch(fetch(uri));

    if (error) {
      // console.log("Could not get response err: ", error.message);
      notFound();
    }

    if (!data.ok) {
      // console.log("Could not get response err: ", data.statusText);
      notFound();
    }

    const { data: response, error: responseErr } = await tryCatch(
      data.json() as Promise<collectionReqFetchResponse>
    );

    if (responseErr) {
      // console.log("Could not get response err: ", responseErr.message);
      notFound();
    }

    if (!response.success) {
      // console.log("Could not get response err: ", response.message);
      notFound();
    }

    const { collection, collectionCount } = response;
    setIsLoading(false);
    setProducts(collection);
    setProductCount(collectionCount);
    handleLastIdPerPage(collection);
  };

  const totalPages = useMemo(
    () => Math.ceil((productCount || 0) / itemsPerPage),
    [productCount, itemsPerPage]
  );

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
    handleOnPageChange(currentPage);
    setProductFallback(products);
    setLastIdPerPage(1, products[products.length - 1]?.id || "");
  }, [setProducts, slug, currentPage]);

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
