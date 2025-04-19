import Hero from "./(home)/Hero/hero";
import Categories from "./(home)/categories/Categories";
import ProductContainer from "./(home)/product_sections/ProductContainer";
import Trends from "./(home)/trends/Trends";
import CategoryContainer from "./(home)/categories/CategoryContainer";
import { getCategoryContainerData } from "@/utils/util";
import Footer from "@/components/shared/Footer";
import Brands from "./(home)/brands/Brands";

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
      <Footer />
    </main>
  );
}
