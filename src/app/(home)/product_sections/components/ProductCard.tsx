import Image from "next/image";
import Heart from "./Heart";

type ProductCardProps = {
  src: string;
  alt: string;
  brand: string;
  price: string;
  productDescription: string;
};

const ProductCard = ({
  src,
  alt,
  brand,
  price,
  productDescription
}: ProductCardProps) => {
  return (
    <div className="group relative flex flex-col justify-center items-center gap-3 w-full cursor-pointer">
      <div className="product-img relative w-full h-[446px] flex justify-end items-end overflow-hidden">
        <Image
          src={src}
          alt={alt}
          className="object-cover group-hover:scale-105 transition-all duration-500 ease-in-out"
          fill
        />
        <div className="px-4 py-6">
          <Heart />
        </div>
      </div>
      <div className="flex flex-col justify-center items-start gap-1 text-black">
        <div className="brand-price w-full flex justify-between items-center">
          <p>{brand}</p>
          <p>{price}</p>
        </div>
        <div className="text-lg group-hover:underline">
          {productDescription}
        </div>
        <div className="flex justify-start items-center gap-2 relative">
          <Image
            src={src}
            alt={alt}
            width={24}
            height={24}
            className="rounded-full"
          />
          <p className="text-xs font-noah">+8</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
