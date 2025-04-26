import Image from "next/image";
import { stubProducts } from "@/utils/stub";
import { ProductDetails } from "../components/ProductDetails";
import { GenericCard } from "@/components/shared/GenericCard";

export default function Page() {
  const product = stubProducts[0];
  const data = [
    {
      category: "Women",
      description: "2025’s Finest: A Handpicked Collection of Timeless Luxury",
      src: "/images/categories/women.jpeg",
      alt: "A woman wearing a dress",
    },
    {
      category: "Swimsuits",
      description: "2025’s Finest: A Handpicked Collection of Timeless Luxury",
      src: "/images/categories/swimsuit.jpeg",
      alt: "A woman wearing a swimsuit reading a magazine",
    },
    {
      category: "Watches",
      description: "2025’s Finest: A Handpicked Collection of Timeless Luxury",
      src: "/images/categories/watches.jpeg",
      alt: "A woman wearing a swimsuit reading a magazine",
    },
  ];
  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full lg:h-auto lg:flex-row">
        <div className="relative flex h-[340px] w-full lg:h-[100vh] lg:w-1/2">
          <Image
            src={product.asset}
            alt="Product Image"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex px-4 pt-8 lg:mt-20 lg:w-1/2 lg:px-24 box-border">
          <ProductDetails product={product} />
        </div>
      </div>
      <div className="flex overflow-auto w-full">
        {data.map((entry, index) => (
          <GenericCard
            key={index}
            src={entry.src}
            alt={entry.alt}
            className="rounded-none"
          />
        ))}
      </div>
    </div>
  );
}
