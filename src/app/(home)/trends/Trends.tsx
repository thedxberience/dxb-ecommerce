import React from "react";
import MensTrends from "./MensTrends";
import CategoryContainer from "../categories/CategoryContainer";
import { getCategoryContainerData } from "@/utils/util";

const womenCategoryData = getCategoryContainerData("women");

const Trends = () => {
  return (
    <section>
      <div className="section-header">
        <h2 className="font-ivyPresto text-4xl text-center">Latest Trends</h2>
      </div>
      <MensTrends />
      {womenCategoryData && (
        <CategoryContainer
          alt={womenCategoryData.alt}
          category={womenCategoryData.category}
          description={womenCategoryData.description}
          src={womenCategoryData.src}
          slug="dresses-women"
          className="h-screen justify-end pb-44 my-10"
        />
      )}
    </section>
  );
};

export default Trends;
