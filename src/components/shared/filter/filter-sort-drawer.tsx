"use client";

import { useState } from "react";
import { ChevronRight, X } from "lucide-react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ColorOption from "./filterOption/ColorOption";
import BrandFilter from "./filterOption/BrandFilter";
import CategoryFilter from "./filterOption/CategoryFilter";
import { useProductStore } from "@/store/productStore";
import { filterSanityProducts } from "@/server/sanity/products/products";

type FilterCategory = "main" | "price" | "brand" | "category" | "color";

export function FilterSortDrawer() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("main");
  const [open, setOpen] = useState(false);

  const filters = useProductStore((state) => state.filters);
  const setProducts = useProductStore((state) => state.setProducts);

  const resetFilter = () => {
    setActiveFilter("main");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    // Reset to main view when drawer closes
    setTimeout(() => {
      resetFilter();
    }, 300);
  };

  const handleFilterClick = async () => {
    // console.log("Filters:", filters);

    const { data: filteredProducts, error: filteredProductsErr } =
      await filterSanityProducts(filters);

    if (filteredProductsErr) {
      console.error(
        "Error fetching filtered products from Sanity:",
        filteredProductsErr
      );
      return;
    }
    if (!filteredProducts || filteredProducts.length === 0) {
      console.error("No filtered products found");
      return;
    }

    // console.log("Filtered Products:", filteredProducts);
    setProducts(filteredProducts);
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="border border-accent-100 px-6 py-3 text-primary rounded-none leading-[150%]"
        >
          Filter & Sort
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full max-h-screen text-primary">
        <DrawerHeader className="border-b">
          <div className="flex items-center justify-between">
            <DrawerTitle>Filter & Sort</DrawerTitle>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" onClick={handleDrawerClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto p-4">
          {activeFilter === "main" && (
            <div className="space-y-4">
              <FilterItem
                label="Price"
                onClick={() => setActiveFilter("price")}
              />
              <FilterItem
                label="Brand"
                onClick={() => setActiveFilter("brand")}
              />
              <FilterItem
                label="Category"
                onClick={() => setActiveFilter("category")}
              />
            </div>
          )}

          {activeFilter === "price" && (
            <div className="space-y-4">
              <button
                className="flex items-center text-foreground font-medium gap-2"
                onClick={() => setActiveFilter("main")}
              >
                <span className="mr-2">←</span> Price
              </button>

              <div className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">From</Label>
                  <div className="flex items-center border rounded gap-2">
                    <span className="text-muted-foreground ml-3 mr-1">$</span>
                    <Input
                      type="number"
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="0"
                      defaultValue="0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">To</Label>
                  <div className="flex items-center border rounded gap-2">
                    <span className="text-muted-foreground ml-3 mr-1">$</span>
                    <Input
                      type="number"
                      className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder="25,000"
                      defaultValue="25,000"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeFilter === "brand" && (
            <BrandFilter label="brand" setActiveFilter={setActiveFilter} />
          )}

          {activeFilter === "category" && (
            <CategoryFilter
              label="category"
              setActiveFilter={setActiveFilter}
            />
          )}

          {activeFilter === "color" && (
            <div className="space-y-4">
              <button
                className="flex items-center text-foreground font-medium gap-2"
                onClick={() => setActiveFilter("main")}
              >
                <span className="mr-2">←</span> Color
              </button>

              <div className="space-y-3 mt-4 flex flex-col justify-start items-center gap-3">
                <ColorOption color="#000000" label="Black" />
                <ColorOption color="#0e6cd1" label="Blue" />
                <ColorOption color="#f5f5dc" label="Beige" />
                <ColorOption color="#ecbc8c" label="Nude" />
                <ColorOption color="#e00505" label="Red" />
                <ColorOption color="#740202" label="Wine" />
              </div>
            </div>
          )}
        </div>

        <DrawerFooter className="border-t p-4">
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" onClick={resetFilter}>
              CLEAR
            </Button>
            <Button className="bg-primary" onClick={handleFilterClick}>
              APPLY
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function FilterItem({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      className="flex items-center justify-between w-full py-2 text-foreground"
      onClick={onClick}
    >
      <span>{label}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
