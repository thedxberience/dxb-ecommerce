import SearchIcon from "@/components/icons/SearchIcon";
import { MdClear } from "react-icons/md";
import React from "react";

type SearchBarProps = {
  isSearchBarOpen: boolean;
  setIsSearchBarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchBar = ({ isSearchBarOpen, setIsSearchBarOpen }: SearchBarProps) => {
  const handleCloseSearchBar = () => {
    setIsSearchBarOpen(false);
  };

  return (
    <div
      className={`flex justify-center items-center w-full py-5 bg-white shadow-md absolute z-10 ${
        isSearchBarOpen ? "reveal-search-bar" : "hide-search-bar"
      }`}
    >
      <div className="container flex justify-center items-center w-full">
        <div className="input-container max-w-11/12 lg:max-w-full flex justify-center items-center w-full h-full px-4 py-3 bg-accent rounded-[8px] gap-2">
          <div className="search-logo text-acccent-400">
            <SearchIcon />
          </div>
          <input
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
    </div>
  );
};

export default SearchBar;
