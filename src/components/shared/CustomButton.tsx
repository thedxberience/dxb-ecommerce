"use client";
import Image from "next/image";
import Link from "next/link";
import { Ref } from "react";

type CustomButtonProps = {
  btnName: string;
  invert?: boolean;
  isPending?: boolean;
  btnRef?: Ref<HTMLButtonElement> | undefined;
  isLink?: boolean;
  href?: string;
  onClick?: () => void;
};

const CustomButton = ({
  btnName = "Explore",
  invert = false,
  isPending = false,
  btnRef = null,
  isLink = false,
  href = "",
  onClick = () => {},
}: CustomButtonProps) => {
  const handleButtonIcon = () => {
    if (invert) {
      if (isPending) {
        return (
          <span className="animate-spin">
            <Image
              src="/icons/Loader.svg"
              alt="Loading Icon"
              width={24}
              height={24}
            />
          </span>
        );
      }
      return (
        <span>
          <Image
            src="/icons/btn_arrow_white.svg"
            alt="button arrow"
            width={24}
            height={24}
          />
        </span>
      );
    } else {
      if (isPending) {
        return (
          <span className="animate-spin">
            <Image
              src="/icons/loader_black.svg"
              alt="Loading Icon"
              width={24}
              height={24}
            />
          </span>
        );
      }
      return (
        <span>
          <Image
            src="/icons/btn_arrow.svg"
            alt="button arrow"
            width={24}
            height={24}
          />
        </span>
      );
    }
  };

  return (
    <div className="relative w-fit lg:min-w-[187px]">
      <div
        className={`${
          invert ? "bg-white border-black" : "bg-black border-white"
        } border-[1px] w-full h-10 absolute -bottom-3 left-3`}
      ></div>
      <div
        className={` ${
          invert ? "bg-black text-white" : "bg-white text-black"
        } p-[13.5px] z-40 border border-black relative flex justify-center w-fit lg:min-w-[187px]`}
      >
        <button
          ref={btnRef}
          className="flex justify-center text-sm lg:text-base items-center gap-3 uppercase"
          onClick={onClick}
        >
          {" "}
          {isLink ? (
            <Link
              className="flex justify-center items-center gap-3"
              href={href}
            >
              {btnName} {handleButtonIcon()}
            </Link>
          ) : (
            btnName
          )}
          {!isLink && handleButtonIcon()}
        </button>
      </div>
    </div>
  );
};

export default CustomButton;
