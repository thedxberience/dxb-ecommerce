import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProductCardSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-center items-center gap-3 w-full min-w-56",
        className
      )}
    >
      <div className="product-img relative w-full h-60 lg:h-[446px] flex justify-end items-end overflow-hidden">
        <Skeleton className="absolute inset-0" />
        <div className="px-4 py-6 z-10">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-1 w-full">
        <div className="brand-price w-full flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="min-h-[60px] w-full">
          <Skeleton className="h-6 w-full mb-1" />
          <Skeleton className="h-6 w-3/4" />
        </div>
        <div className="flex justify-start items-center gap-2 relative">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default function ProductsLoading() {
  // Create an array of 8 items to represent loading products
  const skeletonProducts = Array.from({ length: 8 }, (_, i) => i);

  return (
    <section className="container flex flex-col justify-center items-center gap-8 mt-10">
      <div className="filter flex flex-col justify-start items-start gap-4 w-full max-w-11/12">
        <Skeleton className="h-10 w-full max-w-xs" />
        <Skeleton className="h-5 w-28" />
      </div>
      <div className="product-grid grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 justify-center items-center w-full mt-6 max-w-11/12">
        {skeletonProducts.map((index) => (
          <ProductCardSkeleton key={index} className="min-w-full" />
        ))}
      </div>
    </section>
  );
}
