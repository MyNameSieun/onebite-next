// app/(with-searchbar)/page.tsx
import BookItem from "@/components/book-item";
import BookListSkeletion from "@/components/skeleton/book-list-skeletion";
import { BookData } from "@/types";
import delay from "@/util/delay";
import { Suspense } from "react";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
// 컴포넌트 분리
async function AllBooks() {
  await delay(1500);
  const res = await fetch(`${apiUrl}/book`, { cache: "no-cache" });
  if (!res.ok) {
    <div>오류가 발생했습니다</div>;
  }
  const allBooks: BookData[] = await res.json();
  return (
    <div>
      {allBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

async function RecoBooks() {
  await delay(3000);
  const res = await fetch(`${apiUrl}/book/random`, { next: { revalidate: 3 } });
  if (!res.ok) {
    <div>오류가 발생했습니다</div>;
  }
  const recoBooks: BookData[] = await res.json();
  return (
    <div>
      {recoBooks.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
export const dynamic = "force-dynamic";

const HomePage = () => {
  return (
    <div>
      <section className="flex flex-col">
        <h3 className="text-xl font-bold">지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeletion count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>

      <section className="flex flex-col">
        <h3 className="mt-10 text-xl font-bold">등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeletion count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
};

export default HomePage;
