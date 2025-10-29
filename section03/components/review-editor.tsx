// components/review-editor.tsx

"use client";

import { createReviewAction } from "@/actions/create-review.action";
import { useActionState, useEffect } from "react";

export const ReviewEditor = ({ bookId }: { bookId: string }) => {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null,
  );
  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section>
      <form action={formAction} className="flex flex-col gap-1.5">
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          name="content"
          disabled={isPending}
          required
          placeholder="리뷰 내용"
          className="box-border h-40 resize-y rounded-sm border border-solid border-gray-300 p-3"
        />
        <div className="flex justify-end gap-2">
          <input
            name="author"
            required
            disabled={isPending}
            placeholder="작성자"
            className="box-border rounded-sm border border-solid border-gray-300 p-3"
          />
          <button
            type="submit"
            disabled={isPending}
            className="cursor-pointer rounded-sm bg-blue-500 p-3 text-white hover:bg-blue-700"
          >
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
};
