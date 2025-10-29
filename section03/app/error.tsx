"use client";

import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    console.error(error.message);
  }, [error]);
  return (
    <div>
      <div>⚠️ 오류가 발생했습니다.</div>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
};

export default Error;
