"use client";
import Image from "next/image";
import Heart from "./Heart";
import { cn, currencyFormatter } from "@/utils/util";
import Link from "next/link";

type ProductCardProps = {
  slug: string;
  src: string;
  alt: string;
  brand: string;
  price: number;
  name: string;
  className?: string;
};

const ProductCard = ({
  slug,
  src,
  alt,
  brand,
  price,
  name,
  className,
}: ProductCardProps) => {
  return (
    <Link href={`/product/${slug}`}>
      <div
        className={cn(
          "group relative flex flex-col justify-center items-center gap-3 w-full cursor-pointer min-w-56",
          className
        )}
      >
        <div className="product-img relative w-full h-60 lg:h-[446px] flex justify-end items-end overflow-hidden">
          {src && (
            <Image
              src={src}
              alt={alt}
              className="object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              fill
            />
          )}
          <div className="px-4 py-6">
            <Heart />
          </div>
        </div>
        <div className="flex flex-col justify-center items-start gap-1 text-black w-full">
          <div className="brand-price w-full flex justify-between items-center">
            <p className="text-sm text-[#646060]">{brand}</p>
            <p>{currencyFormatter(price, "AED")}</p>
          </div>
          <div className="text-lg group-hover:underline min-h-[60px]">
            {name}
          </div>
          <div className="flex justify-start items-center gap-2 relative">
            {src && (
              <Image
                src={src}
                alt={alt}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            {/* <p className="text-xs font-noah">+8</p> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
