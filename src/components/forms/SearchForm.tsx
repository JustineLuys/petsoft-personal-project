"use client";
import { useSearchFormContext } from "@/lib/hooks";
import { Input } from "../ui/input";

export default function SearchForm() {
  const { searchText, handleChangeSearchText } = useSearchFormContext();
  return (
    <form action="" className="h-full w-full">
      <Input
        value={searchText}
        className="h-full w-full pl-5 rounded-lg bg-white/20 placeholder:text-white outline-none"
        placeholder="🔍 Search pets"
        onChange={(e) => handleChangeSearchText(e.target.value)}
      />
    </form>
  );
}
