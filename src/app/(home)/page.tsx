"use client";
import Hero from "./Hero/hero";
import Categories from "./categories/Categories";
// import ProductContainer from "./product_sections/ProductContainer";
// import Trends from "./trends/Trends";
import CategoryContainer from "./categories/CategoryContainer";
import { getCategoryContainerData } from "@/utils/util";
// import Brands from "./brands/Brands";
import useRouteBouncer from "@/lib/hooks";

export default function Home() {
  useRouteBouncer();

  const swimsuitCategoryData = getCategoryContainerData("swimsuits");
  const watchesCategoryData = getCategoryContainerData("watches");

  return (
    <main className="">
      <Hero />
      <Categories />
      {/* <ProductContainer sectionHeader="Curated For You" /> */}
      {/* <ProductContainer
        sectionHeader="NEW ARRIVALS"
        categorySlug="dresses-women"
      /> */}
      {/* <ProductContainer sectionHeader="Shoes" /> */}
      {/* <Trends /> */}
      {/* <Brands /> */}
      {/* <ProductContainer
        sectionHeader="Jumpsuits"
        categorySlug="jumpsuits-body-women"
      /> */}
      {swimsuitCategoryData && (
        <CategoryContainer
          alt={swimsuitCategoryData.alt}
          category={swimsuitCategoryData.category}
          description={swimsuitCategoryData.description}
          src={swimsuitCategoryData.src}
          className="h-[535px] mb-10 swimsuit-category overlay"
        />
      )}
      {watchesCategoryData && (
        <CategoryContainer
          alt={watchesCategoryData.alt}
          category={watchesCategoryData.category}
          description={watchesCategoryData.description}
          src={watchesCategoryData.src}
          className="h-[535px] mb-10 overlay"
        />
      )}
    </main>
  );
}
