import Image from "next/image";
import Link from "next/link";

type BrandCardProps = {
  name: string;
  src: string;
  alt: string;
};

const BrandCard = ({ name, src, alt }: BrandCardProps) => {
  return (
    <Link
      href={`/collection/${name}`}
      className="w-full min-w-[220px] group relative rounded-3xl flex justify-center items-center overflow-hidden h-24 lg:h-36 overlay cursor-pointer"
    >
      {src && (
        <Image
          alt={alt || `${name} brand`}
          src={src}
          className="object-cover object-center group-hover:scale-110 transition-all duration-300 ease-in-out"
          fill
        />
      )}
      <div className="brand-name z-20">
        <p className="lg:text-4xl text-center w-full h-full flex justify-center items-center uppercase">
          {name}
        </p>
      </div>
    </Link>
  );
};

export default BrandCard;
