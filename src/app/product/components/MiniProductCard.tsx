/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";
type MiniProductCardProps = {
  src: string;
  onClick: any;
};
export function MiniProductCard(props: MiniProductCardProps) {
  return (
    <div className="w-[110px] bg-[#efefef]" onClick={props.onClick}>
      <Image
        src={props.src}
        alt="Product Image"
        width={1092}
        height={1080}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
