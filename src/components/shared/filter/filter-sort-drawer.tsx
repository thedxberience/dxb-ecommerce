"use client";
import { useEffect, useMemo, useState } from "react";
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
import BrandFilter from "./filterOption/BrandFilter";
import CategoryFilter from "./filterOption/CategoryFilter";
import { useProductStore } from "@/store/productStore";
import PriceFilter from "./filterOption/PriceFilter";
import { usePaginationStore } from "@/store/paginationStore";
import {
  FormatSlugAsText,
  getAssociatedGroupsWithProductCount,
} from "@/utils/util";
import { ProductCountGroup } from "@/utils/types";
import { usePathname } from "next/navigation";

type FilterCategory = "main" | "price" | "brand" | "category" | "color";

export function FilterSortDrawer() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("main");
  const [open, setOpen] = useState(false);

  const filters = useProductStore((state) => state.filters);
  const productsFallback = useProductStore((state) => state.productsFallback);
  const setProductFallback = useProductStore(
    (state) => state.setProductFallback
  );
  const setProducts = useProductStore((state) => state.setProducts);
  const resetFilters = useProductStore((state) => state.resetFilters);
  const setCurrentPage = usePaginationStore((state) => state.setCurrentPage);
  const products = useProductStore((state) => state.products);
  const setBrandFilters = useProductStore((state) => state.setBrandFilters);
  const setCategoryFilters = useProductStore(
    (state) => state.setCategoryFilters
  );
  const setFilters = useProductStore((state) => state.setFilters);

  const resetFilter = () => {
    resetFilters();
    setCurrentPage(1);
    setProducts(productsFallback);
    setActiveFilter("main");
  };

  const handleDrawerClose = () => {
    setOpen(false);
    // Reset to main view when drawer closes
    setTimeout(() => {
      resetFilter();
    }, 300);
  };

  const handleFilterByBrand = (brandList: string[], productBrand: string) => {
    if (brandList.length > 0) {
      return brandList.includes(productBrand);
    } else {
      return true;
    }
  };

  const handleFilterByCategory = (
    categoryList: string[],
    productCategory: string
  ) => {
    if (categoryList.length > 0) {
      return categoryList.includes(productCategory);
    } else {
      return true;
    }
  };

  const handleFilterByPrice = (
    { min, max }: { min: number; max: number },
    productPrice: number
  ) => {
    // If both min and max are not set or negative, allow all prices
    if ((!min && !max) || min < 0 || max < 0) {
      return true;
    }
    // Only min is set
    if (min > 0 && !max) {
      return productPrice >= min;
    }
    // Only max is set
    if (!min && max > 0) {
      return productPrice <= max;
    }
    // Both min and max are set
    if (min > 0 && max > 0) {
      return productPrice >= min && productPrice <= max;
    }
    // Fallback: allow all
    return true;
  };

  const handleFilterClick = async () => {
    // filter the products based on the filters
    const { brandList, categoryList, price } = filters;

    if (
      brandList.length === 0 &&
      categoryList.length === 0 &&
      price.min === 0 &&
      price.max === 0
    )
      return;

    setProductFallback(products);

    const filteredProducts = products.filter((prod) => {
      return (
        handleFilterByBrand(brandList, prod.brand) &&
        handleFilterByCategory(categoryList, prod.category) &&
        handleFilterByPrice(price, prod.price)
      );
    });

    if (!filteredProducts || filteredProducts.length === 0) {
      console.error("No filtered products found");
      return;
    }

    // console.log("Filtered Products:", filteredProducts);
    setProducts(filteredProducts);
  };

  const isNoFilter = useMemo(() => {
    const { brandList, categoryList, price } = filters;
    return (
      brandList.length === 0 &&
      categoryList.length === 0 &&
      price.min === 0 &&
      price.max === 0
    );
  }, [filters]);

  const checkSlugInFilters = ({
    slug,
    groupType,
    productGroup,
  }: {
    slug: string;
    groupType: "brands" | "categories";
    productGroup: ProductCountGroup[];
  }) => {
    // Format slug to string
    const formattedSlug = FormatSlugAsText(slug);

    // check if the slug is present in the product group
    const isPresentInGroup = productGroup.find(
      (prod) => prod.name.toLowerCase() === formattedSlug.toLowerCase()
    );

    if (isPresentInGroup) {
      const foundGroupName = isPresentInGroup.name;
      if (groupType === "brands") {
        const brandFilters: Set<string> = new Set(filters.brandList);
        brandFilters.add(foundGroupName);
        setFilters({ ...filters, brandList: Array.from(brandFilters) });
      } else {
        const categoryFilters: Set<string> = new Set(filters.categoryList);
        categoryFilters.add(foundGroupName);
        setFilters({ ...filters, categoryList: Array.from(categoryFilters) });
      }
    }
  };

  const pathname = usePathname();

  useEffect(() => {
    const slug = pathname.split("/")[1];
    const { brands, categories } =
      getAssociatedGroupsWithProductCount(products);
    setBrandFilters(brands);
    setCategoryFilters(categories);
    checkSlugInFilters({ slug, groupType: "brands", productGroup: brands });
    checkSlugInFilters({
      slug,
      groupType: "categories",
      productGroup: categories,
    });
  }, [pathname, products]);

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
            <PriceFilter label="price" setActiveFilter={setActiveFilter} />
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

          {/* {activeFilter === "color" && (
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
          )} */}
        </div>

        <DrawerFooter className="border-t p-4">
          <div className="flex items-center justify-between w-full">
            <Button variant="ghost" onClick={resetFilter}>
              CLEAR
            </Button>
            <Button
              className={` ${
                isNoFilter
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary cursor-pointer"
              }`}
              disabled={isNoFilter}
              onClick={handleFilterClick}
            >
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
