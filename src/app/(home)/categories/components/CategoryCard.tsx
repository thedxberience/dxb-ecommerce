import Image from "next/image";
import React from "react";

type CategoryCardProps = {
  src: string;
  alt: string;
  title: string;
};

export const CategoryCard = ({ src, alt, title }: CategoryCardProps) => {
  return (
    <div className="category-card w-28 h-52 lg:w-[416px] lg:h-[446px] relative rounded-2xl overflow-hidden flex items-end">
      <Image src={src} alt={alt} fill className="object-cover" />
      <div className="category-title p-4 w-full relative z-10">
        <h3 className="text-lg font-bold uppercase">{title}</h3>
      </div>
    </div>
  );
};
