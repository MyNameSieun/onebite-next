"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const Searchbar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q");

  // 값이 진짜 없을 때(null, undefined) 만 기본값 주고 싶다 → ??
  // 값이 falsy(0, "", false 등) 일 때도 기본값 주고 싶다 → ||
  const [search, setSearch] = useState(q ?? "");

  // useEffect(() => {
  //   if (q !== search) {
  //     setSearch(q || "");
  //   }
  // }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="gap mb-10 flex">
      <input
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder="검색어를 입력하세요"
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
      />
      <button
        onClick={onSubmit}
        className="rounded-md bg-blue-400 px-4 py-2 text-white transition hover:bg-blue-500"
      >
        검색
      </button>
    </div>
  );
};

export default Searchbar;
