"use client";
// import Image from "next/image";
// import { ProductDetails } from "../components/ProductDetails";
// import ProductContainer from "@/app/(home)/product_sections/ProductContainer";
// import { GenericCard } from "@/components/shared/GenericCard";
// import { getAllSanityProductsByFilters } from "@/server/sanity/products/products";
// import { notFound } from "next/navigation";
import useRouteBouncer from "@/lib/hooks";

export default function Page() {
//   {
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }
  useRouteBouncer();

  // const { slug } = await params;

  // const { data: productDetails, error: fetchSanityProductErr } =
  //   await getAllSanityProductsByFilters({
  //     slug: slug,
  //   });

  // if (fetchSanityProductErr) {
  //   console.error("Error fetching product from Sanity:", fetchSanityProductErr);
  //   notFound();
  // }

  // // console.log("Product Details:", productDetails);

  // const product = productDetails[0];
  // const data = [
  //   {
  //     category: "Women",
  //     description: "2025’s Finest: A Handpicked Collection of Timeless Luxury",
  //     src: "/images/categories/women.jpeg",
  //     alt: "A woman wearing a dress",
  //   },
  //   {
  //     category: "Swimsuits",
  //     description: "2025’s Finest: A Handpicked Collection of Timeless Luxury",
  //     src: "/images/categories/swimsuit.jpeg",
  //     alt: "A woman wearing a swimsuit reading a magazine",
  //   },
  //   {
  //     category: "Watches",
  //     description: "2025’s Finest: A Handpicked Collection of Timeless Luxury",
  //     src: "/images/categories/watches.jpeg",
  //     alt: "A woman wearing a swimsuit reading a magazine",
  //   },
  // ];
  return (
    <div className="flex flex-col">
      {/* <div className="flex flex-col w-full lg:h-auto lg:flex-row">
        <div className="relative flex h-[340px] w-full lg:h-[100vh] lg:w-1/2">
          <Image
            src={product.thumbnail.imgSrc}
            alt={product.thumbnail.imgAlt}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex px-4 pt-8 lg:mt-20 lg:w-1/2 lg:px-24 box-border">
          <ProductDetails product={product} />
        </div>
      </div>
      <div>
        <ProductContainer sectionHeader="YOU MAY ALSO LIKE" />
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
      </div> */}
    </div>
  );
}
