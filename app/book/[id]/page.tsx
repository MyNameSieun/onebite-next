import { BookData, ReviewData } from "@/types";
import { notFound } from "next/navigation";
import ReviewItem from "@/components/review-item";
import { ReviewEditor } from "@/components/review-editor";
import Image from "next/image";
import { Metadata } from "next";

export const dynamicParams = false;
export const dynamic = "error";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`, {
    cache: "force-cache",
  });

  if (!res.ok) throw new Error(res.statusText);

  const book: BookData = await res.json();
  return {
    title: `${book.title} : - 한입 북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} : - 한입 북스`,
      description: `${book.description}`,
      images: [book.coverImgUrl],
    },
  };
}

const BookDetail = async ({ bookId }: { bookId: string }) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${bookId}`, {
    cache: "force-cache",
  });
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다</div>;
  }

  const book: BookData = await res.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <section className="flex flex-col gap-3">
      {/*  커버 이미지 영역 */}
      <div
        className="relative flex justify-center bg-cover bg-center bg-no-repeat p-5"
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/70" /> {/* 어두운 오버레이 */}
        <Image
          width={240}
          height={300}
          src={coverImgUrl}
          alt={`도서 ${title}의 이미지`}
          className="relative z-10 max-h-[350px] object-contain"
        />
      </div>

      {/* 책 정보 */}
      <div className="flex flex-col gap-1">
        <div className="text-lg font-bold">{title}</div>
        <div className="text-gray-500">{subTitle}</div>
        <div className="text-sm text-gray-500">
          {author} | {publisher}
        </div>
      </div>

      {/* 설명 영역 */}
      <div className="rounded-md bg-gray-100 p-4 text-sm leading-relaxed whitespace-pre-line">
        {description}
      </div>
    </section>
  );
};

const ReviewList = async ({ bookId }: { bookId: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/review/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } },
  );

  if (!res.ok) throw new Error(`Review fetch failed : ${res.statusText}`);

  const reviews: ReviewData[] = await res.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
};

const BookDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  return (
    <div className="flex flex-col gap-y-32">
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList bookId={id} />
    </div>
  );
};

export default BookDetailPage;
