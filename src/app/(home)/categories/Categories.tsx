import React from "react";
import { categoryData } from "./data";
import { CategoryCard } from "./components/CategoryCard";

const Categories = () => {
  return (
    <div className="flex justify-center items-center py-10 overflow-x-scroll lg:overflow-hidden">
      <div className="container category flex lg:justify-center items-center gap-3 lg:gap-8 max-w-11/12 w-full overflow-auto">
        {categoryData.map((category, index) => (
          <CategoryCard
            key={index}
            src={category.src}
            alt={category.alt}
            title={category.name}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
