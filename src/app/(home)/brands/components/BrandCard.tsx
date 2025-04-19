import Image from "next/image";

type BrandCardProps = {
  name: string;
  src: string;
  alt: string;
};

const BrandCard = ({ name, src, alt }: BrandCardProps) => {
  return (
    <div className="w-full relative rounded-3xl flex justify-center items-center overflow-hidden h-36">
      <Image alt={alt} src={src} className="object-cover object-center" fill />
      <div className="brand-name">
        <p className=" lg:text-4xl text-center w-full h-full flex justify-center items-center uppercase">
          {name}
        </p>
      </div>
    </div>
  );
};

export default BrandCard;
