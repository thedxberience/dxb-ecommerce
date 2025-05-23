import CustomButton from "@/components/shared/CustomButton";
import Image from "next/image";

type CategoryContainerProps = {
  category: string;
  description: string;
  src: string;
  alt: string;
  slug: string;
  className?: string;
};

const CategoryContainer = ({
  category,
  description,
  src,
  alt,
  className,
  slug,
}: CategoryContainerProps) => {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-4 relative ${className}`}
    >
      <Image src={src} alt={alt} fill sizes="100vw" className="object-cover" />
      <div className="category-content relative z-10 flex flex-col justify-center items-center gap-4">
        <h3 className="font-ivyPresto text-4xl lg:text-7xl text-center text-white">
          {category}
        </h3>
        <p className="text-xl font-bold text-center font-noah text-accent-300">
          {description}
        </p>
        <CustomButton btnName="Shop now" isLink href={`/collection/${slug}`} />
      </div>
    </div>
  );
};

export default CategoryContainer;
