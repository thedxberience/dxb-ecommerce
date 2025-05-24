import { FilterCategory } from "@/utils/types";
import React, { SetStateAction } from "react";
import BrandCheckbox from "./BrandCheckbox";
import { useProductStore } from "@/store/productStore";

type BrandCheckboxProps = {
  label: string;
  setActiveFilter: (value: SetStateAction<FilterCategory>) => void;
};

const BrandFilter = ({ setActiveFilter }: BrandCheckboxProps) => {
  const filters = useProductStore((state) => state.filters);
  const setFilters = useProductStore((state) => state.setFilters);
  const allBrandFilters = useProductStore((state) => state.brandsFilter);

  const addBrandFilter = (brand: string, checked: boolean) => {
    const brandFilters: Set<string> = new Set(filters.brandList);

    if (checked) {
      brandFilters.add(brand);
    } else {
      brandFilters.delete(brand);
    }
    setFilters({
      ...filters,
      brandList: Array.from(brandFilters),
    });
  };

  return (
    <div className="space-y-4">
      <button
        className="flex items-center text-foreground font-medium gap-2"
        onClick={() => setActiveFilter("main")}
      >
        <span className="mr-2">←</span> Brand
      </button>

      <div className="space-y-3 mt-4 flex flex-col justify-start items-center gap-3">
        {allBrandFilters.map((brand, index) => (
          <BrandCheckbox
            key={index}
            addBrandFilter={addBrandFilter}
            label={brand.name}
            count={brand.productCount}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandFilter;
