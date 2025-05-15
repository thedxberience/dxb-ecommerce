import React from "react";
import BrandCard from "./components/BrandCard";
import { getAllSanityBrands } from "@/server/sanity/brands/brands";

const Brands = async () => {
  const { data: brands, error: fetchBrandsErr } = await getAllSanityBrands();

  if (fetchBrandsErr) {
    console.error("Error fetching brands from Sanity:", fetchBrandsErr);
    return null;
  }

  return (
    <section className="brand-container w-full flex flex-col justify-center items-center pb-16">
      <div className="container flex flex-col justify-center items-center gap-8">
        <div className="header flex justify-start items-center w-full max-w-11/12">
          <h2 className="text-xl lg:text-4xl font-ivyPresto text-primary">
            Our Brands
          </h2>
        </div>
        <div className="brand-grid flex lg:grid lg:grid-cols-4 lg:grid-rows-4 w-full gap-x-8 gap-y-5 max-w-11/12 overflow-auto lg:overflow-hidden">
          {brands.map((brand, index) => (
            <BrandCard
              alt={brand.image.alt}
              name={brand.name}
              src={brand.image.src}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
