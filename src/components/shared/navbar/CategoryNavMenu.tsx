import Link from "next/link";
import Image from "next/image";
import React from "react";

type CategoryNavMenuProps = {
  collection: string;
  slug: string;
  imgSrc: string;
  imgAlt: string;
};

const CategoryNavMenu = ({
  collection,
  imgSrc,
  imgAlt,
  slug,
}: CategoryNavMenuProps) => {
  return (
    <div className="flex justify-center items-center w-full h-[167px] bg-white">
      <div className="link w-full h-full">
        <Link
          href={`/collection/${slug}`}
          className="text-lg w-full h-full flex justify-start items-center pl-6 text-black"
        >
          {collection}
        </Link>
      </div>
      <div className="image w-[167px] h-[167px]">
        <Image
          alt={imgAlt}
          src={imgSrc}
          width={167}
          height={167}
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default CategoryNavMenu;
