import Image from "next/image";
import React from "react";

type CardProps = {
  src: string;
  alt: string;
  title?: string;
  className?: string;
};

export const GenericCard = ({ src, alt, title, className }: CardProps) => {
  return (
    <div
      className={`category-card grow h-52 lg:w-[416px] lg:h-[446px] relative rounded-2xl overflow-hidden flex items-end ${className}`}
    >
      <Image src={src} alt={alt} fill className="object-cover" />
      <div className="category-title p-4 w-full relative z-10">
        {title && <h3 className="text-lg font-bold uppercase">{title}</h3>}
      </div>
    </div>
  );
};
