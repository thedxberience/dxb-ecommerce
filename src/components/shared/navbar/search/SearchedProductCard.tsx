import { currencyFormatter } from "@/utils/util";
import Image from "next/image";
import Link from "next/link";

type SearchedProductCardProps = {
  alt: string;
  src: string;
  price: number;
  brand: string;
  name: string;
  slug: string;
};

const SearchedProductCard = ({
  alt,
  brand,
  name,
  price,
  src,
  slug,
}: SearchedProductCardProps) => {
  return (
    <Link
      href={`/collection/${slug}`}
      className="flex justify-start items-center gap-3"
    >
      <div className="image">
        {src && (
          <Image
            src={src}
            alt={alt}
            width={80}
            height={80}
            className="object-cover"
          />
        )}
      </div>
      <div className="product-details flex flex-col justify-start items-start gap-1">
        <p className="text-xs uppercase font-noah text-acccent-400">{brand}</p>
        <h2 className="font-noah text-primary">{name}</h2>
        <p className="font-noah text-acccent-400">{currencyFormatter(price)}</p>
      </div>
    </Link>
  );
};

export default SearchedProductCard;
