import Image from "next/image";
type MiniProductCardProps = {
  src: string;
};
export function MiniProductCard(props: MiniProductCardProps) {
  return (
    <div className="w-[110px] bg-[#efefef]">
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
