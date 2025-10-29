import { ReviewData } from "@/types";
import ReviewItemDeleteButton from "./review-item-delete-button";

const ReviewItem = ({ id, content, author, createdAt, bookId }: ReviewData) => {
  return (
    <div className="flex flex-col gap-1 px-0 py-3">
      <div className="text-sm">{author}</div>
      <div className="rounded-sm bg-gray-100 p-6">{content}</div>
      <div className="flex justify-end gap-2 text-sm text-gray-500">
        <div className="">{new Date(createdAt).toLocaleDateString()}</div>
        <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
      </div>
    </div>
  );
};

export default ReviewItem;
