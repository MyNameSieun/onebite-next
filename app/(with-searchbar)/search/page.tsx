// app/(with-searchbar)/search/page.tsx
import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const SearchResult = async ({ q }: { q: string }) => {
  const res = await fetch(`${apiUrl}/book/search?q=${q}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다</div>;
  }

  const books: BookData[] = await res.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
};

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;

  return {
    title: `${q} : Mw북스 검색`,
    description: `${q}의 검색 결과입니다.`,
    openGraph: {
      title: `${q} : Mw북스 검색`,
      description: `${q}의 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const { q } = await searchParams;
  return (
    <Suspense key={q || ""} fallback={<div>Loading...</div>}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
};

// const SearchPage = async ({
//   searchParams,
// }: {
//   searchParams: Promise<{ q?: string }>;
// }) => {
//   const { q } = await searchParams;

//   console.log(q);
//   return (
//     <Suspense key={q || ""} fallback={<BookListSkeletion count={3} />}>
//       <SearchResult q={q || ""} />
//     </Suspense>
//   );
// };

export default SearchPage;
