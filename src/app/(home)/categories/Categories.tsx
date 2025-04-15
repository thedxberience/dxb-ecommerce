import React from "react";
import { categoryData } from "./data";
import { CategoryCard } from "./components/CategoryCard";

const Categories = () => {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="container flex justify-center items-center gap-8">
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
