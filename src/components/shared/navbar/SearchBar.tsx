import SearchIcon from "@/components/icons/SearchIcon";
import { MdClear } from "react-icons/md";
import { TbFaceIdError } from "react-icons/tb";
import { TbError404Off } from "react-icons/tb";
import React, { useState } from "react";
import { searchProductsByCategory } from "@/server/sanity/products/products";
import { sanityProduct } from "@/utils/types";
import SearchedProductCard from "./search/SearchedProductCard";
import Image from "next/image";
import CustomButton from "../CustomButton";

type SearchBarProps = {
  isSearchBarOpen: boolean;
  setIsSearchBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchBar = ({ isSearchBarOpen, setIsSearchBarOpen }: SearchBarProps) => {
  const [loading, setLoading] = useState(false);
  const [searchedProducts, setSearchedProducts] = useState<sanityProduct[]>([]);
  const [searchProductErr, setSearchProductErr] = useState("");
  const [searchProductEmpty, setSearchProductEmpty] = useState(
    "Start typing to see results"
  );

  const handleCloseSearchBar = () => {
    setIsSearchBarOpen(false);
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    console.log("Searched val: ", value);

    if (value != "") {
      setTimeout(async () => {
        setLoading(true);

        const { data, error } = await searchProductsByCategory(value, 8);

        setLoading(false);

        if (error) {
          console.log(`Could not search products`, error.message);
          setSearchProductErr(error.message);
          // clearTimeout(searchDebouncer);
          return;
        }

        if (!data || data.length === 0) {
          setSearchProductEmpty("Oops! Nothing found here.");
          setSearchedProducts([]);
        }
        setSearchedProducts(data);
      }, 250);
    } else {
      setSearchProductEmpty("Start typing to see results");
      setSearchedProducts([]);
    }
  };

  const handleShowProducts = () => {
    if (loading) {
      return (
        <div className="loading-state flex justify-center items-center min-h-20">
          <span className="animate-spin">
            <Image
              src="/icons/Loader.svg"
              alt="Loading Icon"
              width={40}
              height={40}
            />
          </span>
        </div>
      );
    }

    if (searchProductErr) {
      return (
        <div className="error-message flex justify-center items-center min-h-20">
          <p className="text-acccent-400 text-2xl font-bold flex flex-col justify-center items-center gap-3">
            <TbFaceIdError />
            {searchProductErr}
          </p>
        </div>
      );
    }

    if (!searchedProducts || searchedProducts.length == 0) {
      return (
        <div className="error-message flex justify-center items-center min-h-20">
          <p className="text-acccent-400 text-2xl font-bold flex flex-col justify-center items-center gap-3">
            <TbError404Off />
            {searchProductEmpty}
          </p>
        </div>
      );
    }

    if (searchedProducts.length > 0) {
      return (
        <div className="flex flex-col w-full gap-5">
          <div className="results grid grid-cols-1 lg:grid-cols-2 w-full gap-3">
            {searchProductErr === "" &&
              searchedProducts.map((product) => (
                <SearchedProductCard
                  alt={product.thumbnail.imgAlt}
                  src={product.thumbnail.imgSrc}
                  brand={product.brand}
                  name={product.name}
                  price={product.price}
                  slug={product.slug}
                  key={product.id}
                />
              ))}
          </div>
          <div className="btn flex justify-center items-center w-full">
            <CustomButton
              invert
              btnName="See all"
              href={`/collection/${searchedProducts[0].category}`}
              isLink
            />
          </div>
        </div>
      );
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center w-full py-5 bg-white shadow-md absolute z-10 ${
        isSearchBarOpen ? "reveal-search-bar" : "hide-search-bar"
      }`}
    >
      <div className="container flex justify-center items-center w-full">
        <div className="input-container max-w-11/12 lg:max-w-full flex justify-center items-center w-full h-full px-4 py-3 bg-accent rounded-[8px] gap-2">
          <div className="search-logo text-acccent-400">
            <SearchIcon />
          </div>
          <input
            onChange={handleSearch}
            type="search"
            placeholder="Search"
            className="bg-transparent text-accent-300 outline-none w-full h-full"
          />
          <div className="clear">
            <MdClear
              className="text-acccent-400"
              onClick={handleCloseSearchBar}
            />
          </div>
        </div>
      </div>
      <div className="search-results container flex flex-col w-full gap-3 mt-3">
        <div className="header">
          {searchProductErr === "" ? (
            <h1 className="text-primary">Products</h1>
          ) : (
            <h1 className="text-primary text-center">{searchProductErr}</h1>
          )}
        </div>
        {handleShowProducts()}
      </div>
    </div>
  );
};

export default SearchBar;
