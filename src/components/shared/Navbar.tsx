import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HiMenuAlt2 } from "react-icons/hi";

const Navbar = () => {
  return (
    <nav className="navbar fixed top-0 w-full z-50 flex justify-between items-center p-4">
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
  );
};

export default Navbar;
