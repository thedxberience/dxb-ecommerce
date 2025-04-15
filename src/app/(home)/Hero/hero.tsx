import CustomButton from "@/components/shared/CustomButton";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <header className="relative mb-10">
      <Navbar />
      <div className="hero absolute max-w-screen w-full h-screen max-h-screen top-0 left-0">
        <Image
          src={"/images/hero-img.jpeg"}
          alt="A lady dressed modestly giving off a luxurious vibe"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
        />
      </div>
      <div className="header-content relative z-10 w-full h-full flex flex-col justify-end items-center gap-6 pb-44">
        <div className="text-center font-bold flex justify-center flex-col items-center gap-6">
          <h1 className="text-7xl font-ivyPresto">Start the Year in Style</h1>
          <p className="text-xl font-bold">
            2025’s Finest: A Handpicked Collection of Timeless Luxury
          </p>
        </div>
        <CustomButton btnName="Shop Now" />
      </div>
    </header>
  );
};

export default Hero;
