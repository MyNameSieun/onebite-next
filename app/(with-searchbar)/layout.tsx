// app/(with-searchbar)/layout.stsx
"use client";
import Searchbar from "@/components/searchbar";
import { ReactNode, Suspense } from "react";

const SearchBarLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Suspense fallback={<div>Loading ...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
};

export default SearchBarLayout;
