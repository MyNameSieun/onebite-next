// app/(with-searchbar)/search/page.tsx
import BookItem from "@/components/book-item";
import { BookData } from "@/types";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) => {
  const { q } = await searchParams;
  const res = await fetch(`${apiUrl}/book/search?q=${q}`);
  if (!res.ok) {
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

export default SearchPage;
