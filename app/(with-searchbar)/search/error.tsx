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
      <div>⚠️ 검색 과정에서 오류가 발생했습니다.</div>
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh(); // 현재 페이지에 필요한 서버 컴포넌트들을 다시 불러옴
            reset(); // 에러 상태를 초기화, 컴포넌트들을 다시 렌더링
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
};

export default Error;
