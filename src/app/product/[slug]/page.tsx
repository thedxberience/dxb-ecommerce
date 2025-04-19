import Image from "next/image";
import ProductImage from "../../../../public/images/products//product-2.webp";

export default function Page() {
  return (
    <div>
      <div className="flex w-full">
        <div className="productImage w-[56%] h-[100vh] bg-gray-200">
          <Image
            src={ProductImage}
            alt={"Product Image"}
            // width={1080}
            // height={1080}
            // className="w-full h-full"
          />
        </div>
      </div>
    </div>
  );
}
