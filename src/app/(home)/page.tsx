import Hero from "./Hero/hero";
import Categories from "./categories/Categories";
import ProductContainer from "./product_sections/ProductContainer";
import Trends from "./trends/Trends";
import CategoryContainer from "./categories/CategoryContainer";
import { getCategoryContainerData } from "@/utils/util";
import Brands from "./brands/Brands";

export default function Home() {
  const swimsuitCategoryData = getCategoryContainerData("swimsuits");
  const watchesCategoryData = getCategoryContainerData("watches");

  return (
    <main className="">
      <Hero />
      <Categories />
      <ProductContainer sectionHeader="Curated For You" />
      <ProductContainer sectionHeader="NEW ARRIVALS" />
      <ProductContainer sectionHeader="WATCHES SELECTION" />
      <Trends />
      <Brands />
      <ProductContainer sectionHeader="GIFT FOR HER" />
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
