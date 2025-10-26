import BookItem from "@/components/book-item";
import { BookData } from "@/types";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// 컴포넌트 분리
async function AllBooks() {
  const res = await fetch(`${apiUrl}/book`);
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
  const res = await fetch(`${apiUrl}/book/random`);
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

const HomePage = () => {
  return (
    <div>
      <section className="flex flex-col">
        <h3 className="text-xl font-bold">지금 추천하는 도서</h3>
        <RecoBooks />
      </section>
      <section className="flex flex-col">
        <h3 className="mt-10 text-xl font-bold">등록된 모든 도서</h3>
        <AllBooks />
      </section>
    </div>
  );
};

export default HomePage;
