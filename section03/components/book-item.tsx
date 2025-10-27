import { BookData } from "@/types";
import Link from "next/link";

const BookItem = ({
  id,
  title,
  subTitle,
  author,
  publisher,
  description,
  coverImgUrl,
}: BookData) => {
  return (
    <Link
      href={`book/${id}`}
      className="flex gap-3 border-b border-gray-200 py-5"
    >
      <img src={coverImgUrl} alt={title} className="w-20" />
      <div className="flex flex-col">
        <div className="flex flex-1 flex-col">
          <div className="font-bold">{title}</div>
          <div className="text-sm break-keep">{subTitle}</div>
        </div>

        <div className="mb-3.5 text-sm text-gray-500">
          {author} | {publisher}
        </div>
      </div>
    </Link>
  );
};

export default BookItem;
