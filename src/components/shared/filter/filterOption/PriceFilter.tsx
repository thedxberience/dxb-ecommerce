import { FilterCategory } from "@/utils/types";
import React, { SetStateAction } from "react";
import PriceInput from "./PriceInput";
import { useProductStore } from "@/store/productStore";

type PriceFilterProps = {
  label: string;
  setActiveFilter: (value: SetStateAction<FilterCategory>) => void;
};

const PriceFilter = ({ setActiveFilter }: PriceFilterProps) => {
  const filters = useProductStore((state) => state.filters);
  const setFilters = useProductStore((state) => state.setFilters);

  const setMinPrice = (value: string) => {
    const minPrice = parseInt(value);
    if (isNaN(minPrice)) {
      setFilters({ ...filters, price: { ...filters.price, min: 0 } });
    } else {
      setFilters({ ...filters, price: { ...filters.price, min: minPrice } });
    }
  };

  const setMaxPrice = (value: string) => {
    const maxPrice = parseInt(value);
    if (isNaN(maxPrice)) {
      setFilters({ ...filters, price: { ...filters.price, max: 0 } });
    } else {
      setFilters({ ...filters, price: { ...filters.price, max: maxPrice } });
    }
  };

  return (
    <div className="space-y-4">
      <button
        className="flex items-center text-foreground font-medium gap-2"
        onClick={() => setActiveFilter("main")}
      >
        <span className="mr-2">←</span> Price
      </button>

      <div className="space-y-4 mt-4">
        <PriceInput label="From" onChange={setMinPrice} />

        <PriceInput label="To" onChange={setMaxPrice} />
      </div>
    </div>
  );
};

export default PriceFilter;
