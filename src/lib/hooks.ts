"use client";
import { PetContext } from "@/contexts/PetContextProvider";
import { SearchFormContext } from "@/contexts/SearchFormContextProvider";
import { UsersContext } from "@/contexts/UsersContextProvider";
import { useContext } from "react";

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error("usePetContext must be used within a PetContextProvider");
  }
  return context;
};

export const useSearchFormContext = () => {
  const context = useContext(SearchFormContext);
  if (!context) {
    throw new Error(
      "Search Form Context must be used within a SearchFormContextProvider"
    );
  }
  return context;
};

export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error(
      "useUsersContext must be used within a UsersContextProvider"
    );
  }
  return context;
};
// export function useDebounce<T>(value: T, ms: number = 2000): T {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => setDebouncedValue(value), ms);
//     return () => clearTimeout(handler);
//   }, [value, ms]);

//   return debouncedValue;
// }
