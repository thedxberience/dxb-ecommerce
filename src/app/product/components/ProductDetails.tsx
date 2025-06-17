import React from "react";
import Image from "next/image";
import { Button } from "./Button";
import { ContextMenu } from "./ContextMenu";
import { MiniProductCard } from "./MiniProductCard";
import { sanityProduct } from "@/utils/types";
import { getAllSanityProductsByFilters } from "@/server/sanity/products/products";
import { currencyFormatter, FormatSlugAsText } from "@/utils/util";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

type ProductDetailProps = {
  product: sanityProduct;
};

export async function ProductDetails({ product }: ProductDetailProps) {
  const { data: productVariants, error: productsVariantsErr } =
    await getAllSanityProductsByFilters({
      parent: product.id
    });

  if (productsVariantsErr) {
    console.error(
      "Error fetching product variants from Sanity:",
      productsVariantsErr
    );
  }

  return (
    <div className="w-full text-black h-auto">
      {/* Header */}
      <div className="mb-4 text-sm">
        <Link className="text-primary" href="/">
          Home
        </Link>{" "}
        /{" "}
        <Link className="text-primary" href={`/collection/${product.category}`}>
          {FormatSlugAsText(product.category)}
        </Link>
      </div>
      <div className="mb-2 text-sm">
        <Link className="text-primary" href={`/collection/${product.brand}`}>
          {product.brand}
        </Link>
      </div>
      <div className="flex w-full text-xl justify-between">
        <span>{product.name}</span>
        <span>{currencyFormatter(product.price, "AED")}</span>
      </div>

      {/* Variants */}
      <div className="mt-8 flex flex-wrap gap-4 justify-between w-full">
        {productVariants &&
          productVariants.map((variant) => (
            <MiniProductCard
              key={variant.slug}
              src={variant.thumbnail.imgSrc}
            />
          ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-col gap-4">
        <a
          href={`https://wa.me/971585787558?text=Hello%20I%20would%like%20to%20order%20your%20${product.brand}%20${product.name}%20product`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="bg-[#171010] text-white">
            <span>DISCUSS & ORDER IT NOW</span>
            <Image
              src="/icons/whatsapp_black_white.svg"
              alt="WhatsApp icon"
              width={24}
              height={24}
            />
          </Button>
        </a>
      </div>

      {/* Delivery Info */}
      <div className="mt-8">
        <div className="mb-4 text-lg">Expected Delivery</div>
        <div className="mb-2 text-sm">Standard: 7 to 10 working days</div>
      </div>

      {/* Tabs */}
      <ContextMenu
        minHeight={50}
        maxHeight={300}
        menuList={[
          {
            text: "Description",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data: <PortableText value={product.description as any} />,
            id: "description"
          },
          {
            text: "Delivery",
            data: (
              <div>
                Once an order is purchased, you will recieve it within{" "}
                <span className="font-bold">7 to 10 working days.</span> If
                there are any delays, you will be contacted by our team.
              </div>
            ),
            id: "delivery"
          },
          {
            text: "Authenticity",
            data: (
              <div>
                Yes, we guarantee{" "}
                <span className="font-bold">100% authencity </span> on all our
                products. We source directly from luxury brands, authorized
                retailers, and verified suppliers.
              </div>
            ),
            id: "authenticity"
          }
        ]}
      />
    </div>
  );
}
