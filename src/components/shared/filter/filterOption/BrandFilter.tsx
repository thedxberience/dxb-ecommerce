import { FilterCategory, sanityBrand } from "@/utils/types";
import React, { SetStateAction } from "react";
import BrandCheckbox from "./BrandCheckbox";
import { getAllSanityBrands } from "@/server/sanity/brands/brands";
import { useProductStore } from "@/store/productStore";

type BrandCheckboxProps = {
  label: string;
  setActiveFilter: (value: SetStateAction<FilterCategory>) => void;
};

const BrandFilter = ({ label, setActiveFilter }: BrandCheckboxProps) => {
  const [allBrands, setAllBrands] = React.useState<sanityBrand[]>([]);
  const filters = useProductStore((state) => state.filters);
  const setFilters = useProductStore((state) => state.setFilters);

  const fetchAllBrands = async () => {
    const { data: brands, error: fetchSanityBrandsErr } =
      await getAllSanityBrands();

    if (fetchSanityBrandsErr) {
      console.error("Error fetching brands from Sanity:", fetchSanityBrandsErr);
      return;
    }

    if (!brands || brands.length === 0) {
      console.error("No brands found");
      return;
    }
    setAllBrands(brands);
  };

  const addBrandFilter = (brand: string, checked: boolean) => {
    const brandFilters: Set<string> = new Set();

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

  React.useEffect(() => {
    fetchAllBrands();
  }, [label]);

  return (
    <div className="space-y-4">
      <button
        className="flex items-center text-foreground font-medium gap-2"
        onClick={() => setActiveFilter("main")}
      >
        <span className="mr-2">←</span> Brand
      </button>

      <div className="space-y-3 mt-4 flex flex-col justify-start items-center gap-3">
        {allBrands.map((brand) => (
          <BrandCheckbox
            key={brand.id}
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
