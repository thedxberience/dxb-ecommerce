"use client";

import Image from "next/image";
import { stubProducts } from "@/utils/stub";
import { ProductDetails } from "../components/ProductDetails";
import ProductContainer from "../components/ProductContainer";
import { ProductImageDisplay } from "../components/ProductImageDisplay";
import { useState } from "react";

export default function Page() {
  const product = stubProducts[2];
  const [showcaseImage, setShowcaseImage] = useState(product.asset.src);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full lg:h-auto lg:flex-row">
        <div className="relative flex h-[340px] w-full lg:h-[100vh] lg:w-1/2">
          <Image
            src={showcaseImage}
            alt="Product Image"
            fill
            className="object-cover"
          />
        </div>
        <div className="flex px-4 pt-8 lg:mt-20 lg:w-1/2 lg:px-24 box-border">
          <ProductDetails
            product={product}
            setShowcaseImage={setShowcaseImage}
          />
        </div>
      </div>
      <ProductContainer sectionHeader="YOU MAY ALSO LIKE" />
      <ProductImageDisplay />
    </div>
  );
}
