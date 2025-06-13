// app/products/[slug]/page.tsx

import Image from "next/image";
import Link from "next/link";
import ProductContainer from "@/app/(home)/product_sections/ProductContainer";
import { GenericCard } from "@/components/shared/GenericCard";
import {
  getAllProductSlugs,
  getSanityProductBySlug
} from "@/server/sanity/products/products";
import { notFound } from "next/navigation";
import { ProductDetails } from "../components/ProductDetails";

export const dynamic = "force-static";
export async function generateStaticParams() {
  const { data: slugs } = await getAllProductSlugs();
  return slugs?.map((slug) => ({ slug })) || [];
}

export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: product, error } = await getSanityProductBySlug(slug);
  if (error || !product) notFound();

  const data = [
    {
      category: "dresses-women",
      description: "2025’s Finest: A Handpicked Collection of Timeless Luxury",
      src: "/images/categories/women.jpeg",
      alt: "A woman wearing a dress"
    },
    {
      category: "jumpsuits-body-women",
      description: "2025’s Finest: A Handpicked Collection of Timeless Luxury",
      src: "/images/categories/swimsuit.jpeg",
      alt: "A woman wearing a swimsuit reading a magazine"
    },
    {
      category: "watches",
      description: "2025’s Finest: A Handpicked Collection of Timeless Luxury",
      src: "/images/categories/watches.jpeg",
      alt: "A woman wearing a swimsuit reading a magazine"
    }
  ];
  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full lg:h-auto lg:flex-row">
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
        <ProductContainer
          sectionHeader="YOU MAY ALSO LIKE"
          categorySlug={product.category}
        />
      </div>
      <div className="flex overflow-auto w-full">
        {data.map((entry, index) => (
          <Link
            className="w-full"
            href={`/collection/${entry.category}`}
            key={index}
          >
            <GenericCard
              key={index}
              src={entry.src}
              alt={entry.alt}
              className="rounded-none w-full"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
