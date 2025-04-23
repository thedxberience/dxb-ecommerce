"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";

const Navbar = () => {
  React.useEffect(() => {
    window.addEventListener("scroll", handleWindowScrollState);
    return () => {
      window.removeEventListener("scroll", handleWindowScrollState);
    };
  }, []);

  const handleWindowScrollState = () => {
    const navbar = document.querySelector(".navbar") as HTMLElement;
    const scrollTop = window.scrollY;

    if (scrollTop > 0) {
      navbar.classList.add("navbar-scroll");
    } else {
      navbar.classList.remove("navbar-scroll");
    }
  };

  return (
    <div className="flex navbar justify-center items-center fixed top-0 w-full h-16">
      <nav className="container w-full  flex justify-between items-center p-4">
        <div className="hamburger-menu">
          <HiMenuAlt2 className="w-8 h-8" />
        </div>

        <div className="logo">
          <Link href="/">
            <Image
              src="/icons/dxberience_logo.svg"
              alt="Dxberience Logo"
              width={98}
              height={24}
            />
          </Link>
        </div>

        <div className="nav-btns flex justify-center items-center gap-4">
          <div className="search">
            <Image
              src="/icons/search-normal.svg"
              alt="Search"
              width={24}
              height={24}
            />
          </div>
          <div className="profile">
            <Image
              src="/icons/profile.svg"
              alt="Profile"
              width={24}
              height={24}
            />
          </div>
          <div className="bag">
            <Image src="/icons/bag.svg" alt="bag" width={24} height={24} />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
