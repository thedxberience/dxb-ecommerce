import CustomButton from "@/components/shared/CustomButton";
import Image from "next/image";
import React from "react";

const MensTrends = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
      <div className="img-side relative w-full h-[500px] lg:h-screen">
        <Image
          src={"/images/trends/men-trends.jpeg"}
          alt="A guy tying his shoe"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      <div className="cta-container bg-accent flex flex-col justify-center items-center text-primary gap-8 h-full">
        <h3 className="font-ivyPresto text-4xl lg:text-7xl text-center">
          Men's
        </h3>
        <p className="text-xl font-bold text-center font-noah text-accent-300">
          2025’s Finest: A Handpicked Collection of Timeless Luxury
        </p>
        <CustomButton btnName="Shop now" invert />
      </div>
    </div>
  );
};

export default MensTrends;
