"use client";
import Searchbar from "@/components/searchbar";
import { ReactNode } from "react";

const SearchBarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  );
};

export default SearchBarLayout;
