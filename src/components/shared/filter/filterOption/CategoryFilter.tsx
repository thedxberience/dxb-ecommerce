import { FilterCategory, sanityCategory } from "@/utils/types";
import { SetStateAction, useEffect, useState } from "react";
import BrandCheckbox from "./BrandCheckbox";
import { getAllSanityCategories } from "@/server/sanity/categories/category";
import { useProductStore } from "@/store/productStore";

type BrandCheckboxProps = {
  label: string;
  setActiveFilter: (value: SetStateAction<FilterCategory>) => void;
};

const CategoryFilter = ({ setActiveFilter }: BrandCheckboxProps) => {
  const [allCategories, setAllCategories] = useState<sanityCategory[]>([]);
  const filters = useProductStore((state) => state.filters);
  const setFilters = useProductStore((state) => state.setFilters);

  const fetchAllCategories = async () => {
    const { data: categories, error: fetchSanityCategoriesErr } =
      await getAllSanityCategories();

    if (fetchSanityCategoriesErr) {
      console.error(
        "Error fetching categories from Sanity:",
        fetchSanityCategoriesErr
      );
      return;
    }

    if (!categories || categories.length === 0) {
      console.error("No categories found");
      return;
    }
    setAllCategories(categories);
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const addCategoryFilter = (brand: string, checked: boolean) => {
    const categoryFilters: Set<string> = new Set();

    if (checked) {
      categoryFilters.add(brand);
    } else {
      categoryFilters.delete(brand);
    }

    const updatedCategoryList = new Set(Array.from(categoryFilters));
    setFilters({
      ...filters,
      categoryList: Array.from(updatedCategoryList),
    });
  };

  return (
    <div className="space-y-4">
      <button
        className="flex items-center text-foreground font-medium gap-2"
        onClick={() => setActiveFilter("main")}
      >
        <span className="mr-2">←</span> Category
      </button>

      <div className="space-y-3 mt-4 flex flex-col justify-start items-center gap-3">
        {allCategories.map((category) => (
          <BrandCheckbox
            key={category.id}
            addBrandFilter={addCategoryFilter}
            label={category.name}
            count={category.productCount}
          />
        ))}
        {/* <BrandCheckbox
          addBrandFilter={addCategoryFilter}
          label="Cross Bag"
          count={42}
        />
        <BrandCheckbox
          addBrandFilter={addCategoryFilter}
          label="Wallet"
          count={28}
        />
        <BrandCheckbox
          addBrandFilter={addCategoryFilter}
          label="Clutch Bags"
          count={16}
        />
        <BrandCheckbox
          addBrandFilter={addCategoryFilter}
          label="Crossbody Bags"
          count={34}
        />
        <BrandCheckbox
          addBrandFilter={addCategoryFilter}
          label="Luggage"
          count={22}
        />
        <BrandCheckbox
          addBrandFilter={addCategoryFilter}
          label="Tote Bags"
          count={18}
        /> */}
      </div>
    </div>
  );
};

export default CategoryFilter;
