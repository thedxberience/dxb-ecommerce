/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import Image from "next/image";
import { Product } from "@/app/types";
import { Button } from "./Button";
import { ContextMenu } from "./ContextMenu";
import { MiniProductCard } from "./MiniProductCard";

type ProductDetailProps = {
  product: Product;
  setShowcaseImage: any;
};

export function ProductDetails({
  product,
  setShowcaseImage
}: ProductDetailProps) {
  const productVariants = product.variants.length
    ? product.variants
    : [product];

  return (
    <div className="w-full text-black h-auto">
      {/* Header */}
      <div className="mb-4 text-sm">Home / Womens</div>
      <div className="mb-2 text-sm">{product.brand}</div>
      <div className="flex w-full text-xl justify-between">
        <span>{product.name}</span>
        <span>{product.price}</span>
      </div>

      {/* Variants */}
      <div className="mt-8 flex flex-wrap gap-4 w-full">
        {productVariants.map((variant) => (
          <MiniProductCard
            key={variant.slug}
            src={variant.asset.src}
            onClick={() => setShowcaseImage(variant.asset.src)}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex flex-col gap-4">
        <a
          href="https://wa.me/971585787558"
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
        <div className="mb-2 text-sm">Standard: 4 to 7 working days</div>
        <div className="mb-2 text-sm">Express: 2 to 3 working days</div>
      </div>

      {/* Tabs */}
      <ContextMenu
        minHeight={50}
        maxHeight={150}
        menuList={[
          {
            text: "Description",
            data: <div>{product.description}</div>,
            id: "description"
          },
          {
            text: "Delivery",
            data: (
              <div>
                Once an order is purchased, you will recieve it within{" "}
                <span className="font-bold">4 to 8 working days.</span> If there
                are any delays, you will be contacted by our team.
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
