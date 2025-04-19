import React from "react";
import BrandCard from "./components/BrandCard";
import { brandData } from "./data";

const Brands = () => {
  return (
    <section className="brand-container w-full flex flex-col justify-center items-center">
      <div className="container flex flex-col justify-start">
        <h2 className="text-xl lg:text-4xl font-ivyPresto text-primary">
          Our Brands
        </h2>
        <div className="brand-grid grid grid-rows-1 lg:grid-cols-4 lg:grid-rows-4 w-full gap-x-8 gap-y-5">
          {brandData.map((brand, index) => (
            <BrandCard
              alt={brand.alt}
              name={brand.name}
              src={brand.src}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
