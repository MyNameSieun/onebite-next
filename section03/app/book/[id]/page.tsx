import { BookData } from "@/types";
import { notFound } from "next/navigation";

export const dynamicParams = false;
export const dynamic = "error";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

const BookDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string | string[] }>;
}) => {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/${id}`);
  if (!res.ok) {
    if (res.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다</div>;
  }

  const book: BookData = await res.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <div className="flex flex-col gap-3">
      {/*  커버 이미지 영역 */}
      <div
        className="relative flex justify-center bg-cover bg-center bg-no-repeat p-5"
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/70" /> {/* 어두운 오버레이 */}
        <img
          src={coverImgUrl}
          alt={title}
          className="relative z-10 max-h-[350px] object-contain"
        />
      </div>

      {/* 책 정보 */}
      <div className="flex flex-col gap-1 px-5">
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
    </div>
  );
};

export default BookDetailPage;
