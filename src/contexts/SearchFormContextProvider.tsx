"use client";
// import { useDebounce } from "@/lib/hooks";
import { createContext, useState } from "react";

type TSearchFormContext = {
  searchText: string;
  //   debouncedSearchText: string;
  handleChangeSearchText: (text: string) => void;
};

export const SearchFormContext = createContext<TSearchFormContext | null>(null);

export default function SearchFormContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [searchText, setSearchText] = useState("");
  //   const debouncedSearchText = useDebounce(searchText, 1000);

  const handleChangeSearchText = (text: string) => {
    setSearchText(text);
  };

  return (
    <SearchFormContext.Provider
      value={{
        searchText,
        // debouncedSearchText,
        handleChangeSearchText,
      }}
    >
      {children}
    </SearchFormContext.Provider>
  );
}
