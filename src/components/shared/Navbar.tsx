"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SearchIcon from "../icons/SearchIcon";
import { usePathname } from "next/navigation";
import NavMenu from "./navbar/menu";
import SearchBar from "./navbar/SearchBar";

const Navbar = () => {
  const pathname = usePathname();
  const [navbarStyle, setNavbarStyle] = React.useState("");
  const [isSearchBarOpen, setIsSearchBarOpen] = React.useState(false);

  const navBarVariants = {
    home: "text-accent",
    other: "text-primary",
  };

  const isHomePage = pathname === "/" ? "home" : "other";

  React.useEffect(() => {
    handleWindowScrollState();
    window.addEventListener("scroll", handleWindowScrollState);
    return () => {
      window.removeEventListener("scroll", handleWindowScrollState);
    };
  }, [pathname]);

  const handleWindowScrollState = () => {
    // const navbar = document.querySelector(".navbar") as HTMLElement;
    const scrollTop = window.scrollY;

    const selector =
      isHomePage === "home" ? "navbar-scroll" : "navbar-scroll-accent";

    if (scrollTop > 0) {
      setNavbarStyle(selector);
    } else {
      setNavbarStyle("");
    }
  };

  return (
    <div
      className={`flex flex-col navbar justify-center items-center fixed top-0 w-full h-16 ${navbarStyle}`}
    >
      <nav className="container w-full  flex justify-between items-center p-4">
        <div className="hamburger-menu">
          <NavMenu variant={navBarVariants[isHomePage]} />
        </div>

        <div className="logo">
          <Link href="/" className="justify-center items-center flex gap-2">
            {isHomePage === "home" ? (
              <Image
                src="/icons/dxberience_logo.svg"
                alt="Dxberience Logo"
                width={98}
                height={24}
              />
            ) : (
              <Image
                src="/icons/dxberience_logo_accent.svg"
                alt="Dxberience Logo"
                width={98}
                height={24}
              />
            )}
          </Link>
        </div>

        <div className="nav-btns flex justify-center items-center gap-4">
          <div
            className={`search ${navBarVariants[isHomePage]}`}
            onClick={() => setIsSearchBarOpen(true)}
          >
            <SearchIcon />
          </div>
          {/* <div className={`profile ${navBarVariants[isHomePage]}`}>
            <ProfileIcon />
          </div>
          <div className={`bag ${navBarVariants[isHomePage]}`}>
            <BagIcon />
          </div> */}
        </div>
      </nav>
      <SearchBar
        isSearchBarOpen={isSearchBarOpen}
        setIsSearchBarOpen={setIsSearchBarOpen}
      />
    </div>
  );
};

export default Navbar;
